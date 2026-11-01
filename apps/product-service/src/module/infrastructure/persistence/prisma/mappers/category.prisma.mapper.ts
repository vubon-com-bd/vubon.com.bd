/**
 * CategoryPrismaMapper
 * @module product-service/infrastructure/persistence/prisma/mappers
 */
import { CategoryEntity } from '../../../../domain/entities/category.entity.js';
import { CategoryVO } from '../../../../domain/value-objects/composites/category.vo.js';
import { CategoryIdVO } from '../../../../domain/value-objects/primitives/category-id.vo.js';
import { CategoryNameVO } from '../../../../domain/value-objects/primitives/category-name.vo.js';
import { CategorySlugVO } from '../../../../domain/value-objects/primitives/category-slug.vo.js';
import { CategoryPathVO } from '../../../../domain/value-objects/primitives/category-path.vo.js';

export interface PrismaCategoryRow {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parentId: string | null;
  path: string[];
  depth: number;
  status: string;
  imageUrl: string | null;
  iconUrl: string | null;
  sortOrder: number;
  productCount: number;
  isFeatured: boolean;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  deletedBy: string | null;
}

export class CategoryPrismaMapper {
  static toDomain(raw: PrismaCategoryRow): CategoryEntity {
    const pathArr = Array.isArray(raw.path) && raw.path.length > 0 ? raw.path : [raw.id];

    const vo = CategoryVO.reconstitute({
      id: CategoryIdVO.reconstitute(raw.id),
      name: CategoryNameVO.reconstitute(raw.name),
      slug: CategorySlugVO.reconstitute(raw.slug),
      description: raw.description ?? undefined,
      parentId: raw.parentId ? CategoryIdVO.reconstitute(raw.parentId) : undefined,
      path: CategoryPathVO.reconstitute(pathArr),
      status: raw.status,
      imageUrl: raw.imageUrl ?? undefined,
      iconUrl: raw.iconUrl ?? undefined,
      sortOrder: raw.sortOrder,
      productCount: raw.productCount,
      isFeatured: raw.isFeatured,
    });

    return CategoryEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      vo,
      deletedBy: raw.deletedBy ?? undefined,
      version: raw.version,
    });
  }

  static toPersistence(entity: CategoryEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      name: vo.name.value,
      slug: vo.slug.value,
      description: vo.description ?? null,
      parentId: vo.parentId?.value ?? null,
      path: [...vo.path.value],
      depth: vo.depth,
      status: vo.status,
      imageUrl: vo.imageUrl ?? null,
      iconUrl: vo.iconUrl ?? null,
      sortOrder: vo.sortOrder,
      productCount: vo.productCount,
      isFeatured: vo.isFeatured,
      version: entity.version,
      deletedBy: entity.deletedBy ?? null,
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
