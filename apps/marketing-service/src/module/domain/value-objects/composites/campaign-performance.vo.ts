import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { AnalyticsMetricVO } from '../primitives/analytics-metric.vo';
import { AnalyticsGranularityVO } from '../primitives/analytics-granularity.vo';

export interface CampaignPerformanceProps {
  readonly metric: AnalyticsMetricVO;
  readonly numericValue: number;
  readonly granularity: AnalyticsGranularityVO;
  readonly recordedAt: Date;
}

export class CampaignPerformanceVO extends BaseVO<CampaignPerformanceProps> {
  private constructor(props: CampaignPerformanceProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: CampaignPerformanceProps): CampaignPerformanceVO {
    return new CampaignPerformanceVO(props);
  }

  get metric(): AnalyticsMetricVO { return this.value.metric; }
  get value_(): number { return this.value.numericValue; }
  get granularity(): AnalyticsGranularityVO { return this.value.granularity; }
  get recordedAt(): Date { return this.value.recordedAt; }
}
