/**
 * Delivery HTTP Response DTOs — 5 shapes
 * @module logistics-service/interfaces/dtos/responses/delivery
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ─── Window ─────────────────────────────
export class DeliveryWindowHttpResponseDTO {
  @ApiProperty() readonly startAt!: string;
  @ApiProperty() readonly endAt!: string;
}

// ─── Full (admin) ───────────────────────
export class DeliveryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly shipmentId!: string;
  @ApiProperty() readonly orderId!: string;
  @ApiPropertyOptional() readonly userId?: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly type!: string;
  @ApiPropertyOptional({ type: DeliveryWindowHttpResponseDTO })
  readonly window?: DeliveryWindowHttpResponseDTO;
  @ApiPropertyOptional() readonly driverId?: string;
  @ApiPropertyOptional() readonly vehicleId?: string;
  @ApiPropertyOptional() readonly routeId?: string;
  @ApiPropertyOptional() readonly recipientName?: string;
  @ApiPropertyOptional() readonly recipientPhone?: string;
  @ApiProperty() readonly deliveryAddress!: string;
  @ApiPropertyOptional() readonly scheduledAt?: string;
  @ApiPropertyOptional() readonly pickedUpAt?: string;
  @ApiPropertyOptional() readonly inTransitAt?: string;
  @ApiPropertyOptional() readonly outForDeliveryAt?: string;
  @ApiPropertyOptional() readonly arrivedAt?: string;
  @ApiPropertyOptional() readonly deliveredAt?: string;
  @ApiPropertyOptional() readonly failedAt?: string;
  @ApiPropertyOptional() readonly cancelledAt?: string;
  @ApiPropertyOptional() readonly refusedAt?: string;
  @ApiPropertyOptional() readonly rescheduledAt?: string;
  @ApiProperty() readonly attemptCount!: number;
  @ApiPropertyOptional() readonly failureReason?: string;
  @ApiPropertyOptional() readonly cancelReason?: string;
  @ApiPropertyOptional() readonly refusedReason?: string;
  @ApiPropertyOptional() readonly notes?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

// ─── Public (no PII) ────────────────────
export class DeliveryPublicHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly shipmentId!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly type!: string;
  @ApiPropertyOptional({ type: DeliveryWindowHttpResponseDTO })
  readonly window?: DeliveryWindowHttpResponseDTO;
  @ApiPropertyOptional() readonly scheduledAt?: string;
  @ApiPropertyOptional() readonly deliveredAt?: string;
  @ApiPropertyOptional() readonly attemptCount?: number;
  @ApiProperty() readonly createdAt!: string;
}

// ─── Summary (list item) ────────────────
export class DeliverySummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly shipmentId!: string;
  @ApiProperty() readonly orderId!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly type!: string;
  @ApiPropertyOptional() readonly driverId?: string;
  @ApiPropertyOptional() readonly scheduledAt?: string;
  @ApiProperty() readonly attemptCount!: number;
  @ApiProperty() readonly createdAt!: string;
}

// ─── List (paginated) ───────────────────
export class DeliveryListHttpResponseDTO {
  @ApiProperty({ type: [DeliverySummaryHttpResponseDTO] })
  readonly items!: readonly DeliverySummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

// ─── Stats ──────────────────────────────
export class DeliveryStatsHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byStatus!: Readonly<Record<string, number>>;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byType!: Readonly<Record<string, number>>;
  @ApiProperty() readonly averageAttempts!: number;
  @ApiProperty() readonly successRate!: number;
}

// ─── Initiate (POST response) ───────────
export class DeliveryInitiateHttpResponseDTO {
  @ApiProperty() readonly success!: true;
  @ApiProperty() readonly deliveryId!: string;
  @ApiProperty() readonly shipmentId!: string;
  @ApiProperty() readonly status!: string;
}
