/**
 * Tracking Repository Interface
 * @module logistics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { TrackingEntity } from '../entities/tracking.entity.js';
import { TrackingIdVO } from '../value-objects/primitives/tracking-id.vo.js';
import { TrackingNumberVO } from '../value-objects/primitives/tracking-number.vo.js';
import { ShipmentIdVO } from '../value-objects/primitives/shipment-id.vo.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';
import { TrackingStatusVO } from '../value-objects/primitives/tracking-status.vo.js';

export const TRACKING_REPOSITORY = Symbol('TRACKING_REPOSITORY');

export interface TrackingListFilter {
  readonly shipmentId?: string;
  readonly orderId?: string;
  readonly status?: string;
  readonly courierCode?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface TrackingListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'lastUpdatedAt';
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

export interface TrackingRepository extends BaseRepository<TrackingEntity, string> {
  findByIdVO(id: TrackingIdVO): Promise<TrackingEntity | null>;
  findByTrackingNumber(trackingNumber: TrackingNumberVO): Promise<TrackingEntity | null>;
  findByShipmentId(shipmentId: ShipmentIdVO): Promise<TrackingEntity | null>;
  findByOrderId(orderId: OrderIdVO): Promise<readonly TrackingEntity[]>;
  findByStatus(status: TrackingStatusVO): Promise<readonly TrackingEntity[]>;
  findPublicByTrackingNumber(trackingNumber: TrackingNumberVO): Promise<TrackingEntity | null>;
  findActive(): Promise<readonly TrackingEntity[]>;
  findStaleNoUpdate(olderThanMinutes: number): Promise<readonly TrackingEntity[]>;
  findPaginated(options: TrackingListOptions): Promise<TrackingPaginationResult>;
  existsByTrackingNumber(trackingNumber: TrackingNumberVO): Promise<boolean>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
