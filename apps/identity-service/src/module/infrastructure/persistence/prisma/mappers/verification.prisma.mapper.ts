/**
 * Verification Prisma Mapper
 * @module identity-service/infrastructure/persistence/prisma/mappers
 */
import { VerificationEntity } from '../../../../domain/entities/verification.entity.js';
import { AuthIdVO } from '../../../../domain/value-objects/primitives/auth-id.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { VerificationChannelVO } from '../../../../domain/value-objects/primitives/verification-channel.vo.js';
import { VerificationPurposeVO } from '../../../../domain/value-objects/primitives/verification-purpose.vo.js';
import { VerificationStatusVO } from '../../../../domain/value-objects/primitives/verification-status.vo.js';
import { IdentifierVO } from '../../../../domain/value-objects/primitives/identifier.vo.js';

export interface PrismaVerificationRow {
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

export class VerificationPrismaMapper {
  static toDomain(raw: PrismaVerificationRow): VerificationEntity {
    const channel = raw.type === 'phone' ? 'sms' : 'email';
    const purpose = raw.type === 'email' ? 'email_verify' : 'phone_verify';

    return VerificationEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      version: 1,
      props: {
        authId: AuthIdVO.reconstitute(raw.userId),
        userId: UserIdVO.reconstitute(raw.userId),
        target: this.buildTarget(raw),
        channel: this.parseChannel(channel),
        purpose: this.parsePurpose(purpose),
        status: this.parseStatus(raw.status),
        attempts: raw.attempts,
        maxAttempts: raw.maxAttempts,
        resendCount: 0,
        maxResend: 3,
        expiresAt: new Date(raw.expiresAt).toISOString(),
        verifiedAt: raw.verifiedAt
          ? new Date(raw.verifiedAt).toISOString()
          : undefined,
      },
    });
  }

  static toPersistence(entity: VerificationEntity): Record<string, unknown> {
    return {
      id: entity.id,
      userId: entity.userId.value,
      type: entity.channel.value === 'sms' ? 'phone' : 'email',
      code: entity.code?.value ?? '',
      status: entity.status.value,
      attempts: entity.attempts,
      maxAttempts: entity.maxAttempts,
      expiresAt: new Date(entity.expiresAt),
      verifiedAt: entity.verifiedAt ? new Date(entity.verifiedAt) : null,
      updatedAt: new Date(entity.updatedAt),
    };
  }

  private static buildTarget(raw: PrismaVerificationRow): IdentifierVO {
    // For phone verifications, use a valid phone identifier
    if (raw.type === 'phone') {
      return IdentifierVO.phone('+8801700000000');
    }
    // For email verifications, use a deterministic placeholder email
    // (real target would come from user record in production)
    const safeLocalPart = `user${raw.userId.replace(/-/g, '').slice(0, 8)}`;
    return IdentifierVO.email(`${safeLocalPart}@vubon.local`);
  }

  private static parseChannel(v: string): VerificationChannelVO {
    try {
      return VerificationChannelVO.reconstitute(v);
    } catch {
      return VerificationChannelVO.email();
    }
  }

  private static parsePurpose(v: string): VerificationPurposeVO {
    try {
      return VerificationPurposeVO.reconstitute(v);
    } catch {
      return VerificationPurposeVO.emailVerify();
    }
  }

  private static parseStatus(v: string): VerificationStatusVO {
    try {
      return VerificationStatusVO.reconstitute(v);
    } catch {
      return VerificationStatusVO.pending();
    }
  }
}
