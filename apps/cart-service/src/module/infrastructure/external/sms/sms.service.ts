/**
 * CartSmsService — cart-specific SMS facade
 * @module cart-service/infrastructure/external/sms
 */
import { Injectable, Logger } from '@nestjs/common';
import { SmsService as KernelSmsService } from '@vubon/shared-kernel/infrastructure/external/sms';

@Injectable()
export class CartSmsService {
  private readonly logger = new Logger(CartSmsService.name);

  constructor(private readonly kernel: KernelSmsService) {}

  async sendAbandonedCartReminder(params: {
    to: string;
    itemCount: number;
    ctaUrl: string;
    reminderNumber: number;
  }): Promise<boolean> {
    const body = `You left ${params.itemCount} item(s) in your cart. Complete your purchase: ${params.ctaUrl}`;
    const result = await this.kernel.send({
      to: params.to,
      message: body,
    });
    this.logger.log(`SMS reminder #${params.reminderNumber} → ${params.to} (success=${result.success})`);
    return result.success;
  }

  async sendPriceDropAlert(params: {
    to: string;
    savingsAmount: number;
    currency: string;
    ctaUrl: string;
  }): Promise<boolean> {
    const body = `Price drop! Save ${params.savingsAmount} ${params.currency}. View cart: ${params.ctaUrl}`;
    const result = await this.kernel.send({ to: params.to, message: body });
    return result.success;
  }
}
