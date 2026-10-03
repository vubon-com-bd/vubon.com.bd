/**
 * Tracking HTTP Response DTO
 * @module order-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TrackingHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly orderId!: string;
  @ApiProperty() readonly event!: string;
  @ApiProperty() readonly message!: string;
  @ApiPropertyOptional() readonly location?: string;
  @ApiPropertyOptional() readonly latitude?: number;
  @ApiPropertyOptional() readonly longitude?: number;
  @ApiPropertyOptional() readonly trackingNumber?: string;
  @ApiPropertyOptional() readonly createdBy?: string;
  @ApiProperty() readonly occurredAt!: string;
  @ApiProperty() readonly createdAt!: string;
}

export class TrackingSummaryHttpResponseDTO {
  @ApiProperty() readonly orderId!: string;
  @ApiProperty() readonly currentEvent!: string;
  @ApiProperty() readonly currentMessage!: string;
  @ApiProperty() readonly lastUpdatedAt!: string;
  @ApiPropertyOptional() readonly estimatedDeliveryAt?: string;
  @ApiProperty({ type: [TrackingHttpResponseDTO] })
  readonly events!: readonly TrackingHttpResponseDTO[];
}
