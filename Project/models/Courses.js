import mongoose from "mongoose";
const { model, Schema } = mongoose;

const courseSchema = new Schema({
    code: String,
    semester: Number,
    crhr: Number,
    section : String,
    course : String,
    teacher : String,
});

export const Courses = model("courses", courseSchema);
