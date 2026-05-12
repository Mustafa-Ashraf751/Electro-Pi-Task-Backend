import { Controller, Post, Param, UseGuards, Req, Headers, RawBodyRequest } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { OrdersService } from 'src/orders/orders.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('payments')
export class PaymentsController {
  constructor(
    private paymentsService: PaymentsService,
    private ordersService: OrdersService,
  ) {}

  // Called by frontend after order is created — returns Stripe checkout URL
  @UseGuards(JwtAuthGuard)
  @Post('checkout/:orderId')
  async createCheckout(@Param('orderId') orderId: string) {
    const order = await this.ordersService.findOne(orderId);
    return this.paymentsService.createCheckoutSession(orderId, order!.items, order!.totalPrice);
  }

  // Called by Stripe after payment — updates order status
  @Post('webhook')
  async handleWebhook(
    @Req() req: any,
    @Headers('stripe-signature') signature: string,
  ) {
    const event = this.paymentsService.constructWebhookEvent(req.rawBody!, signature);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      const orderId = session.metadata.orderId;
      if (session.payment_status === 'paid') {
          await this.ordersService.updatePaymentStatus(orderId, 'paid');
      }
    }

    if (event.type === 'checkout.session.expired') {
      const session = event.data.object as any;
      const orderId = session.metadata.orderId;
      await this.ordersService.updatePaymentStatus(orderId, 'failed');
    }

    return { received: true };
  }
}