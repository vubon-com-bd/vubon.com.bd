/**
 * SupportAgentMapper — domain ↔ Prisma
 * @module support-service/infrastructure/persistence/prisma/mappers
 */
import { Injectable } from '@nestjs/common';
import type { SupportAgent as PrismaSupportAgent } from '@prisma/client';
import { SupportAgentEntity } from '../../../../domain/entities/support-agent.entity';

@Injectable()
export class SupportAgentMapper {
  toDomain(raw: PrismaSupportAgent): SupportAgentEntity {
    return SupportAgentEntity.rehydrate({
      id: raw.id,
      userId: raw.userId,
      type: raw.type,
      status: raw.status,
      teamId: raw.teamId ?? undefined,
      maxConcurrentTickets: raw.maxConcurrentTickets,
      currentTicketIds: raw.currentTicketIds,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
    });
  }

  toPersistence(entity: SupportAgentEntity): {
    readonly id: string;
    readonly userId: string;
    readonly type: string;
    readonly status: string;
    readonly teamId: string | null;
    readonly maxConcurrentTickets: number;
    readonly currentTicketIds: readonly string[];
    readonly createdAt: Date;
    readonly updatedAt: Date;
  } {
    const snap = entity.toSnapshot();
    return {
      id: snap.id,
      userId: snap.userId,
      type: snap.type,
      status: snap.status,
      teamId: snap.teamId ?? null,
      maxConcurrentTickets: snap.maxConcurrentTickets,
      currentTicketIds: snap.currentTicketIds,
      createdAt: new Date(snap.createdAt),
      updatedAt: new Date(snap.updatedAt),
    };
  }
}
