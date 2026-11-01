/**
 * Vendor Suspension Repository Interface
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { VendorSuspensionEntity } from '../entities/vendor-suspension.entity.js';
import type { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';
import type { SuspensionIdVO } from '../value-objects/primitives/suspension-id.vo.js';

export const VENDOR_SUSPENSION_REPOSITORY = Symbol('VENDOR_SUSPENSION_REPOSITORY');

export interface VendorSuspensionListFilter {
  readonly vendorId?: string;
  readonly status?: string | readonly string[];
  readonly reason?: string | readonly string[];
  readonly isSevere?: boolean;
  readonly isAutoResolvable?: boolean;
  readonly hasAppealDeadline?: boolean;
  readonly isPastExpectedLift?: boolean;
}

export interface VendorSuspensionListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'suspendedAt' | 'liftedAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VendorSuspensionListFilter;
}

export interface VendorSuspensionPaginationResult {
  readonly items: readonly VendorSuspensionEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface VendorSuspensionRepository
  extends BaseRepository<VendorSuspensionEntity, string> {
  findByIdVO(id: SuspensionIdVO): Promise<VendorSuspensionEntity | null>;
  findByVendor(
    vendorId: VendorIdVO | string,
  ): Promise<readonly VendorSuspensionEntity[]>;
  findActiveByVendor(
    vendorId: VendorIdVO | string,
  ): Promise<VendorSuspensionEntity | null>;
  findUnderAppealByVendor(
    vendorId: VendorIdVO | string,
  ): Promise<VendorSuspensionEntity | null>;
  findActive(limit?: number): Promise<readonly VendorSuspensionEntity[]>;
  findPastExpectedLift(): Promise<readonly VendorSuspensionEntity[]>;
  findSevereActive(): Promise<readonly VendorSuspensionEntity[]>;
  findAutoResolvable(): Promise<readonly VendorSuspensionEntity[]>;
  findExpiredAppeals(): Promise<readonly VendorSuspensionEntity[]>;
  findPaginated(
    options: VendorSuspensionListOptions,
  ): Promise<VendorSuspensionPaginationResult>;
  countByVendor(vendorId: VendorIdVO | string): Promise<number>;
  getStats(vendorId?: string): Promise<{
    readonly total: number;
    readonly active: number;
    readonly lifted: number;
    readonly expired: number;
    readonly underAppeal: number;
    readonly byReason: Readonly<Record<string, number>>;
  }>;
}
