import { db } from "@/utils";
import { NextResponse } from "next/server";
import { INTERVIEW_EXPERIENCE } from "@/utils/schema";
import { eq, sql } from "drizzle-orm";

export async function GET(req) {
    try {
        const interviewExperiences = await db
            .select()
            .from(INTERVIEW_EXPERIENCE)
            .where(sql`skills_asked IS NOT NULL`); // Ensure skills_asked is not null

        // Create an object to store the count of each skill
        const skillCounts = {};

        interviewExperiences.forEach((experience) => {
            // Parse the skills_asked field as JSON array
            const skills = JSON.parse(experience.skillsAsked);
            
            // Count the occurrence of each skill
            skills.forEach((skill) => {
                skillCounts[skill] = (skillCounts[skill] || 0) + 1;
            });
        });

        // Format the response data
        const formattedSkills = Object.entries(skillCounts).map(([skill, count]) => ({
            label: skill,
            count,
        }));

        // Return the formatted data as a JSON response
        return NextResponse.json(formattedSkills, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
