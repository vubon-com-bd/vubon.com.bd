/**
 * Warehouse HTTP Response DTOs — 5 shapes
 * @module logistics-service/interfaces/dtos/responses/warehouse
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ─── Full (admin) ───────────────────────
export class WarehouseHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly code!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly address!: string;
  @ApiPropertyOptional() readonly contactName?: string;
  @ApiPropertyOptional() readonly contactPhone?: string;
  @ApiPropertyOptional() readonly contactEmail?: string;
  @ApiPropertyOptional() readonly managerId?: string;
  @ApiPropertyOptional() readonly capacityM3?: number;
  @ApiPropertyOptional() readonly capacityKg?: number;
  @ApiPropertyOptional() readonly usedCapacityM3?: number;
  @ApiPropertyOptional() readonly usedCapacityKg?: number;
  @ApiPropertyOptional() readonly maxSkus?: number;
  @ApiProperty() readonly zone!: string;
  @ApiPropertyOptional() readonly operatingHoursStart?: number;
  @ApiPropertyOptional() readonly operatingHoursEnd?: number;
  @ApiProperty() readonly timezone!: string;
  @ApiProperty() readonly isDefault!: boolean;
  @ApiPropertyOptional() readonly activatedAt?: string;
  @ApiPropertyOptional() readonly deactivatedAt?: string;
  @ApiPropertyOptional() readonly maintenanceStartedAt?: string;
  @ApiPropertyOptional() readonly maintenanceEndedAt?: string;
  @ApiPropertyOptional() readonly fullMarkedAt?: string;
  @ApiPropertyOptional() readonly closedAt?: string;
  @ApiPropertyOptional() readonly archivedAt?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

// ─── Summary (list item) ────────────────
export class WarehouseSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly code!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly zone!: string;
  @ApiPropertyOptional() readonly capacityM3?: number;
  @ApiPropertyOptional() readonly usedCapacityM3?: number;
  @ApiProperty() readonly isDefault!: boolean;
  @ApiProperty() readonly createdAt!: string;
}

// ─── List (paginated) ───────────────────
export class WarehouseListHttpResponseDTO {
  @ApiProperty({ type: [WarehouseSummaryHttpResponseDTO] })
  readonly items!: readonly WarehouseSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

// ─── Stats ──────────────────────────────
export class WarehouseStatsHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byStatus!: Readonly<Record<string, number>>;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byType!: Readonly<Record<string, number>>;
  @ApiProperty() readonly totalCapacityM3!: number;
  @ApiProperty() readonly totalUsedM3!: number;
  @ApiProperty() readonly utilizationPercent!: number;
}

// ─── Initiate (POST response) ───────────
export class WarehouseInitiateHttpResponseDTO {
  @ApiProperty() readonly success!: true;
  @ApiProperty() readonly warehouseId!: string;
  @ApiProperty() readonly code!: string;
  @ApiProperty() readonly status!: string;
}
