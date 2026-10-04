/**
 * ProductDetailResponseDTO
 */
import type { ProductResponseDTO } from './product-response.dto.js';
import type { VariantResponseDTO } from './variant-response.dto.js';
import type { InventoryResponseDTO } from './inventory-response.dto.js';
import type { PricingResponseDTO } from './pricing-response.dto.js';
import type { AttributeResponseDTO } from './attribute-response.dto.js';

export interface ProductDetailResponseDTO {
  readonly product: ProductResponseDTO;
  readonly variants: readonly VariantResponseDTO[];
  readonly inventory: readonly InventoryResponseDTO[];
  readonly pricing?: PricingResponseDTO;
  readonly attributes: readonly AttributeResponseDTO[];
}
