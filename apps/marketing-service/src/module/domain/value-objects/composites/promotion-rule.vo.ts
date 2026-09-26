import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { PromotionIdVO } from '../primitives/promotion-id.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { ProductIdVO } from '../primitives/product-id.vo';

export interface PromotionRuleProps {
  readonly promotionId: PromotionIdVO;
  readonly ruleType: string;
  readonly eligibleUserIds: readonly UserIdVO[];
  readonly eligibleProductIds: readonly ProductIdVO[];
  readonly conditions: Readonly<Record<string, unknown>>;
}

export class PromotionRuleVO extends BaseVO<PromotionRuleProps> {
  private constructor(props: PromotionRuleProps) {
    super(Object.freeze({
      ...props,
      eligibleUserIds: Object.freeze([...props.eligibleUserIds]),
      eligibleProductIds: Object.freeze([...props.eligibleProductIds]),
    }));
  }

  static create(props: PromotionRuleProps): PromotionRuleVO {
    return new PromotionRuleVO(props);
  }

  get promotionId(): PromotionIdVO { return this.value.promotionId; }
  get ruleType(): string { return this.value.ruleType; }
  get eligibleUserIds(): readonly UserIdVO[] { return this.value.eligibleUserIds; }
  get eligibleProductIds(): readonly ProductIdVO[] { return this.value.eligibleProductIds; }
  get conditions(): Readonly<Record<string, unknown>> { return this.value.conditions; }
}
