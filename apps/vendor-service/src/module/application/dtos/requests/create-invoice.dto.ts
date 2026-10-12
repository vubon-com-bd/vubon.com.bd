/**
 * CreateInvoiceRequestDto — issue a new invoice
 * @module vendor-service/application/dtos/requests
 */
import type { VENDOR_INVOICE_TYPE } from '@vubon/shared-constants/business';

export class CreateInvoiceRequestDto {
  vendorId!: string;
  type!: (typeof VENDOR_INVOICE_TYPE)[keyof typeof VENDOR_INVOICE_TYPE];
  amount!: number;
  taxAmount?: number;
  totalAmount!: number;
  currency!: string;
  issueDate!: string;
  dueDate!: string;
  periodStart?: string;
  periodEnd?: string;
  orderIds?: readonly string[];
  notes?: string;
  idempotencyKey?: string;
}
