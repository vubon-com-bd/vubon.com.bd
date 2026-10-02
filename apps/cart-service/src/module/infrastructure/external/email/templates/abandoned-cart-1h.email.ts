import { renderSimpleEmail } from './base.template.js';
import type { EmailTemplateVariables } from './base.template.js';

export const ABANDONED_CART_1H_TEMPLATE = 'abandoned-cart-1h';

export function renderAbandonedCart1h(v: EmailTemplateVariables): { subject: string; html: string; text: string } {
  const subject = `Did you forget something?`;
  const { html, text } = renderSimpleEmail({
    title: 'Your cart is waiting 🛒',
    body: `Hello ${v.name ?? 'there'}, you left ${v.itemCount ?? 0} item(s) worth ${v.currency ?? 'BDT'} ${v.cartValue ?? 0} in your cart. Complete your purchase before they're gone!`,
    ctaText: 'Resume Shopping',
    ctaUrl: String(v.cartUrl ?? '#'),
  });
  return { subject, html, text };
}
