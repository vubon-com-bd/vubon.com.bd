import { REGEX } from '@vubon/shared-constants';

/**
 * Email Validator
 * ইমেইল ভ্যালিডেটর
 */
export const emailValidator = {
  /**
   * Validate email format
   * ইমেইল ফরম্যাট ভ্যালিডেট করা
   */
  isValid: (email: string): boolean => {
    return REGEX.EMAIL.test(email);
  },

  /**
   * Validate email domain
   * ইমেইল ডোমেইন ভ্যালিডেট করা
   */
  isValidDomain: (email: string, allowedDomains?: string[]): boolean => {
    if (!emailValidator.isValid(email)) return false;

    const domain = email.split('@')[1];
    if (!domain) return false;

    if (allowedDomains && allowedDomains.length > 0) {
      return allowedDomains.includes(domain.toLowerCase());
    }

    return true;
  },

  /**
   * Check if email is disposable
   * ইমেইল ডিসপোজেবল কিনা চেক করা
   */
  isDisposable: (email: string): boolean => {
    const disposableDomains = [
      'tempmail.com',
      'throwaway.com',
      'mailinator.com',
      'guerrillamail.com',
      '10minutemail.com',
      'yopmail.com',
      'temp-mail.org',
      'maildrop.cc',
      'spamgourmet.com',
      'trashmail.com',
      'fakeinbox.com',
      'tempinbox.com',
    ];

    const domain = email.split('@')[1]?.toLowerCase() || '';
    return disposableDomains.some((d) => domain.includes(d));
  },

  /**
   * Check if email is from free provider
   * ইমেইল ফ্রি প্রোভাইডার থেকে কিনা চেক করা
   */
  isFreeProvider: (email: string): boolean => {
    const freeProviders = [
      'gmail.com',
      'yahoo.com',
      'hotmail.com',
      'outlook.com',
      'aol.com',
      'mail.com',
      'protonmail.com',
      'icloud.com',
      'zoho.com',
      'yandex.com',
      'gmx.com',
      'tutanota.com',
    ];

    const domain = email.split('@')[1]?.toLowerCase() || '';
    return freeProviders.includes(domain);
  },

  /**
   * Extract domain from email
   * ইমেইল থেকে ডোমেইন বের করা
   */
  extractDomain: (email: string): string | null => {
    if (!emailValidator.isValid(email)) return null;
    return email.split('@')[1] || null;
  },

  /**
   * Extract username from email
   * ইমেইল থেকে ইউজারনেম বের করা
   */
  extractUsername: (email: string): string | null => {
    if (!emailValidator.isValid(email)) return null;
    return email.split('@')[0] || null;
  },

  /**
   * Normalize email
   * ইমেইল নরমালাইজ করা
   */
  normalize: (email: string): string => {
    const [username, domain] = email.toLowerCase().trim().split('@');
    if (!username || !domain) return email;

    // Remove dots from Gmail usernames
    if (domain === 'gmail.com') {
      return `${username.replace(/\./g, '')}@${domain}`;
    }

    return `${username}@${domain}`;
  },

  /**
   * Mask email
   * ইমেইল মাস্ক করা
   */
  mask: (email: string): string => {
    if (!emailValidator.isValid(email)) return email;

    const [username, domain] = email.split('@');
    if (!username || !domain) return email;

    const maskedUsername =
      username.length <= 3
        ? username[0] + '***'
        : username.slice(0, 2) + '***' + username.slice(-2);

    return `${maskedUsername}@${domain}`;
  },
};
