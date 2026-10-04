/**
 * Product Detail Response DTO
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductResponseDTO } from './product.response.dto.js';
import { VariantResponseDTO } from './variant.response.dto.js';
import { InventoryResponseDTO } from './inventory.response.dto.js';
import { PricingResponseDTO } from './pricing.response.dto.js';
import { AttributeResponseDTO } from './attribute.response.dto.js';

export class ProductDetailResponseDTO {
  @ApiProperty({ type: ProductResponseDTO })
  readonly product!: ProductResponseDTO;

  @ApiProperty({ type: [VariantResponseDTO] })
  readonly variants!: readonly VariantResponseDTO[];

  @ApiProperty({ type: [InventoryResponseDTO] })
  readonly inventory!: readonly InventoryResponseDTO[];

  @ApiPropertyOptional({ type: PricingResponseDTO })
  readonly pricing?: PricingResponseDTO;

  @ApiProperty({ type: [AttributeResponseDTO] })
  readonly attributes!: readonly AttributeResponseDTO[];
}
