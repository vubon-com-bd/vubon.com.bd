import { renderSimpleEmail } from './base.template.js';
import type { EmailTemplateVariables } from './base.template.js';

export const ABANDONED_CART_48H_TEMPLATE = 'abandoned-cart-48h';

export function renderAbandonedCart48h(v: EmailTemplateVariables): { subject: string; html: string; text: string } {
  const subject = `Last chance — your cart is expiring soon`;
  const { html, text } = renderSimpleEmail({
    title: 'Your cart expires soon ⏰',
    body: `Hello ${v.name ?? 'there'}, items in your cart may sell out. Grab them before it's too late!`,
    ctaText: 'Complete Purchase',
    ctaUrl: String(v.cartUrl ?? '#'),
  });
  return { subject, html, text };
}
