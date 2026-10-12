/**
 * Dimension Name Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Analytics dimension-এর name (date, country, device, source, ...)।
 * Business Rule:
 * - ANALYTICS_DIMENSION constants থেকে হতে হবে
 * - Custom dimension allowed: "custom:" prefix
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';
import { ANALYTICS_DIMENSION } from '@vubon/shared-constants/platform/analytics';

const CANONICAL_DIMENSIONS: readonly string[] = Object.values(ANALYTICS_DIMENSION);
const CUSTOM_PREFIX = 'custom:';
const MAX_LENGTH = 100;

export class DimensionNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DimensionNameVO {
    if (typeof raw !== 'string') {
      throw new Error('DimensionName must be a string');
    }

    const normalized = raw.trim().toLowerCase();

    if (normalized.length > MAX_LENGTH) {
      throw new Error(`DimensionName must be at most ${MAX_LENGTH} chars`);
    }

    if (!CANONICAL_DIMENSIONS.includes(normalized)) {
      throw new Error(
        `DimensionName "${normalized}" is not canonical. Use DimensionNameVO.custom().`
      );
    }

    return new DimensionNameVO(normalized);
  }

  static custom(raw: string): DimensionNameVO {
    if (typeof raw !== 'string') {
      throw new Error('Custom dimension name must be a string');
    }

    let normalized = raw.trim().toLowerCase();
    if (normalized.startsWith(CUSTOM_PREFIX)) {
      normalized = normalized.slice(CUSTOM_PREFIX.length);
    }

    if (!/^[a-z][a-z0-9_]*$/.test(normalized)) {
      throw new Error('Custom dimension name must start with letter, then letters/numbers/underscore');
    }

    const full = `${CUSTOM_PREFIX}${normalized}`;
    if (full.length > MAX_LENGTH) {
      throw new Error(`Custom dimension name total length must be at most ${MAX_LENGTH}`);
    }

    return new DimensionNameVO(full);
  }

  isCanonical(): boolean {
    return CANONICAL_DIMENSIONS.includes(this.value);
  }

  isCustom(): boolean {
    return this.value.startsWith(CUSTOM_PREFIX);
  }

  /** Time-based dimension কিনা (date, hour, day, week, month, quarter, year) */
  isTemporal(): boolean {
    const temporal: readonly string[] = [
      ANALYTICS_DIMENSION.DATE,
      ANALYTICS_DIMENSION.HOUR,
      ANALYTICS_DIMENSION.DAY,
      ANALYTICS_DIMENSION.WEEK,
      ANALYTICS_DIMENSION.MONTH,
      ANALYTICS_DIMENSION.QUARTER,
      ANALYTICS_DIMENSION.YEAR,
    ];
    return temporal.includes(this.value);
  }

  /** Geo dimension কিনা */
  isGeographic(): boolean {
    const geo: readonly string[] = [
      ANALYTICS_DIMENSION.COUNTRY,
      ANALYTICS_DIMENSION.CITY,
      ANALYTICS_DIMENSION.REGION,
    ];
    return geo.includes(this.value);
  }

  /** Device/tech dimension কিনা */
  isTechnical(): boolean {
    const tech: readonly string[] = [
      ANALYTICS_DIMENSION.DEVICE,
      ANALYTICS_DIMENSION.BROWSER,
      ANALYTICS_DIMENSION.OS,
    ];
    return tech.includes(this.value);
  }

  /** Traffic/attribution dimension কিনা */
  isTraffic(): boolean {
    const traffic: readonly string[] = [
      ANALYTICS_DIMENSION.SOURCE,
      ANALYTICS_DIMENSION.MEDIUM,
      ANALYTICS_DIMENSION.CAMPAIGN,
    ];
    return traffic.includes(this.value);
  }

  /** Business dimension কিনা (product, category, brand, vendor) */
  isBusiness(): boolean {
    const business: readonly string[] = [
      ANALYTICS_DIMENSION.PRODUCT,
      ANALYTICS_DIMENSION.CATEGORY,
      ANALYTICS_DIMENSION.BRAND,
      ANALYTICS_DIMENSION.VENDOR,
      ANALYTICS_DIMENSION.PAYMENT_METHOD,
    ];
    return business.includes(this.value);
  }

  /** Cardinality high কিনা (GROUP BY-তে expensive) */
  isHighCardinality(): boolean {
    const highCardinality: readonly string[] = [
      ANALYTICS_DIMENSION.PAGE,
      ANALYTICS_DIMENSION.LANDING_PAGE,
      ANALYTICS_DIMENSION.PRODUCT,
      ANALYTICS_DIMENSION.CITY,
    ];
    return highCardinality.includes(this.value);
  }
}
