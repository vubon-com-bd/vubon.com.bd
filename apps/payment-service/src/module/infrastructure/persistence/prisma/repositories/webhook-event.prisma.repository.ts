/**
 * WebhookEventPrismaRepository — pure record persistence (no domain entity)
 * @module payment-service/infrastructure/persistence/prisma/repositories
 *
 * Persists incoming gateway webhooks for idempotency + replay.
 */
import { Injectable } from '@nestjs/common';
import { PaymentPrismaService, PAYMENT_MODELS } from '../prisma.service.js';
import {
  WebhookEventPrismaMapper,
  type PrismaWebhookEventRow,
  type WebhookEventRecord,
} from '../mappers/webhook-event.prisma.mapper.js';

interface PrismaDelegate {
  findFirst(args: unknown): Promise<PrismaWebhookEventRow | null>;
  findUnique(args: unknown): Promise<PrismaWebhookEventRow | null>;
  findMany(args?: unknown): Promise<PrismaWebhookEventRow[]>;
  create(args: unknown): Promise<PrismaWebhookEventRow>;
  update(args: unknown): Promise<PrismaWebhookEventRow>;
  delete(args: unknown): Promise<PrismaWebhookEventRow>;
  count(args?: unknown): Promise<number>;
}

export interface WebhookEventListOptions {
  readonly page: number;
  readonly limit: number;
  readonly filter?: {
    readonly provider?: string;
    readonly paymentId?: string;
    readonly status?: string;
    readonly eventType?: string;
  };
}

export interface WebhookEventPaginationResult {
  readonly items: readonly WebhookEventRecord[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

@Injectable()
export class WebhookEventPrismaRepository {
  constructor(private readonly prisma: PaymentPrismaService) {}

  private get delegate(): PrismaDelegate {
    return this.prisma.getPaymentModel<PrismaDelegate>(PAYMENT_MODELS.webhookEvent);
  }

  async findById(id: string): Promise<WebhookEventRecord | null> {
    const raw = await this.delegate.findFirst({
      where: { id, deletedAt: null },
    });
    return raw ? WebhookEventPrismaMapper.toRecord(raw) : null;
  }

  async findByExternalId(
    provider: string,
    externalId: string,
  ): Promise<WebhookEventRecord | null> {
    const raw = await this.delegate.findFirst({
      where: { provider, externalId, deletedAt: null },
    });
    return raw ? WebhookEventPrismaMapper.toRecord(raw) : null;
  }

  async findByPayment(paymentId: string): Promise<readonly WebhookEventRecord[]> {
    const rows = await this.delegate.findMany({
      where: { paymentId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => WebhookEventPrismaMapper.toRecord(r));
  }

  async save(record: WebhookEventRecord): Promise<WebhookEventRecord> {
    const data = WebhookEventPrismaMapper.toPersistence(record);
    const existing = await this.delegate.findUnique({
      where: { id: record.id },
      select: { id: true } as unknown as PrismaWebhookEventRow,
    });
    if (existing) {
      const updated = await this.delegate.update({
        where: { id: record.id },
        data: data as never,
      });
      return WebhookEventPrismaMapper.toRecord(updated);
    }
    const created = await this.delegate.create({ data: data as never });
    return WebhookEventPrismaMapper.toRecord(created);
  }

  async findPaginated(
    options: WebhookEventListOptions,
  ): Promise<WebhookEventPaginationResult> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.provider) where['provider'] = f.provider;
    if (f.paymentId) where['paymentId'] = f.paymentId;
    if (f.status) where['status'] = f.status;
    if (f.eventType) where['eventType'] = f.eventType;
    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where: where as never,
        orderBy: { createdAt: 'desc' },
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.delegate.count({ where: where as never }),
    ]);
    return {
      items: rows.map((r) => WebhookEventPrismaMapper.toRecord(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async purgeOlderThan(days: number): Promise<number> {
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const result = await this.delegate.findMany({
      where: { createdAt: { lt: cutoff } } as never,
      select: { id: true } as never,
    });
    return result.length;
  }
}
