/**
 * Contact Validator
 * ইউজার কন্টাক্ট ভ্যালিডেটর
 */

import { REGEX } from '@vubon/shared-constants';
import { UserContact, UserContactCreateInput, UserContactUpdateInput } from '@vubon/shared-types';
import { USER_CONTACT } from '@vubon/shared-constants';

type ContactType = (typeof USER_CONTACT.TYPES)[keyof typeof USER_CONTACT.TYPES];
type ContactVisibility = (typeof USER_CONTACT.VISIBILITY)[keyof typeof USER_CONTACT.VISIBILITY];

export const ContactValidator = {
  /**
   * Validate contact data
   * কন্টাক্ট ডেটা ভ্যালিডেট করা
   */
  validate: (data: Partial<UserContact>): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (data.value && data.value.length < 1) {
      errors.push('Contact value is required');
    }

    if (data.type && !Object.values(USER_CONTACT.TYPES).includes(data.type as ContactType)) {
      errors.push('Invalid contact type');
    }

    if (data.type === 'email' && data.value && !REGEX.EMAIL.test(data.value)) {
      errors.push('Invalid email format');
    }

    if (data.type === 'phone' && data.value && !REGEX.PHONE.test(data.value)) {
      errors.push('Invalid phone number');
    }

    if (
      data.visibility &&
      !Object.values(USER_CONTACT.VISIBILITY).includes(data.visibility as ContactVisibility)
    ) {
      errors.push('Invalid visibility');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Validate contact creation
   * কন্টাক্ট তৈরি ভ্যালিডেট করা
   */
  validateCreate: (data: UserContactCreateInput): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!data.userId) {
      errors.push('User ID is required');
    }

    if (!data.value || data.value.length < 1) {
      errors.push('Contact value is required');
    }

    if (!data.type || !Object.values(USER_CONTACT.TYPES).includes(data.type as ContactType)) {
      errors.push('Valid contact type is required');
    }

    if (data.type === 'email' && !REGEX.EMAIL.test(data.value)) {
      errors.push('Invalid email format');
    }

    if (data.type === 'phone' && !REGEX.PHONE.test(data.value)) {
      errors.push('Invalid phone number');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Validate contact update
   * কন্টাক্ট আপডেট ভ্যালিডেট করা
   */
  validateUpdate: (data: UserContactUpdateInput): { valid: boolean; errors: string[] } => {
    return ContactValidator.validate(data);
  },

  /**
   * Check if contact is email
   * কন্টাক্ট ইমেইল কিনা চেক করা
   */
  isEmail: (contact: UserContact): boolean => {
    return contact.type === 'email';
  },

  /**
   * Check if contact is phone
   * কন্টাক্ট ফোন কিনা চেক করা
   */
  isPhone: (contact: UserContact): boolean => {
    return contact.type === 'phone' || contact.type === 'mobile';
  },

  /**
   * Mask contact value
   * কন্টাক্ট ভ্যালু মাস্ক করা
   */
  mask: (contact: UserContact): string => {
    if (contact.type === 'email') {
      const [username, domain] = contact.value.split('@');
      if (!username || !domain) return contact.value;
      const masked =
        username.length <= 3
          ? username[0] + '***'
          : username.slice(0, 2) + '***' + username.slice(-2);
      return `${masked}@${domain}`;
    }

    if (contact.type === 'phone' || contact.type === 'mobile') {
      const phone = contact.value.replace(/\D/g, '');
      if (phone.length <= 4) return contact.value;
      const visible = phone.slice(-4);
      return `****${visible}`;
    }

    return contact.value;
  },

  /**
   * Get contact type label
   * কন্টাক্ট টাইপ লেবেল পাওয়া
   */
  getTypeLabel: (type: string): string => {
    const labels: Record<string, string> = {
      email: 'Email',
      phone: 'Phone',
      mobile: 'Mobile',
      whatsapp: 'WhatsApp',
      viber: 'Viber',
      telegram: 'Telegram',
      messenger: 'Messenger',
      social: 'Social',
      website: 'Website',
      other: 'Other',
    };
    return labels[type] || type;
  },

  /**
   * Get visibility label
   * ভিজিবিলিটি লেবেল পাওয়া
   */
  getVisibilityLabel: (visibility: string): string => {
    const labels: Record<string, string> = {
      public: 'Public',
      private: 'Private',
      contacts: 'Contacts',
      friends: 'Friends',
    };
    return labels[visibility] || visibility;
  },
};
