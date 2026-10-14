/**
 * Vendor Return Policy Repository Interface
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { VendorReturnPolicyEntity } from '../entities/vendor-return-policy.entity.js';
import type { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';

export const VENDOR_RETURN_POLICY_REPOSITORY = Symbol('VENDOR_RETURN_POLICY_REPOSITORY');

export interface VendorReturnPolicyListFilter {
  readonly vendorId?: string;
  readonly type?: string | readonly string[];
  readonly allowsReturn?: boolean;
  readonly issuesRefund?: boolean;
  readonly isFreeReturn?: boolean;
  readonly autoApprove?: boolean;
  readonly minWindowDays?: number;
  readonly maxWindowDays?: number;
}

export interface VendorReturnPolicyListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'windowDays';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VendorReturnPolicyListFilter;
}

export interface VendorReturnPolicyPaginationResult {
  readonly items: readonly VendorReturnPolicyEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface VendorReturnPolicyRepository
  extends BaseRepository<VendorReturnPolicyEntity, string> {
  findByVendorId(
    vendorId: VendorIdVO | string,
  ): Promise<VendorReturnPolicyEntity | null>;
  findByType(type: string): Promise<readonly VendorReturnPolicyEntity[]>;
  findFreeReturn(): Promise<readonly VendorReturnPolicyEntity[]>;
  findAutoApprove(): Promise<readonly VendorReturnPolicyEntity[]>;
  findWithExtendedWindow(
    minDays: number,
  ): Promise<readonly VendorReturnPolicyEntity[]>;
  findPaginated(
    options: VendorReturnPolicyListOptions,
  ): Promise<VendorReturnPolicyPaginationResult>;
  getStats(): Promise<{
    readonly total: number;
    readonly allowsReturn: number;
    readonly freeReturn: number;
    readonly autoApprove: number;
    readonly averageWindowDays: number;
    readonly byType: Readonly<Record<string, number>>;
  }>;
}
