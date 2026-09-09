import { BaseEntity } from '../../common/base.types';
import { User } from '../../user/user.types';
import { VENDOR_STATUS } from '@vubon/shared-constants/src/business/vendor/vendor-status.constants';
import { VENDOR_TYPE } from '@vubon/shared-constants/src/business/vendor/vendor-type.constants';
import { VENDOR_TIER } from '@vubon/shared-constants/src/business/vendor/vendor-tier.constants';
import { VendorProfile } from './vendor-profile.types';
import { VendorBusiness } from './vendor-business.types';
import { VendorContact } from './vendor-contact.types';
import { VendorAddress } from './vendor-address.types';
import { VendorBankAccount } from './vendor-bank-account.types';
import { VendorDocument } from './vendor-document.types';
import { VendorCommission } from './vendor-commission.types';

export interface VendorSocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
}

export interface VendorStoreHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface VendorHoliday {
  date: Date;
  name: string;
  isClosed: boolean;
}

export interface VendorMetadata {
  businessLicense?: string;
  taxId?: string;
  website?: string;
  socialLinks: VendorSocialLinks;
  storeHours: VendorStoreHours;
  holidaySchedule: VendorHoliday[];
}

export interface Vendor extends BaseEntity {
  vendorId: string;
  userId: string;
  user: User;
  name: string;
  slug: string;
  status: keyof typeof VENDOR_STATUS | string;
  type: keyof typeof VENDOR_TYPE | string;
  tier: keyof typeof VENDOR_TIER | string;
  profile: VendorProfile;
  business: VendorBusiness;
  contacts: VendorContact[];
  addresses: VendorAddress[];
  bankAccounts: VendorBankAccount[];
  documents: VendorDocument[];
  commission: VendorCommission;
  isActive: boolean;
  isVerified: boolean;
  isApproved: boolean;
  isSuspended: boolean;
  joinedAt: Date;
  lastActiveAt: Date;
  metadata: VendorMetadata;
}
