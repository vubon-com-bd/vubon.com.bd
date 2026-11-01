/**
 * SchedulePrismaMapper — Prisma NotificationSchedule ↔ ScheduleEntity
 * @module notification-service/infrastructure/persistence/prisma/mappers
 *
 * Prisma fields:
 *  - recurrence (String) → ScheduleVO.frequency (ScheduleFrequencyVO)
 *  - scheduledAt + timezone → ScheduleVO.time (ScheduleTimeVO)
 *  - nextOccurrenceAt → ScheduleEntity.nextRunAt
 *  - userId → recipientIds (single-user schedule)
 */
import type { PrismaNotificationSchedule } from '@infrastructure/persistence/prisma/prisma.client.js';
import {
  toIso,
  toIsoRequired,
  jsonRecord,
} from '@infrastructure/persistence/prisma/prisma-mapper.helpers.js';

import { ScheduleEntity } from '@domain/entities/schedule.entity.js';
import { ScheduleVO } from '@domain/composites/schedule.vo.js';
import { ScheduleIdVO } from '@domain/primitives/schedule-id.vo.js';
import { ScheduleTypeVO } from '@domain/primitives/schedule-type.vo.js';
import { ScheduleStatusVO } from '@domain/primitives/schedule-status.vo.js';
import { ScheduleFrequencyVO } from '@domain/primitives/schedule-frequency.vo.js';
import { ScheduleTimeVO } from '@domain/primitives/schedule-time.vo.js';
import { TemplateIdVO } from '@domain/primitives/template-id.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';

export class SchedulePrismaMapper {
  // ═══════════════ Prisma → Domain ═══════════════
  static toDomain(raw: PrismaNotificationSchedule): ScheduleEntity {
    const recipientIds = raw.userId
      ? Object.freeze([UserIdVO.reconstitute(raw.userId)])
      : Object.freeze([]);

    const templateId = raw.notificationTemplateId
      ? TemplateIdVO.reconstitute(raw.notificationTemplateId)
      : TemplateIdVO.create('00000000-0000-0000-0000-000000000000');

    const time = ScheduleTimeVO.reconstitute({
      scheduledAt: toIsoRequired(raw.scheduledAt),
      timezone: raw.timezone,
    });

    const vo = ScheduleVO.reconstitute({
      id: ScheduleIdVO.reconstitute(raw.id),
      name: `Schedule ${raw.id.slice(0, 8)}`,
      type: ScheduleTypeVO.reconstitute(raw.type),
      status: ScheduleStatusVO.reconstitute(raw.status),
      frequency: ScheduleFrequencyVO.reconstitute(raw.recurrence),
      time,
      templateId,
      recipientIds,
      cronExpression: undefined,
      nextRunAt: toIso(raw.nextOccurrenceAt),
      lastRunAt: toIso(raw.lastTriggeredAt),
      runCount: raw.occurrenceCount,
    });

    return ScheduleEntity.reconstitute({
      id: raw.id,
      createdAt: toIsoRequired(raw.createdAt),
      updatedAt: toIsoRequired(raw.updatedAt),
      deletedAt: toIso(raw.deletedAt) ?? null,
      version: raw.version,
      props: {
        vo,
        pausedAt: undefined,
        pausedReason: undefined,
        cancelledAt: undefined,
        cancelledBy: undefined,
        cancelledReason: undefined,
        failureReason: raw.lastFailureReason ?? undefined,
      },
    });
  }

  // ═══════════════ Domain → Prisma ═══════════════
  static toPersistence(entity: ScheduleEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      type: vo.type.value,
      status: vo.status.value,
      recurrence: vo.frequency.value,
      scheduledAt: new Date(vo.time.scheduledAt),
      timezone: vo.time.timezone,
      nextOccurrenceAt: vo.nextRunAt ? new Date(vo.nextRunAt) : null,
      lastTriggeredAt: vo.lastRunAt ? new Date(vo.lastRunAt) : null,
      occurrenceCount: vo.runCount,
      maxOccurrences: null,
      notificationTemplateId: vo.templateId?.value ?? null,
      userId: vo.recipientIds[0]?.value ?? null,
      createdBy: '00000000-0000-0000-0000-000000000000',
      lastFailureReason: entity.failureReason ?? null,
      metadata: jsonRecord(null),
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
