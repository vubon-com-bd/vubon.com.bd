/**
 * WebhookDeliveryPrismaMapper
 * @module notification-service/infrastructure/persistence/prisma/mappers
 *
 * Prisma NotificationWebhookDelivery — infrastructure-only (no domain entity)।
 * Used for tracking webhook fire history.
 */
import type { PrismaNotificationWebhookDelivery } from '@infrastructure/persistence/prisma/prisma.client.js';
import {
  toIso,
  toIsoRequired,
  jsonRecord,
} from '@infrastructure/persistence/prisma/prisma-mapper.helpers.js';

export interface WebhookDeliveryRow {
  readonly id: string;
  readonly webhookId: string;
  readonly event: string;
  readonly status: string;
  readonly requestBody: Readonly<Record<string, unknown>>;
  readonly responseStatus?: number;
  readonly responseBody?: string;
  readonly durationMs?: number;
  readonly attemptCount: number;
  readonly nextRetryAt?: string;
  readonly deliveredAt?: string;
  readonly failedAt?: string;
  readonly error?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class WebhookDeliveryPrismaMapper {
  static toRow(raw: PrismaNotificationWebhookDelivery): WebhookDeliveryRow {
    return {
      id: raw.id,
      webhookId: raw.webhookId,
      event: raw.event,
      status: raw.status,
      requestBody: jsonRecord(raw.requestBody),
      responseStatus: raw.responseStatus ?? undefined,
      responseBody: raw.responseBody ?? undefined,
      durationMs: raw.durationMs ?? undefined,
      attemptCount: raw.attemptCount,
      nextRetryAt: toIso(raw.nextRetryAt),
      deliveredAt: toIso(raw.deliveredAt),
      failedAt: toIso(raw.failedAt),
      error: raw.error ?? undefined,
      createdAt: toIsoRequired(raw.createdAt),
      updatedAt: toIsoRequired(raw.updatedAt),
    };
  }

  static toPersistence(row: WebhookDeliveryRow): Record<string, unknown> {
    return {
      id: row.id,
      webhookId: row.webhookId,
      event: row.event,
      status: row.status,
      requestBody: { ...row.requestBody },
      responseStatus: row.responseStatus ?? null,
      responseBody: row.responseBody ?? null,
      durationMs: row.durationMs ?? null,
      attemptCount: row.attemptCount,
      nextRetryAt: row.nextRetryAt ? new Date(row.nextRetryAt) : null,
      deliveredAt: row.deliveredAt ? new Date(row.deliveredAt) : null,
      failedAt: row.failedAt ? new Date(row.failedAt) : null,
      error: row.error ?? null,
    };
  }
}
