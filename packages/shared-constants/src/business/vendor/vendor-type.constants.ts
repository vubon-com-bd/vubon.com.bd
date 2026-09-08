import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const VENDOR_TYPE = {
  ...COMMON_TYPES,
  INDIVIDUAL: 'individual',
  BUSINESS: 'business',
  ENTERPRISE: 'enterprise',
  PARTNERSHIP: 'partnership',
  CORPORATION: 'corporation',
  NON_PROFIT: 'non_profit',
  FREELANCER: 'freelancer',
} as const;
