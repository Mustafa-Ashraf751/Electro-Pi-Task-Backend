import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Max, Min } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    price: number;

    @IsNumber()
    @IsOptional()
    @Min(0)
    @Max(5)
    @IsOptional()
    @Prop({ default: 0 })
    rating: number;

    @IsString()
    @IsNotEmpty()
    category: string;
    
    @IsString()
    @IsNotEmpty()
    @IsUrl()
    image: string;
}
