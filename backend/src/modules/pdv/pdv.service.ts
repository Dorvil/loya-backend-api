import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { AddItemDto } from './dto/add-item.dto';
import { CheckoutDto } from './dto/checkout.dto';
import { OrderStatus, PaymentMethod } from '../../common/enums';

@Injectable()
export class PdvService {
  constructor(private prisma: PrismaService) {}

  async addItem(userId: string, tenantId: string, dto: AddItemDto) {
    const { productId, qty } = dto;

    const product = await this.prisma.product.findFirst({
      where: { id: productId, tenantId },
    });
    if (!product) throw new NotFoundException('Product not found');

    let order = await this.prisma.order.findFirst({
      where: {
        userId,
        tenantId,
        status: OrderStatus.PENDING,
      } as any,
      include: { orderItems: true },
    });

    if (!order) {
      order = await this.prisma.order.create({
        data: {
          tenantId,
          userId,
          status: OrderStatus.PENDING,
          subtotal: 0,
          discount: 0,
          freight: 0,
          total: 0,
          paymentMethod: PaymentMethod.CASH,
        } as any,
        include: { orderItems: true },
      }) as any;
    }

    const existingItem = order!.orderItems.find((i: any) => i.productId === productId);

    if (existingItem) {
      const newQty = existingItem.qty + qty;
      const total = newQty * Number(product.price);
      await this.prisma.orderItem.update({
        where: { id: existingItem.id },
        data: {
          qty: newQty,
          unitPrice: product.price,
          total,
        },
      });
    } else {
      const total = qty * Number(product.price);
      await this.prisma.orderItem.create({
        data: {
          orderId: order!.id,
          productId,
          qty,
          unitPrice: product.price,
          total,
        },
      });
    }

    return this.recalculateOrder(order!.id);
  }

  async checkout(userId: string, tenantId: string, dto: CheckoutDto) {
    const order = await this.prisma.order.findFirst({
      where: {
        userId,
        tenantId,
        status: OrderStatus.PENDING,
      } as any,
      include: { orderItems: true },
    });

    if (!order) throw new NotFoundException('No pending order found for this user.');
    if (order.orderItems.length === 0) throw new BadRequestException('Cart is empty.');

    const subtotal = Number(order.subtotal);
    const discount = dto.discount || 0;
    const freight = dto.freight || 0;
    const total = subtotal + freight - discount;

    const updatedOrder = await this.prisma.order.update({
      where: { id: order.id },
      data: {
        paymentMethod: dto.paymentMethod,
        discount,
        freight,
        total,
        customerId: dto.customerId,
        status: OrderStatus.PAID,
      },
    });

    return updatedOrder;
  }

  private async recalculateOrder(orderId: string) {
    const orderItems = await this.prisma.orderItem.findMany({
      where: { orderId },
    });

    const subtotal = orderItems.reduce((acc, item) => acc + Number(item.total), 0);

    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order) return;
    const total = subtotal + Number(order.freight) - Number(order.discount);

    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        subtotal,
        total,
      },
      include: { orderItems: { include: { product: true } } },
    });
  }
}
