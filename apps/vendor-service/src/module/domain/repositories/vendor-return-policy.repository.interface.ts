/**
 * VendorReturnPolicyRepository — 1:1 with vendor
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorReturnPolicyEntity } from '../entities/vendor-return-policy.entity.js';

export const VENDOR_RETURN_POLICY_REPOSITORY = Symbol('VENDOR_RETURN_POLICY_REPOSITORY');

export interface VendorReturnPolicyRepository extends BaseRepository<VendorReturnPolicyEntity, string> {
  findByVendorId(vendorId: string): Promise<VendorReturnPolicyEntity | null>;
  existsByVendorId(vendorId: string): Promise<boolean>;
  upsert(entity: VendorReturnPolicyEntity): Promise<VendorReturnPolicyEntity>;

  /** Vendors with no-return policy (for analytics). */
  findNoReturnPolicies(): Promise<readonly VendorReturnPolicyEntity[]>;
  /** Vendors with generous return window (>= 14 days & free). */
  findGenerousPolicies(): Promise<readonly VendorReturnPolicyEntity[]>;
  /** Vendors requiring images for returns. */
  findRequiringImages(): Promise<readonly VendorReturnPolicyEntity[]>;

  deleteByVendorId(vendorId: string): Promise<void>;
}
