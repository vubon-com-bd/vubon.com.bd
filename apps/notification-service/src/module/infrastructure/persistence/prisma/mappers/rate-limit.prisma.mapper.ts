/**
 * RateLimitPrismaMapper — Prisma NotificationRateLimit row
 * @module notification-service/infrastructure/persistence/prisma/mappers
 *
 * Infrastructure-only table — persists rate-limit window state for audit.
 * Primary rate-limit logic lives in Redis cache; this is the fallback DB.
 */
import type { PrismaNotificationRateLimit } from '@infrastructure/persistence/prisma/prisma.client.js';
import { toIsoRequired } from '@infrastructure/persistence/prisma/prisma-mapper.helpers.js';

export interface RateLimitRow {
  readonly id: string;
  readonly userId?: string;
  readonly channel: string;
  readonly windowStart: string;
  readonly windowEnd: string;
  readonly count: number;
  readonly limitValue: number;
  readonly exceeded: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class RateLimitPrismaMapper {
  static toRow(raw: PrismaNotificationRateLimit): RateLimitRow {
    return {
      id: raw.id,
      userId: raw.userId ?? undefined,
      channel: raw.channel,
      windowStart: toIsoRequired(raw.windowStart),
      windowEnd: toIsoRequired(raw.windowEnd),
      count: raw.count,
      limitValue: raw.limitValue,
      exceeded: raw.exceeded,
      createdAt: toIsoRequired(raw.createdAt),
      updatedAt: toIsoRequired(raw.updatedAt),
    };
  }

  static toPersistence(row: RateLimitRow): Record<string, unknown> {
    return {
      id: row.id,
      userId: row.userId ?? null,
      channel: row.channel,
      windowStart: new Date(row.windowStart),
      windowEnd: new Date(row.windowEnd),
      count: row.count,
      limitValue: row.limitValue,
      exceeded: row.exceeded,
    };
  }
}
