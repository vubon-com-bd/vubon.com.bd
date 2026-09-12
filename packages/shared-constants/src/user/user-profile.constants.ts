import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const USER_PROFILE = {
  ...COMMON_TYPES,
  PUBLIC: 'public',
  PRIVATE: 'private',
  FRIENDS: 'friends',
} as const;
