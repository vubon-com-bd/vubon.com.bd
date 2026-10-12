/**
 * Metric Name Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Analytics metric-এর canonical name (e.g., users, revenue, conversion_rate)।
 * Business Rule:
 * - ANALYTICS_METRIC constants থেকে হতে হবে
 * - Custom metric allowed: "custom:" prefix
 * - Snake_case, lowercase
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';
import { ANALYTICS_METRIC } from '@vubon/shared-constants/platform/analytics';

const CANONICAL_METRICS: readonly string[] = Object.values(ANALYTICS_METRIC);
const CUSTOM_PREFIX = 'custom:';
const MIN_LENGTH = 2;
const MAX_LENGTH = 100;

export class MetricNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): MetricNameVO {
    if (typeof raw !== 'string') {
      throw new Error('MetricName must be a string');
    }

    const normalized = raw.trim().toLowerCase();

    if (normalized.length < MIN_LENGTH) {
      throw new Error(`MetricName must be at least ${MIN_LENGTH} chars`);
    }

    if (normalized.length > MAX_LENGTH) {
      throw new Error(`MetricName must be at most ${MAX_LENGTH} chars`);
    }

    if (!CANONICAL_METRICS.includes(normalized)) {
      throw new Error(
        `MetricName "${normalized}" is not canonical. Use MetricNameVO.custom().`
      );
    }

    return new MetricNameVO(normalized);
  }

  static custom(raw: string): MetricNameVO {
    if (typeof raw !== 'string') {
      throw new Error('Custom metric name must be a string');
    }

    let normalized = raw.trim().toLowerCase();
    if (normalized.startsWith(CUSTOM_PREFIX)) {
      normalized = normalized.slice(CUSTOM_PREFIX.length);
    }

    if (!/^[a-z][a-z0-9_]*$/.test(normalized)) {
      throw new Error('Custom metric name must start with letter, then letters/numbers/underscore');
    }

    const full = `${CUSTOM_PREFIX}${normalized}`;
    if (full.length > MAX_LENGTH) {
      throw new Error(`Custom metric name total length must be at most ${MAX_LENGTH}`);
    }

    return new MetricNameVO(full);
  }

  isCanonical(): boolean {
    return CANONICAL_METRICS.includes(this.value);
  }

  isCustom(): boolean {
    return this.value.startsWith(CUSTOM_PREFIX);
  }

  /** Revenue-family metric কিনা */
  isRevenue(): boolean {
    const revenueMetrics: readonly string[] = [
      ANALYTICS_METRIC.REVENUE,
      ANALYTICS_METRIC.AOV,
      ANALYTICS_METRIC.CLV,
      ANALYTICS_METRIC.ROI,
      ANALYTICS_METRIC.ROAS,
    ];
    return revenueMetrics.includes(this.value);
  }

  /** Rate/percentage metric কিনা */
  isRate(): boolean {
    const rateMetrics: readonly string[] = [
      ANALYTICS_METRIC.BOUNCE_RATE,
      ANALYTICS_METRIC.CONVERSION_RATE,
      ANALYTICS_METRIC.CTR,
      ANALYTICS_METRIC.RETENTION_RATE,
      ANALYTICS_METRIC.CHURN_RATE,
      ANALYTICS_METRIC.ENGAGEMENT_RATE,
    ];
    return rateMetrics.includes(this.value);
  }

  /** Higher-is-better কিনা (bounce rate, churn rate, CPC, CPA → lower is better) */
  isHigherBetter(): boolean {
    const lowerIsBetter: readonly string[] = [
      ANALYTICS_METRIC.BOUNCE_RATE,
      ANALYTICS_METRIC.CHURN_RATE,
      ANALYTICS_METRIC.CPC,
      ANALYTICS_METRIC.CPM,
      ANALYTICS_METRIC.CPA,
      ANALYTICS_METRIC.CAC,
    ];
    return !lowerIsBetter.includes(this.value);
  }
}
