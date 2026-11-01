/**
 * Biometric Prisma Mapper
 * @module identity-service/infrastructure/persistence/prisma/mappers
 */
import { AuthBiometricEntity } from '../../../../domain/entities/auth-biometric.entity.js';
import { BiometricIdVO } from '../../../../domain/value-objects/primitives/biometric-id.vo.js';
import { AuthIdVO } from '../../../../domain/value-objects/primitives/auth-id.vo.js';
import { BiometricTypeVO } from '../../../../domain/value-objects/primitives/biometric-type.vo.js';
import { DeviceIdVO } from '../../../../domain/value-objects/primitives/device-id.vo.js';

export interface PrismaBiometricRow {
  id: string;
  userId: string;
  type: string;
  deviceId: string | null;
  enabled: boolean;
  publicKeyHash: string | null;
  failedAttempts: number;
  lastUsedAt: Date | null;
  lastFailedAt: Date | null;
  enabledAt: Date | null;
  disabledAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class AuthBiometricPrismaMapper {
  static toDomain(raw: PrismaBiometricRow): AuthBiometricEntity {
    return AuthBiometricEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      version: 1,
      props: {
        authId: AuthIdVO.reconstitute(raw.userId),
        type: this.parseType(raw.type),
        deviceId: raw.deviceId
          ? DeviceIdVO.reconstitute(raw.deviceId)
          : undefined,
        enabled: raw.enabled,
        publicKeyHash: raw.publicKeyHash ?? undefined,
        failedAttempts: raw.failedAttempts,
        maxAttempts: 5,
        lastUsedAt: raw.lastUsedAt
          ? new Date(raw.lastUsedAt).toISOString()
          : undefined,
        lastFailedAt: raw.lastFailedAt
          ? new Date(raw.lastFailedAt).toISOString()
          : undefined,
        enabledAt: raw.enabledAt
          ? new Date(raw.enabledAt).toISOString()
          : undefined,
        disabledAt: raw.disabledAt
          ? new Date(raw.disabledAt).toISOString()
          : undefined,
      },
    });
  }

  static toPersistence(entity: AuthBiometricEntity): Record<string, unknown> {
    return {
      id: entity.id,
      userId: entity.authId.value,
      type: entity.type.value,
      deviceId: entity.deviceId?.value ?? null,
      enabled: entity.enabled,
      publicKeyHash: entity.publicKeyHash ?? null,
      failedAttempts: entity.failedAttempts,
      lastUsedAt: entity.lastUsedAt ? new Date(entity.lastUsedAt) : null,
      lastFailedAt: entity.lastFailedAt ? new Date(entity.lastFailedAt) : null,
      enabledAt: entity.enabledAt ? new Date(entity.enabledAt) : null,
      disabledAt: entity.disabledAt ? new Date(entity.disabledAt) : null,
      updatedAt: new Date(entity.updatedAt),
    };
  }

  private static parseType(v: string): BiometricTypeVO {
    try { return BiometricTypeVO.reconstitute(v); }
    catch { return BiometricTypeVO.fingerprint(); }
  }
}
