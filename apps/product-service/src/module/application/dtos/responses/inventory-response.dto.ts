/**
 * InventoryResponseDTO
 */
import type { ProductId, VariantId } from '@vubon/shared-types/common';

export interface InventoryResponseDTO {
  readonly id: string;
  readonly productId: ProductId;
  readonly variantId?: VariantId;
  readonly sku: string;
  readonly quantity: number;
  readonly reserved: number;
  readonly available: number;
  readonly status: string;
  readonly lowStockThreshold: number;
  readonly trackQuantity: boolean;
  readonly allowBackorder: boolean;
  readonly locationId?: string;
  readonly lastRestockedAt?: string;
  readonly updatedAt: string;
}
