/**
 * Variant Request DTOs
 * @module product-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { VariantTypeValue } from '@vubon/shared-types/business/product';
import { VARIANT_TYPE } from '@vubon/shared-constants/business/product';

export class AddVariantRequestDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  readonly productId!: string;

  @ApiProperty({ example: 'Red / Large' })
  readonly name!: string;

  @ApiProperty({ example: 'WBH-RED-L' })
  readonly sku!: string;

  @ApiPropertyOptional({ example: '5901234123458' })
  readonly barcode?: string;

  @ApiProperty({ enum: Object.values(VARIANT_TYPE), example: 'color' })
  readonly type!: VariantTypeValue;

  @ApiProperty({
    type: 'array',
    example: [{ name: 'Color', value: 'Red' }, { name: 'Size', value: 'L' }],
  })
  readonly options!: readonly { readonly name: string; readonly value: string }[];

  @ApiProperty({ example: 2699.99 })
  readonly price!: number;

  @ApiPropertyOptional({ example: 3599.99 })
  readonly compareAtPrice?: number;

  @ApiPropertyOptional({ example: 1800.0 })
  readonly cost?: number;

  @ApiPropertyOptional({ example: 0.35 })
  readonly weight?: number;
}
