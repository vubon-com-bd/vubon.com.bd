import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const ADMIN_LEVEL = {
  ...COMMON_TYPES,
  L1: 'level_1',
  L2: 'level_2',
  L3: 'level_3',
  L4: 'level_4',
} as const;
