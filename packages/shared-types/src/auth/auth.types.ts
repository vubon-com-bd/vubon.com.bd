import { BaseEntity } from '../common/base.types';
import { AUTH_STATUS } from '@vubon/shared-constants/src/auth/auth-status.constants';
import { AUTH_TYPES } from '@vubon/shared-constants/src/auth/auth-type.constants';
import { AUTH_PROVIDER } from '@vubon/shared-constants/src/auth/auth-provider.constants';
import { AUTH_METHOD } from '@vubon/shared-constants/src/auth/auth-method.constants';

/**
 * Auth metadata interface
 */
export interface AuthMetadata {
  userAgent?: string;
  ipAddress?: string;
  deviceId?: string;
  location?: string;
}

/**
 * Auth interface
 */
export interface Auth extends BaseEntity {
  userId: string;
  email: string;
  phone?: string;
  passwordHash: string;
  status: keyof typeof AUTH_STATUS | string;
  type: keyof typeof AUTH_TYPES | string;
  provider: keyof typeof AUTH_PROVIDER | string;
  method: keyof typeof AUTH_METHOD | string;
  role: string;
  permissions: string[];
  isVerified: boolean;
  isActive: boolean;
  lastLoginAt?: Date;
  loginCount: number;
  metadata: AuthMetadata;
}
