import { BaseEntity } from '../common/base.types';
import { AUTH_STATUS } from '@vubon/shared-constants/src/auth/auth-status.constants';
import { AUTH_TYPES } from '@vubon/shared-constants/src/auth/auth-type.constants';
import { AUTH_PROVIDER } from '@vubon/shared-constants/src/auth/auth-provider.constants';
import { AUTH_METHOD } from '@vubon/shared-constants/src/auth/auth-method.constants';
import { ROLES } from '@vubon/shared-constants/src/common/roles.constants';
import { PERMISSIONS } from '@vubon/shared-constants/src/common/permissions.constants';

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
 * Auth status value types
 */
export type AuthStatusValue = (typeof AUTH_STATUS)[keyof typeof AUTH_STATUS];
export type AuthTypeValue = (typeof AUTH_TYPES)[keyof typeof AUTH_TYPES];
export type AuthProviderValue = (typeof AUTH_PROVIDER)[keyof typeof AUTH_PROVIDER];
export type AuthMethodValue = (typeof AUTH_METHOD)[keyof typeof AUTH_METHOD];

/**
 * Auth interface (internal)
 */
export interface Auth extends Omit<BaseEntity, 'status'> {
  userId: string;
  email: string;
  phone?: string;
  /** @internal */
  passwordHash: string;
  status: AuthStatusValue;
  type: AuthTypeValue;
  provider: AuthProviderValue;
  method: AuthMethodValue;
  role: (typeof ROLES)[keyof typeof ROLES];
  permissions: Array<(typeof PERMISSIONS)[keyof typeof PERMISSIONS]>;
  isVerified: boolean;
  isActive: boolean;
  lastLoginAt?: Date;
  loginCount: number;
  metadata: AuthMetadata;
}

/**
 * Public-safe Auth DTO
 */
export type AuthPublic = Omit<Auth, 'passwordHash' | 'metadata'> & {
  metadata?: Omit<AuthMetadata, 'ipAddress'>;
};
