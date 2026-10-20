/**
 * OrderItem HTTP Response DTO
 * @module order-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrderItemHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly orderId!: string;
  @ApiProperty() readonly productId!: string;
  @ApiPropertyOptional() readonly variantId?: string;
  @ApiPropertyOptional() readonly vendorId?: string;
  @ApiProperty() readonly sku!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly quantity!: number;
  @ApiProperty() readonly unitPrice!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly lineTotal!: number;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class OrderItemListHttpResponseDTO {
  @ApiProperty({ type: [OrderItemHttpResponseDTO] })
  readonly items!: readonly OrderItemHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
}
