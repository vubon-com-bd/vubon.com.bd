/**
 * WebhookPrismaRepository — implements WebhookRepository
 * @module notification-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  WebhookRepository,
  WebhookListOptions,
  WebhookListFilter,
  WebhookPaginationResult,
  WebhookStats,
} from '@domain/repositories/webhook.repository.interface.js';
import { WEBHOOK_REPOSITORY } from '@domain/repositories/webhook.repository.interface.js';
import { WebhookEntity } from '@domain/entities/webhook.entity.js';
import { WebhookIdVO } from '@domain/primitives/webhook-id.vo.js';

import {
  NotificationBasePrismaRepository,
  type PrismaDelegate,
} from '@infrastructure/persistence/prisma/base.prisma.repository.js';
import type { PrismaNotificationWebhook } from '@infrastructure/persistence/prisma/prisma.client.js';
import { WebhookPrismaMapper } from '@infrastructure/persistence/prisma/mappers/webhook.prisma.mapper.js';

const MODEL_NAME = 'notificationWebhook';

@Injectable()
export class WebhookPrismaRepository
  extends NotificationBasePrismaRepository
  implements WebhookRepository
{
  private readonly logger = new Logger(WebhookPrismaRepository.name);

  private get delegate(): PrismaDelegate<PrismaNotificationWebhook> {
    return this.model<PrismaNotificationWebhook>(MODEL_NAME);
  }

  async findById(id: string): Promise<WebhookEntity | null> {
    return this.findByIdVO(WebhookIdVO.reconstitute(id));
  }

  async findByIdVO(id: WebhookIdVO): Promise<WebhookEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return raw ? WebhookPrismaMapper.toDomain(raw) : null;
  }

  async findByUrl(url: string): Promise<WebhookEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { url, deletedAt: null },
    });
    return raw ? WebhookPrismaMapper.toDomain(raw) : null;
  }

  async findByStatus(status: string): Promise<readonly WebhookEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status, deletedAt: null },
    });
    return rows.map((r) => WebhookPrismaMapper.toDomain(r));
  }

  async findByEvent(event: string): Promise<readonly WebhookEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        events: { has: event },
        deletedAt: null,
      },
    });
    return rows.map((r) => WebhookPrismaMapper.toDomain(r));
  }

  async findActiveSubscribers(event: string): Promise<readonly WebhookEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        status: 'active',
        events: { has: event },
        deletedAt: null,
      },
    });
    return rows.map((r) => WebhookPrismaMapper.toDomain(r));
  }

  async findAll(): Promise<readonly WebhookEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => WebhookPrismaMapper.toDomain(r));
  }

  async findPaginated(options: WebhookListOptions): Promise<WebhookPaginationResult> {
    const where = this.buildWhere(options.filter);
    const orderBy = { [options.sortBy ?? 'createdAt']: options.sortDir ?? 'desc' };

    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where,
        orderBy: orderBy as never,
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.delegate.count({ where }),
    ]);

    return {
      items: rows.map((r) => WebhookPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async countActive(): Promise<number> {
    return this.delegate.count({
      where: { status: 'active', deletedAt: null },
    });
  }

  async getStats(): Promise<WebhookStats> {
    const rows = (await this.delegate.findMany({
      where: { deletedAt: null },
      select: { status: true },
    })) as Array<{ status: string }>;

    const byStatus: Record<string, number> = {};
    let activeCount = 0;
    let failedCount = 0;

    for (const r of rows) {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      if (r.status === 'active') activeCount++;
      if (r.status === 'failed') failedCount++;
    }

    return {
      total: rows.length,
      activeCount,
      failedCount,
      byStatus,
      byType: {},
    };
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async save(entity: WebhookEntity): Promise<WebhookEntity> {
    const data = WebhookPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });

    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return WebhookPrismaMapper.toDomain(updated);
    }

    const created = await this.delegate.create({ data: data as never });
    return WebhookPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async softDelete(id: string, deletedBy?: string): Promise<void> {
    await this.delegate.update({
      where: { id },
      data: { deletedAt: new Date() } as never,
    });
    this.logger.debug(`Webhook ${id} soft-deleted by ${deletedBy ?? 'system'}`);
  }

  async purgeDisabledOlderThan(cutoff: string): Promise<number> {
    const result = await this.delegate.deleteMany({
      where: {
        status: 'disabled',
        updatedAt: { lt: new Date(cutoff) },
      },
    });
    return (result as { count: number }).count;
  }

  private buildWhere(filter?: WebhookListFilter): Record<string, unknown> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (!filter) return where;

    if (filter.status) where['status'] = filter.status;
    if (filter.url) where['url'] = filter.url;
    if (filter.event) where['events'] = { has: filter.event };
    if (filter.fromDate || filter.toDate) {
      where['createdAt'] = {
        ...(filter.fromDate ? { gte: new Date(filter.fromDate) } : {}),
        ...(filter.toDate ? { lte: new Date(filter.toDate) } : {}),
      };
    }
    return where;
  }

  static readonly _token = WEBHOOK_REPOSITORY;
}
