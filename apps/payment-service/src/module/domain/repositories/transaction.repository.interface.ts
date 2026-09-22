import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { TransactionEntity } from '../entities/transaction.entity';
import { TransactionIdVO } from '../value-objects/primitives/transaction-id.vo';
import { PaymentIdVO } from '../value-objects/primitives/payment-id.vo';

export interface TransactionRepository extends BaseRepository<TransactionEntity, TransactionIdVO> {
  findByPaymentId(paymentId: PaymentIdVO): Promise<readonly TransactionEntity[]>;
}
