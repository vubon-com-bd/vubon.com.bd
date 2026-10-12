import type {
  PurchaseInsuranceRequestDTO, FileClaimRequestDTO, StartClaimReviewRequestDTO,
  ApproveClaimRequestDTO, RejectClaimRequestDTO, PayClaimRequestDTO, AppealClaimRequestDTO,
  ActivateInsuranceRequestDTO, ExpireInsuranceRequestDTO, CancelInsuranceRequestDTO,
} from '../../application/dtos/requests/insurance/insurance.dto.js';
import type { InsuranceListOptionsDTO } from '../../application/services/interfaces/insurance.service.interface.js';
import type {
  PurchaseInsuranceHttpDTO, FileClaimHttpDTO, ApproveClaimHttpDTO,
  RejectClaimHttpDTO, InsuranceReasonHttpDTO, ListInsurancesHttpQueryDTO,
} from '../dtos/requests/insurance.request.dto.js';
import type {
  InsuranceTypeValue, InsuranceCoverageValue, InsuranceStatusValue,
} from '@vubon/shared-types/logistics';

export class InsuranceControllerMapper {
  static toPurchaseDto(dto: PurchaseInsuranceHttpDTO): PurchaseInsuranceRequestDTO {
    return {
      shipmentId: dto.shipmentId, orderId: dto.orderId, userId: dto.userId,
      type: dto.type as InsuranceTypeValue,
      coverages: dto.coverages as InsuranceCoverageValue[],
      declaredValue: dto.declaredValue, currency: dto.currency,
      startsAt: dto.startsAt, expiresAt: dto.expiresAt,
    };
  }
  static toActivateDto(id: string): ActivateInsuranceRequestDTO { return { insuranceId: id }; }
  static toExpireDto(id: string): ExpireInsuranceRequestDTO { return { insuranceId: id }; }
  static toCancelDto(id: string, dto: InsuranceReasonHttpDTO): CancelInsuranceRequestDTO {
    return { insuranceId: id, reason: dto.reason };
  }
  static toFileClaimDto(id: string, dto: FileClaimHttpDTO): FileClaimRequestDTO {
    return { insuranceId: id, ...dto };
  }
  static toStartReviewDto(id: string): StartClaimReviewRequestDTO { return { insuranceId: id }; }
  static toApproveClaimDto(id: string, dto: ApproveClaimHttpDTO): ApproveClaimRequestDTO {
    return { insuranceId: id, approvedAmount: dto.approvedAmount };
  }
  static toRejectClaimDto(id: string, dto: RejectClaimHttpDTO): RejectClaimRequestDTO {
    return { insuranceId: id, reason: dto.reason };
  }
  static toPayClaimDto(id: string): PayClaimRequestDTO { return { insuranceId: id }; }
  static toAppealDto(id: string, dto: InsuranceReasonHttpDTO): AppealClaimRequestDTO {
    return { insuranceId: id, reason: dto.reason };
  }
  static toListOptions(q: ListInsurancesHttpQueryDTO): InsuranceListOptionsDTO {
    return {
      page: q.page ?? 1, limit: q.limit ?? 20,
      filter: {
        shipmentId: q.shipmentId, orderId: q.orderId, userId: q.userId,
        status: q.status ? (q.status as InsuranceStatusValue) : undefined,
        type: q.type ? (q.type as InsuranceTypeValue) : undefined,
      },
    };
  }
}
