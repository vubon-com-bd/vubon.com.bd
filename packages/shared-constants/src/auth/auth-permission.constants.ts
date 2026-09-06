/**
 * Auth Permission Constants (EXTENDS common/permissions)
 * @module shared-constants/auth/auth-permission.constants
 */

import { PERMISSIONS } from '../common/permissions.constants';

export const AUTH_PERMISSIONS = {
  // Base permissions from common
  ...PERMISSIONS,

  // Auth specific permissions
  AUTH_LOGIN: 'auth:login',
  AUTH_LOGOUT: 'auth:logout',
  AUTH_REGISTER: 'auth:register',
  AUTH_VERIFY: 'auth:verify',
  AUTH_RESET_PASSWORD: 'auth:reset_password',
  AUTH_CHANGE_PASSWORD: 'auth:change_password',
  AUTH_FORGOT_PASSWORD: 'auth:forgot_password',
  AUTH_REFRESH_TOKEN: 'auth:refresh_token',
  AUTH_REVOKE_TOKEN: 'auth:revoke_token',
  AUTH_MFA_SETUP: 'auth:mfa_setup',
  AUTH_MFA_VERIFY: 'auth:mfa_verify',
  AUTH_MFA_DISABLE: 'auth:mfa_disable',
  AUTH_SESSION_VIEW: 'auth:session_view',
  AUTH_SESSION_REVOKE: 'auth:session_revoke',
  AUTH_SESSION_TERMINATE: 'auth:session_terminate',
  AUTH_DEVICE_VIEW: 'auth:device_view',
  AUTH_DEVICE_REMOVE: 'auth:device_remove',
  AUTH_DEVICE_BLOCK: 'auth:device_block',
  AUTH_SOCIAL_LINK: 'auth:social_link',
  AUTH_SOCIAL_UNLINK: 'auth:social_unlink',
  AUTH_OAUTH_VIEW: 'auth:oauth_view',
  AUTH_OAUTH_REVOKE: 'auth:oauth_revoke',
  AUTH_SSO_VIEW: 'auth:sso_view',
  AUTH_SSO_CONFIGURE: 'auth:sso_configure',
  AUTH_SSO_DISABLE: 'auth:sso_disable',
  AUTH_API_KEY_VIEW: 'auth:api_key_view',
  AUTH_API_KEY_CREATE: 'auth:api_key_create',
  AUTH_API_KEY_REVOKE: 'auth:api_key_revoke',
  AUTH_ADMIN_VIEW: 'auth:admin_view',
  AUTH_ADMIN_MANAGE: 'auth:admin_manage',
  AUTH_ROLE_VIEW: 'auth:role_view',
  AUTH_ROLE_ASSIGN: 'auth:role_assign',
  AUTH_ROLE_REVOKE: 'auth:role_revoke',
  AUTH_PERMISSION_VIEW: 'auth:permission_view',
  AUTH_PERMISSION_GRANT: 'auth:permission_grant',
  AUTH_PERMISSION_REVOKE: 'auth:permission_revoke',
} as const;

export type AuthPermission = (typeof AUTH_PERMISSIONS)[keyof typeof AUTH_PERMISSIONS];

export const AUTH_PERMISSION_GROUPS = {
  AUTH_BASIC: [
    AUTH_PERMISSIONS.AUTH_LOGIN,
    AUTH_PERMISSIONS.AUTH_LOGOUT,
    AUTH_PERMISSIONS.AUTH_REGISTER,
    AUTH_PERMISSIONS.AUTH_VERIFY,
  ] as const,

  AUTH_PASSWORD: [
    AUTH_PERMISSIONS.AUTH_RESET_PASSWORD,
    AUTH_PERMISSIONS.AUTH_CHANGE_PASSWORD,
    AUTH_PERMISSIONS.AUTH_FORGOT_PASSWORD,
  ] as const,

  AUTH_TOKEN: [AUTH_PERMISSIONS.AUTH_REFRESH_TOKEN, AUTH_PERMISSIONS.AUTH_REVOKE_TOKEN] as const,

  AUTH_MFA: [
    AUTH_PERMISSIONS.AUTH_MFA_SETUP,
    AUTH_PERMISSIONS.AUTH_MFA_VERIFY,
    AUTH_PERMISSIONS.AUTH_MFA_DISABLE,
  ] as const,

  AUTH_SESSION: [
    AUTH_PERMISSIONS.AUTH_SESSION_VIEW,
    AUTH_PERMISSIONS.AUTH_SESSION_REVOKE,
    AUTH_PERMISSIONS.AUTH_SESSION_TERMINATE,
  ] as const,

  AUTH_DEVICE: [
    AUTH_PERMISSIONS.AUTH_DEVICE_VIEW,
    AUTH_PERMISSIONS.AUTH_DEVICE_REMOVE,
    AUTH_PERMISSIONS.AUTH_DEVICE_BLOCK,
  ] as const,

  AUTH_SOCIAL: [AUTH_PERMISSIONS.AUTH_SOCIAL_LINK, AUTH_PERMISSIONS.AUTH_SOCIAL_UNLINK] as const,

  AUTH_OAUTH: [AUTH_PERMISSIONS.AUTH_OAUTH_VIEW, AUTH_PERMISSIONS.AUTH_OAUTH_REVOKE] as const,

  AUTH_SSO: [
    AUTH_PERMISSIONS.AUTH_SSO_VIEW,
    AUTH_PERMISSIONS.AUTH_SSO_CONFIGURE,
    AUTH_PERMISSIONS.AUTH_SSO_DISABLE,
  ] as const,

  AUTH_API_KEY: [
    AUTH_PERMISSIONS.AUTH_API_KEY_VIEW,
    AUTH_PERMISSIONS.AUTH_API_KEY_CREATE,
    AUTH_PERMISSIONS.AUTH_API_KEY_REVOKE,
  ] as const,

  AUTH_ADMIN: [
    AUTH_PERMISSIONS.AUTH_ADMIN_VIEW,
    AUTH_PERMISSIONS.AUTH_ADMIN_MANAGE,
    AUTH_PERMISSIONS.AUTH_ROLE_VIEW,
    AUTH_PERMISSIONS.AUTH_ROLE_ASSIGN,
    AUTH_PERMISSIONS.AUTH_ROLE_REVOKE,
    AUTH_PERMISSIONS.AUTH_PERMISSION_VIEW,
    AUTH_PERMISSIONS.AUTH_PERMISSION_GRANT,
    AUTH_PERMISSIONS.AUTH_PERMISSION_REVOKE,
  ] as const,
} as const;
