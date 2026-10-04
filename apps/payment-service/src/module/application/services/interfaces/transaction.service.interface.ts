/**
 * ITransactionService — contract
 * @module payment-service/application/services/interfaces
 */
import type {
  CreateTransactionRequestDTO,
  ListTransactionsRequestDTO,
} from '../../dtos/requests/transaction/transaction.dto.js';
import type {
  TransactionResponseDTO,
  TransactionListResponseDTO,
} from '../../dtos/responses/transaction-response.dto.js';

export const TRANSACTION_SERVICE = Symbol('TRANSACTION_SERVICE');

export interface ITransactionService {
  record(dto: CreateTransactionRequestDTO, actorId?: string): Promise<TransactionResponseDTO>;
  markSucceeded(
    transactionId: string,
    gatewayTransactionId?: string,
  ): Promise<TransactionResponseDTO>;
  markFailed(
    transactionId: string,
    reason: string,
    code?: string,
  ): Promise<TransactionResponseDTO>;
  getById(transactionId: string): Promise<TransactionResponseDTO>;
  listByPayment(paymentId: string): Promise<readonly TransactionResponseDTO[]>;
  listByOrder(orderId: string): Promise<readonly TransactionResponseDTO[]>;
  list(options: ListTransactionsRequestDTO): Promise<TransactionListResponseDTO>;
}
