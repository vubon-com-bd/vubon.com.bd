/**
 * VendorInvoiceResponseDto
 * @module vendor-service/application/dtos/responses
 */
import type {
  VENDOR_INVOICE_STATUS,
  VENDOR_INVOICE_TYPE,
} from '@vubon/shared-constants/business';

export interface VendorInvoiceResponseDto {
  readonly id: string;
  readonly vendorId: string;
  readonly invoiceNumber: string;
  readonly type: (typeof VENDOR_INVOICE_TYPE)[keyof typeof VENDOR_INVOICE_TYPE];
  readonly status: (typeof VENDOR_INVOICE_STATUS)[keyof typeof VENDOR_INVOICE_STATUS];
  readonly amount: number;
  readonly taxAmount: number;
  readonly totalAmount: number;
  readonly currency: string;
  readonly issueDate: string;
  readonly dueDate: string;
  readonly paidAt?: string;
  readonly periodStart?: string;
  readonly periodEnd?: string;
  readonly orderIds?: readonly string[];
  readonly notes?: string;
  readonly pdfUrl?: string;
  readonly isOverdue: boolean;
  readonly daysUntilDue: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface VendorInvoicePublicDto {
  readonly id: string;
  readonly invoiceNumber: string;
  readonly type: (typeof VENDOR_INVOICE_TYPE)[keyof typeof VENDOR_INVOICE_TYPE];
  readonly status: (typeof VENDOR_INVOICE_STATUS)[keyof typeof VENDOR_INVOICE_STATUS];
  readonly totalAmount: number;
  readonly currency: string;
  readonly issueDate: string;
  readonly dueDate: string;
  readonly paidAt?: string;
}
