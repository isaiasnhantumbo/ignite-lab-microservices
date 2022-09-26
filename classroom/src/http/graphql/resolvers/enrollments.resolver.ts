import { CoursesService } from './../../../services/courses.service';
import { StudentsService } from './../../../services/students.service';
import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { EnrollmentsService } from 'src/services/enrollments.service';

import { Enrollment } from '../models/enrollment';

@Resolver(() => Enrollment)
export class EnrollmentResolver {
  constructor(
    private enrollmentsServices: EnrollmentsService,
    private studentsServices: StudentsService,
    private coursesServices: CoursesService,
  ) {}
  @Query(() => [Enrollment])
  @UseGuards(AuthorizationGuard)
  enrollments() {
    return this.enrollmentsServices.listAllEnrollments();
  }

  @ResolveField()
  student(@Parent() enrollment: Enrollment) {
    return this.studentsServices.getStudentById(enrollment.studentId);
  }

  @ResolveField()
  course(@Parent() enrollment: Enrollment) {
    return this.coursesServices.getCourseById(enrollment.courseId);
  }
}
