/**
 * ConversationMapper — domain ↔ Prisma
 * @module support-service/infrastructure/persistence/prisma/mappers
 */
import { Injectable } from '@nestjs/common';
import type { Conversation as PrismaConversation } from '@prisma/client';
import { ConversationEntity } from '../../../../domain/entities/conversation.entity';

export interface ConversationPersistenceData {
  readonly id: string;
  readonly userId: string;
  readonly type: string;
  readonly status: string;
  readonly ticketId: string | null;
  readonly assignedAgentId: string | null;
  readonly endedAt: Date | null;
  readonly endedReason: string | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

@Injectable()
export class ConversationMapper {
  toDomain(raw: PrismaConversation): ConversationEntity {
    return ConversationEntity.rehydrate({
      id: raw.id,
      userId: raw.userId,
      type: raw.type,
      status: raw.status,
      assignedAgentId: raw.assignedAgentId ?? undefined,
      ticketId: raw.ticketId ?? undefined,
      endedAt: raw.endedAt?.toISOString(),
      endedReason: raw.endedReason ?? undefined,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
    });
  }

  toPersistence(entity: ConversationEntity): ConversationPersistenceData {
    const snap = entity.toSnapshot();
    return {
      id: snap.id,
      userId: snap.userId,
      type: snap.type,
      status: snap.status,
      ticketId: snap.ticketId ?? null,
      assignedAgentId: snap.assignedAgentId ?? null,
      endedAt: snap.endedAt ? new Date(snap.endedAt) : null,
      endedReason: snap.endedReason ?? null,
      createdAt: new Date(snap.createdAt),
      updatedAt: new Date(snap.updatedAt),
    };
  }
}
