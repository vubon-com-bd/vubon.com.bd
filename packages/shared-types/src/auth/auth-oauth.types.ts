import { BaseEntity } from '../common/base.types';
import { AUTH_OAUTH } from '@vubon/shared-constants/src/auth/auth-oauth.constants';
import { AUTH_PROVIDER } from '@vubon/shared-constants/src/auth/auth-provider.constants';

/**
 * OAuth grant type — from AUTH_OAUTH
 */
export type OAuthGrantType = (typeof AUTH_OAUTH)[keyof typeof AUTH_OAUTH];

/**
 * OAuth provider — from AUTH_PROVIDER
 */
export type OAuthProvider = (typeof AUTH_PROVIDER)[keyof typeof AUTH_PROVIDER];

/**
 * Auth OAuth interface (public-safe)
 * Note: clientSecret intentionally omitted — keep it server-side only.
 */
export interface AuthOAuth extends BaseEntity {
  oauthId: string;
  userId: string;
  provider: OAuthProvider;
  grantType: OAuthGrantType;
  clientId: string;
  redirectUri: string;
  scope: string[];
  /** @internal AES-256 encrypted */
  encryptedAccessToken: string;
  /** @internal AES-256 encrypted */
  encryptedRefreshToken?: string;
  expiresAt: Date;
  metadata: Record<string, unknown>;
}

/**
 * Public-safe OAuth DTO
 */
export type AuthOAuthPublic = Omit<
  AuthOAuth,
  'encryptedAccessToken' | 'encryptedRefreshToken' | 'metadata'
>;

/**
 * @internal — server-side only. Never expose.
 */
export interface AuthOAuthInternal extends AuthOAuth {
  encryptedClientSecret: string;
}
