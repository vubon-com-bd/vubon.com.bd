/**
 * Pricing HTTP Response DTOs
 * @module product-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PricingHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly productId!: string;
  @ApiPropertyOptional() readonly variantId?: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly basePrice!: number;
  @ApiProperty() readonly sellingPrice!: number;
  @ApiPropertyOptional() readonly compareAtPrice?: number;
  @ApiPropertyOptional() readonly costPrice?: number;
  @ApiPropertyOptional() readonly wholesalePrice?: number;
  @ApiPropertyOptional() readonly msrp?: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly taxInclusive!: boolean;
  @ApiPropertyOptional() readonly discountPercent?: number;
  @ApiPropertyOptional() readonly discountAmount?: number;
  @ApiPropertyOptional() readonly marginPercent?: number;
  @ApiPropertyOptional() readonly effectiveFrom?: string;
  @ApiPropertyOptional() readonly effectiveTo?: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class PricingPublicHttpResponseDTO {
  @ApiProperty() readonly sellingPrice!: number;
  @ApiPropertyOptional() readonly compareAtPrice?: number;
  @ApiProperty() readonly currency!: string;
  @ApiPropertyOptional() readonly discountPercent?: number;
}

export class PricingListHttpResponseDTO {
  @ApiProperty({ type: [PricingHttpResponseDTO] })
  readonly items!: readonly PricingHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

export class PricingStatsHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly averageSellingPrice!: number;
  @ApiProperty() readonly minPrice!: number;
  @ApiProperty() readonly maxPrice!: number;
  @ApiProperty() readonly discountedCount!: number;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byCurrency!: Readonly<Record<string, number>>;
}

export class PriceCalculationHttpResponseDTO {
  @ApiProperty() readonly basePrice!: number;
  @ApiProperty() readonly discountAmount!: number;
  @ApiProperty() readonly finalPrice!: number;
  @ApiProperty() readonly discountPercent!: number;
  @ApiProperty() readonly vat!: number;
  @ApiProperty() readonly ait!: number;
  @ApiProperty() readonly grossAmount!: number;
  @ApiProperty() readonly netAmount!: number;
  @ApiProperty() readonly currency!: string;
}
