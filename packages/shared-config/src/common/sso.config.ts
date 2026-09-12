import { getOptionalEnv } from './env/env.validation';

export const ssoConfig = {
  enabled: true,
  providers: {
    google: {
      enabled: true,
      clientId: getOptionalEnv('GOOGLE_CLIENT_ID', ''),
      clientSecret: getOptionalEnv('GOOGLE_CLIENT_SECRET', ''),
      redirectUri: getOptionalEnv('GOOGLE_REDIRECT_URI', '/auth/google/callback'),
      scope: ['email', 'profile'],
    },
    facebook: {
      enabled: true,
      clientId: getOptionalEnv('FACEBOOK_CLIENT_ID', ''),
      clientSecret: getOptionalEnv('FACEBOOK_CLIENT_SECRET', ''),
      redirectUri: getOptionalEnv('FACEBOOK_REDIRECT_URI', '/auth/facebook/callback'),
      scope: ['email', 'public_profile'],
    },
    github: {
      enabled: true,
      clientId: getOptionalEnv('GITHUB_CLIENT_ID', ''),
      clientSecret: getOptionalEnv('GITHUB_CLIENT_SECRET', ''),
      redirectUri: getOptionalEnv('GITHUB_REDIRECT_URI', '/auth/github/callback'),
      scope: ['user:email'],
    },
  },
} as const;
