import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { LoyaltyRewardEntity } from '../entities/loyalty-reward.entity';

export interface LoyaltyRewardRepository
  extends BaseRepository<LoyaltyRewardEntity, string> {
  findActive(): Promise<readonly LoyaltyRewardEntity[]>;
}
