import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

export async function POST(request: Request) {
  try {
    const resumeData = await request.json()
    const filePath = path.join(process.cwd(), "data", "resumes.json")

    let resumes = []
    try {
      const fileContents = await fs.readFile(filePath, "utf8")
      resumes = JSON.parse(fileContents)
    } catch (error) {
      // If file doesn't exist or is empty, start with an empty array
      console.log("No existing resumes file, starting fresh")
    }

    resumes.push(resumeData)
    await fs.writeFile(filePath, JSON.stringify(resumes, null, 2))
    return NextResponse.json({ message: "Resume saved successfully" })
  } catch (error) {
    console.error("Failed to save resume data:", error)
    return NextResponse.json({ error: "Failed to save resume data" }, { status: 500 })
  }
}

