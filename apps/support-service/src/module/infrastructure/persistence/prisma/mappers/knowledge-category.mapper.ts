/**
 * KnowledgeCategoryMapper
 * @module support-service/infrastructure/persistence/prisma/mappers
 */
import { Injectable } from '@nestjs/common';
import type { KnowledgeCategory as PrismaKnowledgeCategory } from '@prisma/client';
import { KnowledgeCategoryEntity } from '../../../../domain/entities/knowledge-category.entity';

@Injectable()
export class KnowledgeCategoryMapper {
  toDomain(raw: PrismaKnowledgeCategory): KnowledgeCategoryEntity {
    return KnowledgeCategoryEntity.rehydrate({
      id: raw.id,
      name: raw.name,
      slug: raw.slug,
      description: raw.description ?? undefined,
      sortOrder: raw.sortOrder,
      parentId: raw.parentId ?? undefined,
      isActive: raw.isActive,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
    });
  }

  toPersistence(entity: KnowledgeCategoryEntity): {
    readonly id: string;
    readonly name: string;
    readonly slug: string;
    readonly description: string | null;
    readonly sortOrder: number;
    readonly parentId: string | null;
    readonly isActive: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
  } {
    const snap = entity.toSnapshot();
    return {
      id: snap.id,
      name: snap.name,
      slug: snap.slug,
      description: snap.description ?? null,
      sortOrder: snap.sortOrder,
      parentId: snap.parentId ?? null,
      isActive: snap.isActive,
      createdAt: new Date(snap.createdAt),
      updatedAt: new Date(snap.updatedAt),
    };
  }
}
