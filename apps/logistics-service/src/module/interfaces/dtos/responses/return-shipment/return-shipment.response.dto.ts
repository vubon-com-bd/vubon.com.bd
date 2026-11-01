/**
 * ReturnShipment HTTP Response DTOs
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ReturnShipmentHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly rmaNumber!: string;
  @ApiProperty() readonly orderId!: string;
  @ApiPropertyOptional() readonly originalShipmentId?: string;
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly reason!: string;
  @ApiPropertyOptional() readonly description?: string;
  @ApiPropertyOptional({ type: [String] }) readonly images?: readonly string[];
  @ApiProperty({ type: [String] }) readonly itemIds!: readonly string[];
  @ApiProperty() readonly itemCount!: number;
  @ApiProperty() readonly pickupAddress!: string;
  @ApiPropertyOptional() readonly pickupScheduledAt?: string;
  @ApiPropertyOptional() readonly pickedUpAt?: string;
  @ApiPropertyOptional() readonly inTransitAt?: string;
  @ApiPropertyOptional() readonly receivedAt?: string;
  @ApiPropertyOptional() readonly inspectedAt?: string;
  @ApiPropertyOptional() readonly inspectedBy?: string;
  @ApiPropertyOptional() readonly completedAt?: string;
  @ApiPropertyOptional() readonly cancelledAt?: string;
  @ApiPropertyOptional() readonly rejectedAt?: string;
  @ApiPropertyOptional() readonly lostAt?: string;
  @ApiProperty() readonly restockable!: boolean;
  @ApiPropertyOptional() readonly refundAmount?: number;
  @ApiPropertyOptional() readonly refundCurrency?: string;
  @ApiPropertyOptional() readonly restockFeeAmount?: number;
  @ApiPropertyOptional() readonly trackingNumber?: string;
  @ApiPropertyOptional() readonly approveBy?: string;
  @ApiPropertyOptional() readonly rejectReason?: string;
  @ApiPropertyOptional() readonly cancelReason?: string;
  @ApiPropertyOptional() readonly notes?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class ReturnShipmentSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly rmaNumber!: string;
  @ApiProperty() readonly orderId!: string;
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly reason!: string;
  @ApiProperty() readonly itemCount!: number;
  @ApiProperty() readonly restockable!: boolean;
  @ApiPropertyOptional() readonly refundAmount?: number;
  @ApiProperty() readonly createdAt!: string;
}

export class ReturnShipmentListHttpResponseDTO {
  @ApiProperty({ type: [ReturnShipmentSummaryHttpResponseDTO] })
  readonly items!: readonly ReturnShipmentSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

export class ReturnShipmentStatsHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byStatus!: Readonly<Record<string, number>>;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byType!: Readonly<Record<string, number>>;
  @ApiProperty() readonly totalRefunded!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly averageRefund!: number;
}

export class ReturnShipmentInitiateHttpResponseDTO {
  @ApiProperty() readonly success!: true;
  @ApiProperty() readonly returnShipmentId!: string;
  @ApiProperty() readonly rmaNumber!: string;
  @ApiProperty() readonly status!: string;
}
