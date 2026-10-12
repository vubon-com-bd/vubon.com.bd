/**
 * VendorSettingsRepository — 1:1 settings repo
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorSettingsEntity } from '../entities/vendor-settings.entity.js';

export const VENDOR_SETTINGS_REPOSITORY = Symbol('VENDOR_SETTINGS_REPOSITORY');

export interface VendorSettingsRepository extends BaseRepository<VendorSettingsEntity, string> {
  findByVendorId(vendorId: string): Promise<VendorSettingsEntity | null>;
  existsByVendorId(vendorId: string): Promise<boolean>;
  upsert(entity: VendorSettingsEntity): Promise<VendorSettingsEntity>;

  /** Vendors currently on vacation. */
  findOnVacation(): Promise<readonly VendorSettingsEntity[]>;
  /** Vendors with auto-accept enabled. */
  findAutoAccept(): Promise<readonly VendorSettingsEntity[]>;
}
