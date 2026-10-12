/**
 * Fulfillment Repository Interface
 * @module logistics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { FulfillmentEntity } from '../entities/fulfillment.entity.js';
import { FulfillmentIdVO } from '../value-objects/primitives/fulfillment-id.vo.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';
import { WarehouseIdVO } from '../value-objects/primitives/warehouse-id.vo.js';
import { FulfillmentStatusVO } from '../value-objects/primitives/fulfillment-status.vo.js';
import { FulfillmentPriorityVO } from '../value-objects/primitives/fulfillment-priority.vo.js';

export const FULFILLMENT_REPOSITORY = Symbol('FULFILLMENT_REPOSITORY');

export interface FulfillmentListFilter {
  readonly orderId?: string;
  readonly vendorId?: string;
  readonly warehouseId?: string;
  readonly status?: string;
  readonly type?: string;
  readonly priority?: string;
  readonly assignedTo?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface FulfillmentListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'priority' | 'status' | 'sla';
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

export interface FulfillmentRepository extends BaseRepository<FulfillmentEntity, string> {
  findByIdVO(id: FulfillmentIdVO): Promise<FulfillmentEntity | null>;
  findByOrderId(orderId: OrderIdVO): Promise<readonly FulfillmentEntity[]>;
  findByVendorId(vendorId: VendorIdVO): Promise<readonly FulfillmentEntity[]>;
  findByWarehouseId(warehouseId: WarehouseIdVO): Promise<readonly FulfillmentEntity[]>;
  findByStatus(status: FulfillmentStatusVO): Promise<readonly FulfillmentEntity[]>;
  findByPriority(priority: FulfillmentPriorityVO): Promise<readonly FulfillmentEntity[]>;
  findReadyToShip(): Promise<readonly FulfillmentEntity[]>;
  findPendingByWarehouse(warehouseId: WarehouseIdVO): Promise<readonly FulfillmentEntity[]>;
  /** Pending/processing fulfillments past their SLA deadline. */
  findSlaBreached(): Promise<readonly FulfillmentEntity[]>;
  findPaginated(options: FulfillmentListOptions): Promise<FulfillmentPaginationResult>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
