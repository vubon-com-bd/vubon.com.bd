/**
 * CartEmailService — cart-specific email facade
 * @module cart-service/infrastructure/external/email
 */
import { Injectable, Logger } from '@nestjs/common';
import { EmailService as KernelEmailService } from '@vubon/shared-kernel/infrastructure/external/email';
import { getOptionalEnv } from '@vubon/shared-config/common';

const FROM_DEFAULT = 'cart@vubon.com.bd';

@Injectable()
export class CartEmailService {
  private readonly logger = new Logger(CartEmailService.name);

  constructor(private readonly kernel: KernelEmailService) {}

  async sendAbandonedCartReminder(params: {
    to: string;
    recipientName: string;
    itemCount: number;
    cartValue: number;
    currency: string;
    ctaUrl: string;
    reminderNumber: number;
  }): Promise<boolean> {
    const from = getOptionalEnv('EMAIL_FROM', FROM_DEFAULT);
    const subject = this.abandonedSubject(params.reminderNumber, params.itemCount);
    const html = this.abandonedHtml(params);

    const result = await this.kernel.send({
      to: params.to,
      subject,
      html,
      from,
    });

    this.logger.log(
      `Abandoned reminder #${params.reminderNumber} → ${params.to} (success=${result.success})`,
    );
    return result.success;
  }

  async sendPriceDropAlert(params: {
    to: string;
    recipientName: string;
    productCount: number;
    savingsAmount: number;
    currency: string;
    ctaUrl: string;
  }): Promise<boolean> {
    const from = getOptionalEnv('EMAIL_FROM', FROM_DEFAULT);
    const subject = `Price drop alert — save ${params.savingsAmount} ${params.currency}`;
    const html = `<h2>Hi ${params.recipientName},</h2>
<p>Good news! ${params.productCount} item(s) in your cart just dropped in price.
You can save ${params.savingsAmount} ${params.currency}.</p>
<a href="${params.ctaUrl}">View your cart</a>`;

    const result = await this.kernel.send({ to: params.to, subject, html, from });
    this.logger.log(`Price drop alert → ${params.to} (success=${result.success})`);
    return result.success;
  }

  async sendBackInStockAlert(params: {
    to: string;
    recipientName: string;
    productName: string;
    ctaUrl: string;
  }): Promise<boolean> {
    const from = getOptionalEnv('EMAIL_FROM', FROM_DEFAULT);
    const subject = `Back in stock: ${params.productName}`;
    const html = `<h2>Hi ${params.recipientName},</h2>
<p><strong>${params.productName}</strong> is back in stock!</p>
<a href="${params.ctaUrl}">Add to cart</a>`;

    const result = await this.kernel.send({ to: params.to, subject, html, from });
    return result.success;
  }

  async sendCartRecoveredConfirmation(params: {
    to: string;
    recipientName: string;
    orderId: string;
  }): Promise<boolean> {
    const from = getOptionalEnv('EMAIL_FROM', FROM_DEFAULT);
    const result = await this.kernel.send({
      to: params.to,
      subject: 'Your cart was recovered',
      html: `<h2>Hi ${params.recipientName},</h2>
<p>Great news — your cart was recovered and converted to order <strong>${params.orderId}</strong>.</p>`,
      from,
    });
    return result.success;
  }

  private abandonedSubject(reminderNumber: number, itemCount: number): string {
    const suffix =
      reminderNumber === 1
        ? 'Forget something?'
        : reminderNumber === 2
          ? 'Your cart misses you'
          : 'Last chance to grab your items';
    return `${suffix} — ${itemCount} item(s) waiting`;
  }

  private abandonedHtml(params: {
    recipientName: string;
    itemCount: number;
    cartValue: number;
    currency: string;
    ctaUrl: string;
    reminderNumber: number;
  }): string {
    return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; max-width: 600px; margin: auto;">
  <h2>Hi ${params.recipientName},</h2>
  <p>You have <strong>${params.itemCount} item(s)</strong> in your cart worth
     <strong>${params.cartValue} ${params.currency}</strong>.</p>
  <p>Complete your purchase before they run out!</p>
  <a href="${params.ctaUrl}" style="display:inline-block;padding:12px 24px;background:#000;color:#fff;text-decoration:none;border-radius:4px;">
    Return to cart
  </a>
  <p style="color:#999;font-size:12px;">Reminder #${params.reminderNumber}</p>
</body></html>`;
  }
}
