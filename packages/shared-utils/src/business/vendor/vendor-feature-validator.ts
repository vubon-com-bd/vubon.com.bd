import { VENDOR_FEATURE } from '@vubon/shared-constants/src/business/vendor/vendor-feature.constants';

export interface FeatureInput {
  type: string;
  status: string;
}

export const validateVendorFeature = (
  feature: Partial<FeatureInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!feature.type) errors.push('Feature type is required');
  if (feature.type && !Object.keys(VENDOR_FEATURE.TYPES).includes(feature.type)) {
    errors.push('Invalid feature type');
  }
  if (feature.status && !Object.keys(VENDOR_FEATURE.FEATURE_STATUS).includes(feature.status)) {
    errors.push('Invalid feature status');
  }
  return { isValid: errors.length === 0, errors };
};
