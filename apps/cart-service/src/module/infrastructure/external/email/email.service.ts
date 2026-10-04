import { Injectable, Logger } from '@nestjs/common';
import { EmailService as KernelEmailService } from '@vubon/shared-kernel/infrastructure';
import { renderAbandonedCart1h } from './templates/abandoned-cart-1h.email.js';
import { renderAbandonedCart24h } from './templates/abandoned-cart-24h.email.js';
import { renderAbandonedCart48h } from './templates/abandoned-cart-48h.email.js';

export const CART_EMAIL_SERVICE = Symbol('CART_EMAIL_SERVICE');

@Injectable()
export class CartEmailService {
  private readonly logger = new Logger(CartEmailService.name);
  constructor(private readonly kernel: KernelEmailService) {}

  async sendAbandonedCart1h(params: {
    to: string; name?: string; itemCount: number; cartValue: number; currency: string; cartUrl: string;
  }): Promise<boolean> {
    const { subject, html, text } = renderAbandonedCart1h(params as unknown as Record<string, string | number | boolean | undefined>);
    const res = await this.kernel.send({ to: params.to, subject, html, text });
    if (!res.success) this.logger.warn(`1h reminder failed: ${res.error}`);
    return res.success;
  }

  async sendAbandonedCart24h(params: {
    to: string; name?: string; itemCount: number; discountCode?: string; discountPercent?: number; cartUrl: string;
  }): Promise<boolean> {
    const { subject, html, text } = renderAbandonedCart24h(params as unknown as Record<string, string | number | boolean | undefined>);
    const res = await this.kernel.send({ to: params.to, subject, html, text });
    return res.success;
  }

  async sendAbandonedCart48h(params: { to: string; name?: string; cartUrl: string }): Promise<boolean> {
    const { subject, html, text } = renderAbandonedCart48h(params as unknown as Record<string, string | number | boolean | undefined>);
    const res = await this.kernel.send({ to: params.to, subject, html, text });
    return res.success;
  }
}
