/**
 * WebhookEventPrismaRepository — implements WebhookEventRepository
 * @module payment-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  WebhookEventRepository,
  WebhookEventListOptions,
  WebhookEventPaginationResult,
} from '../../../../domain/repositories/webhook-event.repository.interface.js';
import { WebhookEventEntity } from '../../../../domain/entities/webhook-event.entity.js';
import { PaymentIdVO } from '../../../../domain/value-objects/primitives/payment-id.vo.js';
import { WebhookPrismaMapper } from '../webhook.prisma.mapper.js';

@Injectable()
export class WebhookEventPrismaRepository implements WebhookEventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<WebhookEventEntity | null> {
    const row = await this.prisma.webhookEvent.findFirst({
      where: { id, deletedAt: null },
    });
    return row ? WebhookPrismaMapper.toDomain(row as unknown as Record<string, unknown>) : null;
  }

  async findAll(): Promise<readonly WebhookEventEntity[]> {
    const rows = await this.prisma.webhookEvent.findMany({
      where: { deletedAt: null },
      orderBy: { receivedAt: 'desc' },
    });
    return rows.map((r) => WebhookPrismaMapper.toDomain(r as unknown as Record<string, unknown>));
  }

  async findByGatewayEventId(
    gateway: string,
    gatewayEventId: string,
  ): Promise<WebhookEventEntity | null> {
    const row = await this.prisma.webhookEvent.findFirst({
      where: { gateway, gatewayEventId, deletedAt: null },
    });
    return row ? WebhookPrismaMapper.toDomain(row as unknown as Record<string, unknown>) : null;
  }

  async existsByGatewayEventId(gateway: string, gatewayEventId: string): Promise<boolean> {
    const count = await this.prisma.webhookEvent.count({
      where: { gateway, gatewayEventId },
    });
    return count > 0;
  }

  async findByPaymentId(paymentId: PaymentIdVO): Promise<readonly WebhookEventEntity[]> {
    const rows = await this.prisma.webhookEvent.findMany({
      where: { paymentId: paymentId.value, deletedAt: null },
      orderBy: { receivedAt: 'desc' },
    });
    return rows.map((r) => WebhookPrismaMapper.toDomain(r as unknown as Record<string, unknown>));
  }

  async findUnprocessed(limit = 50): Promise<readonly WebhookEventEntity[]> {
    const rows = await this.prisma.webhookEvent.findMany({
      where: {
        processed: false,
        verified: true,
        attempts: { lt: 5 },
        deletedAt: null,
      },
      orderBy: { receivedAt: 'asc' },
      take: limit,
    });
    return rows.map((r) => WebhookPrismaMapper.toDomain(r as unknown as Record<string, unknown>));
  }

  async save(entity: WebhookEventEntity): Promise<WebhookEventEntity> {
    const data = WebhookPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.webhookEvent.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });

    if (existing) {
      const updated = await this.prisma.webhookEvent.update({
        where: { id: entity.id },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: data as any,
      });
      return WebhookPrismaMapper.toDomain(updated as unknown as Record<string, unknown>);
    }

    const created = await this.prisma.webhookEvent.create({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: data as any,
    });
    return WebhookPrismaMapper.toDomain(created as unknown as Record<string, unknown>);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.webhookEvent.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.webhookEvent.count({ where: { id } });
    return count > 0;
  }

  async findPaginated(
    options: WebhookEventListOptions,
  ): Promise<WebhookEventPaginationResult> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.gateway) where['gateway'] = f.gateway;
    if (f.eventType) where['eventType'] = f.eventType;
    if (f.processed !== undefined) where['processed'] = f.processed;
    if (f.verified !== undefined) where['verified'] = f.verified;
    if (f.paymentId) where['paymentId'] = f.paymentId;
    if (f.fromDate || f.toDate) {
      where['receivedAt'] = {
        ...(f.fromDate ? { gte: new Date(f.fromDate) } : {}),
        ...(f.toDate ? { lte: new Date(f.toDate) } : {}),
      };
    }

    const dir = options.sortDir ?? 'desc';

    const [rows, total] = await Promise.all([
      this.prisma.webhookEvent.findMany({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        where: where as any,
        orderBy: { receivedAt: dir },
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.prisma.webhookEvent.count({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        where: where as any,
      }),
    ]);

    return {
      items: rows.map((r) => WebhookPrismaMapper.toDomain(r as unknown as Record<string, unknown>)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async countUnprocessed(): Promise<number> {
    return this.prisma.webhookEvent.count({
      where: { processed: false, deletedAt: null },
    });
  }

  async findProcessedOlderThan(days: number): Promise<readonly WebhookEventEntity[]> {
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const rows = await this.prisma.webhookEvent.findMany({
      where: {
        processed: true,
        processedAt: { lt: cutoff },
        deletedAt: null,
      },
    });
    return rows.map((r) => WebhookPrismaMapper.toDomain(r as unknown as Record<string, unknown>));
  }
}
