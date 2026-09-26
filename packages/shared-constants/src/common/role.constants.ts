export const ROLE = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  VENDOR: 'vendor',
  VENDOR_MANAGER: 'vendor_manager',
  VENDOR_STAFF: 'vendor_staff',
  CUSTOMER: 'customer',
  GUEST: 'guest',
  SUPPORT_AGENT: 'support_agent',
  SUPPORT_MANAGER: 'support_manager',
  LOGISTICS_MANAGER: 'logistics_manager',
  LOGISTICS_AGENT: 'logistics_agent',
  DELIVERY_DRIVER: 'delivery_driver',
  WAREHOUSE_MANAGER: 'warehouse_manager',
} as const;

export type RoleType = (typeof ROLE)[keyof typeof ROLE];
