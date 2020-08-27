import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { StudentSchema } from './schemas/student.schema';
import { CourseSchema } from 'src/courses/schemas/course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Student', schema: StudentSchema },
      { name: 'Course', schema: CourseSchema },
    ]),
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
