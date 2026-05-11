import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class DeliveryAddressDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  zip: string;
}

export class CreateOrderDto {
  @IsArray()
  @IsNotEmpty()
  items: any[];

  @IsNumber()
  totalPrice: number;

  @IsNumber()
  totalQuantity: number;

  @ValidateNested()
  @Type(() => DeliveryAddressDto)
  deliveryAddress: DeliveryAddressDto;

  @IsEnum(['cash', 'card'])
  @IsOptional()
  paymentMethod?: string;
}