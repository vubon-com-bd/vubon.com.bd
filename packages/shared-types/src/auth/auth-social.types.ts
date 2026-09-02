/**
 * Auth Social Types
 * প্রমাণীকরণ সোশ্যাল মিডিয়া সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common/base.entity';
import { AUTH_SOCIAL } from '@vubon/shared-constants';

export interface AuthSocial extends BaseEntity {
  userId: string;
  provider: AuthSocialProvider;
  providerId: string;
  email?: string;
  name?: string;
  avatar?: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
  metadata?: Record<string, unknown>;
  linkedAt: Date;
  unlinkedAt?: Date;
}

export interface AuthSocialCreateInput {
  userId: string;
  provider: AuthSocialProvider;
  providerId: string;
  email?: string;
  name?: string;
  avatar?: string;
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
  metadata?: Record<string, unknown>;
}

export interface AuthSocialProfile {
  id: string;
  email?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  locale?: string;
  gender?: string;
  birthday?: string;
  metadata?: Record<string, unknown>;
}

export type AuthSocialProvider = keyof typeof AUTH_SOCIAL.PROVIDERS;
