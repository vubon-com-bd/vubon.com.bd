import { renderSimpleEmail } from './base.template.js';
import type { EmailTemplateVariables } from './base.template.js';

export const ABANDONED_CART_24H_TEMPLATE = 'abandoned-cart-24h';

export function renderAbandonedCart24h(v: EmailTemplateVariables): { subject: string; html: string; text: string } {
  const subject = `Still thinking about it? Here's 10% off`;
  const { html, text } = renderSimpleEmail({
    title: 'A special offer for you 🎁',
    body: `Hello ${v.name ?? 'there'}, we saved your cart with ${v.itemCount ?? 0} item(s). Use code ${v.discountCode ?? 'COMEBACK10'} for ${v.discountPercent ?? 10}% off!`,
    ctaText: 'Claim Discount',
    ctaUrl: String(v.cartUrl ?? '#'),
  });
  return { subject, html, text };
}
