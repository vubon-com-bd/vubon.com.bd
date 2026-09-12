import { VENDOR_PROFILE } from '@vubon/shared-constants/src/business/vendor/vendor-profile.constants';

export interface VendorProfileInput {
  displayName: string;
  website?: string;
  visibility: string;
}

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateVendorProfile = (
  profile: Partial<VendorProfileInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!profile.displayName) errors.push('Display name is required');
  if (profile.website && !isValidUrl(profile.website)) {
    errors.push('Invalid website URL');
  }
  if (profile.visibility && !Object.keys(VENDOR_PROFILE.TYPES).includes(profile.visibility)) {
    errors.push('Invalid visibility setting');
  }
  return { isValid: errors.length === 0, errors };
};
