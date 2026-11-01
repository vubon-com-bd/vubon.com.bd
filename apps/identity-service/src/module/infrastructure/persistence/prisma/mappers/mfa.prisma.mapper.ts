/**
 * MFA Prisma Mapper — Prisma `AuthMfa` row ↔ `MfaEntity`
 * @module identity-service/infrastructure/persistence/prisma/mappers
 */
import { MfaEntity } from '../../../../domain/entities/mfa.entity.js';
import { MfaIdVO } from '../../../../domain/value-objects/primitives/mfa-id.vo.js';
import { AuthIdVO } from '../../../../domain/value-objects/primitives/auth-id.vo.js';
import { MfaMethodVO } from '../../../../domain/value-objects/primitives/mfa-method.vo.js';
import { MfaSecretVO } from '../../../../domain/value-objects/primitives/mfa-secret.vo.js';

export interface PrismaMfaRow {
  id: string;
  userId: string;
  secret: string;
  type: string;
  status: string;
  enabledAt: Date | null;
  lastVerifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class MfaPrismaMapper {
  static toDomain(raw: PrismaMfaRow): MfaEntity {
    const enabled = !!raw.enabledAt;
    const verified = !!raw.lastVerifiedAt;

    return MfaEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      version: 1,
      props: {
        authId: AuthIdVO.reconstitute(raw.userId),
        method: this.parseMethod(raw.type),
        secret: this.parseSecret(raw.secret),
        verified,
        enabled,
        enabledAt: raw.enabledAt
          ? new Date(raw.enabledAt).toISOString()
          : undefined,
        verifiedAt: raw.lastVerifiedAt
          ? new Date(raw.lastVerifiedAt).toISOString()
          : undefined,
        failedAttempts: 0,
      },
    });
  }

  static toPersistence(entity: MfaEntity): Record<string, unknown> {
    return {
      id: entity.id,
      userId: entity.authId.value,
      secret: entity.secret?.value ?? '',
      type: entity.method.value,
      status: entity.enabled ? 'enabled' : 'pending',
      enabledAt: entity.enabledAt ? new Date(entity.enabledAt) : null,
      lastVerifiedAt: entity.verifiedAt ? new Date(entity.verifiedAt) : null,
      updatedAt: new Date(entity.updatedAt),
    };
  }

  private static parseMethod(value: string): MfaMethodVO {
    try {
      return MfaMethodVO.reconstitute(value);
    } catch {
      return MfaMethodVO.totp();
    }
  }

  private static parseSecret(value: string): MfaSecretVO | undefined {
    if (!value || value.length < 16) return undefined;
    try {
      return MfaSecretVO.reconstitute(value);
    } catch {
      return undefined;
    }
  }
}
