import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { CashierService } from './cashier.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('cashier')
@UseGuards(JwtAuthGuard)
@Controller('cashier')
export class CashierController {
  constructor(private readonly cashierService: CashierService) {}

  @Post('open')
  @ApiOperation({ summary: 'Open a cashier session' })
  open(@Request() req: any) {
    return this.cashierService.openSession(req.user.userId, req.user.tenantId);
  }

  @Post('close')
  @ApiOperation({ summary: 'Close the current cashier session' })
  close(@Request() req: any) {
    return this.cashierService.closeSession(req.user.userId, req.user.tenantId);
  }

  @Get('session')
  @ApiOperation({ summary: 'Get current open session' })
  getSession(@Request() req: any) {
    return this.cashierService.getOpenSession(req.user.userId, req.user.tenantId);
  }
}
