import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { PromotionRuleEntity } from '../entities/promotion-rule.entity';
import { PromotionIdVO } from '../value-objects/primitives/promotion-id.vo';

export interface PromotionRuleRepository
  extends BaseRepository<PromotionRuleEntity, string> {
  findByPromotionId(promotionId: PromotionIdVO): Promise<readonly PromotionRuleEntity[]>;
}
