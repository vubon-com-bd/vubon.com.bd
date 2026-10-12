/**
 * Event Validation Service
 * @module analytics-service/domain/services
 *
 * Event schema + business rule validation।
 * Business Rule:
 * - Required fields present
 * - Payload size limits
 * - Ecommerce event → revenue/product required
 * - Page view event → path required
 */
import { EventVO } from '../value-objects/composites/event.vo.js';
import { ANALYTICS_EVENT } from '@vubon/shared-constants/platform/analytics';

export interface ValidationResult {
  readonly valid: boolean;
  readonly errors: readonly string[];
}

export class EventValidationService {
  validate(event: EventVO): ValidationResult {
    const errors: string[] = [];

    // 1. Payload empty check (for events requiring data)
    if (this.requiresPayload(event) && event.payload.isEmpty()) {
      errors.push(`Event "${event.name.value}" requires non-empty payload`);
    }

    // 2. Purchase event → revenue check
    if (event.name.value === ANALYTICS_EVENT.PURCHASE) {
      const revenue = event.payload.get<number>('revenue');
      const price = event.payload.get<number>('price');
      if (
        (revenue === undefined || revenue <= 0) &&
        (price === undefined || price <= 0)
      ) {
        errors.push('Purchase event requires positive revenue or price');
      }
    }

    // 3. View item → product_id
    if (
      event.name.value === ANALYTICS_EVENT.VIEW_ITEM ||
      event.name.value === ANALYTICS_EVENT.ADD_TO_CART ||
      event.name.value === ANALYTICS_EVENT.REMOVE_FROM_CART
    ) {
      const productId = event.payload.get<string>('product_id');
      if (!productId || productId.trim().length === 0) {
        errors.push(`Event "${event.name.value}" requires product_id in payload`);
      }
    }

    // 4. Page view → page_path
    if (event.name.value === ANALYTICS_EVENT.PAGE_VIEW) {
      const pagePath = event.payload.get<string>('page_path');
      if (!pagePath || !pagePath.startsWith('/')) {
        errors.push('Page view requires valid page_path starting with /');
      }
    }

    // 5. Search event → query
    if (event.name.value === ANALYTICS_EVENT.SEARCH) {
      const query = event.payload.get<string>('query');
      if (!query || query.trim().length < 2) {
        errors.push('Search event requires query (min 2 chars)');
      }
    }

    // 6. Signup/login → userId
    if (
      event.name.value === ANALYTICS_EVENT.SIGN_UP ||
      event.name.value === ANALYTICS_EVENT.LOGIN
    ) {
      if (!event.userId) {
        errors.push(`Event "${event.name.value}" requires userId`);
      }
    }

    // 7. Timestamp future/past sanity (already validated in VO)
    // 8. Session presence for ecommerce
    if (event.isEcommerce() && !event.sessionId) {
      errors.push('Ecommerce event requires sessionId');
    }

    return {
      valid: errors.length === 0,
      errors: Object.freeze(errors),
    };
  }

  private requiresPayload(event: EventVO): boolean {
    const eventsRequiringPayload: readonly string[] = [
      ANALYTICS_EVENT.PURCHASE,
      ANALYTICS_EVENT.VIEW_ITEM,
      ANALYTICS_EVENT.ADD_TO_CART,
      ANALYTICS_EVENT.REMOVE_FROM_CART,
      ANALYTICS_EVENT.BEGIN_CHECKOUT,
      ANALYTICS_EVENT.ADD_PAYMENT_INFO,
      ANALYTICS_EVENT.PAGE_VIEW,
      ANALYTICS_EVENT.SEARCH,
      ANALYTICS_EVENT.CLICK,
    ];
    return eventsRequiringPayload.includes(event.name.value);
  }
}
