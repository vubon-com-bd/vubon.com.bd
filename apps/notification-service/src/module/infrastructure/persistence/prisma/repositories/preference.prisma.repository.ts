/**
 * PreferencePrismaRepository — implements PreferenceRepository
 * @module notification-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  PreferenceRepository,
  PreferenceListOptions,
  PreferenceListFilter,
  PreferencePaginationResult,
  PreferenceStats,
} from '@domain/repositories/preference.repository.interface.js';
import { PREFERENCE_REPOSITORY } from '@domain/repositories/preference.repository.interface.js';
import { PreferenceEntity } from '@domain/entities/preference.entity.js';
import { PreferenceIdVO } from '@domain/primitives/preference-id.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';

import {
  NotificationBasePrismaRepository,
  type PrismaDelegate,
} from '@infrastructure/persistence/prisma/base.prisma.repository.js';
import type { PrismaNotificationPreference } from '@infrastructure/persistence/prisma/prisma.client.js';
import { PreferencePrismaMapper } from '@infrastructure/persistence/prisma/mappers/preference.prisma.mapper.js';

const MODEL_NAME = 'notificationPreference';

@Injectable()
export class PreferencePrismaRepository
  extends NotificationBasePrismaRepository
  implements PreferenceRepository
{
  private readonly logger = new Logger(PreferencePrismaRepository.name);

  private get delegate(): PrismaDelegate<PrismaNotificationPreference> {
    return this.model<PrismaNotificationPreference>(MODEL_NAME);
  }

  async findById(id: string): Promise<PreferenceEntity | null> {
    return this.findByIdVO(PreferenceIdVO.reconstitute(id));
  }

  async findByIdVO(id: PreferenceIdVO): Promise<PreferenceEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return raw ? PreferencePrismaMapper.toDomain(raw) : null;
  }

  async findByUser(userId: UserIdVO | string): Promise<PreferenceEntity | null> {
    const uid = typeof userId === 'string' ? userId : userId.value;
    const raw = await this.delegate.findFirst({
      where: { userId: uid, deletedAt: null },
    });
    return raw ? PreferencePrismaMapper.toDomain(raw) : null;
  }

  async findLocked(): Promise<readonly PreferenceEntity[]> {
    // Preference locked state is not in Prisma schema — return empty
    return Object.freeze([]);
  }

  async findByTimezone(timezone: string): Promise<readonly PreferenceEntity[]> {
    const rows = await this.delegate.findMany({
      where: { timezone, deletedAt: null },
    });
    return rows.map((r) => PreferencePrismaMapper.toDomain(r));
  }

  async findAll(): Promise<readonly PreferenceEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
    });
    return rows.map((r) => PreferencePrismaMapper.toDomain(r));
  }

  async findPaginated(options: PreferenceListOptions): Promise<PreferencePaginationResult> {
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
      items: rows.map((r) => PreferencePrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async findByQuietHoursActive(hour: number): Promise<readonly PreferenceEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        quietHoursEnabled: true,
        deletedAt: null,
      },
    });
    // Client-side filter for hour ranges that wrap midnight
    return rows
      .map((r) => PreferencePrismaMapper.toDomain(r))
      .filter((p) => p.isInQuietHours(hour));
  }

  async countLocked(): Promise<number> {
    return 0; // Not tracked in schema
  }

  async getStats(): Promise<PreferenceStats> {
    const rows = (await this.delegate.findMany({
      where: { deletedAt: null },
      select: { timezone: true, quietHoursEnabled: true },
    })) as Array<{ timezone: string; quietHoursEnabled: boolean }>;

    const byTimezone: Record<string, number> = {};
    let quietHoursEnabledCount = 0;

    for (const r of rows) {
      byTimezone[r.timezone] = (byTimezone[r.timezone] ?? 0) + 1;
      if (r.quietHoursEnabled) quietHoursEnabledCount++;
    }

    return {
      total: rows.length,
      lockedCount: 0,
      quietHoursEnabledCount,
      byTimezone,
    };
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async save(entity: PreferenceEntity): Promise<PreferenceEntity> {
    const data = PreferencePrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });

    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return PreferencePrismaMapper.toDomain(updated);
    }

    const created = await this.delegate.create({ data: data as never });
    return PreferencePrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async softDelete(id: string, deletedBy?: string): Promise<void> {
    await this.delegate.update({
      where: { id },
      data: { deletedAt: new Date() } as never,
    });
    this.logger.debug(`Preference ${id} soft-deleted by ${deletedBy ?? 'system'}`);
  }

  private buildWhere(filter?: PreferenceListFilter): Record<string, unknown> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (!filter) return where;

    if (filter.timezone) where['timezone'] = filter.timezone;
    if (filter.locale) where['locale'] = filter.locale;
    return where;
  }

  static readonly _token = PREFERENCE_REPOSITORY;
}
