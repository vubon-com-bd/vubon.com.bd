/**
 * UserActivityPrismaRepository
 * @module auth-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type { UserActivity as PrismaUserActivity } from '@prisma/client';
import {
  BasePrismaRepository,
  type PrismaDelegate,
} from '@vubon/shared-kernel/infrastructure/persistence/prisma/repositories/base.prisma.repository';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma/prisma.service';
import type { UserId } from '@vubon/shared-types/common';
import {
  UserActivityEntity,
  type ActivityType,
} from '../../../../domain/entities/user-activity.entity';
import type { UserActivityRepository } from '../../../../domain/repositories/user-activity.repository.interface';

@Injectable()
export class UserActivityPrismaRepository
  extends BasePrismaRepository<UserActivityEntity, PrismaUserActivity, string>
  implements UserActivityRepository {
  protected readonly model: PrismaDelegate<PrismaUserActivity>;

  constructor(protected readonly prisma: PrismaService) {
    super();
    this.model = prisma.userActivity as unknown as PrismaDelegate<PrismaUserActivity>;
  }

  protected idOf(domain: UserActivityEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  protected toDomain(raw: PrismaUserActivity): UserActivityEntity {
    return UserActivityEntity.create({
      id: raw.id,
      userId: raw.userId as UserId,
      type: raw.type as ActivityType,
      ipAddress: raw.ip ?? undefined,
      userAgent: raw.userAgent ?? undefined,
      metadata: UserActivityPrismaRepository.coerceMetadata(raw.metadata),
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
    });
  }

  protected toPersistence(domain: UserActivityEntity): Record<string, unknown> {
    return {
      id: domain.id,
      userId: domain.userId,
      type: domain.type,
      category: 'auth',
      ip: domain.ipAddress ?? null,
      userAgent: domain.userAgent ?? null,
      metadata: domain.metadata ?? null,
      timestamp: new Date(domain.createdAt),
      updatedAt: new Date(),
    };
  }

  async findByUserId(
    userId: UserId,
    limit = 50,
  ): Promise<readonly UserActivityEntity[]> {
    const rows = await this.prisma.userActivity.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findRecentByUser(
    userId: UserId,
    sinceEpochMs: number,
  ): Promise<readonly UserActivityEntity[]> {
    const rows = await this.prisma.userActivity.findMany({
      where: {
        userId,
        createdAt: { gte: new Date(sinceEpochMs) },
      },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async deleteOlderThan(epochMs: number): Promise<number> {
    const result = await this.prisma.userActivity.deleteMany({
      where: { createdAt: { lt: new Date(epochMs) } },
    });
    return result.count;
  }

  private static coerceMetadata(
    raw: unknown,
  ): Readonly<Record<string, string>> | undefined {
    if (!raw || typeof raw !== 'object') return undefined;
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(raw)) {
      if (typeof v === 'string') out[k] = v;
      else out[k] = String(v);
    }
    return out;
  }
}
