/**
 * SAML SSO configuration
 * @module shared-config/auth/sso
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const SAML_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('SAML_ENABLED', false),
  entryPoint: getOptionalEnv('SAML_ENTRY_POINT', ''),
  issuer: getOptionalEnv('SAML_ISSUER', 'vubon'),
  cert: getOptionalEnv('SAML_CERT', ''),
  privateKey: getOptionalEnv('SAML_PRIVATE_KEY', ''),
  callbackUrl: getOptionalEnv('SAML_CALLBACK_URL', ''),
  logoutUrl: getOptionalEnv('SAML_LOGOUT_URL', ''),
  wantAssertionsSigned: getOptionalEnvBool('SAML_WANT_ASSERTIONS_SIGNED', true),
  wantAuthnResponseSigned: getOptionalEnvBool('SAML_WANT_RESPONSE_SIGNED', true),
  clockSkewMs: getOptionalEnvInt('SAML_CLOCK_SKEW_MS', 5000),
});
