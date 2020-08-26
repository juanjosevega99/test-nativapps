import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from "@nestjs/config";
import { StudentsModule } from './students/students.module';

import { CoursesController } from './courses/courses.controller';
import { CoursesService } from './courses/courses.service';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [
    // ConfigModule.forRoot(),
    StudentsModule,
    CoursesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
