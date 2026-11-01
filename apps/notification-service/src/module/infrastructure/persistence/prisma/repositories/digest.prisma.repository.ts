/**
 * DigestPrismaRepository — implements DigestRepository
 * @module notification-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  DigestRepository,
  DigestListOptions,
  DigestListFilter,
  DigestPaginationResult,
  DigestStats,
} from '@domain/repositories/digest.repository.interface.js';
import { DIGEST_REPOSITORY } from '@domain/repositories/digest.repository.interface.js';
import { DigestEntity } from '@domain/entities/digest.entity.js';
import { DigestIdVO } from '@domain/primitives/digest-id.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';

import {
  NotificationBasePrismaRepository,
  type PrismaDelegate,
} from '@infrastructure/persistence/prisma/base.prisma.repository.js';
import type { PrismaNotificationDigest } from '@infrastructure/persistence/prisma/prisma.client.js';
import { DigestPrismaMapper } from '@infrastructure/persistence/prisma/mappers/digest.prisma.mapper.js';

const MODEL_NAME = 'notificationDigest';

@Injectable()
export class DigestPrismaRepository
  extends NotificationBasePrismaRepository
  implements DigestRepository
{
  private readonly logger = new Logger(DigestPrismaRepository.name);

  private get delegate(): PrismaDelegate<PrismaNotificationDigest> {
    return this.model<PrismaNotificationDigest>(MODEL_NAME);
  }

  async findById(id: string): Promise<DigestEntity | null> {
    return this.findByIdVO(DigestIdVO.reconstitute(id));
  }

  async findByIdVO(id: DigestIdVO): Promise<DigestEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return raw ? DigestPrismaMapper.toDomain(raw) : null;
  }

  async findByUser(userId: UserIdVO | string): Promise<readonly DigestEntity[]> {
    const uid = typeof userId === 'string' ? userId : userId.value;
    const rows = await this.delegate.findMany({
      where: { userId: uid, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => DigestPrismaMapper.toDomain(r));
  }

  async findByStatus(status: string): Promise<readonly DigestEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => DigestPrismaMapper.toDomain(r));
  }

  async findByFrequency(frequency: string): Promise<readonly DigestEntity[]> {
    const rows = await this.delegate.findMany({
      where: { frequency, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => DigestPrismaMapper.toDomain(r));
  }

  async findAll(): Promise<readonly DigestEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => DigestPrismaMapper.toDomain(r));
  }

  async findPaginated(options: DigestListOptions): Promise<DigestPaginationResult> {
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
      items: rows.map((r) => DigestPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async findPending(): Promise<readonly DigestEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: 'pending', deletedAt: null },
      orderBy: { createdAt: 'asc' },
    });
    return rows.map((r) => DigestPrismaMapper.toDomain(r));
  }

  async findGenerating(): Promise<readonly DigestEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: 'generating', deletedAt: null },
    });
    return rows.map((r) => DigestPrismaMapper.toDomain(r));
  }

  async findReadyToSend(): Promise<readonly DigestEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: 'ready', deletedAt: null },
      orderBy: { createdAt: 'asc' },
    });
    return rows.map((r) => DigestPrismaMapper.toDomain(r));
  }

  async findByUserAndPeriod(
    userId: string,
    periodStart: string,
    periodEnd: string,
  ): Promise<DigestEntity | null> {
    const raw = await this.delegate.findFirst({
      where: {
        userId,
        periodStart: new Date(periodStart),
        periodEnd: new Date(periodEnd),
        deletedAt: null,
      },
    });
    return raw ? DigestPrismaMapper.toDomain(raw) : null;
  }

  async findLatestForUser(userId: string): Promise<DigestEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { userId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return raw ? DigestPrismaMapper.toDomain(raw) : null;
  }

  async countPending(): Promise<number> {
    return this.delegate.count({ where: { status: 'pending', deletedAt: null } });
  }

  async getStats(
    userId?: string,
    fromDate?: string,
    toDate?: string,
  ): Promise<DigestStats> {
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
      select: { status: true, frequency: true, itemCount: true },
    })) as Array<{ status: string; frequency: string; itemCount: number }>;

    const byStatus: Record<string, number> = {};
    const byFrequency: Record<string, number> = {};
    let totalItems = 0;

    for (const r of rows) {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      byFrequency[r.frequency] = (byFrequency[r.frequency] ?? 0) + 1;
      totalItems += r.itemCount ?? 0;
    }

    return {
      total: rows.length,
      totalItems,
      averageItemsPerDigest: rows.length > 0 ? totalItems / rows.length : 0,
      byStatus,
      byFrequency,
    };
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async save(entity: DigestEntity): Promise<DigestEntity> {
    const data = DigestPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });

    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return DigestPrismaMapper.toDomain(updated);
    }

    const created = await this.delegate.create({ data: data as never });
    return DigestPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async softDelete(id: string, deletedBy?: string): Promise<void> {
    await this.delegate.update({
      where: { id },
      data: { deletedAt: new Date() } as never,
    });
    this.logger.debug(`Digest ${id} soft-deleted by ${deletedBy ?? 'system'}`);
  }

  async purgeOlderThan(cutoff: string): Promise<number> {
    const result = await this.delegate.deleteMany({
      where: { createdAt: { lt: new Date(cutoff) } },
    });
    return (result as { count: number }).count;
  }

  private buildWhere(filter?: DigestListFilter): Record<string, unknown> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (!filter) return where;

    if (filter.userId) where['userId'] = filter.userId;
    if (filter.status) where['status'] = filter.status;
    if (filter.frequency) where['frequency'] = filter.frequency;
    if (filter.type) where['type'] = filter.type;
    if (filter.fromDate || filter.toDate) {
      where['createdAt'] = {
        ...(filter.fromDate ? { gte: new Date(filter.fromDate) } : {}),
        ...(filter.toDate ? { lte: new Date(filter.toDate) } : {}),
      };
    }
    return where;
  }

  static readonly _token = DIGEST_REPOSITORY;
}
