/**
 * VendorVerificationPrismaMapper
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import type { VendorVerification as PrismaVendorVerification } from '@prisma/client';
import { VendorVerificationEntity } from '../../../../domain/entities/vendor-verification.entity.js';
import type { VerificationCheckProps } from '../../../../domain/entities/vendor-verification.entity.js';
import { VerificationStatusVO } from '../../../../domain/value-objects/primitives/verification-status.vo.js';
import { VerificationTypeVO } from '../../../../domain/value-objects/primitives/verification-type.vo.js';

interface RawCheck {
  type: string;
  status: string;
  verifiedAt?: string;
  expiresAt?: string;
  verifiedBy?: string;
  rejectionReason?: string;
}

export class VendorVerificationPrismaMapper {
  static toDomain(row: PrismaVendorVerification): VendorVerificationEntity {
    const rawChecks = (row.checks as unknown as RawCheck[]) ?? [];
    const checks: VerificationCheckProps[] = rawChecks.map((c) => ({
      type: VerificationTypeVO.create(c.type),
      status: VerificationStatusVO.create(c.status),
      verifiedAt: c.verifiedAt,
      expiresAt: c.expiresAt,
      verifiedBy: c.verifiedBy,
      rejectionReason: c.rejectionReason,
    }));

    return VendorVerificationEntity.reconstitute({
      id: row.id,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      deletedAt: row.deletedAt?.toISOString() ?? null,
      version: row.version,
      props: {
        vendorId: row.vendorId,
        overallStatus: VerificationStatusVO.create(row.overallStatus),
        checks,
        submittedAt: row.submittedAt?.toISOString(),
        reviewedAt: row.reviewedAt?.toISOString(),
        reviewedBy: row.reviewedBy ?? undefined,
        rejectionReason: row.rejectionReason ?? undefined,
        expiresAt: row.expiresAt?.toISOString(),
      },
    });
  }

  static toPersistence(entity: VendorVerificationEntity): Record<string, unknown> {
    const checks: RawCheck[] = entity.checks.map((c) => ({
      type: c.type.value,
      status: c.status.value,
      verifiedAt: c.verifiedAt,
      expiresAt: c.expiresAt,
      verifiedBy: c.verifiedBy,
      rejectionReason: c.rejectionReason,
    }));
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      overallStatus: entity.overallStatus.value,
      checks,
      submittedAt: entity.submittedAt ? new Date(entity.submittedAt) : null,
      reviewedAt: entity.reviewedAt ? new Date(entity.reviewedAt) : null,
      reviewedBy: entity.reviewedBy,
      expiresAt: entity.expiresAt ? new Date(entity.expiresAt) : null,
      createdAt: new Date(entity.createdAt),
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
