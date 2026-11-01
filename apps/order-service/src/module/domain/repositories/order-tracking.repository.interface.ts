/**
 * Order Tracking Repository Interface
 * @module order-service/domain/repositories
 *
 * Append-only tracking events — no update methods.
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { OrderTrackingEntity } from '../entities/order-tracking.entity.js';
import type { TrackingIdVO } from '../value-objects/primitives/tracking-id.vo.js';

// ─── DI Token ──────────────────────────────
export const ORDER_TRACKING_REPOSITORY = Symbol('ORDER_TRACKING_REPOSITORY');

// ─── Filter ────────────────────────────────
export interface OrderTrackingListFilter {
  readonly orderId?: string;
  readonly status?: string;
  readonly trackingNumber?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

// ─── Main Interface ────────────────────────
export interface OrderTrackingRepository
  extends BaseRepository<OrderTrackingEntity, string> {
  findByIdVO(id: TrackingIdVO): Promise<OrderTrackingEntity | null>;
  findByOrder(orderId: string): Promise<readonly OrderTrackingEntity[]>;
  findByTrackingNumber(trackingNumber: string): Promise<readonly OrderTrackingEntity[]>;
  findLatestByOrder(orderId: string): Promise<OrderTrackingEntity | null>;
  findByStatus(status: string): Promise<readonly OrderTrackingEntity[]>;
  // ⚠️ No update methods — append-only
}
