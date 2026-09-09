import { BaseEntity } from '../common/base.types';
import { AUTH_SOCIAL } from '@vubon/shared-constants/src/auth/auth-social.constants';

/**
 * Auth social interface
 */
export interface AuthSocial extends BaseEntity {
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
