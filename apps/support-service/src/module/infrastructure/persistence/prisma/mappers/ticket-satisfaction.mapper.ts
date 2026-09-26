/**
 * TicketSatisfactionMapper
 * @module support-service/infrastructure/persistence/prisma/mappers
 */
import { Injectable } from '@nestjs/common';
import type { TicketSatisfaction as PrismaTicketSatisfaction } from '@prisma/client';
import { TicketSatisfactionEntity } from '../../../../domain/entities/ticket-satisfaction.entity';

@Injectable()
export class TicketSatisfactionMapper {
  toDomain(raw: PrismaTicketSatisfaction): TicketSatisfactionEntity {
    return TicketSatisfactionEntity.rehydrate({
      id: raw.id,
      ticketId: raw.ticketId,
      score: raw.score,
      userId: raw.userId,
      comment: raw.comment ?? undefined,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
    });
  }

  toPersistence(entity: TicketSatisfactionEntity): {
    readonly id: string;
    readonly ticketId: string;
    readonly score: number;
    readonly userId: string;
    readonly comment: string | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
  } {
    const snap = entity.toSnapshot();
    return {
      id: snap.id,
      ticketId: snap.ticketId,
      score: snap.score,
      userId: snap.userId,
      comment: snap.comment ?? null,
      createdAt: new Date(snap.createdAt),
      updatedAt: new Date(snap.updatedAt),
    };
  }
}
