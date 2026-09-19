/**
 * Auth OAuth Types
 * @module shared-types/auth
 *
 * Values আসে shared-constants/auth/auth-oauth.constants থেকে।
 */

import type { AUTH_OAUTH } from '@vubon/shared-constants/auth';
import type { UserId, Url } from '../common/primitives';

export type OAuthGrantType =
  | typeof AUTH_OAUTH.GRANT_TYPE_AUTHORIZATION_CODE
  | typeof AUTH_OAUTH.GRANT_TYPE_CLIENT_CREDENTIALS
  | typeof AUTH_OAUTH.GRANT_TYPE_REFRESH_TOKEN
  | typeof AUTH_OAUTH.GRANT_TYPE_PASSWORD;

export type OAuthResponseType =
  typeof AUTH_OAUTH.RESPONSE_TYPE_CODE | typeof AUTH_OAUTH.RESPONSE_TYPE_TOKEN;

export type PkceMethod = typeof AUTH_OAUTH.PKCE_METHOD_S256 | typeof AUTH_OAUTH.PKCE_METHOD_PLAIN;

export interface OAuthClient {
  readonly clientId: string;
  readonly clientName: string;
  readonly redirectUris: readonly Url[];
  readonly scopes: readonly string[];
  readonly grantTypes: readonly OAuthGrantType[];
  readonly isPublic: boolean;
  readonly isActive: boolean;
  readonly createdAt: string;
}

export interface OAuthTokenRequest {
  readonly grantType: OAuthGrantType;
  readonly clientId: string;
  readonly clientSecret?: string;
  readonly code?: string;
  readonly redirectUri?: string;
  readonly refreshToken?: string;
  readonly scope?: readonly string[];
  readonly codeVerifier?: string;
}

export interface OAuthTokenResponse {
  readonly accessToken: string;
  readonly tokenType: 'Bearer';
  readonly expiresIn: number;
  readonly refreshToken?: string;
  readonly scope?: string;
  readonly idToken?: string;
}

export interface OAuthAuthorizeRequest {
  readonly responseType: OAuthResponseType;
  readonly clientId: string;
  readonly redirectUri: Url;
  readonly scope: readonly string[];
  readonly state: string;
  readonly codeChallenge?: string;
  readonly codeChallengeMethod?: PkceMethod;
}

export interface OAuthUserInfo {
  readonly sub: UserId | string;
  readonly email?: string;
  readonly emailVerified?: boolean;
  readonly name?: string;
  readonly picture?: string;
  readonly locale?: string;
}
