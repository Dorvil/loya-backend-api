import { IsNotEmpty, IsString, IsNumber, IsInt, Min, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Camiseta Básica' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'SKU-1234' })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({ example: '7891234567890' })
  @IsString()
  @IsOptional()
  barcode: string;

  @ApiProperty({ example: 49.90 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 100 })
  @IsInt()
  @Min(0)
  stock: number;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
