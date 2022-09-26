import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
interface CreateCustomerParams {
  authUserId: string;
}
@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}
  getCustomerByAuthUserId(id: string) {
    return this.prisma.customer.findUnique({
      where: {
        authUserId: id,
      },
    });
  }
  async createProduct({ authUserId }: CreateCustomerParams) {
    return await this.prisma.customer.create({ data: { authUserId } });
  }
}
