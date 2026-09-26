/**
 * TicketMessageMapper — domain ↔ Prisma
 * @module support-service/infrastructure/persistence/prisma/mappers
 */
import { Injectable } from '@nestjs/common';
import type { TicketMessage as PrismaTicketMessage } from '@prisma/client';
import { TicketMessageEntity } from '../../../../domain/entities/ticket-message.entity';

export interface TicketMessagePersistenceData {
  readonly id: string;
  readonly ticketId: string;
  readonly content: string;
  readonly type: string;
  readonly status: string;
  readonly authorUserId: string | null;
  readonly authorAgentId: string | null;
  readonly isInternal: boolean;
  readonly attachments: readonly string[];
  readonly readAt: Date | null;
  readonly editedAt: Date | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
}

@Injectable()
export class TicketMessageMapper {
  toDomain(raw: PrismaTicketMessage): TicketMessageEntity {
    return TicketMessageEntity.rehydrate({
      id: raw.id,
      ticketId: raw.ticketId,
      content: raw.content,
      type: raw.type,
      status: raw.status,
      authorUserId: raw.authorUserId ?? undefined,
      authorAgentId: raw.authorAgentId ?? undefined,
      isInternal: raw.isInternal,
      attachmentIds: raw.attachments,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
    });
  }

  toPersistence(entity: TicketMessageEntity): TicketMessagePersistenceData {
    const snap = entity.toSnapshot();
    return {
      id: snap.id,
      ticketId: snap.ticketId,
      content: snap.content,
      type: snap.type,
      status: snap.status,
      authorUserId: snap.authorUserId ?? null,
      authorAgentId: snap.authorAgentId ?? null,
      isInternal: snap.isInternal,
      attachments: snap.attachmentIds ?? [],
      readAt: null,
      editedAt: null,
      createdAt: new Date(snap.createdAt),
      updatedAt: new Date(snap.updatedAt),
      deletedAt: null,
    };
  }
}
