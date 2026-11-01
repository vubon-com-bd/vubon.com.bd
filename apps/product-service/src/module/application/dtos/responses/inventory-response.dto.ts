/**
 * Inventory Response DTOs
 * @module product-service/application/dtos/responses
 */
import type { InventoryStatusValue } from '@vubon/shared-types/business/product';

// ─── Full ─────────────────────────────────
export interface InventoryResponseDTO {
  readonly id: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly vendorId?: string;
  readonly sku: string;
  readonly quantity: number;
  readonly reserved: number;
  readonly available: number;
  readonly status: InventoryStatusValue;
  readonly lowStockThreshold: number;
  readonly locationId?: string;
  readonly lastRestockedAt?: string;
  readonly updatedAt: string;
}

// ─── Public ───────────────────────────────
export interface InventoryPublicResponseDTO {
  readonly id: string;
  readonly productId: string;
  readonly available: number;
  readonly status: InventoryStatusValue;
}

// ─── Summary ──────────────────────────────
export interface InventorySummaryResponseDTO {
  readonly id: string;
  readonly sku: string;
  readonly available: number;
  readonly status: InventoryStatusValue;
}

// ─── List ─────────────────────────────────
export interface InventoryListResponseDTO {
  readonly items: readonly InventorySummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

// ─── Stats ────────────────────────────────
export interface InventoryStatsResponseDTO {
  readonly totalRecords: number;
  readonly inStockCount: number;
  readonly lowStockCount: number;
  readonly outOfStockCount: number;
  readonly totalQuantity: number;
  readonly totalReserved: number;
  readonly totalAvailable: number;
}

// ─── Stock Check (single purpose) ─────────
export interface StockCheckResponseDTO {
  readonly inventoryId: string;
  readonly sku: string;
  readonly available: number;
  readonly canFulfill: boolean;
  readonly requestedQuantity: number;
}
