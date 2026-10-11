/**
 * SchedulePrismaMapper — row ↔ domain entity
 * @module notification-service/infrastructure/persistence/prisma/mappers
 */
import { ScheduleEntity } from '../../../../domain/entities/schedule.entity.js';
import { ScheduleTypeVO } from '../../../../domain/value-objects/primitives/schedule-type.vo.js';
import { ScheduleStatusVO } from '../../../../domain/value-objects/primitives/schedule-status.vo.js';
import { ScheduleRecurrenceVO } from '../../../../domain/value-objects/primitives/schedule-recurrence.vo.js';

export interface PrismaScheduleRow {
  id: string;
  type: string;
  status: string;
  recurrence: string;
  scheduledAt: Date;
  timezone: string;
  nextOccurrenceAt: Date | null;
  lastTriggeredAt: Date | null;
  occurrenceCount: number;
  maxOccurrences: number | null;
  notificationTemplateId: string | null;
  userId: string | null;
  createdBy: string;
  lastFailureReason: string | null;
  metadata: unknown;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const toIso = (d: Date | null | undefined): string | undefined =>
  d ? new Date(d).toISOString() : undefined;

export class SchedulePrismaMapper {
  static toDomain(raw: PrismaScheduleRow): ScheduleEntity {
    return ScheduleEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        type: ScheduleTypeVO.reconstitute(raw.type),
        status: ScheduleStatusVO.reconstitute(raw.status),
        recurrence: ScheduleRecurrenceVO.reconstitute(raw.recurrence),
        scheduledAt: new Date(raw.scheduledAt).toISOString(),
        timezone: raw.timezone,
        nextOccurrenceAt: toIso(raw.nextOccurrenceAt),
        occurrenceCount: raw.occurrenceCount,
        maxOccurrences: raw.maxOccurrences ?? undefined,
        notificationTemplateId: raw.notificationTemplateId ?? undefined,
        userId: raw.userId ?? undefined,
        createdBy: raw.createdBy,
        lastFailureReason: raw.lastFailureReason ?? undefined,
      },
    });
  }

  static toPersistence(entity: ScheduleEntity): Record<string, unknown> {
    return {
      id: entity.id,
      type: entity.type.value,
      status: entity.status.value,
      recurrence: entity.recurrence.value,
      scheduledAt: new Date(entity.scheduledAt),
      timezone: entity.timezone,
      nextOccurrenceAt: entity.nextOccurrenceAt ? new Date(entity.nextOccurrenceAt) : null,
      lastTriggeredAt: entity.lastTriggeredAt ? new Date(entity.lastTriggeredAt) : null,
      occurrenceCount: entity.occurrenceCount,
      maxOccurrences: entity.maxOccurrences ?? null,
      notificationTemplateId: entity.notificationTemplateId ?? null,
      userId: entity.userId ?? null,
      createdBy: entity.createdBy,
      lastFailureReason: entity.lastFailureReason ?? null,
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
