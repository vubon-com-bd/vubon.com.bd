/**
 * Auth OAuth Constants
 * প্রমাণীকরণ OAuth সম্পর্কিত কনস্ট্যান্টস
 */

export const AUTH_OAUTH = {
  // OAuth providers
  PROVIDERS: {
    GOOGLE: 'google',
    FACEBOOK: 'facebook',
    GITHUB: 'github',
    LINKEDIN: 'linkedin',
    TWITTER: 'twitter',
    MICROSOFT: 'microsoft',
    APPLE: 'apple',
    SPOTIFY: 'spotify',
    DISCORD: 'discord',
    SLACK: 'slack',
  },

  // OAuth grant types
  GRANT_TYPES: {
    AUTHORIZATION_CODE: 'authorization_code',
    REFRESH_TOKEN: 'refresh_token',
    CLIENT_CREDENTIALS: 'client_credentials',
    PASSWORD: 'password',
    IMPLICIT: 'implicit',
    DEVICE_CODE: 'device_code',
  },

  // OAuth response types
  RESPONSE_TYPES: {
    CODE: 'code',
    TOKEN: 'token',
    ID_TOKEN: 'id_token',
    CODE_TOKEN: 'code+token',
    CODE_ID_TOKEN: 'code+id_token',
    CODE_TOKEN_ID_TOKEN: 'code+token+id_token',
  },

  // OAuth scopes
  SCOPES: {
    OPENID: 'openid',
    PROFILE: 'profile',
    EMAIL: 'email',
    ADDRESS: 'address',
    PHONE: 'phone',
    OFFLINE_ACCESS: 'offline_access',
  },

  // Default values
  DEFAULTS: {
    ACCESS_TOKEN_EXPIRY: 3600, // 1 hour
    REFRESH_TOKEN_EXPIRY: 2592000, // 30 days
    CODE_EXPIRY: 300, // 5 minutes
    STATE_EXPIRY: 600, // 10 minutes
    MAX_ATTEMPTS: 3,
  },
} as const;

export type AuthOAuthProvider = (typeof AUTH_OAUTH.PROVIDERS)[keyof typeof AUTH_OAUTH.PROVIDERS];
export type AuthOAuthGrantType =
  (typeof AUTH_OAUTH.GRANT_TYPES)[keyof typeof AUTH_OAUTH.GRANT_TYPES];
export type AuthOAuthResponseType =
  (typeof AUTH_OAUTH.RESPONSE_TYPES)[keyof typeof AUTH_OAUTH.RESPONSE_TYPES];
