/**
 * InventoryLocation HTTP Response DTOs
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class InventoryLocationHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly warehouseId!: string;
  @ApiProperty() readonly code!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly zone!: string;
  @ApiPropertyOptional() readonly aisle?: string;
  @ApiPropertyOptional() readonly rack?: string;
  @ApiPropertyOptional() readonly shelf?: string;
  @ApiPropertyOptional() readonly bin?: string;
  @ApiPropertyOptional() readonly barcode?: string;
  @ApiPropertyOptional() readonly maxCapacityKg?: number;
  @ApiPropertyOptional() readonly maxCapacityM3?: number;
  @ApiProperty() readonly currentKg!: number;
  @ApiProperty() readonly currentM3!: number;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly isQuarantine!: boolean;
  @ApiProperty() readonly isPickable!: boolean;
  @ApiProperty() readonly priority!: number;
  @ApiProperty() readonly availableKg!: number;
  @ApiProperty() readonly availableM3!: number;
  @ApiProperty() readonly utilizationPercentKg!: number;
  @ApiProperty() readonly utilizationPercentM3!: number;
  @ApiProperty() readonly displayLocation!: string;
  @ApiPropertyOptional() readonly activatedAt?: string;
  @ApiPropertyOptional() readonly deactivatedAt?: string;
  @ApiPropertyOptional() readonly quarantinedAt?: string;
  @ApiPropertyOptional() readonly archivedAt?: string;
  @ApiPropertyOptional() readonly reason?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class InventoryLocationSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly warehouseId!: string;
  @ApiProperty() readonly code!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly zone!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly currentKg!: number;
  @ApiProperty() readonly isPickable!: boolean;
  @ApiProperty() readonly isQuarantine!: boolean;
  @ApiProperty() readonly priority!: number;
  @ApiProperty() readonly displayLocation!: string;
  @ApiProperty() readonly createdAt!: string;
}

export class InventoryLocationListHttpResponseDTO {
  @ApiProperty({ type: [InventoryLocationSummaryHttpResponseDTO] })
  readonly items!: readonly InventoryLocationSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

export class InventoryLocationStatsHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byZone!: Readonly<Record<string, number>>;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byStatus!: Readonly<Record<string, number>>;
  @ApiProperty() readonly activeCount!: number;
  @ApiProperty() readonly quarantineCount!: number;
  @ApiProperty() readonly totalCurrentKg!: number;
  @ApiProperty() readonly totalCapacityKg!: number;
}

export class InventoryLocationInitiateHttpResponseDTO {
  @ApiProperty() readonly success!: true;
  @ApiProperty() readonly inventoryLocationId!: string;
  @ApiProperty() readonly code!: string;
  @ApiProperty() readonly status!: string;
}
