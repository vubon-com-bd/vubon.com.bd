/**
 * CartPushService — cart-specific push notification facade
 * @module cart-service/infrastructure/external/push
 */
import { Injectable, Logger } from '@nestjs/common';
import { PushService as KernelPushService } from '@vubon/shared-kernel/infrastructure/external/push';

@Injectable()
export class CartPushService {
  private readonly logger = new Logger(CartPushService.name);

  constructor(private readonly kernel: KernelPushService) {}

  async sendAbandonedCartReminder(params: {
    deviceToken: string;
    itemCount: number;
    abandonedCartId: string;
  }): Promise<boolean> {
    const result = await this.kernel.send({
      deviceToken: params.deviceToken,
      title: 'Your cart misses you',
      body: `${params.itemCount} item(s) are waiting for you`,
      data: { abandonedCartId: params.abandonedCartId },
    });
    this.logger.log(
      `Push reminder → ${params.deviceToken.slice(0, 12)}... (success=${result.success})`,
    );
    return result.success;
  }

  async sendPriceDropAlert(params: {
    deviceToken: string;
    savingsAmount: number;
    currency: string;
    cartId: string;
  }): Promise<boolean> {
    const result = await this.kernel.send({
      deviceToken: params.deviceToken,
      title: 'Price drop alert!',
      body: `Save ${params.savingsAmount} ${params.currency} on your cart`,
      data: { cartId: params.cartId },
    });
    return result.success;
  }

  async sendBackInStockAlert(params: {
    deviceToken: string;
    productName: string;
    productId: string;
  }): Promise<boolean> {
    const result = await this.kernel.send({
      deviceToken: params.deviceToken,
      title: 'Back in stock',
      body: `${params.productName} is available again`,
      data: { productId: params.productId },
    });
    return result.success;
  }
}
