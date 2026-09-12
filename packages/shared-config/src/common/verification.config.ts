import { SECURITY } from '@vubon/shared-constants/src/common/security.constants';

export const verificationConfig = {
  email: {
    enabled: true,
    codeLength: 6,
    expiryMinutes: 15,
    maxAttempts: SECURITY.RATE_LIMIT.LOGIN_MAX_ATTEMPTS,
  },
  phone: {
    enabled: true,
    codeLength: 6,
    expiryMinutes: 10,
    maxAttempts: SECURITY.RATE_LIMIT.LOGIN_MAX_ATTEMPTS,
  },
  document: {
    enabled: true,
    maxSize: 5 * 1024 * 1024,
    allowedTypes: ['pdf', 'jpg', 'jpeg', 'png'],
  },
} as const;
