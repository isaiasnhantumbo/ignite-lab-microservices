import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

interface GetCourseByAndStudentParams {
  courseId: string;
  studentId: string;
}
@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}
  listAllEnrollments() {
    return this.prisma.enrollment.findMany({
      where: {
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  listAllEnrollmentsByStudent(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: {
        studentId,
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  getCourseByAndStudent({ courseId, studentId }: GetCourseByAndStudentParams) {
    return this.prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId,
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
