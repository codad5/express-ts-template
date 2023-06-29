import { Schema } from "mongoose";
import { User } from "@/src/types/Models";


// Mongoose schema for user documents

export const UserSchema = new Schema<User>({
name: { type: String, required: true },
username: { type: String, required: true },
email: { type: String, required: true },
} , {collection:"registeredCourse"});