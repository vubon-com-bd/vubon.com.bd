/**
 * Vendor Invoice Types
 * @module shared-types/business/vendor
 *
 * Values আসে shared-constants/business/vendor/vendor-invoice.constants থেকে।
 */

import type { VENDOR_INVOICE_STATUS, VENDOR_INVOICE_TYPE } from '@vubon/shared-constants/business';
import type { VendorId, Money } from '../../common/primitives';
import type { BaseEntity } from '../../common/base';

export type VendorInvoiceStatusValue =
  (typeof VENDOR_INVOICE_STATUS)[keyof typeof VENDOR_INVOICE_STATUS];

export type VendorInvoiceTypeValue = (typeof VENDOR_INVOICE_TYPE)[keyof typeof VENDOR_INVOICE_TYPE];

export interface VendorInvoice extends BaseEntity<string> {
  readonly vendorId: VendorId;
  readonly invoiceNumber: string;
  readonly type: VendorInvoiceTypeValue;
  readonly status: VendorInvoiceStatusValue;
  readonly amount: Money;
  readonly taxAmount?: Money;
  readonly totalAmount: Money;
  readonly currency: string;
  readonly issueDate: string;
  readonly dueDate: string;
  readonly paidAt?: string;
  readonly periodStart?: string;
  readonly periodEnd?: string;
  readonly orderIds?: readonly string[];
  readonly notes?: string;
  readonly pdfUrl?: string;
}

export interface VendorInvoicePublic {
  readonly id: string;
  readonly invoiceNumber: string;
  readonly type: VendorInvoiceTypeValue;
  readonly status: VendorInvoiceStatusValue;
  readonly totalAmount: Money;
  readonly currency: string;
  readonly issueDate: string;
  readonly dueDate: string;
  readonly paidAt?: string;
}

export interface VendorInvoiceFilter {
  readonly vendorId?: VendorId;
  readonly type?: VendorInvoiceTypeValue;
  readonly status?: VendorInvoiceStatusValue;
  readonly fromDate?: string;
  readonly toDate?: string;
}
