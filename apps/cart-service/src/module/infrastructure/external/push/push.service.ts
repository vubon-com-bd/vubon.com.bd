/**
 * CartPushService — wraps shared-kernel PushService
 * @module cart-service/infrastructure/external/push
 *
 * NOTE: Push uses deviceToken (not userId). Callers must resolve
 * userId → deviceToken before calling this service.
 */
import { Injectable } from '@nestjs/common';
import { PushService as KernelPushService } from '@vubon/shared-kernel/infrastructure';

export const CART_PUSH_SERVICE = Symbol('CART_PUSH_SERVICE');

@Injectable()
export class CartPushService {
  constructor(private readonly kernel: KernelPushService) {}

  async sendAbandonedCart(params: {
    deviceToken: string;
    title?: string;
    body?: string;
    data?: Readonly<Record<string, unknown>>;
  }): Promise<boolean> {
    const res = await this.kernel.send({
      deviceToken: params.deviceToken,
      title: params.title ?? 'Cart reminder',
      body: params.body ?? 'You have items waiting in your cart!',
      data: params.data,
    });
    return res.success;
  }

  async sendPriceDrop(params: {
    deviceToken: string;
    productName: string;
    oldPrice: number;
    newPrice: number;
    productUrl?: string;
  }): Promise<boolean> {
    const res = await this.kernel.send({
      deviceToken: params.deviceToken,
      title: 'Price drop!',
      body: `${params.productName}: ${params.oldPrice} → ${params.newPrice}`,
      data: params.productUrl ? { url: params.productUrl } : undefined,
    });
    return res.success;
  }
}
