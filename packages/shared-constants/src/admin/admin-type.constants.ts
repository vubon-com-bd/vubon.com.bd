/**
 * Admin Type Constants
 * @module shared-constants/admin/admin-type
 *
 * Note: Does NOT spread COMMON_TYPES (primitives would leak).
 */

export const ADMIN_TYPES = {
  FULL_TIME: 'full_time',
  PART_TIME: 'part_time',
  CONTRACT: 'contract',
  INTERN: 'intern',
  CONSULTANT: 'consultant',
} as const;

export type AdminTypeValue = (typeof ADMIN_TYPES)[keyof typeof ADMIN_TYPES];
