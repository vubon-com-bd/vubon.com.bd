/**
 * Fulfillment HTTP Response DTOs — 4 shapes
 * @module logistics-service/interfaces/dtos/responses/fulfillment
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ─── Full (admin) ───────────────────────
export class FulfillmentHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly orderId!: string;
  @ApiPropertyOptional() readonly vendorId?: string;
  @ApiPropertyOptional() readonly warehouseId?: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly priority!: string;
  @ApiProperty({ type: [String] }) readonly itemIds!: readonly string[];
  @ApiProperty() readonly itemCount!: number;
  @ApiPropertyOptional() readonly assignedTo?: string;
  @ApiPropertyOptional() readonly pickedAt?: string;
  @ApiPropertyOptional() readonly packedAt?: string;
  @ApiPropertyOptional() readonly shippedAt?: string;
  @ApiPropertyOptional() readonly fulfilledAt?: string;
  @ApiPropertyOptional() readonly cancelledAt?: string;
  @ApiPropertyOptional() readonly failedAt?: string;
  @ApiPropertyOptional() readonly onHoldAt?: string;
  @ApiPropertyOptional() readonly slaDueAt?: string;
  @ApiPropertyOptional() readonly failureReason?: string;
  @ApiPropertyOptional() readonly cancelReason?: string;
  @ApiPropertyOptional() readonly holdReason?: string;
  @ApiPropertyOptional() readonly notes?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

// ─── Summary (list item) ────────────────
export class FulfillmentSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly orderId!: string;
  @ApiPropertyOptional() readonly vendorId?: string;
  @ApiPropertyOptional() readonly warehouseId?: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly priority!: string;
  @ApiProperty() readonly itemCount!: number;
  @ApiPropertyOptional() readonly slaDueAt?: string;
  @ApiProperty() readonly createdAt!: string;
}

// ─── List (paginated) ───────────────────
export class FulfillmentListHttpResponseDTO {
  @ApiProperty({ type: [FulfillmentSummaryHttpResponseDTO] })
  readonly items!: readonly FulfillmentSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

// ─── Stats ──────────────────────────────
export class FulfillmentStatsHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byStatus!: Readonly<Record<string, number>>;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byType!: Readonly<Record<string, number>>;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byPriority!: Readonly<Record<string, number>>;
  @ApiProperty() readonly slaBreachedCount!: number;
  @ApiProperty() readonly averageFulfillmentHours!: number;
}

// ─── Initiate (POST response) ───────────
export class FulfillmentInitiateHttpResponseDTO {
  @ApiProperty() readonly success!: true;
  @ApiProperty() readonly fulfillmentId!: string;
  @ApiProperty() readonly orderId!: string;
  @ApiProperty() readonly status!: string;
}
