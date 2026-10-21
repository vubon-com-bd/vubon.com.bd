/**
 * WebhookEventPrismaMapper — Pure row type (no domain entity yet)
 * @module payment-service/infrastructure/persistence/prisma/mappers
 *
 * Webhook events are persisted for idempotency + replay.
 * Domain doesn't have a WebhookEventEntity (yet) — repository returns row shape.
 */
import { toIso } from './payment.prisma.mapper.js';

export interface PrismaWebhookEventRow {
  id: string;
  paymentId: string | null;
  provider: string;
  eventType: string;
  externalId: string | null;
  signature: string | null;
  payload: unknown;
  status: string;
  processedAt: Date | null;
  failureReason: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface WebhookEventRecord {
  readonly id: string;
  readonly paymentId: string | null;
  readonly provider: string;
  readonly eventType: string;
  readonly externalId: string | null;
  readonly signature: string | null;
  readonly payload: Readonly<Record<string, unknown>>;
  readonly status: string;
  readonly processedAt: string | undefined;
  readonly failureReason: string | undefined;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | undefined;
}

export class WebhookEventPrismaMapper {
  static toRecord(raw: PrismaWebhookEventRow): WebhookEventRecord {
    return {
      id: raw.id,
      paymentId: raw.paymentId,
      provider: raw.provider,
      eventType: raw.eventType,
      externalId: raw.externalId,
      signature: raw.signature,
      payload: (raw.payload as Readonly<Record<string, unknown>>) ?? {},
      status: raw.status,
      processedAt: toIso(raw.processedAt),
      failureReason: raw.failureReason ?? undefined,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: toIso(raw.deletedAt),
    };
  }

  static toPersistence(record: WebhookEventRecord): Record<string, unknown> {
    return {
      id: record.id,
      paymentId: record.paymentId,
      provider: record.provider,
      eventType: record.eventType,
      externalId: record.externalId,
      signature: record.signature,
      payload: record.payload,
      status: record.status,
      processedAt: record.processedAt ? new Date(record.processedAt) : null,
      failureReason: record.failureReason ?? null,
      updatedAt: new Date(record.updatedAt),
    };
  }
}
