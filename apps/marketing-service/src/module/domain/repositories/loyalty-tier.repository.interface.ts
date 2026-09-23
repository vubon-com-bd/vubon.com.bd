import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { LoyaltyTierEntity } from '../entities/loyalty-tier.entity';
import { LoyaltyTierVO } from '../value-objects/primitives/loyalty-tier.vo';

export interface LoyaltyTierRepository
  extends BaseRepository<LoyaltyTierEntity, string> {
  findByTier(tier: LoyaltyTierVO): Promise<LoyaltyTierEntity | null>;
}
