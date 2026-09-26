import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { AnalyticsTypeVO } from '../primitives/analytics-type.vo';
import { AnalyticsMetricVO } from '../primitives/analytics-metric.vo';

export interface AnalyticsMetricEntryProps {
  readonly metric: AnalyticsMetricVO;
  readonly value: number;
  readonly unit: string;
}

export interface AnalyticsReportProps {
  readonly type: AnalyticsTypeVO;
  readonly entries: readonly AnalyticsMetricEntryProps[];
  readonly periodStart: Date;
  readonly periodEnd: Date;
}

export class AnalyticsReportVO extends BaseVO<AnalyticsReportProps> {
  static create(props: AnalyticsReportProps): AnalyticsReportVO {
    if (props.periodStart > props.periodEnd) {
      throw new Error('AnalyticsReport: periodStart must be <= periodEnd');
    }
    return new AnalyticsReportVO(props);
  }

  private constructor(props: AnalyticsReportProps) {
    super(
      Object.freeze({
        ...props,
        entries: Object.freeze(props.entries.map((e) => Object.freeze({ ...e }))),
      }),
    );
  }

  get type(): AnalyticsTypeVO { return this.value.type; }
  get entries(): readonly AnalyticsMetricEntryProps[] { return this.value.entries; }
  get periodStart(): Date { return this.value.periodStart; }
  get periodEnd(): Date { return this.value.periodEnd; }

  findMetric(metric: AnalyticsMetricVO): AnalyticsMetricEntryProps | null {
    return this.value.entries.find((e) => e.metric.value === metric.value) ?? null;
  }

  totalEntries(): number {
    return this.value.entries.length;
  }
}
