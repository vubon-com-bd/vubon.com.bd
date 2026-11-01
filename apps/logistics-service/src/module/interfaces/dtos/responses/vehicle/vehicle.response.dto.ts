/**
 * Vehicle HTTP Response DTOs — 5 shapes
 * @module logistics-service/interfaces/dtos/responses/vehicle
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ─── Full (admin) ───────────────────────
export class VehicleHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly registrationNumber!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly fuelType!: string;
  @ApiProperty() readonly make!: string;
  @ApiProperty() readonly model!: string;
  @ApiProperty() readonly year!: number;
  @ApiPropertyOptional() readonly color?: string;
  @ApiProperty() readonly maxWeightKg!: number;
  @ApiPropertyOptional() readonly maxVolumeM3?: number;
  @ApiPropertyOptional() readonly capacity?: number;
  @ApiPropertyOptional() readonly mileageKm?: number;
  @ApiPropertyOptional() readonly lastServiceAt?: string;
  @ApiPropertyOptional() readonly nextServiceAt?: string;
  @ApiPropertyOptional() readonly insuranceExpiresAt?: string;
  @ApiPropertyOptional() readonly registrationExpiresAt?: string;
  @ApiPropertyOptional() readonly assignedDriverId?: string;
  @ApiPropertyOptional() readonly warehouseId?: string;
  @ApiProperty() readonly isActive!: boolean;
  @ApiPropertyOptional() readonly maintenanceStartedAt?: string;
  @ApiPropertyOptional() readonly maintenanceCompletedAt?: string;
  @ApiPropertyOptional() readonly retiredAt?: string;
  @ApiPropertyOptional() readonly maintenanceReason?: string;
  @ApiPropertyOptional() readonly retirementReason?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

// ─── Summary (list item) ────────────────
export class VehicleSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly registrationNumber!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly fuelType!: string;
  @ApiProperty() readonly make!: string;
  @ApiProperty() readonly model!: string;
  @ApiProperty() readonly year!: number;
  @ApiProperty() readonly maxWeightKg!: number;
  @ApiPropertyOptional() readonly assignedDriverId?: string;
  @ApiPropertyOptional() readonly warehouseId?: string;
  @ApiProperty() readonly isActive!: boolean;
  @ApiProperty() readonly createdAt!: string;
}

// ─── List (paginated) ───────────────────
export class VehicleListHttpResponseDTO {
  @ApiProperty({ type: [VehicleSummaryHttpResponseDTO] })
  readonly items!: readonly VehicleSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

// ─── Stats ──────────────────────────────
export class VehicleStatsHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byStatus!: Readonly<Record<string, number>>;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byType!: Readonly<Record<string, number>>;
  @ApiProperty() readonly totalCapacityKg!: number;
  @ApiProperty() readonly totalMileageKm!: number;
}

// ─── Initiate (POST response) ───────────
export class VehicleInitiateHttpResponseDTO {
  @ApiProperty() readonly success!: true;
  @ApiProperty() readonly vehicleId!: string;
  @ApiProperty() readonly registrationNumber!: string;
  @ApiProperty() readonly status!: string;
}
