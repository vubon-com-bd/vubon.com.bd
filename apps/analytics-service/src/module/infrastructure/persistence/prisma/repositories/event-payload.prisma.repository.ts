import { Injectable } from '@nestjs/common';
import { EventPayload as PrismaEventPayload, Prisma } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { EventPayloadEntity } from '../../../../domain/entities/event-payload.entity';
import { EventIdVO } from '../../../../domain/value-objects/primitives/event-id.vo';
import { EventPayloadVO } from '../../../../domain/value-objects/primitives/event-payload.vo';
import type { EventPayloadRepository } from '../../../../domain/repositories/event-payload.repository.interface';

@Injectable()
export class EventPayloadPrismaRepository
  extends BasePrismaRepository<EventPayloadEntity, EventIdVO>
  implements EventPayloadRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaEventPayload): EventPayloadEntity {
    const payloadObj = (raw.payloadJson as Record<string, unknown>) ?? {};
    return EventPayloadEntity.reconstitute(
      EventIdVO.create(raw.eventId),
      {
        eventId: EventIdVO.create(raw.eventId),
        payload: EventPayloadVO.create(payloadObj),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: EventIdVO): Promise<EventPayloadEntity | null> {
    const raw = await this.prisma.eventPayload.findUnique({
      where: { eventId: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly EventPayloadEntity[]> {
    const rows = await this.prisma.eventPayload.findMany({
      orderBy: { createdAt: 'desc' },
      take: 1000,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: EventPayloadEntity): Promise<EventPayloadEntity> {
    const data = {
      eventId: entity.eventId.value,
      payloadJson: entity.payload.toObject() as Prisma.InputJsonValue,
      sizeBytes: entity.payload.sizeBytes,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.eventPayload.upsert({
      where: { eventId: entity.eventId.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: EventIdVO): Promise<void> {
    await this.prisma.eventPayload.deleteMany({ where: { eventId: id.value } });
  }

  async findByEventId(eventId: EventIdVO): Promise<EventPayloadEntity | null> {
    const raw = await this.prisma.eventPayload.findUnique({
      where: { eventId: eventId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
