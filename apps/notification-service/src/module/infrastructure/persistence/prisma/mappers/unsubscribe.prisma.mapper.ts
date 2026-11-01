/**
 * UnsubscribePrismaMapper — Prisma NotificationUnsubscribe row
 * @module notification-service/infrastructure/persistence/prisma/mappers
 *
 * Tracks user unsubscription actions per-scope (channel/category/global)।
 */
import type { PrismaNotificationUnsubscribe } from '@infrastructure/persistence/prisma/prisma.client.js';
import {
  toIso,
  toIsoRequired,
} from '@infrastructure/persistence/prisma/prisma-mapper.helpers.js';

export interface UnsubscribeRow {
  readonly id: string;
  readonly userId: string;
  readonly scope: string;
  readonly reason?: string;
  readonly source?: string;
  readonly ipAddress?: string;
  readonly userAgent?: string;
  readonly unsubscribedAt: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt?: string;
}

export class UnsubscribePrismaMapper {
  static toRow(raw: PrismaNotificationUnsubscribe): UnsubscribeRow {
    return {
      id: raw.id,
      userId: raw.userId,
      scope: raw.scope,
      reason: raw.reason ?? undefined,
      source: raw.source ?? undefined,
      ipAddress: raw.ipAddress ?? undefined,
      userAgent: raw.userAgent ?? undefined,
      unsubscribedAt: toIsoRequired(raw.unsubscribedAt),
      createdAt: toIsoRequired(raw.createdAt),
      updatedAt: toIsoRequired(raw.updatedAt),
      deletedAt: toIso(raw.deletedAt),
    };
  }

  static toPersistence(row: UnsubscribeRow): Record<string, unknown> {
    return {
      id: row.id,
      userId: row.userId,
      scope: row.scope,
      reason: row.reason ?? null,
      source: row.source ?? null,
      ipAddress: row.ipAddress ?? null,
      userAgent: row.userAgent ?? null,
      unsubscribedAt: new Date(row.unsubscribedAt),
      deletedAt: row.deletedAt ? new Date(row.deletedAt) : null,
    };
  }
}
