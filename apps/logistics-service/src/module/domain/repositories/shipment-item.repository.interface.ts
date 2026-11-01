/**
 * ShipmentItem Repository Interface
 * @module logistics-service/domain/repositories
 *
 * Pattern 1 Template 9 (Payment-style rich repository)
 * ⚠️ Child entity — no event-store, no stats-revenue
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { ShipmentItemEntity } from '../entities/shipment-item.entity.js';
import type { ShipmentItemIdVO } from '../value-objects/primitives/shipment-item-id.vo.js';

// ═══════════════════════════════════════
// ─── DI Token ──────────────────────────
// ═══════════════════════════════════════
export const SHIPMENT_ITEM_REPOSITORY = Symbol('SHIPMENT_ITEM_REPOSITORY');

// ═══════════════════════════════════════
// ─── Filter ────────────────────────────
// ═══════════════════════════════════════
export interface ShipmentItemListFilter {
  readonly shipmentId?: string;
  readonly status?: string;
  readonly sku?: string;
  readonly productId?: string;
  readonly variantId?: string;
  readonly minQuantity?: number;
  readonly maxQuantity?: number;
}

// ═══════════════════════════════════════
// ─── List Options ──────────────────────
// ═══════════════════════════════════════
export interface ShipmentItemListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'quantity' | 'totalPrice';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: ShipmentItemListFilter;
}

// ═══════════════════════════════════════
// ─── Pagination Result ─────────────────
// ═══════════════════════════════════════
export interface ShipmentItemPaginationResult {
  readonly items: readonly ShipmentItemEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

// ═══════════════════════════════════════
// ─── Stats (item-level) ────────────────
// ═══════════════════════════════════════
export interface ShipmentItemStats {
  readonly totalItems: number;
  readonly totalQuantity: number;
  readonly totalPrice: number;
  readonly totalWeightKg: number;
  readonly currency: string;
  readonly byStatus: Readonly<Record<string, number>>;
}

// ═══════════════════════════════════════
// ─── Main Interface ────────────────────
// ═══════════════════════════════════════
export interface ShipmentItemRepository
  extends BaseRepository<ShipmentItemEntity, string> {
  // ─── Specialized finders ─────────────
  findByIdVO(id: ShipmentItemIdVO): Promise<ShipmentItemEntity | null>;
  findByShipmentId(shipmentId: string): Promise<readonly ShipmentItemEntity[]>;
  findBySku(shipmentId: string, sku: string): Promise<ShipmentItemEntity | null>;
  findByProductId(productId: string): Promise<readonly ShipmentItemEntity[]>;
  findByStatus(status: string): Promise<readonly ShipmentItemEntity[]>;

  // ─── Batch ───────────────────────────
  findByShipmentIds(
    shipmentIds: readonly string[],
  ): Promise<readonly ShipmentItemEntity[]>;

  // ─── Counts ──────────────────────────
  countByShipmentId(shipmentId: string): Promise<number>;
  existsBySku(shipmentId: string, sku: string): Promise<boolean>;

  // ─── Pagination ──────────────────────
  findPaginated(
    options: ShipmentItemListOptions,
  ): Promise<ShipmentItemPaginationResult>;

  // ─── Stats ───────────────────────────
  getStats(shipmentId: string): Promise<ShipmentItemStats>;

  // ─── Soft delete ─────────────────────
  softDelete(id: string, deletedBy?: string): Promise<void>;

  // ─── Bulk operations ─────────────────
  deleteByShipmentId(shipmentId: string): Promise<number>;
}
