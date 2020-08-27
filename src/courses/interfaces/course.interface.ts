import { Document } from 'mongoose';

export interface Product extends Document {
  name: string;
  schedule: string;
  dateStart: Date;
  dateEnd: Date;
}
