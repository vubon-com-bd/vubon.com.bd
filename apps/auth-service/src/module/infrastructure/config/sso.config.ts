import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const SSO_CONFIG = Object.freeze({
  defaultProvider: getOptionalEnv('SSO_PROVIDER', 'oidc'),
  metadataUrl: getOptionalEnv('SSO_METADATA_URL', ''),
  entityId: getOptionalEnv('SSO_ENTITY_ID', 'vubon-auth'),
  certificate: getOptionalEnv('SSO_CERTIFICATE', ''),
  sessionTtlSeconds: getOptionalEnvInt('SSO_SESSION_TTL', 3600),
} as const);
