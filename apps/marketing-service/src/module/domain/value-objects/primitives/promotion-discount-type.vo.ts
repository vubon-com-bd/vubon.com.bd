import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

const VALID = new Set<string>([
  'percentage', 'fixed_amount', 'tiered', 'bogo',
]);

export class PromotionDiscountTypeVO extends BaseTypeVO<string> {
  static create(raw: string): PromotionDiscountTypeVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid PromotionDiscountType: ${raw}`);
    }
    return new PromotionDiscountTypeVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
