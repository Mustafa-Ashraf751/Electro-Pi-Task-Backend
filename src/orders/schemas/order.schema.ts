import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {

  @Prop({ required: true })
  userId: string;

  @Prop({
    type: [
      {
        productId: String,
        title: String,
        image: String,
        price: Number,
        quantity: Number,
      },
    ],
    default: [],
  })
  items: any[];

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true })
  totalQuantity: number;

  @Prop({
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  })
  status: string;

  @Prop({
    type: {
      fullName: String,
      phone: String,
      street: String,
      city: String,
      zip: String,
    },
    required: true,
  })
  deliveryAddress: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    zip: string;
  };

  @Prop({
    type: String,
    enum: ['cash', 'card'],
    default: 'cash',
  })
  paymentMethod: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);