/**
 * Report Type Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Analytics report-এর type (overview, traffic, engagement, conversion, retention, revenue, cohort, funnel, attribution, custom)।
 * Business Rule:
 * - ANALYTICS_REPORT_TYPE constants থেকে হতে হবে
 * - Type নির্ধারণ করে কোন metrics + dimensions default হবে
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ANALYTICS_REPORT_TYPE } from '@vubon/shared-constants/platform/analytics';

const VALID_TYPES: readonly string[] = Object.values(ANALYTICS_REPORT_TYPE);

export class ReportTypeVO extends BaseTypeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ReportTypeVO {
    if (typeof raw !== 'string') {
      throw new Error('ReportType must be a string');
    }

    const normalized = raw.trim().toLowerCase();

    if (!VALID_TYPES.includes(normalized)) {
      throw new Error(
        `Invalid ReportType: "${normalized}". Valid: ${VALID_TYPES.join(', ')}`
      );
    }

    return new ReportTypeVO(normalized);
  }

  isOverview(): boolean {
    return this.value === ANALYTICS_REPORT_TYPE.OVERVIEW;
  }

  isTraffic(): boolean {
    return this.value === ANALYTICS_REPORT_TYPE.TRAFFIC;
  }

  isEngagement(): boolean {
    return this.value === ANALYTICS_REPORT_TYPE.ENGAGEMENT;
  }

  isConversion(): boolean {
    return this.value === ANALYTICS_REPORT_TYPE.CONVERSION;
  }

  isRetention(): boolean {
    return this.value === ANALYTICS_REPORT_TYPE.RETENTION;
  }

  isRevenue(): boolean {
    return this.value === ANALYTICS_REPORT_TYPE.REVENUE;
  }

  isCohort(): boolean {
    return this.value === ANALYTICS_REPORT_TYPE.COHORT;
  }

  isFunnel(): boolean {
    return this.value === ANALYTICS_REPORT_TYPE.FUNNEL;
  }

  isAttribution(): boolean {
    return this.value === ANALYTICS_REPORT_TYPE.ATTRIBUTION;
  }

  isCustom(): boolean {
    return this.value === ANALYTICS_REPORT_TYPE.CUSTOM;
  }

  /** Financial report কিনা (revenue only) */
  isFinancial(): boolean {
    return this.isRevenue();
  }

  /** Time-series heavy কিনা */
  isTimeSeries(): boolean {
    return (
      this.isTraffic() ||
      this.isEngagement() ||
      this.isConversion() ||
      this.isRetention() ||
      this.isRevenue()
    );
  }

  /** Multi-touch/funnel-based কিনা */
  isFunnelBased(): boolean {
    return this.isFunnel() || this.isAttribution() || this.isCohort();
  }

  /** Custom — user-defined query লাগবে */
  requiresCustomQuery(): boolean {
    return this.isCustom();
  }
}
