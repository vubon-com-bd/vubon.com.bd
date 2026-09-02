/**
 * Auth Token Types
 * প্রমাণীকরণ টোকেন সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common/base.entity';
import { AUTH } from '@vubon/shared-constants';

export interface AuthToken extends BaseEntity {
  userId: string;
  token: string;
  type: AuthTokenType;
  expiresAt: Date;
  revokedAt?: Date;
  revokedReason?: string;
  metadata?: Record<string, unknown>;
}

export interface AuthAccessToken {
  token: string;
  expiresIn: number;
  type: 'Bearer';
}

export interface AuthRefreshToken extends AuthToken {
  type: 'refresh';
  rotationCount: number;
  parentTokenId?: string;
}

export interface AuthTokenPayload {
  sub: string;
  type: AuthTokenType;
  sessionId?: string;
  deviceId?: string;
  role?: string;
  permissions?: string[];
  iat: number;
  exp: number;
}

export interface AuthTokenCreateInput {
  userId: string;
  type: AuthTokenType;
  expiresIn?: number;
  metadata?: Record<string, unknown>;
}

export type AuthTokenType = (typeof AUTH.TOKEN)[keyof typeof AUTH.TOKEN];
