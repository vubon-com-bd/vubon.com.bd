/**
 * BouncePrismaMapper — Prisma NotificationBounce row
 * @module notification-service/infrastructure/persistence/prisma/mappers
 *
 * Persists delivery bounce events (soft/hard/complaint) for suppression logic।
 */
import type { PrismaNotificationBounce } from '@infrastructure/persistence/prisma/prisma.client.js';
import {
  toIsoRequired,
  jsonAs,
} from '@infrastructure/persistence/prisma/prisma-mapper.helpers.js';

export interface BounceRow {
  readonly id: string;
  readonly notificationId?: string;
  readonly userId?: string;
  readonly channel: string;
  readonly provider: string;
  readonly bounceType: string;
  readonly bounceSubType?: string;
  readonly reason?: string;
  readonly recipient: string;
  readonly raw?: Readonly<Record<string, unknown>>;
  readonly bouncedAt: string;
  readonly createdAt: string;
}

export class BouncePrismaMapper {
  static toRow(raw: PrismaNotificationBounce): BounceRow {
    return {
      id: raw.id,
      notificationId: raw.notificationId ?? undefined,
      userId: raw.userId ?? undefined,
      channel: raw.channel,
      provider: raw.provider,
      bounceType: raw.bounceType,
      bounceSubType: raw.bounceSubType ?? undefined,
      reason: raw.reason ?? undefined,
      recipient: raw.recipient,
      raw: jsonAs<Readonly<Record<string, unknown>> | undefined>(raw.raw, undefined),
      bouncedAt: toIsoRequired(raw.bouncedAt),
      createdAt: toIsoRequired(raw.createdAt),
    };
  }

  static toPersistence(row: BounceRow): Record<string, unknown> {
    return {
      id: row.id,
      notificationId: row.notificationId ?? null,
      userId: row.userId ?? null,
      channel: row.channel,
      provider: row.provider,
      bounceType: row.bounceType,
      bounceSubType: row.bounceSubType ?? null,
      reason: row.reason ?? null,
      recipient: row.recipient,
      raw: row.raw ? { ...row.raw } : null,
      bouncedAt: new Date(row.bouncedAt),
    };
  }
}
