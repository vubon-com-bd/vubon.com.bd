/**
 * DevicePrismaRepository — implements DeviceRepository
 * @module notification-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  DeviceRepository,
  DeviceListOptions,
  DeviceListFilter,
  DevicePaginationResult,
  DeviceStats,
} from '@domain/repositories/device.repository.interface.js';
import { DEVICE_REPOSITORY } from '@domain/repositories/device.repository.interface.js';
import { DeviceEntity } from '@domain/entities/device.entity.js';
import { DeviceIdVO } from '@domain/primitives/device-id.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';

import {
  NotificationBasePrismaRepository,
  type PrismaDelegate,
} from '@infrastructure/persistence/prisma/base.prisma.repository.js';
import type { PrismaNotificationDevice } from '@infrastructure/persistence/prisma/prisma.client.js';
import { DevicePrismaMapper } from '@infrastructure/persistence/prisma/mappers/device.prisma.mapper.js';

const MODEL_NAME = 'notificationDevice';

@Injectable()
export class DevicePrismaRepository
  extends NotificationBasePrismaRepository
  implements DeviceRepository
{
  private readonly logger = new Logger(DevicePrismaRepository.name);

  private get delegate(): PrismaDelegate<PrismaNotificationDevice> {
    return this.model<PrismaNotificationDevice>(MODEL_NAME);
  }

  async findById(id: string): Promise<DeviceEntity | null> {
    return this.findByIdVO(DeviceIdVO.reconstitute(id));
  }

  async findByIdVO(id: DeviceIdVO): Promise<DeviceEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return raw ? DevicePrismaMapper.toDomain(raw) : null;
  }

  async findByUser(userId: UserIdVO | string): Promise<readonly DeviceEntity[]> {
    const uid = typeof userId === 'string' ? userId : userId.value;
    const rows = await this.delegate.findMany({
      where: { userId: uid, deletedAt: null },
      orderBy: { lastActiveAt: 'desc' },
    });
    return rows.map((r) => DevicePrismaMapper.toDomain(r));
  }

  async findByToken(token: string): Promise<DeviceEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { token, deletedAt: null },
    });
    return raw ? DevicePrismaMapper.toDomain(raw) : null;
  }

  async findByStatus(status: string): Promise<readonly DeviceEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status, deletedAt: null },
    });
    return rows.map((r) => DevicePrismaMapper.toDomain(r));
  }

  async findByPlatform(platform: string): Promise<readonly DeviceEntity[]> {
    const rows = await this.delegate.findMany({
      where: { platform, deletedAt: null },
    });
    return rows.map((r) => DevicePrismaMapper.toDomain(r));
  }

  async findAll(): Promise<readonly DeviceEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { lastActiveAt: 'desc' },
    });
    return rows.map((r) => DevicePrismaMapper.toDomain(r));
  }

  async findPaginated(options: DeviceListOptions): Promise<DevicePaginationResult> {
    const where = this.buildWhere(options.filter);
    const orderBy = { [options.sortBy ?? 'lastActiveAt']: options.sortDir ?? 'desc' };

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
      items: rows.map((r) => DevicePrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async findStale(cutoff: string): Promise<readonly DeviceEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        lastActiveAt: { lte: new Date(cutoff) },
        status: 'active',
        deletedAt: null,
      },
    });
    return rows.map((r) => DevicePrismaMapper.toDomain(r));
  }

  async findBlocked(): Promise<readonly DeviceEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: 'blocked', deletedAt: null },
    });
    return rows.map((r) => DevicePrismaMapper.toDomain(r));
  }

  async findActiveForUser(userId: string): Promise<readonly DeviceEntity[]> {
    const rows = await this.delegate.findMany({
      where: { userId, status: 'active', deletedAt: null },
      orderBy: { lastActiveAt: 'desc' },
    });
    return rows.map((r) => DevicePrismaMapper.toDomain(r));
  }

  async countForUser(userId: string): Promise<number> {
    return this.delegate.count({ where: { userId, deletedAt: null } });
  }

  async countActiveForUser(userId: string): Promise<number> {
    return this.delegate.count({
      where: { userId, status: 'active', deletedAt: null },
    });
  }

  async getStats(): Promise<DeviceStats> {
    const rows = (await this.delegate.findMany({
      where: { deletedAt: null },
      select: { status: true, type: true, platform: true, lastActiveAt: true },
    })) as Array<{
      status: string;
      type: string;
      platform: string | null;
      lastActiveAt: Date | null;
    }>;

    const byType: Record<string, number> = {};
    const byPlatform: Record<string, number> = {};
    let activeCount = 0;
    let blockedCount = 0;
    let staleCount = 0;
    const staleCutoff = new Date(Date.now() - 90 * 24 * 60 * 60_000);

    for (const r of rows) {
      byType[r.type] = (byType[r.type] ?? 0) + 1;
      if (r.platform) byPlatform[r.platform] = (byPlatform[r.platform] ?? 0) + 1;
      if (r.status === 'active') activeCount++;
      if (r.status === 'blocked') blockedCount++;
      if (r.lastActiveAt && r.lastActiveAt < staleCutoff) staleCount++;
    }

    return {
      total: rows.length,
      activeCount,
      blockedCount,
      staleCount,
      byType,
      byPlatform,
    };
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async save(entity: DeviceEntity): Promise<DeviceEntity> {
    const data = DevicePrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });

    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return DevicePrismaMapper.toDomain(updated);
    }

    const created = await this.delegate.create({ data: data as never });
    return DevicePrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async softDelete(id: string, deletedBy?: string): Promise<void> {
    await this.delegate.update({
      where: { id },
      data: { deletedAt: new Date() } as never,
    });
    this.logger.debug(`Device ${id} soft-deleted by ${deletedBy ?? 'system'}`);
  }

  async purgeUnregisteredOlderThan(cutoff: string): Promise<number> {
    const result = await this.delegate.deleteMany({
      where: {
        status: 'unregistered',
        updatedAt: { lt: new Date(cutoff) },
      },
    });
    return (result as { count: number }).count;
  }

  private buildWhere(filter?: DeviceListFilter): Record<string, unknown> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (!filter) return where;

    if (filter.userId) where['userId'] = filter.userId;
    if (filter.type) where['type'] = filter.type;
    if (filter.status) where['status'] = filter.status;
    if (filter.platform) where['platform'] = filter.platform;
    if (filter.fromDate || filter.toDate) {
      where['createdAt'] = {
        ...(filter.fromDate ? { gte: new Date(filter.fromDate) } : {}),
        ...(filter.toDate ? { lte: new Date(filter.toDate) } : {}),
      };
    }
    return where;
  }

  static readonly _token = DEVICE_REPOSITORY;
}
