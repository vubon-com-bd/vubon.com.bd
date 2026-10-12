/**
 * Event Name Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Analytics event-এর canonical name।
 * Business Rule:
 * - ANALYTICS_EVENT constants থেকে হতে হবে (canonical)
 * - Custom event allowed কিন্তু prefix লাগবে: "custom:"
 * - Snake_case, lowercase
 * - Max 100 chars
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import { ANALYTICS_EVENT } from '@vubon/shared-constants/platform/analytics';

const CANONICAL_EVENTS: readonly string[] = Object.values(ANALYTICS_EVENT);
const CUSTOM_PREFIX = 'custom:';
const MAX_LENGTH = 100;
const MIN_LENGTH = 3;

export class EventNameVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  /**
   * Canonical analytics event name থেকে তৈরি
   * @throws Error if not in ANALYTICS_EVENT constants
   */
  static create(raw: string): EventNameVO {
    if (typeof raw !== 'string') {
      throw new Error('EventName must be a string');
    }

    const normalized = raw.trim().toLowerCase();

    if (normalized.length < MIN_LENGTH) {
      throw new Error(`EventName must be at least ${MIN_LENGTH} chars`);
    }

    if (normalized.length > MAX_LENGTH) {
      throw new Error(`EventName must be at most ${MAX_LENGTH} chars`);
    }

    if (!CANONICAL_EVENTS.includes(normalized)) {
      throw new Error(
        `EventName "${normalized}" is not a canonical analytics event. ` +
        `Use EventNameVO.custom() for custom events.`
      );
    }

    return new EventNameVO(normalized);
  }

  /**
   * Custom event name থেকে তৈরি — "custom:" prefix auto-add হবে
   */
  static custom(raw: string): EventNameVO {
    if (typeof raw !== 'string') {
      throw new Error('Custom event name must be a string');
    }

    let normalized = raw.trim().toLowerCase();

    // Already has prefix — strip and re-add
    if (normalized.startsWith(CUSTOM_PREFIX)) {
      normalized = normalized.slice(CUSTOM_PREFIX.length);
    }

    if (normalized.length < MIN_LENGTH) {
      throw new Error(`Custom event name must be at least ${MIN_LENGTH} chars`);
    }

    if (!/^[a-z][a-z0-9_:]*$/.test(normalized)) {
      throw new Error(
        'Custom event name must start with letter, then letters/numbers/underscore/colon'
      );
    }

    const full = `${CUSTOM_PREFIX}${normalized}`;

    if (full.length > MAX_LENGTH) {
      throw new Error(`Custom event name total length must be at most ${MAX_LENGTH}`);
    }

    return new EventNameVO(full);
  }

  /**
   * Canonical event কিনা
   */
  isCanonical(): boolean {
    return CANONICAL_EVENTS.includes(this.value);
  }

  /**
   * Custom event কিনা
   */
  isCustom(): boolean {
    return this.value.startsWith(CUSTOM_PREFIX);
  }

  /**
   * E-commerce funnel event কিনা
   */
  isEcommerce(): boolean {
    const ecommerceEvents: readonly string[] = [
      ANALYTICS_EVENT.VIEW_ITEM,
      ANALYTICS_EVENT.ADD_TO_CART,
      ANALYTICS_EVENT.REMOVE_FROM_CART,
      ANALYTICS_EVENT.BEGIN_CHECKOUT,
      ANALYTICS_EVENT.ADD_PAYMENT_INFO,
      ANALYTICS_EVENT.PURCHASE,
      ANALYTICS_EVENT.REFUND,
    ];
    return ecommerceEvents.includes(this.value);
  }

  /**
   * Engagement event কিনা
   */
  isEngagement(): boolean {
    const engagementEvents: readonly string[] = [
      ANALYTICS_EVENT.PAGE_VIEW,
      ANALYTICS_EVENT.CLICK,
      ANALYTICS_EVENT.SCROLL,
      ANALYTICS_EVENT.SHARE,
      ANALYTICS_EVENT.DOWNLOAD,
      ANALYTICS_EVENT.VIDEO_PLAY,
      ANALYTICS_EVENT.VIDEO_COMPLETE,
    ];
    return engagementEvents.includes(this.value);
  }
}
