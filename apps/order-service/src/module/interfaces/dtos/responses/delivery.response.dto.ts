/**
 * Delivery HTTP Response DTO
 * @module order-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DeliveryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly orderId!: string;
  @ApiPropertyOptional() readonly deliveryMethodId?: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly type!: string;
  @ApiPropertyOptional() readonly trackingNumber?: string;
  @ApiPropertyOptional() readonly courierId?: string;
  @ApiPropertyOptional() readonly estimatedAt?: string;
  @ApiPropertyOptional() readonly deliveredAt?: string;
  @ApiProperty() readonly attempts!: number;
  @ApiPropertyOptional() readonly notes?: string;
  @ApiProperty() readonly isInTransit!: boolean;
  @ApiProperty() readonly isComplete!: boolean;
  @ApiProperty() readonly canRetry!: boolean;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
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
  @ApiProperty() readonly isFree!: boolean;
  @ApiProperty() readonly isFast!: boolean;
}
