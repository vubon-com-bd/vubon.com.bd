/**
 * User Status Value Types
 * @module shared-types/user
 *
 * Values আসে shared-constants/user/user-status.constants থেকে।
 */

import type { USER_STATUS } from '@vubon/shared-constants/user';

export type UserStatusValue = (typeof USER_STATUS)[keyof typeof USER_STATUS];

export interface UserStatusMetadata {
  readonly value: UserStatusValue;
  readonly label: string;
  readonly isActive: boolean;
  readonly isFinal: boolean;
}
