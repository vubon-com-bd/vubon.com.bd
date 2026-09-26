import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { LoyaltyPointsCompositeVO } from '../value-objects/composites/loyalty-points-composite.vo';
import { LoyaltyIdVO } from '../value-objects/primitives/loyalty-id.vo';

export interface LoyaltyPointsEntityProps {
  readonly loyaltyId: LoyaltyIdVO;
  readonly points: LoyaltyPointsCompositeVO;
}

export class LoyaltyPointsEntity extends BaseEntity<string> {
  private readonly _loyaltyId: LoyaltyIdVO;
  private readonly _points: LoyaltyPointsCompositeVO;

  private constructor(
    id: string,
    props: LoyaltyPointsEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._loyaltyId = props.loyaltyId;
    this._points = props.points;
  }

  static create(props: LoyaltyPointsEntityProps): LoyaltyPointsEntity {
    const now = new Date().toISOString();
    return new LoyaltyPointsEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: LoyaltyPointsEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): LoyaltyPointsEntity {
    return new LoyaltyPointsEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get loyaltyId(): LoyaltyIdVO { return this._loyaltyId; }
  get points(): LoyaltyPointsCompositeVO { return this._points; }
}
