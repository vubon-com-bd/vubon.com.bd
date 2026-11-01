/**
 * BroadcastPrismaRepository — implements BroadcastRepository
 * @module notification-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  BroadcastRepository,
  BroadcastListOptions,
  BroadcastListFilter,
  BroadcastPaginationResult,
  BroadcastStats,
} from '@domain/repositories/broadcast.repository.interface.js';
import { BROADCAST_REPOSITORY } from '@domain/repositories/broadcast.repository.interface.js';
import { BroadcastEntity } from '@domain/entities/broadcast.entity.js';
import { BroadcastIdVO } from '@domain/primitives/broadcast-id.vo.js';

import {
  NotificationBasePrismaRepository,
  type PrismaDelegate,
} from '@infrastructure/persistence/prisma/base.prisma.repository.js';
import type { PrismaNotificationBroadcast } from '@infrastructure/persistence/prisma/prisma.client.js';
import { BroadcastPrismaMapper } from '@infrastructure/persistence/prisma/mappers/broadcast.prisma.mapper.js';

const MODEL_NAME = 'notificationBroadcast';

@Injectable()
export class BroadcastPrismaRepository
  extends NotificationBasePrismaRepository
  implements BroadcastRepository
{
  private readonly logger = new Logger(BroadcastPrismaRepository.name);

  private get delegate(): PrismaDelegate<PrismaNotificationBroadcast> {
    return this.model<PrismaNotificationBroadcast>(MODEL_NAME);
  }

  async findById(id: string): Promise<BroadcastEntity | null> {
    return this.findByIdVO(BroadcastIdVO.reconstitute(id));
  }

  async findByIdVO(id: BroadcastIdVO): Promise<BroadcastEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return raw ? BroadcastPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly BroadcastEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => BroadcastPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async save(entity: BroadcastEntity): Promise<BroadcastEntity> {
    const data = BroadcastPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });

    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return BroadcastPrismaMapper.toDomain(updated);
    }

    const created = await this.delegate.create({ data: data as never });
    return BroadcastPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async softDelete(id: string, deletedBy?: string): Promise<void> {
    await this.delegate.update({
      where: { id },
      data: { deletedAt: new Date() } as never,
    });
    this.logger.debug(`Broadcast ${id} soft-deleted by ${deletedBy ?? 'system'}`);
  }

  async findByStatus(status: string): Promise<readonly BroadcastEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => BroadcastPrismaMapper.toDomain(r));
  }

  async findByCreator(userId: string): Promise<readonly BroadcastEntity[]> {
    const rows = await this.delegate.findMany({
      where: { createdBy: userId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => BroadcastPrismaMapper.toDomain(r));
  }

  async findPaginated(options: BroadcastListOptions): Promise<BroadcastPaginationResult> {
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
      items: rows.map((r) => BroadcastPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async findDue(now: string): Promise<readonly BroadcastEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        status: 'scheduled',
        scheduledAt: { lte: new Date(now) },
        deletedAt: null,
      },
      orderBy: { scheduledAt: 'asc' },
    });
    return rows.map((r) => BroadcastPrismaMapper.toDomain(r));
  }

  async findInProgress(): Promise<readonly BroadcastEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: 'sending', deletedAt: null },
    });
    return rows.map((r) => BroadcastPrismaMapper.toDomain(r));
  }

  async findPendingApproval(): Promise<readonly BroadcastEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        status: 'draft',
        approvedBy: null,
        deletedAt: null,
      },
    });
    return rows.map((r) => BroadcastPrismaMapper.toDomain(r));
  }

  async countInProgress(): Promise<number> {
    return this.delegate.count({
      where: { status: 'sending', deletedAt: null },
    });
  }

  async getStats(fromDate?: string, toDate?: string): Promise<BroadcastStats> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (fromDate || toDate) {
      where['createdAt'] = {
        ...(fromDate ? { gte: new Date(fromDate) } : {}),
        ...(toDate ? { lte: new Date(toDate) } : {}),
      };
    }

    const rows = (await this.delegate.findMany({
      where: where as never,
      select: { status: true, type: true, totalRecipients: true, succeeded: true, failed: true },
    })) as Array<{
      status: string;
      type: string;
      totalRecipients: number | null;
      succeeded: number | null;
      failed: number | null;
    }>;

    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    let totalRecipients = 0;
    let totalSent = 0;
    let totalFailed = 0;

    for (const r of rows) {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      byType[r.type] = (byType[r.type] ?? 0) + 1;
      totalRecipients += r.totalRecipients ?? 0;
      totalSent += r.succeeded ?? 0;
      totalFailed += r.failed ?? 0;
    }

    return {
      total: rows.length,
      totalRecipients,
      totalSent,
      totalFailed,
      byStatus,
      byType,
    };
  }

  async purgeCompletedOlderThan(cutoff: string): Promise<number> {
    const result = await this.delegate.deleteMany({
      where: {
        status: { in: ['sent', 'partially_sent', 'cancelled'] },
        updatedAt: { lt: new Date(cutoff) },
      },
    });
    return (result as { count: number }).count;
  }

  private buildWhere(filter?: BroadcastListFilter): Record<string, unknown> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (!filter) return where;

    if (filter.type) where['type'] = filter.type;
    if (filter.status) where['status'] = filter.status;
    if (filter.target) where['target'] = filter.target;
    if (filter.createdBy) where['createdBy'] = filter.createdBy;
    if (filter.fromDate || filter.toDate) {
      where['createdAt'] = {
        ...(filter.fromDate ? { gte: new Date(filter.fromDate) } : {}),
        ...(filter.toDate ? { lte: new Date(filter.toDate) } : {}),
      };
    }
    return where;
  }

  static readonly _token = BROADCAST_REPOSITORY;
}
