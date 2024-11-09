import { NextResponse } from "next/server";
import { db } from "@/utils";
import { INTERVIEW_EXPERIENCE } from "@/utils/schema";

export async function POST(req) {
    try {
        const data = await req.json();

        const result = await db.insert(INTERVIEW_EXPERIENCE).values({
            name: data?.name,
            course: data?.course,
            branch: data?.branch,
            yearOfPassout: data?.yearOfPassout,
            cgpa: data?.cgpa,
            contactNo: data?.contactNo,
            linkedinProfile: data?.linkedinProfile,
            company: data?.company,
            jobProfile: data?.jobProfile,
            jobLocation: data?.jobLocation,
            packageOffered: data?.packageOffered,
            studentsHired: data?.studentsHired,
            rounds: data?.rounds,
            skillsAsked: data?.skillsAsked,
            experience: data?.experience,
            interviewLevel: data?.interviewLevel
        });
        return NextResponse.json({ success: true, message: "Interview experience added successfully", data: result });
    } catch (error) {
        console.error("Error inserting interview experience:", error);
        return NextResponse.json({ success: false, message: "Failed to add interview experience", error: error.message }, { status: 500 });
    }
}
