import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { MarketingAnalyticsIdVO } from '../primitives/marketing-analytics-id.vo';
import { AnalyticsMetricVO } from '../primitives/analytics-metric.vo';
import { AnalyticsGranularityVO } from '../primitives/analytics-granularity.vo';

export interface MarketingAnalyticsProps {
  readonly id: MarketingAnalyticsIdVO;
  readonly metric: AnalyticsMetricVO;
  readonly metricValue: number;
  readonly granularity: AnalyticsGranularityVO;
  readonly recordedAt: Date;
}

export class MarketingAnalyticsVO extends BaseVO<MarketingAnalyticsProps> {
  private constructor(props: MarketingAnalyticsProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: MarketingAnalyticsProps): MarketingAnalyticsVO {
    return new MarketingAnalyticsVO(props);
  }

  get id(): MarketingAnalyticsIdVO { return this.value.id; }
  get metric(): AnalyticsMetricVO { return this.value.metric; }
  get metricValue(): number { return this.value.metricValue; }
  get granularity(): AnalyticsGranularityVO { return this.value.granularity; }
  get recordedAt(): Date { return this.value.recordedAt; }
}
