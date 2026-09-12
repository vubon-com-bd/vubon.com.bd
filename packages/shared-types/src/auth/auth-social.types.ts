import { BaseEntity } from '../common/base.types';
import { AUTH_SOCIAL } from '@vubon/shared-constants/src/auth/auth-social.constants';

/**
 * Social provider value
 */
export type SocialProviderValue = (typeof AUTH_SOCIAL)[keyof typeof AUTH_SOCIAL];

/**
 * Auth social interface (internal — tokens encrypted)
 * ⚠️ NEVER return this directly to clients.
 */
export interface AuthSocial extends BaseEntity {
  socialId: string;
  userId: string;
  provider: SocialProviderValue;
  providerUserId: string;
  providerEmail: string;
  displayName: string;
  profileUrl?: string;
  avatarUrl?: string;
  /** @internal AES-256 encrypted */
  encryptedAccessToken: string;
  /** @internal AES-256 encrypted */
  encryptedRefreshToken?: string;
  expiresAt: Date;
  metadata: Record<string, unknown>;
}

/**
 * Public-safe social DTO
 */
export type AuthSocialPublic = Omit<
  AuthSocial,
  'encryptedAccessToken' | 'encryptedRefreshToken' | 'metadata'
>;
