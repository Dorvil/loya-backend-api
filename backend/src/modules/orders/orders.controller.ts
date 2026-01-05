import { Controller, Get, Param, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('orders')
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'List all orders' })
  findAll(@Request() req: any) {
    return this.ordersService.findAll(req.user.tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by id' })
  async findOne(@Param('id') id: string, @Request() req: any) {
    const order = await this.ordersService.findOne(id, req.user.tenantId);
    if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }
}
