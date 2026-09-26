import { AUTH_STATUS } from './auth-status.constants';
import { AUTH_TYPE } from './auth-type.constants';
import { AUTH_PROVIDER } from './auth-provider.constants';
import { AUTH_METHOD } from './auth-method.constants';
import { AUTH_PERMISSION } from './auth-permission.constants';
import { AUTH_ROLE } from './auth-role.constants';
import { AUTH_SESSION } from './auth-session.constants';
import { AUTH_TOKEN } from './auth-token.constants';
import { AUTH_VERIFICATION } from './auth-verification.constants';
import { AUTH_PASSWORD } from './auth-password.constants';
import { AUTH_MFA } from './auth-mfa.constants';
import { AUTH_LOGIN_ATTEMPT } from './auth-login-attempt.constants';
import { AUTH_DEVICE } from './auth-device.constants';
import { AUTH_SOCIAL } from './auth-social.constants';
import { AUTH_OAUTH } from './auth-oauth.constants';
import { AUTH_SSO } from './auth-sso.constants';

export const AUTH = {
  STATUS: AUTH_STATUS,
  TYPE: AUTH_TYPE,
  PROVIDER: AUTH_PROVIDER,
  METHOD: AUTH_METHOD,
  PERMISSION: AUTH_PERMISSION,
  ROLE: AUTH_ROLE,
  SESSION: AUTH_SESSION,
  TOKEN: AUTH_TOKEN,
  VERIFICATION: AUTH_VERIFICATION,
  PASSWORD: AUTH_PASSWORD,
  MFA: AUTH_MFA,
  LOGIN_ATTEMPT: AUTH_LOGIN_ATTEMPT,
  DEVICE: AUTH_DEVICE,
  SOCIAL: AUTH_SOCIAL,
  OAUTH: AUTH_OAUTH,
  SSO: AUTH_SSO,
} as const;

export type AuthType = typeof AUTH;
