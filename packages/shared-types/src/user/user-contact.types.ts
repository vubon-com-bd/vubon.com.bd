import { BaseEntity } from '../common/base.types';
import { USER_CONTACT } from '@vubon/shared-constants/src/user/user-contact.constants';

/**
 * User contact type value
 */
export type UserContactType = (typeof USER_CONTACT)[keyof typeof USER_CONTACT];

/**
 * User contact interface
 * Note: email/phone stored as plain strings for serialization.
 * Use `Email` / `PhoneNumber` value objects in domain logic.
 */
export interface UserContact extends BaseEntity {
  contactId: string;
  userId: string;
  type: UserContactType;
  email?: string;
  phone?: string;
  isPrimary: boolean;
  isVerified: boolean;
  metadata: Record<string, unknown>;
}
