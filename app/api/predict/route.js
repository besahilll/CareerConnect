import { spawn } from "child_process";
import { NextResponse } from "next/server";
import path from "path";
import axios from "axios";

export const routeSegmentConfig = {
  runtime: "nodejs", // Use Node.js runtime
};

export async function POST(req) {
  try {
    console.log("Got request"); // Debugging log

    // Read the request body as text
    const resumeData = await req.text();
    console.log("Resume Data Received");

    const scriptPath = path.join(process.cwd(), "predict.py");
    console.log("Python script path:", scriptPath);

    // Call the Python script and pass the resume content via stdin
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn("python", [scriptPath]);

      // Write the resume data to the Python script's stdin
      pythonProcess.stdin.write(resumeData);
      pythonProcess.stdin.end();

      let pythonOutput = "";

      pythonProcess.stdout.on("data", (data) => {
        pythonOutput += data.toString();
      });

      pythonProcess.stderr.on("data", (data) => {
        console.error("Python error:", data.toString());
        reject(
          NextResponse.json(
            { error: "Error processing resume in Python." },
            { status: 500 }
          )
        );
      });

      pythonProcess.on("close", async () => {
        try {
          // Parse the Python script output
          const result = JSON.parse(pythonOutput);
          console.log("Result:", result); // Debugging log

          const category = result.category;

          // OpenAI prompt to suggest companies
          const prompt = `Suggest a list of companies hiring for the role of ${category} or similar roles. Provide the company names along with a brief description of why the company is a good fit for such roles. Ensure the response is a valid JSON array with the structure: [{"company": "Company Name", "description": "Brief description"}].`;

          try {
            const openAiResponse = await axios.post(
              "https://api.openai.com/v1/chat/completions",
              {
                model: "gpt-4",
                messages: [{ role: "user", content: prompt }],
                max_tokens: 1500, // Adjust the token limit as needed
              },
              {
                headers: {
                  Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                  "Content-Type": "application/json",
                },
              }
            );

            let responseText =openAiResponse.data.choices[0].message.content.trim();
            responseText = responseText
              .replace(/```json|```/g, "")
              .trim();

            const companies = JSON.parse(responseText); // Parse the OpenAI response to JSON

            resolve(
              NextResponse.json(
                { category, companies },
                { status: 200 }
              )
            );
          } catch (openAiError) {
            console.error("OpenAI API Error:", openAiError);
            reject(
              NextResponse.json(
                { error: "Error fetching suggestions from OpenAI." },
                { status: 500 }
              )
            );
          }
        } catch (error) {
          console.error("JSON Parsing Error:", error);
          reject(
            NextResponse.json(
              { error: "Error parsing Python output." },
              { status: 500 }
            )
          );
        }
      });
    });
  } catch (error) {
    console.error("Unexpected Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
