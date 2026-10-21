/**
 * Invoice Event Store Interface
 * @module payment-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { InvoiceEntity } from '@domain/entities/invoice.entity';

export const INVOICE_EVENT_STORE = Symbol('INVOICE_EVENT_STORE');

export interface InvoiceEventStore extends BaseEventStore {
  reconstitute(invoiceId: string): Promise<InvoiceEntity | null>;
  loadLatest(limit: number): Promise<readonly InvoiceEntity[]>;
  loadByUser(userId: string): Promise<readonly InvoiceEntity[]>;
  loadByOrder(orderId: string): Promise<readonly InvoiceEntity[]>;
  purge(cutoff: string): Promise<number>;
  statistics(): Promise<{
    readonly totalEvents: number;
    readonly oldestOccurredAt: string | null;
    readonly newestOccurredAt: string | null;
  }>;
}
