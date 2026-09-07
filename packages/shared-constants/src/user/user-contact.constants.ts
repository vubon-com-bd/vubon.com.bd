import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const USER_CONTACT = {
  ...COMMON_TYPES,
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  EMERGENCY: 'emergency',
} as const;
