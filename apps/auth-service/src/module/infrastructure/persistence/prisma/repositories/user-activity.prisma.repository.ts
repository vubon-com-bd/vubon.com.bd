import { Injectable } from '@nestjs/common';
import { UserActivity as PrismaUserActivity, Prisma } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { UserActivityEntity } from '../../../../domain/entities/user-activity.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { ActivityTypeVO } from '../../../../domain/value-objects/primitives/activity-type.vo';
import { ActivityTimestampVO } from '../../../../domain/value-objects/primitives/activity-timestamp.vo';
import type { UserActivityRepository } from '../../../../domain/repositories/user-activity.repository.interface';

@Injectable()
export class UserActivityPrismaRepository
  extends BasePrismaRepository<UserActivityEntity, string>
  implements UserActivityRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaUserActivity): UserActivityEntity {
    return UserActivityEntity.reconstitute(
      raw.id,
      {
        userId: UserIdVO.create(raw.userId),
        type: ActivityTypeVO.create(raw.type),
        category: raw.category,
        ip: raw.ip,
        userAgent: raw.userAgent,
        metadata: (raw.metadata ?? {}) as Record<string, unknown>,
        timestamp: ActivityTimestampVO.create(raw.timestamp),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: string): Promise<UserActivityEntity | null> {
    const raw = await this.prisma.userActivity.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly UserActivityEntity[]> {
    const rows = await this.prisma.userActivity.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: UserActivityEntity): Promise<UserActivityEntity> {
    const data = {
      userId: entity.userId.value,
      type: entity.type.value,
      category: entity.category,
      ip: entity.ip,
      userAgent: entity.userAgent,
      metadata: entity.metadata as Prisma.InputJsonValue,
      timestamp: new Date(entity.timestamp.epochMs),
      updatedAt: new Date(),
    };
    const raw = await this.prisma.userActivity.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.userActivity.delete({ where: { id } });
  }

  async findByUserId(userId: UserIdVO): Promise<readonly UserActivityEntity[]> {
    const rows = await this.prisma.userActivity.findMany({
      where: { userId: userId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findRecent(userId: UserIdVO, limit: number): Promise<readonly UserActivityEntity[]> {
    const rows = await this.prisma.userActivity.findMany({
      where: { userId: userId.value },
      orderBy: { timestamp: 'desc' },
      take: limit,
    });
    return rows.map((r) => this.toDomain(r));
  }
}
