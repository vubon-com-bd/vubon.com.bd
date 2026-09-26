/**
 * OAUTH_CONFIG — OAuth 2.0 provider credentials
 * @module auth-service/infrastructure/config
 */
import { getOptionalEnv } from '@vubon/shared-config/common';

export const OAUTH_CONFIG = Object.freeze({
  google: {
    clientId: getOptionalEnv('OAUTH_GOOGLE_CLIENT_ID', '') as string,
    clientSecret: getOptionalEnv('OAUTH_GOOGLE_CLIENT_SECRET', '') as string,
    redirectUri: getOptionalEnv('OAUTH_GOOGLE_REDIRECT_URI', '') as string,
  },
  facebook: {
    clientId: getOptionalEnv('OAUTH_FACEBOOK_CLIENT_ID', '') as string,
    clientSecret: getOptionalEnv('OAUTH_FACEBOOK_CLIENT_SECRET', '') as string,
    redirectUri: getOptionalEnv('OAUTH_FACEBOOK_REDIRECT_URI', '') as string,
  },
  github: {
    clientId: getOptionalEnv('OAUTH_GITHUB_CLIENT_ID', '') as string,
    clientSecret: getOptionalEnv('OAUTH_GITHUB_CLIENT_SECRET', '') as string,
    redirectUri: getOptionalEnv('OAUTH_GITHUB_REDIRECT_URI', '') as string,
  },
} as const);
