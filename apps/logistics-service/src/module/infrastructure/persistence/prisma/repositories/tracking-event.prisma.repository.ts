import { Injectable } from '@nestjs/common';
import { TrackingEvent as PrismaTrackingEvent } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { TrackingEventEntity } from '../../../../domain/entities/tracking-event.entity';
import { TrackingIdVO } from '../../../../domain/value-objects/primitives/tracking-id.vo';
import { TrackingEventVO } from '../../../../domain/value-objects/primitives/tracking-event.vo';
import type { TrackingEventRepository } from '../../../../domain/repositories/tracking-event.repository.interface';

@Injectable()
export class TrackingEventPrismaRepository
  extends BasePrismaRepository<TrackingEventEntity, string>
  implements TrackingEventRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaTrackingEvent): TrackingEventEntity {
    return TrackingEventEntity.reconstitute(
      raw.id,
      {
        trackingId: TrackingIdVO.create(raw.trackingId),
        eventType: TrackingEventVO.create(raw.eventType),
        location: null,
        note: raw.note,
        occurredAt: raw.occurredAt,
      },
      raw.createdAt.toISOString(),
      raw.createdAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<TrackingEventEntity | null> {
    const raw = await this.prisma.trackingEvent.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly TrackingEventEntity[]> {
    const rows = await this.prisma.trackingEvent.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: TrackingEventEntity): Promise<TrackingEventEntity> {
    const data = {
      trackingId: entity.trackingId.value,
      eventType: entity.eventType.value,
      note: entity.note,
      occurredAt: entity.occurredAt,
    };
    const raw = await this.prisma.trackingEvent.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.trackingEvent.delete({ where: { id } });
  }

  async findByTracking(trackingId: TrackingIdVO): Promise<readonly TrackingEventEntity[]> {
    const rows = await this.prisma.trackingEvent.findMany({ where: { trackingId: trackingId.value } });
    return rows.map((r) => this.toDomain(r));
  }

  async findRecent(trackingId: TrackingIdVO, limit: number): Promise<readonly TrackingEventEntity[]> {
    const rows = await this.prisma.trackingEvent.findMany({
      where: { trackingId: trackingId.value },
      orderBy: { occurredAt: 'desc' },
      take: limit,
    });
    return rows.map((r) => this.toDomain(r));
  }
}
