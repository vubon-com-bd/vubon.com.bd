/**
 * Auth Social Types
 * @module shared-types/auth
 *
 * Values আসে shared-constants/auth/auth-social.constants থেকে।
 */

import type { AUTH_SOCIAL } from '@vubon/shared-constants/auth';
import type { UserId, Email, Url } from '../common/primitives';

export type SocialProviderValue = (typeof AUTH_SOCIAL)[keyof typeof AUTH_SOCIAL];

export interface SocialAccount {
  readonly id: string;
  readonly userId: UserId;
  readonly provider: SocialProviderValue;
  readonly providerUserId: string;
  readonly email?: Email;
  readonly name?: string;
  readonly avatarUrl?: Url;
  readonly connectedAt: string;
  readonly lastUsedAt?: string;
  readonly isActive: boolean;
}

export interface SocialLoginInput {
  readonly provider: SocialProviderValue;
  readonly code: string;
  readonly redirectUri: string;
  readonly state?: string;
}

export interface SocialLoginResult {
  readonly success: boolean;
  readonly userId?: UserId;
  readonly isNewUser: boolean;
  readonly isEmailVerified: boolean;
  readonly accessToken?: string;
  readonly refreshToken?: string;
  readonly error?: string;
}

export interface SocialAccountLinkInput {
  readonly userId: UserId;
  readonly provider: SocialProviderValue;
  readonly code: string;
  readonly redirectUri: string;
}

export interface SocialAccountUnlinkInput {
  readonly userId: UserId;
  readonly provider: SocialProviderValue;
}
