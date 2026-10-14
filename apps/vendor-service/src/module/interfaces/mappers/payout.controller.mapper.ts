/**
 * PayoutControllerMapper — HTTP ↔ Application DTO
 * @module vendor-service/interfaces/mappers
 */
import type {
  RequestPayoutHttpDTO,
  ApprovePayoutHttpDTO,
  RejectPayoutHttpDTO,
  ProcessPayoutHttpDTO,
} from '../dtos/requests/payout.request.dto.js';
import type {
  RequestPayoutCommandDTO,
  ApprovePayoutRequestDTO,
  RejectPayoutRequestDTO,
  ProcessPayoutRequestDTO,
} from '../../application/dtos/requests/payout/index.js';
import type {
  PayoutResponseDTO,
  PayoutPublicResponseDTO,
  PayoutSummaryResponseDTO,
  PayoutListResponseDTO,
  PayoutStatsResponseDTO,
} from '../../application/dtos/responses/payout-response.dto.js';
import type {
  PayoutHttpResponseDTO,
  PayoutPublicHttpResponseDTO,
  PayoutSummaryHttpResponseDTO,
  PayoutListHttpResponseDTO,
  PayoutStatsHttpResponseDTO,
} from '../dtos/responses/payout.response.dto.js';

export class PayoutControllerMapper {
  static toRequestAppDto(dto: RequestPayoutHttpDTO): RequestPayoutCommandDTO {
    return {
      vendorId: dto.vendorId,
      amount: dto.amount,
      method: dto.method as never,
      bankAccountId: dto.bankAccountId,
      notes: dto.notes,
    };
  }

  static toApproveAppDto(dto: ApprovePayoutHttpDTO): ApprovePayoutRequestDTO {
    return { payoutId: '', notes: dto.notes };
  }

  static toRejectAppDto(dto: RejectPayoutHttpDTO): RejectPayoutRequestDTO {
    return { payoutId: '', reason: dto.reason };
  }

  static toProcessAppDto(dto: ProcessPayoutHttpDTO): ProcessPayoutRequestDTO {
    return { payoutId: '', transactionId: dto.transactionId, notes: dto.notes };
  }

  static toHttpResponse(app: PayoutResponseDTO): PayoutHttpResponseDTO {
    return { ...app };
  }

  static toPublicHttp(app: PayoutPublicResponseDTO): PayoutPublicHttpResponseDTO {
    return { ...app };
  }

  static toSummaryHttp(app: PayoutSummaryResponseDTO): PayoutSummaryHttpResponseDTO {
    return { ...app };
  }

  static toListHttp(app: PayoutListResponseDTO): PayoutListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
    };
  }

  static toStatsHttp(app: PayoutStatsResponseDTO): PayoutStatsHttpResponseDTO {
    return { ...app };
  }
}
