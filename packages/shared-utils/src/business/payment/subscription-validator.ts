import { PAYMENT_SUBSCRIPTION } from '@vubon/shared-constants/src/business/payment/payment-subscription.constants';

export interface SubscriptionInput {
  userId: string;
  planId: string;
  status: string;
  type: string;
  isActive: boolean;
  endDate: Date;
}

export const validateSubscription = (
  subscription: Partial<SubscriptionInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!subscription.userId) errors.push('User ID is required');
  if (!subscription.planId) errors.push('Plan ID is required');
  if (
    subscription.status &&
    !Object.keys(PAYMENT_SUBSCRIPTION.STATUS).includes(subscription.status)
  ) {
    errors.push('Invalid subscription status');
  }
  if (subscription.type && !Object.keys(PAYMENT_SUBSCRIPTION.TYPES).includes(subscription.type)) {
    errors.push('Invalid subscription type');
  }
  return { isValid: errors.length === 0, errors };
};

export const isSubscriptionActive = (subscription: SubscriptionInput): boolean => {
  return subscription.isActive && new Date(subscription.endDate) > new Date();
};
