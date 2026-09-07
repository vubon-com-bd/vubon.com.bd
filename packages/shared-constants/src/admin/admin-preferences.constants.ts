import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const ADMIN_PREFERENCES = {
  ...COMMON_TYPES,
  DARK_MODE: 'dark_mode',
  LANGUAGE: 'language',
  TIMEZONE: 'timezone',
} as const;
