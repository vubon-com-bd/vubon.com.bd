/**
 * Event Payload Composite VO
 * @module analytics-service/domain/value-objects/composites
 *
 * Typed wrapper around EventPayloadVO for common analytics payload shapes।
 * Business Rule:
 * - Ecommerce payload: product_id, price, quantity, currency
 * - Page-view payload: page_path, referrer
 * - Custom payload: arbitrary
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base';
import { EventPayloadVO } from '../primitives/event-payload.vo.js';

export interface EcommercePayloadShape {
  readonly productId?: string;
  readonly variantId?: string;
  readonly price?: number;
  readonly quantity?: number;
  readonly currency?: string;
  readonly revenue?: number;
  readonly orderId?: string;
}

export interface PageViewPayloadShape {
  readonly pagePath?: string;
  readonly referrer?: string;
  readonly title?: string;
}

export class EventPayloadCompositeVO extends BaseVO<EventPayloadVO> {
  private constructor(payload: EventPayloadVO) {
    super(payload);
    Object.freeze(this);
  }

  static from(payload: EventPayloadVO): EventPayloadCompositeVO {
    if (!payload) {
      throw new Error('EventPayloadCompositeVO requires a payload');
    }
    return new EventPayloadCompositeVO(payload);
  }

  get raw(): EventPayloadVO {
    return this.value;
  }

  /** Ecommerce payload extract (returns shape with available values) */
  asEcommerce(): EcommercePayloadShape {
    const raw = this.value.payload;
    return {
      productId: typeof raw['product_id'] === 'string' ? (raw['product_id'] as string) : undefined,
      variantId: typeof raw['variant_id'] === 'string' ? (raw['variant_id'] as string) : undefined,
      price: typeof raw['price'] === 'number' ? (raw['price'] as number) : undefined,
      quantity: typeof raw['quantity'] === 'number' ? (raw['quantity'] as number) : undefined,
      currency: typeof raw['currency'] === 'string' ? (raw['currency'] as string) : undefined,
      revenue: typeof raw['revenue'] === 'number' ? (raw['revenue'] as number) : undefined,
      orderId: typeof raw['order_id'] === 'string' ? (raw['order_id'] as string) : undefined,
    };
  }

  /** Page-view payload extract */
  asPageView(): PageViewPayloadShape {
    const raw = this.value.payload;
    return {
      pagePath: typeof raw['page_path'] === 'string' ? (raw['page_path'] as string) : undefined,
      referrer: typeof raw['referrer'] === 'string' ? (raw['referrer'] as string) : undefined,
      title: typeof raw['title'] === 'string' ? (raw['title'] as string) : undefined,
    };
  }

  /** Revenue extract from payload */
  extractRevenue(): number {
    const eco = this.asEcommerce();
    if (eco.revenue !== undefined) return eco.revenue;
    if (eco.price !== undefined && eco.quantity !== undefined) {
      return eco.price * eco.quantity;
    }
    return 0;
  }

  /** Product ID extract */
  extractProductId(): string | undefined {
    return this.asEcommerce().productId;
  }

  /** Quantity extract (default 1) */
  extractQuantity(): number {
    return this.asEcommerce().quantity ?? 1;
  }
}
