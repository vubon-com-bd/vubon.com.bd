/**
 * Auth Types - Base
 * প্রমাণীকরণ সম্পর্কিত মূল টাইপ
 */

import { BaseEntity } from '../common/base.entity';
import { BaseResponse } from '../common/base.response';
import { AuthUser } from '../common/auth.user';
import { AUTH } from '@vubon/shared-constants';

export interface AuthBaseEntity extends BaseEntity {
  authProvider?: string;
  authType?: string;
  isVerified: boolean;
  isLocked: boolean;
  lastLoginAt?: Date;
}

export interface AuthUserType extends AuthUser {
  authProvider?: string;
  authType?: string;
  mfaEnabled: boolean;
  mfaMethods?: string[];
  sessionId?: string;
}

export interface AuthBaseResponse<T = unknown> extends BaseResponse<T> {
  authRequired?: boolean;
  sessionId?: string;
}

export type AuthStatus = (typeof AUTH.STATUS)[keyof typeof AUTH.STATUS];
export type AuthType = (typeof AUTH.TYPES)[keyof typeof AUTH.TYPES];
export type AuthMethod = (typeof AUTH.METHODS)[keyof typeof AUTH.METHODS];
export type AuthProvider = (typeof AUTH.PROVIDERS)[keyof typeof AUTH.PROVIDERS];
export type AuthSessionType = (typeof AUTH.SESSION)[keyof typeof AUTH.SESSION];

// AuthTokenType আলাদা করে এক্সপোর্ট করা হচ্ছে
export { AuthTokenType } from './auth-token.types';
