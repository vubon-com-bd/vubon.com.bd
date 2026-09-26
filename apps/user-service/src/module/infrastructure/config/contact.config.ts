import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const CONTACT_CONFIG = Object.freeze({
  maxContactsPerUser: getOptionalEnvInt('CONTACT_MAX_PER_USER', 5),
  verificationCodeLength: 6,
  verificationTtlSeconds: 300,
  allowedTypes: Object.freeze(['email', 'phone', 'whatsapp', 'telegram'] as const),
} as const);
