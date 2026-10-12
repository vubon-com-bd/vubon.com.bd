/**
 * VendorSuspensionRepository
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorSuspensionEntity } from '../entities/vendor-suspension.entity.js';

export const VENDOR_SUSPENSION_REPOSITORY = Symbol('VENDOR_SUSPENSION_REPOSITORY');

export interface VendorSuspensionRepository extends BaseRepository<VendorSuspensionEntity, string> {
  findByVendorId(vendorId: string): Promise<readonly VendorSuspensionEntity[]>;
  findActiveByVendorId(vendorId: string): Promise<VendorSuspensionEntity | null>;
  findLatestByVendorId(vendorId: string): Promise<VendorSuspensionEntity | null>;

  /** Suspensions currently active (not lifted & not expired). */
  findActive(): Promise<readonly VendorSuspensionEntity[]>;
  /** Suspensions past expiry but not yet marked lifted. */
  findExpiredButActive(): Promise<readonly VendorSuspensionEntity[]>;
  /** Suspensions with pending appeals. */
  findWithPendingAppeal(): Promise<readonly VendorSuspensionEntity[]>;
  /** Suspensions eligible for auto-lift. */
  findAutoLiftCandidates(): Promise<readonly VendorSuspensionEntity[]>;

  countActive(): Promise<number>;
  countByVendor(vendorId: string): Promise<number>;
}
