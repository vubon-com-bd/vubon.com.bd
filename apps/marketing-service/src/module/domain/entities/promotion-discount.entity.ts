import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { PromotionDiscountVO } from '../value-objects/composites/promotion-discount.vo';
import { PromotionIdVO } from '../value-objects/primitives/promotion-id.vo';

export interface PromotionDiscountEntityProps {
  readonly promotionId: PromotionIdVO;
  readonly discount: PromotionDiscountVO;
}

export class PromotionDiscountEntity extends BaseEntity<string> {
  private readonly _promotionId: PromotionIdVO;
  private readonly _discount: PromotionDiscountVO;

  private constructor(
    id: string,
    props: PromotionDiscountEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._promotionId = props.promotionId;
    this._discount = props.discount;
  }

  static create(props: PromotionDiscountEntityProps): PromotionDiscountEntity {
    const now = new Date().toISOString();
    return new PromotionDiscountEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: PromotionDiscountEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): PromotionDiscountEntity {
    return new PromotionDiscountEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get promotionId(): PromotionIdVO { return this._promotionId; }
  get discount(): PromotionDiscountVO { return this._discount; }
}
