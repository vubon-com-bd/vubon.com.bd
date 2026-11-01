/**
 * Tracking HTTP Response DTOs
 * @module order-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TrackingEntryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly orderId!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly trackingNumber!: string;
  @ApiProperty() readonly message!: string;
  @ApiPropertyOptional() readonly location?: string;
  @ApiPropertyOptional() readonly carrier?: string;
  @ApiProperty() readonly occurredAt!: string;
}

export class TrackingSummaryHttpResponseDTO {
  @ApiProperty() readonly orderId!: string;
  @ApiProperty() readonly trackingNumber!: string;
  @ApiProperty() readonly currentStatus!: string;
  @ApiProperty() readonly currentMessage!: string;
  @ApiProperty() readonly lastUpdatedAt!: string;
  @ApiPropertyOptional() readonly estimatedDeliveryAt?: string;
  @ApiProperty({ type: [TrackingEntryHttpResponseDTO] })
  readonly events!: readonly TrackingEntryHttpResponseDTO[];
}

export class TrackingListHttpResponseDTO {
  @ApiProperty({ type: [TrackingEntryHttpResponseDTO] })
  readonly items!: readonly TrackingEntryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
}
