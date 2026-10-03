/**
 * Fulfillment HTTP Response DTO
 * @module order-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FulfillmentHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly orderId!: string;
  @ApiPropertyOptional() readonly vendorId?: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty({ type: [String] }) readonly itemIds!: readonly string[];
  @ApiProperty() readonly itemCount!: number;
  @ApiPropertyOptional() readonly trackingNumber?: string;
  @ApiPropertyOptional() readonly courierId?: string;
  @ApiPropertyOptional() readonly warehouseId?: string;
  @ApiPropertyOptional() readonly shippingCost?: number;
  @ApiProperty() readonly currency!: string;
  @ApiPropertyOptional() readonly fulfilledAt?: string;
  @ApiPropertyOptional() readonly deliveredAt?: string;
  @ApiPropertyOptional() readonly notes?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}
