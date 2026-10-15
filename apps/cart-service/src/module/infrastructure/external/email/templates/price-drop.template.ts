import { BaseTemplate, type BaseTemplateData } from './base.template.js';

interface Data extends BaseTemplateData {
  readonly productCount: number;
  readonly savingsAmount: number;
  readonly currency: string;
  readonly ctaUrl: string;
}

export class PriceDropTemplate extends BaseTemplate<Data> {
  readonly name = 'price-drop';

  subject(data: Data): string {
    return `Price drop! Save ${data.savingsAmount} ${data.currency}`;
  }

  render(data: Data): string {
    return this.wrap(
      `<h2>Hi ${data.recipientName},</h2>
<p><strong>${data.productCount}</strong> item(s) in your cart just dropped in price.</p>
<p>You can save <strong>${data.savingsAmount} ${data.currency}</strong>!</p>
${this.button('Grab the deal', data.ctaUrl)}`,
      'Price drop',
    );
  }
}
