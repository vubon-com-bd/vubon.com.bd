/**
 * Product Request DTOs — HTTP layer
 * @module product-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { ProductTypeValue, ProductStatusValue } from '@vubon/shared-types/business/product';
import { PRODUCT_TYPE, PRODUCT_STATUS } from '@vubon/shared-constants/business/product';

export class CreateProductRequestDTO {
  @ApiProperty({ example: 'Wireless Bluetooth Headphones', minLength: 2, maxLength: 200 })
  readonly name!: string;

  @ApiProperty({ example: 'wireless-bluetooth-headphones' })
  readonly slug!: string;

  @ApiProperty({ enum: Object.values(PRODUCT_TYPE), example: 'physical' })
  readonly type!: ProductTypeValue;

  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  readonly categoryId!: string;

  @ApiPropertyOptional({ example: '3d4b0d0f-1a2b-4c3d-8e9f-123456789abc' })
  readonly brandId?: string;

  @ApiPropertyOptional({ example: '9e5c4d5f-2a3b-4c5d-9e1f-abcdef012345' })
  readonly vendorId?: string;

  @ApiPropertyOptional({ example: 'Premium wireless headphones with noise cancellation' })
  readonly description?: string;

  @ApiPropertyOptional({ example: 'Noise-cancelling Bluetooth headphones' })
  readonly shortDescription?: string;

  @ApiPropertyOptional({ type: [String], example: ['wireless', 'audio'] })
  readonly tags?: readonly string[];

  @ApiPropertyOptional({ type: [String], example: ['https://cdn.vubon.com.bd/products/1.jpg'] })
  readonly images?: readonly string[];

  @ApiProperty({ example: 2499.99 })
  readonly price!: number;

  @ApiPropertyOptional({ example: 3499.99 })
  readonly compareAtPrice?: number;

  @ApiProperty({ example: 'BDT', minLength: 3, maxLength: 3 })
  readonly currency!: string;

  @ApiProperty({ example: 'WBH-00001', minLength: 1, maxLength: 64 })
  readonly sku!: string;

  @ApiPropertyOptional({ example: '5901234123457' })
  readonly barcode?: string;

  @ApiPropertyOptional({ example: 0.35 })
  readonly weight?: number;

  @ApiPropertyOptional({
    example: { length: 20, width: 15, height: 8, unit: 'cm' },
  })
  readonly dimensions?: { length: number; width: number; height: number; unit: 'cm' | 'in' };
}

export class UpdateProductRequestDTO {
  @ApiPropertyOptional({ example: 'Updated product name' })
  readonly name?: string;

  @ApiPropertyOptional()
  readonly description?: string;

  @ApiPropertyOptional()
  readonly shortDescription?: string;

  @ApiPropertyOptional({ enum: Object.values(PRODUCT_STATUS) })
  readonly status?: ProductStatusValue;

  @ApiPropertyOptional()
  readonly categoryId?: string;

  @ApiPropertyOptional()
  readonly brandId?: string;

  @ApiPropertyOptional({ type: [String] })
  readonly tags?: readonly string[];

  @ApiPropertyOptional({ type: [String] })
  readonly images?: readonly string[];

  @ApiPropertyOptional({ example: 1999.99 })
  readonly price?: number;

  @ApiPropertyOptional({ example: 2999.99 })
  readonly compareAtPrice?: number;

  @ApiPropertyOptional({ example: false })
  readonly isFeatured?: boolean;
}
