/**
 * Vendor Verification Repository Interface
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { VendorVerificationEntity } from '../entities/vendor-verification.entity.js';
import type { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';
import type { VerificationIdVO } from '../value-objects/primitives/verification-id.vo.js';

export const VENDOR_VERIFICATION_REPOSITORY = Symbol('VENDOR_VERIFICATION_REPOSITORY');

export interface VendorVerificationListFilter {
  readonly vendorId?: string;
  readonly type?: string | readonly string[];
  readonly status?: string | readonly string[];
  readonly isOverdue?: boolean;
  readonly isExpiringSoon?: boolean;
  readonly expiringInDays?: number;
  readonly minAttempts?: number;
}

export interface VendorVerificationListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'submittedAt' | 'reviewedAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VendorVerificationListFilter;
}

export interface VendorVerificationPaginationResult {
  readonly items: readonly VendorVerificationEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface VendorVerificationRepository
  extends BaseRepository<VendorVerificationEntity, string> {
  findByIdVO(id: VerificationIdVO): Promise<VendorVerificationEntity | null>;
  findByVendor(
    vendorId: VendorIdVO | string,
  ): Promise<readonly VendorVerificationEntity[]>;
  findByVendorAndType(
    vendorId: VendorIdVO | string,
    type: string,
  ): Promise<VendorVerificationEntity | null>;
  findPending(
    limit?: number,
  ): Promise<readonly VendorVerificationEntity[]>;
  findInReview(
    limit?: number,
  ): Promise<readonly VendorVerificationEntity[]>;
  findApprovedByVendor(
    vendorId: VendorIdVO | string,
  ): Promise<readonly VendorVerificationEntity[]>;
  findOverdue(): Promise<readonly VendorVerificationEntity[]>;
  findExpiredByDate(): Promise<readonly VendorVerificationEntity[]>;
  findExpiringSoon(days: number): Promise<readonly VendorVerificationEntity[]>;
  findPaginated(
    options: VendorVerificationListOptions,
  ): Promise<VendorVerificationPaginationResult>;
  existsByVendorAndType(vendorId: string, type: string): Promise<boolean>;
  countByVendor(vendorId: VendorIdVO | string): Promise<number>;
  getStats(vendorId?: string): Promise<{
    readonly total: number;
    readonly byStatus: Readonly<Record<string, number>>;
    readonly byType: Readonly<Record<string, number>>;
    readonly overdue: number;
    readonly expiringSoon: number;
  }>;
}
