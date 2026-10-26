/**
 * SchedulePrismaRepository — implements ScheduleRepository
 * @module notification-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  ScheduleRepository,
  ScheduleListOptions,
  ScheduleListFilter,
  SchedulePaginationResult,
  ScheduleStats,
} from '@domain/repositories/schedule.repository.interface.js';
import { SCHEDULE_REPOSITORY } from '@domain/repositories/schedule.repository.interface.js';
import { ScheduleEntity } from '@domain/entities/schedule.entity.js';
import { ScheduleIdVO } from '@domain/primitives/schedule-id.vo.js';

import {
  NotificationBasePrismaRepository,
  type PrismaDelegate,
} from '@infrastructure/persistence/prisma/base.prisma.repository.js';
import type { PrismaNotificationSchedule } from '@infrastructure/persistence/prisma/prisma.client.js';
import { SchedulePrismaMapper } from '@infrastructure/persistence/prisma/mappers/schedule.prisma.mapper.js';

const MODEL_NAME = 'notificationSchedule';

@Injectable()
export class SchedulePrismaRepository
  extends NotificationBasePrismaRepository
  implements ScheduleRepository
{
  private readonly logger = new Logger(SchedulePrismaRepository.name);

  private get delegate(): PrismaDelegate<PrismaNotificationSchedule> {
    return this.model<PrismaNotificationSchedule>(MODEL_NAME);
  }

  async findById(id: string): Promise<ScheduleEntity | null> {
    return this.findByIdVO(ScheduleIdVO.reconstitute(id));
  }

  async findByIdVO(id: ScheduleIdVO): Promise<ScheduleEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return raw ? SchedulePrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ScheduleEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => SchedulePrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async save(entity: ScheduleEntity): Promise<ScheduleEntity> {
    const data = SchedulePrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });

    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return SchedulePrismaMapper.toDomain(updated);
    }

    const created = await this.delegate.create({ data: data as never });
    return SchedulePrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async softDelete(id: string, deletedBy?: string): Promise<void> {
    await this.delegate.update({
      where: { id },
      data: { deletedAt: new Date() } as never,
    });
    this.logger.debug(`Schedule ${id} soft-deleted by ${deletedBy ?? 'system'}`);
  }

  async findByStatus(status: string): Promise<readonly ScheduleEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status, deletedAt: null },
      orderBy: { nextOccurrenceAt: 'asc' },
    });
    return rows.map((r) => SchedulePrismaMapper.toDomain(r));
  }

  async findByCreator(userId: string): Promise<readonly ScheduleEntity[]> {
    const rows = await this.delegate.findMany({
      where: { createdBy: userId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => SchedulePrismaMapper.toDomain(r));
  }

  async findPaginated(options: ScheduleListOptions): Promise<SchedulePaginationResult> {
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
      items: rows.map((r) => SchedulePrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async findDue(now: string): Promise<readonly ScheduleEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        status: 'active',
        nextOccurrenceAt: { lte: new Date(now) },
        deletedAt: null,
      },
      orderBy: { nextOccurrenceAt: 'asc' },
    });
    return rows.map((r) => SchedulePrismaMapper.toDomain(r));
  }

  async findPendingRuns(cutoff: string): Promise<readonly ScheduleEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        status: 'active',
        nextOccurrenceAt: { lte: new Date(cutoff) },
        deletedAt: null,
      },
    });
    return rows.map((r) => SchedulePrismaMapper.toDomain(r));
  }

  async countActive(): Promise<number> {
    return this.delegate.count({
      where: { status: 'active', deletedAt: null },
    });
  }

  async getStats(): Promise<ScheduleStats> {
    const rows = (await this.delegate.findMany({
      where: { deletedAt: null },
      select: { status: true, type: true, recurrence: true },
    })) as Array<{ status: string; type: string; recurrence: string }>;

    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    const byFrequency: Record<string, number> = {};
    let activeCount = 0;

    for (const r of rows) {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      byType[r.type] = (byType[r.type] ?? 0) + 1;
      byFrequency[r.recurrence] = (byFrequency[r.recurrence] ?? 0) + 1;
      if (r.status === 'active') activeCount++;
    }

    return { total: rows.length, activeCount, byStatus, byType, byFrequency };
  }

  async purgeCompletedOlderThan(cutoff: string): Promise<number> {
    const result = await this.delegate.deleteMany({
      where: {
        status: { in: ['completed', 'cancelled'] },
        updatedAt: { lt: new Date(cutoff) },
      },
    });
    return (result as { count: number }).count;
  }

  private buildWhere(filter?: ScheduleListFilter): Record<string, unknown> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (!filter) return where;

    if (filter.type) where['type'] = filter.type;
    if (filter.status) where['status'] = filter.status;
    if (filter.frequency) where['recurrence'] = filter.frequency;
    if (filter.createdBy) where['createdBy'] = filter.createdBy;
    if (filter.fromDate || filter.toDate) {
      where['createdAt'] = {
        ...(filter.fromDate ? { gte: new Date(filter.fromDate) } : {}),
        ...(filter.toDate ? { lte: new Date(filter.toDate) } : {}),
      };
    }
    return where;
  }

  static readonly _token = SCHEDULE_REPOSITORY;
}
