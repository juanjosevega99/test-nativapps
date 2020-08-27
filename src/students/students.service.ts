import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Student } from './interface/student.interface';
import { CreateStudentDTO } from './dto/student.dto';

@Injectable()
export class StudentsService {
  constructor(@InjectModel('Student') private studentModel: Model<Student>) {}

  async getStudents(): Promise<Student[]> {
    const students = await this.studentModel.find();
    return students;
  }

  async createStudent(createStudentDTO: CreateStudentDTO): Promise<Student> {
    const createdStudent = new this.studentModel(createStudentDTO);
    return await createdStudent.save();
  }

  async getStudent(studentID: string): Promise<Student> {
    const student = await this.studentModel.findById(studentID);
    return student;
  }

  async updateStudent(
    studentID: string,
    createStudentDTO: CreateStudentDTO,
  ): Promise<Student> {
    const updatedStudent = await this.studentModel.findOneAndUpdate(
      { _id: studentID },
      createStudentDTO,
      { new: true },
    );
    return updatedStudent;
  }

  async deleteStudent(studentID: string): Promise<Student> {
    const deletedProduct = await this.studentModel.findByIdAndDelete({
      _id: studentID,
    });
    return deletedProduct;
  }
}
