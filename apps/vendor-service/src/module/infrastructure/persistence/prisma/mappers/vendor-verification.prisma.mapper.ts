/**
 * VendorVerificationPrismaMapper — row ↔ domain entity
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 *
 * Note: vendor_verifications table has a single row per vendor with
 * `checks` JSON array. This mapper treats it as a single verification
 * record whose `type` is derived from the JSON.
 */
import { VendorVerificationEntity } from '../../../../domain/entities/vendor-verification.entity.js';
import { VendorVerificationVO } from '../../../../domain/value-objects/composites/vendor-verification.vo.js';
import { VerificationIdVO } from '../../../../domain/value-objects/primitives/verification-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { VerificationStatusVO } from '../../../../domain/value-objects/primitives/verification-status.vo.js';

export interface VendorVerificationPrismaRow {
  id: string;
  vendorId: string;
  overallStatus: string;
  checks: unknown;
  submittedAt: Date | null;
  reviewedAt: Date | null;
  reviewedBy: string | null;
  rejectionReason: string | null;
  expiresAt: Date | null;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const toIso = (d: Date | null): string | undefined =>
  d ? new Date(d).toISOString() : undefined;

export class VendorVerificationPrismaMapper {
  static toDomain(raw: VendorVerificationPrismaRow): VendorVerificationEntity {
    const checks = Array.isArray(raw.checks) ? raw.checks : [];
    const firstCheck = (checks[0] as { type?: string } | undefined) ?? {};
    const derivedType = (firstCheck.type ?? 'identity') as string;

    const vo = VendorVerificationVO.reconstitute({
      id: VerificationIdVO.reconstitute(raw.id),
      vendorId: VendorIdVO.reconstitute(raw.vendorId),
      type: derivedType as never,
      status: VerificationStatusVO.reconstitute(raw.overallStatus),
      submittedAt: toIso(raw.submittedAt) ?? new Date(raw.createdAt).toISOString(),
      reviewedAt: toIso(raw.reviewedAt),
      reviewedBy: raw.reviewedBy ?? undefined,
      expiresAt: toIso(raw.expiresAt),
      rejectionReason: raw.rejectionReason ?? undefined,
      attempts: 1,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
    });

    return VendorVerificationEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      props: { vo },
    });
  }

  static toPersistence(entity: VendorVerificationEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      vendorId: vo.vendorId.value,
      overallStatus: vo.status.value,
      checks: [{ type: vo.type, status: vo.status.value }],
      submittedAt: new Date(vo.submittedAt),
      reviewedAt: vo.reviewedAt ? new Date(vo.reviewedAt) : null,
      reviewedBy: vo.reviewedBy ?? null,
      rejectionReason: vo.rejectionReason ?? null,
      expiresAt: vo.expiresAt ? new Date(vo.expiresAt) : null,
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
