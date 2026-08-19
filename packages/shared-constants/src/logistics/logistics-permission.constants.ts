/**
 * লজিস্টিকস সিস্টেমের পারমিশন সম্পর্কিত কনস্ট্যান্টসমূহ
 */

/**
 * লজিস্টিকস পারমিশন
 */
export const LOGISTICS_PERMISSIONS = {
  // শিপমেন্ট পারমিশন
  CREATE_SHIPMENT: 'create_shipment',
  VIEW_SHIPMENT: 'view_shipment',
  UPDATE_SHIPMENT: 'update_shipment',
  DELETE_SHIPMENT: 'delete_shipment',
  CANCEL_SHIPMENT: 'cancel_shipment',
  TRACK_SHIPMENT: 'track_shipment',

  // কুরিয়ার পারমিশন
  MANAGE_COURIER: 'manage_courier',
  VIEW_COURIER: 'view_courier',
  ASSIGN_COURIER: 'assign_courier',
  UPDATE_COURIER_STATUS: 'update_courier_status',

  // গুদাম পারমিশন
  MANAGE_WAREHOUSE: 'manage_warehouse',
  VIEW_WAREHOUSE: 'view_warehouse',
  UPDATE_WAREHOUSE: 'update_warehouse',
  MANAGE_INVENTORY: 'manage_inventory',

  // ড্রাইভার পারমিশন
  MANAGE_DRIVERS: 'manage_drivers',
  VIEW_DRIVERS: 'view_drivers',
  ASSIGN_DRIVER: 'assign_driver',
  UPDATE_DRIVER_STATUS: 'update_driver_status',

  // রুট পারমিশন
  MANAGE_ROUTES: 'manage_routes',
  VIEW_ROUTES: 'view_routes',
  OPTIMIZE_ROUTES: 'optimize_routes',

  // অ্যানালিটিক্স পারমিশন
  VIEW_ANALYTICS: 'view_analytics',
  VIEW_DASHBOARD: 'view_dashboard',
  EXPORT_DATA: 'export_data',

  // রিপোর্ট পারমিশন
  GENERATE_REPORT: 'generate_report',
  VIEW_REPORT: 'view_report',
  DELETE_REPORT: 'delete_report',
  SCHEDULE_REPORT: 'schedule_report',

  // ডেলিভারি পারমিশন
  MANAGE_DELIVERY: 'manage_delivery',
  VIEW_DELIVERY: 'view_delivery',
  UPDATE_DELIVERY_STATUS: 'update_delivery_status',

  // বীমা পারমিশন
  MANAGE_INSURANCE: 'manage_insurance',
  VIEW_INSURANCE: 'view_insurance',
  PROCESS_CLAIM: 'process_claim',

  // পেমেন্ট পারমিশন
  MANAGE_PAYMENT: 'manage_payment',
  VIEW_PAYMENT: 'view_payment',
  PROCESS_REFUND: 'process_refund',

  // অ্যাডমিন পারমিশন
  ADMIN_ACCESS: 'admin_access',
  MANAGE_USERS: 'manage_users',
  MANAGE_SETTINGS: 'manage_settings',
  VIEW_LOGS: 'view_logs',
  MANAGE_SYSTEM: 'manage_system',
} as const;

/**
 * লজিস্টিকস পারমিশন টাইপ
 */
export type LogisticsPermission =
  (typeof LOGISTICS_PERMISSIONS)[keyof typeof LOGISTICS_PERMISSIONS];

/**
 * লজিস্টিকস পারমিশনের বিবরণ
 */
export const LOGISTICS_PERMISSION_DESCRIPTIONS: Record<LogisticsPermission, string> = {
  // শিপমেন্ট পারমিশন
  [LOGISTICS_PERMISSIONS.CREATE_SHIPMENT]: 'শিপমেন্ট তৈরি করার অনুমতি',
  [LOGISTICS_PERMISSIONS.VIEW_SHIPMENT]: 'শিপমেন্ট দেখার অনুমতি',
  [LOGISTICS_PERMISSIONS.UPDATE_SHIPMENT]: 'শিপমেন্ট আপডেট করার অনুমতি',
  [LOGISTICS_PERMISSIONS.DELETE_SHIPMENT]: 'শিপমেন্ট ডিলিট করার অনুমতি',
  [LOGISTICS_PERMISSIONS.CANCEL_SHIPMENT]: 'শিপমেন্ট বাতিল করার অনুমতি',
  [LOGISTICS_PERMISSIONS.TRACK_SHIPMENT]: 'শিপমেন্ট ট্র্যাক করার অনুমতি',

  // কুরিয়ার পারমিশন
  [LOGISTICS_PERMISSIONS.MANAGE_COURIER]: 'কুরিয়ার ম্যানেজ করার অনুমতি',
  [LOGISTICS_PERMISSIONS.VIEW_COURIER]: 'কুরিয়ার দেখার অনুমতি',
  [LOGISTICS_PERMISSIONS.ASSIGN_COURIER]: 'কুরিয়ার নিয়োগ করার অনুমতি',
  [LOGISTICS_PERMISSIONS.UPDATE_COURIER_STATUS]: 'কুরিয়ার স্ট্যাটাস আপডেট করার অনুমতি',

  // গুদাম পারমিশন
  [LOGISTICS_PERMISSIONS.MANAGE_WAREHOUSE]: 'গুদাম ম্যানেজ করার অনুমতি',
  [LOGISTICS_PERMISSIONS.VIEW_WAREHOUSE]: 'গুদাম দেখার অনুমতি',
  [LOGISTICS_PERMISSIONS.UPDATE_WAREHOUSE]: 'গুদাম আপডেট করার অনুমতি',
  [LOGISTICS_PERMISSIONS.MANAGE_INVENTORY]: 'ইনভেন্টরি ম্যানেজ করার অনুমতি',

  // ড্রাইভার পারমিশন
  [LOGISTICS_PERMISSIONS.MANAGE_DRIVERS]: 'ড্রাইভার ম্যানেজ করার অনুমতি',
  [LOGISTICS_PERMISSIONS.VIEW_DRIVERS]: 'ড্রাইভার দেখার অনুমতি',
  [LOGISTICS_PERMISSIONS.ASSIGN_DRIVER]: 'ড্রাইভার নিয়োগ করার অনুমতি',
  [LOGISTICS_PERMISSIONS.UPDATE_DRIVER_STATUS]: 'ড্রাইভার স্ট্যাটাস আপডেট করার অনুমতি',

  // রুট পারমিশন
  [LOGISTICS_PERMISSIONS.MANAGE_ROUTES]: 'রুট ম্যানেজ করার অনুমতি',
  [LOGISTICS_PERMISSIONS.VIEW_ROUTES]: 'রুট দেখার অনুমতি',
  [LOGISTICS_PERMISSIONS.OPTIMIZE_ROUTES]: 'রুট অপ্টিমাইজ করার অনুমতি',

  // অ্যানালিটিক্স পারমিশন
  [LOGISTICS_PERMISSIONS.VIEW_ANALYTICS]: 'অ্যানালিটিক্স দেখার অনুমতি',
  [LOGISTICS_PERMISSIONS.VIEW_DASHBOARD]: 'ড্যাশবোর্ড দেখার অনুমতি',
  [LOGISTICS_PERMISSIONS.EXPORT_DATA]: 'ডেটা এক্সপোর্ট করার অনুমতি',

  // রিপোর্ট পারমিশন
  [LOGISTICS_PERMISSIONS.GENERATE_REPORT]: 'রিপোর্ট জেনারেট করার অনুমতি',
  [LOGISTICS_PERMISSIONS.VIEW_REPORT]: 'রিপোর্ট দেখার অনুমতি',
  [LOGISTICS_PERMISSIONS.DELETE_REPORT]: 'রিপোর্ট ডিলিট করার অনুমতি',
  [LOGISTICS_PERMISSIONS.SCHEDULE_REPORT]: 'রিপোর্ট শিডিউল করার অনুমতি',

  // ডেলিভারি পারমিশন
  [LOGISTICS_PERMISSIONS.MANAGE_DELIVERY]: 'ডেলিভারি ম্যানেজ করার অনুমতি',
  [LOGISTICS_PERMISSIONS.VIEW_DELIVERY]: 'ডেলিভারি দেখার অনুমতি',
  [LOGISTICS_PERMISSIONS.UPDATE_DELIVERY_STATUS]: 'ডেলিভারি স্ট্যাটাস আপডেট করার অনুমতি',

  // বীমা পারমিশন
  [LOGISTICS_PERMISSIONS.MANAGE_INSURANCE]: 'বীমা ম্যানেজ করার অনুমতি',
  [LOGISTICS_PERMISSIONS.VIEW_INSURANCE]: 'বীমা দেখার অনুমতি',
  [LOGISTICS_PERMISSIONS.PROCESS_CLAIM]: 'বীমা দাবি প্রক্রিয়াকরণের অনুমতি',

  // পেমেন্ট পারমিশন
  [LOGISTICS_PERMISSIONS.MANAGE_PAYMENT]: 'পেমেন্ট ম্যানেজ করার অনুমতি',
  [LOGISTICS_PERMISSIONS.VIEW_PAYMENT]: 'পেমেন্ট দেখার অনুমতি',
  [LOGISTICS_PERMISSIONS.PROCESS_REFUND]: 'রিফান্ড প্রক্রিয়াকরণের অনুমতি',

  // অ্যাডমিন পারমিশন
  [LOGISTICS_PERMISSIONS.ADMIN_ACCESS]: 'অ্যাডমিন অ্যাক্সেস - সমস্ত অনুমতি',
  [LOGISTICS_PERMISSIONS.MANAGE_USERS]: 'ইউজার ম্যানেজ করার অনুমতি',
  [LOGISTICS_PERMISSIONS.MANAGE_SETTINGS]: 'সেটিংস ম্যানেজ করার অনুমতি',
  [LOGISTICS_PERMISSIONS.VIEW_LOGS]: 'লগ দেখার অনুমতি',
  [LOGISTICS_PERMISSIONS.MANAGE_SYSTEM]: 'সিস্টেম ম্যানেজ করার অনুমতি',
};

/**
 * লজিস্টিকস পারমিশন গ্রুপ
 */
export const LOGISTICS_PERMISSION_GROUPS = {
  SHIPMENT: [
    LOGISTICS_PERMISSIONS.CREATE_SHIPMENT,
    LOGISTICS_PERMISSIONS.VIEW_SHIPMENT,
    LOGISTICS_PERMISSIONS.UPDATE_SHIPMENT,
    LOGISTICS_PERMISSIONS.DELETE_SHIPMENT,
    LOGISTICS_PERMISSIONS.CANCEL_SHIPMENT,
    LOGISTICS_PERMISSIONS.TRACK_SHIPMENT,
  ] as const,
  COURIER: [
    LOGISTICS_PERMISSIONS.MANAGE_COURIER,
    LOGISTICS_PERMISSIONS.VIEW_COURIER,
    LOGISTICS_PERMISSIONS.ASSIGN_COURIER,
    LOGISTICS_PERMISSIONS.UPDATE_COURIER_STATUS,
  ] as const,
  WAREHOUSE: [
    LOGISTICS_PERMISSIONS.MANAGE_WAREHOUSE,
    LOGISTICS_PERMISSIONS.VIEW_WAREHOUSE,
    LOGISTICS_PERMISSIONS.UPDATE_WAREHOUSE,
    LOGISTICS_PERMISSIONS.MANAGE_INVENTORY,
  ] as const,
  DRIVER: [
    LOGISTICS_PERMISSIONS.MANAGE_DRIVERS,
    LOGISTICS_PERMISSIONS.VIEW_DRIVERS,
    LOGISTICS_PERMISSIONS.ASSIGN_DRIVER,
    LOGISTICS_PERMISSIONS.UPDATE_DRIVER_STATUS,
  ] as const,
  ROUTE: [
    LOGISTICS_PERMISSIONS.MANAGE_ROUTES,
    LOGISTICS_PERMISSIONS.VIEW_ROUTES,
    LOGISTICS_PERMISSIONS.OPTIMIZE_ROUTES,
  ] as const,
  ANALYTICS: [
    LOGISTICS_PERMISSIONS.VIEW_ANALYTICS,
    LOGISTICS_PERMISSIONS.VIEW_DASHBOARD,
    LOGISTICS_PERMISSIONS.EXPORT_DATA,
  ] as const,
  REPORT: [
    LOGISTICS_PERMISSIONS.GENERATE_REPORT,
    LOGISTICS_PERMISSIONS.VIEW_REPORT,
    LOGISTICS_PERMISSIONS.DELETE_REPORT,
    LOGISTICS_PERMISSIONS.SCHEDULE_REPORT,
  ] as const,
  DELIVERY: [
    LOGISTICS_PERMISSIONS.MANAGE_DELIVERY,
    LOGISTICS_PERMISSIONS.VIEW_DELIVERY,
    LOGISTICS_PERMISSIONS.UPDATE_DELIVERY_STATUS,
  ] as const,
  INSURANCE: [
    LOGISTICS_PERMISSIONS.MANAGE_INSURANCE,
    LOGISTICS_PERMISSIONS.VIEW_INSURANCE,
    LOGISTICS_PERMISSIONS.PROCESS_CLAIM,
  ] as const,
  PAYMENT: [
    LOGISTICS_PERMISSIONS.MANAGE_PAYMENT,
    LOGISTICS_PERMISSIONS.VIEW_PAYMENT,
    LOGISTICS_PERMISSIONS.PROCESS_REFUND,
  ] as const,
  ADMIN: [
    LOGISTICS_PERMISSIONS.ADMIN_ACCESS,
    LOGISTICS_PERMISSIONS.MANAGE_USERS,
    LOGISTICS_PERMISSIONS.MANAGE_SETTINGS,
    LOGISTICS_PERMISSIONS.VIEW_LOGS,
    LOGISTICS_PERMISSIONS.MANAGE_SYSTEM,
  ] as const,
} as const;

/**
 * লজিস্টিকস পারমিশন গ্রুপ টাইপ
 */
export type LogisticsPermissionGroup = typeof LOGISTICS_PERMISSION_GROUPS;

/**
 * লজিস্টিকস পারমিশন রোল
 */
export const LOGISTICS_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  SUPERVISOR: 'supervisor',
  OPERATOR: 'operator',
  DRIVER: 'driver',
  VIEWER: 'viewer',
} as const;

/**
 * লজিস্টিকস পারমিশন রোল টাইপ
 */
export type LogisticsRole = (typeof LOGISTICS_ROLES)[keyof typeof LOGISTICS_ROLES];

/**
 * লজিস্টিকস রোলের পারমিশন ম্যাপিং
 */
export const LOGISTICS_ROLE_PERMISSIONS: Record<LogisticsRole, readonly LogisticsPermission[]> = {
  [LOGISTICS_ROLES.ADMIN]: Object.values(LOGISTICS_PERMISSIONS),
  [LOGISTICS_ROLES.MANAGER]: [
    ...LOGISTICS_PERMISSION_GROUPS.SHIPMENT,
    ...LOGISTICS_PERMISSION_GROUPS.COURIER,
    ...LOGISTICS_PERMISSION_GROUPS.WAREHOUSE,
    ...LOGISTICS_PERMISSION_GROUPS.DRIVER,
    ...LOGISTICS_PERMISSION_GROUPS.ROUTE,
    ...LOGISTICS_PERMISSION_GROUPS.ANALYTICS,
    ...LOGISTICS_PERMISSION_GROUPS.REPORT,
    ...LOGISTICS_PERMISSION_GROUPS.DELIVERY,
    ...LOGISTICS_PERMISSION_GROUPS.INSURANCE,
    ...LOGISTICS_PERMISSION_GROUPS.PAYMENT,
  ],
  [LOGISTICS_ROLES.SUPERVISOR]: [
    ...LOGISTICS_PERMISSION_GROUPS.SHIPMENT,
    ...LOGISTICS_PERMISSION_GROUPS.COURIER,
    ...LOGISTICS_PERMISSION_GROUPS.DRIVER,
    ...LOGISTICS_PERMISSION_GROUPS.ROUTE,
    ...LOGISTICS_PERMISSION_GROUPS.DELIVERY,
  ],
  [LOGISTICS_ROLES.OPERATOR]: [
    ...LOGISTICS_PERMISSION_GROUPS.SHIPMENT,
    ...LOGISTICS_PERMISSION_GROUPS.DELIVERY,
    ...LOGISTICS_PERMISSION_GROUPS.WAREHOUSE,
  ],
  [LOGISTICS_ROLES.DRIVER]: [
    LOGISTICS_PERMISSIONS.VIEW_SHIPMENT,
    LOGISTICS_PERMISSIONS.TRACK_SHIPMENT,
    LOGISTICS_PERMISSIONS.VIEW_DELIVERY,
    LOGISTICS_PERMISSIONS.UPDATE_DELIVERY_STATUS,
  ],
  [LOGISTICS_ROLES.VIEWER]: [
    LOGISTICS_PERMISSIONS.VIEW_SHIPMENT,
    LOGISTICS_PERMISSIONS.VIEW_COURIER,
    LOGISTICS_PERMISSIONS.VIEW_WAREHOUSE,
    LOGISTICS_PERMISSIONS.VIEW_DRIVERS,
    LOGISTICS_PERMISSIONS.VIEW_ROUTES,
    LOGISTICS_PERMISSIONS.VIEW_ANALYTICS,
    LOGISTICS_PERMISSIONS.VIEW_DASHBOARD,
    LOGISTICS_PERMISSIONS.VIEW_REPORT,
    LOGISTICS_PERMISSIONS.VIEW_DELIVERY,
    LOGISTICS_PERMISSIONS.VIEW_INSURANCE,
    LOGISTICS_PERMISSIONS.VIEW_PAYMENT,
  ],
};

/**
 * লজিস্টিকস পারমিশন কনফিগারেশন
 */
export const LOGISTICS_PERMISSION_CONFIG = {
  PERMISSIONS: LOGISTICS_PERMISSIONS,
  DESCRIPTIONS: LOGISTICS_PERMISSION_DESCRIPTIONS,
  GROUPS: LOGISTICS_PERMISSION_GROUPS,
  ROLES: LOGISTICS_ROLES,
  ROLE_PERMISSIONS: LOGISTICS_ROLE_PERMISSIONS,
} as const;

/**
 * লজিস্টিকস পারমিশন কনফিগারেশন টাইপ
 */
export type LogisticsPermissionConfig = typeof LOGISTICS_PERMISSION_CONFIG;

/**
 * চেক করে যে ইউজারের একটি পারমিশন আছে কিনা
 */
export function hasPermission(
  userPermissions: LogisticsPermission[],
  permission: LogisticsPermission
): boolean {
  return userPermissions.includes(permission);
}

/**
 * চেক করে যে ইউজারের কোনো একটি পারমিশন আছে কিনা
 */
export function hasAnyPermission(
  userPermissions: LogisticsPermission[],
  permissions: LogisticsPermission[]
): boolean {
  return permissions.some((p) => userPermissions.includes(p));
}

/**
 * চেক করে যে ইউজারের সব পারমিশন আছে কিনা
 */
export function hasAllPermissions(
  userPermissions: LogisticsPermission[],
  permissions: LogisticsPermission[]
): boolean {
  return permissions.every((p) => userPermissions.includes(p));
}

/**
 * ইউজারের রোল অনুযায়ী পারমিশন পাওয়া
 */
export function getPermissionsForRole(role: LogisticsRole): readonly LogisticsPermission[] {
  return LOGISTICS_ROLE_PERMISSIONS[role] || [];
}

/**
 * পারমিশনের বিবরণ পাওয়া
 */
export function getPermissionDescription(permission: LogisticsPermission): string {
  return LOGISTICS_PERMISSION_DESCRIPTIONS[permission] || permission;
}
