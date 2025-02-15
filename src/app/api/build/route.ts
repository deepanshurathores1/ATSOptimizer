import { connectToDatabase } from "@/lib/db";
import { Resume } from "@/models/resume";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Parse the request body
    const body = await request.json();

    // Create a new resume document
    const newResume = new Resume(body);

    // Save the document to MongoDB
    await newResume.save();

    // Return success response
    return NextResponse.json(
      { message: "Resume saved successfully!", data: newResume },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving resume:", error);
    return NextResponse.json(
      { message: "Failed to save resume" },
      { status: 500 }
    );
  }
}