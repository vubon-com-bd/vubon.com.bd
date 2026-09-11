import { BaseEntity } from '../common/base.types';
import { AUTH_OAUTH } from '@vubon/shared-constants/src/auth/auth-oauth.constants';

/**
 * OAuth grant type value
 */
export type OAuthGrantType = (typeof AUTH_OAUTH)[keyof typeof AUTH_OAUTH];

/**
 * Auth OAuth interface (public-safe)
 * Note: clientSecret intentionally omitted — keep it server-side only.
 */
export interface AuthOAuth extends BaseEntity {
  oauthId: string;
  userId: string;
  provider: OAuthGrantType;
  clientId: string;
  redirectUri: string;
  scope: string[];
  encryptedAccessToken: string;
  encryptedRefreshToken?: string;
  expiresAt: Date;
  metadata: Record<string, unknown>;
}

/**
 * @internal — server-side only. Never expose.
 */
export interface AuthOAuthInternal extends AuthOAuth {
  encryptedClientSecret: string;
}
