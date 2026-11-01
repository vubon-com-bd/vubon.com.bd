/**
 * Vendor Payout Repository Interface
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { VendorPayoutEntity } from '../entities/vendor-payout.entity.js';
import type { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';
import type { PayoutIdVO } from '../value-objects/primitives/payout-id.vo.js';

export const VENDOR_PAYOUT_REPOSITORY = Symbol('VENDOR_PAYOUT_REPOSITORY');

export interface VendorPayoutListFilter {
  readonly vendorId?: string;
  readonly status?: string | readonly string[];
  readonly method?: string | readonly string[];
  readonly currency?: string;
  readonly minAmount?: number;
  readonly maxAmount?: number;
  readonly isOverdue?: boolean;
  readonly isSuccessful?: boolean;
  readonly requestedFrom?: string;
  readonly requestedTo?: string;
  readonly search?: string;
}

export interface VendorPayoutListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'requestedAt' | 'paidAt' | 'amount';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VendorPayoutListFilter;
}

export interface VendorPayoutPaginationResult {
  readonly items: readonly VendorPayoutEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface VendorPayoutStats {
  readonly total: number;
  readonly totalAmount: number;
  readonly totalPaidAmount: number;
  readonly totalPendingAmount: number;
  readonly averageAmount: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byMethod: Readonly<Record<string, number>>;
}

export interface VendorPayoutRepository
  extends BaseRepository<VendorPayoutEntity, string> {
  findByIdVO(id: PayoutIdVO): Promise<VendorPayoutEntity | null>;
  findByVendor(
    vendorId: VendorIdVO | string,
  ): Promise<readonly VendorPayoutEntity[]>;
  findByVendorAndStatus(
    vendorId: VendorIdVO | string,
    status: string,
  ): Promise<readonly VendorPayoutEntity[]>;
  findPending(limit?: number): Promise<readonly VendorPayoutEntity[]>;
  findProcessing(limit?: number): Promise<readonly VendorPayoutEntity[]>;
  findOnHold(limit?: number): Promise<readonly VendorPayoutEntity[]>;
  findOverdue(): Promise<readonly VendorPayoutEntity[]>;
  findByTransactionId(transactionId: string): Promise<VendorPayoutEntity | null>;
  findPaginated(
    options: VendorPayoutListOptions,
  ): Promise<VendorPayoutPaginationResult>;
  getStats(
    vendorId?: string,
    fromDate?: string,
    toDate?: string,
  ): Promise<VendorPayoutStats>;
  countByVendor(vendorId: VendorIdVO | string): Promise<number>;
  countByVendorAndStatus(vendorId: string, status: string): Promise<number>;
  sumPaidAmountByVendor(vendorId: string, fromDate?: string, toDate?: string): Promise<number>;
  sumPendingAmountByVendor(vendorId: string): Promise<number>;
  findLatestByVendor(
    vendorId: VendorIdVO | string,
  ): Promise<VendorPayoutEntity | null>;
}
