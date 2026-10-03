/**
 * SSO_CONFIG — Enterprise SSO configuration
 * @module auth-service/infrastructure/config
 */
import { getOptionalEnv, getOptionalEnvBool } from '@vubon/shared-config/common';

export const SSO_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('SSO_ENABLED', false),
  saml: {
    entryPoint: getOptionalEnv('SAML_ENTRY_POINT', '') as string,
    issuer: getOptionalEnv('SAML_ISSUER', 'vubon-auth') as string,
    cert: getOptionalEnv('SAML_CERT', '') as string,
  },
  oidc: {
    discoveryUrl: getOptionalEnv('OIDC_DISCOVERY_URL', '') as string,
    clientId: getOptionalEnv('OIDC_CLIENT_ID', '') as string,
    clientSecret: getOptionalEnv('OIDC_CLIENT_SECRET', '') as string,
  },
} as const);
