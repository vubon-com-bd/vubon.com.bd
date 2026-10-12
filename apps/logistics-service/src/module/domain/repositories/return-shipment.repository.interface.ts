/**
 * ReturnShipment Repository Interface
 * @module logistics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ReturnShipmentEntity } from '../entities/return-shipment.entity.js';
import { ReturnShipmentIdVO } from '../value-objects/primitives/return-shipment-id.vo.js';
import { RmaNumberVO } from '../value-objects/primitives/rma-number.vo.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { ShipmentIdVO } from '../value-objects/primitives/shipment-id.vo.js';
import { ReturnShipmentStatusVO } from '../value-objects/primitives/return-shipment-status.vo.js';

export const RETURN_SHIPMENT_REPOSITORY = Symbol('RETURN_SHIPMENT_REPOSITORY');

export interface ReturnShipmentListFilter {
  readonly orderId?: string;
  readonly userId?: string;
  readonly originalShipmentId?: string;
  readonly status?: string;
  readonly type?: string;
  readonly reason?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface ReturnShipmentListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'rmaNumber' | 'status';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: ReturnShipmentListFilter;
}

export interface ReturnShipmentPaginationResult {
  readonly items: readonly ReturnShipmentEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface ReturnShipmentRepository extends BaseRepository<ReturnShipmentEntity, string> {
  findByIdVO(id: ReturnShipmentIdVO): Promise<ReturnShipmentEntity | null>;
  findByRma(rmaNumber: RmaNumberVO): Promise<ReturnShipmentEntity | null>;
  findByOrderId(orderId: OrderIdVO): Promise<readonly ReturnShipmentEntity[]>;
  findByUserId(userId: UserIdVO): Promise<readonly ReturnShipmentEntity[]>;
  findByOriginalShipment(shipmentId: ShipmentIdVO): Promise<readonly ReturnShipmentEntity[]>;
  findByStatus(status: ReturnShipmentStatusVO): Promise<readonly ReturnShipmentEntity[]>;
  findPendingApproval(): Promise<readonly ReturnShipmentEntity[]>;
  findAwaitingPickup(): Promise<readonly ReturnShipmentEntity[]>;
  findAwaitingInspection(): Promise<readonly ReturnShipmentEntity[]>;
  findPaginated(options: ReturnShipmentListOptions): Promise<ReturnShipmentPaginationResult>;
  existsByRma(rmaNumber: RmaNumberVO): Promise<boolean>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
