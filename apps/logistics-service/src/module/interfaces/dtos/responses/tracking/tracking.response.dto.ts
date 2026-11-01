/**
 * Tracking HTTP Response DTOs — 5 shapes
 * @module logistics-service/interfaces/dtos/responses/tracking
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ─── Full (admin) ───────────────────────
export class TrackingHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly trackingNumber!: string;
  @ApiPropertyOptional() readonly shipmentId?: string;
  @ApiPropertyOptional() readonly orderId?: string;
  @ApiPropertyOptional() readonly courierCode?: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly source!: string;
  @ApiPropertyOptional() readonly currentEvent?: string;
  @ApiPropertyOptional() readonly currentLocation?: string;
  @ApiPropertyOptional() readonly estimatedDeliveryAt?: string;
  @ApiPropertyOptional() readonly expiresAt?: string;
  @ApiProperty() readonly eventCount!: number;
  @ApiProperty() readonly lastUpdatedAt!: string;
  @ApiPropertyOptional() readonly completedAt?: string;
  @ApiPropertyOptional() readonly failedAt?: string;
  @ApiPropertyOptional() readonly expiredAt?: string;
  @ApiPropertyOptional() readonly failureReason?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

// ─── Public (customer-facing, no PII) ───
export class TrackingPublicHttpResponseDTO {
  @ApiProperty() readonly trackingNumber!: string;
  @ApiProperty() readonly status!: string;
  @ApiPropertyOptional() readonly currentEvent?: string;
  @ApiPropertyOptional() readonly currentLocation?: string;
  @ApiPropertyOptional() readonly estimatedDeliveryAt?: string;
  @ApiProperty() readonly eventCount!: number;
  @ApiProperty() readonly lastUpdatedAt!: string;
  @ApiPropertyOptional() readonly completedAt?: string;
}

// ─── Summary (list item) ────────────────
export class TrackingSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly trackingNumber!: string;
  @ApiPropertyOptional() readonly shipmentId?: string;
  @ApiPropertyOptional() readonly courierCode?: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly eventCount!: number;
  @ApiProperty() readonly lastUpdatedAt!: string;
  @ApiProperty() readonly createdAt!: string;
}

// ─── List (paginated) ───────────────────
export class TrackingListHttpResponseDTO {
  @ApiProperty({ type: [TrackingSummaryHttpResponseDTO] })
  readonly items!: readonly TrackingSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

// ─── Stats ──────────────────────────────
export class TrackingStatsHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byStatus!: Readonly<Record<string, number>>;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly bySource!: Readonly<Record<string, number>>;
  @ApiProperty() readonly averageEventCount!: number;
}

// ─── Initiate (POST response) ───────────
export class TrackingInitiateHttpResponseDTO {
  @ApiProperty() readonly success!: true;
  @ApiProperty() readonly trackingId!: string;
  @ApiProperty() readonly trackingNumber!: string;
  @ApiProperty() readonly status!: string;
}
