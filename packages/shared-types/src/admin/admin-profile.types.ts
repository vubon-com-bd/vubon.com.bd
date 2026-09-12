import { UserProfile } from '../user/user-profile.types';
import { ADMIN_DEPARTMENT } from '@vubon/shared-constants/src/admin/admin-department.constants';
import { LANGUAGE } from '@vubon/shared-constants/src/common/language.constants';

/**
 * Value types
 */
export type AdminProfileDepartment = (typeof ADMIN_DEPARTMENT)[keyof typeof ADMIN_DEPARTMENT];
export type AdminProfileLanguage = (typeof LANGUAGE)[keyof typeof LANGUAGE];

/**
 * Admin profile interface
 *
 * Design notes:
 * - Extends UserProfile (inherits name, address, avatar, etc.).
 * - `adminId` only — no Admin summary embed.
 */
export interface AdminProfile extends UserProfile {
  adminId: string;
  employeeId: string;
  title: string;
  department: AdminProfileDepartment;
  managerId?: string;
  skills: string[];
  languages: AdminProfileLanguage[];
}
