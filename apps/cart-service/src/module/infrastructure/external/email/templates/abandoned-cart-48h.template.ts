import { BaseTemplate, type BaseTemplateData } from './base.template.js';

interface Data extends BaseTemplateData {
  readonly itemCount: number;
  readonly cartValue: number;
  readonly currency: string;
  readonly ctaUrl: string;
  readonly discountPercent?: number;
}

export class AbandonedCart48hTemplate extends BaseTemplate<Data> {
  readonly name = 'abandoned-cart-48h';

  subject(data: Data): string {
    return data.discountPercent
      ? `Last chance — ${data.discountPercent}% off your cart!`
      : 'Last chance to grab your items';
  }

  render(data: Data): string {
    const discountBlock = data.discountPercent
      ? `<p style="background:#fef3c7;padding:12px;border-radius:4px;">
           <strong>Special offer:</strong> ${data.discountPercent}% OFF your entire cart!
         </p>`
      : '';

    return this.wrap(
      `<h2>Hi ${data.recipientName},</h2>
<p>This is your final reminder — ${data.itemCount} item(s) in your cart.</p>
${discountBlock}
${this.button('Claim my cart', data.ctaUrl)}`,
      'Final reminder',
    );
  }
}
