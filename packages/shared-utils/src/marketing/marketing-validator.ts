import { MARKETING } from '@vubon/shared-constants/src/marketing/marketing.constants';

export interface MarketingInput {
  status: string;
  totalBudget: number;
  isActive: boolean;
}

export const validateMarketing = (
  marketing: Partial<MarketingInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (marketing.status && !Object.keys(MARKETING.STATUS).includes(marketing.status)) {
    errors.push('Invalid marketing status');
  }
  if (marketing.totalBudget !== undefined && marketing.totalBudget < 0) {
    errors.push('Total budget cannot be negative');
  }
  return { isValid: errors.length === 0, errors };
};

export const isMarketingActive = (marketing: MarketingInput): boolean => {
  return marketing.isActive;
};
