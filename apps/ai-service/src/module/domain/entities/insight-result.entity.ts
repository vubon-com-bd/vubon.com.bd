import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { InsightIdVO } from '../value-objects/primitives/insight-id.vo';
import { InsightResultVO } from '../value-objects/composites/insight-result.vo';

export interface InsightResultEntityProps {
  readonly insightId: InsightIdVO;
  readonly result: InsightResultVO;
}

export class InsightResultEntity extends BaseEntity<InsightIdVO> {
  private readonly _insightId: InsightIdVO;
  private readonly _result: InsightResultVO;

  private constructor(
    id: InsightIdVO,
    props: InsightResultEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._insightId = props.insightId;
    this._result = props.result;
  }

  static create(props: InsightResultEntityProps): InsightResultEntity {
    const now = new Date().toISOString();
    return new InsightResultEntity(props.insightId, props, now, now, null);
  }

  static reconstitute(
    id: InsightIdVO,
    props: InsightResultEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): InsightResultEntity {
    return new InsightResultEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  findingCount(): number {
    return this._result.findingCount();
  }

  isHighConfidence(): boolean {
    return this._result.isHighConfidence();
  }

  get insightId(): InsightIdVO { return this._insightId; }
  get result(): InsightResultVO { return this._result; }
}
