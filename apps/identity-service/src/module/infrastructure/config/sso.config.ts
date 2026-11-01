/**
 * SSO Configuration
 * @module identity-service/infrastructure/config
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';
import { AUTH_SSO_SESSION } from '@vubon/shared-constants/auth';

export const AUTH_SSO_CONFIG = Object.freeze({
  sessionExpirySeconds: getOptionalEnvInt(
    'SSO_SESSION_EXPIRY',
    AUTH_SSO_SESSION.EXPIRY_SECONDS,
  ),
  refreshWindowSeconds: getOptionalEnvInt(
    'SSO_REFRESH_WINDOW',
    AUTH_SSO_SESSION.REFRESH_WINDOW_SECONDS,
  ),
  singleLogoutEnabled: getOptionalEnvBool(
    'SSO_SINGLE_LOGOUT',
    AUTH_SSO_SESSION.SINGLE_LOGOUT,
  ),
  clockSkewSeconds: getOptionalEnvInt('SSO_CLOCK_SKEW', 300),
});
