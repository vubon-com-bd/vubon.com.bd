import { BaseTemplate, type BaseTemplateData } from './base.template.js';

interface Data extends BaseTemplateData {
  readonly productName: string;
  readonly ctaUrl: string;
}

export class BackInStockTemplate extends BaseTemplate<Data> {
  readonly name = 'back-in-stock';

  subject(data: Data): string {
    return `Back in stock: ${data.productName}`;
  }

  render(data: Data): string {
    return this.wrap(
      `<h2>Hi ${data.recipientName},</h2>
<p>Good news — <strong>${data.productName}</strong> is back in stock!</p>
${this.button('Add to cart', data.ctaUrl)}`,
      'Back in stock',
    );
  }
}
