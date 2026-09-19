/**
 * Flash Sale Inventory Types
 * @module shared-types/business/flash-sales
 *
 * Values আসে shared-constants/business/flash-sales/flash-sale-inventory.constants থেকে।
 */

import type { FLASH_SALE_INVENTORY_STATUS } from '@vubon/shared-constants/business';
import type { ProductId } from '../../common/primitives';

export type FlashSaleInventoryStatusValue =
  (typeof FLASH_SALE_INVENTORY_STATUS)[keyof typeof FLASH_SALE_INVENTORY_STATUS];

export interface FlashSaleInventory {
  readonly id: string;
  readonly flashSaleId: string;
  readonly productId: ProductId;
  readonly variantId?: string;
  readonly status: FlashSaleInventoryStatusValue;
  readonly totalStock: number;
  readonly reservedStock: number;
  readonly soldStock: number;
  readonly availableStock: number;
  readonly maxPerUser: number;
  readonly syncIntervalSeconds: number;
  readonly lastSyncedAt: string;
  readonly updatedAt: string;
}

export interface InventoryReservation {
  readonly inventoryId: string;
  readonly userId: string;
  readonly quantity: number;
  readonly reservedAt: string;
  readonly expiresAt: string;
  readonly cartId?: string;
  readonly releasedAt?: string;
  readonly convertedAt?: string;
}

export interface InventorySnapshot {
  readonly inventoryId: string;
  readonly totalStock: number;
  readonly reservedStock: number;
  readonly soldStock: number;
  readonly availableStock: number;
  readonly capturedAt: string;
}
