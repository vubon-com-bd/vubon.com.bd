import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const AbandonedCart3EmailTemplate: EmailTemplate = {
  name: 'marketing-abandoned-cart-3',
  subject: 'Last chance — your cart expires soon!',
  html: `
    <h2>Final reminder, {{name}}</h2>
    <p>Your cart will be cleared soon. Don't lose your items!</p>
    <p><a href="{{cartUrl}}">Complete Purchase</a></p>
  `,
  text: 'Last chance! {{cartUrl}}',
  variables: ['name', 'cartUrl'],
};
