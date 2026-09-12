import { BaseEntity } from '../common/base.types';
import { ADMIN_STATUS } from '@vubon/shared-constants/src/admin/admin-status.constants';
import { ADMIN_TYPES } from '@vubon/shared-constants/src/admin/admin-type.constants';
import { ADMIN_LEVEL } from '@vubon/shared-constants/src/admin/admin-level.constants';
import { ADMIN_DEPARTMENT } from '@vubon/shared-constants/src/admin/admin-department.constants';
import { ADMIN_ROLES } from '@vubon/shared-constants/src/admin/admin-role.constants';
import { ADMIN_PERMISSIONS } from '@vubon/shared-constants/src/admin/admin-permission.constants';
import { UserPublic } from '../user/user.types';
import { AuthPublic } from '../auth/auth.types';

/**
 * Admin metadata interface
 */
export interface AdminMetadata {
  employeeId: string;
  title: string;
  reportsTo?: string;
  skills: string[];
  languages: string[];
  timezone: string;
}

/**
 * Admin interface (internal)
 *
 * Note: `userId` is a reference — fetch User/Auth separately when needed.
 * Prevents embedded data duplication and cross-table sync issues.
 */
export interface Admin extends Omit<BaseEntity, 'status'> {
  adminId: string;
  /** @internal — reference to User entity */
  userId: string;
  status: (typeof ADMIN_STATUS)[keyof typeof ADMIN_STATUS];
  type: (typeof ADMIN_TYPES)[keyof typeof ADMIN_TYPES];
  level: (typeof ADMIN_LEVEL)[keyof typeof ADMIN_LEVEL];
  department: (typeof ADMIN_DEPARTMENT)[keyof typeof ADMIN_DEPARTMENT];
  role: (typeof ADMIN_ROLES)[keyof typeof ADMIN_ROLES];
  permissions: Array<(typeof ADMIN_PERMISSIONS)[keyof typeof ADMIN_PERMISSIONS]>;
  isSuperAdmin: boolean;
  isActive: boolean;
  lastLoginAt?: Date;
  joinedAt: Date;
  metadata: AdminMetadata;
}

/**
 * Public-safe Admin DTO
 * Note: user/auth are optional summaries — fetch on demand.
 */
export type AdminPublic = Omit<Admin, 'metadata'> & {
  user?: UserPublic;
  auth?: AuthPublic;
  metadata?: Omit<AdminMetadata, 'reportsTo'>;
};
