import { db } from "@/utils";
import { NextResponse } from "next/server";
import { INTERVIEW_EXPERIENCE } from "@/utils/schema";
import { eq, sql } from "drizzle-orm";

export async function GET(req) {
    try {
        
        const companies = await db
        .selectDistinct({ company: sql`LOWER(${INTERVIEW_EXPERIENCE.company})` })
            .from(INTERVIEW_EXPERIENCE)
            const companyList = [...new Set(companies.map(item => item.company.toLowerCase()))];

        return NextResponse.json({ companies: companyList });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}