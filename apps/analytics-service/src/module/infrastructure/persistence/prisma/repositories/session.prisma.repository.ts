/**
 * Session Prisma Repository
 * @module analytics-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { AnalyticsBasePrismaRepository } from '../base.prisma.repository.js';
import { AnalyticsPrismaService } from '../prisma.service.js';
import { SessionEntity } from '../../../../domain/entities/session.entity.js';
import { SessionIdVO } from '../../../../domain/value-objects/primitives/session-id.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { DeviceTypeVO } from '../../../../domain/value-objects/primitives/device-type.vo.js';
import { SessionDurationVO } from '../../../../domain/value-objects/primitives/session-duration.vo.js';
import { EventTimestampVO } from '../../../../domain/value-objects/primitives/event-timestamp.vo.js';
import { TimeRangeVO } from '../../../../domain/value-objects/composites/time-range.vo.js';
import type { SessionRepository as ISessionRepository } from '../../../../domain/repositories/session.repository.interface.js';

type PrismaSessionRow = {
  id: string;
  userId: string | null;
  device: string | null;
  trafficSource: unknown;
  startedAt: Date;
  endedAt: Date | null;
  durationSec: number | null;
  eventCount: number;
  pageViewCount: number;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

@Injectable()
export class SessionPrismaRepository
  extends AnalyticsBasePrismaRepository<SessionEntity, PrismaSessionRow, string>
  implements ISessionRepository
{
  protected readonly delegateName = 'analyticsSession';

  constructor(prisma: AnalyticsPrismaService) {
    super(prisma);
  }

  protected toDomain(raw: PrismaSessionRow): SessionEntity {
    return SessionEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      props: {
        userId: raw.userId ? UserIdVO.create(raw.userId) : undefined,
        device: raw.device ? DeviceTypeVO.create(raw.device) : undefined,
        startedAt: EventTimestampVO.fromDate(raw.startedAt),
        endedAt: raw.endedAt ? EventTimestampVO.fromDate(raw.endedAt) : undefined,
        duration: raw.durationSec !== null ? SessionDurationVO.create(raw.durationSec) : undefined,
        eventCount: raw.eventCount,
        pageViewCount: raw.pageViewCount,
      },
    });
  }

  protected toPersistence(domain: SessionEntity): Record<string, unknown> {
    return {
      id: domain.id,
      userId: domain.userId?.value ?? null,
      device: domain.device?.value ?? null,
      trafficSource: null,
      startedAt: new Date(domain.startedAt.value.epochMs),
      endedAt: domain.endedAt ? new Date(domain.endedAt.value.epochMs) : null,
      durationSec: domain.duration?.seconds ?? null,
      eventCount: domain.eventCount,
      pageViewCount: domain.pageViewCount,
      version: domain.version,
    };
  }

  protected idOf(domain: SessionEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  async findBySessionId(id: SessionIdVO): Promise<SessionEntity | null> {
    const raw = await this.model.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findByUser(userId: UserIdVO): Promise<readonly SessionEntity[]> {
    const rows = await this.model.findMany({
      where: { userId: userId.value, deletedAt: null },
      orderBy: { startedAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findActiveByUser(userId: UserIdVO): Promise<SessionEntity | null> {
    const raw = await this.model.findFirst({
      where: { userId: userId.value, endedAt: null, deletedAt: null },
      orderBy: { startedAt: 'desc' },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findByUserInRange(
    userId: UserIdVO,
    range: TimeRangeVO
  ): Promise<readonly SessionEntity[]> {
    const rows = await this.model.findMany({
      where: {
        userId: userId.value,
        startedAt: {
          gte: new Date(range.startAt.value.epochMs),
          lte: new Date(range.endAt.value.epochMs),
        },
      },
      orderBy: { startedAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findStaleActive(thresholdIso: string): Promise<readonly SessionEntity[]> {
    const rows = await this.model.findMany({
      where: {
        endedAt: null,
        startedAt: { lt: new Date(thresholdIso) },
        deletedAt: null,
      },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async countByUser(userId: UserIdVO): Promise<number> {
    return this.model.count({
      where: { userId: userId.value, deletedAt: null },
    });
  }

  async deleteOlderThan(cutoff: string): Promise<number> {
    const result = await this.model.deleteMany({
      where: { startedAt: { lt: new Date(cutoff) } },
    });
    return result.count;
  }
}
