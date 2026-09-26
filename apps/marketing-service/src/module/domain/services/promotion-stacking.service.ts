import { PromotionEntity } from '../entities/promotion.entity';

export class PromotionStackingService {
  canStack(promotions: readonly PromotionEntity[]): boolean {
    return promotions.every((p) => p.type.value === 'coupon');
  }
}
