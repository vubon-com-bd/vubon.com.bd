import { BaseEntity } from '../common/base.types';
import { Email } from '../common/email.types';
import { PhoneNumber } from '../common/phone.types';
import { USER_CONTACT } from '@vubon/shared-constants/src/user/user-contact.constants';

/**
 * User contact interface
 */
export interface UserContact extends BaseEntity {
  contactId: string;
  userId: string;
  type: keyof typeof USER_CONTACT;
  email?: Email;
  phone?: PhoneNumber;
  isPrimary: boolean;
  isVerified: boolean;
  metadata: Record<string, unknown>;
}
