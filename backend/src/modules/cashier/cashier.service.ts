import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CashierStatus } from '../../common/enums';

@Injectable()
export class CashierService {
  constructor(private prisma: PrismaService) {}

  async openSession(userId: string, tenantId: string) {
    // Check if user already has an open session
    const existing = await this.prisma.cashierSession.findFirst({
      where: {
        openedByUserId: userId,
        tenantId,
        status: CashierStatus.OPEN,
      },
    });

    if (existing) {
      throw new BadRequestException('User already has an open cashier session.');
    }

    return this.prisma.cashierSession.create({
      data: {
        tenantId,
        openedByUserId: userId,
        status: CashierStatus.OPEN,
      },
    });
  }

  async closeSession(userId: string, tenantId: string) {
    const session = await this.prisma.cashierSession.findFirst({
        where: {
            openedByUserId: userId,
            tenantId,
            status: CashierStatus.OPEN
        }
    });

    if (!session) {
        throw new NotFoundException('No open session found to close.');
    }

    return this.prisma.cashierSession.update({
        where: { id: session.id },
        data: {
            status: CashierStatus.CLOSED,
            closedAt: new Date(),
        }
    });
  }

  async getOpenSession(userId: string, tenantId: string) {
    const session = await this.prisma.cashierSession.findFirst({
        where: {
            openedByUserId: userId,
            tenantId,
            status: CashierStatus.OPEN
        }
    });

    if (!session) {
        throw new NotFoundException('No open session found.');
    }
    return session;
  }
}
