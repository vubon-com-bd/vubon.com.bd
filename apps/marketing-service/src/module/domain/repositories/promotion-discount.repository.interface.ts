import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { PromotionDiscountEntity } from '../entities/promotion-discount.entity';
import { PromotionIdVO } from '../value-objects/primitives/promotion-id.vo';

export interface PromotionDiscountRepository
  extends BaseRepository<PromotionDiscountEntity, string> {
  findByPromotionId(promotionId: PromotionIdVO): Promise<readonly PromotionDiscountEntity[]>;
}
