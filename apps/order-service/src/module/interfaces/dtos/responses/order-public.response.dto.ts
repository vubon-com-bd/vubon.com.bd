/**
 * Order Public HTTP Response DTO (redacted)
 * @module order-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrderPublicItemHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly productId!: string;
  @ApiPropertyOptional() readonly variantId?: string;
  @ApiProperty() readonly name!: string;
  @ApiPropertyOptional() readonly imageUrl?: string;
  @ApiProperty() readonly quantity!: number;
  @ApiProperty() readonly unitPrice!: number;
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly status!: string;
}

export class OrderPublicHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly orderNumber!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly priority!: string;
  @ApiProperty({ type: [OrderPublicItemHttpResponseDTO] })
  readonly items!: readonly OrderPublicItemHttpResponseDTO[];
  @ApiProperty() readonly subtotal!: number;
  @ApiProperty() readonly discountAmount!: number;
  @ApiProperty() readonly taxAmount!: number;
  @ApiProperty() readonly shippingAmount!: number;
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly currency!: string;
  @ApiPropertyOptional() readonly trackingNumber?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiPropertyOptional() readonly shippedAt?: string;
  @ApiPropertyOptional() readonly deliveredAt?: string;
}
