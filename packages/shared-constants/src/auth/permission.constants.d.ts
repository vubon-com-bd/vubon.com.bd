/**
 * Permission constants for the monorepo
 * All permission-related constants are centralized here for consistent access control
 */
/**
 * User management permissions
 */
export declare const USER_PERMISSIONS: {
    /**
     * Manage users - Create, update, delete users
     */
    readonly USER_MANAGE: "user:manage";
    /**
     * View users - List and view user details
     */
    readonly USER_VIEW: "user:view";
    /**
     * Create users - Register new users
     */
    readonly USER_CREATE: "user:create";
    /**
     * Update users - Modify user information
     */
    readonly USER_UPDATE: "user:update";
    /**
     * Delete users - Remove users from the system
     */
    readonly USER_DELETE: "user:delete";
    /**
     * User role management - Assign or change user roles
     */
    readonly USER_ROLE_MANAGE: "user:role:manage";
    /**
     * User status management - Activate, suspend, or ban users
     */
    readonly USER_STATUS_MANAGE: "user:status:manage";
    /**
     * User profile management - Manage user profiles
     */
    readonly USER_PROFILE_MANAGE: "user:profile:manage";
    /**
     * User settings management - Manage user settings
     */
    readonly USER_SETTINGS_MANAGE: "user:settings:manage";
    /**
     * User session management - Manage user sessions
     */
    readonly USER_SESSION_MANAGE: "user:session:manage";
    /**
     * User export - Export user data
     */
    readonly USER_EXPORT: "user:export";
    /**
     * User import - Import user data
     */
    readonly USER_IMPORT: "user:import";
};
/**
 * Role management permissions
 */
export declare const ROLE_PERMISSIONS: {
    /**
     * Manage roles - Create, update, delete roles
     */
    readonly ROLE_MANAGE: "role:manage";
    /**
     * View roles - List and view role details
     */
    readonly ROLE_VIEW: "role:view";
    /**
     * Create roles - Create new roles
     */
    readonly ROLE_CREATE: "role:create";
    /**
     * Update roles - Modify role information
     */
    readonly ROLE_UPDATE: "role:update";
    /**
     * Delete roles - Remove roles from the system
     */
    readonly ROLE_DELETE: "role:delete";
    /**
     * Role assignment - Assign roles to users
     */
    readonly ROLE_ASSIGN: "role:assign";
    /**
     * Role permissions management - Manage role permissions
     */
    readonly ROLE_PERMISSION_MANAGE: "role:permission:manage";
};
/**
 * Permission management permissions
 */
export declare const PERMISSION_MANAGEMENT_PERMISSIONS: {
    /**
     * Manage permissions - Create, update, delete permissions
     */
    readonly PERMISSION_MANAGE: "permission:manage";
    /**
     * View permissions - List and view permission details
     */
    readonly PERMISSION_VIEW: "permission:view";
    /**
     * Create permissions - Create new permissions
     */
    readonly PERMISSION_CREATE: "permission:create";
    /**
     * Update permissions - Modify permission information
     */
    readonly PERMISSION_UPDATE: "permission:update";
    /**
     * Delete permissions - Remove permissions from the system
     */
    readonly PERMISSION_DELETE: "permission:delete";
    /**
     * Assign permissions - Assign permissions to roles
     */
    readonly PERMISSION_ASSIGN: "permission:assign";
};
/**
 * System management permissions
 */
export declare const SYSTEM_PERMISSIONS: {
    /**
     * View system - View system information and status
     */
    readonly SYSTEM_VIEW: "system:view";
    /**
     * Manage system - Configure system settings
     */
    readonly SYSTEM_MANAGE: "system:manage";
    /**
     * System maintenance - Perform system maintenance tasks
     */
    readonly SYSTEM_MAINTENANCE: "system:maintenance";
    /**
     * System updates - Apply system updates
     */
    readonly SYSTEM_UPDATE: "system:update";
    /**
     * System backup - Backup system data
     */
    readonly SYSTEM_BACKUP: "system:backup";
    /**
     * System restore - Restore system from backup
     */
    readonly SYSTEM_RESTORE: "system:restore";
    /**
     * System logs - View system logs
     */
    readonly SYSTEM_LOGS: "system:logs";
    /**
     * System monitoring - Monitor system performance
     */
    readonly SYSTEM_MONITORING: "system:monitoring";
    /**
     * System alerts - Manage system alerts
     */
    readonly SYSTEM_ALERTS: "system:alerts";
};
/**
 * Content management permissions
 */
export declare const CONTENT_PERMISSIONS: {
    /**
     * Manage content - Create, update, delete content
     */
    readonly CONTENT_MANAGE: "content:manage";
    /**
     * View content - List and view content
     */
    readonly CONTENT_VIEW: "content:view";
    /**
     * Create content - Create new content
     */
    readonly CONTENT_CREATE: "content:create";
    /**
     * Update content - Modify content
     */
    readonly CONTENT_UPDATE: "content:update";
    /**
     * Delete content - Remove content
     */
    readonly CONTENT_DELETE: "content:delete";
    /**
     * Publish content - Publish content to production
     */
    readonly CONTENT_PUBLISH: "content:publish";
    /**
     * Archive content - Archive content
     */
    readonly CONTENT_ARCHIVE: "content:archive";
    /**
     * Content approval - Approve content before publishing
     */
    readonly CONTENT_APPROVE: "content:approve";
    /**
     * Content categories - Manage content categories
     */
    readonly CONTENT_CATEGORY_MANAGE: "content:category:manage";
};
/**
 * Product management permissions
 */
export declare const PRODUCT_PERMISSIONS: {
    /**
     * Manage products - Create, update, delete products
     */
    readonly PRODUCT_MANAGE: "product:manage";
    /**
     * View products - List and view products
     */
    readonly PRODUCT_VIEW: "product:view";
    /**
     * Create products - Create new products
     */
    readonly PRODUCT_CREATE: "product:create";
    /**
     * Update products - Modify products
     */
    readonly PRODUCT_UPDATE: "product:update";
    /**
     * Delete products - Remove products
     */
    readonly PRODUCT_DELETE: "product:delete";
    /**
     * Product categories - Manage product categories
     */
    readonly PRODUCT_CATEGORY_MANAGE: "product:category:manage";
    /**
     * Product inventory - Manage product inventory
     */
    readonly PRODUCT_INVENTORY_MANAGE: "product:inventory:manage";
    /**
     * Product pricing - Manage product pricing
     */
    readonly PRODUCT_PRICING_MANAGE: "product:pricing:manage";
    /**
     * Product reviews - Manage product reviews
     */
    readonly PRODUCT_REVIEW_MANAGE: "product:review:manage";
    /**
     * Product import - Import products
     */
    readonly PRODUCT_IMPORT: "product:import";
    /**
     * Product export - Export products
     */
    readonly PRODUCT_EXPORT: "product:export";
};
/**
 * Order management permissions
 */
export declare const ORDER_PERMISSIONS: {
    /**
     * Manage orders - Create, update, delete orders
     */
    readonly ORDER_MANAGE: "order:manage";
    /**
     * View orders - List and view orders
     */
    readonly ORDER_VIEW: "order:view";
    /**
     * Create orders - Create new orders
     */
    readonly ORDER_CREATE: "order:create";
    /**
     * Update orders - Modify orders
     */
    readonly ORDER_UPDATE: "order:update";
    /**
     * Delete orders - Remove orders
     */
    readonly ORDER_DELETE: "order:delete";
    /**
     * Approve orders - Approve pending orders
     */
    readonly ORDER_APPROVE: "order:approve";
    /**
     * Cancel orders - Cancel orders
     */
    readonly ORDER_CANCEL: "order:cancel";
    /**
     * Refund orders - Process order refunds
     */
    readonly ORDER_REFUND: "order:refund";
    /**
     * Order shipping - Manage order shipping
     */
    readonly ORDER_SHIPPING_MANAGE: "order:shipping:manage";
    /**
     * Order tracking - Manage order tracking
     */
    readonly ORDER_TRACKING_MANAGE: "order:tracking:manage";
};
/**
 * Payment management permissions
 */
export declare const PAYMENT_PERMISSIONS: {
    /**
     * Manage payments - Process and manage payments
     */
    readonly PAYMENT_MANAGE: "payment:manage";
    /**
     * View payments - List and view payments
     */
    readonly PAYMENT_VIEW: "payment:view";
    /**
     * Process payments - Process payment transactions
     */
    readonly PAYMENT_PROCESS: "payment:process";
    /**
     * Refund payments - Process payment refunds
     */
    readonly PAYMENT_REFUND: "payment:refund";
    /**
     * Payment gateway management - Manage payment gateways
     */
    readonly PAYMENT_GATEWAY_MANAGE: "payment:gateway:manage";
    /**
     * Payment reconciliation - Reconcile payments
     */
    readonly PAYMENT_RECONCILIATION: "payment:reconciliation";
    /**
     * Payment export - Export payment data
     */
    readonly PAYMENT_EXPORT: "payment:export";
};
/**
 * Analytics permissions
 */
export declare const ANALYTICS_PERMISSIONS: {
    /**
     * Manage analytics - Configure analytics
     */
    readonly ANALYTICS_MANAGE: "analytics:manage";
    /**
     * View analytics - View analytics data
     */
    readonly ANALYTICS_VIEW: "analytics:view";
    /**
     * Export analytics - Export analytics data
     */
    readonly ANALYTICS_EXPORT: "analytics:export";
    /**
     * Analytics reports - Generate analytics reports
     */
    readonly ANALYTICS_REPORTS: "analytics:reports";
    /**
     * Analytics dashboards - Manage analytics dashboards
     */
    readonly ANALYTICS_DASHBOARD_MANAGE: "analytics:dashboard:manage";
};
/**
 * Settings management permissions
 */
export declare const SETTINGS_PERMISSIONS: {
    /**
     * Manage settings - Configure system settings
     */
    readonly SETTINGS_MANAGE: "settings:manage";
    /**
     * View settings - View system settings
     */
    readonly SETTINGS_VIEW: "settings:view";
    /**
     * Application settings - Manage application settings
     */
    readonly SETTINGS_APP: "settings:app";
    /**
     * Security settings - Manage security settings
     */
    readonly SETTINGS_SECURITY: "settings:security";
    /**
     * Integration settings - Manage integration settings
     */
    readonly SETTINGS_INTEGRATION: "settings:integration";
    /**
     * Email settings - Manage email settings
     */
    readonly SETTINGS_EMAIL: "settings:email";
    /**
     * Notification settings - Manage notification settings
     */
    readonly SETTINGS_NOTIFICATION: "settings:notification";
};
/**
 * Notification permissions
 */
export declare const NOTIFICATION_PERMISSIONS: {
    /**
     * Manage notifications - Send and manage notifications
     */
    readonly NOTIFICATION_MANAGE: "notification:manage";
    /**
     * View notifications - View notifications
     */
    readonly NOTIFICATION_VIEW: "notification:view";
    /**
     * Send notifications - Send notifications
     */
    readonly NOTIFICATION_SEND: "notification:send";
    /**
     * Notification templates - Manage notification templates
     */
    readonly NOTIFICATION_TEMPLATE_MANAGE: "notification:template:manage";
    /**
     * Notification channels - Manage notification channels
     */
    readonly NOTIFICATION_CHANNEL_MANAGE: "notification:channel:manage";
};
/**
 * Support permissions
 */
export declare const SUPPORT_PERMISSIONS: {
    /**
     * Manage support - Manage support tickets
     */
    readonly SUPPORT_MANAGE: "support:manage";
    /**
     * View support - View support tickets
     */
    readonly SUPPORT_VIEW: "support:view";
    /**
     * Create support tickets - Create support tickets
     */
    readonly SUPPORT_CREATE: "support:create";
    /**
     * Update support tickets - Update support tickets
     */
    readonly SUPPORT_UPDATE: "support:update";
    /**
     * Close support tickets - Close support tickets
     */
    readonly SUPPORT_CLOSE: "support:close";
    /**
     * Support categories - Manage support categories
     */
    readonly SUPPORT_CATEGORY_MANAGE: "support:category:manage";
    /**
     * Support knowledge base - Manage knowledge base
     */
    readonly SUPPORT_KB_MANAGE: "support:kb:manage";
};
/**
 * Combined permissions for easy access
 */
export declare const PERMISSIONS: {
    /**
     * Manage support - Manage support tickets
     */
    readonly SUPPORT_MANAGE: "support:manage";
    /**
     * View support - View support tickets
     */
    readonly SUPPORT_VIEW: "support:view";
    /**
     * Create support tickets - Create support tickets
     */
    readonly SUPPORT_CREATE: "support:create";
    /**
     * Update support tickets - Update support tickets
     */
    readonly SUPPORT_UPDATE: "support:update";
    /**
     * Close support tickets - Close support tickets
     */
    readonly SUPPORT_CLOSE: "support:close";
    /**
     * Support categories - Manage support categories
     */
    readonly SUPPORT_CATEGORY_MANAGE: "support:category:manage";
    /**
     * Support knowledge base - Manage knowledge base
     */
    readonly SUPPORT_KB_MANAGE: "support:kb:manage";
    /**
     * Manage notifications - Send and manage notifications
     */
    readonly NOTIFICATION_MANAGE: "notification:manage";
    /**
     * View notifications - View notifications
     */
    readonly NOTIFICATION_VIEW: "notification:view";
    /**
     * Send notifications - Send notifications
     */
    readonly NOTIFICATION_SEND: "notification:send";
    /**
     * Notification templates - Manage notification templates
     */
    readonly NOTIFICATION_TEMPLATE_MANAGE: "notification:template:manage";
    /**
     * Notification channels - Manage notification channels
     */
    readonly NOTIFICATION_CHANNEL_MANAGE: "notification:channel:manage";
    /**
     * Manage settings - Configure system settings
     */
    readonly SETTINGS_MANAGE: "settings:manage";
    /**
     * View settings - View system settings
     */
    readonly SETTINGS_VIEW: "settings:view";
    /**
     * Application settings - Manage application settings
     */
    readonly SETTINGS_APP: "settings:app";
    /**
     * Security settings - Manage security settings
     */
    readonly SETTINGS_SECURITY: "settings:security";
    /**
     * Integration settings - Manage integration settings
     */
    readonly SETTINGS_INTEGRATION: "settings:integration";
    /**
     * Email settings - Manage email settings
     */
    readonly SETTINGS_EMAIL: "settings:email";
    /**
     * Notification settings - Manage notification settings
     */
    readonly SETTINGS_NOTIFICATION: "settings:notification";
    /**
     * Manage analytics - Configure analytics
     */
    readonly ANALYTICS_MANAGE: "analytics:manage";
    /**
     * View analytics - View analytics data
     */
    readonly ANALYTICS_VIEW: "analytics:view";
    /**
     * Export analytics - Export analytics data
     */
    readonly ANALYTICS_EXPORT: "analytics:export";
    /**
     * Analytics reports - Generate analytics reports
     */
    readonly ANALYTICS_REPORTS: "analytics:reports";
    /**
     * Analytics dashboards - Manage analytics dashboards
     */
    readonly ANALYTICS_DASHBOARD_MANAGE: "analytics:dashboard:manage";
    /**
     * Manage payments - Process and manage payments
     */
    readonly PAYMENT_MANAGE: "payment:manage";
    /**
     * View payments - List and view payments
     */
    readonly PAYMENT_VIEW: "payment:view";
    /**
     * Process payments - Process payment transactions
     */
    readonly PAYMENT_PROCESS: "payment:process";
    /**
     * Refund payments - Process payment refunds
     */
    readonly PAYMENT_REFUND: "payment:refund";
    /**
     * Payment gateway management - Manage payment gateways
     */
    readonly PAYMENT_GATEWAY_MANAGE: "payment:gateway:manage";
    /**
     * Payment reconciliation - Reconcile payments
     */
    readonly PAYMENT_RECONCILIATION: "payment:reconciliation";
    /**
     * Payment export - Export payment data
     */
    readonly PAYMENT_EXPORT: "payment:export";
    /**
     * Manage orders - Create, update, delete orders
     */
    readonly ORDER_MANAGE: "order:manage";
    /**
     * View orders - List and view orders
     */
    readonly ORDER_VIEW: "order:view";
    /**
     * Create orders - Create new orders
     */
    readonly ORDER_CREATE: "order:create";
    /**
     * Update orders - Modify orders
     */
    readonly ORDER_UPDATE: "order:update";
    /**
     * Delete orders - Remove orders
     */
    readonly ORDER_DELETE: "order:delete";
    /**
     * Approve orders - Approve pending orders
     */
    readonly ORDER_APPROVE: "order:approve";
    /**
     * Cancel orders - Cancel orders
     */
    readonly ORDER_CANCEL: "order:cancel";
    /**
     * Refund orders - Process order refunds
     */
    readonly ORDER_REFUND: "order:refund";
    /**
     * Order shipping - Manage order shipping
     */
    readonly ORDER_SHIPPING_MANAGE: "order:shipping:manage";
    /**
     * Order tracking - Manage order tracking
     */
    readonly ORDER_TRACKING_MANAGE: "order:tracking:manage";
    /**
     * Manage products - Create, update, delete products
     */
    readonly PRODUCT_MANAGE: "product:manage";
    /**
     * View products - List and view products
     */
    readonly PRODUCT_VIEW: "product:view";
    /**
     * Create products - Create new products
     */
    readonly PRODUCT_CREATE: "product:create";
    /**
     * Update products - Modify products
     */
    readonly PRODUCT_UPDATE: "product:update";
    /**
     * Delete products - Remove products
     */
    readonly PRODUCT_DELETE: "product:delete";
    /**
     * Product categories - Manage product categories
     */
    readonly PRODUCT_CATEGORY_MANAGE: "product:category:manage";
    /**
     * Product inventory - Manage product inventory
     */
    readonly PRODUCT_INVENTORY_MANAGE: "product:inventory:manage";
    /**
     * Product pricing - Manage product pricing
     */
    readonly PRODUCT_PRICING_MANAGE: "product:pricing:manage";
    /**
     * Product reviews - Manage product reviews
     */
    readonly PRODUCT_REVIEW_MANAGE: "product:review:manage";
    /**
     * Product import - Import products
     */
    readonly PRODUCT_IMPORT: "product:import";
    /**
     * Product export - Export products
     */
    readonly PRODUCT_EXPORT: "product:export";
    /**
     * Manage content - Create, update, delete content
     */
    readonly CONTENT_MANAGE: "content:manage";
    /**
     * View content - List and view content
     */
    readonly CONTENT_VIEW: "content:view";
    /**
     * Create content - Create new content
     */
    readonly CONTENT_CREATE: "content:create";
    /**
     * Update content - Modify content
     */
    readonly CONTENT_UPDATE: "content:update";
    /**
     * Delete content - Remove content
     */
    readonly CONTENT_DELETE: "content:delete";
    /**
     * Publish content - Publish content to production
     */
    readonly CONTENT_PUBLISH: "content:publish";
    /**
     * Archive content - Archive content
     */
    readonly CONTENT_ARCHIVE: "content:archive";
    /**
     * Content approval - Approve content before publishing
     */
    readonly CONTENT_APPROVE: "content:approve";
    /**
     * Content categories - Manage content categories
     */
    readonly CONTENT_CATEGORY_MANAGE: "content:category:manage";
    /**
     * View system - View system information and status
     */
    readonly SYSTEM_VIEW: "system:view";
    /**
     * Manage system - Configure system settings
     */
    readonly SYSTEM_MANAGE: "system:manage";
    /**
     * System maintenance - Perform system maintenance tasks
     */
    readonly SYSTEM_MAINTENANCE: "system:maintenance";
    /**
     * System updates - Apply system updates
     */
    readonly SYSTEM_UPDATE: "system:update";
    /**
     * System backup - Backup system data
     */
    readonly SYSTEM_BACKUP: "system:backup";
    /**
     * System restore - Restore system from backup
     */
    readonly SYSTEM_RESTORE: "system:restore";
    /**
     * System logs - View system logs
     */
    readonly SYSTEM_LOGS: "system:logs";
    /**
     * System monitoring - Monitor system performance
     */
    readonly SYSTEM_MONITORING: "system:monitoring";
    /**
     * System alerts - Manage system alerts
     */
    readonly SYSTEM_ALERTS: "system:alerts";
    /**
     * Manage permissions - Create, update, delete permissions
     */
    readonly PERMISSION_MANAGE: "permission:manage";
    /**
     * View permissions - List and view permission details
     */
    readonly PERMISSION_VIEW: "permission:view";
    /**
     * Create permissions - Create new permissions
     */
    readonly PERMISSION_CREATE: "permission:create";
    /**
     * Update permissions - Modify permission information
     */
    readonly PERMISSION_UPDATE: "permission:update";
    /**
     * Delete permissions - Remove permissions from the system
     */
    readonly PERMISSION_DELETE: "permission:delete";
    /**
     * Assign permissions - Assign permissions to roles
     */
    readonly PERMISSION_ASSIGN: "permission:assign";
    /**
     * Manage roles - Create, update, delete roles
     */
    readonly ROLE_MANAGE: "role:manage";
    /**
     * View roles - List and view role details
     */
    readonly ROLE_VIEW: "role:view";
    /**
     * Create roles - Create new roles
     */
    readonly ROLE_CREATE: "role:create";
    /**
     * Update roles - Modify role information
     */
    readonly ROLE_UPDATE: "role:update";
    /**
     * Delete roles - Remove roles from the system
     */
    readonly ROLE_DELETE: "role:delete";
    /**
     * Role assignment - Assign roles to users
     */
    readonly ROLE_ASSIGN: "role:assign";
    /**
     * Role permissions management - Manage role permissions
     */
    readonly ROLE_PERMISSION_MANAGE: "role:permission:manage";
    /**
     * Manage users - Create, update, delete users
     */
    readonly USER_MANAGE: "user:manage";
    /**
     * View users - List and view user details
     */
    readonly USER_VIEW: "user:view";
    /**
     * Create users - Register new users
     */
    readonly USER_CREATE: "user:create";
    /**
     * Update users - Modify user information
     */
    readonly USER_UPDATE: "user:update";
    /**
     * Delete users - Remove users from the system
     */
    readonly USER_DELETE: "user:delete";
    /**
     * User role management - Assign or change user roles
     */
    readonly USER_ROLE_MANAGE: "user:role:manage";
    /**
     * User status management - Activate, suspend, or ban users
     */
    readonly USER_STATUS_MANAGE: "user:status:manage";
    /**
     * User profile management - Manage user profiles
     */
    readonly USER_PROFILE_MANAGE: "user:profile:manage";
    /**
     * User settings management - Manage user settings
     */
    readonly USER_SETTINGS_MANAGE: "user:settings:manage";
    /**
     * User session management - Manage user sessions
     */
    readonly USER_SESSION_MANAGE: "user:session:manage";
    /**
     * User export - Export user data
     */
    readonly USER_EXPORT: "user:export";
    /**
     * User import - Import user data
     */
    readonly USER_IMPORT: "user:import";
};
export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
/**
 * Permission categories for grouping
 */
export declare const PERMISSION_CATEGORIES: {
    readonly USER: "user";
    readonly ROLE: "role";
    readonly PERMISSION: "permission";
    readonly SYSTEM: "system";
    readonly CONTENT: "content";
    readonly PRODUCT: "product";
    readonly ORDER: "order";
    readonly PAYMENT: "payment";
    readonly ANALYTICS: "analytics";
    readonly SETTINGS: "settings";
    readonly NOTIFICATION: "notification";
    readonly SUPPORT: "support";
};
export type PermissionCategory = (typeof PERMISSION_CATEGORIES)[keyof typeof PERMISSION_CATEGORIES];
/**
 * Permission category labels for display
 */
export declare const PERMISSION_CATEGORY_LABELS: {
    readonly user: "User Management";
    readonly role: "Role Management";
    readonly permission: "Permission Management";
    readonly system: "System Management";
    readonly content: "Content Management";
    readonly product: "Product Management";
    readonly order: "Order Management";
    readonly payment: "Payment Management";
    readonly analytics: "Analytics & Reports";
    readonly settings: "Settings";
    readonly notification: "Notifications";
    readonly support: "Support";
};
export type PermissionCategoryLabel = (typeof PERMISSION_CATEGORY_LABELS)[keyof typeof PERMISSION_CATEGORY_LABELS];
/**
 * Permission description mapping
 */
export declare const PERMISSION_DESCRIPTIONS: {
    readonly 'user:manage': "Full management of users including creation, updates, and deletion";
    readonly 'user:view': "View user profiles and lists";
    readonly 'user:create': "Create new user accounts";
    readonly 'user:update': "Update user information and profiles";
    readonly 'user:delete': "Delete user accounts";
    readonly 'user:role:manage': "Assign and manage user roles";
    readonly 'user:status:manage': "Activate, suspend, or ban users";
    readonly 'user:profile:manage': "Manage user profiles including avatar and bio";
    readonly 'user:settings:manage': "Manage user account settings";
    readonly 'user:session:manage': "Manage user sessions and force logout";
    readonly 'user:export': "Export user data in various formats";
    readonly 'user:import': "Import user data from external sources";
    readonly 'role:manage': "Full management of roles including creation, updates, and deletion";
    readonly 'role:view': "View role definitions and assignments";
    readonly 'role:create': "Create new role definitions";
    readonly 'role:update': "Update role definitions and permissions";
    readonly 'role:delete': "Delete role definitions";
    readonly 'role:assign': "Assign roles to users";
    readonly 'role:permission:manage': "Manage role permissions";
    readonly 'permission:manage': "Full management of permissions";
    readonly 'permission:view': "View permission definitions";
    readonly 'permission:create': "Create new permission definitions";
    readonly 'permission:update': "Update permission definitions";
    readonly 'permission:delete': "Delete permission definitions";
    readonly 'permission:assign': "Assign permissions to roles";
    readonly 'system:view': "View system information and status";
    readonly 'system:manage': "Manage system configurations and settings";
    readonly 'system:maintenance': "Perform system maintenance tasks";
    readonly 'system:update': "Apply system updates and patches";
    readonly 'system:backup': "Create system backups";
    readonly 'system:restore': "Restore system from backups";
    readonly 'system:logs': "View and manage system logs";
    readonly 'system:monitoring': "Monitor system performance and health";
    readonly 'system:alerts': "Manage system alerts and notifications";
    readonly 'content:manage': "Full management of content";
    readonly 'content:view': "View content and content lists";
    readonly 'content:create': "Create new content";
    readonly 'content:update': "Update existing content";
    readonly 'content:delete': "Delete content";
    readonly 'content:publish': "Publish content to production";
    readonly 'content:archive': "Archive content";
    readonly 'content:approve': "Approve content before publishing";
    readonly 'content:category:manage': "Manage content categories";
    readonly 'product:manage': "Full management of products";
    readonly 'product:view': "View products and product lists";
    readonly 'product:create': "Create new products";
    readonly 'product:update': "Update existing products";
    readonly 'product:delete': "Delete products";
    readonly 'product:category:manage': "Manage product categories";
    readonly 'product:inventory:manage': "Manage product inventory";
    readonly 'product:pricing:manage': "Manage product pricing";
    readonly 'product:review:manage': "Manage product reviews";
    readonly 'product:import': "Import products in bulk";
    readonly 'product:export': "Export product data";
    readonly 'order:manage': "Full management of orders";
    readonly 'order:view': "View orders and order lists";
    readonly 'order:create': "Create new orders";
    readonly 'order:update': "Update existing orders";
    readonly 'order:delete': "Delete orders";
    readonly 'order:approve': "Approve pending orders";
    readonly 'order:cancel': "Cancel orders";
    readonly 'order:refund': "Process order refunds";
    readonly 'order:shipping:manage': "Manage order shipping";
    readonly 'order:tracking:manage': "Manage order tracking information";
    readonly 'payment:manage': "Full management of payments";
    readonly 'payment:view': "View payments and payment lists";
    readonly 'payment:process': "Process payment transactions";
    readonly 'payment:refund': "Process payment refunds";
    readonly 'payment:gateway:manage': "Manage payment gateways";
    readonly 'payment:reconciliation': "Perform payment reconciliation";
    readonly 'payment:export': "Export payment data";
    readonly 'analytics:manage': "Manage analytics configurations";
    readonly 'analytics:view': "View analytics data and dashboards";
    readonly 'analytics:export': "Export analytics data";
    readonly 'analytics:reports': "Generate analytics reports";
    readonly 'analytics:dashboard:manage': "Manage analytics dashboards";
    readonly 'settings:manage': "Full management of system settings";
    readonly 'settings:view': "View system settings";
    readonly 'settings:app': "Manage application settings";
    readonly 'settings:security': "Manage security settings";
    readonly 'settings:integration': "Manage integration settings";
    readonly 'settings:email': "Manage email settings";
    readonly 'settings:notification': "Manage notification settings";
    readonly 'notification:manage': "Full management of notifications";
    readonly 'notification:view': "View notifications";
    readonly 'notification:send': "Send notifications";
    readonly 'notification:template:manage': "Manage notification templates";
    readonly 'notification:channel:manage': "Manage notification channels";
    readonly 'support:manage': "Full management of support tickets";
    readonly 'support:view': "View support tickets";
    readonly 'support:create': "Create support tickets";
    readonly 'support:update': "Update support tickets";
    readonly 'support:close': "Close support tickets";
    readonly 'support:category:manage': "Manage support categories";
    readonly 'support:kb:manage': "Manage support knowledge base";
};
export type PermissionDescription = (typeof PERMISSION_DESCRIPTIONS)[keyof typeof PERMISSION_DESCRIPTIONS];
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
 * Uses the permission key to generate a readable name
 */
export declare const createPermissionDefinition: (permissionKey: string, category: PermissionCategory, description?: string) => PermissionDefinition;
/**
 * Helper function to get permission category
 */
export declare const getPermissionCategory: (permission: string) => PermissionCategory | null;
/**
 * Helper function to check if permission exists
 */
export declare const isPermissionValid: (permission: string) => permission is Permission;
/**
 * Helper function to get all permissions by category
 */
export declare const getPermissionsByCategory: (category: PermissionCategory) => Permission[];
/**
 * Helper function to get category label
 */
export declare const getCategoryLabel: (category: PermissionCategory) => string;
/**
 * Helper function to get permission description
 */
export declare const getPermissionDescription: (permission: Permission) => string;
/**
 * All permission constants grouped for export
 */
export declare const PERMISSION_CONSTANTS: {
    readonly PERMISSIONS: {
        /**
         * Manage support - Manage support tickets
         */
        readonly SUPPORT_MANAGE: "support:manage";
        /**
         * View support - View support tickets
         */
        readonly SUPPORT_VIEW: "support:view";
        /**
         * Create support tickets - Create support tickets
         */
        readonly SUPPORT_CREATE: "support:create";
        /**
         * Update support tickets - Update support tickets
         */
        readonly SUPPORT_UPDATE: "support:update";
        /**
         * Close support tickets - Close support tickets
         */
        readonly SUPPORT_CLOSE: "support:close";
        /**
         * Support categories - Manage support categories
         */
        readonly SUPPORT_CATEGORY_MANAGE: "support:category:manage";
        /**
         * Support knowledge base - Manage knowledge base
         */
        readonly SUPPORT_KB_MANAGE: "support:kb:manage";
        /**
         * Manage notifications - Send and manage notifications
         */
        readonly NOTIFICATION_MANAGE: "notification:manage";
        /**
         * View notifications - View notifications
         */
        readonly NOTIFICATION_VIEW: "notification:view";
        /**
         * Send notifications - Send notifications
         */
        readonly NOTIFICATION_SEND: "notification:send";
        /**
         * Notification templates - Manage notification templates
         */
        readonly NOTIFICATION_TEMPLATE_MANAGE: "notification:template:manage";
        /**
         * Notification channels - Manage notification channels
         */
        readonly NOTIFICATION_CHANNEL_MANAGE: "notification:channel:manage";
        /**
         * Manage settings - Configure system settings
         */
        readonly SETTINGS_MANAGE: "settings:manage";
        /**
         * View settings - View system settings
         */
        readonly SETTINGS_VIEW: "settings:view";
        /**
         * Application settings - Manage application settings
         */
        readonly SETTINGS_APP: "settings:app";
        /**
         * Security settings - Manage security settings
         */
        readonly SETTINGS_SECURITY: "settings:security";
        /**
         * Integration settings - Manage integration settings
         */
        readonly SETTINGS_INTEGRATION: "settings:integration";
        /**
         * Email settings - Manage email settings
         */
        readonly SETTINGS_EMAIL: "settings:email";
        /**
         * Notification settings - Manage notification settings
         */
        readonly SETTINGS_NOTIFICATION: "settings:notification";
        /**
         * Manage analytics - Configure analytics
         */
        readonly ANALYTICS_MANAGE: "analytics:manage";
        /**
         * View analytics - View analytics data
         */
        readonly ANALYTICS_VIEW: "analytics:view";
        /**
         * Export analytics - Export analytics data
         */
        readonly ANALYTICS_EXPORT: "analytics:export";
        /**
         * Analytics reports - Generate analytics reports
         */
        readonly ANALYTICS_REPORTS: "analytics:reports";
        /**
         * Analytics dashboards - Manage analytics dashboards
         */
        readonly ANALYTICS_DASHBOARD_MANAGE: "analytics:dashboard:manage";
        /**
         * Manage payments - Process and manage payments
         */
        readonly PAYMENT_MANAGE: "payment:manage";
        /**
         * View payments - List and view payments
         */
        readonly PAYMENT_VIEW: "payment:view";
        /**
         * Process payments - Process payment transactions
         */
        readonly PAYMENT_PROCESS: "payment:process";
        /**
         * Refund payments - Process payment refunds
         */
        readonly PAYMENT_REFUND: "payment:refund";
        /**
         * Payment gateway management - Manage payment gateways
         */
        readonly PAYMENT_GATEWAY_MANAGE: "payment:gateway:manage";
        /**
         * Payment reconciliation - Reconcile payments
         */
        readonly PAYMENT_RECONCILIATION: "payment:reconciliation";
        /**
         * Payment export - Export payment data
         */
        readonly PAYMENT_EXPORT: "payment:export";
        /**
         * Manage orders - Create, update, delete orders
         */
        readonly ORDER_MANAGE: "order:manage";
        /**
         * View orders - List and view orders
         */
        readonly ORDER_VIEW: "order:view";
        /**
         * Create orders - Create new orders
         */
        readonly ORDER_CREATE: "order:create";
        /**
         * Update orders - Modify orders
         */
        readonly ORDER_UPDATE: "order:update";
        /**
         * Delete orders - Remove orders
         */
        readonly ORDER_DELETE: "order:delete";
        /**
         * Approve orders - Approve pending orders
         */
        readonly ORDER_APPROVE: "order:approve";
        /**
         * Cancel orders - Cancel orders
         */
        readonly ORDER_CANCEL: "order:cancel";
        /**
         * Refund orders - Process order refunds
         */
        readonly ORDER_REFUND: "order:refund";
        /**
         * Order shipping - Manage order shipping
         */
        readonly ORDER_SHIPPING_MANAGE: "order:shipping:manage";
        /**
         * Order tracking - Manage order tracking
         */
        readonly ORDER_TRACKING_MANAGE: "order:tracking:manage";
        /**
         * Manage products - Create, update, delete products
         */
        readonly PRODUCT_MANAGE: "product:manage";
        /**
         * View products - List and view products
         */
        readonly PRODUCT_VIEW: "product:view";
        /**
         * Create products - Create new products
         */
        readonly PRODUCT_CREATE: "product:create";
        /**
         * Update products - Modify products
         */
        readonly PRODUCT_UPDATE: "product:update";
        /**
         * Delete products - Remove products
         */
        readonly PRODUCT_DELETE: "product:delete";
        /**
         * Product categories - Manage product categories
         */
        readonly PRODUCT_CATEGORY_MANAGE: "product:category:manage";
        /**
         * Product inventory - Manage product inventory
         */
        readonly PRODUCT_INVENTORY_MANAGE: "product:inventory:manage";
        /**
         * Product pricing - Manage product pricing
         */
        readonly PRODUCT_PRICING_MANAGE: "product:pricing:manage";
        /**
         * Product reviews - Manage product reviews
         */
        readonly PRODUCT_REVIEW_MANAGE: "product:review:manage";
        /**
         * Product import - Import products
         */
        readonly PRODUCT_IMPORT: "product:import";
        /**
         * Product export - Export products
         */
        readonly PRODUCT_EXPORT: "product:export";
        /**
         * Manage content - Create, update, delete content
         */
        readonly CONTENT_MANAGE: "content:manage";
        /**
         * View content - List and view content
         */
        readonly CONTENT_VIEW: "content:view";
        /**
         * Create content - Create new content
         */
        readonly CONTENT_CREATE: "content:create";
        /**
         * Update content - Modify content
         */
        readonly CONTENT_UPDATE: "content:update";
        /**
         * Delete content - Remove content
         */
        readonly CONTENT_DELETE: "content:delete";
        /**
         * Publish content - Publish content to production
         */
        readonly CONTENT_PUBLISH: "content:publish";
        /**
         * Archive content - Archive content
         */
        readonly CONTENT_ARCHIVE: "content:archive";
        /**
         * Content approval - Approve content before publishing
         */
        readonly CONTENT_APPROVE: "content:approve";
        /**
         * Content categories - Manage content categories
         */
        readonly CONTENT_CATEGORY_MANAGE: "content:category:manage";
        /**
         * View system - View system information and status
         */
        readonly SYSTEM_VIEW: "system:view";
        /**
         * Manage system - Configure system settings
         */
        readonly SYSTEM_MANAGE: "system:manage";
        /**
         * System maintenance - Perform system maintenance tasks
         */
        readonly SYSTEM_MAINTENANCE: "system:maintenance";
        /**
         * System updates - Apply system updates
         */
        readonly SYSTEM_UPDATE: "system:update";
        /**
         * System backup - Backup system data
         */
        readonly SYSTEM_BACKUP: "system:backup";
        /**
         * System restore - Restore system from backup
         */
        readonly SYSTEM_RESTORE: "system:restore";
        /**
         * System logs - View system logs
         */
        readonly SYSTEM_LOGS: "system:logs";
        /**
         * System monitoring - Monitor system performance
         */
        readonly SYSTEM_MONITORING: "system:monitoring";
        /**
         * System alerts - Manage system alerts
         */
        readonly SYSTEM_ALERTS: "system:alerts";
        /**
         * Manage permissions - Create, update, delete permissions
         */
        readonly PERMISSION_MANAGE: "permission:manage";
        /**
         * View permissions - List and view permission details
         */
        readonly PERMISSION_VIEW: "permission:view";
        /**
         * Create permissions - Create new permissions
         */
        readonly PERMISSION_CREATE: "permission:create";
        /**
         * Update permissions - Modify permission information
         */
        readonly PERMISSION_UPDATE: "permission:update";
        /**
         * Delete permissions - Remove permissions from the system
         */
        readonly PERMISSION_DELETE: "permission:delete";
        /**
         * Assign permissions - Assign permissions to roles
         */
        readonly PERMISSION_ASSIGN: "permission:assign";
        /**
         * Manage roles - Create, update, delete roles
         */
        readonly ROLE_MANAGE: "role:manage";
        /**
         * View roles - List and view role details
         */
        readonly ROLE_VIEW: "role:view";
        /**
         * Create roles - Create new roles
         */
        readonly ROLE_CREATE: "role:create";
        /**
         * Update roles - Modify role information
         */
        readonly ROLE_UPDATE: "role:update";
        /**
         * Delete roles - Remove roles from the system
         */
        readonly ROLE_DELETE: "role:delete";
        /**
         * Role assignment - Assign roles to users
         */
        readonly ROLE_ASSIGN: "role:assign";
        /**
         * Role permissions management - Manage role permissions
         */
        readonly ROLE_PERMISSION_MANAGE: "role:permission:manage";
        /**
         * Manage users - Create, update, delete users
         */
        readonly USER_MANAGE: "user:manage";
        /**
         * View users - List and view user details
         */
        readonly USER_VIEW: "user:view";
        /**
         * Create users - Register new users
         */
        readonly USER_CREATE: "user:create";
        /**
         * Update users - Modify user information
         */
        readonly USER_UPDATE: "user:update";
        /**
         * Delete users - Remove users from the system
         */
        readonly USER_DELETE: "user:delete";
        /**
         * User role management - Assign or change user roles
         */
        readonly USER_ROLE_MANAGE: "user:role:manage";
        /**
         * User status management - Activate, suspend, or ban users
         */
        readonly USER_STATUS_MANAGE: "user:status:manage";
        /**
         * User profile management - Manage user profiles
         */
        readonly USER_PROFILE_MANAGE: "user:profile:manage";
        /**
         * User settings management - Manage user settings
         */
        readonly USER_SETTINGS_MANAGE: "user:settings:manage";
        /**
         * User session management - Manage user sessions
         */
        readonly USER_SESSION_MANAGE: "user:session:manage";
        /**
         * User export - Export user data
         */
        readonly USER_EXPORT: "user:export";
        /**
         * User import - Import user data
         */
        readonly USER_IMPORT: "user:import";
    };
    readonly CATEGORIES: {
        readonly USER: "user";
        readonly ROLE: "role";
        readonly PERMISSION: "permission";
        readonly SYSTEM: "system";
        readonly CONTENT: "content";
        readonly PRODUCT: "product";
        readonly ORDER: "order";
        readonly PAYMENT: "payment";
        readonly ANALYTICS: "analytics";
        readonly SETTINGS: "settings";
        readonly NOTIFICATION: "notification";
        readonly SUPPORT: "support";
    };
    readonly CATEGORY_LABELS: {
        readonly user: "User Management";
        readonly role: "Role Management";
        readonly permission: "Permission Management";
        readonly system: "System Management";
        readonly content: "Content Management";
        readonly product: "Product Management";
        readonly order: "Order Management";
        readonly payment: "Payment Management";
        readonly analytics: "Analytics & Reports";
        readonly settings: "Settings";
        readonly notification: "Notifications";
        readonly support: "Support";
    };
    readonly DESCRIPTIONS: {
        readonly 'user:manage': "Full management of users including creation, updates, and deletion";
        readonly 'user:view': "View user profiles and lists";
        readonly 'user:create': "Create new user accounts";
        readonly 'user:update': "Update user information and profiles";
        readonly 'user:delete': "Delete user accounts";
        readonly 'user:role:manage': "Assign and manage user roles";
        readonly 'user:status:manage': "Activate, suspend, or ban users";
        readonly 'user:profile:manage': "Manage user profiles including avatar and bio";
        readonly 'user:settings:manage': "Manage user account settings";
        readonly 'user:session:manage': "Manage user sessions and force logout";
        readonly 'user:export': "Export user data in various formats";
        readonly 'user:import': "Import user data from external sources";
        readonly 'role:manage': "Full management of roles including creation, updates, and deletion";
        readonly 'role:view': "View role definitions and assignments";
        readonly 'role:create': "Create new role definitions";
        readonly 'role:update': "Update role definitions and permissions";
        readonly 'role:delete': "Delete role definitions";
        readonly 'role:assign': "Assign roles to users";
        readonly 'role:permission:manage': "Manage role permissions";
        readonly 'permission:manage': "Full management of permissions";
        readonly 'permission:view': "View permission definitions";
        readonly 'permission:create': "Create new permission definitions";
        readonly 'permission:update': "Update permission definitions";
        readonly 'permission:delete': "Delete permission definitions";
        readonly 'permission:assign': "Assign permissions to roles";
        readonly 'system:view': "View system information and status";
        readonly 'system:manage': "Manage system configurations and settings";
        readonly 'system:maintenance': "Perform system maintenance tasks";
        readonly 'system:update': "Apply system updates and patches";
        readonly 'system:backup': "Create system backups";
        readonly 'system:restore': "Restore system from backups";
        readonly 'system:logs': "View and manage system logs";
        readonly 'system:monitoring': "Monitor system performance and health";
        readonly 'system:alerts': "Manage system alerts and notifications";
        readonly 'content:manage': "Full management of content";
        readonly 'content:view': "View content and content lists";
        readonly 'content:create': "Create new content";
        readonly 'content:update': "Update existing content";
        readonly 'content:delete': "Delete content";
        readonly 'content:publish': "Publish content to production";
        readonly 'content:archive': "Archive content";
        readonly 'content:approve': "Approve content before publishing";
        readonly 'content:category:manage': "Manage content categories";
        readonly 'product:manage': "Full management of products";
        readonly 'product:view': "View products and product lists";
        readonly 'product:create': "Create new products";
        readonly 'product:update': "Update existing products";
        readonly 'product:delete': "Delete products";
        readonly 'product:category:manage': "Manage product categories";
        readonly 'product:inventory:manage': "Manage product inventory";
        readonly 'product:pricing:manage': "Manage product pricing";
        readonly 'product:review:manage': "Manage product reviews";
        readonly 'product:import': "Import products in bulk";
        readonly 'product:export': "Export product data";
        readonly 'order:manage': "Full management of orders";
        readonly 'order:view': "View orders and order lists";
        readonly 'order:create': "Create new orders";
        readonly 'order:update': "Update existing orders";
        readonly 'order:delete': "Delete orders";
        readonly 'order:approve': "Approve pending orders";
        readonly 'order:cancel': "Cancel orders";
        readonly 'order:refund': "Process order refunds";
        readonly 'order:shipping:manage': "Manage order shipping";
        readonly 'order:tracking:manage': "Manage order tracking information";
        readonly 'payment:manage': "Full management of payments";
        readonly 'payment:view': "View payments and payment lists";
        readonly 'payment:process': "Process payment transactions";
        readonly 'payment:refund': "Process payment refunds";
        readonly 'payment:gateway:manage': "Manage payment gateways";
        readonly 'payment:reconciliation': "Perform payment reconciliation";
        readonly 'payment:export': "Export payment data";
        readonly 'analytics:manage': "Manage analytics configurations";
        readonly 'analytics:view': "View analytics data and dashboards";
        readonly 'analytics:export': "Export analytics data";
        readonly 'analytics:reports': "Generate analytics reports";
        readonly 'analytics:dashboard:manage': "Manage analytics dashboards";
        readonly 'settings:manage': "Full management of system settings";
        readonly 'settings:view': "View system settings";
        readonly 'settings:app': "Manage application settings";
        readonly 'settings:security': "Manage security settings";
        readonly 'settings:integration': "Manage integration settings";
        readonly 'settings:email': "Manage email settings";
        readonly 'settings:notification': "Manage notification settings";
        readonly 'notification:manage': "Full management of notifications";
        readonly 'notification:view': "View notifications";
        readonly 'notification:send': "Send notifications";
        readonly 'notification:template:manage': "Manage notification templates";
        readonly 'notification:channel:manage': "Manage notification channels";
        readonly 'support:manage': "Full management of support tickets";
        readonly 'support:view': "View support tickets";
        readonly 'support:create': "Create support tickets";
        readonly 'support:update': "Update support tickets";
        readonly 'support:close': "Close support tickets";
        readonly 'support:category:manage': "Manage support categories";
        readonly 'support:kb:manage': "Manage support knowledge base";
    };
    readonly USER: {
        /**
         * Manage users - Create, update, delete users
         */
        readonly USER_MANAGE: "user:manage";
        /**
         * View users - List and view user details
         */
        readonly USER_VIEW: "user:view";
        /**
         * Create users - Register new users
         */
        readonly USER_CREATE: "user:create";
        /**
         * Update users - Modify user information
         */
        readonly USER_UPDATE: "user:update";
        /**
         * Delete users - Remove users from the system
         */
        readonly USER_DELETE: "user:delete";
        /**
         * User role management - Assign or change user roles
         */
        readonly USER_ROLE_MANAGE: "user:role:manage";
        /**
         * User status management - Activate, suspend, or ban users
         */
        readonly USER_STATUS_MANAGE: "user:status:manage";
        /**
         * User profile management - Manage user profiles
         */
        readonly USER_PROFILE_MANAGE: "user:profile:manage";
        /**
         * User settings management - Manage user settings
         */
        readonly USER_SETTINGS_MANAGE: "user:settings:manage";
        /**
         * User session management - Manage user sessions
         */
        readonly USER_SESSION_MANAGE: "user:session:manage";
        /**
         * User export - Export user data
         */
        readonly USER_EXPORT: "user:export";
        /**
         * User import - Import user data
         */
        readonly USER_IMPORT: "user:import";
    };
    readonly ROLE: {
        /**
         * Manage roles - Create, update, delete roles
         */
        readonly ROLE_MANAGE: "role:manage";
        /**
         * View roles - List and view role details
         */
        readonly ROLE_VIEW: "role:view";
        /**
         * Create roles - Create new roles
         */
        readonly ROLE_CREATE: "role:create";
        /**
         * Update roles - Modify role information
         */
        readonly ROLE_UPDATE: "role:update";
        /**
         * Delete roles - Remove roles from the system
         */
        readonly ROLE_DELETE: "role:delete";
        /**
         * Role assignment - Assign roles to users
         */
        readonly ROLE_ASSIGN: "role:assign";
        /**
         * Role permissions management - Manage role permissions
         */
        readonly ROLE_PERMISSION_MANAGE: "role:permission:manage";
    };
    readonly PERMISSION_MANAGEMENT: {
        /**
         * Manage permissions - Create, update, delete permissions
         */
        readonly PERMISSION_MANAGE: "permission:manage";
        /**
         * View permissions - List and view permission details
         */
        readonly PERMISSION_VIEW: "permission:view";
        /**
         * Create permissions - Create new permissions
         */
        readonly PERMISSION_CREATE: "permission:create";
        /**
         * Update permissions - Modify permission information
         */
        readonly PERMISSION_UPDATE: "permission:update";
        /**
         * Delete permissions - Remove permissions from the system
         */
        readonly PERMISSION_DELETE: "permission:delete";
        /**
         * Assign permissions - Assign permissions to roles
         */
        readonly PERMISSION_ASSIGN: "permission:assign";
    };
    readonly SYSTEM: {
        /**
         * View system - View system information and status
         */
        readonly SYSTEM_VIEW: "system:view";
        /**
         * Manage system - Configure system settings
         */
        readonly SYSTEM_MANAGE: "system:manage";
        /**
         * System maintenance - Perform system maintenance tasks
         */
        readonly SYSTEM_MAINTENANCE: "system:maintenance";
        /**
         * System updates - Apply system updates
         */
        readonly SYSTEM_UPDATE: "system:update";
        /**
         * System backup - Backup system data
         */
        readonly SYSTEM_BACKUP: "system:backup";
        /**
         * System restore - Restore system from backup
         */
        readonly SYSTEM_RESTORE: "system:restore";
        /**
         * System logs - View system logs
         */
        readonly SYSTEM_LOGS: "system:logs";
        /**
         * System monitoring - Monitor system performance
         */
        readonly SYSTEM_MONITORING: "system:monitoring";
        /**
         * System alerts - Manage system alerts
         */
        readonly SYSTEM_ALERTS: "system:alerts";
    };
    readonly CONTENT: {
        /**
         * Manage content - Create, update, delete content
         */
        readonly CONTENT_MANAGE: "content:manage";
        /**
         * View content - List and view content
         */
        readonly CONTENT_VIEW: "content:view";
        /**
         * Create content - Create new content
         */
        readonly CONTENT_CREATE: "content:create";
        /**
         * Update content - Modify content
         */
        readonly CONTENT_UPDATE: "content:update";
        /**
         * Delete content - Remove content
         */
        readonly CONTENT_DELETE: "content:delete";
        /**
         * Publish content - Publish content to production
         */
        readonly CONTENT_PUBLISH: "content:publish";
        /**
         * Archive content - Archive content
         */
        readonly CONTENT_ARCHIVE: "content:archive";
        /**
         * Content approval - Approve content before publishing
         */
        readonly CONTENT_APPROVE: "content:approve";
        /**
         * Content categories - Manage content categories
         */
        readonly CONTENT_CATEGORY_MANAGE: "content:category:manage";
    };
    readonly PRODUCT: {
        /**
         * Manage products - Create, update, delete products
         */
        readonly PRODUCT_MANAGE: "product:manage";
        /**
         * View products - List and view products
         */
        readonly PRODUCT_VIEW: "product:view";
        /**
         * Create products - Create new products
         */
        readonly PRODUCT_CREATE: "product:create";
        /**
         * Update products - Modify products
         */
        readonly PRODUCT_UPDATE: "product:update";
        /**
         * Delete products - Remove products
         */
        readonly PRODUCT_DELETE: "product:delete";
        /**
         * Product categories - Manage product categories
         */
        readonly PRODUCT_CATEGORY_MANAGE: "product:category:manage";
        /**
         * Product inventory - Manage product inventory
         */
        readonly PRODUCT_INVENTORY_MANAGE: "product:inventory:manage";
        /**
         * Product pricing - Manage product pricing
         */
        readonly PRODUCT_PRICING_MANAGE: "product:pricing:manage";
        /**
         * Product reviews - Manage product reviews
         */
        readonly PRODUCT_REVIEW_MANAGE: "product:review:manage";
        /**
         * Product import - Import products
         */
        readonly PRODUCT_IMPORT: "product:import";
        /**
         * Product export - Export products
         */
        readonly PRODUCT_EXPORT: "product:export";
    };
    readonly ORDER: {
        /**
         * Manage orders - Create, update, delete orders
         */
        readonly ORDER_MANAGE: "order:manage";
        /**
         * View orders - List and view orders
         */
        readonly ORDER_VIEW: "order:view";
        /**
         * Create orders - Create new orders
         */
        readonly ORDER_CREATE: "order:create";
        /**
         * Update orders - Modify orders
         */
        readonly ORDER_UPDATE: "order:update";
        /**
         * Delete orders - Remove orders
         */
        readonly ORDER_DELETE: "order:delete";
        /**
         * Approve orders - Approve pending orders
         */
        readonly ORDER_APPROVE: "order:approve";
        /**
         * Cancel orders - Cancel orders
         */
        readonly ORDER_CANCEL: "order:cancel";
        /**
         * Refund orders - Process order refunds
         */
        readonly ORDER_REFUND: "order:refund";
        /**
         * Order shipping - Manage order shipping
         */
        readonly ORDER_SHIPPING_MANAGE: "order:shipping:manage";
        /**
         * Order tracking - Manage order tracking
         */
        readonly ORDER_TRACKING_MANAGE: "order:tracking:manage";
    };
    readonly PAYMENT: {
        /**
         * Manage payments - Process and manage payments
         */
        readonly PAYMENT_MANAGE: "payment:manage";
        /**
         * View payments - List and view payments
         */
        readonly PAYMENT_VIEW: "payment:view";
        /**
         * Process payments - Process payment transactions
         */
        readonly PAYMENT_PROCESS: "payment:process";
        /**
         * Refund payments - Process payment refunds
         */
        readonly PAYMENT_REFUND: "payment:refund";
        /**
         * Payment gateway management - Manage payment gateways
         */
        readonly PAYMENT_GATEWAY_MANAGE: "payment:gateway:manage";
        /**
         * Payment reconciliation - Reconcile payments
         */
        readonly PAYMENT_RECONCILIATION: "payment:reconciliation";
        /**
         * Payment export - Export payment data
         */
        readonly PAYMENT_EXPORT: "payment:export";
    };
    readonly ANALYTICS: {
        /**
         * Manage analytics - Configure analytics
         */
        readonly ANALYTICS_MANAGE: "analytics:manage";
        /**
         * View analytics - View analytics data
         */
        readonly ANALYTICS_VIEW: "analytics:view";
        /**
         * Export analytics - Export analytics data
         */
        readonly ANALYTICS_EXPORT: "analytics:export";
        /**
         * Analytics reports - Generate analytics reports
         */
        readonly ANALYTICS_REPORTS: "analytics:reports";
        /**
         * Analytics dashboards - Manage analytics dashboards
         */
        readonly ANALYTICS_DASHBOARD_MANAGE: "analytics:dashboard:manage";
    };
    readonly SETTINGS: {
        /**
         * Manage settings - Configure system settings
         */
        readonly SETTINGS_MANAGE: "settings:manage";
        /**
         * View settings - View system settings
         */
        readonly SETTINGS_VIEW: "settings:view";
        /**
         * Application settings - Manage application settings
         */
        readonly SETTINGS_APP: "settings:app";
        /**
         * Security settings - Manage security settings
         */
        readonly SETTINGS_SECURITY: "settings:security";
        /**
         * Integration settings - Manage integration settings
         */
        readonly SETTINGS_INTEGRATION: "settings:integration";
        /**
         * Email settings - Manage email settings
         */
        readonly SETTINGS_EMAIL: "settings:email";
        /**
         * Notification settings - Manage notification settings
         */
        readonly SETTINGS_NOTIFICATION: "settings:notification";
    };
    readonly NOTIFICATION: {
        /**
         * Manage notifications - Send and manage notifications
         */
        readonly NOTIFICATION_MANAGE: "notification:manage";
        /**
         * View notifications - View notifications
         */
        readonly NOTIFICATION_VIEW: "notification:view";
        /**
         * Send notifications - Send notifications
         */
        readonly NOTIFICATION_SEND: "notification:send";
        /**
         * Notification templates - Manage notification templates
         */
        readonly NOTIFICATION_TEMPLATE_MANAGE: "notification:template:manage";
        /**
         * Notification channels - Manage notification channels
         */
        readonly NOTIFICATION_CHANNEL_MANAGE: "notification:channel:manage";
    };
    readonly SUPPORT: {
        /**
         * Manage support - Manage support tickets
         */
        readonly SUPPORT_MANAGE: "support:manage";
        /**
         * View support - View support tickets
         */
        readonly SUPPORT_VIEW: "support:view";
        /**
         * Create support tickets - Create support tickets
         */
        readonly SUPPORT_CREATE: "support:create";
        /**
         * Update support tickets - Update support tickets
         */
        readonly SUPPORT_UPDATE: "support:update";
        /**
         * Close support tickets - Close support tickets
         */
        readonly SUPPORT_CLOSE: "support:close";
        /**
         * Support categories - Manage support categories
         */
        readonly SUPPORT_CATEGORY_MANAGE: "support:category:manage";
        /**
         * Support knowledge base - Manage knowledge base
         */
        readonly SUPPORT_KB_MANAGE: "support:kb:manage";
    };
};
/**
 * All permissions for easy export
 */
export declare const ALL_PERMISSIONS: {
    /**
     * Manage support - Manage support tickets
     */
    readonly SUPPORT_MANAGE: "support:manage";
    /**
     * View support - View support tickets
     */
    readonly SUPPORT_VIEW: "support:view";
    /**
     * Create support tickets - Create support tickets
     */
    readonly SUPPORT_CREATE: "support:create";
    /**
     * Update support tickets - Update support tickets
     */
    readonly SUPPORT_UPDATE: "support:update";
    /**
     * Close support tickets - Close support tickets
     */
    readonly SUPPORT_CLOSE: "support:close";
    /**
     * Support categories - Manage support categories
     */
    readonly SUPPORT_CATEGORY_MANAGE: "support:category:manage";
    /**
     * Support knowledge base - Manage knowledge base
     */
    readonly SUPPORT_KB_MANAGE: "support:kb:manage";
    /**
     * Manage notifications - Send and manage notifications
     */
    readonly NOTIFICATION_MANAGE: "notification:manage";
    /**
     * View notifications - View notifications
     */
    readonly NOTIFICATION_VIEW: "notification:view";
    /**
     * Send notifications - Send notifications
     */
    readonly NOTIFICATION_SEND: "notification:send";
    /**
     * Notification templates - Manage notification templates
     */
    readonly NOTIFICATION_TEMPLATE_MANAGE: "notification:template:manage";
    /**
     * Notification channels - Manage notification channels
     */
    readonly NOTIFICATION_CHANNEL_MANAGE: "notification:channel:manage";
    /**
     * Manage settings - Configure system settings
     */
    readonly SETTINGS_MANAGE: "settings:manage";
    /**
     * View settings - View system settings
     */
    readonly SETTINGS_VIEW: "settings:view";
    /**
     * Application settings - Manage application settings
     */
    readonly SETTINGS_APP: "settings:app";
    /**
     * Security settings - Manage security settings
     */
    readonly SETTINGS_SECURITY: "settings:security";
    /**
     * Integration settings - Manage integration settings
     */
    readonly SETTINGS_INTEGRATION: "settings:integration";
    /**
     * Email settings - Manage email settings
     */
    readonly SETTINGS_EMAIL: "settings:email";
    /**
     * Notification settings - Manage notification settings
     */
    readonly SETTINGS_NOTIFICATION: "settings:notification";
    /**
     * Manage analytics - Configure analytics
     */
    readonly ANALYTICS_MANAGE: "analytics:manage";
    /**
     * View analytics - View analytics data
     */
    readonly ANALYTICS_VIEW: "analytics:view";
    /**
     * Export analytics - Export analytics data
     */
    readonly ANALYTICS_EXPORT: "analytics:export";
    /**
     * Analytics reports - Generate analytics reports
     */
    readonly ANALYTICS_REPORTS: "analytics:reports";
    /**
     * Analytics dashboards - Manage analytics dashboards
     */
    readonly ANALYTICS_DASHBOARD_MANAGE: "analytics:dashboard:manage";
    /**
     * Manage payments - Process and manage payments
     */
    readonly PAYMENT_MANAGE: "payment:manage";
    /**
     * View payments - List and view payments
     */
    readonly PAYMENT_VIEW: "payment:view";
    /**
     * Process payments - Process payment transactions
     */
    readonly PAYMENT_PROCESS: "payment:process";
    /**
     * Refund payments - Process payment refunds
     */
    readonly PAYMENT_REFUND: "payment:refund";
    /**
     * Payment gateway management - Manage payment gateways
     */
    readonly PAYMENT_GATEWAY_MANAGE: "payment:gateway:manage";
    /**
     * Payment reconciliation - Reconcile payments
     */
    readonly PAYMENT_RECONCILIATION: "payment:reconciliation";
    /**
     * Payment export - Export payment data
     */
    readonly PAYMENT_EXPORT: "payment:export";
    /**
     * Manage orders - Create, update, delete orders
     */
    readonly ORDER_MANAGE: "order:manage";
    /**
     * View orders - List and view orders
     */
    readonly ORDER_VIEW: "order:view";
    /**
     * Create orders - Create new orders
     */
    readonly ORDER_CREATE: "order:create";
    /**
     * Update orders - Modify orders
     */
    readonly ORDER_UPDATE: "order:update";
    /**
     * Delete orders - Remove orders
     */
    readonly ORDER_DELETE: "order:delete";
    /**
     * Approve orders - Approve pending orders
     */
    readonly ORDER_APPROVE: "order:approve";
    /**
     * Cancel orders - Cancel orders
     */
    readonly ORDER_CANCEL: "order:cancel";
    /**
     * Refund orders - Process order refunds
     */
    readonly ORDER_REFUND: "order:refund";
    /**
     * Order shipping - Manage order shipping
     */
    readonly ORDER_SHIPPING_MANAGE: "order:shipping:manage";
    /**
     * Order tracking - Manage order tracking
     */
    readonly ORDER_TRACKING_MANAGE: "order:tracking:manage";
    /**
     * Manage products - Create, update, delete products
     */
    readonly PRODUCT_MANAGE: "product:manage";
    /**
     * View products - List and view products
     */
    readonly PRODUCT_VIEW: "product:view";
    /**
     * Create products - Create new products
     */
    readonly PRODUCT_CREATE: "product:create";
    /**
     * Update products - Modify products
     */
    readonly PRODUCT_UPDATE: "product:update";
    /**
     * Delete products - Remove products
     */
    readonly PRODUCT_DELETE: "product:delete";
    /**
     * Product categories - Manage product categories
     */
    readonly PRODUCT_CATEGORY_MANAGE: "product:category:manage";
    /**
     * Product inventory - Manage product inventory
     */
    readonly PRODUCT_INVENTORY_MANAGE: "product:inventory:manage";
    /**
     * Product pricing - Manage product pricing
     */
    readonly PRODUCT_PRICING_MANAGE: "product:pricing:manage";
    /**
     * Product reviews - Manage product reviews
     */
    readonly PRODUCT_REVIEW_MANAGE: "product:review:manage";
    /**
     * Product import - Import products
     */
    readonly PRODUCT_IMPORT: "product:import";
    /**
     * Product export - Export products
     */
    readonly PRODUCT_EXPORT: "product:export";
    /**
     * Manage content - Create, update, delete content
     */
    readonly CONTENT_MANAGE: "content:manage";
    /**
     * View content - List and view content
     */
    readonly CONTENT_VIEW: "content:view";
    /**
     * Create content - Create new content
     */
    readonly CONTENT_CREATE: "content:create";
    /**
     * Update content - Modify content
     */
    readonly CONTENT_UPDATE: "content:update";
    /**
     * Delete content - Remove content
     */
    readonly CONTENT_DELETE: "content:delete";
    /**
     * Publish content - Publish content to production
     */
    readonly CONTENT_PUBLISH: "content:publish";
    /**
     * Archive content - Archive content
     */
    readonly CONTENT_ARCHIVE: "content:archive";
    /**
     * Content approval - Approve content before publishing
     */
    readonly CONTENT_APPROVE: "content:approve";
    /**
     * Content categories - Manage content categories
     */
    readonly CONTENT_CATEGORY_MANAGE: "content:category:manage";
    /**
     * View system - View system information and status
     */
    readonly SYSTEM_VIEW: "system:view";
    /**
     * Manage system - Configure system settings
     */
    readonly SYSTEM_MANAGE: "system:manage";
    /**
     * System maintenance - Perform system maintenance tasks
     */
    readonly SYSTEM_MAINTENANCE: "system:maintenance";
    /**
     * System updates - Apply system updates
     */
    readonly SYSTEM_UPDATE: "system:update";
    /**
     * System backup - Backup system data
     */
    readonly SYSTEM_BACKUP: "system:backup";
    /**
     * System restore - Restore system from backup
     */
    readonly SYSTEM_RESTORE: "system:restore";
    /**
     * System logs - View system logs
     */
    readonly SYSTEM_LOGS: "system:logs";
    /**
     * System monitoring - Monitor system performance
     */
    readonly SYSTEM_MONITORING: "system:monitoring";
    /**
     * System alerts - Manage system alerts
     */
    readonly SYSTEM_ALERTS: "system:alerts";
    /**
     * Manage permissions - Create, update, delete permissions
     */
    readonly PERMISSION_MANAGE: "permission:manage";
    /**
     * View permissions - List and view permission details
     */
    readonly PERMISSION_VIEW: "permission:view";
    /**
     * Create permissions - Create new permissions
     */
    readonly PERMISSION_CREATE: "permission:create";
    /**
     * Update permissions - Modify permission information
     */
    readonly PERMISSION_UPDATE: "permission:update";
    /**
     * Delete permissions - Remove permissions from the system
     */
    readonly PERMISSION_DELETE: "permission:delete";
    /**
     * Assign permissions - Assign permissions to roles
     */
    readonly PERMISSION_ASSIGN: "permission:assign";
    /**
     * Manage roles - Create, update, delete roles
     */
    readonly ROLE_MANAGE: "role:manage";
    /**
     * View roles - List and view role details
     */
    readonly ROLE_VIEW: "role:view";
    /**
     * Create roles - Create new roles
     */
    readonly ROLE_CREATE: "role:create";
    /**
     * Update roles - Modify role information
     */
    readonly ROLE_UPDATE: "role:update";
    /**
     * Delete roles - Remove roles from the system
     */
    readonly ROLE_DELETE: "role:delete";
    /**
     * Role assignment - Assign roles to users
     */
    readonly ROLE_ASSIGN: "role:assign";
    /**
     * Role permissions management - Manage role permissions
     */
    readonly ROLE_PERMISSION_MANAGE: "role:permission:manage";
    /**
     * Manage users - Create, update, delete users
     */
    readonly USER_MANAGE: "user:manage";
    /**
     * View users - List and view user details
     */
    readonly USER_VIEW: "user:view";
    /**
     * Create users - Register new users
     */
    readonly USER_CREATE: "user:create";
    /**
     * Update users - Modify user information
     */
    readonly USER_UPDATE: "user:update";
    /**
     * Delete users - Remove users from the system
     */
    readonly USER_DELETE: "user:delete";
    /**
     * User role management - Assign or change user roles
     */
    readonly USER_ROLE_MANAGE: "user:role:manage";
    /**
     * User status management - Activate, suspend, or ban users
     */
    readonly USER_STATUS_MANAGE: "user:status:manage";
    /**
     * User profile management - Manage user profiles
     */
    readonly USER_PROFILE_MANAGE: "user:profile:manage";
    /**
     * User settings management - Manage user settings
     */
    readonly USER_SETTINGS_MANAGE: "user:settings:manage";
    /**
     * User session management - Manage user sessions
     */
    readonly USER_SESSION_MANAGE: "user:session:manage";
    /**
     * User export - Export user data
     */
    readonly USER_EXPORT: "user:export";
    /**
     * User import - Import user data
     */
    readonly USER_IMPORT: "user:import";
};
//# sourceMappingURL=permission.constants.d.ts.map