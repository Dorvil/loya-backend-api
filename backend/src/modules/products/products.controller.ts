import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../../common/enums';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Create a product' })
  create(@Request() req: any, @Body() createProductDto: CreateProductDto) {
    return this.productsService.create(req.user.tenantId, createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all products' })
  findAll(@Request() req: any) {
    return this.productsService.findAll(req.user.tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by id' })
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.productsService.findOne(req.user.tenantId, id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Update a product' })
  update(@Request() req: any, @Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(req.user.tenantId, id, updateProductDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete a product' })
  remove(@Request() req: any, @Param('id') id: string) {
    return this.productsService.remove(req.user.tenantId, id);
  }
}
