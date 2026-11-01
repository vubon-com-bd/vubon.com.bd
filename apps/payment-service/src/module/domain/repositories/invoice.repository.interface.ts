/**
 * Invoice Repository Interface
 * @module payment-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { InvoiceEntity } from '@domain/entities/invoice.entity';
import type { InvoiceIdVO } from '@domain/primitives/invoice-id.vo';

export const INVOICE_REPOSITORY = Symbol('INVOICE_REPOSITORY');

export interface InvoiceListFilter {
  readonly userId?: string;
  readonly orderId?: string;
  readonly status?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly minAmount?: number;
  readonly maxAmount?: number;
  readonly search?: string;
}

export interface InvoiceListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'issuedAt' | 'dueAt' | 'total';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: InvoiceListFilter;
}

export interface InvoicePaginationResult {
  readonly items: readonly InvoiceEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface InvoiceStats {
  readonly total: number;
  readonly totalAmount: number;
  readonly outstandingAmount: number;
  readonly currency: string;
  readonly byStatus: Readonly<Record<string, number>>;
}

export interface InvoiceRepository extends BaseRepository<InvoiceEntity, string> {
  findByIdVO(id: InvoiceIdVO): Promise<InvoiceEntity | null>;
  findByNumber(invoiceNumber: string): Promise<InvoiceEntity | null>;
  findByUser(userId: string): Promise<readonly InvoiceEntity[]>;
  findByOrder(orderId: string): Promise<readonly InvoiceEntity[]>;
  findByStatus(status: string): Promise<readonly InvoiceEntity[]>;
  findPaginated(options: InvoiceListOptions): Promise<InvoicePaginationResult>;
  getStats(userId?: string): Promise<InvoiceStats>;

  // Cron-support
  findOverdue(): Promise<readonly InvoiceEntity[]>;
  findDueSoon(withinDays: number): Promise<readonly InvoiceEntity[]>;

  softDelete(id: string, deletedBy?: string): Promise<void>;
}
