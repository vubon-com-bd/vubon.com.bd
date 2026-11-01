/**
 * PaymentSuccessEmail — payment confirmation template
 * @module payment-service/infrastructure/external/email/templates
 */
import { BaseEmailTemplate, type EmailTemplateVariables } from '@vubon/shared-kernel/infrastructure/external/email';

export class PaymentSuccessEmail extends BaseEmailTemplate {
  readonly name = 'payment-success';
  readonly variables = ['recipientName', 'paymentId', 'amount', 'currency', 'gatewayReference', 'paidAt'];

  render(vars: EmailTemplateVariables): { subject: string; html: string; text?: string } {
    const subject = `Payment Successful — ${String(vars['amount'] ?? '')} ${String(vars['currency'] ?? '')}`;
    const html = `<!DOCTYPE html>
<html><body style="font-family: sans-serif; max-width: 600px; margin: 24px auto;">
  <h2 style="color: #16a34a;">✅ Payment Successful</h2>
  <p>Hi ${String(vars['recipientName'] ?? 'Customer')},</p>
  <p>Your payment has been confirmed.</p>
  <table cellpadding="8" style="border-collapse: collapse;">
    <tr><td><strong>Payment ID</strong></td><td>${String(vars['paymentId'] ?? '')}</td></tr>
    <tr><td><strong>Amount</strong></td><td>${String(vars['amount'] ?? '')} ${String(vars['currency'] ?? '')}</td></tr>
    ${vars['gatewayReference'] ? `<tr><td><strong>Transaction Ref</strong></td><td>${String(vars['gatewayReference'])}</td></tr>` : ''}
    <tr><td><strong>Paid At</strong></td><td>${String(vars['paidAt'] ?? '')}</td></tr>
  </table>
  <p style="margin-top: 24px; color: #6b7280;">Thank you for your business!</p>
</body></html>`;
    return { subject, html };
  }
}
