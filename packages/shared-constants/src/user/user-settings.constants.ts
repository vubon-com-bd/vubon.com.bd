import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const USER_SETTINGS = {
  ...COMMON_TYPES,
  THEME: 'theme',
  LANGUAGE: 'language',
  NOTIFICATIONS: 'notifications',
} as const;
