/**
 * TicketAttachmentMapper
 * @module support-service/infrastructure/persistence/prisma/mappers
 */
import { Injectable } from '@nestjs/common';
import type { TicketAttachment as PrismaTicketAttachment } from '@prisma/client';
import { TicketAttachmentEntity } from '../../../../domain/entities/ticket-attachment.entity';

@Injectable()
export class TicketAttachmentMapper {
  toDomain(raw: PrismaTicketAttachment): TicketAttachmentEntity {
    return TicketAttachmentEntity.rehydrate({
      id: raw.id,
      ticketId: raw.ticketId,
      type: raw.type,
      url: raw.url,
      size: raw.size,
      filename: raw.filename,
      uploadedByUserId: raw.uploadedByUser ?? undefined,
      messageId: raw.messageId ?? undefined,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
    });
  }

  toPersistence(entity: TicketAttachmentEntity): {
    readonly id: string;
    readonly ticketId: string;
    readonly messageId: string | null;
    readonly type: string;
    readonly url: string;
    readonly size: number;
    readonly filename: string;
    readonly uploadedByUser: string | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
  } {
    const snap = entity.toSnapshot();
    return {
      id: snap.id,
      ticketId: snap.ticketId,
      messageId: snap.messageId ?? null,
      type: snap.type,
      url: snap.url,
      size: snap.size,
      filename: snap.filename,
      uploadedByUser: snap.uploadedByUserId ?? null,
      createdAt: new Date(snap.createdAt),
      updatedAt: new Date(snap.updatedAt),
    };
  }
}
