import { BaseEntity } from '../common/base.types';
import { ADMIN_STATUS } from '@vubon/shared-constants/src/admin/admin-status.constants';
import { ADMIN_TYPES } from '@vubon/shared-constants/src/admin/admin-type.constants';
import { ADMIN_LEVEL } from '@vubon/shared-constants/src/admin/admin-level.constants';
import { ADMIN_DEPARTMENT } from '@vubon/shared-constants/src/admin/admin-department.constants';
import { User } from '../user/user.types';
import { Auth } from '../auth/auth.types';

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
 * Admin interface
 */
export interface Admin extends BaseEntity {
  adminId: string;
  userId: string;
  user: User;
  auth: Auth;
  status: keyof typeof ADMIN_STATUS | string;
  type: keyof typeof ADMIN_TYPES | string;
  level: keyof typeof ADMIN_LEVEL | string;
  department: keyof typeof ADMIN_DEPARTMENT | string;
  role: string;
  permissions: string[];
  isSuperAdmin: boolean;
  isActive: boolean;
  lastLoginAt?: Date;
  joinedAt: Date;
  metadata: AdminMetadata;
}
