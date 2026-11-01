/**
 * Auth Type Value Types
 * @module shared-types/auth
 *
 * Values আসে shared-constants/auth/auth-type.constants থেকে।
 */

import type { AUTH_TYPE } from '@vubon/shared-constants/auth';

export type AuthTypeValue = (typeof AUTH_TYPE)[keyof typeof AUTH_TYPE];

export interface AuthTypeMetadata {
  readonly value: AuthTypeValue;
  readonly label: string;
  readonly requiresPassword: boolean;
  readonly requiresMfa: boolean;
}
