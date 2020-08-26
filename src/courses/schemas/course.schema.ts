import { Schema } from "mongoose";

export const StudentSchema = new Schema({
  name: String,
  schedule: String,
  dateStart: Date,
  dateEnd: Date,
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Students'
    }
  ],
})