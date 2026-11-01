/**
 * InsuranceControllerMapper — HTTP DTO ↔ App DTO
 */
import type {
  CreateInsuranceHttpDTO,
  SubmitClaimHttpDTO,
  ReviewClaimHttpDTO,
  ApproveClaimHttpDTO,
  RejectClaimHttpDTO,
  PayClaimHttpDTO,
  InsuranceReasonHttpDTO,
  ListInsurancesHttpQueryDTO,
} from '../dtos/requests/insurance/insurance.request.dto.js';
import type { CreateInsuranceRequestDTO } from '@application/dtos/requests/insurance/create-insurance.dto.js';
import type {
  InsuranceResponseDTO,
  InsuranceSummaryResponseDTO,
  InsuranceListResponseDTO,
  InsuranceStatsResponseDTO,
} from '@application/dtos/responses/insurance/index.js';
import type {
  InsuranceHttpResponseDTO,
  InsuranceSummaryHttpResponseDTO,
  InsuranceListHttpResponseDTO,
  InsuranceStatsHttpResponseDTO,
} from '../dtos/responses/insurance/insurance.response.dto.js';

export class InsuranceControllerMapper {
  static toCreateAppDto(http: CreateInsuranceHttpDTO): CreateInsuranceRequestDTO {
    return {
      shipmentId: http.shipmentId,
      orderId: http.orderId,
      userId: http.userId,
      type: http.type as CreateInsuranceRequestDTO['type'],
      coverages: http.coverages as unknown as CreateInsuranceRequestDTO['coverages'],
      declaredValue: http.declaredValue,
      currency: http.currency,
      startsAt: http.startsAt,
      expiresAt: http.expiresAt,
      provider: http.provider,
      notes: http.notes,
    };
  }

  static toSubmitClaimAppDto(insuranceId: string, http: SubmitClaimHttpDTO): Record<string, unknown> {
    return {
      insuranceId,
      claimId: http.claimId,
      claimNumber: http.claimNumber,
      reason: http.reason,
      description: http.description,
      images: http.images,
      amount: http.amount,
    };
  }

  static toReviewClaimAppDto(insuranceId: string, http: ReviewClaimHttpDTO): Record<string, unknown> {
    return { insuranceId, claimId: http.claimId };
  }

  static toApproveClaimAppDto(insuranceId: string, http: ApproveClaimHttpDTO): Record<string, unknown> {
    return { insuranceId, claimId: http.claimId, approvedAmount: http.approvedAmount };
  }

  static toRejectClaimAppDto(insuranceId: string, http: RejectClaimHttpDTO): Record<string, unknown> {
    return { insuranceId, claimId: http.claimId, reason: http.reason };
  }

  static toPayClaimAppDto(insuranceId: string, http: PayClaimHttpDTO): Record<string, unknown> {
    return { insuranceId, claimId: http.claimId };
  }

  static toReasonAppDto(insuranceId: string, http: InsuranceReasonHttpDTO): Record<string, unknown> {
    return { insuranceId, reason: http.reason };
  }

  static toListOptions(http: ListInsurancesHttpQueryDTO): Record<string, unknown> {
    return {
      page: Number(http.page ?? 1),
      limit: Number(http.limit ?? 20),
      filter: {
        status: http.status,
        type: http.type,
        userId: http.userId,
        shipmentId: http.shipmentId,
      },
    };
  }

  static toHttpResponse(app: InsuranceResponseDTO): InsuranceHttpResponseDTO {
    return {
      ...app,
      status: typeof app.status === 'string' ? app.status : String(app.status),
      type: typeof app.type === 'string' ? app.type : String(app.type),
      coverages: app.coverages.map((c) => (typeof c === 'string' ? c : String(c))),
    } as unknown as InsuranceHttpResponseDTO;
  }

  static toSummaryHttp(app: InsuranceSummaryResponseDTO): InsuranceSummaryHttpResponseDTO {
    return {
      ...app,
      status: typeof app.status === 'string' ? app.status : String(app.status),
      type: typeof app.type === 'string' ? app.type : String(app.type),
    } as unknown as InsuranceSummaryHttpResponseDTO;
  }

  static toListHttp(app: InsuranceListResponseDTO): InsuranceListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
    };
  }

  static toStatsHttp(app: InsuranceStatsResponseDTO): InsuranceStatsHttpResponseDTO {
    return app as unknown as InsuranceStatsHttpResponseDTO;
  }
}
