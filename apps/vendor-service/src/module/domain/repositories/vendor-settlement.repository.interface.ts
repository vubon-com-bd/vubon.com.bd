/**
 * VendorSettlementRepository
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorSettlementEntity, SettlementStatus } from '../entities/vendor-settlement.entity.js';

export const VENDOR_SETTLEMENT_REPOSITORY = Symbol('VENDOR_SETTLEMENT_REPOSITORY');

export interface VendorSettlementFilter {
  readonly vendorId?: string;
  readonly status?: SettlementStatus;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface VendorSettlementRepository extends BaseRepository<VendorSettlementEntity, string> {
  findByVendorId(vendorId: string): Promise<readonly VendorSettlementEntity[]>;
  findByStatus(status: SettlementStatus): Promise<readonly VendorSettlementEntity[]>;
  findByNumber(settlementNumber: string): Promise<VendorSettlementEntity | null>;
  findByPayoutId(payoutId: string): Promise<readonly VendorSettlementEntity[]>;
  search(filter: VendorSettlementFilter): Promise<readonly VendorSettlementEntity[]>;

  /** Pending settlements ready to process. */
  findPendingReady(): Promise<readonly VendorSettlementEntity[]>;
  /** Settlements stuck in processing past SLA. */
  findProcessingPastSla(hours: number): Promise<readonly VendorSettlementEntity[]>;
  /** Latest settlement for a vendor. */
  findLatestByVendorId(vendorId: string): Promise<VendorSettlementEntity | null>;

  sumNetBetween(vendorId: string, fromDate: string, toDate: string): Promise<number>;
  countByStatus(status: SettlementStatus): Promise<number>;
}
