import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Max, Min } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;
  @IsNumber()
  @IsOptional()
  price: number;
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(5)
  @IsOptional()
  rating: number;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  category: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsUrl()
  image: string;
}
