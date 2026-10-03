import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CartItemStandaloneHttpDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly cartId!: string;
  @ApiProperty() readonly productId!: string;
  @ApiPropertyOptional() readonly variantId?: string;
  @ApiPropertyOptional() readonly vendorId?: string;
  @ApiProperty() readonly sku!: string;
  @ApiProperty() readonly name!: string;
  @ApiPropertyOptional() readonly imageUrl?: string;
  @ApiProperty() readonly unitPrice!: number;
  @ApiPropertyOptional() readonly compareAtPrice?: number;
  @ApiProperty() readonly quantity!: number;
  @ApiProperty() readonly lineSubtotal!: number;
  @ApiProperty() readonly discountAmount!: number;
  @ApiProperty() readonly lineTotal!: number;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly isAvailable!: boolean;
  @ApiProperty() readonly isSelected!: boolean;
  @ApiPropertyOptional() readonly attributes?: Readonly<Record<string, string>>;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly addedAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}
