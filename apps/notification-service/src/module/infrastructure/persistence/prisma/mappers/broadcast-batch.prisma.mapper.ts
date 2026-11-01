/**
 * BroadcastBatchPrismaMapper
 * @module notification-service/infrastructure/persistence/prisma/mappers
 *
 * Prisma NotificationBroadcastBatch — child of NotificationBroadcast।
 * This is an infrastructure-only entity (no domain entity) — used for
 * tracking batch progress.
 */
import type { PrismaNotificationBroadcastBatch } from '@infrastructure/persistence/prisma/prisma.client.js';
import {
  toIso,
  toIsoRequired,
} from '@infrastructure/persistence/prisma/prisma-mapper.helpers.js';

export interface BroadcastBatchRow {
  readonly id: string;
  readonly broadcastId: string;
  readonly batchNumber: number;
  readonly status: string;
  readonly processed: number;
  readonly succeeded: number;
  readonly failed: number;
  readonly recipientIds: readonly string[];
  readonly startedAt?: string;
  readonly completedAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class BroadcastBatchPrismaMapper {
  static toRow(raw: PrismaNotificationBroadcastBatch): BroadcastBatchRow {
    return {
      id: raw.id,
      broadcastId: raw.broadcastId,
      batchNumber: raw.batchNumber,
      status: raw.status,
      processed: raw.processed,
      succeeded: raw.succeeded,
      failed: raw.failed,
      recipientIds: Object.freeze([...(raw.recipientIds ?? [])]),
      startedAt: toIso(raw.startedAt),
      completedAt: toIso(raw.completedAt),
      createdAt: toIsoRequired(raw.createdAt),
      updatedAt: toIsoRequired(raw.updatedAt),
    };
  }

  static toPersistence(row: BroadcastBatchRow): Record<string, unknown> {
    return {
      id: row.id,
      broadcastId: row.broadcastId,
      batchNumber: row.batchNumber,
      status: row.status,
      processed: row.processed,
      succeeded: row.succeeded,
      failed: row.failed,
      recipientIds: [...row.recipientIds],
      startedAt: row.startedAt ? new Date(row.startedAt) : null,
      completedAt: row.completedAt ? new Date(row.completedAt) : null,
    };
  }
}
