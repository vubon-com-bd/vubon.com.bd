/**
 * User KYC Prisma Mapper
 * @module identity-service/infrastructure/persistence/prisma/mappers
 */
import { UserKycEntity } from '../../../../domain/entities/user-kyc.entity.js';
import { KycIdVO } from '../../../../domain/value-objects/primitives/kyc-id.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { KycStatusVO } from '../../../../domain/value-objects/primitives/kyc-status.vo.js';

export interface PrismaUserKycRow {
  id: string;
  userId: string;
  type: string;
  documentType: string;
  documentNumber: string;
  frontUrl: string;
  backUrl: string | null;
  selfieUrl: string | null;
  status: string;
  rejectionReason: string | null;
  submittedAt: Date | null;
  verifiedAt: Date | null;
  rejectedAt: Date | null;
  reviewedBy: string | null;
  expiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class UserKycPrismaMapper {
  static toDomain(raw: PrismaUserKycRow): UserKycEntity {
    return UserKycEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      version: 1,
      props: {
        userId: UserIdVO.reconstitute(raw.userId),
        status: this.parseStatus(raw.status),
        documents: [
          {
            type: { value: raw.documentType } as never,
            number: raw.documentNumber,
            frontUrl: raw.frontUrl,
            backUrl: raw.backUrl ?? undefined,
            selfieUrl: raw.selfieUrl ?? undefined,
            verified: raw.status === 'verified',
          },
        ],
        submittedAt: raw.submittedAt
          ? new Date(raw.submittedAt).toISOString()
          : undefined,
        verifiedAt: raw.verifiedAt
          ? new Date(raw.verifiedAt).toISOString()
          : undefined,
        rejectedAt: raw.rejectedAt
          ? new Date(raw.rejectedAt).toISOString()
          : undefined,
        rejectionReason: raw.rejectionReason ?? undefined,
        reviewedBy: raw.reviewedBy ?? undefined,
        expiresAt: raw.expiresAt
          ? new Date(raw.expiresAt).toISOString()
          : undefined,
      },
    });
  }

  static toPersistence(entity: UserKycEntity): Record<string, unknown> {
    const firstDoc = entity.documents[0];

    return {
      id: entity.id,
      userId: entity.userId.value,
      type: 'identity',
      documentType: firstDoc?.type.value ?? 'unknown',
      documentNumber: firstDoc?.number ?? '',
      frontUrl: firstDoc?.frontUrl ?? '',
      backUrl: firstDoc?.backUrl ?? null,
      selfieUrl: firstDoc?.selfieUrl ?? null,
      status: entity.status.value,
      rejectionReason: entity.rejectionReason ?? null,
      submittedAt: entity.submittedAt ? new Date(entity.submittedAt) : null,
      verifiedAt: entity.verifiedAt ? new Date(entity.verifiedAt) : null,
      rejectedAt: entity.rejectedAt ? new Date(entity.rejectedAt) : null,
      reviewedBy: entity.reviewedBy ?? null,
      expiresAt: entity.expiresAt ? new Date(entity.expiresAt) : null,
      updatedAt: new Date(entity.updatedAt),
    };
  }

  private static parseStatus(v: string): KycStatusVO {
    try { return KycStatusVO.reconstitute(v); } catch { return KycStatusVO.pending(); }
  }
}
