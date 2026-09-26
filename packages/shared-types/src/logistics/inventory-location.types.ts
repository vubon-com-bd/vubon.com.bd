/**
 * Inventory Location Types
 * @module shared-types/logistics
 */

import type { ProductId } from '../common/primitives';

export interface InventoryLocation {
  readonly id: string;
  readonly warehouseId: string;
  readonly zone: string;
  readonly aisle?: string;
  readonly rack?: string;
  readonly shelf?: string;
  readonly bin?: string;
  readonly barcode?: string;
  readonly isActive: boolean;
}

export interface InventoryStock {
  readonly id: string;
  readonly productId: ProductId;
  readonly variantId?: string;
  readonly locationId: string;
  readonly warehouseId: string;
  readonly quantity: number;
  readonly reserved: number;
  readonly available: number;
  readonly lastCountedAt?: string;
  readonly updatedAt: string;
}

export interface InventoryMovement {
  readonly id: string;
  readonly stockId: string;
  readonly type: 'inbound' | 'outbound' | 'transfer' | 'adjustment' | 'return';
  readonly quantity: number;
  readonly fromLocationId?: string;
  readonly toLocationId?: string;
  readonly referenceType?: string;
  readonly referenceId?: string;
  readonly reason?: string;
  readonly movedBy: string;
  readonly movedAt: string;
}
