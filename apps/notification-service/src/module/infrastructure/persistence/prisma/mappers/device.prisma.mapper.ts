/**
 * DevicePrismaMapper — row ↔ domain entity
 * @module notification-service/infrastructure/persistence/prisma/mappers
 */
import { DeviceEntity } from '../../../../domain/entities/device.entity.js';
import { DeviceTypeVO } from '../../../../domain/value-objects/primitives/device-type.vo.js';
import { DeviceStatusVO } from '../../../../domain/value-objects/primitives/device-status.vo.js';
import { DeviceTokenVO } from '../../../../domain/value-objects/primitives/device-token.vo.js';

export interface PrismaDeviceRow {
  id: string;
  userId: string;
  type: string;
  status: string;
  token: string;
  platform: string | null;
  appVersion: string | null;
  osVersion: string | null;
  deviceName: string | null;
  lastActiveAt: Date | null;
  registeredAt: Date;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const toIso = (d: Date | null | undefined): string | undefined =>
  d ? new Date(d).toISOString() : undefined;

export class DevicePrismaMapper {
  static toDomain(raw: PrismaDeviceRow): DeviceEntity {
    return DeviceEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        userId: raw.userId,
        type: DeviceTypeVO.reconstitute(raw.type),
        status: DeviceStatusVO.reconstitute(raw.status),
        token: DeviceTokenVO.reconstitute(raw.token),
        platform: raw.platform ?? undefined,
        appVersion: raw.appVersion ?? undefined,
        osVersion: raw.osVersion ?? undefined,
        lastActiveAt: toIso(raw.lastActiveAt),
        registeredAt: new Date(raw.registeredAt).toISOString(),
      },
    });
  }

  static toPersistence(entity: DeviceEntity): Record<string, unknown> {
    return {
      id: entity.id,
      userId: entity.userId,
      type: entity.type.value,
      status: entity.status.value,
      token: entity.token.value,
      platform: entity.platform ?? null,
      appVersion: entity.appVersion ?? null,
      osVersion: entity.osVersion ?? null,
      lastActiveAt: entity.lastActiveAt ? new Date(entity.lastActiveAt) : null,
      registeredAt: new Date(entity.registeredAt),
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
