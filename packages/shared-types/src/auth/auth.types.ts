import { STATUS } from '@vubon/shared-constants';
import { ROLES } from '@vubon/shared-constants';
import { PERMISSIONS } from '@vubon/shared-constants';
import { AUTH_TYPES } from '@vubon/shared-constants';
import { AUTH_PROVIDER } from '@vubon/shared-constants';
import { AUTH_METHOD } from '@vubon/shared-constants';

export interface AuthMetadata {
  userAgent?: string;
  ipAddress?: string;
  deviceId?: string;
  location?: string;
}

export interface Auth {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isDeleted: boolean;
  userId: string;
  email: string;
  phone?: string;
  passwordHash: string;
  status: keyof typeof STATUS;
  type: keyof typeof AUTH_TYPES;
  provider: keyof typeof AUTH_PROVIDER;
  method: keyof typeof AUTH_METHOD;
  role: keyof typeof ROLES;
  permissions: (keyof typeof PERMISSIONS)[];
  isVerified: boolean;
  lastLoginAt?: Date;
  loginCount: number;
  metadata: AuthMetadata;
}
