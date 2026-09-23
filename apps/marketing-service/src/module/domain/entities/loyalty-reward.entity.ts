import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { LoyaltyRewardCompositeVO } from '../value-objects/composites/loyalty-reward.vo';

export interface LoyaltyRewardEntityProps {
  readonly reward: LoyaltyRewardCompositeVO;
}

export class LoyaltyRewardEntity extends AggregateRoot<string> {
  private readonly _reward: LoyaltyRewardCompositeVO;

  private constructor(
    id: string,
    props: LoyaltyRewardEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._reward = props.reward;
  }

  static create(props: LoyaltyRewardEntityProps): LoyaltyRewardEntity {
    const now = new Date().toISOString();
    return new LoyaltyRewardEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: LoyaltyRewardEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): LoyaltyRewardEntity {
    return new LoyaltyRewardEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get reward(): LoyaltyRewardCompositeVO { return this._reward; }
}
