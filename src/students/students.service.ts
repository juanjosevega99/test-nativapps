import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

import { Student } from './interface/student.interface';
import { CreateStudentDTO } from './dto/student.dto';

@Injectable()
export class StudentsService {

  constructor(@InjectModel('Student') private studentModel: Model<Student>) {}

  async getStudents(): Promise<Student[]> {
    const students = await this.studentModel.find()
    return students
  }

  async createStudent(createStudentDTO: CreateStudentDTO): Promise<Student> {
    const createdStudent = new this.studentModel(createStudentDTO)
    return await createdStudent.save()
  }
}
