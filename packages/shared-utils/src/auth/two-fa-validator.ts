/**
 * Auth 2FA Validator
 * প্রমীকরণ 2FA ভ্যালিডেটর
 */

export const Auth2FAValidator = {
  /**
   * Validate 2FA code
   * 2FA কোড ভ্যালিডেট করা
   */
  validateCode: (code: string): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!code) {
      errors.push('Verification code is required');
      return { valid: false, errors };
    }

    if (!/^\d{6}$/.test(code)) {
      errors.push('Code must be exactly 6 digits');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Validate 2FA method
   * 2FA পদ্ধতি ভ্যালিডেট করা
   */
  validateMethod: (method: string): boolean => {
    const validMethods = ['totp', 'sms', 'email', 'backup_codes'];
    return validMethods.includes(method);
  },

  /**
   * Validate 2FA backup code
   * 2FA ব্যাকআপ কোড ভ্যালিডেট করা
   */
  validateBackupCode: (code: string): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!code) {
      errors.push('Backup code is required');
      return { valid: false, errors };
    }

    if (code.length < 6) {
      errors.push('Backup code is too short');
    }

    if (!/^[A-Z0-9-]+$/.test(code)) {
      errors.push('Invalid backup code format');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Get available 2FA methods
   * উপলব্ধ 2FA পদ্ধতি পাওয়া
   */
  getAvailableMethods: (): string[] => {
    return ['totp', 'sms', 'email', 'backup_codes'];
  },

  /**
   * Get recommended 2FA methods
   * সুপারিশকৃত 2FA পদ্ধতি পাওয়া
   */
  getRecommendedMethods: (): string[] => {
    return ['totp', 'backup_codes'];
  },

  /**
   * Check if 2FA is required
   * 2FA প্রয়োজন কিনা চেক করা
   */
  isRequired: (user: {
    twoFAEnabled: boolean;
    twoFAMethods?: string[];
  }): { required: boolean; availableMethods: string[] } => {
    if (!user.twoFAEnabled) {
      return { required: false, availableMethods: [] };
    }

    const availableMethods = user.twoFAMethods || [];
    return {
      required: availableMethods.length > 0,
      availableMethods,
    };
  },
};
