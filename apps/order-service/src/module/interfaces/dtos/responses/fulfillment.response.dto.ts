/**
 * Fulfillment HTTP Response DTOs
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
  @ApiPropertyOptional() readonly trackingNumber?: string;
  @ApiPropertyOptional() readonly courierId?: string;
  @ApiPropertyOptional() readonly warehouseId?: string;
  @ApiPropertyOptional() readonly fulfilledAt?: string;
  @ApiPropertyOptional() readonly deliveredAt?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class FulfillmentSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly orderId!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly itemCount!: number;
  @ApiPropertyOptional() readonly trackingNumber?: string;
  @ApiProperty() readonly createdAt!: string;
}

export class FulfillmentListHttpResponseDTO {
  @ApiProperty({ type: [FulfillmentSummaryHttpResponseDTO] })
  readonly items!: readonly FulfillmentSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}
