/**
 * Device fingerprinting configuration
 * @module shared-config/auth/device
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const FINGERPRINT_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('FINGERPRINT_ENABLED', true),
  components: Object.freeze([
    'userAgent',
    'language',
    'timezone',
    'screen',
    'platform',
    'hardwareConcurrency',
  ] as const),
  hashAlgorithm: 'sha256',
  hashLength: getOptionalEnvInt('FINGERPRINT_HASH_LENGTH', 32),
  salt: '',
  toleranceThreshold: getOptionalEnvInt('FINGERPRINT_TOLERANCE', 80), // 0-100
});
