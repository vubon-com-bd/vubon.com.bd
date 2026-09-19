import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';
import { AUTH_MFA } from '@vubon/shared-constants/auth';

export const TWO_FA_CONFIG = Object.freeze({
  enabledByDefault: getOptionalEnvBool('2FA_ENABLED_DEFAULT', AUTH_MFA.ENABLED_DEFAULT),
  defaultMethod: getOptionalEnv('2FA_DEFAULT_METHOD', 'totp'),
  challengeTtlSeconds: getOptionalEnvInt('2FA_CHALLENGE_TTL', 300),
  maxChallengeAttempts: getOptionalEnvInt('2FA_MAX_CHALLENGE_ATTEMPTS', 5),
} as const);
