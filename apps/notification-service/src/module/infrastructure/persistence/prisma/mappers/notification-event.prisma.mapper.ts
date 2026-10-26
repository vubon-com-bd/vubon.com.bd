/**
 * NotificationEventPrismaMapper
 * @module notification-service/infrastructure/persistence/prisma/mappers
 *
 * Prisma NotificationEvent — infrastructure event log (no domain entity)।
 * Persists domain events for audit/replay purposes.
 */
import type { PrismaNotificationEvent } from '@infrastructure/persistence/prisma/prisma.client.js';
import {
  toIso,
  toIsoRequired,
  jsonRecord,
} from '@infrastructure/persistence/prisma/prisma-mapper.helpers.js';

export interface NotificationEventRow {
  readonly id: string;
  readonly notificationId: string;
  readonly userId?: string;
  readonly eventType: string;
  readonly channel: string;
  readonly metadata: Readonly<Record<string, unknown>>;
  readonly occurredAt: string;
  readonly createdAt: string;
}

export class NotificationEventPrismaMapper {
  static toRow(raw: PrismaNotificationEvent): NotificationEventRow {
    return {
      id: raw.id,
      notificationId: raw.notificationId,
      userId: raw.userId ?? undefined,
      eventType: raw.eventType,
      channel: raw.channel,
      metadata: jsonRecord(raw.metadata),
      occurredAt: toIsoRequired(raw.occurredAt),
      createdAt: toIsoRequired(raw.createdAt),
    };
  }

  static toPersistence(row: NotificationEventRow): Record<string, unknown> {
    return {
      id: row.id,
      notificationId: row.notificationId,
      userId: row.userId ?? null,
      eventType: row.eventType,
      channel: row.channel,
      metadata: { ...row.metadata },
      occurredAt: new Date(row.occurredAt),
    };
  }

  static readonly _helpers = { toIso };
}
