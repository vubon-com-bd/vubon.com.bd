/**
 * Delivery Repository Interface
 * @module order-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { DeliveryEntity } from '../entities/delivery.entity.js';
import type { DeliveryIdVO } from '../value-objects/primitives/delivery-id.vo.js';

// ─── DI Token ──────────────────────────────
export const DELIVERY_REPOSITORY = Symbol('DELIVERY_REPOSITORY');

// ─── Filter ────────────────────────────────
export interface DeliveryListFilter {
  readonly orderId?: string;
  readonly status?: string;
  readonly type?: string;
  readonly courierId?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

// ─── List Options ──────────────────────────
export interface DeliveryListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'estimatedAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: DeliveryListFilter;
}

// ─── Pagination Result ─────────────────────
export interface DeliveryPaginationResult {
  readonly items: readonly DeliveryEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

// ─── Main Interface ────────────────────────
export interface DeliveryRepository extends BaseRepository<DeliveryEntity, string> {
  findByIdVO(id: DeliveryIdVO): Promise<DeliveryEntity | null>;
  findByOrder(orderId: string): Promise<readonly DeliveryEntity[]>;
  findByStatus(status: string): Promise<readonly DeliveryEntity[]>;
  findByCourier(courierId: string): Promise<readonly DeliveryEntity[]>;
  findByTrackingNumber(trackingNumber: string): Promise<DeliveryEntity | null>;
  findPaginated(options: DeliveryListOptions): Promise<DeliveryPaginationResult>;
  findRetryable(): Promise<readonly DeliveryEntity[]>;
  findOverdueEstimated(now: string): Promise<readonly DeliveryEntity[]>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
