/**
 * MessageMapper — domain ↔ Prisma (SupportMessage model)
 * @module support-service/infrastructure/persistence/prisma/mappers
 */
import { Injectable } from '@nestjs/common';
import type { SupportMessage as PrismaSupportMessage } from '@prisma/client';
import { MessageEntity } from '../../../../domain/entities/message.entity';

export interface MessagePersistenceData {
  readonly id: string;
  readonly conversationId: string;
  readonly ticketId: string | null;
  readonly senderKind: string;
  readonly senderUserId: string | null;
  readonly senderAgentId: string | null;
  readonly content: string;
  readonly type: string;
  readonly status: string;
  readonly attachments: readonly string[];
  readonly readAt: Date | null;
  readonly editedAt: Date | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

@Injectable()
export class MessageMapper {
  toDomain(raw: PrismaSupportMessage): MessageEntity {
    return MessageEntity.rehydrate({
      id: raw.id,
      conversationId: raw.conversationId,
      content: raw.content,
      type: raw.type,
      status: raw.status,
      senderKind: raw.senderKind as 'user' | 'agent' | 'system',
      senderUserId: raw.senderUserId ?? undefined,
      senderAgentId: raw.senderAgentId ?? undefined,
      readAt: raw.readAt?.toISOString(),
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
    });
  }

  toPersistence(entity: MessageEntity): MessagePersistenceData {
    const snap = entity.toSnapshot();
    return {
      id: snap.id,
      conversationId: snap.conversationId,
      ticketId: null,
      senderKind: snap.senderKind,
      senderUserId: snap.senderUserId ?? null,
      senderAgentId: snap.senderAgentId ?? null,
      content: snap.content,
      type: snap.type,
      status: snap.status,
      attachments: [],
      readAt: snap.readAt ? new Date(snap.readAt) : null,
      editedAt: null,
      createdAt: new Date(snap.createdAt),
      updatedAt: new Date(snap.updatedAt),
    };
  }
}
