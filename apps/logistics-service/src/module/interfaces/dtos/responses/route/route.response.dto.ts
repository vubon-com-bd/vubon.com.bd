/**
 * Route HTTP Response DTOs — 5 shapes
 * @module logistics-service/interfaces/dtos/responses/route
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ─── Stop Response ──────────────────────
export class RouteStopHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly order!: number;
  @ApiProperty() readonly location!: string;
  @ApiProperty() readonly address!: string;
  @ApiPropertyOptional() readonly latitude?: number;
  @ApiPropertyOptional() readonly longitude?: number;
  @ApiProperty({ type: [String] }) readonly shipmentIds!: readonly string[];
  @ApiPropertyOptional() readonly estimatedArrivalAt?: string;
  @ApiPropertyOptional() readonly actualArrivalAt?: string;
  @ApiProperty() readonly completed!: boolean;
  @ApiPropertyOptional() readonly notes?: string;
}

// ─── Full (admin) ───────────────────────
export class RouteHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly code!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly optimization!: string;
  @ApiProperty({ type: [RouteStopHttpResponseDTO] })
  readonly stops!: readonly RouteStopHttpResponseDTO[];
  @ApiPropertyOptional() readonly totalDistanceKm?: number;
  @ApiPropertyOptional() readonly totalDurationMinutes?: number;
  @ApiPropertyOptional() readonly warehouseId?: string;
  @ApiPropertyOptional() readonly vehicleId?: string;
  @ApiPropertyOptional() readonly driverId?: string;
  @ApiProperty() readonly scheduledDate!: string;
  @ApiPropertyOptional() readonly startedAt?: string;
  @ApiPropertyOptional() readonly completedAt?: string;
  @ApiPropertyOptional() readonly cancelledAt?: string;
  @ApiPropertyOptional() readonly cancelReason?: string;
  @ApiProperty() readonly isOptimized!: boolean;
  @ApiProperty() readonly isRecurring!: boolean;
  @ApiPropertyOptional() readonly recurrenceRule?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

// ─── Summary (list item) ────────────────
export class RouteSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly code!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly stopCount!: number;
  @ApiPropertyOptional() readonly totalDistanceKm?: number;
  @ApiPropertyOptional() readonly driverId?: string;
  @ApiPropertyOptional() readonly vehicleId?: string;
  @ApiProperty() readonly scheduledDate!: string;
  @ApiProperty() readonly isOptimized!: boolean;
  @ApiProperty() readonly createdAt!: string;
}

// ─── List (paginated) ───────────────────
export class RouteListHttpResponseDTO {
  @ApiProperty({ type: [RouteSummaryHttpResponseDTO] })
  readonly items!: readonly RouteSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

// ─── Stats ──────────────────────────────
export class RouteStatsHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byStatus!: Readonly<Record<string, number>>;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byType!: Readonly<Record<string, number>>;
  @ApiProperty() readonly totalDistanceKm!: number;
  @ApiProperty() readonly totalDurationMinutes!: number;
  @ApiProperty() readonly averageStopsPerRoute!: number;
}

// ─── Initiate (POST response) ───────────
export class RouteInitiateHttpResponseDTO {
  @ApiProperty() readonly success!: true;
  @ApiProperty() readonly routeId!: string;
  @ApiProperty() readonly code!: string;
  @ApiProperty() readonly status!: string;
}
