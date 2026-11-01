/**
 * PaymentSmsService — wraps kernel SmsService with payment templates
 * @module payment-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { SmsService as KernelSmsService } from '@vubon/shared-kernel/infrastructure/external/sms';

export const PAYMENT_SMS_SERVICE = Symbol('PAYMENT_SMS_SERVICE');

export interface PaymentSmsPayload {
  readonly to: string;
  readonly template: string;
  readonly data: Readonly<Record<string, unknown>>;
}

@Injectable()
export class PaymentSmsService {
  private readonly logger = new Logger(PaymentSmsService.name);

  constructor(private readonly kernel: KernelSmsService) {}

  async send(payload: PaymentSmsPayload): Promise<boolean> {
    try {
      const message = this.renderMessage(payload.template, payload.data);
      const result = await this.kernel.send({
        to: payload.to,
        message,
      });
      this.logger.debug(`[sms] ${payload.template} → ${payload.to} (success=${result.success})`);
      return result.success;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`[sms] ${payload.template} → ${payload.to} failed: ${msg}`);
      return false;
    }
  }

  private renderMessage(template: string, data: Readonly<Record<string, unknown>>): string {
    const amount = data['amount'] ?? '';
    const currency = data['currency'] ?? '';
    const id = (data['paymentId'] ?? data['refundId'] ?? '') as string;
    switch (template) {
      case 'payment_success':
        return `Payment of ${amount} ${currency} confirmed. Ref: ${id.slice(-8)}. - Vubon`;
      case 'payment_failed':
        return `Payment failed. Ref: ${id.slice(-8)}. Please retry. - Vubon`;
      case 'refund_processed':
        return `Refund of ${amount} ${currency} processed. Ref: ${id.slice(-8)}. - Vubon`;
      default:
        return `Vubon: ${template}`;
    }
  }
}
