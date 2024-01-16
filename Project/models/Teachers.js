import mongoose from "mongoose";
const { model, Schema } = mongoose;

const TeachersSchema = new Schema({
    name : String,
});

export const Teachers = model("teachers", TeachersSchema);