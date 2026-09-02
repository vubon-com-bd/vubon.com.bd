/**
 * Auth MFA Validator
 * প্রমীকরণ এমএফএ ভ্যালিডেটর
 */

import { AUTH_MFA } from '@vubon/shared-constants';

export const AuthMFAValidator = {
  /**
   * Validate TOTP code
   * টিওটিপি কোড ভ্যালিডেট করা
   */
  validateTOTP: (code: string, secret: string): boolean => {
    // In real implementation, use speakeasy or otplib
    // This is a simplified version
    if (!code || code.length !== AUTH_MFA.DEFAULTS.TOTP_DIGITS) return false;
    if (!/^\d+$/.test(code)) return false;

    // For demonstration, we'll just check if code matches a generated code
    const expectedCode = AuthMFAValidator.generateTOTP(secret);
    return code === expectedCode;
  },

  /**
   * Generate TOTP code
   * টিওটিপি কোড তৈরি করা
   */
  generateTOTP: (secret: string): string => {
    // In real implementation, use speakeasy or otplib
    // This is a simplified version
    const timestamp = Math.floor(Date.now() / 1000 / AUTH_MFA.DEFAULTS.TOTP_INTERVAL);
    const data = secret + timestamp.toString();

    // Simple hash for demonstration
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      hash = (hash << 5) - hash + data.charCodeAt(i);
      hash = hash & hash;
    }

    const code = Math.abs(hash % Math.pow(10, AUTH_MFA.DEFAULTS.TOTP_DIGITS));
    return code.toString().padStart(AUTH_MFA.DEFAULTS.TOTP_DIGITS, '0');
  },

  /**
   * Validate backup code
   * ব্যাকআপ কোড ভ্যালিডেট করা
   */
  validateBackupCode: (
    code: string,
    backupCodes: string[]
  ): { valid: boolean; remainingCodes: string[] } => {
    if (!backupCodes || backupCodes.length === 0) {
      return { valid: false, remainingCodes: [] };
    }

    const index = backupCodes.indexOf(code);
    if (index === -1) {
      return { valid: false, remainingCodes: backupCodes };
    }

    const remainingCodes = [...backupCodes];
    remainingCodes.splice(index, 1);
    return { valid: true, remainingCodes };
  },

  /**
   * Validate MFA method
   * এমএফএ পদ্ধতি ভ্যালিডেট করা
   */
  validateMethod: (method: string): method is keyof typeof AUTH_MFA.METHODS => {
    const validMethods = Object.values(AUTH_MFA.METHODS);
    return validMethods.includes(method as (typeof validMethods)[number]);
  },

  /**
   * Validate MFA type
   * এমএফএ টাইপ ভ্যালিডেট করা
   */
  validateType: (type: string): type is keyof typeof AUTH_MFA.TYPES => {
    const validTypes = Object.values(AUTH_MFA.TYPES);
    return validTypes.includes(type as (typeof validTypes)[number]);
  },

  /**
   * Check if MFA is required
   * এমএফএ প্রয়োজন কিনা চেক করা
   */
  isRequired: (user: {
    mfaEnabled: boolean;
    mfaMethods?: string[];
  }): { required: boolean; availableMethods: string[] } => {
    if (!user.mfaEnabled) {
      return { required: false, availableMethods: [] };
    }

    const availableMethods = user.mfaMethods || [];
    return {
      required: availableMethods.length > 0,
      availableMethods,
    };
  },

  /**
   * Get recommended MFA methods
   * সুপারিশকৃত এমএফএ পদ্ধতি পাওয়া
   */
  getRecommendedMethods: (): string[] => {
    return [
      AUTH_MFA.METHODS.AUTHENTICATOR_APP,
      AUTH_MFA.METHODS.WEBAUTHN_PASSKEY,
      AUTH_MFA.METHODS.BACKUP_CODES,
    ];
  },

  /**
   * Check if MFA method is secure
   * এমএফএ পদ্ধতি নিরাপদ কিনা চেক করা
   */
  isSecure: (
    method: string
  ): method is
    'webauthn_passkey' | 'yubikey' | 'smart_card' | 'fingerprint' | 'face_id' | 'iris_scan' => {
    const secureMethods: string[] = [
      AUTH_MFA.METHODS.WEBAUTHN_PASSKEY,
      AUTH_MFA.METHODS.YUBIKEY,
      AUTH_MFA.METHODS.SMART_CARD,
      AUTH_MFA.METHODS.FINGERPRINT,
      AUTH_MFA.METHODS.FACE_ID,
      AUTH_MFA.METHODS.IRIS_SCAN,
    ];
    return secureMethods.includes(method);
  },
};
