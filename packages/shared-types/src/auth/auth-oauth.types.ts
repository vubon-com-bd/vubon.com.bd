import { BaseEntity } from '../common/base.types';
import { AUTH_OAUTH } from '@vubon/shared-constants/src/auth/auth-oauth.constants';

/**
 * Auth OAuth interface
 */
export interface AuthOAuth extends BaseEntity {
  oauthId: string;
  userId: string;
  provider: keyof typeof AUTH_OAUTH;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope: string[];
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  metadata: Record<string, unknown>;
}
