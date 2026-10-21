/**
 * Refund Event Store Interface
 * @module payment-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { RefundEntity } from '@domain/entities/refund.entity';

export const REFUND_EVENT_STORE = Symbol('REFUND_EVENT_STORE');

export interface RefundEventStore extends BaseEventStore {
  reconstitute(refundId: string): Promise<RefundEntity | null>;
  loadLatest(limit: number): Promise<readonly RefundEntity[]>;
  loadByPayment(paymentId: string): Promise<readonly RefundEntity[]>;
  purge(cutoff: string): Promise<number>;
  statistics(): Promise<{
    readonly totalEvents: number;
    readonly oldestOccurredAt: string | null;
    readonly newestOccurredAt: string | null;
  }>;
}
