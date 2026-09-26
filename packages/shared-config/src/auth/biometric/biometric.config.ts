/**
 * Biometric authentication configuration (WebAuthn)
 * @module shared-config/auth/biometric
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const BIOMETRIC_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('BIOMETRIC_ENABLED', false),
  rpName: getOptionalEnv('BIOMETRIC_RP_NAME', 'Vubon'),
  rpId: getOptionalEnv('BIOMETRIC_RP_ID', 'localhost'),
  origin: getOptionalEnv('BIOMETRIC_ORIGIN', 'http://localhost:3000'),
  timeoutMs: getOptionalEnvInt('BIOMETRIC_TIMEOUT_MS', 60000),
  attestation: getOptionalEnv('BIOMETRIC_ATTESTATION', 'none'), // none | indirect | direct | enterprise
  userVerification: getOptionalEnv('BIOMETRIC_USER_VERIFICATION', 'preferred'), // required | preferred | discouraged
  residentKey: getOptionalEnv('BIOMETRIC_RESIDENT_KEY', 'preferred'), // required | preferred | discouraged
  allowMultipleDevices: getOptionalEnvBool('BIOMETRIC_MULTI_DEVICE', true),
  maxCredentialsPerUser: getOptionalEnvInt('BIOMETRIC_MAX_CREDENTIALS', 10),
});
