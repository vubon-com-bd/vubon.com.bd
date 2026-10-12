/**
 * Metric Unit Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Analytics metric-এর measurement unit।
 * Business Rule:
 * - ANALYTICS_METRIC_UNIT constants থেকে হতে হবে
 * - Display symbol + formatting rule provide করে
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ANALYTICS_METRIC_UNIT } from '@vubon/shared-constants/platform/analytics';

const VALID_UNITS: readonly string[] = Object.values(ANALYTICS_METRIC_UNIT);

export class MetricUnitVO extends BaseTypeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): MetricUnitVO {
    if (typeof raw !== 'string') {
      throw new Error('MetricUnit must be a string');
    }

    const normalized = raw.trim().toLowerCase();

    if (!VALID_UNITS.includes(normalized)) {
      throw new Error(
        `Invalid MetricUnit: "${normalized}". Valid: ${VALID_UNITS.join(', ')}`
      );
    }

    return new MetricUnitVO(normalized);
  }

  isCount(): boolean {
    return this.value === ANALYTICS_METRIC_UNIT.COUNT;
  }

  isPercentage(): boolean {
    return this.value === ANALYTICS_METRIC_UNIT.PERCENTAGE;
  }

  isCurrency(): boolean {
    return this.value === ANALYTICS_METRIC_UNIT.CURRENCY;
  }

  isDuration(): boolean {
    return this.value === ANALYTICS_METRIC_UNIT.DURATION;
  }

  isRatio(): boolean {
    return this.value === ANALYTICS_METRIC_UNIT.RATIO;
  }

  /** Integer display কিনা (count) */
  isInteger(): boolean {
    return this.isCount();
  }

  /** Decimal formatting লাগবে কিনা */
  requiresDecimalFormatting(): boolean {
    return this.isPercentage() || this.isRatio() || this.isCurrency();
  }

  /** Value range valid কিনা এই unit-এর জন্য */
  isValueInRange(value: number): boolean {
    if (!Number.isFinite(value) || value < 0) return false;
    if (this.isPercentage() && value > 100) return false;
    if (this.isRatio() && value > 1 && value !== 100) {
      // ratio typically 0-1, allow 100 as %
      return false;
    }
    return true;
  }
}
