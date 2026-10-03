/**
 * Pricing Response DTO
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PricingResponseDTO {
  @ApiProperty()
  readonly id!: string;

  @ApiProperty()
  readonly productId!: string;

  @ApiPropertyOptional()
  readonly variantId?: string;

  @ApiProperty()
  readonly type!: string;

  @ApiProperty()
  readonly basePrice!: number;

  @ApiProperty()
  readonly sellingPrice!: number;

  @ApiPropertyOptional()
  readonly compareAtPrice?: number;

  @ApiPropertyOptional()
  readonly costPrice?: number;

  @ApiPropertyOptional()
  readonly wholesalePrice?: number;

  @ApiPropertyOptional()
  readonly msrp?: number;

  @ApiProperty()
  readonly currency!: string;

  @ApiProperty()
  readonly taxRate!: number;

  @ApiProperty()
  readonly taxInclusive!: boolean;

  @ApiProperty()
  readonly discountPercent!: number;

  @ApiPropertyOptional()
  readonly effectiveFrom?: string;

  @ApiPropertyOptional()
  readonly effectiveTo?: string;

  @ApiProperty()
  readonly updatedAt!: string;
}
