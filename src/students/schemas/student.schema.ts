import { Schema } from "mongoose";

export const StudentSchema = new Schema({
  name: String,
  lastName: String,
  age: Number,
  email: String,
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Courses'
    }
  ],
})