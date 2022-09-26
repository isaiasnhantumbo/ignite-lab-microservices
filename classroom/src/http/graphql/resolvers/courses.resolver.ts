import { StudentsService } from './../../../services/students.service';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';

import { CoursesService } from './../../../services/courses.service';
import { Course } from '../models/course';
import { CreateCourseInput } from '../inputs/create-couse-input';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { EnrollmentsService } from 'src/services/enrollments.service';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private coursersService: CoursesService,
    private studentsService: StudentsService,
    private enrollmentsServices: EnrollmentsService,
  ) {}
  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.coursersService.listAllCourses();
  }
  @Query(() => Course)
  @UseGuards(AuthorizationGuard)
  async course(@Args('id') id: string, @CurrentUser() user: AuthUser) {
    const student = await this.studentsService.getStudentByAuthUserId(user.sub);
    if (!student) {
      throw new Error('Student not found');
    }

    const enrollment = await this.enrollmentsServices.getCourseByAndStudent({
      courseId: id,
      studentId: student.id,
    });
    if (!enrollment) {
      throw new UnauthorizedException();
    }
    return this.coursersService.getCourseById(id);
  }

  @Mutation(() => Course)
  @UseGuards(AuthorizationGuard)
  createCourse(@Args('data') data: CreateCourseInput) {
    return this.coursersService.createCourse(data);
  }
}
