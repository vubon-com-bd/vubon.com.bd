import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { PromotionRuleEntity } from '../../../domain/entities/promotion-rule.entity';

export interface PromotionRuleServiceInterface
  extends BaseServiceInterface<PromotionRuleEntity, string> {
  findByPromotion(promotionId: string): Promise<readonly PromotionRuleEntity[]>;
}
