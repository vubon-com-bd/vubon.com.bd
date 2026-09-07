import { ROLES } from '@vubon/shared-constants';
import { PERMISSIONS } from '@vubon/shared-constants';
import { ADMIN_STATUS } from '@vubon/shared-constants';
import { ADMIN_TYPES } from '@vubon/shared-constants';
import { ADMIN_LEVEL } from '@vubon/shared-constants';
import { ADMIN_DEPARTMENT } from '@vubon/shared-constants';
import { User } from '../user/user.types';
import { Auth } from '../auth/auth.types';

export interface AdminMetadata {
  employeeId: string;
  title: string;
  reportsTo?: string;
  skills: string[];
  languages: string[];
  timezone: string;
}

export interface Admin {
  adminId: string;
  userId: string;
  user: User;
  auth: Auth;
  status: keyof typeof ADMIN_STATUS;
  type: keyof typeof ADMIN_TYPES;
  level: keyof typeof ADMIN_LEVEL;
  department: keyof typeof ADMIN_DEPARTMENT;
  role: keyof typeof ROLES;
  permissions: (keyof typeof PERMISSIONS)[];
  isSuperAdmin: boolean;
  isActive: boolean;
  lastLoginAt?: Date;
  joinedAt: Date;
  metadata: AdminMetadata;
}
