/**
 * PaymentControllerMapper — HTTP DTO ↔ Application DTO
 * @module payment-service/interfaces/mappers
 */
import type {
  InitiatePaymentHttpDTO,
  ListPaymentsHttpQueryDTO,
} from '@interfaces/dtos/requests/payment.request.dto';
import type {
  InitiatePaymentRequestDTO,
} from '@application/dtos/requests/payment/index';
import type {
  PaymentListOptionsDTO,
} from '@application/services/interfaces/payment.service.interface';
import type {
  PaymentResponseDTO,
  PaymentPublicResponseDTO,
  PaymentSummaryResponseDTO,
  PaymentListResponseDTO,
  PaymentStatsResponseDTO,
} from '@application/dtos/responses/payment-response.dto';
import {
  PaymentHttpResponseDTO,
  PaymentPublicHttpResponseDTO,
  PaymentSummaryHttpResponseDTO,
  PaymentListHttpResponseDTO,
  PaymentStatsHttpResponseDTO,
} from '@interfaces/dtos/responses/payment.response.dto';

export class PaymentControllerMapper {
  // ═══ HTTP → App ═══
  static toInitiateAppDto(dto: InitiatePaymentHttpDTO): InitiatePaymentRequestDTO {
    return {
      orderId: dto.orderId,
      method: dto.method,
      gateway: dto.gateway,
      amount: dto.amount,
      currency: dto.currency,
      returnUrl: dto.returnUrl,
      metadata: dto.metadata,
    };
  }

  static toListOptions(q: ListPaymentsHttpQueryDTO): PaymentListOptionsDTO {
    return {
      page: q.page ?? 1,
      limit: q.limit ?? 20,
      sortBy: 'createdAt',
      sortDir: 'desc',
      filter: {
        orderId: q.orderId,
        userId: q.userId,
        status: q.status as never,
        method: q.method,
        gateway: q.gateway,
        fromDate: q.fromDate,
        toDate: q.toDate,
      },
    };
  }

  // ═══ App → HTTP ═══
  static toHttpResponse(app: PaymentResponseDTO): PaymentHttpResponseDTO {
    return {
      id: app.id,
      orderId: app.orderId,
      userId: app.userId,
      status: app.status as unknown as string,
      method: app.method,
      gateway: app.gateway,
      amount: app.amount,
      currency: app.currency,
      gatewayReference: app.gatewayReference,
      refundedAmount: app.refundedAmount,
      failureReason: app.failureReason,
      failureCode: app.failureCode,
      authorizedAt: app.authorizedAt,
      capturedAt: app.capturedAt,
      paidAt: app.paidAt,
      metadata: app.metadata,
      createdAt: app.createdAt,
      updatedAt: app.updatedAt,
    };
  }

  static toPublicHttpResponse(app: PaymentPublicResponseDTO): PaymentPublicHttpResponseDTO {
    return {
      id: app.id,
      orderId: app.orderId,
      status: app.status as unknown as string,
      method: app.method,
      amount: app.amount,
      currency: app.currency,
      refundedAmount: app.refundedAmount,
      createdAt: app.createdAt,
      capturedAt: app.capturedAt,
    };
  }

  static toSummaryHttp(app: PaymentSummaryResponseDTO): PaymentSummaryHttpResponseDTO {
    return {
      id: app.id,
      orderId: app.orderId,
      status: app.status as unknown as string,
      amount: app.amount,
      currency: app.currency,
      createdAt: app.createdAt,
    };
  }

  static toListHttp(app: PaymentListResponseDTO): PaymentListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
    };
  }

  static toStatsHttp(app: PaymentStatsResponseDTO): PaymentStatsHttpResponseDTO {
    return {
      total: app.total,
      totalAmount: app.totalAmount,
      averageAmount: app.averageAmount,
      currency: app.currency,
      byStatus: app.byStatus,
      byMethod: app.byMethod,
    };
  }
}
