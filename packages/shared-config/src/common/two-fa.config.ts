import { AUTH_MFA } from '@vubon/shared-constants/src/auth/auth-mfa.constants';

export const twoFaConfig = {
  enabled: true,
  required: false,
  methods: [AUTH_MFA.TOTP, AUTH_MFA.SMS, AUTH_MFA.EMAIL],
  totp: {
    issuer: 'Vubon',
    digits: 6,
    period: 30,
    algorithm: 'SHA1',
  },
  sms: { enabled: true, codeLength: 6, expiryMinutes: 5, maxAttempts: 3 },
  email: { enabled: true, codeLength: 6, expiryMinutes: 5, maxAttempts: 3 },
  backupCodes: { count: 10, length: 8 },
} as const;
