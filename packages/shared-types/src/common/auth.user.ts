import { ROLES, STATUS } from '@vubon/shared-constants';

/**
 * Auth User
 * অথেনটিকেটেড ইউজার টাইপ
 */
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: (typeof ROLES)[keyof typeof ROLES];
  status:
    typeof STATUS.ACTIVE | typeof STATUS.INACTIVE | typeof STATUS.PENDING | typeof STATUS.SUSPENDED;
  isVerified: boolean;
  isLocked: boolean;
  lastLoginAt?: Date;
  permissions?: string[];
  sessionId?: string;
}

/**
 * Auth User with Token
 * টোকেন সহ অথেনটিকেটেড ইউজার
 */
export interface AuthUserWithToken extends AuthUser {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

/**
 * Auth User Payload (JWT)
 * JWT পেলোড
 */
export interface AuthUserPayload {
  sub: string;
  email: string;
  name: string;
  role: string;
  status: string;
  isVerified: boolean;
  iat: number;
  exp: number;
}
