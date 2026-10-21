/**
 * RefundControllerMapper — HTTP DTO ↔ Application DTO
 * @module payment-service/interfaces/mappers
 */
import type {
  RequestRefundHttpDTO,
  ListRefundsHttpQueryDTO,
} from '@interfaces/dtos/requests/refund.request.dto';
import type {
  RequestRefundRequestDTO,
} from '@application/dtos/requests/refund/index';
import type {
  RefundListOptionsDTO,
} from '@application/services/interfaces/refund.service.interface';
import type {
  RefundResponseDTO,
  RefundSummaryResponseDTO,
  RefundListResponseDTO,
  RefundStatsResponseDTO,
} from '@application/dtos/responses/refund-response.dto';
import {
  RefundHttpResponseDTO,
  RefundSummaryHttpResponseDTO,
  RefundListHttpResponseDTO,
  RefundStatsHttpResponseDTO,
} from '@interfaces/dtos/responses/refund.response.dto';

export class RefundControllerMapper {
  static toRequestAppDto(
    paymentId: string,
    dto: RequestRefundHttpDTO,
  ): RequestRefundRequestDTO {
    return {
      paymentId,
      amount: dto.amount,
      reason: dto.note ?? dto.reason,
    };
  }

  static toListOptions(q: ListRefundsHttpQueryDTO): RefundListOptionsDTO {
    return {
      page: q.page ?? 1,
      limit: q.limit ?? 20,
      sortBy: 'createdAt',
      sortDir: 'desc',
      filter: {
        paymentId: q.paymentId,
        status: q.status,
        fromDate: q.fromDate,
        toDate: q.toDate,
      },
    };
  }

  static toHttpResponse(app: RefundResponseDTO): RefundHttpResponseDTO {
    return {
      id: app.id,
      paymentId: app.paymentId,
      status: app.status,
      amount: app.amount,
      currency: app.currency,
      reason: app.reason,
      note: app.note,
      approvedBy: app.approvedBy,
      completedAt: app.completedAt,
      failureReason: app.failureReason,
      createdAt: app.createdAt,
      updatedAt: app.updatedAt,
    };
  }

  static toSummaryHttp(app: RefundSummaryResponseDTO): RefundSummaryHttpResponseDTO {
    return {
      id: app.id,
      status: app.status,
      amount: app.amount,
      currency: app.currency,
      createdAt: app.createdAt,
    };
  }

  static toListHttp(app: RefundListResponseDTO): RefundListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
    };
  }

  static toStatsHttp(app: RefundStatsResponseDTO): RefundStatsHttpResponseDTO {
    return {
      total: app.total,
      totalRefunded: app.totalRefunded,
      currency: app.currency,
      byStatus: app.byStatus,
      byReason: app.byReason,
    };
  }
}
