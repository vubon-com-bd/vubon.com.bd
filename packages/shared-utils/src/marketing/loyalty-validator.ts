import { LOYALTY_STATUS } from '@vubon/shared-constants/src/marketing/loyalty-status.constants';

export interface LoyaltyInput {
  userId: string;
  status: string;
  availablePoints: number;
  isActive: boolean;
}

export const validateLoyalty = (
  loyalty: Partial<LoyaltyInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!loyalty.userId) errors.push('User ID is required');
  if (loyalty.status && !Object.keys(LOYALTY_STATUS).includes(loyalty.status)) {
    errors.push('Invalid loyalty status');
  }
  if (loyalty.availablePoints !== undefined && loyalty.availablePoints < 0) {
    errors.push('Available points cannot be negative');
  }
  return { isValid: errors.length === 0, errors };
};

export const isLoyaltyActive = (loyalty: LoyaltyInput): boolean => {
  return loyalty.isActive && loyalty.status === 'active';
};
