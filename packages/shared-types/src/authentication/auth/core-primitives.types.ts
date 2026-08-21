import { authentication } from '@vubon/shared-constants';

/**
 * Authentication status type derived from shared constants
 * Example: authentication.AUTH_STATUS.ACTIVE → 'active'
 */
export type AuthStatus =
  (typeof authentication.AUTH_STATUS)[keyof typeof authentication.AUTH_STATUS];

/**
 * Authentication error codes type derived from shared constants
 */
export type AuthErrorCode =
  (typeof authentication.AUTH_ERROR_CODE)[keyof typeof authentication.AUTH_ERROR_CODE];

/**
 * Token type (access/refresh) derived from shared constants
 */
export type TokenType = (typeof authentication.TOKEN_TYPE)[keyof typeof authentication.TOKEN_TYPE];

/**
 * User role type
 * @note Currently using `string` because `ROLES` is not exported from `@vubon/shared-constants`.
 *       Update this when the user namespace becomes available.
 */
export type UserRole = string;

/**
 * Basic user information
 */
export interface AuthUser {
  id: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: AuthStatus;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Credentials for login (email or phone + password)
 */
export interface AuthCredentials {
  email?: string;
  phone?: string;
  password: string;
}

/**
 * Tokens returned after successful authentication
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // seconds
}

/**
 * Full authentication response payload
 */
export interface AuthResponse {
  user: AuthUser;
  tokens: AuthTokens;
}
