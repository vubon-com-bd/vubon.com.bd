import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

const VALID = new Set<string>([
  'coupon', 'discount', 'flash_sale', 'bogo', 'bundle', 'free_shipping', 'cashback', 'loyalty',
]);

export class PromotionTypeVO extends BaseTypeVO<string> {
  static create(raw: string): PromotionTypeVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid PromotionType: ${raw}`);
    }
    return new PromotionTypeVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
