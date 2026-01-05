import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../../common/enums';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('customers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER, Role.SELLER)
  @ApiOperation({ summary: 'Create a customer' })
  create(@Request() req: any, @Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(req.user.tenantId, createCustomerDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.MANAGER, Role.SELLER)
  @ApiOperation({ summary: 'List all customers' })
  findAll(@Request() req: any) {
    return this.customersService.findAll(req.user.tenantId);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.MANAGER, Role.SELLER)
  @ApiOperation({ summary: 'Get a customer by id' })
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.customersService.findOne(req.user.tenantId, id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Update a customer' })
  update(@Request() req: any, @Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(req.user.tenantId, id, updateCustomerDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete a customer' })
  remove(@Request() req: any, @Param('id') id: string) {
    return this.customersService.remove(req.user.tenantId, id);
  }
}
