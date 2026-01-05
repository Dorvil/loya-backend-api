import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(tenantId: string, createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        ...createProductDto,
        tenantId,
      },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.product.findMany({
      where: { tenantId },
    });
  }

  async findOne(tenantId: string, id: string) {
    const product = await this.prisma.product.findFirst({
      where: { id, tenantId },
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async update(tenantId: string, id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(tenantId, id); // Ensure existence and ownership
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(tenantId: string, id: string) {
    await this.findOne(tenantId, id); // Ensure existence and ownership
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
