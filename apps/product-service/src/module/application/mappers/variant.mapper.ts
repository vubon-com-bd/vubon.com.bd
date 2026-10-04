/**
 * VariantMapper
 */
import { ProductVariantEntity } from '../../domain/entities/product-variant.entity.js';
import type { VariantResponseDTO } from '../dtos/responses/variant-response.dto.js';
import type { ProductId, VariantId, Money, Url } from '@vubon/shared-types/common';

export class VariantMapper {
  static toResponse(v: ProductVariantEntity): VariantResponseDTO {
    return {
      id: v.id as VariantId,
      productId: v.productId.value as ProductId,
      name: v.name.value,
      sku: v.sku.value,
      barcode: v.barcode,
      options: v.options.map((o) => ({ name: o.name, value: o.value })),
      price: v.price.amount as Money,
      compareAtPrice: v.compareAtPrice ? (v.compareAtPrice.amount as Money) : undefined,
      cost: v.cost ? (v.cost.amount as Money) : undefined,
      weight: v.weight,
      imageUrl: v.imageUrl as Url | undefined,
      status: v.status,
      stock: v.stock,
      createdAt: v.createdAt,
      updatedAt: v.updatedAt,
    };
  }

  static toResponseList(variants: readonly ProductVariantEntity[]): readonly VariantResponseDTO[] {
    return variants.map((v) => VariantMapper.toResponse(v));
  }
}
