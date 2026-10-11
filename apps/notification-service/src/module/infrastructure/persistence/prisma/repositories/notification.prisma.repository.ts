/**
 * NotificationPrismaRepository — implements NotificationRepository
 * @module notification-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  NotificationRepository,
  NotificationListOptions,
  NotificationPaginationResult,
  NotificationStats,
} from '../../../../domain/repositories/notification.repository.interface.js';
import { NotificationEntity } from '../../../../domain/entities/notification.entity.js';
import { NotificationIdVO } from '../../../../domain/value-objects/primitives/notification-id.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { NotificationStatusVO } from '../../../../domain/value-objects/primitives/notification-status.vo.js';
import { NotificationChannelVO } from '../../../../domain/value-objects/primitives/notification-channel.vo.js';
import { NotificationTypeVO } from '../../../../domain/value-objects/primitives/notification-type.vo.js';
import { NotificationCategoryVO } from '../../../../domain/value-objects/primitives/notification-category.vo.js';
import { ReadStatusVO } from '../../../../domain/value-objects/primitives/read-status.vo.js';
import { NotificationPrismaMapper } from '../mappers/notification.prisma.mapper.js';

@Injectable()
export class NotificationPrismaRepository implements NotificationRepository {
  private readonly logger = new Logger(NotificationPrismaRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<NotificationEntity | null> {
    return this.findByIdVO(NotificationIdVO.reconstitute(id));
  }

  async findByIdVO(id: NotificationIdVO): Promise<NotificationEntity | null> {
    const row = await this.prisma.notification.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return row ? NotificationPrismaMapper.toDomain(row) : null;
  }

  async findAll(): Promise<readonly NotificationEntity[]> {
    const rows = await this.prisma.notification.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => NotificationPrismaMapper.toDomain(r));
  }

  async findByUserId(userId: UserIdVO): Promise<readonly NotificationEntity[]> {
    const rows = await this.prisma.notification.findMany({
      where: { userId: userId.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => NotificationPrismaMapper.toDomain(r));
  }

  async findByStatus(status: NotificationStatusVO): Promise<readonly NotificationEntity[]> {
    const rows = await this.prisma.notification.findMany({
      where: { status: status.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => NotificationPrismaMapper.toDomain(r));
  }

  async findByChannel(channel: NotificationChannelVO): Promise<readonly NotificationEntity[]> {
    const rows = await this.prisma.notification.findMany({
      where: { channel: channel.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => NotificationPrismaMapper.toDomain(r));
  }

  async findByType(type: NotificationTypeVO): Promise<readonly NotificationEntity[]> {
    const rows = await this.prisma.notification.findMany({
      where: { type: type.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => NotificationPrismaMapper.toDomain(r));
  }

  async findByCategory(category: NotificationCategoryVO): Promise<readonly NotificationEntity[]> {
    const rows = await this.prisma.notification.findMany({
      where: { category: category.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => NotificationPrismaMapper.toDomain(r));
  }

  async findByReadStatus(status: ReadStatusVO): Promise<readonly NotificationEntity[]> {
    const rows = await this.prisma.notification.findMany({
      where: { readStatus: status.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => NotificationPrismaMapper.toDomain(r));
  }

  async findUnreadByUserId(userId: UserIdVO): Promise<readonly NotificationEntity[]> {
    const rows = await this.prisma.notification.findMany({
      where: { userId: userId.value, readStatus: 'unread', deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => NotificationPrismaMapper.toDomain(r));
  }

  async findByReference(
    referenceType: string,
    referenceId: string,
  ): Promise<readonly NotificationEntity[]> {
    const rows = await this.prisma.notification.findMany({
      where: {
        deletedAt: null,
        // JSON path filter — Prisma raw JSON support
        AND: [
          { reference: { path: ['type'], equals: referenceType } as never },
          { reference: { path: ['id'], equals: referenceId } as never },
        ],
      },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => NotificationPrismaMapper.toDomain(r));
  }

  async findPaginated(options: NotificationListOptions): Promise<NotificationPaginationResult> {
    const where = this.buildWhere(options);
    const orderBy = this.buildOrderBy(options);

    const [rows, total] = await Promise.all([
      this.prisma.notification.findMany({
        where,
        orderBy,
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.prisma.notification.count({ where }),
    ]);

    return {
      items: rows.map((r) => NotificationPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async countUnread(userId: UserIdVO): Promise<number> {
    return this.prisma.notification.count({
      where: { userId: userId.value, readStatus: 'unread', deletedAt: null },
    });
  }

  async getStats(userId?: string, fromDate?: string, toDate?: string): Promise<NotificationStats> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (userId) where['userId'] = userId;
    if (fromDate || toDate) {
      where['createdAt'] = {
        ...(fromDate ? { gte: new Date(fromDate) } : {}),
        ...(toDate ? { lte: new Date(toDate) } : {}),
      };
    }

    const rows = await this.prisma.notification.findMany({
      where: where as never,
      select: { status: true, channel: true, category: true, readStatus: true },
    });

    let unread = 0;
    const byStatus: Record<string, number> = {};
    const byChannel: Record<string, number> = {};
    const byCategory: Record<string, number> = {};

    for (const r of rows) {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      byChannel[r.channel] = (byChannel[r.channel] ?? 0) + 1;
      byCategory[r.category] = (byCategory[r.category] ?? 0) + 1;
      if (r.readStatus === 'unread') unread++;
    }

    return { total: rows.length, unread, byChannel, byStatus, byCategory };
  }

  async findStalePending(olderThanMinutes: number): Promise<readonly NotificationEntity[]> {
    const cutoff = new Date(Date.now() - olderThanMinutes * 60 * 1000);
    const rows = await this.prisma.notification.findMany({
      where: {
        status: { in: ['pending', 'queued'] },
        createdAt: { lt: cutoff },
        deletedAt: null,
      },
    });
    return rows.map((r) => NotificationPrismaMapper.toDomain(r));
  }

  async findDueScheduled(at: Date = new Date()): Promise<readonly NotificationEntity[]> {
    const rows = await this.prisma.notification.findMany({
      where: {
        status: 'scheduled',
        scheduledAt: { lte: at },
        deletedAt: null,
      },
    });
    return rows.map((r) => NotificationPrismaMapper.toDomain(r));
  }

  async findRetryable(maxAttempts: number): Promise<readonly NotificationEntity[]> {
    const rows = await this.prisma.notification.findMany({
      where: {
        status: 'failed',
        retryAttempts: { lt: maxAttempts },
        deletedAt: null,
      },
    });
    return rows.map((r) => NotificationPrismaMapper.toDomain(r));
  }

  async findExpired(at: Date = new Date()): Promise<readonly NotificationEntity[]> {
    const rows = await this.prisma.notification.findMany({
      where: {
        expiresAt: { lte: at },
        status: { notIn: ['expired', 'archived', 'delivered', 'cancelled'] },
        deletedAt: null,
      },
    });
    return rows.map((r) => NotificationPrismaMapper.toDomain(r));
  }

  async save(entity: NotificationEntity): Promise<NotificationEntity> {
    const data = NotificationPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.notification.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });

    if (existing) {
      const updated = await this.prisma.notification.update({
        where: { id: entity.id },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: data as any,
      });
      return NotificationPrismaMapper.toDomain(updated);
    }

    const created = await this.prisma.notification.create({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: data as any,
    });
    return NotificationPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.notification.delete({ where: { id } });
  }

  async softDelete(id: string, _deletedBy?: string): Promise<void> {
    await this.prisma.notification.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.notification.count({ where: { id } });
    return count > 0;
  }

  async markAllReadForUser(userId: UserIdVO): Promise<number> {
    const result = await this.prisma.notification.updateMany({
      where: { userId: userId.value, readStatus: 'unread', deletedAt: null },
      data: { readStatus: 'read', readAt: new Date() },
    });
    return result.count;
  }

  private buildWhere(options: NotificationListOptions): Record<string, unknown> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.userId) where['userId'] = f.userId;
    if (f.type) where['type'] = f.type;
    if (f.category) where['category'] = f.category;
    if (f.channel) where['channel'] = f.channel;
    if (f.status) where['status'] = f.status;
    if (f.priority) where['priority'] = f.priority;
    if (f.readStatus) where['readStatus'] = f.readStatus;
    if (f.fromDate || f.toDate) {
      where['createdAt'] = {
        ...(f.fromDate ? { gte: new Date(f.fromDate) } : {}),
        ...(f.toDate ? { lte: new Date(f.toDate) } : {}),
      };
    }
    if (f.search) {
      where['OR'] = [
        { title: { contains: f.search, mode: 'insensitive' } },
        { body: { contains: f.search, mode: 'insensitive' } },
      ];
    }
    return where;
  }

  private buildOrderBy(
    options: NotificationListOptions,
  ): Record<string, 'asc' | 'desc'> {
    const dir = options.sortDir ?? 'desc';
    const field = options.sortBy ?? 'createdAt';
    return { [field]: dir };
  }
}
