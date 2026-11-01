/**
 * PaymentFailedEmail
 * @module payment-service/infrastructure/external/email/templates
 */
import { BaseEmailTemplate, type EmailTemplateVariables } from '@vubon/shared-kernel/infrastructure/external/email';

export class PaymentFailedEmail extends BaseEmailTemplate {
  readonly name = 'payment-failed';
  readonly variables = ['recipientName', 'paymentId', 'reason', 'retryUrl'];

  render(vars: EmailTemplateVariables): { subject: string; html: string; text?: string } {
    const subject = 'Payment Failed — Action Required';
    const html = `<!DOCTYPE html>
<html><body style="font-family: sans-serif; max-width: 600px; margin: 24px auto;">
  <h2 style="color: #dc2626;">❌ Payment Failed</h2>
  <p>Hi ${String(vars['recipientName'] ?? 'Customer')},</p>
  <p>Unfortunately, your payment could not be processed.</p>
  <p><strong>Payment ID:</strong> ${String(vars['paymentId'] ?? '')}</p>
  <p><strong>Reason:</strong> ${String(vars['reason'] ?? 'Unknown')}</p>
  ${vars['retryUrl'] ? `<p><a href="${String(vars['retryUrl'])}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Retry Payment</a></p>` : ''}
</body></html>`;
    return { subject, html };
  }
}
