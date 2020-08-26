import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';

import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';

const { db } = require('./config/config')
const mongoURI = db

@Module({
  imports: [
    MongooseModule.forRoot(
      mongoURI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    ),
    StudentsModule,
    CoursesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
