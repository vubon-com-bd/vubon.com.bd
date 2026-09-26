import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { PromotionRuleVO } from '../value-objects/composites/promotion-rule.vo';
import { PromotionIdVO } from '../value-objects/primitives/promotion-id.vo';

export interface PromotionRuleEntityProps {
  readonly promotionId: PromotionIdVO;
  readonly rule: PromotionRuleVO;
}

export class PromotionRuleEntity extends BaseEntity<string> {
  private readonly _promotionId: PromotionIdVO;
  private readonly _rule: PromotionRuleVO;

  private constructor(
    id: string,
    props: PromotionRuleEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._promotionId = props.promotionId;
    this._rule = props.rule;
  }

  static create(props: PromotionRuleEntityProps): PromotionRuleEntity {
    const now = new Date().toISOString();
    return new PromotionRuleEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: PromotionRuleEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): PromotionRuleEntity {
    return new PromotionRuleEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get promotionId(): PromotionIdVO { return this._promotionId; }
  get rule(): PromotionRuleVO { return this._rule; }
}
