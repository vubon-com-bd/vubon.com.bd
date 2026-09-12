/**
 * Admin Department Constants
 * @module shared-constants/admin/admin-department
 *
 * Note: Does NOT spread COMMON_TYPES.
 */

export const ADMIN_DEPARTMENT = {
  IT: 'it',
  HR: 'hr',
  FINANCE: 'finance',
  OPERATIONS: 'operations',
  MARKETING: 'marketing',
  SALES: 'sales',
  SUPPORT: 'support',
  LEGAL: 'legal',
} as const;

export type AdminDepartmentValue = (typeof ADMIN_DEPARTMENT)[keyof typeof ADMIN_DEPARTMENT];
