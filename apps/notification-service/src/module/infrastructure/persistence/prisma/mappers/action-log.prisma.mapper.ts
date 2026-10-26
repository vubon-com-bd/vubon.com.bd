/**
 * ActionLogPrismaMapper — Prisma NotificationActionLog row
 * @module notification-service/infrastructure/persistence/prisma/mappers
 *
 * Persists user-triggered actions (click, dismiss, unsubscribe)।
 */
import type { PrismaNotificationActionLog } from '@infrastructure/persistence/prisma/prisma.client.js';
import { toIsoRequired, jsonRecord } from '@infrastructure/persistence/prisma/prisma-mapper.helpers.js';

export interface ActionLogRow {
  readonly id: string;
  readonly notificationId: string;
  readonly userId: string;
  readonly action: string;
  readonly actionType?: string;
  readonly url?: string;
  readonly metadata: Readonly<Record<string, unknown>>;
  readonly occurredAt: string;
  readonly createdAt: string;
}

export class ActionLogPrismaMapper {
  static toRow(raw: PrismaNotificationActionLog): ActionLogRow {
    return {
      id: raw.id,
      notificationId: raw.notificationId,
      userId: raw.userId,
      action: raw.action,
      actionType: raw.actionType ?? undefined,
      url: raw.url ?? undefined,
      metadata: jsonRecord(raw.metadata),
      occurredAt: toIsoRequired(raw.occurredAt),
      createdAt: toIsoRequired(raw.createdAt),
    };
  }

  static toPersistence(row: ActionLogRow): Record<string, unknown> {
    return {
      id: row.id,
      notificationId: row.notificationId,
      userId: row.userId,
      action: row.action,
      actionType: row.actionType ?? null,
      url: row.url ?? null,
      metadata: { ...row.metadata },
      occurredAt: new Date(row.occurredAt),
    };
  }
}
