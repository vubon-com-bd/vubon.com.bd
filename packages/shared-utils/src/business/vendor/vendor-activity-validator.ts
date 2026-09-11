import { VENDOR_ACTIVITY } from '@vubon/shared-constants/src/business/vendor/vendor-activity.constants';

export interface ActivityInput {
  vendorId: string;
  type: string;
  description: string;
}

export const validateVendorActivity = (
  activity: Partial<ActivityInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!activity.vendorId) errors.push('Vendor ID is required');
  if (!activity.type) errors.push('Activity type is required');
  if (activity.type && !Object.keys(VENDOR_ACTIVITY.TYPES).includes(activity.type)) {
    errors.push('Invalid activity type');
  }
  if (!activity.description) errors.push('Description is required');
  return { isValid: errors.length === 0, errors };
};
