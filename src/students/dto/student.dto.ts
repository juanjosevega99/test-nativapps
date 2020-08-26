import { Document } from 'mongoose'

export interface Student extends Document {
  name: string,
  lastName: string,
  age: number,
  email: string,
}