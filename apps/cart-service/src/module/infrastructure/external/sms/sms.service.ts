/**
 * CartSmsService — wraps shared-kernel SmsService
 * @module cart-service/infrastructure/external/sms
 */
import { Injectable } from '@nestjs/common';
import { SmsService as KernelSmsService } from '@vubon/shared-kernel/infrastructure';

export const CART_SMS_SERVICE = Symbol('CART_SMS_SERVICE');

@Injectable()
export class CartSmsService {
  constructor(private readonly kernel: KernelSmsService) {}

  async sendAbandonedCartReminder(params: {
    to: string;
    itemCount: number;
    cartValue: number;
    currency: string;
  }): Promise<boolean> {
    const res = await this.kernel.send({
      to: params.to,
      message: `You have ${params.itemCount} item(s) worth ${params.currency} ${params.cartValue} waiting in your cart. Complete your purchase now!`,
    });
    return res.success;
  }
}
