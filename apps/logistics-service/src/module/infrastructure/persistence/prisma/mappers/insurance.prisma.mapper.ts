import { InsuranceEntity } from '@domain/entities/insurance.entity';
import { InsuranceTypeVO } from '@domain/value-objects/primitives/insurance-type.vo';
import { InsuranceStatusVO } from '@domain/value-objects/primitives/insurance-status.vo';

const toNum = (v: unknown): number | undefined => {
  if (v === null || v === undefined) return undefined;
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (typeof v === 'object' && 'toNumber' in v) return (v as { toNumber: () => number }).toNumber();
  return Number(v);
};
const toIso = (d: Date | null | undefined): string | undefined => d ? new Date(d).toISOString() : undefined;

export interface LogisticsInsuranceRow {
  id: string; policyNumber: string; shipmentId: string | null; orderId: string | null; userId: string | null;
  status: string; type: string; coverages: string[];
  declaredValue: unknown; premium: unknown; currency: string;
  startsAt: Date; expiresAt: Date; isClaimed: boolean;
  claimId: string | null; claimNumber: string | null; claimStatus: string | null;
  claimReason: string | null; claimDescription: string | null; claimImages: string[];
  claimAmount: unknown; claimApprovedAmount: unknown;
  claimSubmittedAt: Date | null; claimReviewedAt: Date | null;
  claimApprovedAt: Date | null; claimRejectedAt: Date | null;
  claimRejectionReason: string | null; claimPaidAt: Date | null;
  version: number; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  activatedAt: Date | null; expiredAt: Date | null; cancelledAt: Date | null;
  cancelReason: string | null; provider: string | null; notes: string | null;
  metadata: unknown; claims: unknown; claimState: unknown;
}

export class InsurancePrismaMapper {
  static toDomain(raw: LogisticsInsuranceRow): InsuranceEntity {
    return InsuranceEntity.reconstitute({
      id: raw.id, createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        policyNumber: raw.policyNumber, shipmentId: raw.shipmentId ?? undefined,
        orderId: raw.orderId ?? undefined, userId: raw.userId ?? undefined,
        status: InsuranceStatusVO.reconstitute(raw.status),
        type: InsuranceTypeVO.reconstitute(raw.type),
        coverages: raw.coverages as never,
        declaredValue: toNum(raw.declaredValue) ?? 0, premium: toNum(raw.premium) ?? 0,
        currency: raw.currency,
        startsAt: new Date(raw.startsAt).toISOString(),
        expiresAt: new Date(raw.expiresAt).toISOString(),
        isClaimed: raw.isClaimed, provider: raw.provider ?? undefined,
        notes: raw.notes ?? undefined,
        claims: (raw.claims as unknown[] ?? []) as never,
        activatedAt: toIso(raw.activatedAt), expiredAt: toIso(raw.expiredAt),
        cancelledAt: toIso(raw.cancelledAt), cancelReason: raw.cancelReason ?? undefined,
        metadata: raw.metadata as Readonly<Record<string, unknown>> | undefined,
      },
    });
  }
  static toPersistence(entity: InsuranceEntity): Record<string, unknown> {
    return {
      id: entity.id, policyNumber: entity.policyNumber,
      shipmentId: entity.shipmentId ?? null, orderId: entity.orderId ?? null,
      userId: entity.userId ?? null, status: entity.status.value, type: entity.type.value,
      coverages: entity.coverages as unknown as string[],
      declaredValue: entity.declaredValue, premium: entity.premium, currency: entity.currency,
      startsAt: new Date(entity.startsAt), expiresAt: new Date(entity.expiresAt),
      isClaimed: entity.isClaimed, provider: entity.provider ?? null,
      notes: entity.notes ?? null, claims: entity.claims as unknown,
      activatedAt: entity.activatedAt ? new Date(entity.activatedAt) : null,
      expiredAt: entity.expiredAt ? new Date(entity.expiredAt) : null,
      cancelledAt: entity.cancelledAt ? new Date(entity.cancelledAt) : null,
      cancelReason: entity.cancelReason ?? null, metadata: entity.metadata ?? null,
      version: entity.version, updatedAt: new Date(entity.updatedAt),
    };
  }
}
