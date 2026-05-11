import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Max, Min } from 'class-validator';
import  { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({
    timestamps: true,
})
export class Product extends Document {
    @Prop({ required: true })
    @IsString()
    @IsNotEmpty()
    name: string;

    @Prop({ required: true })
    @IsString()
    @IsNotEmpty()
    @IsString()
    description: string;

    @Prop({ required: true })
    @IsNumber()
    price: number;

    @IsNumber()
    @IsOptional()
    @Min(0)
    @Max(5)
    @Prop({ default: 0 })
    rating: number;

    @Prop({ required: true })
    @IsString()
    @IsNotEmpty()
    category: string;

    @Prop({ required: true })
    @IsString()
    @IsNotEmpty()
    @IsUrl()
    image: string;
    
    createdAt?: Date;
    updatedAt?: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);