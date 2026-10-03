import { renderSimpleEmail } from './base.template.js';
import type { EmailTemplateVariables } from './base.template.js';

export const PRICE_DROP_TEMPLATE = 'price-drop';

export function renderPriceDrop(v: EmailTemplateVariables): { subject: string; html: string; text: string } {
  const subject = `Price dropped on ${v.productName ?? 'an item you watched'}`;
  const { html, text } = renderSimpleEmail({
    title: '💸 Price Drop Alert',
    body: `${v.productName ?? 'An item'} dropped from ${v.oldPrice ?? 0} to ${v.newPrice ?? 0} ${v.currency ?? 'BDT'}!`,
    ctaText: 'View Item',
    ctaUrl: String(v.productUrl ?? '#'),
  });
  return { subject, html, text };
}
