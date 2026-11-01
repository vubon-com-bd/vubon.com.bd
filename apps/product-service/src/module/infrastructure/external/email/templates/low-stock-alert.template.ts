/**
 * LowStockAlertTemplate
 * @module product-service/infrastructure/external/email/templates
 */
import { BaseTemplate, type BaseTemplateData } from './base.template.js';

interface LowStockData extends BaseTemplateData {
  readonly productId: string;
  readonly sku: string;
  readonly currentStock: number;
  readonly threshold: number;
  readonly ctaUrl: string;
}

export class LowStockAlertTemplate extends BaseTemplate<LowStockData> {
  readonly name = 'low-stock-alert';

  subject(data: LowStockData): string {
    return `⚠️ Low stock alert — ${data.sku} (${data.currentStock} units)`;
  }

  render(data: LowStockData): string {
    return this.wrap(
      `<h2>Low Stock Alert</h2>
<p>Hi ${data.recipientName},</p>
<p>Product <strong>${data.sku}</strong> is running low.</p>
<ul>
  <li>Current stock: <strong>${data.currentStock}</strong></li>
  <li>Threshold: ${data.threshold}</li>
</ul>
<a href="${data.ctaUrl}" style="display:inline-block;padding:10px 16px;background:#111;color:#fff;text-decoration:none;border-radius:4px;">Restock Now</a>`,
      'Low Stock Alert',
    );
  }
}
