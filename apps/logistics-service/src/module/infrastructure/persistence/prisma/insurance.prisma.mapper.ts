import { InsuranceEntity, type InsuranceClaimProps } from '../../../domain/entities/insurance.entity.js';
import { InsuranceIdVO } from '../../../domain/value-objects/primitives/insurance-id.vo.js';
import { PolicyNumberVO } from '../../../domain/value-objects/primitives/policy-number.vo.js';
import { ShipmentIdVO } from '../../../domain/value-objects/primitives/shipment-id.vo.js';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import { InsuranceStatusVO } from '../../../domain/value-objects/primitives/insurance-status.vo.js';
import { InsuranceTypeVO } from '../../../domain/value-objects/primitives/insurance-type.vo.js';
import { InsuranceCoverageVO } from '../../../domain/value-objects/primitives/insurance-coverage.vo.js';
import { InsuranceClaimStatusVO } from '../../../domain/value-objects/primitives/insurance-claim-status.vo.js';
import { DeclaredValueVO } from '../../../domain/value-objects/primitives/declared-value.vo.js';
import { InsurancePremiumVO } from '../../../domain/value-objects/primitives/insurance-premium.vo.js';
import { ReasonTextVO } from '../../../domain/value-objects/primitives/reason-text.vo.js';
import { DescriptionTextVO } from '../../../domain/value-objects/primitives/description-text.vo.js';
import type { Url } from '@vubon/shared-types/common';

export interface PrismaInsuranceRow {
  id: string; policyNumber: string;
  shipmentId: string | null; orderId: string | null; userId: string | null;
  status: string; type: string; coverages: string[];
  declaredValue: unknown; premium: unknown; currency: string;
  startsAt: Date; expiresAt: Date; isClaimed: boolean;
  claimId: string | null; claimNumber: string | null; claimStatus: string | null;
  claimReason: string | null; claimDescription: string | null; claimImages: string[];
  claimAmount: unknown; claimApprovedAmount: unknown;
  claimSubmittedAt: Date | null; claimReviewedAt: Date | null; claimApprovedAt: Date | null;
  claimRejectedAt: Date | null; claimRejectionReason: string | null; claimPaidAt: Date | null;
  version: number; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
}

const toNum = (v: unknown): number => {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (v && typeof v === 'object' && 'toNumber' in v && typeof (v as { toNumber: () => number }).toNumber === 'function') {
    return (v as { toNumber: () => number }).toNumber();
  }
  return Number(v);
};
const toIso = (d: Date | null): string | undefined => d ? new Date(d).toISOString() : undefined;

export class InsurancePrismaMapper {
  static toDomain(raw: PrismaInsuranceRow): InsuranceEntity {
    const claim: InsuranceClaimProps | undefined = raw.claimId && raw.claimNumber && raw.claimStatus && raw.claimReason && raw.claimSubmittedAt
      ? {
          id: raw.claimId,
          claimNumber: raw.claimNumber,
          status: InsuranceClaimStatusVO.reconstitute(raw.claimStatus),
          reason: ReasonTextVO.reconstitute(raw.claimReason),
          description: raw.claimDescription ? DescriptionTextVO.reconstitute(raw.claimDescription) : undefined,
          images: raw.claimImages.map((u) => u as Url),
          amount: toNum(raw.claimAmount),
          currency: raw.currency,
          approvedAmount: raw.claimApprovedAmount !== null ? toNum(raw.claimApprovedAmount) : undefined,
          submittedAt: new Date(raw.claimSubmittedAt).toISOString(),
          reviewedAt: toIso(raw.claimReviewedAt),
          approvedAt: toIso(raw.claimApprovedAt),
          rejectedAt: toIso(raw.claimRejectedAt),
          rejectionReason: raw.claimRejectionReason ?? undefined,
          paidAt: toIso(raw.claimPaidAt),
        }
      : undefined;

    return InsuranceEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        policyNumber: PolicyNumberVO.reconstitute(raw.policyNumber),
        shipmentId: raw.shipmentId ? ShipmentIdVO.reconstitute(raw.shipmentId) : undefined,
        orderId: raw.orderId ? OrderIdVO.reconstitute(raw.orderId) : undefined,
        userId: raw.userId ? UserIdVO.reconstitute(raw.userId) : undefined,
        status: InsuranceStatusVO.reconstitute(raw.status),
        type: InsuranceTypeVO.reconstitute(raw.type),
        coverages: raw.coverages.map((c) => InsuranceCoverageVO.reconstitute(c)),
        declaredValue: DeclaredValueVO.reconstitute(toNum(raw.declaredValue), raw.currency),
        premium: InsurancePremiumVO.reconstitute(toNum(raw.premium), raw.currency),
        startsAt: new Date(raw.startsAt).toISOString(),
        expiresAt: new Date(raw.expiresAt).toISOString(),
        isClaimed: raw.isClaimed,
        claim,
      },
    });
  }

  static toPersistence(entity: InsuranceEntity): Record<string, unknown> {
    const claim = entity.claim;
    return {
      id: entity.id,
      policyNumber: entity.policyNumber.value,
      shipmentId: entity.shipmentId?.value ?? null,
      orderId: entity.orderId?.value ?? null,
      userId: entity.userId?.value ?? null,
      status: entity.status.value,
      type: entity.type.value,
      coverages: entity.coverages.map((c) => c.value),
      declaredValue: entity.declaredValue.amount,
      premium: entity.premium.amount,
      currency: entity.declaredValue.currency,
      startsAt: new Date(entity.startsAt),
      expiresAt: new Date(entity.expiresAt),
      isClaimed: entity.isClaimed,
      claimId: claim?.id ?? null,
      claimNumber: claim?.claimNumber ?? null,
      claimStatus: claim?.status.value ?? null,
      claimReason: claim?.reason.value ?? null,
      claimDescription: claim?.description?.value ?? null,
      claimImages: claim ? [...claim.images] : [],
      claimAmount: claim?.amount ?? null,
      claimApprovedAmount: claim?.approvedAmount ?? null,
      claimSubmittedAt: claim?.submittedAt ? new Date(claim.submittedAt) : null,
      claimReviewedAt: claim?.reviewedAt ? new Date(claim.reviewedAt) : null,
      claimApprovedAt: claim?.approvedAt ? new Date(claim.approvedAt) : null,
      claimRejectedAt: claim?.rejectedAt ? new Date(claim.rejectedAt) : null,
      claimRejectionReason: claim?.rejectionReason ?? null,
      claimPaidAt: claim?.paidAt ? new Date(claim.paidAt) : null,
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
