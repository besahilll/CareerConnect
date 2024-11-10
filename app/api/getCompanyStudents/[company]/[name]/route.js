import { db } from "@/utils";
import { INTERVIEW_EXPERIENCE } from "@/utils/schema";
import { eq , and} from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req,{params}) {
  const { company, name } = params;
  
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
      .where(
        and(
            eq(INTERVIEW_EXPERIENCE.company, company),
            eq(INTERVIEW_EXPERIENCE.name, name)
        )
      );

    if (students.length === 0) {
        return NextResponse.json({ error: "No students found for this company" }, { status: 404 });
    }

    return NextResponse.json(students); 
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
