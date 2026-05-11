import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './schemas/cart.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CartsService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}
  async create(createCartDto: CreateCartDto, userId: string): Promise<Cart> {
    const cart = await this.cartModel.findOneAndUpdate(
      { userId },                          
      { ...createCartDto, userId },        
      { new: true, upsert: true },         
    ).exec();
    return cart;
  }

  async findAll(): Promise<Cart[]> {
    return await this.cartModel.find().exec();
  }

  async findOne(id: string): Promise<Cart | null> {
    return await this.cartModel.findById(id).exec();
  }

  async update(id: string, updateCartDto: UpdateCartDto): Promise<Cart | null> {
    return await this.cartModel.findByIdAndUpdate(id, updateCartDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Cart | null> {
    return await this.cartModel.findByIdAndDelete(id).exec();
  }
}
