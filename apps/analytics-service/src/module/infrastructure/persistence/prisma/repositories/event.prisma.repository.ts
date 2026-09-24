import { Injectable } from '@nestjs/common';
import { Event as PrismaEvent, Prisma } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { EventEntity } from '../../../../domain/entities/event.entity';
import { EventIdVO } from '../../../../domain/value-objects/primitives/event-id.vo';
import { EventNameVO } from '../../../../domain/value-objects/primitives/event-name.vo';
import { EventSourceVO } from '../../../../domain/value-objects/primitives/event-source.vo';
import { EventTimestampVO } from '../../../../domain/value-objects/primitives/event-timestamp.vo';
import { EventPayloadVO } from '../../../../domain/value-objects/primitives/event-payload.vo';
import type { EventRepository } from '../../../../domain/repositories/event.repository.interface';

@Injectable()
export class EventPrismaRepository
  extends BasePrismaRepository<EventEntity, EventIdVO>
  implements EventRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaEvent): EventEntity {
    const payloadObj = (raw.payloadJson as Record<string, unknown>) ?? {};
    return EventEntity.reconstitute(
      EventIdVO.create(raw.id),
      {
        name: EventNameVO.create(raw.name),
        source: EventSourceVO.create(raw.source),
        timestamp: EventTimestampVO.create(raw.timestamp),
        payload: EventPayloadVO.create(payloadObj),
        processed: raw.processed,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: EventIdVO): Promise<EventEntity | null> {
    const raw = await this.prisma.event.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly EventEntity[]> {
    const rows = await this.prisma.event.findMany({
      where: { deletedAt: null },
      orderBy: { timestamp: 'desc' },
      take: 1000,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: EventEntity): Promise<EventEntity> {
    const payloadObj = entity.payload.toObject();
    const data = {
      name: entity.name.value,
      source: entity.source.value,
      timestamp: new Date(entity.timestamp.epochMs),
      payloadJson: payloadObj as Prisma.InputJsonValue,
      payloadSize: entity.payload.sizeBytes,
      processed: entity.processed,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.event.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: EventIdVO): Promise<void> {
    await this.prisma.event.delete({ where: { id: id.value } });
  }

  async findByName(name: EventNameVO): Promise<readonly EventEntity[]> {
    const rows = await this.prisma.event.findMany({
      where: { name: name.value, deletedAt: null },
      orderBy: { timestamp: 'desc' },
      take: 1000,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findBySource(source: EventSourceVO): Promise<readonly EventEntity[]> {
    const rows = await this.prisma.event.findMany({
      where: { source: source.value, deletedAt: null },
      orderBy: { timestamp: 'desc' },
      take: 1000,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findUnprocessed(limit: number): Promise<readonly EventEntity[]> {
    const rows = await this.prisma.event.findMany({
      where: { processed: false, deletedAt: null },
      orderBy: { timestamp: 'asc' },
      take: limit,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async countInWindow(
    source: EventSourceVO,
    startMs: number,
    endMs: number,
  ): Promise<number> {
    return this.prisma.event.count({
      where: {
        source: source.value,
        timestamp: { gte: new Date(startMs), lte: new Date(endMs) },
        deletedAt: null,
      },
    });
  }
}
