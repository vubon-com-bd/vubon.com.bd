import { VENDOR_STATUS } from '@vubon/shared-constants/src/business/vendor/vendor-status.constants';
import { VENDOR_TYPE } from '@vubon/shared-constants/src/business/vendor/vendor-type.constants';
import { VENDOR_TIER } from '@vubon/shared-constants/src/business/vendor/vendor-tier.constants';

export interface VendorInput {
  name: string;
  slug: string;
  status: string;
  type: string;
  tier: string;
  isActive: boolean;
  isVerified: boolean;
  isApproved: boolean;
}

export const isValidSlug = (slug: string): boolean => {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
};

export const validateVendor = (
  vendor: Partial<VendorInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!vendor.name) errors.push('Vendor name is required');
  if (!vendor.slug) errors.push('Vendor slug is required');
  if (vendor.slug && !isValidSlug(vendor.slug)) {
    errors.push('Invalid slug format');
  }
  if (vendor.status && !Object.keys(VENDOR_STATUS).includes(vendor.status)) {
    errors.push('Invalid vendor status');
  }
  if (vendor.type && !Object.keys(VENDOR_TYPE).includes(vendor.type)) {
    errors.push('Invalid vendor type');
  }
  if (vendor.tier && !Object.keys(VENDOR_TIER).includes(vendor.tier)) {
    errors.push('Invalid vendor tier');
  }
  return { isValid: errors.length === 0, errors };
};

export const isVendorActive = (vendor: VendorInput): boolean => {
  return vendor.isActive && vendor.status === 'active';
};

export const isVendorVerified = (vendor: VendorInput): boolean => {
  return vendor.isVerified && vendor.isApproved;
};
