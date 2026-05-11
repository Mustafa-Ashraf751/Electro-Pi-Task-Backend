import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto, DeliveryAddressDto } from './create-order.dto';
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  status: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ValidateNested()
  @Type(() => DeliveryAddressDto)
  deliveryAddress: DeliveryAddressDto;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  paymentMethod: string;
}
