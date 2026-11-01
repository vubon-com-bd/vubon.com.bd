/**
 * Driver HTTP Response DTOs — 5 shapes
 * @module logistics-service/interfaces/dtos/responses/driver
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ─── Full (admin) ───────────────────────
export class DriverHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiPropertyOptional() readonly userId?: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly phone!: string;
  @ApiPropertyOptional() readonly email?: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly licenseNumber!: string;
  @ApiProperty() readonly licenseType!: string;
  @ApiProperty() readonly licenseExpiresAt!: string;
  @ApiPropertyOptional() readonly dateOfBirth?: string;
  @ApiPropertyOptional() readonly address?: string;
  @ApiPropertyOptional() readonly vehicleId?: string;
  @ApiPropertyOptional() readonly warehouseId?: string;
  @ApiPropertyOptional() readonly rating?: number;
  @ApiProperty() readonly totalDeliveries!: number;
  @ApiPropertyOptional() readonly totalDistanceKm?: number;
  @ApiPropertyOptional() readonly cashLimit?: number;
  @ApiPropertyOptional() readonly cashInHand?: number;
  @ApiProperty() readonly isAvailable!: boolean;
  @ApiPropertyOptional() readonly lastActiveAt?: string;
  @ApiPropertyOptional() readonly onLeaveStartAt?: string;
  @ApiPropertyOptional() readonly onLeaveEndAt?: string;
  @ApiPropertyOptional() readonly suspendedAt?: string;
  @ApiPropertyOptional() readonly suspensionReason?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

// ─── Summary (list item) ────────────────
export class DriverSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly phone!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly type!: string;
  @ApiPropertyOptional() readonly rating?: number;
  @ApiProperty() readonly totalDeliveries!: number;
  @ApiProperty() readonly isAvailable!: boolean;
  @ApiPropertyOptional() readonly vehicleId?: string;
  @ApiPropertyOptional() readonly warehouseId?: string;
  @ApiProperty() readonly createdAt!: string;
}

// ─── List (paginated) ───────────────────
export class DriverListHttpResponseDTO {
  @ApiProperty({ type: [DriverSummaryHttpResponseDTO] })
  readonly items!: readonly DriverSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

// ─── Stats ──────────────────────────────
export class DriverStatsHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byStatus!: Readonly<Record<string, number>>;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byType!: Readonly<Record<string, number>>;
  @ApiProperty() readonly availableCount!: number;
  @ApiProperty() readonly onDutyCount!: number;
  @ApiProperty() readonly averageRating!: number;
  @ApiProperty() readonly totalDeliveries!: number;
}

// ─── Initiate (POST response) ───────────
export class DriverInitiateHttpResponseDTO {
  @ApiProperty() readonly success!: true;
  @ApiProperty() readonly driverId!: string;
  @ApiProperty() readonly licenseNumber!: string;
  @ApiProperty() readonly status!: string;
}
