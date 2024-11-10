import { db } from "@/utils";
import { INTERVIEW_EXPERIENCE } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req,{params}) {
  const { company } = params;
  
  if (!company) {
    return NextResponse.json(
      { error: "Company is required" },
      { status: 400 }
    );
  }

  try {
    const students = await db
      .select()
      .from(INTERVIEW_EXPERIENCE)
      .where(eq(INTERVIEW_EXPERIENCE.company, company));

    if (students.length === 0) {
        return NextResponse.json({ error: "No students found for this company" }, { status: 404 });
    }

    return NextResponse.json(students); 
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
