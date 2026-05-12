import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto, DeliveryAddressDto } from './create-order.dto';
import { IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsEnum(['pending', 'preparing', 'on_the_way', 'delivered', 'cancelled'])
  @IsOptional()
  status?: string;

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
