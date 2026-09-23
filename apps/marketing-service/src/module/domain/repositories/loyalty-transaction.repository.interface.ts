import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { LoyaltyTransactionEntity } from '../entities/loyalty-transaction.entity';
import { LoyaltyIdVO } from '../value-objects/primitives/loyalty-id.vo';

export interface LoyaltyTransactionRepository
  extends BaseRepository<LoyaltyTransactionEntity, string> {
  findByLoyalty(loyaltyId: LoyaltyIdVO): Promise<readonly LoyaltyTransactionEntity[]>;
}
