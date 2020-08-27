import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Course } from './interfaces/course.interface';
import { CreateCourseDTO } from './dto/course.dto';

@Injectable()
export class CoursesService {
  constructor(@InjectModel('Course') private courseModel: Model<Course>) {}

  async getCourses(): Promise<Course[]> {
    const courses = await this.courseModel.find();
    return courses;
  }

  async createCourse(createCourseDTO: CreateCourseDTO): Promise<Course> {
    const createdStudent = new this.courseModel(createCourseDTO);
    return await createdStudent.save();
  }

  async getCourse(courseID: string): Promise<Course> {
    const course = await this.courseModel.findById(courseID);
    return course;
  }

  async updateCourse(
    courseID: string,
    createCourseDTO: CreateCourseDTO,
  ): Promise<Course> {
    const updatedCourse = await this.courseModel.findOneAndUpdate(
      { _id: courseID },
      createCourseDTO,
      { new: true },
    );
    return updatedCourse;
  }

  async deleteCourse(courseID: string): Promise<Course> {
    const deletedProduct = await this.courseModel.findByIdAndDelete({
      _id: courseID,
    });
    return deletedProduct;
  }
}
