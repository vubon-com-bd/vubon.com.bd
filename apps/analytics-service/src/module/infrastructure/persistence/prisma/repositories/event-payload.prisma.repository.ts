/**
 * Event Payload Prisma Repository
 * @module analytics-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { AnalyticsBasePrismaRepository } from '../base.prisma.repository.js';
import { AnalyticsPrismaService } from '../prisma.service.js';
import { EventPayloadEntity } from '../../../../domain/entities/event-payload.entity.js';
import { EventPayloadVO } from '../../../../domain/value-objects/primitives/event-payload.vo.js';
import { EventIdVO } from '../../../../domain/value-objects/primitives/event-id.vo.js';
import type { EventPayloadRepository as IEventPayloadRepository } from '../../../../domain/repositories/event-payload.repository.interface.js';

type PrismaPayloadRow = {
  id: string;
  eventId: string;
  payload: unknown;
  sizeBytes: number;
  keyCount: number;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class EventPayloadPrismaRepository
  extends AnalyticsBasePrismaRepository<EventPayloadEntity, PrismaPayloadRow, string>
  implements IEventPayloadRepository
{
  protected readonly delegateName = 'analyticsEventPayload';

  constructor(prisma: AnalyticsPrismaService) {
    super(prisma);
  }

  protected toDomain(raw: PrismaPayloadRow): EventPayloadEntity {
    return EventPayloadEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      props: {
        eventId: EventIdVO.fromGeneric(raw.eventId),
        payload: EventPayloadVO.create(raw.payload as Record<string, unknown>),
      },
    });
  }

  protected toPersistence(domain: EventPayloadEntity): Record<string, unknown> {
    return {
      id: domain.id,
      eventId: domain.eventId.value,
      payload: domain.payload.payload,
      sizeBytes: domain.payload.sizeInBytes(),
      keyCount: domain.payload.keyCount(),
    };
  }

  protected idOf(domain: EventPayloadEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  async findByEventId(eventId: EventIdVO): Promise<EventPayloadEntity | null> {
    const raw = await this.model.findUnique({
      where: { eventId: eventId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findByEventIds(eventIds: readonly EventIdVO[]): Promise<readonly EventPayloadEntity[]> {
    if (eventIds.length === 0) return [];
    const rows = await this.model.findMany({
      where: { eventId: { in: eventIds.map((id) => id.value) } },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async deleteByEventId(eventId: EventIdVO): Promise<void> {
    await this.model.deleteMany({
      where: { eventId: eventId.value },
    });
  }

  async deleteByEventIds(eventIds: readonly EventIdVO[]): Promise<number> {
    if (eventIds.length === 0) return 0;
    const result = await this.model.deleteMany({
      where: { eventId: { in: eventIds.map((id) => id.value) } },
    });
    return result.count;
  }
}
