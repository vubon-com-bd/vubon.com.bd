/**
 * UserActivityPrismaRepository
 */
import { Injectable } from '@nestjs/common';
import type { UserActivity as PrismaUserActivity } from '@prisma/client';
import { PrismaService } from '../prisma.service.js';
import type {
  UserActivityRepository,
  ActivityPaginationOptions,
} from '@domain/repositories/user-activity.repository.interface';
import { UserActivityEntity } from '@domain/entities/user-activity.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { ActivityIdVO } from '@domain/value-objects/primitives/activity-id.vo';
import { ActivityTypeVO } from '@domain/value-objects/primitives/activity-type.vo';
import { ActivityTimestampVO } from '@domain/value-objects/primitives/activity-timestamp.vo';

@Injectable()
export class UserActivityPrismaRepository implements UserActivityRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toDomain(raw: PrismaUserActivity): UserActivityEntity {
    return UserActivityEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.createdAt.toISOString(),
      deletedAt: null,
      props: {
        activityId: ActivityIdVO.create(raw.id),
        userId: UserIdVO.create(raw.userId),
        type: ActivityTypeVO.create(raw.type),
        timestamp: ActivityTimestampVO.fromEpochMs(raw.timestamp.getTime()),
      },
    });
  }

  async findById(id: string): Promise<UserActivityEntity | null> {
    const raw = await this.prisma.userActivity.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly UserActivityEntity[]> {
    const raws = await this.prisma.userActivity.findMany({
      orderBy: { timestamp: 'desc' },
    });
    return raws.map((r) => this.toDomain(r));
  }

  async save(entity: UserActivityEntity): Promise<UserActivityEntity> {
    const raw = await this.prisma.userActivity.create({
      data: {
        id: entity.id,
        userId: entity.userId.value,
        type: entity.type.value,
        timestamp: entity.timestamp.toDate(),
      },
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.userActivity.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.userActivity.count({ where: { id } });
    return count > 0;
  }

  async findByUserId(userId: UserIdVO): Promise<readonly UserActivityEntity[]> {
    const raws = await this.prisma.userActivity.findMany({
      where: { userId: userId.value },
      orderBy: { timestamp: 'desc' },
    });
    return raws.map((r) => this.toDomain(r));
  }

  async findPaginated(
    userId: UserIdVO,
    options: ActivityPaginationOptions
  ): Promise<{
    readonly items: readonly UserActivityEntity[];
    readonly total: number;
  }> {
    const where: Record<string, unknown> = { userId: userId.value };
    if (options.type) where.type = options.type.value;
    if (options.fromDate || options.toDate) {
      const range: Record<string, Date> = {};
      if (options.fromDate) range.gte = options.fromDate;
      if (options.toDate) range.lte = options.toDate;
      where.timestamp = range;
    }

    const [raws, total] = await Promise.all([
      this.prisma.userActivity.findMany({
        where,
        skip: (options.page - 1) * options.limit,
        take: options.limit,
        orderBy: { timestamp: 'desc' },
      }),
      this.prisma.userActivity.count({ where }),
    ]);

    return { items: raws.map((r) => this.toDomain(r)), total };
  }

  async countByUserId(userId: UserIdVO): Promise<number> {
    return this.prisma.userActivity.count({ where: { userId: userId.value } });
  }

  async latestByUserId(
    userId: UserIdVO,
    limit: number
  ): Promise<readonly UserActivityEntity[]> {
    const raws = await this.prisma.userActivity.findMany({
      where: { userId: userId.value },
      orderBy: { timestamp: 'desc' },
      take: limit,
    });
    return raws.map((r) => this.toDomain(r));
  }

  async deleteOlderThan(date: Date): Promise<number> {
    const result = await this.prisma.userActivity.deleteMany({
      where: { timestamp: { lt: date } },
    });
    return result.count;
  }
}
