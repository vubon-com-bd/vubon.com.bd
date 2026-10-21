/**
 * InvoiceEmail
 * @module payment-service/infrastructure/external/email/templates
 */
import { BaseEmailTemplate, type EmailTemplateVariables } from '@vubon/shared-kernel/infrastructure/external/email';

export class InvoiceEmail extends BaseEmailTemplate {
  readonly name = 'invoice';
  readonly variables = ['recipientName', 'invoiceNumber', 'amount', 'currency', 'dueAt', 'invoiceUrl'];

  render(vars: EmailTemplateVariables): { subject: string; html: string; text?: string } {
    const subject = `Invoice ${String(vars['invoiceNumber'] ?? '')}`;
    const html = `<!DOCTYPE html>
<html><body style="font-family: sans-serif; max-width: 600px; margin: 24px auto;">
  <h2>📄 Invoice ${String(vars['invoiceNumber'] ?? '')}</h2>
  <p>Hi ${String(vars['recipientName'] ?? 'Customer')},</p>
  <p>Your invoice is ready.</p>
  <p><strong>Amount:</strong> ${String(vars['amount'] ?? '')} ${String(vars['currency'] ?? '')}</p>
  ${vars['dueAt'] ? `<p><strong>Due:</strong> ${String(vars['dueAt'])}</p>` : ''}
  ${vars['invoiceUrl'] ? `<p><a href="${String(vars['invoiceUrl'])}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">View Invoice</a></p>` : ''}
</body></html>`;
    return { subject, html };
  }
}
