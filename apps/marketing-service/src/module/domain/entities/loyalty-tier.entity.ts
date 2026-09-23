import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { LoyaltyTierCompositeVO } from '../value-objects/composites/loyalty-tier-composite.vo';

export interface LoyaltyTierEntityProps {
  readonly tier: LoyaltyTierCompositeVO;
}

export class LoyaltyTierEntity extends AggregateRoot<string> {
  private readonly _tier: LoyaltyTierCompositeVO;

  private constructor(
    id: string,
    props: LoyaltyTierEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._tier = props.tier;
  }

  static create(props: LoyaltyTierEntityProps): LoyaltyTierEntity {
    const now = new Date().toISOString();
    return new LoyaltyTierEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: LoyaltyTierEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): LoyaltyTierEntity {
    return new LoyaltyTierEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get tier(): LoyaltyTierCompositeVO { return this._tier; }
}
