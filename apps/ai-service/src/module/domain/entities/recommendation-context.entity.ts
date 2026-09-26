import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { RecommendationIdVO } from '../value-objects/primitives/recommendation-id.vo';
import { RecommendationContextVO } from '../value-objects/composites/recommendation-context.vo';

export interface RecommendationContextEntityProps {
  readonly recommendationId: RecommendationIdVO;
  readonly context: RecommendationContextVO;
}

export class RecommendationContextEntity extends BaseEntity<RecommendationIdVO> {
  private readonly _recommendationId: RecommendationIdVO;
  private readonly _context: RecommendationContextVO;

  private constructor(
    id: RecommendationIdVO,
    props: RecommendationContextEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._recommendationId = props.recommendationId;
    this._context = props.context;
  }

  static create(props: RecommendationContextEntityProps): RecommendationContextEntity {
    const now = new Date().toISOString();
    return new RecommendationContextEntity(props.recommendationId, props, now, now, null);
  }

  static reconstitute(
    id: RecommendationIdVO,
    props: RecommendationContextEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): RecommendationContextEntity {
    return new RecommendationContextEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get recommendationId(): RecommendationIdVO { return this._recommendationId; }
  get context(): RecommendationContextVO { return this._context; }
}
