/**
 * Shipment Repository Interface
 * @module logistics-service/domain/repositories
 *
 * Pattern: Payment-style rich repository (Pattern 1 Template 9)
 * - DI token for NestJS
 * - Filter + Options + Pagination + Stats
 * - Cron-support queries (findStale, findPending, findInTransit)
 * - Soft delete
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { ShipmentEntity } from '../entities/shipment.entity.js';
import type { ShipmentIdVO } from '../value-objects/primitives/shipment-id.vo.js';
import type { IdempotencyKeyVO } from '../value-objects/primitives/idempotency-key.vo.js';

// ═══════════════════════════════════════
// ─── DI Token ──────────────────────────
// ═══════════════════════════════════════
export const SHIPMENT_REPOSITORY = Symbol('SHIPMENT_REPOSITORY');

// ═══════════════════════════════════════
// ─── Filter ────────────────────────────
// ═══════════════════════════════════════
export interface ShipmentListFilter {
  readonly status?: string;
  readonly type?: string;
  readonly priority?: string;
  readonly orderId?: string;
  readonly userId?: string;
  readonly vendorId?: string;
  readonly warehouseId?: string;
  readonly courierId?: string;
  readonly isCOD?: boolean;
  readonly isInsured?: boolean;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly minWeightKg?: number;
  readonly maxWeightKg?: number;
  readonly search?: string;
}

// ═══════════════════════════════════════
// ─── List Options ──────────────────────
// ═══════════════════════════════════════
export interface ShipmentListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'estimatedDeliveryAt' | 'priority';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: ShipmentListFilter;
}

// ═══════════════════════════════════════
// ─── Pagination Result ─────────────────
// ═══════════════════════════════════════
export interface ShipmentPaginationResult {
  readonly items: readonly ShipmentEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

// ═══════════════════════════════════════
// ─── Stats ─────────────────────────────
// ═══════════════════════════════════════
export interface ShipmentStats {
  readonly total: number;
  readonly totalRevenue: number;
  readonly totalCOD: number;
  readonly currency: string;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly byPriority: Readonly<Record<string, number>>;
  readonly averageWeightKg: number;
  readonly averageItemCount: number;
}

// ═══════════════════════════════════════
// ─── Main Interface ────────────────────
// ═══════════════════════════════════════
export interface ShipmentRepository extends BaseRepository<ShipmentEntity, string> {
  // ─── Specialized finders ─────────────
  findByIdVO(id: ShipmentIdVO): Promise<ShipmentEntity | null>;
  findByIdempotencyKey(key: IdempotencyKeyVO): Promise<ShipmentEntity | null>;
  findByShipmentNumber(shipmentNumber: string): Promise<ShipmentEntity | null>;
  findByTrackingNumber(trackingNumber: string): Promise<ShipmentEntity | null>;
  findByOrderId(orderId: string): Promise<readonly ShipmentEntity[]>;
  findByCourierId(courierId: string): Promise<readonly ShipmentEntity[]>;
  findByWarehouseId(warehouseId: string): Promise<readonly ShipmentEntity[]>;
  findByUserId(userId: string): Promise<readonly ShipmentEntity[]>;
  findByStatus(status: string): Promise<readonly ShipmentEntity[]>;

  // ─── Pagination ──────────────────────
  findPaginated(options: ShipmentListOptions): Promise<ShipmentPaginationResult>;

  // ─── Stats ───────────────────────────
  getStats(
    warehouseId?: string,
    fromDate?: string,
    toDate?: string,
  ): Promise<ShipmentStats>;

  // ─── Cron-support queries ────────────
  /** Shipments not updated in last N minutes (for timeout detection) */
  findStale(olderThanMinutes: number): Promise<readonly ShipmentEntity[]>;
  /** Pending shipments older than N minutes (not yet confirmed) */
  findPendingOlderThan(olderThanMinutes: number): Promise<readonly ShipmentEntity[]>;
  /** In-transit shipments for progress tracking */
  findInTransit(): Promise<readonly ShipmentEntity[]>;
  /** Shipments past estimated delivery (for delay marking) */
  findDelayed(): Promise<readonly ShipmentEntity[]>;
  /** Retryable failed shipments (auto retry logic) */
  findRetryable(maxAttempts: number): Promise<readonly ShipmentEntity[]>;

  // ─── Soft delete ─────────────────────
  softDelete(id: string, deletedBy?: string): Promise<void>;

  // ─── Existence checks ────────────────
  existsByShipmentNumber(shipmentNumber: string): Promise<boolean>;
  existsByTrackingNumber(trackingNumber: string): Promise<boolean>;
}
