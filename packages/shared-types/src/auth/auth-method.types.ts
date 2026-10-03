/**
 * Auth Method Value Types
 * @module shared-types/auth
 *
 * Values আসে shared-constants/auth/auth-method.constants থেকে।
 */

import type { AUTH_METHOD } from '@vubon/shared-constants/auth';

export type AuthMethodValue = (typeof AUTH_METHOD)[keyof typeof AUTH_METHOD];

export interface AuthMethodMetadata {
  readonly value: AuthMethodValue;
  readonly label: string;
  readonly type: 'password' | 'otp' | 'link' | 'social' | 'federated';
  readonly requiresVerification: boolean;
}
