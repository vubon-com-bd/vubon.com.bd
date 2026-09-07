import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const USER_KYC = {
  ...COMMON_TYPES,
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
} as const;
