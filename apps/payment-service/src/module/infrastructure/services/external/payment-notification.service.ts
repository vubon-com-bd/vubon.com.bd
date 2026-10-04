/**
 * PaymentNotificationService — external adapter (email/SMS/push dispatcher)
 * @module payment-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { EmailService, SmsService, PushService } from '@vubon/shared-kernel/infrastructure/external';

export const PAYMENT_NOTIFICATION_SERVICE = Symbol('PAYMENT_NOTIFICATION_SERVICE');

export interface PaymentNotificationPayload {
  readonly userId: string;
  readonly paymentId: string;
  readonly template: string;
  readonly data?: Readonly<Record<string, unknown>>;
}

export interface IPaymentNotificationService {
  notifyCustomer(payload: PaymentNotificationPayload): Promise<boolean>;
  notifyVendor(payload: PaymentNotificationPayload): Promise<boolean>;
}

@Injectable()
export class PaymentNotificationService implements IPaymentNotificationService {
  private readonly logger = new Logger(PaymentNotificationService.name);

  constructor(
    private readonly email: EmailService,
    private readonly sms: SmsService,
    private readonly push: PushService,
  ) {}

  async notifyCustomer(payload: PaymentNotificationPayload): Promise<boolean> {
    this.logger.log(
      `[customer] ${payload.template} → user=${payload.userId} payment=${payload.paymentId}`,
    );
    try {
      await this.push.send({
        deviceToken: `user:${payload.userId}`,
        title: this.titleFor(payload.template),
        body: this.bodyFor(payload.template, payload.data),
        data: { paymentId: payload.paymentId, template: payload.template },
      });
      return true;
    } catch (err) {
      this.logger.warn(
        `push fan-out failed: ${err instanceof Error ? err.message : 'unknown'}`,
      );
      return false;
    }
  }

  async notifyVendor(payload: PaymentNotificationPayload): Promise<boolean> {
    this.logger.log(
      `[vendor] ${payload.template} → user=${payload.userId} payment=${payload.paymentId}`,
    );
    try {
      await this.email.send({
        to: `vendor+${payload.userId}@vubon.com.bd`,
        subject: this.titleFor(payload.template),
        text: this.bodyFor(payload.template, payload.data),
      });
      return true;
    } catch {
      return false;
    }
  }

  private titleFor(template: string): string {
    const map: Record<string, string> = {
      payment_initiated: 'Payment initiated',
      payment_captured: 'Payment captured',
      payment_paid: 'Payment successful',
      payment_failed: 'Payment failed',
      payment_declined: 'Payment declined',
      payment_refunded: 'Refund processed',
      payment_chargeback: 'Chargeback received',
      refund_requested: 'Refund requested',
      refund_succeeded: 'Refund succeeded',
      refund_failed: 'Refund failed',
    };
    return map[template] ?? `Payment update: ${template}`;
  }

  private bodyFor(template: string, data?: Readonly<Record<string, unknown>>): string {
    const amount = data?.['amount'] ?? '';
    const currency = data?.['currency'] ?? '';
    return `${template}${amount ? ` — ${amount} ${currency}` : ''}`;
  }
}

// Re-export for caller convenience
export { EmailService, SmsService, PushService };
