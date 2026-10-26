/**
 * BroadcastPrismaMapper — Prisma NotificationBroadcast ↔ BroadcastEntity
 * @module notification-service/infrastructure/persistence/prisma/mappers
 *
 * Prisma fields:
 *  - target + segmentFilter + customRecipientIds → BroadcastVO.audience (BroadcastAudienceVO)
 *  - channels (String[]) → NotificationChannelVO[]
 *  - templateId (required) → TemplateIdVO
 */
import type { PrismaNotificationBroadcast } from '@infrastructure/persistence/prisma/prisma.client.js';
import {
  toIso,
  toIsoRequired,
  jsonRecord,
} from '@infrastructure/persistence/prisma/prisma-mapper.helpers.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { BroadcastEntity } from '@domain/entities/broadcast.entity.js';
import { BroadcastVO } from '@domain/composites/broadcast.vo.js';
import { BroadcastIdVO } from '@domain/primitives/broadcast-id.vo.js';
import { BroadcastTypeVO } from '@domain/primitives/broadcast-type.vo.js';
import { BroadcastStatusVO } from '@domain/primitives/broadcast-status.vo.js';
import { BroadcastAudienceVO } from '@domain/primitives/broadcast-audience.vo.js';
import { NotificationChannelVO } from '@domain/primitives/notification-channel.vo.js';
import { TemplateIdVO } from '@domain/primitives/template-id.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';

export class BroadcastPrismaMapper {
  // ═══════════════ Prisma → Domain ═══════════════
  static toDomain(raw: PrismaNotificationBroadcast): BroadcastEntity {
    const audience = BroadcastAudienceVO.reconstitute({
      target: raw.target as never,
      userIds: raw.customRecipientIds?.length
        ? Object.freeze([...raw.customRecipientIds])
        : undefined,
      segmentId: undefined,
    });

    const channels = Object.freeze(
      (raw.channels ?? []).map((c) => NotificationChannelVO.reconstitute(c)),
    );

    const vo = BroadcastVO.reconstitute({
      id: BroadcastIdVO.reconstitute(raw.id),
      name: `Broadcast ${raw.id.slice(0, 8)}`,
      type: BroadcastTypeVO.reconstitute(raw.type),
      status: BroadcastStatusVO.reconstitute(raw.status),
      audience,
      channels,
      templateId: TemplateIdVO.reconstitute(raw.templateId),
      content: undefined,
      createdBy: UserIdVO.reconstitute(raw.createdBy),
      approvedBy: raw.approvedBy ? UserIdVO.reconstitute(raw.approvedBy) : undefined,
      scheduledAt: toIso(raw.scheduledAt),
      startedAt: toIso(raw.startedAt),
      completedAt: toIso(raw.completedAt),
      recipientCount: raw.totalRecipients ?? raw.estimatedRecipients ?? 0,
      sentCount: raw.succeeded ?? 0,
      failedCount: raw.failed ?? 0,
    });

    return BroadcastEntity.reconstitute({
      id: raw.id,
      createdAt: toIsoRequired(raw.createdAt),
      updatedAt: toIsoRequired(raw.updatedAt),
      deletedAt: toIso(raw.deletedAt) ?? null,
      version: raw.version,
      props: {
        vo,
        cancelledAt: undefined,
        cancelledBy: undefined,
        cancelledReason: undefined,
        failureReason: (raw.failureReasons ?? [])[0],
      },
    });
  }

  // ═══════════════ Domain → Prisma ═══════════════
  static toPersistence(entity: BroadcastEntity): Record<string, unknown> {
    const vo = entity.vo;
    if (!vo.templateId) {
      throw new ValidationError(
        'Broadcast templateId is required for Prisma persistence',
        'templateId',
      );
    }
    return {
      id: entity.id,
      type: vo.type.value,
      status: vo.status.value,
      target: vo.audience.target,
      templateId: vo.templateId.value,
      channels: vo.channels.map((c) => c.value),
      estimatedRecipients: vo.recipientCount,
      totalRecipients: vo.recipientCount,
      processed: vo.sentCount + vo.failedCount,
      succeeded: vo.sentCount,
      failed: vo.failedCount,
      failureReasons: entity.failureReason ? [entity.failureReason] : [],
      scheduledAt: vo.scheduledAt ? new Date(vo.scheduledAt) : null,
      startedAt: vo.startedAt ? new Date(vo.startedAt) : null,
      completedAt: vo.completedAt ? new Date(vo.completedAt) : null,
      createdBy: vo.createdBy.value,
      approvedBy: vo.approvedBy?.value ?? null,
      segmentFilter: jsonRecord(null),
      customRecipientIds: vo.audience.userIds ? [...vo.audience.userIds] : [],
      metadata: jsonRecord(null),
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
