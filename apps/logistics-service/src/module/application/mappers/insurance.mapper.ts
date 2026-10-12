import type { InsuranceEntity } from '../../domain/entities/insurance.entity.js';
import type {
  InsuranceResponseDTO, InsuranceListResponseDTO, InsuranceClaimResponseDTO,
} from '../dtos/responses/insurance/insurance-response.dto.js';
import type {
  InsuranceTypeValue, InsuranceStatusValue, InsuranceCoverageValue, InsuranceClaimStatusValue,
} from '@vubon/shared-types/logistics';
export class InsuranceMapper {
  static toResponse(e: InsuranceEntity): InsuranceResponseDTO {
    const claim: InsuranceClaimResponseDTO | undefined = e.claim
      ? {
          id: e.claim.id,
          claimNumber: e.claim.claimNumber,
          status: e.claim.status.value as InsuranceClaimStatusValue,
          reason: e.claim.reason.value,
          description: e.claim.description?.value,
          images: e.claim.images as unknown as readonly string[],
          amount: e.claim.amount,
          currency: e.claim.currency,
          approvedAmount: e.claim.approvedAmount,
          submittedAt: e.claim.submittedAt,
          reviewedAt: e.claim.reviewedAt,
          approvedAt: e.claim.approvedAt,
          rejectedAt: e.claim.rejectedAt,
          rejectionReason: e.claim.rejectionReason,
          paidAt: e.claim.paidAt,
        }
      : undefined;
    return {
      id: e.id,
      policyNumber: e.policyNumber.value,
      shipmentId: e.shipmentId?.value,
      orderId: e.orderId?.value,
      userId: e.userId?.value,
      status: e.status.value as InsuranceStatusValue,
      type: e.type.value as InsuranceTypeValue,
      coverages: e.coverages.map((c) => c.value as InsuranceCoverageValue),
      declaredValue: e.declaredValue.amount,
      premium: e.premium.amount,
      currency: e.declaredValue.currency,
      startsAt: e.startsAt,
      expiresAt: e.expiresAt,
      isClaimed: e.isClaimed,
      claim,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }
  static toListResponse(items: readonly InsuranceEntity[], total: number, page: number, limit: number): InsuranceListResponseDTO {
    return { items: items.map((e) => this.toResponse(e)), total, page, limit, totalPages: Math.ceil(total / limit) };
  }
}
