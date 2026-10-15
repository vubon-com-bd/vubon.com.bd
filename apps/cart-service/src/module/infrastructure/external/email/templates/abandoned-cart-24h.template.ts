import { BaseTemplate, type BaseTemplateData } from './base.template.js';

interface Data extends BaseTemplateData {
  readonly itemCount: number;
  readonly cartValue: number;
  readonly currency: string;
  readonly ctaUrl: string;
}

export class AbandonedCart24hTemplate extends BaseTemplate<Data> {
  readonly name = 'abandoned-cart-24h';

  subject(data: Data): string {
    return `Your cart misses you — ${data.itemCount} item(s) still waiting`;
  }

  render(data: Data): string {
    return this.wrap(
      `<h2>Hi ${data.recipientName},</h2>
<p>Your cart with ${data.itemCount} item(s) is still here.</p>
<p>Total: <strong>${data.cartValue} ${data.currency}</strong></p>
<p>Items may sell out — don't wait!</p>
${this.button('Complete your order', data.ctaUrl)}`,
      'Cart reminder',
    );
  }
}
