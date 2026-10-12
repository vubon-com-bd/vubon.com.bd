/**
 * Event Source Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Analytics event কোথা থেকে এসেছে (traffic source classification)।
 * Business Rule:
 * - ANALYTICS_SOURCE constants থেকে হতে হবে
 * - Paid/Organic/Direct/Referral/Internal classification
 * - Immutable
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ANALYTICS_SOURCE } from '@vubon/shared-constants/platform/analytics';

const VALID_SOURCES: readonly string[] = Object.values(ANALYTICS_SOURCE);

const PAID_SOURCES: readonly string[] = [
  ANALYTICS_SOURCE.PAID,
  ANALYTICS_SOURCE.DISPLAY,
];

const ORGANIC_SOURCES: readonly string[] = [
  ANALYTICS_SOURCE.ORGANIC,
  ANALYTICS_SOURCE.REFERRAL,
  ANALYTICS_SOURCE.SOCIAL,
];

export class EventSourceVO extends BaseTypeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): EventSourceVO {
    if (typeof raw !== 'string') {
      throw new Error('EventSource must be a string');
    }

    const normalized = raw.trim().toLowerCase();

    if (!VALID_SOURCES.includes(normalized)) {
      throw new Error(
        `Invalid EventSource: "${normalized}". ` +
        `Valid values: ${VALID_SOURCES.join(', ')}`
      );
    }

    return new EventSourceVO(normalized);
  }

  /**
   * Direct traffic কিনা (no referrer)
   */
  isDirect(): boolean {
    return this.value === ANALYTICS_SOURCE.DIRECT;
  }

  /**
   * Paid traffic কিনা (advertising)
   */
  isPaid(): boolean {
    return PAID_SOURCES.includes(this.value);
  }

  /**
   * Organic traffic কিনা (free, non-paid)
   */
  isOrganic(): boolean {
    return ORGANIC_SOURCES.includes(this.value);
  }

  /**
   * Internal traffic কিনা (own platform)
   */
  isInternal(): boolean {
    return this.value === ANALYTICS_SOURCE.INTERNAL;
  }

  /**
   * Unknown/undetermined কিনা
   */
  isUnknown(): boolean {
    return this.value === ANALYTICS_SOURCE.UNKNOWN;
  }

  /**
   * Attribution-এ count হবে কিনা (paid + organic only)
   */
  isAttributable(): boolean {
    return this.isPaid() || this.isOrganic() || this.isDirect();
  }
}
