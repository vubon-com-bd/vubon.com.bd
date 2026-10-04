/**
 * Auth Status Value Types
 * @module shared-types/auth
 *
 * Values আসে shared-constants/auth/auth-status.constants থেকে।
 */

import type { AUTH_STATUS } from '@vubon/shared-constants/auth';

export type AuthStatusValue = (typeof AUTH_STATUS)[keyof typeof AUTH_STATUS];

export interface AuthStatusMetadata {
  readonly value: AuthStatusValue;
  readonly label: string;
  readonly isActive: boolean;
  readonly isFinal: boolean;
}
