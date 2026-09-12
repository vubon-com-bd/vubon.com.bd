import { PERMISSIONS as COMMON_PERMISSIONS } from '../common/permissions.constants';

export const USER_PERMISSIONS = {
  ...COMMON_PERMISSIONS,
  VIEW_PROFILE: 'user:view_profile',
  EDIT_PROFILE: 'user:edit_profile',
} as const;
