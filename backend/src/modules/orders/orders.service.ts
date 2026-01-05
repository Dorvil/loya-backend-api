import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  findAll(tenantId: string) {
    return this.prisma.order.findMany({
      where: { tenantId },
      include: {
        orderItems: {
            include: { product: true }
        },
        customer: true,
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: string, tenantId: string) {
    return this.prisma.order.findFirst({
      where: { id, tenantId },
      include: {
        orderItems: {
            include: { product: true }
        },
        customer: true,
      },
    });
  }
}
