import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const AbandonedCart2EmailTemplate: EmailTemplate = {
  name: 'marketing-abandoned-cart-2',
  subject: 'Still thinking about it, {{name}}?',
  html: `
    <h2>Don't miss out, {{name}}!</h2>
    <p>Your cart is waiting. Use code <strong>{{discountCode}}</strong> for {{discountPercent}}% off!</p>
  `,
  text: 'Use {{discountCode}} for {{discountPercent}}% off: {{cartUrl}}',
  variables: ['name', 'discountCode', 'discountPercent', 'cartUrl'],
};
