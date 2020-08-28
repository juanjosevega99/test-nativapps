import { Document } from 'mongoose';

export interface Course extends Document {
  name: string;
  schedule: string;
  dateStart: Date;
  dateEnd: Date;
  students: number
}
