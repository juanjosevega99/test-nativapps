import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Student } from './interface/student.interface';
import { CreateStudentDTO } from './dto/student.dto';
import { Course } from 'src/courses/interfaces/course.interface';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel('Student') private studentModel: Model<Student>,
    @InjectModel('Course') private courseModel: Model<Course>,
  ) {}

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
    const deletedStudent = await this.studentModel.findByIdAndDelete({
      _id: studentID,
    });
    return deletedStudent;
  }

  async assignStudentToCourse(studentID: string, courseID: string) {
    const student = await this.studentModel.findOneAndUpdate(
      { _id: studentID },
      { $push: { courses: courseID } },
    );
    if (!student) {
      return false;
    }

    const course = await this.courseModel.findOneAndUpdate(
      { _id: courseID },
      { $inc: { students: 1 } },
    );
    if (!course) {
      return false;
    }

    return true;
  }
}
