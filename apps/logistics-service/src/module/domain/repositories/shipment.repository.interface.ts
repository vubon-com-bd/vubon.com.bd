/**
 * Shipment Repository Interface
 * @module logistics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ShipmentEntity } from '../entities/shipment.entity.js';
import { ShipmentIdVO } from '../value-objects/primitives/shipment-id.vo.js';
import { TrackingNumberVO } from '../value-objects/primitives/tracking-number.vo.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';
import { CourierIdVO } from '../value-objects/primitives/courier-id.vo.js';
import { WarehouseIdVO } from '../value-objects/primitives/warehouse-id.vo.js';
import { ShipmentStatusVO } from '../value-objects/primitives/shipment-status.vo.js';

export const SHIPMENT_REPOSITORY = Symbol('SHIPMENT_REPOSITORY');

export interface ShipmentListFilter {
  readonly orderId?: string;
  readonly userId?: string;
  readonly vendorId?: string;
  readonly courierId?: string;
  readonly warehouseId?: string;
  readonly status?: string;
  readonly type?: string;
  readonly priority?: string;
  readonly isCOD?: boolean;
  readonly isInsured?: boolean;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly search?: string;
}

export interface ShipmentListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'status' | 'priority' | 'estimatedDeliveryAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: ShipmentListFilter;
}

export interface ShipmentPaginationResult {
  readonly items: readonly ShipmentEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface ShipmentStats {
  readonly totalShipments: number;
  readonly inTransit: number;
  readonly delivered: number;
  readonly failed: number;
  readonly returned: number;
  readonly cancelled: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byPriority: Readonly<Record<string, number>>;
  readonly byCourier: Readonly<Record<string, number>>;
}

export interface ShipmentRepository extends BaseRepository<ShipmentEntity, string> {
  findByIdVO(id: ShipmentIdVO): Promise<ShipmentEntity | null>;
  findByTrackingNumber(trackingNumber: TrackingNumberVO): Promise<ShipmentEntity | null>;
  findByOrderId(orderId: OrderIdVO): Promise<readonly ShipmentEntity[]>;
  findByUserId(userId: UserIdVO): Promise<readonly ShipmentEntity[]>;
  findByVendorId(vendorId: VendorIdVO): Promise<readonly ShipmentEntity[]>;
  findByCourierId(courierId: CourierIdVO): Promise<readonly ShipmentEntity[]>;
  findByWarehouseId(warehouseId: WarehouseIdVO): Promise<readonly ShipmentEntity[]>;
  findByStatus(status: ShipmentStatusVO): Promise<readonly ShipmentEntity[]>;
  existsByTrackingNumber(trackingNumber: TrackingNumberVO): Promise<boolean>;
  findPaginated(options: ShipmentListOptions): Promise<ShipmentPaginationResult>;
  countByOrder(orderId: OrderIdVO): Promise<number>;
  getStats(
    userId?: string,
    vendorId?: string,
    fromDate?: string,
    toDate?: string,
  ): Promise<ShipmentStats>;
  /** Shipments stuck in a non-final state older than N hours. */
  findStale(olderThanHours: number): Promise<readonly ShipmentEntity[]>;
  /** Shipments ready for pickup (packed + courier + warehouse). */
  findReadyForPickup(): Promise<readonly ShipmentEntity[]>;
  /** Shipments awaiting a courier assignment. */
  findAwaitingCourier(): Promise<readonly ShipmentEntity[]>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
