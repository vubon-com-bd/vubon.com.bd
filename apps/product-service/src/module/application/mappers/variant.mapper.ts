/**
 * VariantMapper — Entity → Response DTO
 * @module product-service/application/mappers
 */
import type { ProductVariantEntity } from '../../domain/entities/product-variant.entity.js';
import type {
  VariantStatusValue,
  VariantTypeValue,
} from '@vubon/shared-types/business/product';
import type {
  VariantResponseDTO,
  VariantPublicResponseDTO,
  VariantSummaryResponseDTO,
  VariantListResponseDTO,
  VariantStatsResponseDTO,
} from '../dtos/responses/variant-response.dto.js';

export class VariantMapper {
  static toResponse(entity: ProductVariantEntity): VariantResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      productId: vo.productId.value,
      name: vo.name.value,
      sku: vo.sku.value,
      barcode: undefined,
      type: (vo.options[0]?.name ?? 'size') as VariantTypeValue,
      options: vo.options.map((o) => ({ name: o.name, value: o.value })),
      price: vo.price.value,
      compareAtPrice: vo.compareAtPrice?.value,
      cost: vo.cost?.value,
      currency: vo.currency.value,
      weightGrams: vo.weightGrams,
      imageUrl: vo.imageUrl,
      status: (vo.isActive ? 'active' : 'inactive') as VariantStatusValue,
      stock: vo.stock.value,
      isActive: vo.isActive,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toPublicResponse(entity: ProductVariantEntity): VariantPublicResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      name: vo.name.value,
      sku: vo.sku.value,
      options: vo.options.map((o) => ({ name: o.name, value: o.value })),
      price: vo.price.value,
      compareAtPrice: vo.compareAtPrice?.value,
      currency: vo.currency.value,
      imageUrl: vo.imageUrl,
      stock: vo.stock.value,
      isActive: vo.isActive,
    };
  }

  static toSummary(entity: ProductVariantEntity): VariantSummaryResponseDTO {
    return {
      id: entity.id,
      name: entity.vo.name.value,
      sku: entity.sku.value,
      price: entity.vo.price.value,
      currency: entity.vo.currency.value,
      stock: entity.stock.value,
      isActive: entity.isActive,
    };
  }

  static toListResponse(
    entities: readonly ProductVariantEntity[],
    total: number,
    page: number,
    limit: number,
  ): VariantListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static toStatsResponse(stats: {
    total: number;
    activeCount: number;
    outOfStockCount: number;
    totalStockUnits: number;
  }): VariantStatsResponseDTO {
    return {
      total: stats.total,
      activeCount: stats.activeCount,
      outOfStockCount: stats.outOfStockCount,
      totalStockUnits: stats.totalStockUnits,
    };
  }
}
