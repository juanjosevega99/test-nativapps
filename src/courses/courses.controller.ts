import {
  Controller,
  HttpStatus,
  Get,
  Res,
  Post,
  Body,
  NotFoundException,
  Param,
  Query,
  Put,
  Delete,
} from '@nestjs/common';

import { CreateCourseDTO } from './dto/course.dto';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get('/')
  async getCourses(@Res() res) {
    const courses = await this.coursesService.getCourses();
    return res.status(HttpStatus.OK).json(courses);
  }

  @Get('/top')
  async topCourses(@Res() res) {
    const courses = await this.coursesService.topCourses();
    return res.status(HttpStatus.OK).json(courses);
  }

  @Post('/create')
  async createCourse(@Res() res, @Body() createCourseDTO: CreateCourseDTO) {
    const course = await this.coursesService.createCourse(createCourseDTO);
    return res.status(HttpStatus.CREATED).json({
      message: 'Course Successfully Created',
      course,
    });
  }

  @Get('/:courseID')
  async getCourse(@Res() res, @Param('courseID') courseID) {
    const course = await this.coursesService.getCourse(courseID);
    if (!course) throw new NotFoundException('Course Does not exists');
    return res.status(HttpStatus.OK).json(course);
  }

  @Put('/update')
  async updateCourse(
    @Res() res,
    @Body() createCourseDTO: CreateCourseDTO,
    @Query('courseID') courseID,
  ) {
    const updatedCourse = await this.coursesService.updateCourse(
      courseID,
      createCourseDTO,
    );
    if (!updatedCourse) throw new NotFoundException('Course Does not exists');
    return res.status(HttpStatus.OK).json({
      message: 'Course Updated Successfully',
      updatedCourse,
    });
  }

  @Delete('/delete')
  async deleteCourse(@Res() res, @Query('courseID') courseID) {
    const courseDeleted = await this.coursesService.deleteCourse(courseID);
    if (!courseDeleted) throw new NotFoundException('Course Does not exists');
    return res.status(HttpStatus.OK).json({
      message: 'Course deleted successfully',
      courseDeleted,
    });
  }
}
