/**
 * Verification Configuration
 * ভেরিফিকেশন কনফিগারেশন
 */
export interface VerificationConfig {
  email: {
    enabled: boolean;
    expiration: number;
    resendCooldown: number;
    maxAttempts: number;
  };
  phone: {
    enabled: boolean;
    expiration: number;
    resendCooldown: number;
    maxAttempts: number;
  };
  document: {
    enabled: boolean;
    expiration: number;
    maxAttempts: number;
    allowedTypes: string[];
  };
  twoFactor: {
    enabled: boolean;
    expiration: number;
    maxAttempts: number;
  };
}

export const createVerificationConfig = (): VerificationConfig => ({
  email: {
    enabled: true,
    expiration: 24 * 60 * 60 * 1000, // 24 hours
    resendCooldown: 60 * 1000, // 1 minute
    maxAttempts: 3,
  },
  phone: {
    enabled: true,
    expiration: 5 * 60 * 1000, // 5 minutes
    resendCooldown: 60 * 1000, // 1 minute
    maxAttempts: 3,
  },
  document: {
    enabled: true,
    expiration: 7 * 24 * 60 * 60 * 1000, // 7 days
    maxAttempts: 3,
    allowedTypes: ['nid', 'passport', 'driving_license', 'birth_certificate'],
  },
  twoFactor: {
    enabled: true,
    expiration: 5 * 60 * 1000, // 5 minutes
    maxAttempts: 3,
  },
});
