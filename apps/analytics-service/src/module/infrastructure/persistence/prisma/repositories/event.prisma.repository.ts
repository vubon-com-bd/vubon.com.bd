/**
 * Event Prisma Repository
 * @module analytics-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { AnalyticsBasePrismaRepository } from '../base.prisma.repository.js';
import { AnalyticsPrismaService } from '../prisma.service.js';
import { EventEntity } from '../../../../domain/entities/event.entity.js';
import { EventVO } from '../../../../domain/value-objects/composites/event.vo.js';
import { EventIdVO } from '../../../../domain/value-objects/primitives/event-id.vo.js';
import { EventNameVO } from '../../../../domain/value-objects/primitives/event-name.vo.js';
import { EventSourceVO } from '../../../../domain/value-objects/primitives/event-source.vo.js';
import { EventTimestampVO } from '../../../../domain/value-objects/primitives/event-timestamp.vo.js';
import { EventPayloadVO } from '../../../../domain/value-objects/primitives/event-payload.vo.js';
import { SessionIdVO } from '../../../../domain/value-objects/primitives/session-id.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { TimeRangeVO } from '../../../../domain/value-objects/composites/time-range.vo.js';
import type {
  EventRepository as IEventRepository,
  EventQueryFilters,
} from '../../../../domain/repositories/event.repository.interface.js';

type PrismaEventRow = {
  id: string;
  name: string;
  source: string;
  sessionId: string | null;
  userId: string | null;
  payloadKeys: number;
  occurredAt: Date;
  status: string;
  processedAt: Date | null;
  failureReason: string | null;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

@Injectable()
export class EventPrismaRepository
  extends AnalyticsBasePrismaRepository<EventEntity, PrismaEventRow, string>
  implements IEventRepository
{
  protected readonly delegateName = 'analyticsEvent';

  constructor(prisma: AnalyticsPrismaService) {
    super(prisma);
  }

  protected toDomain(raw: PrismaEventRow): EventEntity {
    return EventEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      props: {
        event: EventVO.create({
          id: EventIdVO.fromGeneric(raw.id),
          name: EventNameVO.create(raw.name),
          source: EventSourceVO.create(raw.source),
          timestamp: EventTimestampVO.fromDate(raw.occurredAt),
          payload: EventPayloadVO.empty(),
          sessionId: raw.sessionId ? SessionIdVO.create(raw.sessionId) : undefined,
          userId: raw.userId ? UserIdVO.create(raw.userId) : undefined,
        }),
        status: raw.status as 'received' | 'processed' | 'failed' | 'archived',
        processedAt: raw.processedAt?.toISOString() ?? null,
        failureReason: raw.failureReason,
      },
    });
  }

  protected toPersistence(domain: EventEntity): Record<string, unknown> {
    return {
      id: domain.id,
      name: domain.event.name.value,
      source: domain.event.source.value,
      sessionId: domain.event.sessionId?.value ?? null,
      userId: domain.event.userId?.value ?? null,
      payloadKeys: domain.event.payload.keyCount(),
      occurredAt: new Date(domain.event.timestamp.value.epochMs),
      status: domain.status,
      processedAt: domain.processedAt ? new Date(domain.processedAt) : null,
      failureReason: domain.failureReason ?? null,
      version: domain.version,
    };
  }

  protected idOf(domain: EventEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  async findByEventId(id: EventIdVO): Promise<EventEntity | null> {
    const raw = await this.model.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findByFilters(filters: EventQueryFilters): Promise<readonly EventEntity[]> {
    const rows = await this.model.findMany({
      where: {
        name: filters.name?.value,
        source: filters.source?.value,
        sessionId: filters.sessionId?.value,
        userId: filters.userId?.value,
        status: filters.status,
        occurredAt: filters.range
          ? {
              gte: new Date(filters.range.startAt.value.epochMs),
              lte: new Date(filters.range.endAt.value.epochMs),
            }
          : undefined,
      },
      orderBy: { occurredAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async countByFilters(filters: EventQueryFilters): Promise<number> {
    return this.model.count({
      where: {
        name: filters.name?.value,
        source: filters.source?.value,
        sessionId: filters.sessionId?.value,
        userId: filters.userId?.value,
        status: filters.status,
      },
    });
  }

  async findBySession(sessionId: SessionIdVO): Promise<readonly EventEntity[]> {
    const rows = await this.model.findMany({
      where: { sessionId: sessionId.value },
      orderBy: { occurredAt: 'asc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByUser(userId: UserIdVO, range: TimeRangeVO): Promise<readonly EventEntity[]> {
    const rows = await this.model.findMany({
      where: {
        userId: userId.value,
        occurredAt: {
          gte: new Date(range.startAt.value.epochMs),
          lte: new Date(range.endAt.value.epochMs),
        },
      },
      orderBy: { occurredAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findRecentByUser(userId: UserIdVO, limit: number): Promise<readonly EventEntity[]> {
    const rows = await this.model.findMany({
      where: { userId: userId.value },
      orderBy: { occurredAt: 'desc' },
      take: limit,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findUnprocessed(limit: number): Promise<readonly EventEntity[]> {
    const rows = await this.model.findMany({
      where: { status: 'received' },
      orderBy: { occurredAt: 'asc' },
      take: limit,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findFailed(limit: number): Promise<readonly EventEntity[]> {
    const rows = await this.model.findMany({
      where: { status: 'failed' },
      orderBy: { occurredAt: 'asc' },
      take: limit,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async bulkInsert(events: readonly EventEntity[]): Promise<number> {
    const data = events.map((e) => this.toPersistence(e)) as Array<{
      id: string;
      name: string;
      source: string;
      sessionId: string | null;
      userId: string | null;
      payloadKeys: number;
      occurredAt: Date;
      status: string;
      processedAt: Date | null;
      failureReason: string | null;
      version: number;
    }>;
    const result = await this.model.createMany({ data, skipDuplicates: true });
    return result.count;
  }

  async deleteOlderThan(cutoff: string): Promise<number> {
    const result = await this.model.deleteMany({
      where: { occurredAt: { lt: new Date(cutoff) } },
    });
    return result.count;
  }

  async existsByEventId(id: EventIdVO): Promise<boolean> {
    const count = await this.model.count({ where: { id: id.value } });
    return count > 0;
  }
}
