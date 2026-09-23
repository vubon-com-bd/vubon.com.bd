import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { PromotionEntity } from '../entities/promotion.entity';

export class CanStackPromotionSpecification extends Specification<
  readonly PromotionEntity[]
> {
  isSatisfiedBy(candidate: readonly PromotionEntity[]): boolean {
    // Only allow stacking when every promotion is 'coupon' type
    return candidate.every((p) => p.type.value === 'coupon');
  }
}
