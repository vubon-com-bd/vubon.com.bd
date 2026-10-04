/**
 * Cart HTTP Response DTOs
 * @module cart-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CartItemHttpResponseDTO {
  @ApiProperty() readonly id!: string;
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
  @ApiProperty() readonly addedAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class CartTotalsHttpDTO {
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly itemCount!: number;
  @ApiProperty() readonly subtotal!: number;
  @ApiProperty() readonly itemDiscounts!: number;
  @ApiProperty() readonly couponDiscount!: number;
  @ApiProperty() readonly voucherDiscount!: number;
  @ApiProperty() readonly taxAmount!: number;
  @ApiProperty() readonly shippingAmount!: number;
  @ApiProperty() readonly grandTotal!: number;
}

export class CartHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly status!: string;
  @ApiPropertyOptional() readonly userId?: string;
  @ApiPropertyOptional() readonly sessionId?: string;
  @ApiProperty() readonly currency!: string;
  @ApiPropertyOptional() readonly notes?: string;
  @ApiProperty({ type: [CartItemHttpResponseDTO] }) readonly items!: readonly CartItemHttpResponseDTO[];
  @ApiProperty() readonly itemCount!: number;
  @ApiProperty() readonly uniqueItemCount!: number;
  @ApiProperty() readonly selectedItemCount!: number;
  @ApiPropertyOptional() readonly couponCode?: string;
  @ApiPropertyOptional() readonly voucherCode?: string;
  @ApiProperty({ type: CartTotalsHttpDTO }) readonly totals!: CartTotalsHttpDTO;
  @ApiProperty() readonly expiresAt!: string;
  @ApiProperty() readonly lastActivityAt!: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}
