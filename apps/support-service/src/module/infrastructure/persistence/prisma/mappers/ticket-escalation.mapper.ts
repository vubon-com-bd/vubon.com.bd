/**
 * TicketEscalationMapper
 * @module support-service/infrastructure/persistence/prisma/mappers
 */
import { Injectable } from '@nestjs/common';
import type { TicketEscalation as PrismaTicketEscalation } from '@prisma/client';
import { TicketEscalationEntity } from '../../../../domain/entities/ticket-escalation.entity';

@Injectable()
export class TicketEscalationMapper {
  toDomain(raw: PrismaTicketEscalation): TicketEscalationEntity {
    return TicketEscalationEntity.rehydrate({
      id: raw.id,
      ticketId: raw.ticketId,
      level: raw.level,
      reason: raw.reason,
      escalatedBy: raw.escalatedBy ?? undefined,
      resolvedAt: raw.resolvedAt?.toISOString(),
      resolution: raw.resolution ?? undefined,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
    });
  }

  toPersistence(entity: TicketEscalationEntity): {
    readonly id: string;
    readonly ticketId: string;
    readonly level: string;
    readonly reason: string;
    readonly escalatedBy: string | null;
    readonly resolvedAt: Date | null;
    readonly resolution: string | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
  } {
    const snap = entity.toSnapshot();
    return {
      id: snap.id,
      ticketId: snap.ticketId,
      level: snap.level,
      reason: snap.reason,
      escalatedBy: snap.escalatedBy ?? null,
      resolvedAt: snap.resolvedAt ? new Date(snap.resolvedAt) : null,
      resolution: snap.resolution ?? null,
      createdAt: new Date(snap.createdAt),
      updatedAt: new Date(snap.updatedAt),
    };
  }
}
