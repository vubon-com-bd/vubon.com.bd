/**
 * Auth Provider Value Types
 * @module shared-types/auth
 *
 * Values আসে shared-constants/auth/auth-provider.constants থেকে।
 */

import type { AUTH_PROVIDER } from '@vubon/shared-constants/auth';

export type AuthProviderValue = (typeof AUTH_PROVIDER)[keyof typeof AUTH_PROVIDER];

export interface AuthProviderMetadata {
  readonly value: AuthProviderValue;
  readonly label: string;
  readonly isSocial: boolean;
  readonly isOAuth: boolean;
  readonly requiresEmail: boolean;
}
