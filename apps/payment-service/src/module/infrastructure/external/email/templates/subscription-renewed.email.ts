/**
 * SubscriptionRenewedEmail
 * @module payment-service/infrastructure/external/email/templates
 */
import { BaseEmailTemplate, type EmailTemplateVariables } from '@vubon/shared-kernel/infrastructure/external/email';

export class SubscriptionRenewedEmail extends BaseEmailTemplate {
  readonly name = 'subscription-renewed';
  readonly variables = ['recipientName', 'subscriptionId', 'plan', 'amount', 'currency', 'periodEnd'];

  render(vars: EmailTemplateVariables): { subject: string; html: string; text?: string } {
    const subject = `Subscription Renewed — ${String(vars['plan'] ?? '')}`;
    const html = `<!DOCTYPE html>
<html><body style="font-family: sans-serif; max-width: 600px; margin: 24px auto;">
  <h2>🔄 Subscription Renewed</h2>
  <p>Hi ${String(vars['recipientName'] ?? 'Customer')},</p>
  <p>Your subscription has been renewed successfully.</p>
  <p><strong>Plan:</strong> ${String(vars['plan'] ?? '')}</p>
  <p><strong>Amount:</strong> ${String(vars['amount'] ?? '')} ${String(vars['currency'] ?? '')}</p>
  <p><strong>Valid Until:</strong> ${String(vars['periodEnd'] ?? '')}</p>
  <p style="color: #6b7280;">Subscription ID: ${String(vars['subscriptionId'] ?? '')}</p>
</body></html>`;
    return { subject, html };
  }
}
