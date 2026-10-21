/**
 * InvoiceMapper — Entity → Response DTO
 * @module payment-service/application/mappers
 */
import type { InvoiceEntity } from '@domain/entities/invoice.entity';
import type {
  InvoiceResponseDTO,
  InvoiceSummaryResponseDTO,
  InvoiceListResponseDTO,
} from '@application/dtos/responses/invoice-response.dto';

export class InvoiceMapper {
  static toResponse(e: InvoiceEntity): InvoiceResponseDTO {
    return {
      id: e.id,
      invoiceNumber: e.invoiceNumber.value,
      userId: e.userId.value,
      orderId: e.orderId?.value,
      status: e.status.value,
      subtotal: e.amount.subtotal,
      taxAmount: e.amount.taxAmount,
      total: e.amount.total,
      currency: e.amount.currency,
      issuedAt: e.issuedAt,
      dueAt: e.dueAt,
      paidAt: e.paidAt,
      voidedAt: e.voidedAt,
      refundedAt: e.refundedAt,
      notes: e.notes,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }

  static toSummary(e: InvoiceEntity): InvoiceSummaryResponseDTO {
    return {
      id: e.id,
      invoiceNumber: e.invoiceNumber.value,
      status: e.status.value,
      total: e.amount.total,
      currency: e.amount.currency,
      dueAt: e.dueAt,
    };
  }

  static toListResponse(
    entities: readonly InvoiceEntity[],
    total: number,
    page: number,
    limit: number,
  ): InvoiceListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
