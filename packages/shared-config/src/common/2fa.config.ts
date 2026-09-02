/**
 * 2FA Configuration
 * টু-ফ্যাক্টর অথেনটিকেশন কনফিগারেশন
 */
export interface TwoFAConfig {
  enabled: boolean;
  methods: {
    authenticator: boolean;
    sms: boolean;
    email: boolean;
  };
  authenticator: {
    issuer: string;
    algorithm: string;
    digits: number;
    period: number;
    window: number;
  };
  backupCodes: {
    count: number;
    length: number;
  };
  recovery: {
    enabled: boolean;
    expiration: number;
    maxAttempts: number;
  };
}

export const createTwoFAConfig = (): TwoFAConfig => ({
  enabled: true,
  methods: {
    authenticator: true,
    sms: true,
    email: true,
  },
  authenticator: {
    issuer: 'Vubon Platform',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    window: 1,
  },
  backupCodes: {
    count: 10,
    length: 8,
  },
  recovery: {
    enabled: true,
    expiration: 7 * 24 * 60 * 60 * 1000, // 7 days
    maxAttempts: 3,
  },
});
