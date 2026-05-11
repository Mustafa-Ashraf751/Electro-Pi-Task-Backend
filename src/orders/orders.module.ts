import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]), AuthModule],
})
export class OrdersModule {}
