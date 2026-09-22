import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { TransactionEntity } from '../../../domain/entities/transaction.entity';
import type { TransactionResponseDTO } from '../../dtos/responses/transaction-response.dto';

export interface TransactionServiceInterface
  extends BaseServiceInterface<TransactionEntity, string> {
  listByPayment(paymentId: string): Promise<readonly TransactionResponseDTO[]>;
  findById(transactionId: string): Promise<TransactionResponseDTO | null>;
}
