import { PromotionEntity } from '../entities/promotion.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export class PromotionEligibilityService {
  isEligible(promotion: PromotionEntity, userId: UserIdVO): boolean {
    void userId;
    if (promotion.status.value !== 'active') return false;
    const max = promotion.maxUsage;
    if (max !== null && promotion.usage.value >= max) return false;
    return true;
  }
}
