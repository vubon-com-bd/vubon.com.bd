/**
 * SOCIAL_CONFIG — Social login configuration
 * @module auth-service/infrastructure/config
 */
import { getOptionalEnv, getOptionalEnvBool } from '@vubon/shared-config/common';
import { AUTH_PROVIDER } from '@vubon/shared-constants/auth';

export const SOCIAL_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('SOCIAL_LOGIN_ENABLED', true),
  allowedProviders: [
    AUTH_PROVIDER.GOOGLE,
    AUTH_PROVIDER.FACEBOOK,
    AUTH_PROVIDER.APPLE,
    AUTH_PROVIDER.GITHUB,
  ],
  defaultRedirectUri: getOptionalEnv('SOCIAL_DEFAULT_REDIRECT', '') as string,
  allowLinkExisting: getOptionalEnvBool('SOCIAL_ALLOW_LINK_EXISTING', true),
  allowAutoRegister: getOptionalEnvBool('SOCIAL_ALLOW_AUTO_REGISTER', true),
} as const);
