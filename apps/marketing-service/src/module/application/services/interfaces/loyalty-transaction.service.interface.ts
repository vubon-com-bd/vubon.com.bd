import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { LoyaltyTransactionEntity } from '../../../domain/entities/loyalty-transaction.entity';

export interface LoyaltyTransactionServiceInterface
  extends BaseServiceInterface<LoyaltyTransactionEntity, string> {
  findByLoyalty(loyaltyId: string): Promise<readonly LoyaltyTransactionEntity[]>;
}
