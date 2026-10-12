/**
 * VendorCommissionRepository — commission config + history
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorCommissionEntity, CommissionTypeValue } from '../entities/vendor-commission.entity.js';

export const VENDOR_COMMISSION_REPOSITORY = Symbol('VENDOR_COMMISSION_REPOSITORY');

export interface VendorCommissionRepository extends BaseRepository<VendorCommissionEntity, string> {
  findByVendorId(vendorId: string): Promise<readonly VendorCommissionEntity[]>;

  /** Currently effective commission config for a vendor. */
  findActiveByVendorId(vendorId: string): Promise<VendorCommissionEntity | null>;
  /** Config active at a specific time. */
  findActiveAt(vendorId: string, at: Date): Promise<VendorCommissionEntity | null>;

  findByType(type: CommissionTypeValue): Promise<readonly VendorCommissionEntity[]>;
  findHistoryByVendorId(vendorId: string): Promise<readonly VendorCommissionEntity[]>;

  /** Configs that should be terminated (effectiveTo passed but still active). */
  findExpiredButActive(): Promise<readonly VendorCommissionEntity[]>;

  /** Vendors with no commission configured. */
  findVendorsWithoutConfig(): Promise<readonly string[]>;

  /** Average commission percent across all active configs. */
  getAveragePercent(): Promise<number>;

  countActiveByVendor(vendorId: string): Promise<number>;
  deactivateAllForVendor(vendorId: string): Promise<void>;
}
