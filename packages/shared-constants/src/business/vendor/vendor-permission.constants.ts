import { PERMISSIONS as COMMON_PERMISSIONS } from '../../common/permissions.constants';
import { USER_PERMISSIONS } from '../../user/user-permission.constants';
import { ADMIN_PERMISSIONS } from '../../admin/admin-permission.constants';

export const VENDOR_PERMISSION = {
  ...COMMON_PERMISSIONS,
  ...USER_PERMISSIONS,
  ...ADMIN_PERMISSIONS,
  // Vendor Management
  VENDOR_VIEW: 'vendor:view',
  VENDOR_CREATE: 'vendor:create',
  VENDOR_UPDATE: 'vendor:update',
  VENDOR_DELETE: 'vendor:delete',
  VENDOR_MANAGE: 'vendor:manage',

  // Vendor Approval
  VENDOR_APPROVE: 'vendor:approve',
  VENDOR_REJECT: 'vendor:reject',
  VENDOR_SUSPEND: 'vendor:suspend',
  VENDOR_VERIFY: 'vendor:verify',

  // Vendor Products
  VENDOR_PRODUCT_VIEW: 'vendor_product:view',
  VENDOR_PRODUCT_CREATE: 'vendor_product:create',
  VENDOR_PRODUCT_UPDATE: 'vendor_product:update',
  VENDOR_PRODUCT_DELETE: 'vendor_product:delete',

  // Vendor Orders
  VENDOR_ORDER_VIEW: 'vendor_order:view',
  VENDOR_ORDER_PROCESS: 'vendor_order:process',
  VENDOR_ORDER_FULFILL: 'vendor_order:fulfill',

  // Vendor Financial
  VENDOR_PAYOUT_VIEW: 'vendor_payout:view',
  VENDOR_PAYOUT_REQUEST: 'vendor_payout:request',
  VENDOR_PAYOUT_APPROVE: 'vendor_payout:approve',
  VENDOR_COMMISSION_VIEW: 'vendor_commission:view',

  // Vendor Analytics
  VENDOR_ANALYTICS_VIEW: 'vendor_analytics:view',
  VENDOR_REPORT_VIEW: 'vendor_report:view',

  // Vendor Settings
  VENDOR_SETTINGS_VIEW: 'vendor_settings:view',
  VENDOR_SETTINGS_UPDATE: 'vendor_settings:update',
} as const;
