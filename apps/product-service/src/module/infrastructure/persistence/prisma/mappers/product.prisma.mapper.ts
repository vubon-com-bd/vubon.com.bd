/**
 * ProductPrismaMapper — Row ↔ Domain Entity
 * @module product-service/infrastructure/persistence/prisma/mappers
 */
import { ProductEntity } from '../../../../domain/entities/product.entity.js';
import { ProductVO } from '../../../../domain/value-objects/composites/product.vo.js';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo.js';
import { ProductNameVO } from '../../../../domain/value-objects/primitives/product-name.vo.js';
import { ProductSlugVO } from '../../../../domain/value-objects/primitives/product-slug.vo.js';
import { ProductSkuVO } from '../../../../domain/value-objects/primitives/product-sku.vo.js';
import { ProductBarcodeVO } from '../../../../domain/value-objects/primitives/product-barcode.vo.js';
import { ProductStatusVO } from '../../../../domain/value-objects/primitives/product-status.vo.js';
import { ProductTypeVO } from '../../../../domain/value-objects/primitives/product-type.vo.js';
import { ProductWeightVO } from '../../../../domain/value-objects/primitives/product-weight.vo.js';
import { ProductDimensionVO } from '../../../../domain/value-objects/primitives/product-dimension.vo.js';
import { ProductDescriptionVO } from '../../../../domain/value-objects/primitives/product-description.vo.js';
import { CategoryIdVO } from '../../../../domain/value-objects/primitives/category-id.vo.js';
import { BrandIdVO } from '../../../../domain/value-objects/primitives/brand-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';

export interface PrismaProductRow {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string | null;
  shortDescription: string | null;
  type: string;
  status: string;
  categoryId: string;
  brandId: string | null;
  vendorId: string | null;
  tags: string[];
  images: string[];
  thumbnailUrl: string | null;
  videoUrl: string | null;
  barcode: string | null;
  weightGrams: number | null;
  dimensionLength: number | null;
  dimensionWidth: number | null;
  dimensionHeight: number | null;
  dimensionUnit: string | null;
  totalStock: number;
  isFeatured: boolean;
  isPublished: boolean;
  publishedAt: Date | null;
  rejectionReason: string | null;
  archivedAt: Date | null;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  deletedBy: string | null;
}

const toIso = (d: Date | null | undefined): string | undefined =>
  d ? new Date(d).toISOString() : undefined;

export class ProductPrismaMapper {
  static toDomain(raw: PrismaProductRow): ProductEntity {
    const createdAt = new Date(raw.createdAt).toISOString();
    const updatedAt = new Date(raw.updatedAt).toISOString();

    const dimension =
      raw.dimensionLength !== null &&
      raw.dimensionWidth !== null &&
      raw.dimensionHeight !== null &&
      raw.dimensionUnit !== null
        ? ProductDimensionVO.reconstitute({
            length: raw.dimensionLength,
            width: raw.dimensionWidth,
            height: raw.dimensionHeight,
            unit: raw.dimensionUnit as 'cm' | 'in',
          })
        : undefined;

    const vo = ProductVO.reconstitute({
      id: ProductIdVO.reconstitute(raw.id),
      name: ProductNameVO.reconstitute(raw.name),
      slug: ProductSlugVO.reconstitute(raw.slug),
      sku: ProductSkuVO.reconstitute(raw.sku),
      description: raw.description
        ? ProductDescriptionVO.reconstitute(raw.description)
        : undefined,
      shortDescription: raw.shortDescription
        ? ProductDescriptionVO.reconstitute(raw.shortDescription)
        : undefined,
      type: ProductTypeVO.reconstitute(raw.type),
      status: ProductStatusVO.reconstitute(raw.status),
      categoryId: CategoryIdVO.reconstitute(raw.categoryId),
      brandId: raw.brandId ? BrandIdVO.reconstitute(raw.brandId) : undefined,
      vendorId: raw.vendorId ? VendorIdVO.reconstitute(raw.vendorId) : undefined,
      tags: raw.tags,
      images: raw.images,
      thumbnailUrl: raw.thumbnailUrl ?? undefined,
      videoUrl: raw.videoUrl ?? undefined,
      barcode: raw.barcode ? ProductBarcodeVO.reconstitute(raw.barcode) : undefined,
      weight:
        raw.weightGrams !== null ? ProductWeightVO.reconstitute(raw.weightGrams) : undefined,
      dimensions: dimension,
      totalStock: raw.totalStock,
      isFeatured: raw.isFeatured,
      isPublished: raw.isPublished,
      publishedAt: toIso(raw.publishedAt),
    });

    return ProductEntity.reconstitute({
      id: raw.id,
      createdAt,
      updatedAt,
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      vo,
      rejectionReason: raw.rejectionReason ?? undefined,
      archivedAt: toIso(raw.archivedAt),
      deletedBy: raw.deletedBy ?? undefined,
      version: raw.version,
    });
  }

  static toPersistence(entity: ProductEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      name: vo.name.value,
      slug: vo.slug.value,
      sku: vo.sku.value,
      description: vo.description?.value ?? null,
      shortDescription: vo.shortDescription?.value ?? null,
      type: vo.type.value,
      status: vo.status.value,
      categoryId: vo.categoryId.value,
      brandId: vo.brandId?.value ?? null,
      vendorId: vo.vendorId?.value ?? null,
      tags: [...vo.tags],
      images: [...vo.images],
      thumbnailUrl: vo.thumbnailUrl ?? null,
      videoUrl: vo.videoUrl ?? null,
      barcode: vo.barcode?.value ?? null,
      weightGrams: vo.weight?.grams ?? null,
      dimensionLength: vo.dimensions?.length ?? null,
      dimensionWidth: vo.dimensions?.width ?? null,
      dimensionHeight: vo.dimensions?.height ?? null,
      dimensionUnit: vo.dimensions?.unit ?? null,
      totalStock: vo.totalStock,
      isFeatured: vo.isFeatured,
      isPublished: vo.isPublished,
      publishedAt: vo.publishedAt ? new Date(vo.publishedAt) : null,
      rejectionReason: entity.rejectionReason ?? null,
      archivedAt: entity.archivedAt ? new Date(entity.archivedAt) : null,
      deletedBy: entity.deletedBy ?? null,
      version: entity.version,
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
