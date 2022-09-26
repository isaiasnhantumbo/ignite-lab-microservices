import { AuthUser } from './../../../../dist/http/auth copy/current-user.d';
import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { StudentsService } from './../../../services/students.service';
import { AuthorizationGuard } from './../../auth/authorization.guard';
import { Student } from '../models/student';
import { Enrollment } from '@prisma/client';
import { EnrollmentsService } from 'src/services/enrollments.service';
import { CurrentUser } from 'src/http/auth/current-user';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    private studentsServices: StudentsService,
    private enrollmentsServices: EnrollmentsService,
  ) {}

  @Query(() => Student)
  @UseGuards(AuthorizationGuard)
  me(@CurrentUser() user: AuthUser) {
    return this.studentsServices.getStudentByAuthUserId(user.sub);
  }
  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentsServices.listAllStudents();
  }

  @ResolveField()
  enrollments(@Parent() student: Student) {
    return this.enrollmentsServices.listAllEnrollmentsByStudent(student.id);
  }
}
