/**
 * Variant HTTP Response DTOs
 * @module product-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VariantOptionHttpResponseDTO {
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly value!: string;
}

export class VariantHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly productId!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly sku!: string;
  @ApiPropertyOptional() readonly barcode?: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty({ type: [VariantOptionHttpResponseDTO] })
  readonly options!: readonly VariantOptionHttpResponseDTO[];
  @ApiProperty() readonly price!: number;
  @ApiPropertyOptional() readonly compareAtPrice?: number;
  @ApiPropertyOptional() readonly cost?: number;
  @ApiProperty() readonly currency!: string;
  @ApiPropertyOptional() readonly weightGrams?: number;
  @ApiPropertyOptional() readonly imageUrl?: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly stock!: number;
  @ApiProperty() readonly isActive!: boolean;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class VariantPublicHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly sku!: string;
  @ApiProperty({ type: [VariantOptionHttpResponseDTO] })
  readonly options!: readonly VariantOptionHttpResponseDTO[];
  @ApiProperty() readonly price!: number;
  @ApiPropertyOptional() readonly compareAtPrice?: number;
  @ApiProperty() readonly currency!: string;
  @ApiPropertyOptional() readonly imageUrl?: string;
  @ApiProperty() readonly stock!: number;
  @ApiProperty() readonly isActive!: boolean;
}

export class VariantSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly sku!: string;
  @ApiProperty() readonly price!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly stock!: number;
  @ApiProperty() readonly isActive!: boolean;
}

export class VariantListHttpResponseDTO {
  @ApiProperty({ type: [VariantSummaryHttpResponseDTO] })
  readonly items!: readonly VariantSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

export class VariantStatsHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly activeCount!: number;
  @ApiProperty() readonly outOfStockCount!: number;
  @ApiProperty() readonly totalStockUnits!: number;
}
