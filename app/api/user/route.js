import { NextResponse } from "next/server";
import { db } from "@/utils";
import { USER } from "@/utils/schema";
import jwt from "jsonwebtoken";
import { eq, or } from "drizzle-orm/expressions";

export async function POST(req) {
  try {
    const data = await req.json();

    // Check if username or mobile number already exists
    const existingUser = await db
      .select()
      .from(USER)
      .where(or(
        eq(USER.username, data?.username),
        eq(USER.email, data?.email)
      ));
    
    if (existingUser.length > 0) {
      const message = existingUser[0].username === data?.username
        ? "Username already exists"
        : "Email already exists";
      return NextResponse.json(
        { message },
        { status: 400 } // Bad Request
      );
    }

    // Insert user details into the database
    const result = await db.insert(USER).values({
      name: data?.name,
      password: data?.password,
      username: data?.username,
      email: data?.email
    });

    if (!result) {
      return NextResponse.json(
        { message: "User registration failed" },
        { status: 500 } // Internal Server Error
      );
    }

    const [user] = await db
      .select()
      .from(USER)
      .where(eq(USER.username, data?.username));

    if (!user) {
      return NextResponse.json(
        { message: "User not found after registration" },
        { status: 404 } // Not Found
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id},
      process.env.JWT_SECRET_KEY
    );

    return NextResponse.json(
      {
        data: { user, token },
        message: "User registered and authenticated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST:", error);
    return NextResponse.json(
      { message: error.message || "An unexpected error occurred" },
      { status: 500 } // Internal Server Error
    );
  }
}
