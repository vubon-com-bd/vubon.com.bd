import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { PromotionEntity } from '../entities/promotion.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export class CanApplyPromotionSpecification extends Specification<{
  promotion: PromotionEntity;
  userId: UserIdVO;
}> {
  isSatisfiedBy(candidate: { promotion: PromotionEntity; userId: UserIdVO }): boolean {
    if (candidate.promotion.isDeleted()) return false;
    if (candidate.promotion.status.value !== 'active') return false;
    const max = candidate.promotion.maxUsage;
    if (max !== null && candidate.promotion.usage.value >= max) return false;
    return true;
  }
}
