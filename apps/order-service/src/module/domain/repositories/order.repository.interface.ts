/**
 * Order Repository Interface
 * @module order-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { OrderEntity } from '../entities/order.entity.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';
import { OrderNumberVO } from '../value-objects/primitives/order-number.vo.js';
import { OrderStatusVO } from '../value-objects/primitives/order-status.vo.js';
import { CustomerIdVO } from '../value-objects/primitives/customer-id.vo.js';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';

export const ORDER_REPOSITORY = Symbol('ORDER_REPOSITORY');

export interface OrderListFilter {
  readonly customerId?: string;
  readonly vendorId?: string;
  readonly status?: string;
  readonly priority?: string;
  readonly type?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly minTotal?: number;
  readonly maxTotal?: number;
  readonly search?: string;
}

export interface OrderListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'total' | 'status';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: OrderListFilter;
}

export interface OrderPaginationResult {
  readonly items: readonly OrderEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface OrderStats {
  readonly totalOrders: number;
  readonly totalRevenue: number;
  readonly averageOrderValue: number;
  readonly currency: string;
  readonly byStatus: Readonly<Record<string, number>>;
}

export interface OrderRepository extends BaseRepository<OrderEntity, string> {
  findByIdVO(id: OrderIdVO): Promise<OrderEntity | null>;
  findByNumber(orderNumber: OrderNumberVO): Promise<OrderEntity | null>;
  findByCustomerId(customerId: CustomerIdVO): Promise<readonly OrderEntity[]>;
  findByVendorId(vendorId: VendorIdVO): Promise<readonly OrderEntity[]>;
  findByStatus(status: OrderStatusVO): Promise<readonly OrderEntity[]>;
  findByCustomerAndStatus(
    customerId: CustomerIdVO,
    status: OrderStatusVO,
  ): Promise<readonly OrderEntity[]>;
  existsByNumber(orderNumber: OrderNumberVO): Promise<boolean>;
  findPaginated(options: OrderListOptions): Promise<OrderPaginationResult>;
  countByCustomer(customerId: CustomerIdVO): Promise<number>;
  getStats(
    customerId?: string,
    vendorId?: string,
    fromDate?: string,
    toDate?: string,
  ): Promise<OrderStats>;
  findPendingOlderThan(hours: number): Promise<readonly OrderEntity[]>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
