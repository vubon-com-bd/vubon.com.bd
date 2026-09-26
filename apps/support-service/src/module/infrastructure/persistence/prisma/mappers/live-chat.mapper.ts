/**
 * LiveChatMapper
 * @module support-service/infrastructure/persistence/prisma/mappers
 */
import { Injectable } from '@nestjs/common';
import type { LiveChat as PrismaLiveChat } from '@prisma/client';
import { LiveChatEntity } from '../../../../domain/entities/live-chat.entity';

@Injectable()
export class LiveChatMapper {
  toDomain(raw: PrismaLiveChat): LiveChatEntity {
    return LiveChatEntity.rehydrate({
      id: raw.id,
      userId: raw.userId,
      type: raw.type,
      status: raw.status,
      agentId: raw.agentId ?? undefined,
      messageIds: raw.messageIds,
      startedAt: raw.startedAt.toISOString(),
      endedAt: raw.endedAt?.toISOString(),
      endedReason: raw.endedReason ?? undefined,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
    });
  }

  toPersistence(entity: LiveChatEntity): {
    readonly id: string;
    readonly userId: string;
    readonly type: string;
    readonly status: string;
    readonly agentId: string | null;
    readonly messageIds: readonly string[];
    readonly startedAt: Date;
    readonly endedAt: Date | null;
    readonly endedReason: string | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
  } {
    const snap = entity.toSnapshot();
    return {
      id: snap.id,
      userId: snap.userId,
      type: snap.type,
      status: snap.status,
      agentId: snap.agentId ?? null,
      messageIds: snap.messageIds,
      startedAt: new Date(snap.startedAt),
      endedAt: snap.endedAt ? new Date(snap.endedAt) : null,
      endedReason: snap.endedReason ?? null,
      createdAt: new Date(snap.createdAt),
      updatedAt: new Date(snap.updatedAt),
    };
  }
}
