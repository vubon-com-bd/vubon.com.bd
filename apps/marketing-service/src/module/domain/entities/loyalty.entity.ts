import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { LoyaltyIdVO } from '../value-objects/primitives/loyalty-id.vo';
import { LoyaltyStatusVO } from '../value-objects/primitives/loyalty-status.vo';
import { LoyaltyPointsVO } from '../value-objects/primitives/loyalty-points.vo';
import { LoyaltyTierVO } from '../value-objects/primitives/loyalty-tier.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import {
  LoyaltyPointsEarnedEvent,
  LoyaltyPointsRedeemedEvent,
  LoyaltyTierUpgradedEvent,
} from '../events/loyalty.events';

export interface LoyaltyEntityProps {
  readonly userId: UserIdVO;
  readonly points: LoyaltyPointsVO;
  readonly tier: LoyaltyTierVO;
  readonly status: LoyaltyStatusVO;
}

export class LoyaltyEntity extends AggregateRoot<LoyaltyIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _points: LoyaltyPointsVO;
  private readonly _tier: LoyaltyTierVO;
  private readonly _status: LoyaltyStatusVO;

  private constructor(
    id: LoyaltyIdVO,
    props: LoyaltyEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._points = props.points;
    this._tier = props.tier;
    this._status = props.status;
  }

  static create(props: LoyaltyEntityProps): LoyaltyEntity {
    const now = new Date().toISOString();
    const id = LoyaltyIdVO.create(crypto.randomUUID());
    return new LoyaltyEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: LoyaltyIdVO,
    props: LoyaltyEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): LoyaltyEntity {
    return new LoyaltyEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  earnPoints(amount: number): LoyaltyEntity {
    const now = new Date();
    const newPoints = LoyaltyPointsVO.create(this._points.value + amount);
    const updated = new LoyaltyEntity(
      this.id,
      { ...this._toProps(), points: newPoints },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new LoyaltyPointsEarnedEvent(this.id.value, amount, this.version + 1),
    );
    return updated;
  }

  redeemPoints(amount: number): LoyaltyEntity {
    const now = new Date();
    if (this._points.value < amount) {
      throw new Error('Insufficient points');
    }
    const newPoints = LoyaltyPointsVO.create(this._points.value - amount);
    const updated = new LoyaltyEntity(
      this.id,
      { ...this._toProps(), points: newPoints },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new LoyaltyPointsRedeemedEvent(this.id.value, amount, this.version + 1),
    );
    return updated;
  }

  upgradeTier(newTier: LoyaltyTierVO): LoyaltyEntity {
    const now = new Date();
    const updated = new LoyaltyEntity(
      this.id,
      { ...this._toProps(), tier: newTier },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new LoyaltyTierUpgradedEvent(this.id.value, newTier.value, this.version + 1),
    );
    return updated;
  }

  get userId(): UserIdVO { return this._userId; }
  get points(): LoyaltyPointsVO { return this._points; }
  get tier(): LoyaltyTierVO { return this._tier; }
  get status(): LoyaltyStatusVO { return this._status; }

  private _toProps(): LoyaltyEntityProps {
    return {
      userId: this._userId,
      points: this._points,
      tier: this._tier,
      status: this._status,
    };
  }
}
