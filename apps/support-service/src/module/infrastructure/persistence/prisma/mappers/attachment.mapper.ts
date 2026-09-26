/**
 * AttachmentMapper — domain ↔ Prisma (SupportAttachment model)
 * @module support-service/infrastructure/persistence/prisma/mappers
 */
import { Injectable } from '@nestjs/common';
import type { SupportAttachment as PrismaSupportAttachment } from '@prisma/client';
import { AttachmentEntity } from '../../../../domain/entities/attachment.entity';

@Injectable()
export class AttachmentMapper {
  toDomain(raw: PrismaSupportAttachment): AttachmentEntity {
    return AttachmentEntity.rehydrate({
      id: raw.id,
      messageId: raw.messageId,
      type: raw.type,
      url: raw.url,
      size: raw.size ?? undefined,
      filename: raw.filename,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
    });
  }

  toPersistence(entity: AttachmentEntity): {
    readonly id: string;
    readonly messageId: string;
    readonly type: string;
    readonly url: string;
    readonly size: number | null;
    readonly filename: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
  } {
    const snap = entity.toSnapshot();
    return {
      id: snap.id,
      messageId: snap.messageId,
      type: snap.type,
      url: snap.url,
      size: snap.size ?? null,
      filename: snap.filename,
      createdAt: new Date(snap.createdAt),
      updatedAt: new Date(snap.updatedAt),
    };
  }
}
