/**
 * Product Response DTOs — HTTP layer
 * @module product-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductResponseDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  readonly id!: string;

  @ApiProperty({ example: 'Wireless Bluetooth Headphones' })
  readonly name!: string;

  @ApiProperty({ example: 'wireless-bluetooth-headphones' })
  readonly slug!: string;

  @ApiProperty({ example: 'WBH-00001' })
  readonly sku!: string;

  @ApiProperty({ example: 'physical' })
  readonly type!: string;

  @ApiProperty({ example: 'published' })
  readonly status!: string;

  @ApiPropertyOptional({ example: 'Premium wireless headphones' })
  readonly description?: string;

  @ApiPropertyOptional()
  readonly shortDescription?: string;

  @ApiProperty()
  readonly categoryId!: string;

  @ApiPropertyOptional()
  readonly brandId?: string;

  @ApiPropertyOptional()
  readonly vendorId?: string;

  @ApiProperty({ example: 2499.99 })
  readonly price!: number;

  @ApiPropertyOptional({ example: 3499.99 })
  readonly compareAtPrice?: number;

  @ApiProperty({ example: 'BDT' })
  readonly currency!: string;

  @ApiProperty({ type: [String] })
  readonly tags!: readonly string[];

  @ApiProperty({ type: [String] })
  readonly images!: readonly string[];

  @ApiPropertyOptional()
  readonly thumbnailUrl?: string;

  @ApiProperty({ example: 100 })
  readonly totalStock!: number;

  @ApiProperty({ example: false })
  readonly isFeatured!: boolean;

  @ApiProperty({ example: true })
  readonly isPublished!: boolean;

  @ApiPropertyOptional()
  readonly publishedAt?: string;

  @ApiProperty()
  readonly createdAt!: string;

  @ApiProperty()
  readonly updatedAt!: string;
}

export class ProductPublicResponseDTO {
  @ApiProperty()
  readonly id!: string;

  @ApiProperty()
  readonly name!: string;

  @ApiProperty()
  readonly slug!: string;

  @ApiPropertyOptional()
  readonly shortDescription?: string;

  @ApiProperty()
  readonly type!: string;

  @ApiProperty()
  readonly status!: string;

  @ApiProperty()
  readonly categoryId!: string;

  @ApiPropertyOptional()
  readonly brandId?: string;

  @ApiProperty({ type: [String] })
  readonly tags!: readonly string[];

  @ApiProperty({ type: [String] })
  readonly images!: readonly string[];

  @ApiPropertyOptional()
  readonly thumbnailUrl?: string;

  @ApiProperty()
  readonly price!: number;

  @ApiPropertyOptional()
  readonly compareAtPrice?: number;

  @ApiProperty()
  readonly currency!: string;

  @ApiProperty()
  readonly totalStock!: number;

  @ApiProperty()
  readonly isFeatured!: boolean;
}

export class ProductListResponseDTO {
  @ApiProperty({ example: true })
  readonly success!: boolean;

  @ApiProperty({ type: [ProductPublicResponseDTO] })
  readonly products!: readonly ProductPublicResponseDTO[];

  @ApiProperty()
  readonly total!: number;

  @ApiProperty()
  readonly page!: number;

  @ApiProperty()
  readonly limit!: number;

  @ApiProperty()
  readonly totalPages!: number;
}
