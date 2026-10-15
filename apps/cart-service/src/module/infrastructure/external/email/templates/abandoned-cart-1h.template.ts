import { BaseTemplate, type BaseTemplateData } from './base.template.js';

interface Data extends BaseTemplateData {
  readonly itemCount: number;
  readonly cartValue: number;
  readonly currency: string;
  readonly ctaUrl: string;
}

export class AbandonedCart1hTemplate extends BaseTemplate<Data> {
  readonly name = 'abandoned-cart-1h';

  subject(data: Data): string {
    return `Forget something? ${data.itemCount} item(s) waiting`;
  }

  render(data: Data): string {
    return this.wrap(
      `<h2>Hi ${data.recipientName},</h2>
<p>You left ${data.itemCount} item(s) in your cart worth <strong>${data.cartValue} ${data.currency}</strong>.</p>
<p>They're still available — complete your purchase anytime.</p>
${this.button('Return to cart', data.ctaUrl)}`,
      'Cart reminder',
    );
  }
}
