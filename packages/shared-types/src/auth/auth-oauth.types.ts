/**
 * Auth OAuth Types
 * প্রমাণীকরণ OAuth সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common/base.entity';
import { AUTH_OAUTH } from '@vubon/shared-constants';

export interface AuthOAuth extends BaseEntity {
  userId: string;
  provider: AuthOAuthProvider;
  providerId: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
  scope?: string[];
  state?: string;
  metadata?: Record<string, unknown>;
  linkedAt: Date;
  revokedAt?: Date;
}

export interface AuthOAuthCreateInput {
  userId: string;
  provider: AuthOAuthProvider;
  providerId: string;
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
  scope?: string[];
  state?: string;
  metadata?: Record<string, unknown>;
}

export interface AuthOAuthTokenResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  tokenType: string;
  scope?: string;
}

export interface AuthOAuthAuthorizationRequest {
  clientId: string;
  redirectUri: string;
  responseType: AuthOAuthResponseType;
  scope?: string[];
  state?: string;
}

export type AuthOAuthProvider = (typeof AUTH_OAUTH.PROVIDERS)[keyof typeof AUTH_OAUTH.PROVIDERS];
export type AuthOAuthGrantType =
  (typeof AUTH_OAUTH.GRANT_TYPES)[keyof typeof AUTH_OAUTH.GRANT_TYPES];
export type AuthOAuthResponseType =
  (typeof AUTH_OAUTH.RESPONSE_TYPES)[keyof typeof AUTH_OAUTH.RESPONSE_TYPES];
