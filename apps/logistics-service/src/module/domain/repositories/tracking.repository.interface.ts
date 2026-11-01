/**
 * Tracking Repository Interface
 * @module logistics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { TrackingEntity } from '../entities/tracking.entity.js';
import type { TrackingIdVO } from '../value-objects/primitives/tracking-id.vo.js';

export const TRACKING_REPOSITORY = Symbol('TRACKING_REPOSITORY');

export interface TrackingListFilter {
  readonly status?: string;
  readonly shipmentId?: string;
  readonly orderId?: string;
  readonly courierCode?: string;
  readonly source?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly search?: string;
}

export interface TrackingListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'lastUpdatedAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: TrackingListFilter;
}

export interface TrackingPaginationResult {
  readonly items: readonly TrackingEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface TrackingStats {
  readonly total: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly bySource: Readonly<Record<string, number>>;
  readonly averageEventCount: number;
}

export interface TrackingRepository extends BaseRepository<TrackingEntity, string> {
  findByIdVO(id: TrackingIdVO): Promise<TrackingEntity | null>;
  findByTrackingNumber(trackingNumber: string): Promise<TrackingEntity | null>;
  findByShipmentId(shipmentId: string): Promise<TrackingEntity | null>;
  findByOrderId(orderId: string): Promise<readonly TrackingEntity[]>;
  findByStatus(status: string): Promise<readonly TrackingEntity[]>;
  findPaginated(options: TrackingListOptions): Promise<TrackingPaginationResult>;
  getStats(): Promise<TrackingStats>;
  findStale(olderThanMinutes: number): Promise<readonly TrackingEntity[]>;
  findExpired(): Promise<readonly TrackingEntity[]>;
  existsByTrackingNumber(trackingNumber: string): Promise<boolean>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
