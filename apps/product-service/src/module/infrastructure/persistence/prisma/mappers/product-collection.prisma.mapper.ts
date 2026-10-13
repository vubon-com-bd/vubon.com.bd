/**
 * ProductCollectionPrismaMapper
 * @module product-service/infrastructure/persistence/prisma/mappers
 */
import { ProductCollectionEntity } from '../../../../domain/entities/product-collection.entity.js';
import { ProductCollectionVO } from '../../../../domain/value-objects/composites/product-collection.vo.js';
import { CollectionIdVO } from '../../../../domain/value-objects/primitives/collection-id.vo.js';
import { CollectionNameVO } from '../../../../domain/value-objects/primitives/collection-name.vo.js';
import { CollectionTypeVO } from '../../../../domain/value-objects/primitives/collection-type.vo.js';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo.js';

export interface PrismaProductCollectionRow {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  type: string;
  status: string;
  imageUrl: string | null;
  bannerUrl: string | null;
  isFeatured: boolean;
  sortOrder: number;
  startAt: Date | null;
  endAt: Date | null;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  deletedBy: string | null;
  products?: Array<{ productId: string }>;
}

const toIso = (d: Date | null): string | undefined => (d ? new Date(d).toISOString() : undefined);

export class ProductCollectionPrismaMapper {
  static toDomain(raw: PrismaProductCollectionRow): ProductCollectionEntity {
    const productIds = (raw.products ?? []).map((p) =>
      ProductIdVO.reconstitute(p.productId),
    );
    const isActive = raw.status === 'active';

    const vo = ProductCollectionVO.reconstitute({
      id: CollectionIdVO.reconstitute(raw.id),
      name: CollectionNameVO.reconstitute(raw.name),
      slug: raw.slug,
      type: CollectionTypeVO.reconstitute(raw.type),
      description: raw.description ?? undefined,
      imageUrl: raw.imageUrl ?? undefined,
      productIds,
      isFeatured: raw.isFeatured,
      sortOrder: raw.sortOrder,
      startAt: toIso(raw.startAt),
      endAt: toIso(raw.endAt),
    });

    return ProductCollectionEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      vo,
      isActive,
      deletedBy: raw.deletedBy ?? undefined,
      version: raw.version,
    });
  }

  static toPersistence(entity: ProductCollectionEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      name: vo.name.value,
      slug: vo.slug,
      description: vo.description ?? null,
      type: vo.type.value,
      status: entity.isActive ? 'active' : 'inactive',
      imageUrl: vo.imageUrl ?? null,
      bannerUrl: null,
      isFeatured: vo.isFeatured,
      sortOrder: vo.sortOrder,
      startAt: vo.startAt ? new Date(vo.startAt) : null,
      endAt: vo.endAt ? new Date(vo.endAt) : null,
      version: entity.version,
      deletedBy: entity.deletedBy ?? null,
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
