/**
 * CreateTransactionRequestDTO
 * @module payment-service/application/dtos/requests/transaction
 *
 * Manually record a transaction (usually system/internal).
 * Type must be one of TRANSACTION_TYPE values.
 */
import type { TransactionTypeValue } from '@vubon/shared-types/business/payment';

export interface CreateTransactionRequestDTO {
  readonly paymentId: string;
  readonly type: TransactionTypeValue;
  readonly amount: number;
  readonly currency: string;
  readonly gatewayReference?: string;
  readonly reference?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly idempotencyKey?: string;
}

export interface CreateTransactionContextDTO {
  readonly request: CreateTransactionRequestDTO;
  readonly actorId?: string;
}
