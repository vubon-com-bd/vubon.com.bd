/**
 * Auth Settings Configuration
 * প্রমীকরণ সেটিংস কনফিগারেশন
 */

export interface AuthSettingsConfig {
  security: {
    requireMFA: boolean;
    require2FA: boolean;
    requireBiometric: boolean;
    sessionTimeout: number;
    rememberMeDuration: number;
  };
  password: {
    minLength: number;
    maxLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumber: boolean;
    requireSpecialChar: boolean;
    expiryDays: number;
    historyCount: number;
  };
  login: {
    maxAttempts: number;
    lockoutDuration: number;
    suspiciousActivityAlert: boolean;
  };
  notification: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}

export const createAuthSettingsConfig = (): AuthSettingsConfig => ({
  security: {
    requireMFA: false,
    require2FA: false,
    requireBiometric: false,
    sessionTimeout: 3600,
    rememberMeDuration: 604800,
  },
  password: {
    minLength: 8,
    maxLength: 32,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecialChar: true,
    expiryDays: 90,
    historyCount: 5,
  },
  login: {
    maxAttempts: 5,
    lockoutDuration: 900,
    suspiciousActivityAlert: true,
  },
  notification: {
    email: true,
    sms: true,
    push: true,
  },
});
