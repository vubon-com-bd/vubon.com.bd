import { VENDOR_SUBSCRIPTION } from '@vubon/shared-constants/src/business/vendor/vendor-subscription.constants';

export interface SubscriptionInput {
  vendorId: string;
  tier: string;
  status: string;
}

export const validateVendorSubscription = (
  sub: Partial<SubscriptionInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!sub.vendorId) errors.push('Vendor ID is required');
  if (!sub.tier) errors.push('Tier is required');
  if (sub.status && !Object.keys(VENDOR_SUBSCRIPTION.STATUS).includes(sub.status)) {
    errors.push('Invalid subscription status');
  }
  return { isValid: errors.length === 0, errors };
};
