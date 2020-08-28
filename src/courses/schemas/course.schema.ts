import { Schema } from "mongoose";

export const CourseSchema = new Schema({
  name: String,
  schedule: String,
  dateStart: Date,
  dateEnd: Date,
  students: {
      type: Number,
      default: 0
    }
})