import { AFFILIATE_STATUS } from '@vubon/shared-constants/src/marketing/affiliate-status.constants';

export interface AffiliateInput {
  userId: string;
  code: string;
  status: string;
  isActive: boolean;
  isApproved: boolean;
}

export const validateAffiliate = (
  affiliate: Partial<AffiliateInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!affiliate.userId) errors.push('User ID is required');
  if (!affiliate.code) errors.push('Affiliate code is required');
  if (affiliate.status && !Object.keys(AFFILIATE_STATUS).includes(affiliate.status)) {
    errors.push('Invalid affiliate status');
  }
  return { isValid: errors.length === 0, errors };
};

export const isAffiliateActive = (affiliate: AffiliateInput): boolean => {
  return affiliate.isActive && affiliate.isApproved && affiliate.status === 'active';
};
