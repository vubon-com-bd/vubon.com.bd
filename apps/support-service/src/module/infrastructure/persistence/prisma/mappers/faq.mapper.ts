/**
 * FaqMapper — domain ↔ Prisma
 * @module support-service/infrastructure/persistence/prisma/mappers
 */
import { Injectable } from '@nestjs/common';
import type { Faq as PrismaFaq } from '@prisma/client';
import { FaqEntity } from '../../../../domain/entities/faq.entity';

@Injectable()
export class FaqMapper {
  toDomain(raw: PrismaFaq): FaqEntity {
    return FaqEntity.rehydrate({
      id: raw.id,
      question: raw.question,
      answer: raw.answer,
      status: raw.status,
      categoryId: raw.categoryId,
      authorId: raw.authorId,
      viewCount: raw.viewCount,
      helpfulCount: raw.helpfulCount,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
    });
  }

  toPersistence(entity: FaqEntity): {
    readonly id: string;
    readonly question: string;
    readonly answer: string;
    readonly status: string;
    readonly categoryId: string;
    readonly authorId: string;
    readonly viewCount: number;
    readonly helpfulCount: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
  } {
    const snap = entity.toSnapshot();
    return {
      id: snap.id,
      question: snap.question,
      answer: snap.answer,
      status: snap.status,
      categoryId: snap.categoryId,
      authorId: snap.authorId,
      viewCount: snap.viewCount,
      helpfulCount: snap.helpfulCount,
      createdAt: new Date(snap.createdAt),
      updatedAt: new Date(snap.updatedAt),
    };
  }
}
