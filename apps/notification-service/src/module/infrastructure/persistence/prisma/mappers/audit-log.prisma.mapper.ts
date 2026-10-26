/**
 * AuditLogPrismaMapper — Prisma NotificationAuditLog row
 * @module notification-service/infrastructure/persistence/prisma/mappers
 *
 * Full audit trail — beforeState + afterState for compliance।
 */
import type { PrismaNotificationAuditLog } from '@infrastructure/persistence/prisma/prisma.client.js';
import { toIsoRequired, jsonRecord } from '@infrastructure/persistence/prisma/prisma-mapper.helpers.js';

export interface AuditLogRow {
  readonly id: string;
  readonly entityType: string;
  readonly entityId: string;
  readonly action: string;
  readonly actorId?: string;
  readonly beforeState: Readonly<Record<string, unknown>>;
  readonly afterState: Readonly<Record<string, unknown>>;
  readonly metadata: Readonly<Record<string, unknown>>;
  readonly occurredAt: string;
  readonly createdAt: string;
}

export class AuditLogPrismaMapper {
  static toRow(raw: PrismaNotificationAuditLog): AuditLogRow {
    return {
      id: raw.id,
      entityType: raw.entityType,
      entityId: raw.entityId,
      action: raw.action,
      actorId: raw.actorId ?? undefined,
      beforeState: jsonRecord(raw.beforeState),
      afterState: jsonRecord(raw.afterState),
      metadata: jsonRecord(raw.metadata),
      occurredAt: toIsoRequired(raw.occurredAt),
      createdAt: toIsoRequired(raw.createdAt),
    };
  }

  static toPersistence(row: AuditLogRow): Record<string, unknown> {
    return {
      id: row.id,
      entityType: row.entityType,
      entityId: row.entityId,
      action: row.action,
      actorId: row.actorId ?? null,
      beforeState: { ...row.beforeState },
      afterState: { ...row.afterState },
      metadata: { ...row.metadata },
      occurredAt: new Date(row.occurredAt),
    };
  }
}
