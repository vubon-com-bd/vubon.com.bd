import { BaseEntity } from '../../common/base.types';
import { Name } from '../../common/name.types';
import { Address } from '../../common/address.types';
import { VENDOR_PROFILE } from '@vubon/shared-constants/src/business/vendor/vendor-profile.constants';
import { Vendor, VendorSocialLinks, VendorStoreHours } from './vendor.types';

export interface VendorProfile extends BaseEntity {
  profileId: string;
  vendorId: string;
  vendor: Vendor;
  name: Name;
  displayName: string;
  logo?: string;
  banner?: string;
  description?: string;
  about?: string;
  address?: Address;
  phone?: string;
  email?: string;
  website?: string;
  socialLinks: VendorSocialLinks;
  storeHours: VendorStoreHours;
  visibility: keyof typeof VENDOR_PROFILE.TYPES | string;
  isPublic: boolean;
  metadata: Record<string, unknown>;
}
