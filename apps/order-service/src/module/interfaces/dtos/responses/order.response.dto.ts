/**
 * Order HTTP Response DTOs
 * @module order-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrderItemHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly productId!: string;
  @ApiPropertyOptional() readonly variantId?: string;
  @ApiPropertyOptional() readonly vendorId?: string;
  @ApiProperty() readonly sku!: string;
  @ApiProperty() readonly name!: string;
  @ApiPropertyOptional() readonly imageUrl?: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly quantity!: number;
  @ApiProperty() readonly unitPrice!: number;
  @ApiPropertyOptional() readonly compareAtPrice?: number;
  @ApiProperty() readonly lineSubtotal!: number;
  @ApiProperty() readonly discountAmount!: number;
  @ApiProperty() readonly taxAmount!: number;
  @ApiProperty() readonly shippingAmount!: number;
  @ApiProperty() readonly lineTotal!: number;
  @ApiProperty() readonly currency!: string;
  @ApiPropertyOptional() readonly notes?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class OrderHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly orderNumber!: string;
  @ApiProperty() readonly customerId!: string;
  @ApiProperty({ type: [String] }) readonly vendorIds!: readonly string[];
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly priority!: string;
  @ApiProperty({ type: [OrderItemHttpResponseDTO] })
  readonly items!: readonly OrderItemHttpResponseDTO[];
  @ApiProperty() readonly itemCount!: number;
  @ApiProperty() readonly uniqueItemCount!: number;
  @ApiProperty() readonly subtotal!: number;
  @ApiProperty() readonly discountAmount!: number;
  @ApiProperty() readonly taxAmount!: number;
  @ApiProperty() readonly shippingAmount!: number;
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly currency!: string;
  @ApiPropertyOptional() readonly paymentId?: string;
  @ApiPropertyOptional() readonly paymentStatus?: string;
  @ApiPropertyOptional() readonly paymentMethod?: string;
  @ApiPropertyOptional() readonly shippingMethod?: string;
  @ApiPropertyOptional() readonly trackingNumber?: string;
  @ApiPropertyOptional() readonly notes?: string;
  @ApiPropertyOptional() readonly customerNotes?: string;
  @ApiPropertyOptional() readonly confirmedAt?: string;
  @ApiPropertyOptional() readonly shippedAt?: string;
  @ApiPropertyOptional() readonly deliveredAt?: string;
  @ApiPropertyOptional() readonly cancelledAt?: string;
  @ApiPropertyOptional() readonly completedAt?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}
