/**
 * Analytics Summary Value Object (Composite)
 * @module analytics-service/domain/value-objects/composites
 *
 * High-level analytics summary for dashboard header।
 * Business Rule:
 * - Snapshot of key metrics at a point in time
 * - Immutable
 * - Range required
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base';
import { MetricValueVO } from '../primitives/metric-value.vo.js';
import { TimeRangeVO } from './time-range.vo.js';
import { ComparisonVO } from './comparison.vo.js';

export interface AnalyticsSummaryVOProps {
  readonly range: TimeRangeVO;
  readonly users: MetricValueVO;
  readonly sessions: MetricValueVO;
  readonly pageViews: MetricValueVO;
  readonly conversions: MetricValueVO;
  readonly revenue: MetricValueVO;
  readonly bounceRate: MetricValueVO;
  readonly avgSessionDuration: MetricValueVO;
  readonly usersComparison?: ComparisonVO;
  readonly revenueComparison?: ComparisonVO;
}

export class AnalyticsSummaryVO extends BaseVO<AnalyticsSummaryVOProps> {
  private constructor(props: AnalyticsSummaryVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: AnalyticsSummaryVOProps): AnalyticsSummaryVO {
    if (!props.range) {
      throw new Error('AnalyticsSummaryVO requires range');
    }

    // Bounce rate must be ≤ 100
    if (props.bounceRate.numeric > 100) {
      throw new Error('AnalyticsSummaryVO bounceRate must be ≤ 100');
    }

    return new AnalyticsSummaryVO(props);
  }

  get range(): TimeRangeVO {
    return this.value.range;
  }

  get users(): MetricValueVO {
    return this.value.users;
  }

  get sessions(): MetricValueVO {
    return this.value.sessions;
  }

  get pageViews(): MetricValueVO {
    return this.value.pageViews;
  }

  get conversions(): MetricValueVO {
    return this.value.conversions;
  }

  get revenue(): MetricValueVO {
    return this.value.revenue;
  }

  get bounceRate(): MetricValueVO {
    return this.value.bounceRate;
  }

  get avgSessionDuration(): MetricValueVO {
    return this.value.avgSessionDuration;
  }

  get usersComparison(): ComparisonVO | undefined {
    return this.value.usersComparison;
  }

  get revenueComparison(): ComparisonVO | undefined {
    return this.value.revenueComparison;
  }

  /** Pages per session */
  pagesPerSession(): number {
    if (this.sessions.isZero()) return 0;
    return Math.round((this.pageViews.numeric / this.sessions.numeric) * 100) / 100;
  }

  /** Conversion rate (% sessions → conversions) */
  conversionRate(): number {
    if (this.sessions.isZero()) return 0;
    return Math.round((this.conversions.numeric / this.sessions.numeric) * 10000) / 100;
  }

  /** Avg revenue per user (ARPU) */
  arpu(): number {
    if (this.users.isZero()) return 0;
    return Math.round((this.revenue.numeric / this.users.numeric) * 100) / 100;
  }

  /** Avg revenue per session */
  revenuePerSession(): number {
    if (this.sessions.isZero()) return 0;
    return Math.round((this.revenue.numeric / this.sessions.numeric) * 100) / 100;
  }

  /** Sessions per user */
  sessionsPerUser(): number {
    if (this.users.isZero()) return 0;
    return Math.round((this.sessions.numeric / this.users.numeric) * 100) / 100;
  }

  /** Healthy bounce rate কিনা (< 40%) */
  hasHealthyBounceRate(): boolean {
    return this.bounceRate.numeric < 40;
  }

  /** Significant change in users? */
  hasSignificantUsersChange(): boolean {
    return this.usersComparison?.isSignificant() ?? false;
  }
}
