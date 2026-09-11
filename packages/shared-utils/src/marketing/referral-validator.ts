import { REFERRAL_STATUS } from '@vubon/shared-constants/src/marketing/referral-status.constants';

export interface ReferralInput {
  referrerId: string;
  refereeId: string;
  status: string;
  isExpired: boolean;
  isCompleted: boolean;
  expiresAt: Date;
}

export const validateReferral = (
  referral: Partial<ReferralInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!referral.referrerId) errors.push('Referrer ID is required');
  if (!referral.refereeId) errors.push('Referee ID is required');
  if (referral.status && !Object.keys(REFERRAL_STATUS).includes(referral.status)) {
    errors.push('Invalid referral status');
  }
  return { isValid: errors.length === 0, errors };
};

export const isReferralValid = (referral: ReferralInput): boolean => {
  return !referral.isExpired && !referral.isCompleted && new Date(referral.expiresAt) > new Date();
};
