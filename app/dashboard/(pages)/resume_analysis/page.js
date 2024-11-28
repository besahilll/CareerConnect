"use client";
import GlobalApi from "@/app/_services/GlobalApi";
import React, { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Page() {
    const [file, setFile] = useState(null);
    const [isPredicting, setIsPredicting] = useState(false);
    const [result, setResult] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setResult(null); // Clear result when a new file is uploaded
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            toast.error("Please upload a file!");
            return;
        }

        setIsPredicting(true);

        try {
            // Simulate an API call
            const response = await GlobalApi.Predict(file);
            setResult(response.data); // Set the API response as the result
            toast.success("Resume analyzed successfully!");
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsPredicting(false);
            setFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex flex-col items-center justify-center">
            <Toaster />

            {/* Conditionally Render Upload Form or Result */}
            {!result ? (
                // Upload Form
                <>
                    <div className="text-center mb-8 px-6">
                        <h2 className="text-blue-600 font-semibold text-sm tracking-wide uppercase">
                            Resume Analyzer
                        </h2>
                        <h1 className="text-gray-900 text-4xl font-bold mb-4">
                            Is your resume good enough?
                        </h1>
                        <p className="text-gray-600 text-base max-w-lg mx-auto">
                            A free and fast AI resume analyzer doing crucial checks to
                            suggest you a suitable job role & companies hiring for similar roles.
                        </p>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col items-center"
                        >
                            <p className="text-gray-800 text-sm mb-4">
                                Drop your resume here or choose a file.
                            </p>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf,.docx"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-600
                                  file:py-2 file:px-4
                                  file:rounded-lg file:border-0
                                  file:bg-blue-100 file:text-blue-700
                                  hover:file:bg-blue-200 mb-4"
                            />
                            <button
                                type="submit"
                                disabled={isPredicting}
                                className={`w-full py-2 rounded-lg font-semibold text-white transition ${
                                    isPredicting
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-green-600 hover:bg-green-700"
                                }`}
                            >
                                {isPredicting ? "Analyzing..." : "Upload Your Resume"}
                            </button>
                            <p className="text-xs text-gray-500 mt-4">
                                PDF & DOCX only. Max 2MB file size.
                            </p>
                        </form>
                    </div>
                </>
            ) : (
                // Full-Page Result Display
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full mx-auto">
                    <h3 className="text-green-700 font-bold text-2xl text-center mb-4">
                        Resume Analysis Results
                    </h3>
                    <p className="text-gray-800 text-lg mb-6 text-center">
                        Predicted Job Role:{" "}
                        <span className="font-semibold text-green-800">
                            {result.category}
                        </span>
                    </p>
                    <div>
                        <h4 className="text-blue-700 font-bold text-xl mb-4 text-center">
                            Suggested Companies:
                        </h4>
                        <ul className="list-disc list-inside text-gray-600 text-lg space-y-2">
                            {result.companies.map((company, index) => (
                                <li key={index}>
                                    <span className="font-medium">
                                        {company.company}:
                                    </span>{" "}
                                    {company.description}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-8 text-center">
                        <button
                            onClick={() => setResult(null)}
                            className="py-2 px-6 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
                        >
                            Analyze Another Resume
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
