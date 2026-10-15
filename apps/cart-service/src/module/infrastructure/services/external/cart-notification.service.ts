/**
 * CartNotificationService — multi-channel notify dispatcher
 * @module cart-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { CartEmailService } from '../../external/email/email.service.js';
import { CartSmsService } from '../../external/sms/sms.service.js';
import { CartPushService } from '../../external/push/push.service.js';

export const CART_NOTIFICATION_SERVICE = Symbol('CART_NOTIFICATION_SERVICE');

export interface AbandonedCartNotifyPayload {
  readonly abandonedCartId: string;
  readonly userId: string;
  readonly email?: string;
  readonly phone?: string;
  readonly deviceToken?: string;
  readonly itemCount: number;
  readonly cartValue: number;
  readonly currency: string;
  readonly reminderNumber: number;
  readonly ctaUrl: string;
}

@Injectable()
export class CartNotificationService {
  private readonly logger = new Logger(CartNotificationService.name);

  constructor(
    private readonly email: CartEmailService,
    private readonly sms: CartSmsService,
    private readonly push: CartPushService,
  ) {}

  async notifyAbandonedCart(payload: AbandonedCartNotifyPayload): Promise<{
    readonly email: boolean;
    readonly sms: boolean;
    readonly push: boolean;
  }> {
    const results = { email: false, sms: false, push: false };

    if (payload.email) {
      results.email = await this.email.sendAbandonedCartReminder({
        to: payload.email,
        recipientName: 'Customer',
        itemCount: payload.itemCount,
        cartValue: payload.cartValue,
        currency: payload.currency,
        ctaUrl: payload.ctaUrl,
        reminderNumber: payload.reminderNumber,
      });
    }

    if (payload.phone && payload.reminderNumber <= 2) {
      results.sms = await this.sms.sendAbandonedCartReminder({
        to: payload.phone,
        itemCount: payload.itemCount,
        ctaUrl: payload.ctaUrl,
        reminderNumber: payload.reminderNumber,
      });
    }

    if (payload.deviceToken) {
      results.push = await this.push.sendAbandonedCartReminder({
        deviceToken: payload.deviceToken,
        itemCount: payload.itemCount,
        abandonedCartId: payload.abandonedCartId,
      });
    }

    this.logger.log(
      `Abandoned notify [${payload.abandonedCartId}] #${payload.reminderNumber} — email=${results.email} sms=${results.sms} push=${results.push}`,
    );
    return results;
  }

  async notifyPriceDrop(payload: {
    readonly userId: string;
    readonly email?: string;
    readonly deviceToken?: string;
    readonly productCount: number;
    readonly savingsAmount: number;
    readonly currency: string;
    readonly ctaUrl: string;
  }): Promise<void> {
    if (payload.email) {
      await this.email.sendPriceDropAlert({
        to: payload.email,
        recipientName: 'Customer',
        productCount: payload.productCount,
        savingsAmount: payload.savingsAmount,
        currency: payload.currency,
        ctaUrl: payload.ctaUrl,
      });
    }
    if (payload.deviceToken) {
      await this.push.sendPriceDropAlert({
        deviceToken: payload.deviceToken,
        savingsAmount: payload.savingsAmount,
        currency: payload.currency,
        cartId: payload.userId,
      });
    }
  }

  async notifyBackInStock(payload: {
    readonly email?: string;
    readonly deviceToken?: string;
    readonly productId: string;
    readonly productName: string;
    readonly ctaUrl: string;
  }): Promise<void> {
    if (payload.email) {
      await this.email.sendBackInStockAlert({
        to: payload.email,
        recipientName: 'Customer',
        productName: payload.productName,
        ctaUrl: payload.ctaUrl,
      });
    }
    if (payload.deviceToken) {
      await this.push.sendBackInStockAlert({
        deviceToken: payload.deviceToken,
        productName: payload.productName,
        productId: payload.productId,
      });
    }
  }
}
