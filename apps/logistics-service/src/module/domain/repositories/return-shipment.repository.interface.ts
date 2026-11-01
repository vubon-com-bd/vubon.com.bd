/**
 * ReturnShipment Repository Interface
 * @module logistics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { ReturnShipmentEntity } from '../entities/return-shipment.entity.js';
import type { ReturnShipmentIdVO } from '../value-objects/primitives/return-shipment-id.vo.js';

export const RETURN_SHIPMENT_REPOSITORY = Symbol('RETURN_SHIPMENT_REPOSITORY');

export interface ReturnShipmentListFilter {
  readonly status?: string;
  readonly type?: string;
  readonly reason?: string;
  readonly orderId?: string;
  readonly originalShipmentId?: string;
  readonly userId?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly minAmount?: number;
  readonly maxAmount?: number;
  readonly search?: string;
}

export interface ReturnShipmentListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'refundAmount';
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

export interface ReturnShipmentStats {
  readonly total: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly byReason: Readonly<Record<string, number>>;
  readonly totalRefunded: number;
  readonly currency: string;
  readonly averageRefund: number;
}

export interface ReturnShipmentRepository
  extends BaseRepository<ReturnShipmentEntity, string> {
  findByIdVO(id: ReturnShipmentIdVO): Promise<ReturnShipmentEntity | null>;
  findByRmaNumber(rmaNumber: string): Promise<ReturnShipmentEntity | null>;
  findByStatus(status: string): Promise<readonly ReturnShipmentEntity[]>;
  findByOrderId(orderId: string): Promise<readonly ReturnShipmentEntity[]>;
  findByUserId(userId: string): Promise<readonly ReturnShipmentEntity[]>;
  findByOriginalShipmentId(
    shipmentId: string,
  ): Promise<readonly ReturnShipmentEntity[]>;
  findPaginated(
    options: ReturnShipmentListOptions,
  ): Promise<ReturnShipmentPaginationResult>;
  getStats(
    fromDate?: string,
    toDate?: string,
  ): Promise<ReturnShipmentStats>;
  findPendingApproval(): Promise<readonly ReturnShipmentEntity[]>;
  findStale(olderThanMinutes: number): Promise<readonly ReturnShipmentEntity[]>;
  existsByRmaNumber(rmaNumber: string): Promise<boolean>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
