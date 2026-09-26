import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { RecommendationIdVO } from '../value-objects/primitives/recommendation-id.vo';
import { RecommendationResultVO } from '../value-objects/composites/recommendation-result.vo';

export interface RecommendationResultEntityProps {
  readonly recommendationId: RecommendationIdVO;
  readonly result: RecommendationResultVO;
}

export class RecommendationResultEntity extends BaseEntity<RecommendationIdVO> {
  private readonly _recommendationId: RecommendationIdVO;
  private readonly _result: RecommendationResultVO;

  private constructor(
    id: RecommendationIdVO,
    props: RecommendationResultEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._recommendationId = props.recommendationId;
    this._result = props.result;
  }

  static create(props: RecommendationResultEntityProps): RecommendationResultEntity {
    const now = new Date().toISOString();
    return new RecommendationResultEntity(props.recommendationId, props, now, now, null);
  }

  static reconstitute(
    id: RecommendationIdVO,
    props: RecommendationResultEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): RecommendationResultEntity {
    return new RecommendationResultEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get recommendationId(): RecommendationIdVO { return this._recommendationId; }
  get result(): RecommendationResultVO { return this._result; }

  hasResults(): boolean {
    return this._result.size() > 0;
  }
}
