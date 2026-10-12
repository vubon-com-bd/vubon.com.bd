/**
 * Metric Type Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Analytics metric-এর nature (counter/gauge/histogram/summary/derived)।
 * Business Rule:
 * - ANALYTICS_METRIC_TYPE constants থেকে হতে হবে
 * - Counter → monotonic increase
 * - Gauge → point-in-time snapshot
 * - Histogram → distribution buckets
 * - Summary → percentiles
 * - Derived → computed from other metrics
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ANALYTICS_METRIC_TYPE } from '@vubon/shared-constants/platform/analytics';

const VALID_TYPES: readonly string[] = Object.values(ANALYTICS_METRIC_TYPE);

export class MetricTypeVO extends BaseTypeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): MetricTypeVO {
    if (typeof raw !== 'string') {
      throw new Error('MetricType must be a string');
    }

    const normalized = raw.trim().toLowerCase();

    if (!VALID_TYPES.includes(normalized)) {
      throw new Error(
        `Invalid MetricType: "${normalized}". Valid: ${VALID_TYPES.join(', ')}`
      );
    }

    return new MetricTypeVO(normalized);
  }

  isCounter(): boolean {
    return this.value === ANALYTICS_METRIC_TYPE.COUNTER;
  }

  isGauge(): boolean {
    return this.value === ANALYTICS_METRIC_TYPE.GAUGE;
  }

  isHistogram(): boolean {
    return this.value === ANALYTICS_METRIC_TYPE.HISTOGRAM;
  }

  isSummary(): boolean {
    return this.value === ANALYTICS_METRIC_TYPE.SUMMARY;
  }

  isDerived(): boolean {
    return this.value === ANALYTICS_METRIC_TYPE.DERIVED;
  }

  /** Aggregation SUM valid কিনা */
  supportsSum(): boolean {
    return this.isCounter() || this.isHistogram();
  }

  /** Aggregation AVG valid কিনা */
  supportsAvg(): boolean {
    return this.isGauge() || this.isHistogram() || this.isSummary();
  }

  /** Percentile valid কিনা */
  supportsPercentile(): boolean {
    return this.isHistogram() || this.isSummary();
  }

  /** Time-series monotonic check applicable কিনা */
  isMonotonic(): boolean {
    return this.isCounter();
  }
}
