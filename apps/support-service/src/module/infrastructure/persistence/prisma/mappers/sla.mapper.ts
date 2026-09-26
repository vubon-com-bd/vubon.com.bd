/**
 * SlaMapper
 * @module support-service/infrastructure/persistence/prisma/mappers
 */
import { Injectable } from '@nestjs/common';
import type { Sla as PrismaSla } from '@prisma/client';
import { SlaEntity } from '../../../../domain/entities/sla.entity';

@Injectable()
export class SlaMapper {
  toDomain(raw: PrismaSla): SlaEntity {
    return SlaEntity.rehydrate({
      id: raw.id,
      type: raw.type,
      target: raw.targetMinutes,
      status: raw.status,
      priority: raw.priority,
      ticketId: raw.ticketId,
      startedAt: raw.startedAt.toISOString(),
      endedAt: raw.endedAt?.toISOString(),
      elapsedMinutes: raw.elapsedMinutes,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
    });
  }

  toPersistence(entity: SlaEntity): {
    readonly id: string;
    readonly ticketId: string;
    readonly type: string;
    readonly targetMinutes: number;
    readonly status: string;
    readonly priority: string;
    readonly startedAt: Date;
    readonly endedAt: Date | null;
    readonly elapsedMinutes: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
  } {
    const snap = entity.toSnapshot();
    return {
      id: snap.id,
      ticketId: snap.ticketId,
      type: snap.type,
      targetMinutes: snap.target,
      status: snap.status,
      priority: snap.priority,
      startedAt: new Date(snap.startedAt),
      endedAt: snap.endedAt ? new Date(snap.endedAt) : null,
      elapsedMinutes: snap.elapsedMinutes,
      createdAt: new Date(snap.createdAt),
      updatedAt: new Date(snap.updatedAt),
    };
  }
}
