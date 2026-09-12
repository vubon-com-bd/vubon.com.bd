/**
 * Admin Level Constants
 * @module shared-constants/admin/admin-level
 *
 * Note: Does NOT spread COMMON_TYPES.
 */

export const ADMIN_LEVEL = {
  L1: 'level_1',
  L2: 'level_2',
  L3: 'level_3',
  L4: 'level_4',
  L5: 'level_5',
} as const;

export type AdminLevelValue = (typeof ADMIN_LEVEL)[keyof typeof ADMIN_LEVEL];
