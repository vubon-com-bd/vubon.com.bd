/**
 * Permission constants for the monorepo
 * All permission-related constants are centralized here for consistent access control
 */

/**
 * User management permissions
 */
export const USER_PERMISSIONS = {
  /**
   * Manage users - Create, update, delete users
   */
  USER_MANAGE: 'user:manage',

  /**
   * View users - List and view user details
   */
  USER_VIEW: 'user:view',

  /**
   * Create users - Register new users
   */
  USER_CREATE: 'user:create',

  /**
   * Update users - Modify user information
   */
  USER_UPDATE: 'user:update',

  /**
   * Delete users - Remove users from the system
   */
  USER_DELETE: 'user:delete',

  /**
   * User role management - Assign or change user roles
   */
  USER_ROLE_MANAGE: 'user:role:manage',

  /**
   * User status management - Activate, suspend, or ban users
   */
  USER_STATUS_MANAGE: 'user:status:manage',

  /**
   * User profile management - Manage user profiles
   */
  USER_PROFILE_MANAGE: 'user:profile:manage',

  /**
   * User settings management - Manage user settings
   */
  USER_SETTINGS_MANAGE: 'user:settings:manage',

  /**
   * User session management - Manage user sessions
   */
  USER_SESSION_MANAGE: 'user:session:manage',

  /**
   * User export - Export user data
   */
  USER_EXPORT: 'user:export',

  /**
   * User import - Import user data
   */
  USER_IMPORT: 'user:import',
} as const;

/**
 * Role management permissions
 */
export const ROLE_PERMISSIONS = {
  /**
   * Manage roles - Create, update, delete roles
   */
  ROLE_MANAGE: 'role:manage',

  /**
   * View roles - List and view role details
   */
  ROLE_VIEW: 'role:view',

  /**
   * Create roles - Create new roles
   */
  ROLE_CREATE: 'role:create',

  /**
   * Update roles - Modify role information
   */
  ROLE_UPDATE: 'role:update',

  /**
   * Delete roles - Remove roles from the system
   */
  ROLE_DELETE: 'role:delete',

  /**
   * Role assignment - Assign roles to users
   */
  ROLE_ASSIGN: 'role:assign',

  /**
   * Role permissions management - Manage role permissions
   */
  ROLE_PERMISSION_MANAGE: 'role:permission:manage',
} as const;

/**
 * Permission management permissions
 */
export const PERMISSION_MANAGEMENT_PERMISSIONS = {
  /**
   * Manage permissions - Create, update, delete permissions
   */
  PERMISSION_MANAGE: 'permission:manage',

  /**
   * View permissions - List and view permission details
   */
  PERMISSION_VIEW: 'permission:view',

  /**
   * Create permissions - Create new permissions
   */
  PERMISSION_CREATE: 'permission:create',

  /**
   * Update permissions - Modify permission information
   */
  PERMISSION_UPDATE: 'permission:update',

  /**
   * Delete permissions - Remove permissions from the system
   */
  PERMISSION_DELETE: 'permission:delete',

  /**
   * Assign permissions - Assign permissions to roles
   */
  PERMISSION_ASSIGN: 'permission:assign',
} as const;

/**
 * System management permissions
 */
export const SYSTEM_PERMISSIONS = {
  /**
   * View system - View system information and status
   */
  SYSTEM_VIEW: 'system:view',

  /**
   * Manage system - Configure system settings
   */
  SYSTEM_MANAGE: 'system:manage',

  /**
   * System maintenance - Perform system maintenance tasks
   */
  SYSTEM_MAINTENANCE: 'system:maintenance',

  /**
   * System updates - Apply system updates
   */
  SYSTEM_UPDATE: 'system:update',

  /**
   * System backup - Backup system data
   */
  SYSTEM_BACKUP: 'system:backup',

  /**
   * System restore - Restore system from backup
   */
  SYSTEM_RESTORE: 'system:restore',

  /**
   * System logs - View system logs
   */
  SYSTEM_LOGS: 'system:logs',

  /**
   * System monitoring - Monitor system performance
   */
  SYSTEM_MONITORING: 'system:monitoring',

  /**
   * System alerts - Manage system alerts
   */
  SYSTEM_ALERTS: 'system:alerts',
} as const;

/**
 * Content management permissions
 */
export const CONTENT_PERMISSIONS = {
  /**
   * Manage content - Create, update, delete content
   */
  CONTENT_MANAGE: 'content:manage',

  /**
   * View content - List and view content
   */
  CONTENT_VIEW: 'content:view',

  /**
   * Create content - Create new content
   */
  CONTENT_CREATE: 'content:create',

  /**
   * Update content - Modify content
   */
  CONTENT_UPDATE: 'content:update',

  /**
   * Delete content - Remove content
   */
  CONTENT_DELETE: 'content:delete',

  /**
   * Publish content - Publish content to production
   */
  CONTENT_PUBLISH: 'content:publish',

  /**
   * Archive content - Archive content
   */
  CONTENT_ARCHIVE: 'content:archive',

  /**
   * Content approval - Approve content before publishing
   */
  CONTENT_APPROVE: 'content:approve',

  /**
   * Content categories - Manage content categories
   */
  CONTENT_CATEGORY_MANAGE: 'content:category:manage',
} as const;

/**
 * Product management permissions
 */
export const PRODUCT_PERMISSIONS = {
  /**
   * Manage products - Create, update, delete products
   */
  PRODUCT_MANAGE: 'product:manage',

  /**
   * View products - List and view products
   */
  PRODUCT_VIEW: 'product:view',

  /**
   * Create products - Create new products
   */
  PRODUCT_CREATE: 'product:create',

  /**
   * Update products - Modify products
   */
  PRODUCT_UPDATE: 'product:update',

  /**
   * Delete products - Remove products
   */
  PRODUCT_DELETE: 'product:delete',

  /**
   * Product categories - Manage product categories
   */
  PRODUCT_CATEGORY_MANAGE: 'product:category:manage',

  /**
   * Product inventory - Manage product inventory
   */
  PRODUCT_INVENTORY_MANAGE: 'product:inventory:manage',

  /**
   * Product pricing - Manage product pricing
   */
  PRODUCT_PRICING_MANAGE: 'product:pricing:manage',

  /**
   * Product reviews - Manage product reviews
   */
  PRODUCT_REVIEW_MANAGE: 'product:review:manage',

  /**
   * Product import - Import products
   */
  PRODUCT_IMPORT: 'product:import',

  /**
   * Product export - Export products
   */
  PRODUCT_EXPORT: 'product:export',
} as const;

/**
 * Order management permissions
 */
export const ORDER_PERMISSIONS = {
  /**
   * Manage orders - Create, update, delete orders
   */
  ORDER_MANAGE: 'order:manage',

  /**
   * View orders - List and view orders
   */
  ORDER_VIEW: 'order:view',

  /**
   * Create orders - Create new orders
   */
  ORDER_CREATE: 'order:create',

  /**
   * Update orders - Modify orders
   */
  ORDER_UPDATE: 'order:update',

  /**
   * Delete orders - Remove orders
   */
  ORDER_DELETE: 'order:delete',

  /**
   * Approve orders - Approve pending orders
   */
  ORDER_APPROVE: 'order:approve',

  /**
   * Cancel orders - Cancel orders
   */
  ORDER_CANCEL: 'order:cancel',

  /**
   * Refund orders - Process order refunds
   */
  ORDER_REFUND: 'order:refund',

  /**
   * Order shipping - Manage order shipping
   */
  ORDER_SHIPPING_MANAGE: 'order:shipping:manage',

  /**
   * Order tracking - Manage order tracking
   */
  ORDER_TRACKING_MANAGE: 'order:tracking:manage',
} as const;

/**
 * Payment management permissions
 */
export const PAYMENT_PERMISSIONS = {
  /**
   * Manage payments - Process and manage payments
   */
  PAYMENT_MANAGE: 'payment:manage',

  /**
   * View payments - List and view payments
   */
  PAYMENT_VIEW: 'payment:view',

  /**
   * Process payments - Process payment transactions
   */
  PAYMENT_PROCESS: 'payment:process',

  /**
   * Refund payments - Process payment refunds
   */
  PAYMENT_REFUND: 'payment:refund',

  /**
   * Payment gateway management - Manage payment gateways
   */
  PAYMENT_GATEWAY_MANAGE: 'payment:gateway:manage',

  /**
   * Payment reconciliation - Reconcile payments
   */
  PAYMENT_RECONCILIATION: 'payment:reconciliation',

  /**
   * Payment export - Export payment data
   */
  PAYMENT_EXPORT: 'payment:export',
} as const;

/**
 * Analytics permissions
 */
export const ANALYTICS_PERMISSIONS = {
  /**
   * Manage analytics - Configure analytics
   */
  ANALYTICS_MANAGE: 'analytics:manage',

  /**
   * View analytics - View analytics data
   */
  ANALYTICS_VIEW: 'analytics:view',

  /**
   * Export analytics - Export analytics data
   */
  ANALYTICS_EXPORT: 'analytics:export',

  /**
   * Analytics reports - Generate analytics reports
   */
  ANALYTICS_REPORTS: 'analytics:reports',

  /**
   * Analytics dashboards - Manage analytics dashboards
   */
  ANALYTICS_DASHBOARD_MANAGE: 'analytics:dashboard:manage',
} as const;

/**
 * Settings management permissions
 */
export const SETTINGS_PERMISSIONS = {
  /**
   * Manage settings - Configure system settings
   */
  SETTINGS_MANAGE: 'settings:manage',

  /**
   * View settings - View system settings
   */
  SETTINGS_VIEW: 'settings:view',

  /**
   * Application settings - Manage application settings
   */
  SETTINGS_APP: 'settings:app',

  /**
   * Security settings - Manage security settings
   */
  SETTINGS_SECURITY: 'settings:security',

  /**
   * Integration settings - Manage integration settings
   */
  SETTINGS_INTEGRATION: 'settings:integration',

  /**
   * Email settings - Manage email settings
   */
  SETTINGS_EMAIL: 'settings:email',

  /**
   * Notification settings - Manage notification settings
   */
  SETTINGS_NOTIFICATION: 'settings:notification',
} as const;

/**
 * Notification permissions
 */
export const NOTIFICATION_PERMISSIONS = {
  /**
   * Manage notifications - Send and manage notifications
   */
  NOTIFICATION_MANAGE: 'notification:manage',

  /**
   * View notifications - View notifications
   */
  NOTIFICATION_VIEW: 'notification:view',

  /**
   * Send notifications - Send notifications
   */
  NOTIFICATION_SEND: 'notification:send',

  /**
   * Notification templates - Manage notification templates
   */
  NOTIFICATION_TEMPLATE_MANAGE: 'notification:template:manage',

  /**
   * Notification channels - Manage notification channels
   */
  NOTIFICATION_CHANNEL_MANAGE: 'notification:channel:manage',
} as const;

/**
 * Support permissions
 */
export const SUPPORT_PERMISSIONS = {
  /**
   * Manage support - Manage support tickets
   */
  SUPPORT_MANAGE: 'support:manage',

  /**
   * View support - View support tickets
   */
  SUPPORT_VIEW: 'support:view',

  /**
   * Create support tickets - Create support tickets
   */
  SUPPORT_CREATE: 'support:create',

  /**
   * Update support tickets - Update support tickets
   */
  SUPPORT_UPDATE: 'support:update',

  /**
   * Close support tickets - Close support tickets
   */
  SUPPORT_CLOSE: 'support:close',

  /**
   * Support categories - Manage support categories
   */
  SUPPORT_CATEGORY_MANAGE: 'support:category:manage',

  /**
   * Support knowledge base - Manage knowledge base
   */
  SUPPORT_KB_MANAGE: 'support:kb:manage',
} as const;

/**
 * Combined permissions for easy access
 */
export const PERMISSIONS = {
  ...USER_PERMISSIONS,
  ...ROLE_PERMISSIONS,
  ...PERMISSION_MANAGEMENT_PERMISSIONS,
  ...SYSTEM_PERMISSIONS,
  ...CONTENT_PERMISSIONS,
  ...PRODUCT_PERMISSIONS,
  ...ORDER_PERMISSIONS,
  ...PAYMENT_PERMISSIONS,
  ...ANALYTICS_PERMISSIONS,
  ...SETTINGS_PERMISSIONS,
  ...NOTIFICATION_PERMISSIONS,
  ...SUPPORT_PERMISSIONS,
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

/**
 * Permission categories for grouping
 */
export const PERMISSION_CATEGORIES = {
  USER: 'user',
  ROLE: 'role',
  PERMISSION: 'permission',
  SYSTEM: 'system',
  CONTENT: 'content',
  PRODUCT: 'product',
  ORDER: 'order',
  PAYMENT: 'payment',
  ANALYTICS: 'analytics',
  SETTINGS: 'settings',
  NOTIFICATION: 'notification',
  SUPPORT: 'support',
} as const;

export type PermissionCategory = (typeof PERMISSION_CATEGORIES)[keyof typeof PERMISSION_CATEGORIES];

/**
 * Permission category labels for display
 */
export const PERMISSION_CATEGORY_LABELS = {
  user: 'User Management',
  role: 'Role Management',
  permission: 'Permission Management',
  system: 'System Management',
  content: 'Content Management',
  product: 'Product Management',
  order: 'Order Management',
  payment: 'Payment Management',
  analytics: 'Analytics & Reports',
  settings: 'Settings',
  notification: 'Notifications',
  support: 'Support',
} as const;

export type PermissionCategoryLabel =
  (typeof PERMISSION_CATEGORY_LABELS)[keyof typeof PERMISSION_CATEGORY_LABELS];

/**
 * Permission description mapping
 */
export const PERMISSION_DESCRIPTIONS = {
  'user:manage': 'Full management of users including creation, updates, and deletion',
  'user:view': 'View user profiles and lists',
  'user:create': 'Create new user accounts',
  'user:update': 'Update user information and profiles',
  'user:delete': 'Delete user accounts',
  'user:role:manage': 'Assign and manage user roles',
  'user:status:manage': 'Activate, suspend, or ban users',
  'user:profile:manage': 'Manage user profiles including avatar and bio',
  'user:settings:manage': 'Manage user account settings',
  'user:session:manage': 'Manage user sessions and force logout',
  'user:export': 'Export user data in various formats',
  'user:import': 'Import user data from external sources',

  'role:manage': 'Full management of roles including creation, updates, and deletion',
  'role:view': 'View role definitions and assignments',
  'role:create': 'Create new role definitions',
  'role:update': 'Update role definitions and permissions',
  'role:delete': 'Delete role definitions',
  'role:assign': 'Assign roles to users',
  'role:permission:manage': 'Manage role permissions',

  'permission:manage': 'Full management of permissions',
  'permission:view': 'View permission definitions',
  'permission:create': 'Create new permission definitions',
  'permission:update': 'Update permission definitions',
  'permission:delete': 'Delete permission definitions',
  'permission:assign': 'Assign permissions to roles',

  'system:view': 'View system information and status',
  'system:manage': 'Manage system configurations and settings',
  'system:maintenance': 'Perform system maintenance tasks',
  'system:update': 'Apply system updates and patches',
  'system:backup': 'Create system backups',
  'system:restore': 'Restore system from backups',
  'system:logs': 'View and manage system logs',
  'system:monitoring': 'Monitor system performance and health',
  'system:alerts': 'Manage system alerts and notifications',

  'content:manage': 'Full management of content',
  'content:view': 'View content and content lists',
  'content:create': 'Create new content',
  'content:update': 'Update existing content',
  'content:delete': 'Delete content',
  'content:publish': 'Publish content to production',
  'content:archive': 'Archive content',
  'content:approve': 'Approve content before publishing',
  'content:category:manage': 'Manage content categories',

  'product:manage': 'Full management of products',
  'product:view': 'View products and product lists',
  'product:create': 'Create new products',
  'product:update': 'Update existing products',
  'product:delete': 'Delete products',
  'product:category:manage': 'Manage product categories',
  'product:inventory:manage': 'Manage product inventory',
  'product:pricing:manage': 'Manage product pricing',
  'product:review:manage': 'Manage product reviews',
  'product:import': 'Import products in bulk',
  'product:export': 'Export product data',

  'order:manage': 'Full management of orders',
  'order:view': 'View orders and order lists',
  'order:create': 'Create new orders',
  'order:update': 'Update existing orders',
  'order:delete': 'Delete orders',
  'order:approve': 'Approve pending orders',
  'order:cancel': 'Cancel orders',
  'order:refund': 'Process order refunds',
  'order:shipping:manage': 'Manage order shipping',
  'order:tracking:manage': 'Manage order tracking information',

  'payment:manage': 'Full management of payments',
  'payment:view': 'View payments and payment lists',
  'payment:process': 'Process payment transactions',
  'payment:refund': 'Process payment refunds',
  'payment:gateway:manage': 'Manage payment gateways',
  'payment:reconciliation': 'Perform payment reconciliation',
  'payment:export': 'Export payment data',

  'analytics:manage': 'Manage analytics configurations',
  'analytics:view': 'View analytics data and dashboards',
  'analytics:export': 'Export analytics data',
  'analytics:reports': 'Generate analytics reports',
  'analytics:dashboard:manage': 'Manage analytics dashboards',

  'settings:manage': 'Full management of system settings',
  'settings:view': 'View system settings',
  'settings:app': 'Manage application settings',
  'settings:security': 'Manage security settings',
  'settings:integration': 'Manage integration settings',
  'settings:email': 'Manage email settings',
  'settings:notification': 'Manage notification settings',

  'notification:manage': 'Full management of notifications',
  'notification:view': 'View notifications',
  'notification:send': 'Send notifications',
  'notification:template:manage': 'Manage notification templates',
  'notification:channel:manage': 'Manage notification channels',

  'support:manage': 'Full management of support tickets',
  'support:view': 'View support tickets',
  'support:create': 'Create support tickets',
  'support:update': 'Update support tickets',
  'support:close': 'Close support tickets',
  'support:category:manage': 'Manage support categories',
  'support:kb:manage': 'Manage support knowledge base',
} as const;

export type PermissionDescription =
  (typeof PERMISSION_DESCRIPTIONS)[keyof typeof PERMISSION_DESCRIPTIONS];

/**
 * Permission interface
 */
export interface PermissionDefinition {
  /**
   * Permission key/identifier
   */
  key: string;

  /**
   * Permission name for display
   */
  name: string;

  /**
   * Permission description
   */
  description: string;

  /**
   * Permission category
   */
  category: PermissionCategory;

  /**
   * Whether this is a system permission
   */
  isSystem: boolean;

  /**
   * Whether this permission is enabled by default
   */
  enabledByDefault: boolean;
}

/**
 * Helper function to create permission definition
 */
/**
 * Helper function to create permission definition
 * Uses the permission key to generate a readable name
 */
export const createPermissionDefinition = (
  permissionKey: string,
  description?: string
): PermissionDefinition => {
  const name = permissionKey
    .split(':')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

  const category = getPermissionCategory(permissionKey) || PERMISSION_CATEGORIES.SYSTEM;

  return {
    key: permissionKey,
    name,
    description:
      description ||
      PERMISSION_DESCRIPTIONS[permissionKey as keyof typeof PERMISSION_DESCRIPTIONS] ||
      permissionKey,
    category,
    isSystem: true,
    enabledByDefault: false,
  };
};

/**
 * Helper function to get permission category
 */
export const getPermissionCategory = (permission: string): PermissionCategory | null => {
  const parts = permission.split(':');
  if (parts.length > 0) {
    const category = parts[0] as PermissionCategory;
    if (Object.values(PERMISSION_CATEGORIES).includes(category)) {
      return category;
    }
  }
  return null;
};

/**
 * Helper function to check if permission exists
 */
export const isPermissionValid = (permission: string): permission is Permission => {
  return Object.values(PERMISSIONS).includes(permission as Permission);
};

/**
 * Helper function to get all permissions by category
 */
export const getPermissionsByCategory = (category: PermissionCategory): Permission[] => {
  const permissions: Permission[] = [];
  for (const [key, value] of Object.entries(PERMISSIONS)) {
    const permCategory = getPermissionCategory(value);
    if (permCategory === category) {
      permissions.push(value);
    }
  }
  return permissions;
};

/**
 * Helper function to get category label
 */
export const getCategoryLabel = (category: PermissionCategory): string => {
  return PERMISSION_CATEGORY_LABELS[category] || category;
};

/**
 * Helper function to get permission description
 */
export const getPermissionDescription = (permission: Permission): string => {
  return PERMISSION_DESCRIPTIONS[permission] || permission;
};

/**
 * All permission constants grouped for export
 */
export const PERMISSION_CONSTANTS = {
  PERMISSIONS,
  CATEGORIES: PERMISSION_CATEGORIES,
  CATEGORY_LABELS: PERMISSION_CATEGORY_LABELS,
  DESCRIPTIONS: PERMISSION_DESCRIPTIONS,
  USER: USER_PERMISSIONS,
  ROLE: ROLE_PERMISSIONS,
  PERMISSION_MANAGEMENT: PERMISSION_MANAGEMENT_PERMISSIONS,
  SYSTEM: SYSTEM_PERMISSIONS,
  CONTENT: CONTENT_PERMISSIONS,
  PRODUCT: PRODUCT_PERMISSIONS,
  ORDER: ORDER_PERMISSIONS,
  PAYMENT: PAYMENT_PERMISSIONS,
  ANALYTICS: ANALYTICS_PERMISSIONS,
  SETTINGS: SETTINGS_PERMISSIONS,
  NOTIFICATION: NOTIFICATION_PERMISSIONS,
  SUPPORT: SUPPORT_PERMISSIONS,
} as const;

/**
 * All permissions for easy export
 */
export const ALL_PERMISSIONS = {
  ...USER_PERMISSIONS,
  ...ROLE_PERMISSIONS,
  ...PERMISSION_MANAGEMENT_PERMISSIONS,
  ...SYSTEM_PERMISSIONS,
  ...CONTENT_PERMISSIONS,
  ...PRODUCT_PERMISSIONS,
  ...ORDER_PERMISSIONS,
  ...PAYMENT_PERMISSIONS,
  ...ANALYTICS_PERMISSIONS,
  ...SETTINGS_PERMISSIONS,
  ...NOTIFICATION_PERMISSIONS,
  ...SUPPORT_PERMISSIONS,
} as const;
