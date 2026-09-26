import { ROLE as COMMON_ROLE } from '../../common/role.constants';

export const VENDOR_ROLE = {
  OWNER: 'vendor_owner',
  MANAGER: 'vendor_manager',
  STAFF: COMMON_ROLE.VENDOR_STAFF,
  ACCOUNTANT: 'vendor_accountant',
  INVENTORY_MANAGER: 'vendor_inventory_manager',
  ORDER_MANAGER: 'vendor_order_manager',
  CUSTOMER_SUPPORT: 'vendor_customer_support',
  MARKETING: 'vendor_marketing',
  VIEWER: 'vendor_viewer',
} as const;

export type VendorRoleType = (typeof VENDOR_ROLE)[keyof typeof VENDOR_ROLE];
