/**
 * Payment Event Store Interface
 * @module payment-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { PaymentEntity } from '@domain/entities/payment.entity';

export const PAYMENT_EVENT_STORE = Symbol('PAYMENT_EVENT_STORE');

export interface PaymentEventStore extends BaseEventStore {
  reconstitute(paymentId: string): Promise<PaymentEntity | null>;
  loadLatest(limit: number): Promise<readonly PaymentEntity[]>;
  loadByOrder(orderId: string): Promise<readonly PaymentEntity[]>;
  loadByUser(userId: string, limit?: number): Promise<readonly PaymentEntity[]>;
  purge(cutoff: string): Promise<number>;
  statistics(): Promise<{
    readonly totalEvents: number;
    readonly oldestOccurredAt: string | null;
    readonly newestOccurredAt: string | null;
  }>;
}
