/**
 * Shipment HTTP Response DTOs — 7 shapes
 * @module logistics-service/interfaces/dtos/responses/shipment
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ─── Full (admin) ───────────────────────
export class ShipmentHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly shipmentNumber!: string;
  @ApiProperty() readonly trackingNumber!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly priority!: string;
  @ApiPropertyOptional() readonly orderId?: string;
  @ApiPropertyOptional() readonly userId?: string;
  @ApiPropertyOptional() readonly vendorId?: string;
  @ApiPropertyOptional() readonly warehouseId?: string;
  @ApiPropertyOptional() readonly courierId?: string;
  @ApiPropertyOptional() readonly courierTrackingNumber?: string;
  @ApiProperty() readonly shippingAddress!: string;
  @ApiPropertyOptional() readonly pickupAddress?: string;
  @ApiProperty() readonly itemCount!: number;
  @ApiPropertyOptional() readonly totalWeightKg?: number;
  @ApiPropertyOptional() readonly totalVolumeM3?: number;
  @ApiPropertyOptional() readonly declaredValue?: number;
  @ApiPropertyOptional() readonly currency?: string;
  @ApiPropertyOptional() readonly shippingCost?: number;
  @ApiPropertyOptional() readonly codAmount?: number;
  @ApiProperty() readonly isCOD!: boolean;
  @ApiProperty() readonly isInsured!: boolean;
  @ApiPropertyOptional() readonly labelUrl?: string;
  @ApiPropertyOptional() readonly estimatedDeliveryAt?: string;
  @ApiPropertyOptional() readonly deliveredAt?: string;
  @ApiPropertyOptional() readonly failureReason?: string;
  @ApiPropertyOptional() readonly notes?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

// ─── Public (no PII) ────────────────────
export class ShipmentPublicHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly shipmentNumber!: string;
  @ApiProperty() readonly trackingNumber!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly itemCount!: number;
  @ApiPropertyOptional() readonly estimatedDeliveryAt?: string;
  @ApiPropertyOptional() readonly deliveredAt?: string;
  @ApiProperty() readonly createdAt!: string;
}

// ─── Initiate (POST response) ───────────
export class ShipmentInitiateHttpResponseDTO {
  @ApiProperty() readonly success!: true;
  @ApiProperty() readonly shipmentId!: string;
  @ApiProperty() readonly shipmentNumber!: string;
  @ApiProperty() readonly trackingNumber!: string;
  @ApiProperty() readonly status!: string;
}

// ─── Summary (list item) ────────────────
export class ShipmentSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly shipmentNumber!: string;
  @ApiProperty() readonly trackingNumber!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly priority!: string;
  @ApiProperty() readonly itemCount!: number;
  @ApiProperty() readonly isCOD!: boolean;
  @ApiPropertyOptional() readonly codAmount?: number;
  @ApiPropertyOptional() readonly courierId?: string;
  @ApiProperty() readonly createdAt!: string;
}

// ─── List (paginated) ───────────────────
export class ShipmentListHttpResponseDTO {
  @ApiProperty({ type: [ShipmentSummaryHttpResponseDTO] })
  readonly items!: readonly ShipmentSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

// ─── Stats ──────────────────────────────
export class ShipmentStatsHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly totalRevenue!: number;
  @ApiProperty() readonly totalCOD!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byStatus!: Readonly<Record<string, number>>;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byType!: Readonly<Record<string, number>>;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byPriority!: Readonly<Record<string, number>>;
}

// ─── Detail (with items) ────────────────
export class ShipmentDetailHttpResponseDTO {
  @ApiProperty({ type: ShipmentHttpResponseDTO })
  readonly shipment!: ShipmentHttpResponseDTO;
  @ApiProperty({ type: 'array' })
  readonly items!: readonly Record<string, unknown>[];
}
