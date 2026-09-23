import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { LoyaltyPointsEntity } from '../entities/loyalty-points.entity';
import { LoyaltyIdVO } from '../value-objects/primitives/loyalty-id.vo';

export interface LoyaltyPointsRepository
  extends BaseRepository<LoyaltyPointsEntity, string> {
  findByLoyalty(loyaltyId: LoyaltyIdVO): Promise<readonly LoyaltyPointsEntity[]>;
}
