/**
 * Page View Prisma Repository
 * @module analytics-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { AnalyticsBasePrismaRepository } from '../base.prisma.repository.js';
import { AnalyticsPrismaService } from '../prisma.service.js';
import { PageViewEntity } from '../../../../domain/entities/page-view.entity.js';
import { PageViewIdVO } from '../../../../domain/value-objects/primitives/page-view-id.vo.js';
import { PagePathVO } from '../../../../domain/value-objects/primitives/page-path.vo.js';
import { ReferrerVO } from '../../../../domain/value-objects/primitives/referrer.vo.js';
import { UserAgentVO } from '../../../../domain/value-objects/primitives/user-agent.vo.js';
import { SessionIdVO } from '../../../../domain/value-objects/primitives/session-id.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { DeviceTypeVO } from '../../../../domain/value-objects/primitives/device-type.vo.js';
import { CountryCodeVO } from '../../../../domain/value-objects/primitives/country-code.vo.js';
import { EventTimestampVO } from '../../../../domain/value-objects/primitives/event-timestamp.vo.js';
import { TimeRangeVO } from '../../../../domain/value-objects/composites/time-range.vo.js';
import type { PageViewRepository as IPageViewRepository } from '../../../../domain/repositories/page-view.repository.interface.js';

type PrismaPageViewRow = {
  id: string;
  sessionId: string;
  userId: string | null;
  path: string;
  referrer: string | null;
  userAgent: string | null;
  device: string | null;
  country: string | null;
  occurredAt: Date;
  durationMs: number | null;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class PageViewPrismaRepository
  extends AnalyticsBasePrismaRepository<PageViewEntity, PrismaPageViewRow, string>
  implements IPageViewRepository
{
  protected readonly delegateName = 'analyticsPageView';

  constructor(prisma: AnalyticsPrismaService) {
    super(prisma);
  }

  protected toDomain(raw: PrismaPageViewRow): PageViewEntity {
    return PageViewEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      props: {
        path: PagePathVO.create(raw.path),
        sessionId: SessionIdVO.create(raw.sessionId),
        userId: raw.userId ? UserIdVO.create(raw.userId) : undefined,
        referrer: ReferrerVO.create(raw.referrer),
        userAgent: UserAgentVO.create(raw.userAgent),
        device: DeviceTypeVO.create(raw.device ?? 'unknown'),
        country: raw.country ? CountryCodeVO.create(raw.country) : undefined,
        occurredAt: EventTimestampVO.fromDate(raw.occurredAt),
        durationMs: raw.durationMs ?? undefined,
      },
    });
  }

  protected toPersistence(domain: PageViewEntity): Record<string, unknown> {
    return {
      id: domain.id,
      sessionId: domain.sessionId.value,
      userId: domain.userId?.value ?? null,
      path: domain.path.value,
      referrer: domain.referrer.isDirect() ? null : domain.referrer.value,
      userAgent: domain.userAgent.value,
      device: domain.device.value,
      country: domain.country?.value ?? null,
      occurredAt: new Date(domain.occurredAt.value.epochMs),
      durationMs: domain.durationMs ?? null,
    };
  }

  protected idOf(domain: PageViewEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  async findByPageViewId(id: PageViewIdVO): Promise<PageViewEntity | null> {
    const raw = await this.model.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findBySession(sessionId: SessionIdVO): Promise<readonly PageViewEntity[]> {
    const rows = await this.model.findMany({
      where: { sessionId: sessionId.value },
      orderBy: { occurredAt: 'asc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByUser(userId: UserIdVO): Promise<readonly PageViewEntity[]> {
    const rows = await this.model.findMany({
      where: { userId: userId.value },
      orderBy: { occurredAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByPath(path: PagePathVO): Promise<readonly PageViewEntity[]> {
    const rows = await this.model.findMany({
      where: { path: path.value },
      orderBy: { occurredAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByPathInRange(
    path: PagePathVO,
    range: TimeRangeVO
  ): Promise<readonly PageViewEntity[]> {
    const rows = await this.model.findMany({
      where: {
        path: path.value,
        occurredAt: {
          gte: new Date(range.startAt.value.epochMs),
          lte: new Date(range.endAt.value.epochMs),
        },
      },
      orderBy: { occurredAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async countByPathInRange(path: PagePathVO, range: TimeRangeVO): Promise<number> {
    return this.model.count({
      where: {
        path: path.value,
        occurredAt: {
          gte: new Date(range.startAt.value.epochMs),
          lte: new Date(range.endAt.value.epochMs),
        },
      },
    });
  }

  async findTopPages(
    range: TimeRangeVO,
    limit: number
  ): Promise<readonly { path: string; count: number }[]> {
    const rows = await this.model.groupBy({
      by: ['path'],
      where: {
        occurredAt: {
          gte: new Date(range.startAt.value.epochMs),
          lte: new Date(range.endAt.value.epochMs),
        },
      },
      _count: { path: true },
      orderBy: { _count: { path: 'desc' } },
      take: limit,
    });
    return rows.map((r) => {
      const row = r as { path: string; _count: { path: number } };
      return { path: row.path, count: row._count.path };
    });
  }

  async bulkInsert(pageViews: readonly PageViewEntity[]): Promise<number> {
    const data = pageViews.map((p) => this.toPersistence(p)) as Array<{
      id: string;
      sessionId: string;
      userId: string | null;
      path: string;
      referrer: string | null;
      userAgent: string;
      device: string;
      country: string | null;
      occurredAt: Date;
      durationMs: number | null;
    }>;
    const result = await this.model.createMany({
      data,
      skipDuplicates: true,
    });
    return result.count;
  }

  async deleteOlderThan(cutoff: string): Promise<number> {
    const result = await this.model.deleteMany({
      where: { occurredAt: { lt: new Date(cutoff) } },
    });
    return result.count;
  }
}
