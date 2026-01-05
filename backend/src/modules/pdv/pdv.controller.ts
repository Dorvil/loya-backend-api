import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { PdvService } from './pdv.service';
import { AddItemDto } from './dto/add-item.dto';
import { CheckoutDto } from './dto/checkout.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('pdv')
@UseGuards(JwtAuthGuard)
@Controller('pdv')
export class PdvController {
  constructor(private readonly pdvService: PdvService) {}

  @Post('cart/add-item')
  @ApiOperation({ summary: 'Add item to current open order (cart)' })
  addItem(@Request() req: any, @Body() dto: AddItemDto) {
    return this.pdvService.addItem(req.user.userId, req.user.tenantId, dto);
  }

  @Post('checkout')
  @ApiOperation({ summary: 'Checkout current open order' })
  checkout(@Request() req: any, @Body() dto: CheckoutDto) {
    return this.pdvService.checkout(req.user.userId, req.user.tenantId, dto);
  }
}
