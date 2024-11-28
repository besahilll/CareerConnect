import { db } from "@/utils"; // Import your database utility
import { NextResponse } from "next/server";
import { INTERVIEW_EXPERIENCE } from "@/utils/schema";
import { eq, sql } from "drizzle-orm"; // Import SQL query helpers

export async function GET(req) {
  try {
    const interviewData = await db.select().from(INTERVIEW_EXPERIENCE);
    const ranges = {
      '0-8 LPA': 0,
      '9-15 LPA': 0,
      '16-30 LPA': 0,
      '30+ LPA': 0,
    };

    // Categorize each interview's package into ranges
    interviewData.forEach(item => {
      const packageValue = parseFloat(item.packageOffered);
      console.log(packageValue)
      if (packageValue >= 0.0 && packageValue <= 8.0) {
        ranges['0-8 LPA'] += 1;
      } else if (packageValue >= 9.0 && packageValue <= 15.0) {
        ranges['9-15 LPA'] += 1;
      } else if (packageValue >= 16.0 && packageValue < 30.0) {
        ranges['16-30 LPA'] += 1;
      } else if (packageValue >= 31.0) {
        ranges['30+ LPA'] += 1;
      }
    });

    // Return the data in a format suitable for your frontend
    return NextResponse.json(ranges, { status: 200 });
  } catch (error) {
    // Handle any errors
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
