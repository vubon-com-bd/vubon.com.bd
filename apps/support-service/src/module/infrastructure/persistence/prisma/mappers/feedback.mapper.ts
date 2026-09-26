/**
 * FeedbackMapper
 * @module support-service/infrastructure/persistence/prisma/mappers
 */
import { Injectable } from '@nestjs/common';
import type { Feedback as PrismaFeedback } from '@prisma/client';
import { FeedbackEntity } from '../../../../domain/entities/feedback.entity';

@Injectable()
export class FeedbackMapper {
  toDomain(raw: PrismaFeedback): FeedbackEntity {
    return FeedbackEntity.rehydrate({
      id: raw.id,
      type: raw.type,
      status: raw.status,
      content: raw.content,
      userId: raw.userId,
      rating: raw.rating ?? undefined,
      ticketId: raw.ticketId ?? undefined,
      orderId: raw.orderId ?? undefined,
      reviewerId: raw.reviewerId ?? undefined,
      reviewedAt: raw.reviewedAt?.toISOString(),
      reviewOutcome: raw.reviewOutcome ?? undefined,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
    });
  }

  toPersistence(entity: FeedbackEntity): {
    readonly id: string;
    readonly type: string;
    readonly status: string;
    readonly content: string;
    readonly userId: string;
    readonly rating: number | null;
    readonly ticketId: string | null;
    readonly orderId: string | null;
    readonly reviewerId: string | null;
    readonly reviewedAt: Date | null;
    readonly reviewOutcome: string | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
  } {
    const snap = entity.toSnapshot();
    return {
      id: snap.id,
      type: snap.type,
      status: snap.status,
      content: snap.content,
      userId: snap.userId,
      rating: snap.rating ?? null,
      ticketId: snap.ticketId ?? null,
      orderId: snap.orderId ?? null,
      reviewerId: snap.reviewerId ?? null,
      reviewedAt: snap.reviewedAt ? new Date(snap.reviewedAt) : null,
      reviewOutcome: snap.reviewOutcome ?? null,
      createdAt: new Date(snap.createdAt),
      updatedAt: new Date(snap.updatedAt),
    };
  }
}
