/**
 * Variant Response DTO
 * @module product-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VariantResponseDTO {
  @ApiProperty()
  readonly id!: string;

  @ApiProperty()
  readonly productId!: string;

  @ApiProperty()
  readonly name!: string;

  @ApiProperty()
  readonly sku!: string;

  @ApiPropertyOptional()
  readonly barcode?: string;

  @ApiProperty({ type: 'array', example: [{ name: 'Color', value: 'Red' }] })
  readonly options!: readonly { readonly name: string; readonly value: string }[];

  @ApiProperty()
  readonly price!: number;

  @ApiPropertyOptional()
  readonly compareAtPrice?: number;

  @ApiPropertyOptional()
  readonly cost?: number;

  @ApiPropertyOptional()
  readonly weight?: number;

  @ApiPropertyOptional()
  readonly imageUrl?: string;

  @ApiProperty()
  readonly status!: string;

  @ApiProperty()
  readonly stock!: number;

  @ApiProperty()
  readonly createdAt!: string;

  @ApiProperty()
  readonly updatedAt!: string;
}
