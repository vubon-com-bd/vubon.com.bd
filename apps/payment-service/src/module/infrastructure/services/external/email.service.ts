/**
 * PaymentEmailService — wraps kernel EmailService with payment templates
 * @module payment-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { EmailService as KernelEmailService } from '@vubon/shared-kernel/infrastructure/external/email';
import { getOptionalEnv } from '@vubon/shared-config/common';

export const PAYMENT_EMAIL_SERVICE = Symbol('PAYMENT_EMAIL_SERVICE');

export interface PaymentEmailPayload {
  readonly to: string;
  readonly template: string;
  readonly data: Readonly<Record<string, unknown>>;
}

@Injectable()
export class PaymentEmailService {
  private readonly logger = new Logger(PaymentEmailService.name);

  constructor(private readonly kernel: KernelEmailService) {}

  async send(payload: PaymentEmailPayload): Promise<boolean> {
    const from = getOptionalEnv('EMAIL_FROM', 'payments@vubon.com.bd');
    try {
      const result = await this.kernel.send({
        to: payload.to,
        subject: this.subjectFor(payload.template),
        html: this.renderHtml(payload.template, payload.data),
        from,
      });
      this.logger.debug(`[email] ${payload.template} → ${payload.to} (success=${result.success})`);
      return result.success;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`[email] ${payload.template} → ${payload.to} failed: ${msg}`);
      return false;
    }
  }

  private subjectFor(template: string): string {
    const map: Record<string, string> = {
      payment_success: 'Payment Successful',
      payment_failed: 'Payment Failed',
      refund_processed: 'Refund Processed',
      invoice_created: 'Invoice Generated',
      subscription_renewed: 'Subscription Renewed',
    };
    return map[template] ?? 'Payment Notification';
  }

  private renderHtml(template: string, data: Readonly<Record<string, unknown>>): string {
    const amount = data['amount'] ?? '';
    const currency = data['currency'] ?? '';
    const id = data['paymentId'] ?? data['refundId'] ?? data['invoiceId'] ?? '';
    return `<div style="font-family: sans-serif; max-width: 600px;">
  <h2>${this.subjectFor(template)}</h2>
  <p>Reference: <code>${id}</code></p>
  ${amount ? `<p>Amount: <strong>${amount} ${currency}</strong></p>` : ''}
  <p>Thank you for using Vubon.</p>
</div>`;
  }
}
