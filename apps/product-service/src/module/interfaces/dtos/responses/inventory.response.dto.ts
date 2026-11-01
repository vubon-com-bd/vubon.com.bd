/**
 * Inventory HTTP Response DTOs
 * @module product-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class InventoryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly productId!: string;
  @ApiPropertyOptional() readonly variantId?: string;
  @ApiPropertyOptional() readonly vendorId?: string;
  @ApiProperty() readonly sku!: string;
  @ApiProperty() readonly quantity!: number;
  @ApiProperty() readonly reserved!: number;
  @ApiProperty() readonly available!: number;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly lowStockThreshold!: number;
  @ApiPropertyOptional() readonly locationId?: string;
  @ApiPropertyOptional() readonly lastRestockedAt?: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class InventoryPublicHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly productId!: string;
  @ApiProperty() readonly available!: number;
  @ApiProperty() readonly status!: string;
}

export class InventorySummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly sku!: string;
  @ApiProperty() readonly available!: number;
  @ApiProperty() readonly status!: string;
}

export class InventoryListHttpResponseDTO {
  @ApiProperty({ type: [InventorySummaryHttpResponseDTO] })
  readonly items!: readonly InventorySummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

export class InventoryStatsHttpResponseDTO {
  @ApiProperty() readonly totalRecords!: number;
  @ApiProperty() readonly inStockCount!: number;
  @ApiProperty() readonly lowStockCount!: number;
  @ApiProperty() readonly outOfStockCount!: number;
  @ApiProperty() readonly totalQuantity!: number;
  @ApiProperty() readonly totalReserved!: number;
  @ApiProperty() readonly totalAvailable!: number;
}

export class StockCheckHttpResponseDTO {
  @ApiProperty() readonly inventoryId!: string;
  @ApiProperty() readonly sku!: string;
  @ApiProperty() readonly available!: number;
  @ApiProperty() readonly canFulfill!: boolean;
  @ApiProperty() readonly requestedQuantity!: number;
}
