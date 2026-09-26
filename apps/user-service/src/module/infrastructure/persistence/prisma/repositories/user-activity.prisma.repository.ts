import { Injectable } from '@nestjs/common';
import { UserActivity as PrismaUserActivity, Prisma } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { UserActivityEntity } from '../../../../domain/entities/user-activity.entity';
import { ActivityIdVO } from '../../../../domain/value-objects/primitives/activity-id.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { ActivityTypeVO } from '../../../../domain/value-objects/primitives/activity-type.vo';
import { ActivityTimestampVO } from '../../../../domain/value-objects/primitives/activity-timestamp.vo';
import type { UserActivityRepository } from '../../../../domain/repositories/user-activity.repository.interface';

@Injectable()
export class UserActivityPrismaRepository
  extends BasePrismaRepository<UserActivityEntity, ActivityIdVO>
  implements UserActivityRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaUserActivity): UserActivityEntity {
    return UserActivityEntity.reconstitute(
      ActivityIdVO.create(raw.id),
      {
        userId: UserIdVO.create(raw.userId),
        type: ActivityTypeVO.create(raw.type),
        timestamp: ActivityTimestampVO.create(raw.timestamp),
        metadata: {},
      },
      raw.createdAt.toISOString(),
      raw.createdAt.toISOString(),
      null,
    );
  }

  async findById(id: ActivityIdVO): Promise<UserActivityEntity | null> {
    const raw = await this.prisma.userActivity.findUnique({ where: { id: id.value } });
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
      timestamp: new Date(entity.timestamp.value),
      updatedAt: new Date(),
    } as unknown as Prisma.UserActivityUncheckedCreateInput;
    const raw = await this.prisma.userActivity.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: ActivityIdVO): Promise<void> {
    await this.prisma.userActivity.delete({ where: { id: id.value } });
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
