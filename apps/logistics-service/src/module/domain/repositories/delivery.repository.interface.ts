/**
 * Delivery Repository Interface
 * @module logistics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { DeliveryEntity } from '../entities/delivery.entity.js';
import { DeliveryIdVO } from '../value-objects/primitives/delivery-id.vo.js';
import { ShipmentIdVO } from '../value-objects/primitives/shipment-id.vo.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';
import { DriverIdVO } from '../value-objects/primitives/driver-id.vo.js';
import { DeliveryStatusVO } from '../value-objects/primitives/delivery-status.vo.js';

export const DELIVERY_REPOSITORY = Symbol('DELIVERY_REPOSITORY');

export interface DeliveryListFilter {
  readonly shipmentId?: string;
  readonly orderId?: string;
  readonly driverId?: string;
  readonly status?: string;
  readonly type?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface DeliveryListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'scheduledAt' | 'deliveredAt' | 'status';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: DeliveryListFilter;
}

export interface DeliveryPaginationResult {
  readonly items: readonly DeliveryEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface DeliveryStats {
  readonly totalDeliveries: number;
  readonly delivered: number;
  readonly failed: number;
  readonly inTransit: number;
  readonly averageAttempts: number;
  readonly firstAttemptSuccessRate: number;
  readonly byStatus: Readonly<Record<string, number>>;
}

export interface DeliveryRepository extends BaseRepository<DeliveryEntity, string> {
  findByIdVO(id: DeliveryIdVO): Promise<DeliveryEntity | null>;
  findByShipmentId(shipmentId: ShipmentIdVO): Promise<DeliveryEntity | null>;
  findByOrderId(orderId: OrderIdVO): Promise<readonly DeliveryEntity[]>;
  findByDriverId(driverId: DriverIdVO): Promise<readonly DeliveryEntity[]>;
  findByStatus(status: DeliveryStatusVO): Promise<readonly DeliveryEntity[]>;
  findActiveByDriver(driverId: DriverIdVO): Promise<readonly DeliveryEntity[]>;
  findScheduledFor(date: string): Promise<readonly DeliveryEntity[]>;
  findPaginated(options: DeliveryListOptions): Promise<DeliveryPaginationResult>;
  getStats(driverId?: string, fromDate?: string, toDate?: string): Promise<DeliveryStats>;
  findStaleAssigned(olderThanHours: number): Promise<readonly DeliveryEntity[]>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
