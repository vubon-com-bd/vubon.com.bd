import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ReferralRewardCompositeVO } from '../value-objects/composites/referral-reward.vo';
import { ReferralIdVO } from '../value-objects/primitives/referral-id.vo';

export interface ReferralRewardEntityProps {
  readonly referralId: ReferralIdVO;
  readonly reward: ReferralRewardCompositeVO;
}

export class ReferralRewardEntity extends BaseEntity<string> {
  private readonly _referralId: ReferralIdVO;
  private readonly _reward: ReferralRewardCompositeVO;

  private constructor(
    id: string,
    props: ReferralRewardEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._referralId = props.referralId;
    this._reward = props.reward;
  }

  static create(props: ReferralRewardEntityProps): ReferralRewardEntity {
    const now = new Date().toISOString();
    return new ReferralRewardEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: ReferralRewardEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ReferralRewardEntity {
    return new ReferralRewardEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get referralId(): ReferralIdVO { return this._referralId; }
  get reward(): ReferralRewardCompositeVO { return this._reward; }
}
