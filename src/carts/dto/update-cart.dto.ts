import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsUrl,
  Min,
  ValidateNested,
} from 'class-validator';

export class UpdateCartItemDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsUrl()
  @IsOptional()
  image?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  quantity?: number;
}

export class UpdateCartDto {
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateCartItemDto)
  items?: UpdateCartItemDto[];

  @IsNumber()
  @Min(0)
  @IsOptional()
  totalPrice?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  totalQuantity?: number;
}