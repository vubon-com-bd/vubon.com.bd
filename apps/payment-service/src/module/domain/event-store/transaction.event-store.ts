/**
 * Transaction Event Store Interface
 * @module payment-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { TransactionEntity } from '@domain/entities/transaction.entity';

export const TRANSACTION_EVENT_STORE = Symbol('TRANSACTION_EVENT_STORE');

export interface TransactionEventStore extends BaseEventStore {
  reconstitute(transactionId: string): Promise<TransactionEntity | null>;
  loadLatest(limit: number): Promise<readonly TransactionEntity[]>;
  loadByPayment(paymentId: string): Promise<readonly TransactionEntity[]>;
  purge(cutoff: string): Promise<number>;
  statistics(): Promise<{
    readonly totalEvents: number;
    readonly oldestOccurredAt: string | null;
    readonly newestOccurredAt: string | null;
  }>;
}
