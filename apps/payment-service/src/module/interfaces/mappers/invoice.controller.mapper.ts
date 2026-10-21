/**
 * InvoiceControllerMapper — HTTP DTO ↔ Application DTO
 * @module payment-service/interfaces/mappers
 */
import type {
  GenerateInvoiceHttpDTO,
  ListInvoicesHttpQueryDTO,
} from '@interfaces/dtos/requests/invoice.request.dto';
import type {
  GenerateInvoiceRequestDTO,
} from '@application/dtos/requests/invoice/index';
import type {
  InvoiceListOptionsDTO,
} from '@application/services/interfaces/invoice.service.interface';
import type {
  InvoiceResponseDTO,
  InvoiceSummaryResponseDTO,
  InvoiceListResponseDTO,
  InvoiceStatsResponseDTO,
} from '@application/dtos/responses/invoice-response.dto';
import {
  InvoiceHttpResponseDTO,
  InvoiceSummaryHttpResponseDTO,
  InvoiceListHttpResponseDTO,
  InvoiceStatsHttpResponseDTO,
} from '@interfaces/dtos/responses/invoice.response.dto';

export class InvoiceControllerMapper {
  static toGenerateAppDto(dto: GenerateInvoiceHttpDTO): GenerateInvoiceRequestDTO {
    return {
      orderId: dto.orderId,
      userId: dto.userId,
      subtotal: dto.subtotal,
      taxAmount: dto.taxAmount,
      currency: dto.currency,
      dueAt: dto.dueAt,
      notes: dto.notes,
    };
  }

  static toListOptions(q: ListInvoicesHttpQueryDTO): InvoiceListOptionsDTO {
    return {
      page: q.page ?? 1,
      limit: q.limit ?? 20,
      sortBy: 'createdAt',
      sortDir: 'desc',
      filter: {
        userId: q.userId,
        orderId: q.orderId,
        status: q.status,
        search: q.search,
        fromDate: q.fromDate,
        toDate: q.toDate,
      },
    };
  }

  static toHttpResponse(app: InvoiceResponseDTO): InvoiceHttpResponseDTO {
    return {
      id: app.id,
      invoiceNumber: app.invoiceNumber,
      userId: app.userId,
      orderId: app.orderId,
      status: app.status,
      subtotal: app.subtotal,
      taxAmount: app.taxAmount,
      total: app.total,
      currency: app.currency,
      issuedAt: app.issuedAt,
      dueAt: app.dueAt,
      paidAt: app.paidAt,
      voidedAt: app.voidedAt,
      refundedAt: app.refundedAt,
      notes: app.notes,
      createdAt: app.createdAt,
      updatedAt: app.updatedAt,
    };
  }

  static toSummaryHttp(app: InvoiceSummaryResponseDTO): InvoiceSummaryHttpResponseDTO {
    return {
      id: app.id,
      invoiceNumber: app.invoiceNumber,
      status: app.status,
      total: app.total,
      currency: app.currency,
      dueAt: app.dueAt,
    };
  }

  static toListHttp(app: InvoiceListResponseDTO): InvoiceListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
    };
  }

  static toStatsHttp(app: InvoiceStatsResponseDTO): InvoiceStatsHttpResponseDTO {
    return {
      total: app.total,
      totalAmount: app.totalAmount,
      outstandingAmount: app.outstandingAmount,
      currency: app.currency,
      byStatus: app.byStatus,
    };
  }
}
