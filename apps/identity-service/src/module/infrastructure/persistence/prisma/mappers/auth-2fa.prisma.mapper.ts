/**
 * 2FA Prisma Mapper
 * @module identity-service/infrastructure/persistence/prisma/mappers
 */
import { AuthTwoFactorEntity } from '../../../../domain/entities/auth-2fa.entity.js';
import { AuthIdVO } from '../../../../domain/value-objects/primitives/auth-id.vo.js';
import { TwoFactorMethodVO } from '../../../../domain/value-objects/primitives/twofa-method.vo.js';
import { TwoFactorStatusVO } from '../../../../domain/value-objects/primitives/twofa-status.vo.js';

export interface Prisma2FaRow {
  id: string;
  userId: string;
  method: string;
  backupMethods: string[];
  status: string;
  secret: string | null;
  verified: boolean;
  verifiedAt: Date | null;
  enabledAt: Date | null;
  disabledAt: Date | null;
  failedAttempts: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class Auth2FaPrismaMapper {
  static toDomain(raw: Prisma2FaRow): AuthTwoFactorEntity {
    return AuthTwoFactorEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      version: 1,
      props: {
        authId: AuthIdVO.reconstitute(raw.userId),
        primaryMethod: this.parseMethod(raw.method),
        backupMethods: raw.backupMethods.map((m) => this.parseMethod(m)),
        status: this.parseStatus(raw.status),
        secret: raw.secret ?? undefined,
        verified: raw.verified,
        verifiedAt: raw.verifiedAt
          ? new Date(raw.verifiedAt).toISOString()
          : undefined,
        enabledAt: raw.enabledAt
          ? new Date(raw.enabledAt).toISOString()
          : undefined,
        disabledAt: raw.disabledAt
          ? new Date(raw.disabledAt).toISOString()
          : undefined,
        failedAttempts: raw.failedAttempts,
        maxAttempts: 5,
      },
    });
  }

  static toPersistence(entity: AuthTwoFactorEntity): Record<string, unknown> {
    return {
      id: entity.id,
      userId: entity.authId.value,
      method: entity.primaryMethod.value,
      backupMethods: entity.backupMethods.map((m) => m.value),
      status: entity.status.value,
      secret: entity.secret ?? null,
      verified: entity.verified,
      verifiedAt: entity.verifiedAt ? new Date(entity.verifiedAt) : null,
      enabledAt: entity.enabledAt ? new Date(entity.enabledAt) : null,
      disabledAt: entity.disabledAt ? new Date(entity.disabledAt) : null,
      failedAttempts: entity.failedAttempts,
      updatedAt: new Date(entity.updatedAt),
    };
  }

  private static parseMethod(v: string): TwoFactorMethodVO {
    try { return TwoFactorMethodVO.reconstitute(v); }
    catch { return TwoFactorMethodVO.totp(); }
  }
  private static parseStatus(v: string): TwoFactorStatusVO {
    try { return TwoFactorStatusVO.reconstitute(v); }
    catch { return TwoFactorStatusVO.disabled(); }
  }
}
