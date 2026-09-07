import { Email } from '../common/email.types';
import { PhoneNumber } from '../common/phone.types';
import { USER_CONTACT } from '@vubon/shared-constants';

export interface UserContact {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isDeleted: boolean;
  contactId: string;
  userId: string;
  type: keyof typeof USER_CONTACT;
  email?: Email;
  phone?: PhoneNumber;
  isPrimary: boolean;
  isVerified: boolean;
  metadata: Record<string, unknown>;
}
