import { renderSimpleEmail } from './base.template.js';
import type { EmailTemplateVariables } from './base.template.js';

export const BACK_IN_STOCK_TEMPLATE = 'back-in-stock';

export function renderBackInStock(v: EmailTemplateVariables): { subject: string; html: string; text: string } {
  const subject = `${v.productName ?? 'Item'} is back in stock!`;
  const { html, text } = renderSimpleEmail({
    title: '✅ Back in Stock',
    body: `Good news! ${v.productName ?? 'An item'} is available again. Grab it before it sells out.`,
    ctaText: 'Buy Now',
    ctaUrl: String(v.productUrl ?? '#'),
  });
  return { subject, html, text };
}
