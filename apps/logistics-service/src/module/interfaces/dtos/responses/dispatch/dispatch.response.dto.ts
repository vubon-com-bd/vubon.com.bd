/**
 * Dispatch HTTP Response DTOs — 5 shapes
 * @module logistics-service/interfaces/dtos/responses/dispatch
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ─── Full (admin) ───────────────────────
export class DispatchHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly dispatchNumber!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty({ type: [String] }) readonly shipmentIds!: readonly string[];
  @ApiProperty() readonly itemCount!: number;
  @ApiPropertyOptional() readonly courierId?: string;
  @ApiPropertyOptional() readonly vehicleId?: string;
  @ApiPropertyOptional() readonly driverId?: string;
  @ApiPropertyOptional() readonly warehouseId?: string;
  @ApiPropertyOptional() readonly manifestUrl?: string;
  @ApiPropertyOptional() readonly totalWeight?: number;
  @ApiPropertyOptional() readonly dispatchedAt?: string;
  @ApiPropertyOptional() readonly inTransitAt?: string;
  @ApiPropertyOptional() readonly estimatedArrivalAt?: string;
  @ApiPropertyOptional() readonly deliveredAt?: string;
  @ApiPropertyOptional() readonly failedAt?: string;
  @ApiPropertyOptional() readonly returnedAt?: string;
  @ApiPropertyOptional() readonly cancelledAt?: string;
  @ApiPropertyOptional() readonly failureReason?: string;
  @ApiPropertyOptional() readonly cancelReason?: string;
  @ApiPropertyOptional() readonly returnReason?: string;
  @ApiPropertyOptional() readonly notes?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

// ─── Summary (list item) ────────────────
export class DispatchSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly dispatchNumber!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly itemCount!: number;
  @ApiPropertyOptional() readonly courierId?: string;
  @ApiPropertyOptional() readonly driverId?: string;
  @ApiPropertyOptional() readonly vehicleId?: string;
  @ApiPropertyOptional() readonly estimatedArrivalAt?: string;
  @ApiProperty() readonly createdAt!: string;
}

// ─── List (paginated) ───────────────────
export class DispatchListHttpResponseDTO {
  @ApiProperty({ type: [DispatchSummaryHttpResponseDTO] })
  readonly items!: readonly DispatchSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

// ─── Stats ──────────────────────────────
export class DispatchStatsHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byStatus!: Readonly<Record<string, number>>;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byType!: Readonly<Record<string, number>>;
  @ApiProperty() readonly totalShipments!: number;
  @ApiProperty() readonly totalWeight!: number;
}

// ─── Initiate (POST response) ───────────
export class DispatchInitiateHttpResponseDTO {
  @ApiProperty() readonly success!: true;
  @ApiProperty() readonly dispatchId!: string;
  @ApiProperty() readonly dispatchNumber!: string;
  @ApiProperty() readonly status!: string;
}
