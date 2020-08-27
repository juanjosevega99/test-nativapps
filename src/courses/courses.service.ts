import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Course } from './interfaces/course.interface';
import { CreateCourseDTO } from './dto/course.dto';

@Injectable()
export class CoursesService {
  constructor(@InjectModel('Course') private studentModel: Model<Course>) {}

  async getStudents(): Promise<Course[]> {
    const courses = await this.studentModel.find();
    return courses;
  }

  async createStudent(createCourseDTO: CreateCourseDTO): Promise<Course> {
    const createdStudent = new this.studentModel(createCourseDTO);
    return await createdStudent.save();
  }

  async getStudent(courseID: string): Promise<Course> {
    const course = await this.studentModel.findById(courseID);
    return course;
  }

  async updateStudent(
    courseID: string,
    createCourseDTO: CreateCourseDTO,
  ): Promise<Course> {
    const updatedCourse = await this.studentModel.findOneAndUpdate(
      { _id: courseID },
      createCourseDTO,
      { new: true },
    );
    return updatedCourse;
  }

  async deleteStudent(courseID: string): Promise<Course> {
    const deletedProduct = await this.studentModel.findByIdAndDelete({
      _id: courseID,
    });
    return deletedProduct;
  }
}
