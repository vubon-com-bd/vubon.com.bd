import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { PromotionEntity } from '../entities/promotion.entity';
import { PromotionIdVO } from '../value-objects/primitives/promotion-id.vo';
import { PromotionCodeVO } from '../value-objects/primitives/promotion-code.vo';

export interface PromotionRepository
  extends BaseRepository<PromotionEntity, PromotionIdVO> {
  findByCode(code: PromotionCodeVO): Promise<PromotionEntity | null>;
  findActive(): Promise<readonly PromotionEntity[]>;
}
