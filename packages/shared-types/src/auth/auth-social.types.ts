import { AUTH_SOCIAL } from '@vubon/shared-constants';

export interface AuthSocial {
  socialId: string;
  userId: string;
  provider: keyof typeof AUTH_SOCIAL;
  providerUserId: string;
  providerEmail: string;
  displayName: string;
  profileUrl?: string;
  avatarUrl?: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt: Date;
  metadata: Record<string, unknown>;
}
