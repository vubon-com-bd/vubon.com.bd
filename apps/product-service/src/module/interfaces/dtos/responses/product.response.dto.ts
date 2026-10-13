/**
 * Product HTTP Response DTOs
 * @module product-service/interfaces/dtos/responses
 *
 * Multi-shape output:
 *  - Full (admin): all fields
 *  - Public (customer-safe): no PII
 *  - Summary (list item)
 *  - List (paginated)
 *  - Detail (with children)
 *  - Stats (aggregated)
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ─── Child summaries ─────────────────────
export class ProductVariantChildHttpDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly sku!: string;
  @ApiProperty() readonly price!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly stock!: number;
  @ApiProperty() readonly isActive!: boolean;
}

export class AttributeSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty({ type: [String] }) readonly values!: readonly string[];
}

export class ReviewSummaryHttpDTO {
  @ApiProperty() readonly averageRating!: number;
  @ApiProperty() readonly totalReviews!: number;
}

// ─── Full (admin) ────────────────────────
export class ProductHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly slug!: string;
  @ApiProperty() readonly sku!: string;
  @ApiPropertyOptional() readonly description?: string;
  @ApiPropertyOptional() readonly shortDescription?: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly categoryId!: string;
  @ApiPropertyOptional() readonly brandId?: string;
  @ApiPropertyOptional() readonly vendorId?: string;
  @ApiProperty({ type: [String] }) readonly tags!: readonly string[];
  @ApiProperty({ type: [String] }) readonly images!: readonly string[];
  @ApiPropertyOptional() readonly thumbnailUrl?: string;
  @ApiPropertyOptional() readonly videoUrl?: string;
  @ApiPropertyOptional() readonly barcode?: string;
  @ApiPropertyOptional() readonly weightGrams?: number;
  @ApiPropertyOptional({
    example: { length: 30, width: 20, height: 5, unit: 'cm' },
  })
  readonly dimensions?: {
    readonly length: number;
    readonly width: number;
    readonly height: number;
    readonly unit: 'cm' | 'in';
  };
  @ApiProperty() readonly totalStock!: number;
  @ApiProperty() readonly isFeatured!: boolean;
  @ApiProperty() readonly isPublished!: boolean;
  @ApiPropertyOptional() readonly publishedAt?: string;
  @ApiPropertyOptional() readonly rejectionReason?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

// ─── Public (customer-safe — NO PII) ────
export class ProductPublicHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly slug!: string;
  @ApiPropertyOptional() readonly shortDescription?: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly categoryId!: string;
  @ApiPropertyOptional() readonly brandId?: string;
  @ApiProperty({ type: [String] }) readonly tags!: readonly string[];
  @ApiProperty({ type: [String] }) readonly images!: readonly string[];
  @ApiPropertyOptional() readonly thumbnailUrl?: string;
  @ApiProperty() readonly totalStock!: number;
  @ApiProperty() readonly isFeatured!: boolean;
}

// ─── Summary (list item) ────────────────
export class ProductSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly slug!: string;
  @ApiProperty() readonly sku!: string;
  @ApiPropertyOptional() readonly thumbnailUrl?: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly totalStock!: number;
  @ApiProperty() readonly isFeatured!: boolean;
  @ApiProperty() readonly createdAt!: string;
}

// ─── List (paginated) ───────────────────
export class ProductListHttpResponseDTO {
  @ApiProperty({ type: [ProductSummaryHttpResponseDTO] })
  readonly items!: readonly ProductSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
  @ApiProperty() readonly hasNext!: boolean;
  @ApiProperty() readonly hasPrev!: boolean;
}

// ─── Stats ──────────────────────────────
export class ProductStatsHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly publishedCount!: number;
  @ApiProperty() readonly draftCount!: number;
  @ApiProperty() readonly outOfStockCount!: number;
  @ApiProperty() readonly totalStockUnits!: number;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byStatus!: Readonly<Record<string, number>>;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byType!: Readonly<Record<string, number>>;
}

// ─── Detail (with children) ─────────────
export class ProductDetailHttpResponseDTO {
  @ApiProperty({ type: ProductHttpResponseDTO })
  readonly product!: ProductHttpResponseDTO;
  @ApiProperty({ type: [ProductVariantChildHttpDTO] })
  readonly variants!: readonly ProductVariantChildHttpDTO[];
  @ApiProperty({ type: [AttributeSummaryHttpResponseDTO] })
  readonly attributes!: readonly AttributeSummaryHttpResponseDTO[];
  @ApiPropertyOptional({ type: ReviewSummaryHttpDTO })
  readonly reviewSummary?: ReviewSummaryHttpDTO;
}

// ─── Create response (POST) ─────────────
export class ProductCreateHttpResponseDTO {
  @ApiProperty() readonly success!: true;
  @ApiProperty() readonly productId!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly slug!: string;
}
