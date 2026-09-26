import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { AiAnalyticsIdVO } from '../value-objects/primitives/ai-analytics-id.vo';
import { AnalyticsTypeVO } from '../value-objects/primitives/analytics-type.vo';
import { AnalyticsReportVO } from '../value-objects/composites/analytics-report.vo';

export interface AiAnalyticsEntityProps {
  readonly type: AnalyticsTypeVO;
  readonly report: AnalyticsReportVO;
  readonly modelId: string | null;
}

export class AiAnalyticsEntity extends BaseEntity<AiAnalyticsIdVO> {
  private readonly _type: AnalyticsTypeVO;
  private readonly _report: AnalyticsReportVO;
  private readonly _modelId: string | null;

  private constructor(
    id: AiAnalyticsIdVO,
    props: AiAnalyticsEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._type = props.type;
    this._report = props.report;
    this._modelId = props.modelId;
  }

  static create(props: AiAnalyticsEntityProps): AiAnalyticsEntity {
    const now = new Date().toISOString();
    const id = AiAnalyticsIdVO.create(crypto.randomUUID());
    return new AiAnalyticsEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: AiAnalyticsIdVO,
    props: AiAnalyticsEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): AiAnalyticsEntity {
    return new AiAnalyticsEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  hasModel(): boolean {
    return this._modelId !== null;
  }

  get type(): AnalyticsTypeVO { return this._type; }
  get report(): AnalyticsReportVO { return this._report; }
  get modelId(): string | null { return this._modelId; }
}
