/**
 * WebhookEventRecord In-Memory Repository — standalone class
 * @module payment-service/infrastructure/persistence/memory/repositories
 *
 * WebhookEvent is a custom record (no domain interface).
 * This class mirrors the public surface of WebhookEventPrismaRepository.
 */
import { Injectable } from '@nestjs/common';
import type { WebhookEventRecord } from '../../../../infrastructure/persistence/prisma/mappers/webhook-event.prisma.mapper.js';

interface WebhookEventListOptions {
  readonly page: number;
  readonly limit: number;
  readonly filter?: {
    readonly provider?: string;
    readonly paymentId?: string;
    readonly status?: string;
    readonly eventType?: string;
  };
}

interface WebhookEventPaginationResult {
  readonly items: readonly WebhookEventRecord[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

@Injectable()
export class InMemoryWebhookEventRepository {
  private readonly store = new Map<string, WebhookEventRecord>();

  async findById(id: string): Promise<WebhookEventRecord | null> {
    return this.store.get(id) ?? null;
  }

  async findByExternalId(
    provider: string,
    externalId: string,
  ): Promise<WebhookEventRecord | null> {
    for (const e of this.store.values()) {
      if (e.provider === provider && e.externalId === externalId) return e;
    }
    return null;
  }

  async findByPayment(paymentId: string): Promise<readonly WebhookEventRecord[]> {
    return [...this.store.values()].filter((e) => e.paymentId === paymentId);
  }

  async save(record: WebhookEventRecord): Promise<WebhookEventRecord> {
    this.store.set(record.id, record);
    return record;
  }

  async findPaginated(
    options: WebhookEventListOptions,
  ): Promise<WebhookEventPaginationResult> {
    let items = [...this.store.values()];
    const f = options.filter ?? {};
    if (f.provider) items = items.filter((e) => e.provider === f.provider);
    if (f.paymentId) items = items.filter((e) => e.paymentId === f.paymentId);
    if (f.status) items = items.filter((e) => e.status === f.status);
    if (f.eventType) items = items.filter((e) => e.eventType === f.eventType);

    const start = (options.page - 1) * options.limit;
    return {
      items: items.slice(start, start + options.limit),
      total: items.length,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(items.length / options.limit),
    };
  }

  async purgeOlderThan(days: number): Promise<number> {
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
    let count = 0;
    for (const [id, e] of this.store.entries()) {
      if (Date.parse(e.createdAt) < cutoff) {
        this.store.delete(id);
        count++;
      }
    }
    return count;
  }
}
