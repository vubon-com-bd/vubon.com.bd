import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const ADMIN_TYPES = {
  ...COMMON_TYPES,
  FULL_TIME: 'full_time',
  PART_TIME: 'part_time',
  CONTRACT: 'contract',
} as const;
