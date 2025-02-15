import mongoose, { Schema, Document } from "mongoose";

// Define the schema for work experience
const WorkExperienceSchema = new Schema({
  position: { type: String, required: true },
  company: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  description: { type: String, required: true },
});

// Define the main resume schema
const ResumeSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  summary: { type: String, required: true },
  college: { type: String, required: true },
  degree: { type: String, required: true },
  education: { type: String, required: true },
  workExperience: { type: [WorkExperienceSchema], required: true },
  skills: { type: String, required: true },
});

// Check if the model already exists, otherwise create it
export const Resume = mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);