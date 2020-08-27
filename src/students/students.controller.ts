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

import { CreateStudentDTO } from './dto/student.dto';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Get('/')
  async getProducts(@Res() res) {
    const products = await this.studentsService.getStudents();
    return res.status(HttpStatus.OK).json(products);
  }

  @Post('/create')
  async createStudent(@Res() res, @Body() createStudentDTO: CreateStudentDTO) {
    const student = await this.studentsService.createStudent(createStudentDTO);
    return res.status(HttpStatus.CREATED).json({
      message: 'Student Successfully Created',
      student,
    });
  }

  @Get('/:studentID')
  async getProduct(@Res() res, @Param('studentID') studentID) {
    const product = await this.studentsService.getStudent(studentID);
    if (!product) throw new NotFoundException('Student Does not exists');
    return res.status(HttpStatus.OK).json(product);
  }

  @Put('/update')
  async updateStudent(
    @Res() res,
    @Body() createStudentDTO: CreateStudentDTO,
    @Query('studentID') studentID,
  ) {
    const updatedStudent = await this.studentsService.updateStudent(
      studentID,
      createStudentDTO,
    );
    if (!updatedStudent) throw new NotFoundException('Student Does not exists');
    return res.status(HttpStatus.OK).json({
      message: 'Student Updated Successfully',
      updatedStudent,
    });
  }

  @Delete('/delete')
  async deleteStudent(@Res() res, @Query('studentID') studentID) {
    const studentDeleted = await this.studentsService.deleteStudent(studentID);
    if (!studentDeleted) throw new NotFoundException('Student Does not exists');
    return res.status(HttpStatus.OK).json({
      message: 'Student deleted successfully',
      studentDeleted,
    });
  }
}
