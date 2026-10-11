/**
 * WebhookPrismaRepository — implements WebhookRepository
 * @module notification-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  WebhookRepository,
  WebhookListOptions,
  WebhookPaginationResult,
} from '../../../../domain/repositories/webhook.repository.interface.js';
import { WebhookEntity } from '../../../../domain/entities/webhook.entity.js';
import { WebhookIdVO } from '../../../../domain/value-objects/primitives/webhook-id.vo.js';
import { WebhookStatusVO } from '../../../../domain/value-objects/primitives/webhook-status.vo.js';
import { WebhookEventVO } from '../../../../domain/value-objects/primitives/webhook-event.vo.js';
import { WebhookPrismaMapper } from '../mappers/webhook.prisma.mapper.js';

@Injectable()
export class WebhookPrismaRepository implements WebhookRepository {
  private readonly logger = new Logger(WebhookPrismaRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<WebhookEntity | null> {
    return this.findByIdVO(WebhookIdVO.reconstitute(id));
  }

  async findByIdVO(id: WebhookIdVO): Promise<WebhookEntity | null> {
    const row = await this.prisma.notificationWebhook.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return row ? WebhookPrismaMapper.toDomain(row) : null;
  }

  async findAll(): Promise<readonly WebhookEntity[]> {
    const rows = await this.prisma.notificationWebhook.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => WebhookPrismaMapper.toDomain(r));
  }

  async findByStatus(status: WebhookStatusVO): Promise<readonly WebhookEntity[]> {
    const rows = await this.prisma.notificationWebhook.findMany({
      where: { status: status.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => WebhookPrismaMapper.toDomain(r));
  }

  async findByEvent(event: WebhookEventVO): Promise<readonly WebhookEntity[]> {
    const rows = await this.prisma.notificationWebhook.findMany({
      where: {
        deletedAt: null,
        status: 'active',
        events: { has: event.value },
      },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => WebhookPrismaMapper.toDomain(r));
  }

  async findPaginated(options: WebhookListOptions): Promise<WebhookPaginationResult> {
    const where = this.buildWhere(options);
    const orderBy: Record<string, 'asc' | 'desc'> = {
      [options.sortBy ?? 'createdAt']: options.sortDir ?? 'desc',
    };

    const [rows, total] = await Promise.all([
      this.prisma.notificationWebhook.findMany({
        where,
        orderBy,
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.prisma.notificationWebhook.count({ where }),
    ]);

    return {
      items: rows.map((r) => WebhookPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async findAllActive(): Promise<readonly WebhookEntity[]> {
    const rows = await this.prisma.notificationWebhook.findMany({
      where: { status: 'active', deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => WebhookPrismaMapper.toDomain(r));
  }

  async countActive(): Promise<number> {
    return this.prisma.notificationWebhook.count({
      where: { status: 'active', deletedAt: null },
    });
  }

  async findWithHighFailureCount(threshold: number): Promise<readonly WebhookEntity[]> {
    const rows = await this.prisma.notificationWebhook.findMany({
      where: {
        failureCount: { gte: threshold },
        status: 'active',
        deletedAt: null,
      },
      orderBy: { failureCount: 'desc' },
    });
    return rows.map((r) => WebhookPrismaMapper.toDomain(r));
  }

  async save(entity: WebhookEntity): Promise<WebhookEntity> {
    const data = WebhookPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.notificationWebhook.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });

    if (existing) {
      const updated = await this.prisma.notificationWebhook.update({
        where: { id: entity.id },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: data as any,
      });
      return WebhookPrismaMapper.toDomain(updated);
    }

    const created = await this.prisma.notificationWebhook.create({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: data as any,
    });
    return WebhookPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.notificationWebhook.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.notificationWebhook.count({ where: { id } });
    return count > 0;
  }

  private buildWhere(options: WebhookListOptions): Record<string, unknown> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.status) where['status'] = f.status;
    if (f.event) where['events'] = { has: f.event };
    if (f.search) {
      where['OR'] = [
        { url: { contains: f.search, mode: 'insensitive' } },
        { description: { contains: f.search, mode: 'insensitive' } },
      ];
    }
    return where;
  }
}
