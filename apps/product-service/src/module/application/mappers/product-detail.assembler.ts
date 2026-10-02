/**
 * ProductDetailAssembler — combines all sub-entities into a detail DTO
 */
import { ProductEntity } from '../../domain/entities/product.entity.js';
import { ProductVariantEntity } from '../../domain/entities/product-variant.entity.js';
import { ProductInventoryEntity } from '../../domain/entities/product-inventory.entity.js';
import { ProductPricingEntity } from '../../domain/entities/product-pricing.entity.js';
import { ProductAttributeEntity } from '../../domain/entities/product-attribute.entity.js';
import { ProductMapper } from './product.mapper.js';
import { VariantMapper } from './variant.mapper.js';
import { InventoryMapper } from './inventory.mapper.js';
import { PricingMapper } from './pricing.mapper.js';
import { AttributeMapper } from './attribute.mapper.js';
import type { ProductDetailResponseDTO } from '../dtos/responses/product-detail-response.dto.js';

export interface ProductDetailInput {
  readonly product: ProductEntity;
  readonly variants: readonly ProductVariantEntity[];
  readonly inventory: readonly ProductInventoryEntity[];
  readonly pricing: ProductPricingEntity | null;
  readonly attributes: readonly ProductAttributeEntity[];
}

export class ProductDetailAssembler {
  static assemble(input: ProductDetailInput): ProductDetailResponseDTO {
    return {
      product: ProductMapper.toResponse(input.product),
      variants: VariantMapper.toResponseList(input.variants),
      inventory: InventoryMapper.toResponseList(input.inventory),
      pricing: input.pricing ? PricingMapper.toResponse(input.pricing) : undefined,
      attributes: AttributeMapper.toResponseList(input.attributes),
    };
  }
}
