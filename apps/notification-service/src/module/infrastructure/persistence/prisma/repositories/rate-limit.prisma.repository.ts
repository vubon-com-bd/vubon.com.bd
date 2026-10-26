/**
 * RateLimitPrismaRepository
 * @module notification-service/infrastructure/persistence/prisma/repositories
 *
 * Infrastructure-only — fallback rate-limit persistence (Redis is primary)।
 */
import { Injectable } from '@nestjs/common';
import {
  NotificationBasePrismaRepository,
  type PrismaDelegate,
} from '@infrastructure/persistence/prisma/base.prisma.repository.js';
import type { PrismaNotificationRateLimit } from '@infrastructure/persistence/prisma/prisma.client.js';
import {
  RateLimitPrismaMapper,
  type RateLimitRow,
} from '@infrastructure/persistence/prisma/mappers/rate-limit.prisma.mapper.js';

const MODEL_NAME = 'notificationRateLimit';

@Injectable()
export class RateLimitPrismaRepository extends NotificationBasePrismaRepository {
  private get delegate(): PrismaDelegate<PrismaNotificationRateLimit> {
    return this.model<PrismaNotificationRateLimit>(MODEL_NAME);
  }

  async findByWindow(
    userId: string | null,
    channel: string,
    windowStart: string,
  ): Promise<RateLimitRow | null> {
    const raw = await this.delegate.findFirst({
      where: {
        userId: userId ?? undefined,
        channel,
        windowStart: new Date(windowStart),
      },
    });
    return raw ? RateLimitPrismaMapper.toRow(raw) : null;
  }

  async findActiveWindow(
    userId: string | null,
    channel: string,
    now: string,
  ): Promise<RateLimitRow | null> {
    const raw = await this.delegate.findFirst({
      where: {
        userId: userId ?? undefined,
        channel,
        windowEnd: { gte: new Date(now) },
      },
    });
    return raw ? RateLimitPrismaMapper.toRow(raw) : null;
  }

  async save(row: RateLimitRow): Promise<RateLimitRow> {
    const data = RateLimitPrismaMapper.toPersistence(row);
    const existing = await this.delegate.findUnique({
      where: { id: row.id },
      select: { id: true },
    });

    if (existing) {
      const updated = await this.delegate.update({
        where: { id: row.id },
        data: data as never,
      });
      return RateLimitPrismaMapper.toRow(updated);
    }
    const created = await this.delegate.create({ data: data as never });
    return RateLimitPrismaMapper.toRow(created);
  }

  async purgeExpired(before: string): Promise<number> {
    const result = await this.delegate.deleteMany({
      where: { windowEnd: { lt: new Date(before) } },
    });
    return (result as { count: number }).count;
  }
}
