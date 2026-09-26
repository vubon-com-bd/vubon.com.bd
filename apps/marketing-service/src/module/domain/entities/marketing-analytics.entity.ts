import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { MarketingAnalyticsIdVO } from '../value-objects/primitives/marketing-analytics-id.vo';
import { AnalyticsMetricVO } from '../value-objects/primitives/analytics-metric.vo';
import { AnalyticsGranularityVO } from '../value-objects/primitives/analytics-granularity.vo';
import { MarketingAnalyticsRecordedEvent } from '../events/analytics.events';

export interface MarketingAnalyticsEntityProps {
  readonly metric: AnalyticsMetricVO;
  readonly value: number;
  readonly granularity: AnalyticsGranularityVO;
  readonly recordedAt: Date;
}

export class MarketingAnalyticsEntity extends BaseEntity<string> {
  private readonly _metric: AnalyticsMetricVO;
  private readonly _value: number;
  private readonly _granularity: AnalyticsGranularityVO;
  private readonly _recordedAt: Date;

  private constructor(
    id: string,
    props: MarketingAnalyticsEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._metric = props.metric;
    this._value = props.value;
    this._granularity = props.granularity;
    this._recordedAt = props.recordedAt;
  }

  static create(props: MarketingAnalyticsEntityProps): MarketingAnalyticsEntity {
    const now = new Date().toISOString();
    const id = MarketingAnalyticsIdVO.create(crypto.randomUUID());
    const entity = new MarketingAnalyticsEntity(id.value, props, now, now, null);
    return entity;
  }

  static reconstitute(
    id: string,
    props: MarketingAnalyticsEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): MarketingAnalyticsEntity {
    return new MarketingAnalyticsEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get metric(): AnalyticsMetricVO { return this._metric; }
  get value(): number { return this._value; }
  get granularity(): AnalyticsGranularityVO { return this._granularity; }
  get recordedAt(): Date { return this._recordedAt; }
}
