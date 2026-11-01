/**
 * Device Prisma Mapper — Prisma `AuthDevice` row ↔ `DeviceEntity`
 * @module identity-service/infrastructure/persistence/prisma/mappers
 */
import { DeviceEntity } from '../../../../domain/entities/device.entity.js';
import { DeviceIdVO } from '../../../../domain/value-objects/primitives/device-id.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { DeviceTypeVO } from '../../../../domain/value-objects/primitives/device-type.vo.js';
import { DeviceFingerprintVO } from '../../../../domain/value-objects/primitives/device-fingerprint.vo.js';

export interface PrismaDeviceRow {
  id: string;
  userId: string;
  fingerprint: string;
  type: string;
  status: string;
  name: string | null;
  lastSeenAt: Date;
  trustedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class DevicePrismaMapper {
  static toDomain(raw: PrismaDeviceRow): DeviceEntity {
    const trusted = raw.status === 'trusted' && !!raw.trustedAt;

    return DeviceEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      version: 1,
      props: {
        userId: UserIdVO.reconstitute(raw.userId),
        type: this.parseType(raw.type),
        fingerprint: this.parseFingerprint(raw.fingerprint),
        name: raw.name ?? undefined,
        trusted,
        trustedUntil: raw.trustedAt
          ? new Date(
              new Date(raw.trustedAt).getTime() + 30 * 24 * 3600 * 1000,
            ).toISOString()
          : undefined,
        lastActiveAt: new Date(raw.lastSeenAt).toISOString(),
      },
    });
  }

  static toPersistence(entity: DeviceEntity): Record<string, unknown> {
    return {
      id: entity.id,
      userId: entity.userId.value,
      fingerprint: entity.fingerprint.value,
      type: entity.type.value,
      status: entity.trusted ? 'trusted' : 'untrusted',
      name: entity.name ?? null,
      lastSeenAt: new Date(entity.lastActiveAt),
      trustedAt: entity.trustedUntil ? new Date() : null,
      updatedAt: new Date(entity.updatedAt),
    };
  }

  private static parseType(value: string): DeviceTypeVO {
    try {
      return DeviceTypeVO.reconstitute(value);
    } catch {
      return DeviceTypeVO.unknown();
    }
  }

  private static parseFingerprint(value: string): DeviceFingerprintVO {
    if (!value || value.length < 8) {
      return DeviceFingerprintVO.reconstitute('unknown-fp-00000000');
    }
    try {
      return DeviceFingerprintVO.reconstitute(value);
    } catch {
      return DeviceFingerprintVO.reconstitute('unknown-fp-00000000');
    }
  }
}
