/**
 * Auth Biometric Validator
 * প্রমীকরণ বায়োমেট্রিক ভ্যালিডেটর
 */

export const AuthBiometricValidator = {
  /**
   * Validate biometric type
   * বায়োমেট্রিক টাইপ ভ্যালিডেট করা
   */
  validateType: (type: string): boolean => {
    const validTypes = ['fingerprint', 'face', 'iris', 'voice', 'webauthn'];
    return validTypes.includes(type);
  },

  /**
   * Validate biometric data
   * বায়োমেট্রিক ডেটা ভ্যালিডেট করা
   */
  validateData: (data: {
    type: string;
    credentialId: string;
    publicKey?: string;
    signature?: string;
  }): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!data.type || !AuthBiometricValidator.validateType(data.type)) {
      errors.push('Invalid biometric type');
    }

    if (!data.credentialId || data.credentialId.length < 10) {
      errors.push('Credential ID is required and must be at least 10 characters');
    }

    if (data.publicKey && data.publicKey.length < 10) {
      errors.push('Public key must be at least 10 characters');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Validate WebAuthn challenge
   * WebAuthn চ্যালেঞ্জ ভ্যালিডেট করা
   */
  validateChallenge: (challenge: string): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!challenge) {
      errors.push('Challenge is required');
      return { valid: false, errors };
    }

    if (challenge.length < 32) {
      errors.push('Challenge must be at least 32 characters');
    }

    try {
      // Check if base64 encoded
      atob(challenge);
    } catch (error) {
      errors.push(
        `Challenge must be base64 encoded: ${error instanceof Error ? error.message : 'Invalid encoding'}`
      );
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Validate biometric device
   * বায়োমেট্রিক ডিভাইস ভ্যালিডেট করা
   */
  validateDevice: (device: {
    deviceId: string;
    type: string;
    platform: string;
  }): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!device.deviceId) {
      errors.push('Device ID is required');
    }

    if (!device.type || !['mobile', 'tablet', 'laptop', 'desktop', 'other'].includes(device.type)) {
      errors.push('Invalid device type');
    }

    if (!device.platform) {
      errors.push('Platform is required');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Get supported biometric types
   * সাপোর্টেড বায়োমেট্রিক টাইপ পাওয়া
   */
  getSupportedTypes: (platform: string): string[] => {
    const supported: Record<string, string[]> = {
      ios: ['face', 'fingerprint'],
      android: ['fingerprint', 'face', 'iris'],
      windows: ['fingerprint', 'face', 'webauthn'],
      macos: ['fingerprint', 'face', 'webauthn'],
      linux: ['fingerprint', 'webauthn'],
      web: ['webauthn'],
    };

    return supported[platform.toLowerCase()] || ['webauthn'];
  },

  /**
   * Check if biometric is available on device
   * ডিভাইসে বায়োমেট্রিক উপলব্ধ কিনা চেক করা
   */
  isAvailable: (type: string, platform: string): boolean => {
    const supported = AuthBiometricValidator.getSupportedTypes(platform);
    return supported.includes(type);
  },
};
