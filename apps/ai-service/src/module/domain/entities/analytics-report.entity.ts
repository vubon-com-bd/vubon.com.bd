import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { AiAnalyticsIdVO } from '../value-objects/primitives/ai-analytics-id.vo';
import { AnalyticsReportVO } from '../value-objects/composites/analytics-report.vo';

export interface AnalyticsReportEntityProps {
  readonly report: AnalyticsReportVO;
}

export class AnalyticsReportEntity extends AggregateRoot<AiAnalyticsIdVO> {
  private readonly _report: AnalyticsReportVO;

  private constructor(
    id: AiAnalyticsIdVO,
    props: AnalyticsReportEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._report = props.report;
  }

  static create(props: AnalyticsReportEntityProps): AnalyticsReportEntity {
    const now = new Date().toISOString();
    const id = AiAnalyticsIdVO.create(crypto.randomUUID());
    return new AnalyticsReportEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: AiAnalyticsIdVO,
    props: AnalyticsReportEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): AnalyticsReportEntity {
    return new AnalyticsReportEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  totalEntries(): number {
    return this._report.totalEntries();
  }

  get report(): AnalyticsReportVO { return this._report; }
}
