import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { LoyaltyTransactionServiceInterface } from '../interfaces/loyalty-transaction.service.interface';
import type { LoyaltyTransactionRepository } from '../../../domain/repositories/loyalty-transaction.repository.interface';
import { LoyaltyTransactionEntity } from '../../../domain/entities/loyalty-transaction.entity';
import { LoyaltyIdVO } from '../../../domain/value-objects/primitives/loyalty-id.vo';

@Injectable()
export class LoyaltyTransactionService
  extends BaseService<LoyaltyTransactionEntity, string>
  implements LoyaltyTransactionServiceInterface
{
  readonly name = 'LoyaltyTransactionService';

  constructor(private readonly repo: LoyaltyTransactionRepository) {
    super();
  }

  async findByLoyalty(loyaltyId: string): Promise<readonly LoyaltyTransactionEntity[]> {
    return this.repo.findByLoyalty(LoyaltyIdVO.create(loyaltyId));
  }
}
