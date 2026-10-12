/**
 * VendorPayoutRepository
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorPayoutEntity } from '../entities/vendor-payout.entity.js';
import { PayoutStatusVO } from '../value-objects/primitives/payout-status.vo.js';
import { PayoutMethodVO } from '../value-objects/primitives/payout-method.vo.js';

export const VENDOR_PAYOUT_REPOSITORY = Symbol('VENDOR_PAYOUT_REPOSITORY');

export interface VendorPayoutFilter {
  readonly vendorId?: string;
  readonly status?: string;
  readonly method?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly minAmount?: number;
  readonly maxAmount?: number;
}

export interface VendorPayoutListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'amount' | 'paidAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VendorPayoutFilter;
}

export interface VendorPayoutPaginationResult {
  readonly items: readonly VendorPayoutEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface VendorPayoutSummary {
  readonly vendorId: string;
  readonly totalPaid: number;
  readonly totalPending: number;
  readonly currency: string;
  readonly lastPayoutAt?: string;
  readonly nextPayoutAt?: string;
}

export interface VendorPayoutRepository extends BaseRepository<VendorPayoutEntity, string> {
  findByVendorId(vendorId: string): Promise<readonly VendorPayoutEntity[]>;
  findByStatus(status: PayoutStatusVO): Promise<readonly VendorPayoutEntity[]>;
  findByMethod(method: PayoutMethodVO): Promise<readonly VendorPayoutEntity[]>;
  findByNumber(payoutNumber: string): Promise<VendorPayoutEntity | null>;
  findPaginated(options: VendorPayoutListOptions): Promise<VendorPayoutPaginationResult>;
  search(filter: VendorPayoutFilter): Promise<readonly VendorPayoutEntity[]>;

  /** Payouts in non-final states. */
  findActive(): Promise<readonly VendorPayoutEntity[]>;
  /** Payouts approved but not yet paid (past processing days). */
  findProcessingPastSla(hours: number): Promise<readonly VendorPayoutEntity[]>;
  /** Payouts requested today by vendor (rate limit). */
  countTodayByVendor(vendorId: string): Promise<number>;

  getSummary(vendorId: string): Promise<VendorPayoutSummary>;
  sumPaidBetween(vendorId: string, fromDate: string, toDate: string): Promise<number>;
  countByStatus(status: PayoutStatusVO): Promise<number>;
}
