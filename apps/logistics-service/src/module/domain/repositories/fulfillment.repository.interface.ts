/**
 * Fulfillment Repository Interface
 * @module logistics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { FulfillmentEntity } from '../entities/fulfillment.entity.js';
import type { FulfillmentIdVO } from '../value-objects/primitives/fulfillment-id.vo.js';

export const FULFILLMENT_REPOSITORY = Symbol('FULFILLMENT_REPOSITORY');

export interface FulfillmentListFilter {
  readonly status?: string;
  readonly type?: string;
  readonly priority?: string;
  readonly orderId?: string;
  readonly vendorId?: string;
  readonly warehouseId?: string;
  readonly assignedTo?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly slaBreached?: boolean;
  readonly search?: string;
}

export interface FulfillmentListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'slaDueAt' | 'priority';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: FulfillmentListFilter;
}

export interface FulfillmentPaginationResult {
  readonly items: readonly FulfillmentEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface FulfillmentStats {
  readonly total: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly byPriority: Readonly<Record<string, number>>;
  readonly averageItemCount: number;
  readonly slaBreachedCount: number;
}

export interface FulfillmentRepository extends BaseRepository<FulfillmentEntity, string> {
  findByIdVO(id: FulfillmentIdVO): Promise<FulfillmentEntity | null>;
  findByOrderId(orderId: string): Promise<readonly FulfillmentEntity[]>;
  findByVendorId(vendorId: string): Promise<readonly FulfillmentEntity[]>;
  findByWarehouseId(warehouseId: string): Promise<readonly FulfillmentEntity[]>;
  findByStatus(status: string): Promise<readonly FulfillmentEntity[]>;
  findPendingByPriority(): Promise<readonly FulfillmentEntity[]>;
  findPaginated(options: FulfillmentListOptions): Promise<FulfillmentPaginationResult>;
  getStats(): Promise<FulfillmentStats>;
  findSlaBreached(): Promise<readonly FulfillmentEntity[]>;
  findStale(olderThanMinutes: number): Promise<readonly FulfillmentEntity[]>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
