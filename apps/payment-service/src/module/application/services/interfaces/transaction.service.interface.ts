/**
 * ITransactionService — contract
 * @module payment-service/application/services/interfaces
 */
import type {
  CreateTransactionRequestDTO,
  ReverseTransactionRequestDTO,
} from '@application/dtos/requests/transaction/index.js';
import type {
  TransactionResponseDTO,
  TransactionListResponseDTO,
  TransactionStatsResponseDTO,
} from '@application/dtos/responses/transaction-response.dto.js';

export const TRANSACTION_SERVICE = Symbol('TRANSACTION_SERVICE');

export interface TransactionListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'amount' | 'status';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: {
    readonly paymentId?: string;
    readonly type?: string;
    readonly status?: string;
    readonly fromDate?: string;
    readonly toDate?: string;
  };
}

export interface ITransactionService {
  create(dto: CreateTransactionRequestDTO, actorId?: string): Promise<TransactionResponseDTO>;
  reverse(dto: ReverseTransactionRequestDTO, actorId?: string): Promise<TransactionResponseDTO>;

  getById(id: string): Promise<TransactionResponseDTO>;
  listByPayment(paymentId: string): Promise<readonly TransactionResponseDTO[]>;
  list(options: TransactionListOptionsDTO): Promise<TransactionListResponseDTO>;
  getStats(paymentId?: string): Promise<TransactionStatsResponseDTO>;
}
