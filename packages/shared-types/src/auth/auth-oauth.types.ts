import { AUTH_OAUTH } from '@vubon/shared-constants';

export interface AuthOAuth {
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
