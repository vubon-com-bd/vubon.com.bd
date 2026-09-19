import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const OAUTH_CONFIG = Object.freeze({
  google: Object.freeze({
    clientId: getOptionalEnv('OAUTH_GOOGLE_CLIENT_ID', ''),
    clientSecret: getOptionalEnv('OAUTH_GOOGLE_CLIENT_SECRET', ''),
    redirectUri: getOptionalEnv('OAUTH_GOOGLE_REDIRECT_URI', ''),
  }),
  facebook: Object.freeze({
    clientId: getOptionalEnv('OAUTH_FACEBOOK_CLIENT_ID', ''),
    clientSecret: getOptionalEnv('OAUTH_FACEBOOK_CLIENT_SECRET', ''),
    redirectUri: getOptionalEnv('OAUTH_FACEBOOK_REDIRECT_URI', ''),
  }),
  github: Object.freeze({
    clientId: getOptionalEnv('OAUTH_GITHUB_CLIENT_ID', ''),
    clientSecret: getOptionalEnv('OAUTH_GITHUB_CLIENT_SECRET', ''),
    redirectUri: getOptionalEnv('OAUTH_GITHUB_REDIRECT_URI', ''),
  }),
  stateTtlSeconds: getOptionalEnvInt('OAUTH_STATE_TTL', 600),
} as const);
