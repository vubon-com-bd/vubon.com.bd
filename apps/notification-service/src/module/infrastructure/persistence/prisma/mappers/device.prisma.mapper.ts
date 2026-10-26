/**
 * DevicePrismaMapper — Prisma NotificationDevice ↔ DeviceEntity
 * @module notification-service/infrastructure/persistence/prisma/mappers
 *
 * Prisma fields:
 *  - type + platform + token → DeviceVO (direct)
 *  - lastActiveAt + registeredAt (DateTime?)
 *  - status (String)
 */
import type { PrismaNotificationDevice } from '@infrastructure/persistence/prisma/prisma.client.js';
import { toIso, toIsoRequired } from '@infrastructure/persistence/prisma/prisma-mapper.helpers.js';

import { DeviceEntity } from '@domain/entities/device.entity.js';
import { DeviceVO } from '@domain/composites/device.vo.js';
import { DeviceIdVO } from '@domain/primitives/device-id.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { DeviceStatusVO } from '@domain/primitives/device-status.vo.js';
import { DeviceTypeVO } from '@domain/primitives/device-type.vo.js';
import { DeviceTokenVO } from '@domain/primitives/device-token.vo.js';
import { DevicePlatformVO } from '@domain/primitives/device-platform.vo.js';

export class DevicePrismaMapper {
  // ═══════════════ Prisma → Domain ═══════════════
  static toDomain(raw: PrismaNotificationDevice): DeviceEntity {
    const vo = DeviceVO.reconstitute({
      id: DeviceIdVO.reconstitute(raw.id),
      userId: UserIdVO.reconstitute(raw.userId),
      type: DeviceTypeVO.reconstitute(raw.type),
      status: DeviceStatusVO.reconstitute(raw.status),
      token: DeviceTokenVO.reconstitute(raw.token),
      platform: DevicePlatformVO.reconstitute(raw.platform ?? 'web'),
      appVersion: raw.appVersion ?? undefined,
      osVersion: raw.osVersion ?? undefined,
      deviceName: raw.deviceName ?? undefined,
      lastActiveAt: toIsoRequired(raw.lastActiveAt ?? raw.createdAt),
      registeredAt: toIsoRequired(raw.registeredAt),
    });

    return DeviceEntity.reconstitute({
      id: raw.id,
      createdAt: toIsoRequired(raw.createdAt),
      updatedAt: toIsoRequired(raw.updatedAt),
      deletedAt: toIso(raw.deletedAt) ?? null,
      version: raw.version,
      props: {
        vo,
        blockedReason: undefined,
        blockedAt: undefined,
        unregisteredAt: undefined,
        unregisteredReason: undefined,
      },
    });
  }

  // ═══════════════ Domain → Prisma ═══════════════
  static toPersistence(entity: DeviceEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      userId: vo.userId.value,
      type: vo.type.value,
      status: vo.status.value,
      token: vo.token.value,
      platform: vo.platform.value,
      appVersion: vo.appVersion ?? null,
      osVersion: vo.osVersion ?? null,
      deviceName: vo.deviceName ?? null,
      lastActiveAt: new Date(vo.lastActiveAt),
      registeredAt: new Date(vo.registeredAt),
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
