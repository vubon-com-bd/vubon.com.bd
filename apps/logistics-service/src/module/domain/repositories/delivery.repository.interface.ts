/**
 * Delivery Repository Interface
 * @module logistics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { DeliveryEntity } from '../entities/delivery.entity.js';
import type { DeliveryIdVO } from '../value-objects/primitives/delivery-id.vo.js';

export const DELIVERY_REPOSITORY = Symbol('DELIVERY_REPOSITORY');

export interface DeliveryListFilter {
  readonly status?: string;
  readonly type?: string;
  readonly shipmentId?: string;
  readonly orderId?: string;
  readonly userId?: string;
  readonly driverId?: string;
  readonly vehicleId?: string;
  readonly routeId?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly search?: string;
}

export interface DeliveryListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'scheduledAt' | 'deliveredAt';
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
  readonly total: number;
  readonly totalDelivered: number;
  readonly totalFailed: number;
  readonly successRate: number;
  readonly averageAttempts: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
}

export interface DeliveryRepository extends BaseRepository<DeliveryEntity, string> {
  findByIdVO(id: DeliveryIdVO): Promise<DeliveryEntity | null>;
  findByShipmentId(shipmentId: string): Promise<DeliveryEntity | null>;
  findByOrderId(orderId: string): Promise<readonly DeliveryEntity[]>;
  findByDriverId(driverId: string): Promise<readonly DeliveryEntity[]>;
  findByStatus(status: string): Promise<readonly DeliveryEntity[]>;
  findByRouteId(routeId: string): Promise<readonly DeliveryEntity[]>;
  findPaginated(options: DeliveryListOptions): Promise<DeliveryPaginationResult>;
  getStats(driverId?: string, fromDate?: string, toDate?: string): Promise<DeliveryStats>;
  findStale(olderThanMinutes: number): Promise<readonly DeliveryEntity[]>;
  findInTransit(): Promise<readonly DeliveryEntity[]>;
  findScheduled(): Promise<readonly DeliveryEntity[]>;
  findFailedRetryable(): Promise<readonly DeliveryEntity[]>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
