/**
 * Invoice Response DTOs
 * @module payment-service/application/dtos/responses
 */
import type { InvoiceStatusValue } from '@domain/primitives/invoice-status.vo';

export interface InvoiceResponseDTO {
  readonly id: string;
  readonly invoiceNumber: string;
  readonly userId: string;
  readonly orderId?: string;
  readonly status: InvoiceStatusValue;
  readonly subtotal: number;
  readonly taxAmount: number;
  readonly total: number;
  readonly currency: string;
  readonly issuedAt?: string;
  readonly dueAt?: string;
  readonly paidAt?: string;
  readonly voidedAt?: string;
  readonly refundedAt?: string;
  readonly notes?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface InvoiceSummaryResponseDTO {
  readonly id: string;
  readonly invoiceNumber: string;
  readonly status: InvoiceStatusValue;
  readonly total: number;
  readonly currency: string;
  readonly dueAt?: string;
}

export interface InvoiceListResponseDTO {
  readonly items: readonly InvoiceSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface InvoiceStatsResponseDTO {
  readonly total: number;
  readonly totalAmount: number;
  readonly outstandingAmount: number;
  readonly currency: string;
  readonly byStatus: Readonly<Record<string, number>>;
}
