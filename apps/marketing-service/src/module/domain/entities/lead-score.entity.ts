import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { LeadScoreCompositeVO } from '../value-objects/composites/lead-score-composite.vo';
import { LeadIdVO } from '../value-objects/primitives/lead-id.vo';

export interface LeadScoreEntityProps {
  readonly leadId: LeadIdVO;
  readonly score: LeadScoreCompositeVO;
}

export class LeadScoreEntity extends BaseEntity<string> {
  private readonly _leadId: LeadIdVO;
  private readonly _score: LeadScoreCompositeVO;

  private constructor(
    id: string,
    props: LeadScoreEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._leadId = props.leadId;
    this._score = props.score;
  }

  static create(props: LeadScoreEntityProps): LeadScoreEntity {
    const now = new Date().toISOString();
    return new LeadScoreEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: LeadScoreEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): LeadScoreEntity {
    return new LeadScoreEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get leadId(): LeadIdVO { return this._leadId; }
  get score(): LeadScoreCompositeVO { return this._score; }
}
