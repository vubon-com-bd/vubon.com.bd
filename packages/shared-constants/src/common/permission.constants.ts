export const PERMISSION = {
  ALL: '*',
  USER_VIEW: 'user:view',
  USER_CREATE: 'user:create',
  USER_UPDATE: 'user:update',
  USER_DELETE: 'user:delete',

  PRODUCT_VIEW: 'product:view',
  PRODUCT_CREATE: 'product:create',
  PRODUCT_UPDATE: 'product:update',
  PRODUCT_DELETE: 'product:delete',

  ORDER_VIEW: 'order:view',
  ORDER_CREATE: 'order:create',
  ORDER_UPDATE: 'order:update',
  ORDER_CANCEL: 'order:cancel',
  ORDER_REFUND: 'order:refund',

  CART_VIEW: 'cart:view',
  CART_MANAGE: 'cart:manage',

  PAYMENT_VIEW: 'payment:view',
  PAYMENT_PROCESS: 'payment:process',
  PAYMENT_REFUND: 'payment:refund',

  VENDOR_VIEW: 'vendor:view',
  VENDOR_MANAGE: 'vendor:manage',
  VENDOR_APPROVE: 'vendor:approve',

  ADMIN_VIEW: 'admin:view',
  ADMIN_MANAGE: 'admin:manage',

  SUPPORT_VIEW: 'support:view',
  SUPPORT_MANAGE: 'support:manage',

  LOGISTICS_VIEW: 'logistics:view',
  LOGISTICS_MANAGE: 'logistics:manage',

  MARKETING_VIEW: 'marketing:view',
  MARKETING_MANAGE: 'marketing:manage',

  REPORT_VIEW: 'report:view',
  REPORT_EXPORT: 'report:export',

  SETTINGS_VIEW: 'settings:view',
  SETTINGS_MANAGE: 'settings:manage',
} as const;

export type PermissionType = (typeof PERMISSION)[keyof typeof PERMISSION];
