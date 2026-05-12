import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './schemas/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}
  async create(createOrderDto: CreateOrderDto, userId: string): Promise<Order> {
    return await this.orderModel.create({ ...createOrderDto, userId });
  }

  async findAll(): Promise<Order[]> {
    return await this.orderModel.find().exec();
  }

  async findByUser(userId: string): Promise<Order[]> {
    return await this.orderModel.find({ userId }).exec();
  }

  async findOne(id: string): Promise<Order | null> {
    return await this.orderModel.findById(id).exec();
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order | null> {
    return await this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true }).exec();
  }

  async updateStatus(id: string, status: string): Promise<Order | null> {
    return await this.orderModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }

  async updatePaymentStatus(id: string, paymentStatus: string): Promise<Order | null> {
    return await this.orderModel
      .findByIdAndUpdate(id, { paymentStatus }, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Order | null> {
    return await this.orderModel.findByIdAndDelete(id).exec();
  }
}
