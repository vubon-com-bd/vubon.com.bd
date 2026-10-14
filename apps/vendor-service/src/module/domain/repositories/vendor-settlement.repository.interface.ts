/**
 * Vendor Settlement Repository Interface
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { VendorSettlementEntity } from '../entities/vendor-settlement.entity.js';
import type { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';
import type { SettlementIdVO } from '../value-objects/primitives/settlement-id.vo.js';

export const VENDOR_SETTLEMENT_REPOSITORY = Symbol('VENDOR_SETTLEMENT_REPOSITORY');

export interface VendorSettlementListFilter {
  readonly vendorId?: string;
  readonly status?: string | readonly string[];
  readonly currency?: string;
  readonly minNetAmount?: number;
  readonly maxNetAmount?: number;
  readonly periodStartFrom?: string;
  readonly periodEndTo?: string;
  readonly isOverdue?: boolean;
  readonly hasPayout?: boolean;
}

export interface VendorSettlementListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'periodEnd' | 'netAmount' | 'completedAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VendorSettlementListFilter;
}

export interface VendorSettlementPaginationResult {
  readonly items: readonly VendorSettlementEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface VendorSettlementStats {
  readonly total: number;
  readonly totalGross: number;
  readonly totalNet: number;
  readonly totalCommission: number;
  readonly totalRefunds: number;
  readonly averageNetAmount: number;
  readonly byStatus: Readonly<Record<string, number>>;
}

export interface VendorSettlementRepository
  extends BaseRepository<VendorSettlementEntity, string> {
  findByIdVO(id: SettlementIdVO): Promise<VendorSettlementEntity | null>;
  findByVendor(
    vendorId: VendorIdVO | string,
  ): Promise<readonly VendorSettlementEntity[]>;
  findByPayoutId(payoutId: string): Promise<readonly VendorSettlementEntity[]>;
  findPending(limit?: number): Promise<readonly VendorSettlementEntity[]>;
  findProcessing(limit?: number): Promise<readonly VendorSettlementEntity[]>;
  findOnHold(limit?: number): Promise<readonly VendorSettlementEntity[]>;
  findOverdue(): Promise<readonly VendorSettlementEntity[]>;
  findByPeriod(
    vendorId: string,
    periodStart: string,
    periodEnd: string,
  ): Promise<readonly VendorSettlementEntity[]>;
  findPaginated(
    options: VendorSettlementListOptions,
  ): Promise<VendorSettlementPaginationResult>;
  getStats(
    vendorId?: string,
    fromDate?: string,
    toDate?: string,
  ): Promise<VendorSettlementStats>;
  countByVendor(vendorId: VendorIdVO | string): Promise<number>;
  findLatestByVendor(
    vendorId: VendorIdVO | string,
  ): Promise<VendorSettlementEntity | null>;
  sumNetAmountByVendor(vendorId: string, fromDate?: string, toDate?: string): Promise<number>;
}
