import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaymentMethod } from '../../../common/enums';
import { ApiProperty } from '@nestjs/swagger';

export class CheckoutDto {
  @ApiProperty({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  discount?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  freight?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  customerId?: string;
}
