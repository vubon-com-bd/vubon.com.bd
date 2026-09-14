import { PERMISSION as COMMON_PERMISSION } from '../common/permission.constants';

// Note: Cannot import from user (layer isolation) — hardcode + comment
export const AUTH_PERMISSION = {
  LOGIN: 'auth:login',
  LOGOUT: 'auth:logout',
  REGISTER: 'auth:register',
  REFRESH_TOKEN: 'auth:refresh_token',
  VERIFY_EMAIL: 'auth:verify_email',
  VERIFY_PHONE: 'auth:verify_phone',
  RESET_PASSWORD: 'auth:reset_password',
  CHANGE_PASSWORD: 'auth:change_password',
  ENABLE_MFA: 'auth:enable_mfa',
  DISABLE_MFA: 'auth:disable_mfa',
  MANAGE_SESSIONS: 'auth:manage_sessions',
  REVOKE_SESSIONS: 'auth:revoke_sessions',

  USER_VIEW: COMMON_PERMISSION.USER_VIEW,
  USER_CREATE: COMMON_PERMISSION.USER_CREATE,
} as const;

export type AuthPermissionType = (typeof AUTH_PERMISSION)[keyof typeof AUTH_PERMISSION];
