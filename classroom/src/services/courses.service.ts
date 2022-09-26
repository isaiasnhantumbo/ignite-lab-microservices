import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

import { PrismaService } from '../database/prisma/prisma.service';

interface CreateCourseParams {
  title: string;
}

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}
  listAllCourses() {
    return this.prisma.course.findMany();
  }
  getCourseById(id: string) {
    return this.prisma.course.findUnique({
      where: {
        id,
      },
    });
  }
  async createCourse({ title }: CreateCourseParams) {
    const slug = slugify(title, {
      lower: true,
    });

    const courseWithSameSlug = await this.prisma.course.findUnique({
      where: { slug },
    });

    if (courseWithSameSlug) {
      throw new Error('Another course with same slug already exists.');
    }

    return await this.prisma.course.create({ data: { title, slug } });
  }
}
