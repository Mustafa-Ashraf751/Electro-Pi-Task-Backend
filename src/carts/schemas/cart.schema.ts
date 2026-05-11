import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type CartDocument = Cart & Document;


@Schema({
  timestamps: true,
})
export class Cart {

  @Prop({
    required: true,
  })
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

  @Prop({
    default: 0,
  })
  totalPrice: number;

  @Prop({
    default: 0,
  })
  totalQuantity: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
