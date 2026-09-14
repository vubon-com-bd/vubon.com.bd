/**
 * Inventory Types
 * @module shared-types/business/product
 *
 * Values আসে shared-constants/business/product/inventory.constants থেকে।
 */

import type { INVENTORY_STATUS } from '@vubon/shared-constants/business';
import type { ProductId, VendorId } from '../../common/primitives';

export type InventoryStatusValue = (typeof INVENTORY_STATUS)[keyof typeof INVENTORY_STATUS];

export interface Inventory {
  readonly id: string;
  readonly productId: ProductId;
  readonly variantId?: string;
  readonly vendorId?: VendorId;
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

export interface InventoryAdjustment {
  readonly inventoryId: string;
  readonly delta: number;
  readonly reason: string;
  readonly reference?: string;
  readonly adjustedBy: string;
  readonly adjustedAt: string;
}

export interface InventoryAlert {
  readonly inventoryId: string;
  readonly productId: ProductId;
  readonly variantId?: string;
  readonly currentStock: number;
  readonly threshold: number;
  readonly status: InventoryStatusValue;
  readonly createdAt: string;
}
