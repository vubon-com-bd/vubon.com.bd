import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const USER_ADDRESS = {
  ...COMMON_TYPES,
  HOME: 'home',
  OFFICE: 'office',
  OTHER: 'other',
} as const;
