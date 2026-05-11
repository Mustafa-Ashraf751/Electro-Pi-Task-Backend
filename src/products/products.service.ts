import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async create(createProductDto: CreateProductDto): Promise<ProductDocument> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<ProductDocument[]> {
    return await this.productModel.find().exec();
  }

  async findOne(id: string): Promise<ProductDocument | null> {
    return await this.productModel.findById(id).exec();
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductDocument | null> {
    return await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
  }

  async remove(id: string): Promise<ProductDocument | null> {
    return await this.productModel.findByIdAndDelete(id).exec();
  }

  async getProductsByCategory(category: string): Promise<ProductDocument[]> {
    return await this.productModel.find({ category }).exec();
  }

}

