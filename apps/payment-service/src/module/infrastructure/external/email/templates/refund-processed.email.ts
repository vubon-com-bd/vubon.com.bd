/**
 * RefundProcessedEmail
 * @module payment-service/infrastructure/external/email/templates
 */
import { BaseEmailTemplate, type EmailTemplateVariables } from '@vubon/shared-kernel/infrastructure/external/email';

export class RefundProcessedEmail extends BaseEmailTemplate {
  readonly name = 'refund-processed';
  readonly variables = ['recipientName', 'refundId', 'amount', 'currency', 'completedAt'];

  render(vars: EmailTemplateVariables): { subject: string; html: string; text?: string } {
    const subject = `Refund Processed — ${String(vars['amount'] ?? '')} ${String(vars['currency'] ?? '')}`;
    const html = `<!DOCTYPE html>
<html><body style="font-family: sans-serif; max-width: 600px; margin: 24px auto;">
  <h2 style="color: #0891b2;">💸 Refund Processed</h2>
  <p>Hi ${String(vars['recipientName'] ?? 'Customer')},</p>
  <p>Your refund has been processed. It may take 3–7 business days to appear on your statement.</p>
  <p><strong>Refund ID:</strong> ${String(vars['refundId'] ?? '')}</p>
  <p><strong>Amount:</strong> ${String(vars['amount'] ?? '')} ${String(vars['currency'] ?? '')}</p>
  <p><strong>Processed:</strong> ${String(vars['completedAt'] ?? '')}</p>
</body></html>`;
    return { subject, html };
  }
}
