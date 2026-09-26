import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const AbandonedCart1EmailTemplate: EmailTemplate = {
  name: 'marketing-abandoned-cart-1',
  subject: 'You left something behind, {{name}}!',
  html: `
    <h2>Hi {{name}},</h2>
    <p>You left items in your cart. Complete your purchase now!</p>
    <p><a href="{{cartUrl}}">Return to Cart</a></p>
  `,
  text: 'Hi {{name}}, you left items in your cart: {{cartUrl}}',
  variables: ['name', 'cartUrl'],
};
