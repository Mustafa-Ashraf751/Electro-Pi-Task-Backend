// src/categories/dto/create-category.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  emoji: string;

  @IsString()
  @IsNotEmpty()
  image: string;
}