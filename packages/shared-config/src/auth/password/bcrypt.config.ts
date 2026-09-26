/**
 * Bcrypt password hashing configuration
 * @module shared-config/auth/password
 *
 * Values আসে shared-constants/security থেকে।
 */
import { SECURITY } from '@vubon/shared-constants/security';
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const BCRYPT_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('BCRYPT_ENABLED', true),
  rounds: SECURITY.BCRYPT_ROUNDS,
  minRounds: SECURITY.BCRYPT_MIN_ROUNDS,
  maxRounds: SECURITY.BCRYPT_MAX_ROUNDS,
  saltBytes: getOptionalEnvInt('BCRYPT_SALT_BYTES', 16),
  truncateLength: 72,
  version: '2b',
});
