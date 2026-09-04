/**
 * Inventory Types
 * ইনভেন্টরি সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { INVENTORY_STATUS } from '@vubon/shared-constants';

export interface Inventory extends BaseEntity {
  productId: string;
  variantId?: string;
  quantity: number;
  reserved: number;
  available: number;
  lowStockThreshold: number;
  status: (typeof INVENTORY_STATUS)[keyof typeof INVENTORY_STATUS];
  location?: string;
  warehouseId?: string;
  batchNumber?: string;
  expiryDate?: Date;
  lastRestockedAt?: Date;
  lastSoldAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface InventoryMovement extends BaseEntity {
  inventoryId: string;
  productId: string;
  variantId?: string;
  quantity: number;
  type: 'purchase' | 'sale' | 'return' | 'adjustment' | 'transfer' | 'restock' | 'damage' | 'loss';
  referenceId?: string;
  referenceType?: string;
  note?: string;
  performedBy: string;
  createdAt: Date;
}

export interface InventoryCreateInput {
  productId: string;
  variantId?: string;
  quantity: number;
  lowStockThreshold?: number;
  location?: string;
  warehouseId?: string;
  batchNumber?: string;
  expiryDate?: Date;
}

export interface InventoryUpdateInput extends Partial<InventoryCreateInput> {
  status?: (typeof INVENTORY_STATUS)[keyof typeof INVENTORY_STATUS];
}

export interface InventoryResponse {
  inventory: Inventory;
}
