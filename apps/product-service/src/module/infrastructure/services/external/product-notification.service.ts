/**
 * ProductNotificationService — multi-channel notification dispatcher
 * @module product-service/infrastructure/services/external
 *
 * Note: kernel external services are not guaranteed to exist.
 * This service is self-contained and depends only on ProductEmailService.
 */
import { Injectable, Logger } from '@nestjs/common';
import { ProductEmailService } from '../../external/email/email.service.js';
import { ProductNotificationDispatcher } from '../../external/notification/notification.service.js';

export const PRODUCT_NOTIFICATION_SERVICE = Symbol('PRODUCT_NOTIFICATION_SERVICE');

export interface ProductNotificationPayload {
  readonly userId: string;
  readonly productId: string;
  readonly template: string;
  readonly data?: Readonly<Record<string, unknown>>;
}

export interface IProductNotificationService {
  notifyCustomer(payload: ProductNotificationPayload): Promise<boolean>;
  notifyAdmin(payload: ProductNotificationPayload): Promise<boolean>;
}

@Injectable()
export class ProductNotificationService implements IProductNotificationService {
  private readonly logger = new Logger(ProductNotificationService.name);

  constructor(
    private readonly email: ProductEmailService,
    private readonly dispatcher: ProductNotificationDispatcher,
  ) {}

  async notifyCustomer(payload: ProductNotificationPayload): Promise<boolean> {
    this.logger.log(`[customer] ${payload.template} → user=${payload.userId}`);
    try {
      const result = await this.dispatcher.dispatch({
        userId: payload.userId,
        channel: 'in-app',
        template: payload.template,
        data: { productId: payload.productId, ...payload.data },
      });
      return result.sent;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`push failed: ${msg.slice(0, 100)}`);
      return false;
    }
  }

  async notifyAdmin(payload: ProductNotificationPayload): Promise<boolean> {
    this.logger.log(`[admin] ${payload.template} → productId=${payload.productId}`);
    try {
      const result = await this.email.send({
        to: 'products-admin@vubon.com.bd',
        subject: this.titleFor(payload.template),
        text: this.bodyFor(payload.template, payload.data),
      });
      return result.sent;
    } catch {
      return false;
    }
  }

  private titleFor(template: string): string {
    const map: Record<string, string> = {
      product_created: 'Product created',
      product_published: 'Product published',
      product_updated: 'Product updated',
      product_low_stock: '⚠️ Low stock alert',
    };
    return map[template] ?? `Product update: ${template}`;
  }

  private bodyFor(
    template: string,
    data?: Readonly<Record<string, unknown>>,
  ): string {
    const sku = data?.['sku'] ?? '';
    const stock = data?.['stock'] ?? '';
    return `${template}${sku ? ` — SKU: ${sku}` : ''}${stock ? ` — Stock: ${stock}` : ''}`;
  }
}
