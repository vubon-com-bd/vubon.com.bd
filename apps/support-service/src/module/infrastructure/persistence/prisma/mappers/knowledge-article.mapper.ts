/**
 * KnowledgeArticleMapper
 * @module support-service/infrastructure/persistence/prisma/mappers
 */
import { Injectable } from '@nestjs/common';
import type { KnowledgeArticle as PrismaKnowledgeArticle } from '@prisma/client';
import { KnowledgeArticleEntity } from '../../../../domain/entities/knowledge-article.entity';

@Injectable()
export class KnowledgeArticleMapper {
  toDomain(raw: PrismaKnowledgeArticle): KnowledgeArticleEntity {
    return KnowledgeArticleEntity.rehydrate({
      id: raw.id,
      title: raw.title,
      body: raw.body,
      status: raw.status,
      categoryId: raw.categoryId,
      authorId: raw.authorId,
      tags: raw.tags,
      viewCount: raw.viewCount,
      helpfulCount: raw.helpfulCount,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
    });
  }

  toPersistence(entity: KnowledgeArticleEntity): {
    readonly id: string;
    readonly title: string;
    readonly body: string;
    readonly status: string;
    readonly categoryId: string;
    readonly authorId: string;
    readonly tags: readonly string[];
    readonly viewCount: number;
    readonly helpfulCount: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
  } {
    const snap = entity.toSnapshot();
    return {
      id: snap.id,
      title: snap.title,
      body: snap.body,
      status: snap.status,
      categoryId: snap.categoryId,
      authorId: snap.authorId,
      tags: snap.tags,
      viewCount: snap.viewCount,
      helpfulCount: snap.helpfulCount,
      createdAt: new Date(snap.createdAt),
      updatedAt: new Date(snap.updatedAt),
    };
  }
}
