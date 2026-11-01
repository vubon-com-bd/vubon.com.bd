/**
 * NotificationPrismaRepository — implements NotificationRepository
 * @module notification-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  NotificationRepository,
  NotificationListOptions,
  NotificationListFilter,
  NotificationPaginationResult,
  NotificationStats,
} from '@domain/repositories/notification.repository.interface.js';
import { NOTIFICATION_REPOSITORY } from '@domain/repositories/notification.repository.interface.js';
import { NotificationEntity } from '@domain/entities/notification.entity.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';

import {
  NotificationBasePrismaRepository,
  type PrismaDelegate,
} from '@infrastructure/persistence/prisma/base.prisma.repository.js';
import type { PrismaNotification } from '@infrastructure/persistence/prisma/prisma.client.js';
import { NotificationPrismaMapper } from '@infrastructure/persistence/prisma/mappers/notification.prisma.mapper.js';

const MODEL_NAME = 'notification';

@Injectable()
export class NotificationPrismaRepository
  extends NotificationBasePrismaRepository
  implements NotificationRepository
{
  private readonly logger = new Logger(NotificationPrismaRepository.name);

  private get delegate(): PrismaDelegate<PrismaNotification> {
    return this.model<PrismaNotification>(MODEL_NAME);
  }

  // ═══════════════ Base CRUD ═══════════════
  async findById(id: string): Promise<NotificationEntity | null> {
    return this.findByIdVO(NotificationIdVO.reconstitute(id));
  }

  async findByIdVO(id: NotificationIdVO): Promise<NotificationEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return raw ? NotificationPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly NotificationEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => NotificationPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async save(entity: NotificationEntity): Promise<NotificationEntity> {
    const data = NotificationPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });

    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return NotificationPrismaMapper.toDomain(updated);
    }

    const created = await this.delegate.create({ data: data as never });
    return NotificationPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async softDelete(id: string, deletedBy?: string): Promise<void> {
    await this.delegate.update({
      where: { id },
      data: { deletedAt: new Date() } as never,
    });
    this.logger.debug(`Notification ${id} soft-deleted by ${deletedBy ?? 'system'}`);
  }

  // ═══════════════ Custom queries ═══════════════
  async findByUser(userId: UserIdVO | string): Promise<readonly NotificationEntity[]> {
    const uid = typeof userId === 'string' ? userId : userId.value;
    const rows = await this.delegate.findMany({
      where: { userId: uid, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => NotificationPrismaMapper.toDomain(r));
  }

  async findByStatus(status: string): Promise<readonly NotificationEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => NotificationPrismaMapper.toDomain(r));
  }

  async findByChannel(channel: string): Promise<readonly NotificationEntity[]> {
    const rows = await this.delegate.findMany({
      where: { channel, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => NotificationPrismaMapper.toDomain(r));
  }

  async findPaginated(options: NotificationListOptions): Promise<NotificationPaginationResult> {
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
      items: rows.map((r) => NotificationPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async findUnreadForUser(
    userId: string,
    limit = 50,
  ): Promise<readonly NotificationEntity[]> {
    const rows = await this.delegate.findMany({
      where: { userId, readStatus: 'unread', deletedAt: null },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return rows.map((r) => NotificationPrismaMapper.toDomain(r));
  }

  async findScheduledBefore(cutoff: string): Promise<readonly NotificationEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        status: 'scheduled',
        scheduledAt: { lte: new Date(cutoff) },
        deletedAt: null,
      },
      orderBy: { scheduledAt: 'asc' },
    });
    return rows.map((r) => NotificationPrismaMapper.toDomain(r));
  }

  async findExpiredBefore(cutoff: string): Promise<readonly NotificationEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        expiresAt: { lte: new Date(cutoff) },
        status: { notIn: ['delivered', 'cancelled', 'archived'] },
        deletedAt: null,
      },
    });
    return rows.map((r) => NotificationPrismaMapper.toDomain(r));
  }

  async findStale(olderThanMinutes: number): Promise<readonly NotificationEntity[]> {
    const cutoff = new Date(Date.now() - olderThanMinutes * 60_000);
    const rows = await this.delegate.findMany({
      where: {
        status: 'sending',
        updatedAt: { lte: cutoff },
        deletedAt: null,
      },
    });
    return rows.map((r) => NotificationPrismaMapper.toDomain(r));
  }

  async findRetryable(maxAttempts: number): Promise<readonly NotificationEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        status: 'failed',
        deliveryAttempts: { lt: maxAttempts },
        deletedAt: null,
      },
      orderBy: { createdAt: 'asc' },
    });
    return rows.map((r) => NotificationPrismaMapper.toDomain(r));
  }

  // ═══════════════ Stats ═══════════════
  async countUnreadForUser(userId: string): Promise<number> {
    return this.delegate.count({
      where: { userId, readStatus: 'unread', deletedAt: null },
    });
  }

  async getStats(
    userId?: string,
    fromDate?: string,
    toDate?: string,
  ): Promise<NotificationStats> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (userId) where['userId'] = userId;
    if (fromDate || toDate) {
      where['createdAt'] = {
        ...(fromDate ? { gte: new Date(fromDate) } : {}),
        ...(toDate ? { lte: new Date(toDate) } : {}),
      };
    }

    const rows = (await this.delegate.findMany({
      where: where as never,
      select: {
        status: true,
        channel: true,
        priority: true,
        readStatus: true,
      },
    })) as Array<{
      status: string;
      channel: string;
      priority: string;
      readStatus: string;
    }>;

    const byStatus: Record<string, number> = {};
    const byChannel: Record<string, number> = {};
    const byPriority: Record<string, number> = {};
    let unreadCount = 0;

    for (const r of rows) {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      byChannel[r.channel] = (byChannel[r.channel] ?? 0) + 1;
      byPriority[r.priority] = (byPriority[r.priority] ?? 0) + 1;
      if (r.readStatus === 'unread') unreadCount++;
    }

    return {
      total: rows.length,
      unreadCount,
      byStatus,
      byChannel,
      byPriority,
    };
  }

  async markAllAsRead(userId: string, readAt: string): Promise<number> {
    const result = await this.delegate.updateMany({
      where: { userId, readStatus: 'unread', deletedAt: null },
      data: { readStatus: 'read', readAt: new Date(readAt) } as never,
    });
    return (result as { count: number }).count;
  }

  async purgeOlderThan(cutoff: string): Promise<number> {
    const result = await this.delegate.deleteMany({
      where: { createdAt: { lt: new Date(cutoff) } },
    });
    return (result as { count: number }).count;
  }

  // ═══════════════ Helpers ═══════════════
  private buildWhere(filter?: NotificationListFilter): Record<string, unknown> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (!filter) return where;

    if (filter.userId) where['userId'] = filter.userId;
    if (filter.type) where['type'] = filter.type;
    if (filter.category) where['category'] = filter.category;
    if (filter.channel) where['channel'] = filter.channel;
    if (filter.status) where['status'] = filter.status;
    if (filter.priority) where['priority'] = filter.priority;
    if (filter.isRead !== undefined) {
      where['readStatus'] = filter.isRead ? 'read' : 'unread';
    }
    if (filter.fromDate || filter.toDate) {
      where['createdAt'] = {
        ...(filter.fromDate ? { gte: new Date(filter.fromDate) } : {}),
        ...(filter.toDate ? { lte: new Date(filter.toDate) } : {}),
      };
    }
    return where;
  }

  static readonly _token = NOTIFICATION_REPOSITORY;
}
