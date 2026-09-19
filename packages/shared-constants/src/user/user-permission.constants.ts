import { PERMISSION as COMMON_PERMISSION } from '../common/permission.constants';

// Note: Cannot import from vendor (layer isolation) — hardcode + comment
export const USER_PERMISSION = {
  SELF_VIEW: 'user:self:view',
  SELF_UPDATE: 'user:self:update',
  SELF_DELETE: 'user:self:delete',
  PROFILE_VIEW: 'user:profile:view',
  PROFILE_UPDATE: 'user:profile:update',
  SETTINGS_VIEW: 'user:settings:view',
  SETTINGS_UPDATE: 'user:settings:update',
  ADDRESS_VIEW: 'user:address:view',
  ADDRESS_MANAGE: 'user:address:manage',
  CONTACT_VIEW: 'user:contact:view',
  CONTACT_MANAGE: 'user:contact:manage',

  USER_VIEW: COMMON_PERMISSION.USER_VIEW,
  USER_CREATE: COMMON_PERMISSION.USER_CREATE,
  USER_UPDATE: COMMON_PERMISSION.USER_UPDATE,
  USER_DELETE: COMMON_PERMISSION.USER_DELETE,
} as const;

export type UserPermissionType = (typeof USER_PERMISSION)[keyof typeof USER_PERMISSION];
