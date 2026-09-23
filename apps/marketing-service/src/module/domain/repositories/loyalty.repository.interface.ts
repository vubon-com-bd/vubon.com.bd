import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { LoyaltyEntity } from '../entities/loyalty.entity';
import { LoyaltyIdVO } from '../value-objects/primitives/loyalty-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface LoyaltyRepository
  extends BaseRepository<LoyaltyEntity, LoyaltyIdVO> {
  findByUser(userId: UserIdVO): Promise<LoyaltyEntity | null>;
}
