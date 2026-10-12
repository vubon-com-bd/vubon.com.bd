/**
 * VendorInvoiceRepository
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorInvoiceEntity } from '../entities/vendor-invoice.entity.js';
import { InvoiceStatusVO } from '../value-objects/primitives/invoice-status.vo.js';
import { InvoiceTypeVO } from '../value-objects/primitives/invoice-type.vo.js';

export const VENDOR_INVOICE_REPOSITORY = Symbol('VENDOR_INVOICE_REPOSITORY');

export interface VendorInvoiceFilter {
  readonly vendorId?: string;
  readonly type?: string;
  readonly status?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface VendorInvoiceRepository extends BaseRepository<VendorInvoiceEntity, string> {
  findByVendorId(vendorId: string): Promise<readonly VendorInvoiceEntity[]>;
  findByStatus(status: InvoiceStatusVO): Promise<readonly VendorInvoiceEntity[]>;
  findByType(type: InvoiceTypeVO): Promise<readonly VendorInvoiceEntity[]>;
  findByNumber(invoiceNumber: string): Promise<VendorInvoiceEntity | null>;
  findByOrderId(orderId: string): Promise<readonly VendorInvoiceEntity[]>;
  search(filter: VendorInvoiceFilter): Promise<readonly VendorInvoiceEntity[]>;

  /** Invoices unpaid and past due. */
  findOverdue(): Promise<readonly VendorInvoiceEntity[]>;
  /** Unpaid invoices due within N days. */
  findDueWithin(days: number): Promise<readonly VendorInvoiceEntity[]>;
  /** Unpaid invoices for a vendor. */
  findUnpaidByVendorId(vendorId: string): Promise<readonly VendorInvoiceEntity[]>;

  sumUnpaidByVendorId(vendorId: string): Promise<number>;
  countByStatus(status: InvoiceStatusVO): Promise<number>;
  existsByNumber(invoiceNumber: string): Promise<boolean>;
}
