/**
 * Order HTTP Response DTOs — Multi-shape
 * @module order-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrderHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly orderNumber!: string;
  @ApiProperty() readonly customerId!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly priority!: string;
  @ApiProperty() readonly subtotal!: number;
  @ApiProperty() readonly discountAmount!: number;
  @ApiProperty() readonly taxAmount!: number;
  @ApiProperty() readonly shippingAmount!: number;
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly currency!: string;
  @ApiPropertyOptional() readonly paymentId?: string;
  @ApiPropertyOptional() readonly paymentMethod?: string;
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

export class OrderCreateHttpResponseDTO {
  @ApiProperty({ example: true }) readonly success!: true;
  @ApiProperty() readonly orderId!: string;
  @ApiProperty() readonly orderNumber!: string;
  @ApiProperty() readonly status!: string;
}

export class OrderStatusHistoryHttpDTO {
  @ApiProperty() readonly fromStatus!: string;
  @ApiProperty() readonly toStatus!: string;
  @ApiProperty() readonly changedAt!: string;
  @ApiPropertyOptional() readonly changedBy?: string;
}
