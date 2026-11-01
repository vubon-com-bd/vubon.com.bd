/**
 * ProductMapper — Entity → Response DTO
 * @module product-service/application/mappers
 *
 * Multi-shape output:
 *  - toResponse: full (admin)
 *  - toPublicResponse: customer-safe
 *  - toSummary: list views
 *  - toListResponse: paginated
 *  - toDetail: with children (variants, attributes)
 *  - toStats: aggregated
 */
import type { ProductEntity } from '../../domain/entities/product.entity.js';
import type { ProductVariantEntity } from '../../domain/entities/product-variant.entity.js';
import type { ProductAttributeEntity } from '../../domain/entities/product-attribute.entity.js';
import type {
  ProductStatusValue,
  ProductTypeValue,
} from '@vubon/shared-types/business/product';
import type {
  ProductResponseDTO,
  ProductPublicResponseDTO,
  ProductSummaryResponseDTO,
  ProductListResponseDTO,
  ProductDetailResponseDTO,
  ProductStatsResponseDTO,
  VariantSummaryDTO,
  AttributeSummaryDTO,
} from '../dtos/responses/product-response.dto.js';

export class ProductMapper {
  // ─── Full (admin) ─────────────────────
  static toResponse(entity: ProductEntity): ProductResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      name: vo.name.value,
      slug: vo.slug.value,
      sku: vo.sku.value,
      description: vo.description?.value,
      shortDescription: vo.shortDescription?.value,
      type: vo.type.value as ProductTypeValue,
      status: vo.status.value as ProductStatusValue,
      categoryId: vo.categoryId.value,
      brandId: vo.brandId?.value,
      vendorId: vo.vendorId?.value,
      tags: [...vo.tags],
      images: [...vo.images],
      thumbnailUrl: vo.thumbnailUrl,
      videoUrl: vo.videoUrl,
      barcode: vo.barcode?.value,
      weightGrams: vo.weight?.grams,
      dimensions: vo.dimensions
        ? {
            length: vo.dimensions.length,
            width: vo.dimensions.width,
            height: vo.dimensions.height,
            unit: vo.dimensions.unit,
          }
        : undefined,
      totalStock: vo.totalStock,
      isFeatured: vo.isFeatured,
      isPublished: vo.isPublished,
      publishedAt: vo.publishedAt,
      rejectionReason: entity.rejectionReason,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  // ─── Public (customer-safe) ───────────
  static toPublicResponse(entity: ProductEntity): ProductPublicResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      name: vo.name.value,
      slug: vo.slug.value,
      shortDescription: vo.shortDescription?.value,
      type: vo.type.value as ProductTypeValue,
      status: vo.status.value as ProductStatusValue,
      categoryId: vo.categoryId.value,
      brandId: vo.brandId?.value,
      tags: [...vo.tags],
      images: [...vo.images],
      thumbnailUrl: vo.thumbnailUrl,
      totalStock: vo.totalStock,
      isFeatured: vo.isFeatured,
    };
  }

  // ─── Summary (list) ───────────────────
  static toSummary(entity: ProductEntity): ProductSummaryResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      name: vo.name.value,
      slug: vo.slug.value,
      sku: vo.sku.value,
      thumbnailUrl: vo.thumbnailUrl,
      type: vo.type.value as ProductTypeValue,
      status: vo.status.value as ProductStatusValue,
      totalStock: vo.totalStock,
      isFeatured: vo.isFeatured,
      createdAt: entity.createdAt,
    };
  }

  // ─── List (paginated) ─────────────────
  static toListResponse(
    entities: readonly ProductEntity[],
    total: number,
    page: number,
    limit: number,
  ): ProductListResponseDTO {
    const totalPages = Math.ceil(total / limit);
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }

  // ─── Variant child summary ────────────
  static toVariantSummary(variant: ProductVariantEntity): VariantSummaryDTO {
    return {
      id: variant.id,
      name: variant.vo.name.value,
      sku: variant.sku.value,
      price: variant.vo.price.value,
      currency: variant.vo.currency.value,
      stock: variant.stock.value,
      isActive: variant.isActive,
    };
  }

  // ─── Attribute child summary ──────────
  static toAttributeSummary(attribute: ProductAttributeEntity): AttributeSummaryDTO {
    return {
      id: attribute.id,
      name: attribute.name.value,
      type: 'text',
      values: attribute.vo.values.map((v) => v.asString()),
    };
  }

  // ─── Detail (with children) ───────────
  static toDetail(
    entity: ProductEntity,
    variants: readonly ProductVariantEntity[],
    attributes: readonly ProductAttributeEntity[],
  ): ProductDetailResponseDTO {
    return {
      product: this.toResponse(entity),
      variants: variants.map((v) => this.toVariantSummary(v)),
      attributes: attributes.map((a) => this.toAttributeSummary(a)),
      reviewSummary: undefined,
    };
  }

  // ─── Stats ────────────────────────────
  static toStatsResponse(stats: {
    total: number;
    publishedCount: number;
    draftCount: number;
    outOfStockCount: number;
    totalStockUnits: number;
    byStatus: Readonly<Record<string, number>>;
    byType: Readonly<Record<string, number>>;
  }): ProductStatsResponseDTO {
    return {
      total: stats.total,
      publishedCount: stats.publishedCount,
      draftCount: stats.draftCount,
      outOfStockCount: stats.outOfStockCount,
      totalStockUnits: stats.totalStockUnits,
      byStatus: stats.byStatus,
      byType: stats.byType,
    };
  }
}
