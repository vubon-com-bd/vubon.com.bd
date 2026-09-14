/**
 * User Contact Types
 * @module shared-types/user
 *
 * Values আসে shared-constants/user/user-contact.constants থেকে।
 */

import type { USER_CONTACT_TYPE } from '@vubon/shared-constants/user';
import type { UserId, Email, Phone, Url } from '../common/primitives';

export type ContactTypeValue = (typeof USER_CONTACT_TYPE)[keyof typeof USER_CONTACT_TYPE];

export interface UserContact {
  readonly id: string;
  readonly userId: UserId;
  readonly type: ContactTypeValue;
  readonly value: Email | Phone | Url | string;
  readonly label?: string;
  readonly isPrimary: boolean;
  readonly isVerified: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface UserContactInput {
  readonly type: ContactTypeValue;
  readonly value: string;
  readonly label?: string;
  readonly isPrimary?: boolean;
}

export interface UserContactPublic {
  readonly id: string;
  readonly type: ContactTypeValue;
  readonly value: string;
  readonly label?: string;
  readonly isPrimary: boolean;
  readonly isVerified: boolean;
}
