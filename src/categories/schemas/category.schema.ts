// src/categories/schemas/category.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category extends Document {
  @Prop({ required: true, unique: true })
  id: string;       

  @Prop({ required: true })
  name: string;     

  @Prop({ required: true })
  emoji: string;    

  @Prop({ required: true })
  image: string;  
}

export const CategorySchema = SchemaFactory.createForClass(Category);