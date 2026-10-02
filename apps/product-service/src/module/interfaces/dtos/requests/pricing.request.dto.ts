/**
 * Pricing Request DTOs
 * @module product-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePriceRequestDTO {
  @ApiProperty()
  readonly pricingId!: string;

  @ApiPropertyOptional({ example: 2499.99 })
  readonly basePrice?: number;

  @ApiPropertyOptional({ example: 1999.99 })
  readonly sellingPrice?: number;

  @ApiPropertyOptional({ example: 2999.99 })
  readonly compareAtPrice?: number;

  @ApiPropertyOptional({ example: 1500.0 })
  readonly costPrice?: number;

  @ApiProperty()
  readonly updatedBy!: string;
}

export class ApplyDiscountRequestDTO {
  @ApiProperty()
  readonly productId!: string;

  @ApiProperty({ example: 15, description: 'Discount percent 0-90' })
  readonly discountPercent!: number;

  @ApiProperty()
  readonly actorId!: string;
}

export class CreatePricingRuleRequestDTO {
  @ApiProperty()
  readonly name!: string;

  @ApiProperty()
  readonly type!: string;

  @ApiProperty()
  readonly conditions!: Record<string, unknown>;

  @ApiProperty()
  readonly priceAdjustment!: number;

  @ApiProperty()
  readonly isActive!: boolean;
}
