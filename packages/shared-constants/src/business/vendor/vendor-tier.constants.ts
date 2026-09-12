import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const VENDOR_TIER = {
  ...COMMON_TYPES,
  BASIC: 'basic',
  SILVER: 'silver',
  GOLD: 'gold',
  PLATINUM: 'platinum',
  DIAMOND: 'diamond',
  ENTERPRISE: 'enterprise',
} as const;
