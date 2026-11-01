/**
 * User Verification Prisma Mapper
 * @module identity-service/infrastructure/persistence/prisma/mappers
 */
import { UserVerificationEntity } from '../../../../domain/entities/user-verification.entity.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { VerificationStatusVO } from '../../../../domain/value-objects/primitives/verification-status.vo.js';

export interface PrismaUserVerificationRow {
  id: string;
  userId: string;
  type: string;
  code: string;
  status: string;
  attempts: number;
  maxAttempts: number;
  expiresAt: Date;
  verifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class UserVerificationPrismaMapper {
  static toDomain(raw: PrismaUserVerificationRow): UserVerificationEntity {
    const emailVerified = raw.type === 'email' && raw.status === 'verified';
    const phoneVerified = raw.type === 'phone' && raw.status === 'verified';

    return UserVerificationEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      version: 1,
      props: {
        userId: UserIdVO.reconstitute(raw.userId),
        emailVerified,
        emailVerifiedAt: emailVerified
          ? new Date(raw.verifiedAt ?? raw.updatedAt).toISOString()
          : undefined,
        phoneVerified,
        phoneVerifiedAt: phoneVerified
          ? new Date(raw.verifiedAt ?? raw.updatedAt).toISOString()
          : undefined,
        identityVerified: false,
        addressVerified: false,
        kycStatus: this.parseStatus(raw.status),
      },
    });
  }

  static toPersistence(entity: UserVerificationEntity): Record<string, unknown> {
    const anyVerified =
      entity.emailVerified || entity.phoneVerified || entity.identityVerified;

    return {
      id: entity.id,
      userId: entity.userId.value,
      type: entity.emailVerified ? 'email' : 'phone',
      code: '',
      status: anyVerified ? 'verified' : entity.kycStatus.value,
      attempts: 0,
      maxAttempts: 5,
      expiresAt: new Date(Date.now() + 3600_000),
      verifiedAt: entity.emailVerifiedAt
        ? new Date(entity.emailVerifiedAt)
        : entity.phoneVerifiedAt
          ? new Date(entity.phoneVerifiedAt)
          : null,
      updatedAt: new Date(entity.updatedAt),
    };
  }

  private static parseStatus(v: string): VerificationStatusVO {
    try { return VerificationStatusVO.reconstitute(v); } catch { return VerificationStatusVO.pending(); }
  }
}
