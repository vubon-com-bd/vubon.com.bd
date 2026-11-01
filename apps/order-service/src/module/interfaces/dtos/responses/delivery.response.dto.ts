/**
 * Delivery HTTP Response DTOs
 * @module order-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DeliveryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly orderId!: string;
  @ApiProperty() readonly methodId!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly type!: string;
  @ApiPropertyOptional() readonly trackingNumber?: string;
  @ApiPropertyOptional() readonly courierId?: string;
  @ApiPropertyOptional() readonly estimatedAt?: string;
  @ApiPropertyOptional() readonly deliveredAt?: string;
  @ApiProperty() readonly attempts!: number;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class DeliverySummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly orderId!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly type!: string;
  @ApiPropertyOptional() readonly trackingNumber?: string;
}

export class DeliveryListHttpResponseDTO {
  @ApiProperty({ type: [DeliverySummaryHttpResponseDTO] })
  readonly items!: readonly DeliverySummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

export class DeliveryMethodHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly type!: string;
  @ApiPropertyOptional() readonly carrier?: string;
  @ApiProperty() readonly baseCost!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly estimatedDays!: number;
  @ApiProperty() readonly isActive!: boolean;
}
