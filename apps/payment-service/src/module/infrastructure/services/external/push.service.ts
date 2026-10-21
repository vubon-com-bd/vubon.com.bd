/**
 * PaymentPushService — wraps kernel PushService with payment templates
 * @module payment-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { PushService as KernelPushService } from '@vubon/shared-kernel/infrastructure/external/push';

export const PAYMENT_PUSH_SERVICE = Symbol('PAYMENT_PUSH_SERVICE');

export interface PaymentPushPayload {
  readonly userId: string;
  readonly template: string;
  readonly data: Readonly<Record<string, unknown>>;
}

@Injectable()
export class PaymentPushService {
  private readonly logger = new Logger(PaymentPushService.name);

  constructor(private readonly kernel: KernelPushService) {}

  async send(payload: PaymentPushPayload): Promise<boolean> {
    try {
      const title = this.titleFor(payload.template);
      const body = this.bodyFor(payload.template, payload.data);
      const result = await this.kernel.send({
        deviceToken: `user:${payload.userId}`,
        title,
        body,
        data: { template: payload.template, ...payload.data },
      });
      this.logger.debug(`[push] ${payload.template} → ${payload.userId} (success=${result.success})`);
      return result.success;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`[push] ${payload.template} → ${payload.userId} failed: ${msg}`);
      return false;
    }
  }

  private titleFor(template: string): string {
    const map: Record<string, string> = {
      payment_success: 'Payment Successful',
      payment_failed: 'Payment Failed',
      refund_processed: 'Refund Processed',
    };
    return map[template] ?? 'Payment Update';
  }

  private bodyFor(template: string, data: Readonly<Record<string, unknown>>): string {
    const amount = data['amount'] ?? '';
    const currency = data['currency'] ?? '';
    switch (template) {
      case 'payment_success':
        return `Your payment of ${amount} ${currency} was successful.`;
      case 'payment_failed':
        return `Your payment failed. Please retry.`;
      case 'refund_processed':
        return `Your refund of ${amount} ${currency} has been processed.`;
      default:
        return 'Payment update';
    }
  }
}
