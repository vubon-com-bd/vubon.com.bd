/**
 * User Type Value Types
 * @module shared-types/user
 *
 * Values আসে shared-constants/user/user-type.constants থেকে।
 */

import type { USER_TYPE } from '@vubon/shared-constants/user';

export type UserTypeValue = (typeof USER_TYPE)[keyof typeof USER_TYPE];

export interface UserTypeMetadata {
  readonly value: UserTypeValue;
  readonly label: string;
  readonly requiresKyc: boolean;
  readonly requiresVerification: boolean;
}
