// Note: Cannot import from admin (layer isolation) — hardcode + comment
export const VENDOR_PERMISSION = {
  PROFILE_VIEW: 'vendor:profile:view',
  PROFILE_UPDATE: 'vendor:profile:update',

  PRODUCT_VIEW: 'vendor:product:view',
  PRODUCT_CREATE: 'vendor:product:create',
  PRODUCT_UPDATE: 'vendor:product:update',
  PRODUCT_DELETE: 'vendor:product:delete',

  ORDER_VIEW: 'vendor:order:view',
  ORDER_UPDATE: 'vendor:order:update',
  ORDER_FULFILL: 'vendor:order:fulfill',
  ORDER_CANCEL: 'vendor:order:cancel',

  PAYOUT_VIEW: 'vendor:payout:view',
  PAYOUT_REQUEST: 'vendor:payout:request',

  TEAM_VIEW: 'vendor:team:view',
  TEAM_MANAGE: 'vendor:team:manage',
  TEAM_INVITE: 'vendor:team:invite',

  REPORT_VIEW: 'vendor:report:view',
  REPORT_EXPORT: 'vendor:report:export',

  SETTINGS_VIEW: 'vendor:settings:view',
  SETTINGS_MANAGE: 'vendor:settings:manage',

  ADMIN_VIEW: 'admin:view',
  ADMIN_MANAGE: 'admin:manage',
} as const;

export type VendorPermissionType = (typeof VENDOR_PERMISSION)[keyof typeof VENDOR_PERMISSION];
