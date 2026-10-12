/**
 * VendorProfileRepository — 1:1 profile repo
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorProfileEntity } from '../entities/vendor-profile.entity.js';

export const VENDOR_PROFILE_REPOSITORY = Symbol('VENDOR_PROFILE_REPOSITORY');

export interface VendorProfileRepository extends BaseRepository<VendorProfileEntity, string> {
  findByVendorId(vendorId: string): Promise<VendorProfileEntity | null>;
  existsByVendorId(vendorId: string): Promise<boolean>;
  upsert(entity: VendorProfileEntity): Promise<VendorProfileEntity>;
  deleteByVendorId(vendorId: string): Promise<void>;

  /** Profiles with incomplete setup. */
  findIncomplete(): Promise<readonly VendorProfileEntity[]>;
  /** Profiles missing a logo (for UI nudges). */
  findWithoutLogo(): Promise<readonly VendorProfileEntity[]>;
  /** Profiles by category slug. */
  findByCategory(category: string): Promise<readonly VendorProfileEntity[]>;
}
