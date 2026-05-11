// src/categories/categories.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {}

  async findAll(): Promise<CategoryDocument[]> {
    return this.categoryModel.find().exec();
  }

  async create(dto: CreateCategoryDto): Promise<CategoryDocument> {
    return new this.categoryModel(dto).save();
  }
}