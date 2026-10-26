/**
 * DigestPrismaMapper — Prisma NotificationDigest ↔ DigestEntity
 * @module notification-service/infrastructure/persistence/prisma/mappers
 *
 * Prisma fields:
 *  - frequency + periodStart + periodEnd → DigestVO.period (DigestPeriodVO)
 *  - itemIds (String[]) → itemCount from length
 *  - channel (optional) → not in DigestVO (skip)
 */
import type { PrismaNotificationDigest } from '@infrastructure/persistence/prisma/prisma.client.js';
import {
  toIso,
  toIsoRequired,
  toArray,
} from '@infrastructure/persistence/prisma/prisma-mapper.helpers.js';

import { DigestEntity } from '@domain/entities/digest.entity.js';
import { DigestVO } from '@domain/composites/digest.vo.js';
import { DigestIdVO } from '@domain/primitives/digest-id.vo.js';
import { DigestStatusVO } from '@domain/primitives/digest-status.vo.js';
import { DigestTypeVO } from '@domain/primitives/digest-type.vo.js';
import { DigestPeriodVO } from '@domain/primitives/digest-period.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';

export class DigestPrismaMapper {
  // ═══════════════ Prisma → Domain ═══════════════
  static toDomain(raw: PrismaNotificationDigest): DigestEntity {
    const itemIds = toArray(raw.itemIds);

    const period = DigestPeriodVO.reconstitute({
      frequency: raw.frequency as never,
      periodStart: toIsoRequired(raw.periodStart),
      periodEnd: toIsoRequired(raw.periodEnd),
    });

    const vo = DigestVO.reconstitute({
      id: DigestIdVO.reconstitute(raw.id),
      userId: UserIdVO.reconstitute(raw.userId),
      status: DigestStatusVO.reconstitute(raw.status),
      type: DigestTypeVO.reconstitute(raw.type),
      period,
      categories: Object.freeze([]),
      sendHour: 9,
      timezone: 'Asia/Dhaka',
      itemCount: itemIds.length,
      generatedAt: toIso(raw.generatedAt),
      sentAt: toIso(raw.sentAt),
      lastDeliveredAt: toIso(raw.sentAt),
    });

    return DigestEntity.reconstitute({
      id: raw.id,
      createdAt: toIsoRequired(raw.createdAt),
      updatedAt: toIsoRequired(raw.updatedAt),
      deletedAt: toIso(raw.deletedAt) ?? null,
      version: raw.version,
      props: {
        vo,
        items: [],
        failureReason: raw.failureReason ?? undefined,
        cancelledAt: undefined,
        cancelledReason: undefined,
      },
    });
  }

  // ═══════════════ Domain → Prisma ═══════════════
  static toPersistence(entity: DigestEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      userId: vo.userId.value,
      frequency: vo.period.frequency,
      type: vo.type.value,
      status: vo.status.value,
      periodStart: new Date(vo.period.periodStart),
      periodEnd: new Date(vo.period.periodEnd),
      itemCount: entity.itemCount,
      itemIds: [],
      channel: null,
      generatedAt: vo.generatedAt ? new Date(vo.generatedAt) : null,
      sentAt: vo.sentAt ? new Date(vo.sentAt) : null,
      failureReason: entity.failureReason ?? null,
      metadata: null,
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
