/**
 * Admin Log Type Constants
 * Detailed log type definitions for admin logging
 */

export const ADMIN_LOG_TYPE = {
  // System logs
  SYSTEM_START: 'system_start',
  SYSTEM_STOP: 'system_stop',
  SYSTEM_RESTART: 'system_restart',
  SYSTEM_SHUTDOWN: 'system_shutdown',
  SYSTEM_UPDATE: 'system_update',
  SYSTEM_UPGRADE: 'system_upgrade',
  SYSTEM_MAINTENANCE: 'system_maintenance',
  SYSTEM_BACKUP: 'system_backup',
  SYSTEM_RESTORE: 'system_restore',
  SYSTEM_ERROR: 'system_error',
  SYSTEM_WARNING: 'system_warning',

  // Security logs
  SECURITY_LOGIN: 'security_login',
  SECURITY_LOGOUT: 'security_logout',
  SECURITY_LOGIN_FAILED: 'security_login_failed',
  SECURITY_LOGIN_ATTEMPT: 'security_login_attempt',
  SECURITY_PASSWORD_CHANGE: 'security_password_change',
  SECURITY_PASSWORD_RESET: 'security_password_reset',
  SECURITY_2FA_ENABLE: 'security_2fa_enable',
  SECURITY_2FA_DISABLE: 'security_2fa_disable',
  SECURITY_2FA_VERIFY: 'security_2fa_verify',
  SECURITY_IP_BLOCK: 'security_ip_block',
  SECURITY_IP_UNBLOCK: 'security_ip_unblock',
  SECURITY_RATE_LIMIT: 'security_rate_limit',
  SECURITY_BRUTE_FORCE: 'security_brute_force',
  SECURITY_SUSPICIOUS: 'security_suspicious',
  SECURITY_VIOLATION: 'security_violation',

  // Access logs
  ACCESS_GRANTED: 'access_granted',
  ACCESS_DENIED: 'access_denied',
  ACCESS_FORBIDDEN: 'access_forbidden',
  ACCESS_UNAUTHORIZED: 'access_unauthorized',
  ACCESS_PERMISSION_CHANGE: 'access_permission_change',
  ACCESS_ROLE_CHANGE: 'access_role_change',

  // Audit logs
  AUDIT_CREATE: 'audit_create',
  AUDIT_UPDATE: 'audit_update',
  AUDIT_DELETE: 'audit_delete',
  AUDIT_VIEW: 'audit_view',
  AUDIT_APPROVE: 'audit_approve',
  AUDIT_REJECT: 'audit_reject',
  AUDIT_REVIEW: 'audit_review',
  AUDIT_EXPORT: 'audit_export',
  AUDIT_IMPORT: 'audit_import',

  // Performance logs
  PERFORMANCE_SLOW: 'performance_slow',
  PERFORMANCE_TIMEOUT: 'performance_timeout',
  PERFORMANCE_MEMORY: 'performance_memory',
  PERFORMANCE_CPU: 'performance_cpu',
  PERFORMANCE_DISK: 'performance_disk',
  PERFORMANCE_NETWORK: 'performance_network',
  PERFORMANCE_DATABASE: 'performance_database',
  PERFORMANCE_CACHE: 'performance_cache',
  PERFORMANCE_API: 'performance_api',

  // Application logs
  APPLICATION_START: 'application_start',
  APPLICATION_STOP: 'application_stop',
  APPLICATION_ERROR: 'application_error',
  APPLICATION_WARNING: 'application_warning',
  APPLICATION_INFO: 'application_info',
  APPLICATION_DEBUG: 'application_debug',

  // Database logs
  DATABASE_CONNECT: 'database_connect',
  DATABASE_DISCONNECT: 'database_disconnect',
  DATABASE_ERROR: 'database_error',
  DATABASE_QUERY: 'database_query',
  DATABASE_SLOW_QUERY: 'database_slow_query',
  DATABASE_MIGRATION: 'database_migration',
  DATABASE_SEED: 'database_seed',
  DATABASE_BACKUP: 'database_backup',
  DATABASE_RESTORE: 'database_restore',
  DATABASE_OPTIMIZE: 'database_optimize',

  // Cache logs
  CACHE_SET: 'cache_set',
  CACHE_GET: 'cache_get',
  CACHE_DELETE: 'cache_delete',
  CACHE_CLEAR: 'cache_clear',
  CACHE_HIT: 'cache_hit',
  CACHE_MISS: 'cache_miss',
  CACHE_ERROR: 'cache_error',
  CACHE_WARM: 'cache_warm',
  CACHE_INVALIDATE: 'cache_invalidate',

  // Queue logs
  QUEUE_JOB_ADD: 'queue_job_add',
  QUEUE_JOB_PROCESS: 'queue_job_process',
  QUEUE_JOB_COMPLETE: 'queue_job_complete',
  QUEUE_JOB_FAIL: 'queue_job_fail',
  QUEUE_JOB_RETRY: 'queue_job_retry',
  QUEUE_JOB_DELETE: 'queue_job_delete',
  QUEUE_PAUSE: 'queue_pause',
  QUEUE_RESUME: 'queue_resume',
  QUEUE_CLEAR: 'queue_clear',

  // API logs
  API_REQUEST: 'api_request',
  API_RESPONSE: 'api_response',
  API_ERROR: 'api_error',
  API_RATE_LIMIT: 'api_rate_limit',
  API_AUTH: 'api_auth',
  API_VALIDATION: 'api_validation',
  API_TIMEOUT: 'api_timeout',

  // User logs
  USER_CREATE: 'user_create',
  USER_UPDATE: 'user_update',
  USER_DELETE: 'user_delete',
  USER_ACTIVATE: 'user_activate',
  USER_DEACTIVATE: 'user_deactivate',
  USER_BAN: 'user_ban',
  USER_UNBAN: 'user_unban',
  USER_VERIFY: 'user_verify',
  USER_UNVERIFY: 'user_unverify',
  USER_ROLE_CHANGE: 'user_role_change',

  // Admin logs
  ADMIN_CREATE: 'admin_create',
  ADMIN_UPDATE: 'admin_update',
  ADMIN_DELETE: 'admin_delete',
  ADMIN_ACTIVATE: 'admin_activate',
  ADMIN_DEACTIVATE: 'admin_deactivate',
  ADMIN_ROLE_CHANGE: 'admin_role_change',
  ADMIN_PERMISSION_CHANGE: 'admin_permission_change',

  // Payment logs
  PAYMENT_PROCESS: 'payment_process',
  PAYMENT_SUCCESS: 'payment_success',
  PAYMENT_FAILED: 'payment_failed',
  PAYMENT_REFUND: 'payment_refund',
  PAYMENT_VOID: 'payment_void',
  PAYMENT_CAPTURE: 'payment_capture',

  // Order logs
  ORDER_CREATE: 'order_create',
  ORDER_UPDATE: 'order_update',
  ORDER_CANCEL: 'order_cancel',
  ORDER_COMPLETE: 'order_complete',
  ORDER_SHIP: 'order_ship',
  ORDER_DELIVER: 'order_deliver',
  ORDER_RETURN: 'order_return',
  ORDER_REFUND: 'order_refund',

  // Product logs
  PRODUCT_CREATE: 'product_create',
  PRODUCT_UPDATE: 'product_update',
  PRODUCT_DELETE: 'product_delete',
  PRODUCT_ACTIVATE: 'product_activate',
  PRODUCT_DEACTIVATE: 'product_deactivate',
  PRODUCT_PRICE_UPDATE: 'product_price_update',
  PRODUCT_INVENTORY_UPDATE: 'product_inventory_update',

  // Shipping logs
  SHIPMENT_CREATE: 'shipment_create',
  SHIPMENT_UPDATE: 'shipment_update',
  SHIPMENT_DELETE: 'shipment_delete',
  SHIPMENT_DELIVER: 'shipment_deliver',
  SHIPMENT_RETURN: 'shipment_return',
  SHIPMENT_TRACK: 'shipment_track',

  // Notification logs
  NOTIFICATION_SEND: 'notification_send',
  NOTIFICATION_DELIVER: 'notification_deliver',
  NOTIFICATION_FAIL: 'notification_fail',
  NOTIFICATION_VIEW: 'notification_view',
  NOTIFICATION_CLICK: 'notification_click',

  // Report logs
  REPORT_GENERATE: 'report_generate',
  REPORT_EXPORT: 'report_export',
  REPORT_EMAIL: 'report_email',
  REPORT_VIEW: 'report_view',
  REPORT_DELETE: 'report_delete',

  // Analytics logs
  ANALYTICS_TRACK: 'analytics_track',
  ANALYTICS_AGGREGATE: 'analytics_aggregate',
  ANALYTICS_EXPORT: 'analytics_export',
  ANALYTICS_VIEW: 'analytics_view',
} as const;

export type AdminLogTypeDetail = (typeof ADMIN_LOG_TYPE)[keyof typeof ADMIN_LOG_TYPE];

export const ADMIN_LOG_TYPE_CATEGORIES: Record<AdminLogTypeDetail, string> = {
  [ADMIN_LOG_TYPE.SYSTEM_START]: 'system',
  [ADMIN_LOG_TYPE.SYSTEM_STOP]: 'system',
  [ADMIN_LOG_TYPE.SYSTEM_RESTART]: 'system',
  [ADMIN_LOG_TYPE.SYSTEM_SHUTDOWN]: 'system',
  [ADMIN_LOG_TYPE.SYSTEM_UPDATE]: 'system',
  [ADMIN_LOG_TYPE.SYSTEM_UPGRADE]: 'system',
  [ADMIN_LOG_TYPE.SYSTEM_MAINTENANCE]: 'system',
  [ADMIN_LOG_TYPE.SYSTEM_BACKUP]: 'system',
  [ADMIN_LOG_TYPE.SYSTEM_RESTORE]: 'system',
  [ADMIN_LOG_TYPE.SYSTEM_ERROR]: 'system',
  [ADMIN_LOG_TYPE.SYSTEM_WARNING]: 'system',

  [ADMIN_LOG_TYPE.SECURITY_LOGIN]: 'security',
  [ADMIN_LOG_TYPE.SECURITY_LOGOUT]: 'security',
  [ADMIN_LOG_TYPE.SECURITY_LOGIN_FAILED]: 'security',
  [ADMIN_LOG_TYPE.SECURITY_LOGIN_ATTEMPT]: 'security',
  [ADMIN_LOG_TYPE.SECURITY_PASSWORD_CHANGE]: 'security',
  [ADMIN_LOG_TYPE.SECURITY_PASSWORD_RESET]: 'security',
  [ADMIN_LOG_TYPE.SECURITY_2FA_ENABLE]: 'security',
  [ADMIN_LOG_TYPE.SECURITY_2FA_DISABLE]: 'security',
  [ADMIN_LOG_TYPE.SECURITY_2FA_VERIFY]: 'security',
  [ADMIN_LOG_TYPE.SECURITY_IP_BLOCK]: 'security',
  [ADMIN_LOG_TYPE.SECURITY_IP_UNBLOCK]: 'security',
  [ADMIN_LOG_TYPE.SECURITY_RATE_LIMIT]: 'security',
  [ADMIN_LOG_TYPE.SECURITY_BRUTE_FORCE]: 'security',
  [ADMIN_LOG_TYPE.SECURITY_SUSPICIOUS]: 'security',
  [ADMIN_LOG_TYPE.SECURITY_VIOLATION]: 'security',

  [ADMIN_LOG_TYPE.ACCESS_GRANTED]: 'access',
  [ADMIN_LOG_TYPE.ACCESS_DENIED]: 'access',
  [ADMIN_LOG_TYPE.ACCESS_FORBIDDEN]: 'access',
  [ADMIN_LOG_TYPE.ACCESS_UNAUTHORIZED]: 'access',
  [ADMIN_LOG_TYPE.ACCESS_PERMISSION_CHANGE]: 'access',
  [ADMIN_LOG_TYPE.ACCESS_ROLE_CHANGE]: 'access',

  [ADMIN_LOG_TYPE.AUDIT_CREATE]: 'audit',
  [ADMIN_LOG_TYPE.AUDIT_UPDATE]: 'audit',
  [ADMIN_LOG_TYPE.AUDIT_DELETE]: 'audit',
  [ADMIN_LOG_TYPE.AUDIT_VIEW]: 'audit',
  [ADMIN_LOG_TYPE.AUDIT_APPROVE]: 'audit',
  [ADMIN_LOG_TYPE.AUDIT_REJECT]: 'audit',
  [ADMIN_LOG_TYPE.AUDIT_REVIEW]: 'audit',
  [ADMIN_LOG_TYPE.AUDIT_EXPORT]: 'audit',
  [ADMIN_LOG_TYPE.AUDIT_IMPORT]: 'audit',

  [ADMIN_LOG_TYPE.PERFORMANCE_SLOW]: 'performance',
  [ADMIN_LOG_TYPE.PERFORMANCE_TIMEOUT]: 'performance',
  [ADMIN_LOG_TYPE.PERFORMANCE_MEMORY]: 'performance',
  [ADMIN_LOG_TYPE.PERFORMANCE_CPU]: 'performance',
  [ADMIN_LOG_TYPE.PERFORMANCE_DISK]: 'performance',
  [ADMIN_LOG_TYPE.PERFORMANCE_NETWORK]: 'performance',
  [ADMIN_LOG_TYPE.PERFORMANCE_DATABASE]: 'performance',
  [ADMIN_LOG_TYPE.PERFORMANCE_CACHE]: 'performance',
  [ADMIN_LOG_TYPE.PERFORMANCE_API]: 'performance',

  [ADMIN_LOG_TYPE.APPLICATION_START]: 'application',
  [ADMIN_LOG_TYPE.APPLICATION_STOP]: 'application',
  [ADMIN_LOG_TYPE.APPLICATION_ERROR]: 'application',
  [ADMIN_LOG_TYPE.APPLICATION_WARNING]: 'application',
  [ADMIN_LOG_TYPE.APPLICATION_INFO]: 'application',
  [ADMIN_LOG_TYPE.APPLICATION_DEBUG]: 'application',

  [ADMIN_LOG_TYPE.DATABASE_CONNECT]: 'database',
  [ADMIN_LOG_TYPE.DATABASE_DISCONNECT]: 'database',
  [ADMIN_LOG_TYPE.DATABASE_ERROR]: 'database',
  [ADMIN_LOG_TYPE.DATABASE_QUERY]: 'database',
  [ADMIN_LOG_TYPE.DATABASE_SLOW_QUERY]: 'database',
  [ADMIN_LOG_TYPE.DATABASE_MIGRATION]: 'database',
  [ADMIN_LOG_TYPE.DATABASE_SEED]: 'database',
  [ADMIN_LOG_TYPE.DATABASE_BACKUP]: 'database',
  [ADMIN_LOG_TYPE.DATABASE_RESTORE]: 'database',
  [ADMIN_LOG_TYPE.DATABASE_OPTIMIZE]: 'database',

  [ADMIN_LOG_TYPE.CACHE_SET]: 'cache',
  [ADMIN_LOG_TYPE.CACHE_GET]: 'cache',
  [ADMIN_LOG_TYPE.CACHE_DELETE]: 'cache',
  [ADMIN_LOG_TYPE.CACHE_CLEAR]: 'cache',
  [ADMIN_LOG_TYPE.CACHE_HIT]: 'cache',
  [ADMIN_LOG_TYPE.CACHE_MISS]: 'cache',
  [ADMIN_LOG_TYPE.CACHE_ERROR]: 'cache',
  [ADMIN_LOG_TYPE.CACHE_WARM]: 'cache',
  [ADMIN_LOG_TYPE.CACHE_INVALIDATE]: 'cache',

  [ADMIN_LOG_TYPE.QUEUE_JOB_ADD]: 'queue',
  [ADMIN_LOG_TYPE.QUEUE_JOB_PROCESS]: 'queue',
  [ADMIN_LOG_TYPE.QUEUE_JOB_COMPLETE]: 'queue',
  [ADMIN_LOG_TYPE.QUEUE_JOB_FAIL]: 'queue',
  [ADMIN_LOG_TYPE.QUEUE_JOB_RETRY]: 'queue',
  [ADMIN_LOG_TYPE.QUEUE_JOB_DELETE]: 'queue',
  [ADMIN_LOG_TYPE.QUEUE_PAUSE]: 'queue',
  [ADMIN_LOG_TYPE.QUEUE_RESUME]: 'queue',
  [ADMIN_LOG_TYPE.QUEUE_CLEAR]: 'queue',

  [ADMIN_LOG_TYPE.API_REQUEST]: 'api',
  [ADMIN_LOG_TYPE.API_RESPONSE]: 'api',
  [ADMIN_LOG_TYPE.API_ERROR]: 'api',
  [ADMIN_LOG_TYPE.API_RATE_LIMIT]: 'api',
  [ADMIN_LOG_TYPE.API_AUTH]: 'api',
  [ADMIN_LOG_TYPE.API_VALIDATION]: 'api',
  [ADMIN_LOG_TYPE.API_TIMEOUT]: 'api',

  [ADMIN_LOG_TYPE.USER_CREATE]: 'user',
  [ADMIN_LOG_TYPE.USER_UPDATE]: 'user',
  [ADMIN_LOG_TYPE.USER_DELETE]: 'user',
  [ADMIN_LOG_TYPE.USER_ACTIVATE]: 'user',
  [ADMIN_LOG_TYPE.USER_DEACTIVATE]: 'user',
  [ADMIN_LOG_TYPE.USER_BAN]: 'user',
  [ADMIN_LOG_TYPE.USER_UNBAN]: 'user',
  [ADMIN_LOG_TYPE.USER_VERIFY]: 'user',
  [ADMIN_LOG_TYPE.USER_UNVERIFY]: 'user',
  [ADMIN_LOG_TYPE.USER_ROLE_CHANGE]: 'user',

  [ADMIN_LOG_TYPE.ADMIN_CREATE]: 'admin',
  [ADMIN_LOG_TYPE.ADMIN_UPDATE]: 'admin',
  [ADMIN_LOG_TYPE.ADMIN_DELETE]: 'admin',
  [ADMIN_LOG_TYPE.ADMIN_ACTIVATE]: 'admin',
  [ADMIN_LOG_TYPE.ADMIN_DEACTIVATE]: 'admin',
  [ADMIN_LOG_TYPE.ADMIN_ROLE_CHANGE]: 'admin',
  [ADMIN_LOG_TYPE.ADMIN_PERMISSION_CHANGE]: 'admin',

  [ADMIN_LOG_TYPE.PAYMENT_PROCESS]: 'payment',
  [ADMIN_LOG_TYPE.PAYMENT_SUCCESS]: 'payment',
  [ADMIN_LOG_TYPE.PAYMENT_FAILED]: 'payment',
  [ADMIN_LOG_TYPE.PAYMENT_REFUND]: 'payment',
  [ADMIN_LOG_TYPE.PAYMENT_VOID]: 'payment',
  [ADMIN_LOG_TYPE.PAYMENT_CAPTURE]: 'payment',

  [ADMIN_LOG_TYPE.ORDER_CREATE]: 'order',
  [ADMIN_LOG_TYPE.ORDER_UPDATE]: 'order',
  [ADMIN_LOG_TYPE.ORDER_CANCEL]: 'order',
  [ADMIN_LOG_TYPE.ORDER_COMPLETE]: 'order',
  [ADMIN_LOG_TYPE.ORDER_SHIP]: 'order',
  [ADMIN_LOG_TYPE.ORDER_DELIVER]: 'order',
  [ADMIN_LOG_TYPE.ORDER_RETURN]: 'order',
  [ADMIN_LOG_TYPE.ORDER_REFUND]: 'order',

  [ADMIN_LOG_TYPE.PRODUCT_CREATE]: 'product',
  [ADMIN_LOG_TYPE.PRODUCT_UPDATE]: 'product',
  [ADMIN_LOG_TYPE.PRODUCT_DELETE]: 'product',
  [ADMIN_LOG_TYPE.PRODUCT_ACTIVATE]: 'product',
  [ADMIN_LOG_TYPE.PRODUCT_DEACTIVATE]: 'product',
  [ADMIN_LOG_TYPE.PRODUCT_PRICE_UPDATE]: 'product',
  [ADMIN_LOG_TYPE.PRODUCT_INVENTORY_UPDATE]: 'product',

  [ADMIN_LOG_TYPE.SHIPMENT_CREATE]: 'shipping',
  [ADMIN_LOG_TYPE.SHIPMENT_UPDATE]: 'shipping',
  [ADMIN_LOG_TYPE.SHIPMENT_DELETE]: 'shipping',
  [ADMIN_LOG_TYPE.SHIPMENT_DELIVER]: 'shipping',
  [ADMIN_LOG_TYPE.SHIPMENT_RETURN]: 'shipping',
  [ADMIN_LOG_TYPE.SHIPMENT_TRACK]: 'shipping',

  [ADMIN_LOG_TYPE.NOTIFICATION_SEND]: 'notification',
  [ADMIN_LOG_TYPE.NOTIFICATION_DELIVER]: 'notification',
  [ADMIN_LOG_TYPE.NOTIFICATION_FAIL]: 'notification',
  [ADMIN_LOG_TYPE.NOTIFICATION_VIEW]: 'notification',
  [ADMIN_LOG_TYPE.NOTIFICATION_CLICK]: 'notification',

  [ADMIN_LOG_TYPE.REPORT_GENERATE]: 'report',
  [ADMIN_LOG_TYPE.REPORT_EXPORT]: 'report',
  [ADMIN_LOG_TYPE.REPORT_EMAIL]: 'report',
  [ADMIN_LOG_TYPE.REPORT_VIEW]: 'report',
  [ADMIN_LOG_TYPE.REPORT_DELETE]: 'report',

  [ADMIN_LOG_TYPE.ANALYTICS_TRACK]: 'analytics',
  [ADMIN_LOG_TYPE.ANALYTICS_AGGREGATE]: 'analytics',
  [ADMIN_LOG_TYPE.ANALYTICS_EXPORT]: 'analytics',
  [ADMIN_LOG_TYPE.ANALYTICS_VIEW]: 'analytics',
};

export const ADMIN_LOG_TYPE_LABELS_DETAIL: Record<AdminLogTypeDetail, string> = {
  [ADMIN_LOG_TYPE.SYSTEM_START]: 'System Started',
  [ADMIN_LOG_TYPE.SYSTEM_STOP]: 'System Stopped',
  [ADMIN_LOG_TYPE.SYSTEM_RESTART]: 'System Restarted',
  [ADMIN_LOG_TYPE.SYSTEM_SHUTDOWN]: 'System Shutdown',
  [ADMIN_LOG_TYPE.SYSTEM_UPDATE]: 'System Updated',
  [ADMIN_LOG_TYPE.SYSTEM_UPGRADE]: 'System Upgraded',
  [ADMIN_LOG_TYPE.SYSTEM_MAINTENANCE]: 'System Maintenance',
  [ADMIN_LOG_TYPE.SYSTEM_BACKUP]: 'System Backup',
  [ADMIN_LOG_TYPE.SYSTEM_RESTORE]: 'System Restored',
  [ADMIN_LOG_TYPE.SYSTEM_ERROR]: 'System Error',
  [ADMIN_LOG_TYPE.SYSTEM_WARNING]: 'System Warning',

  [ADMIN_LOG_TYPE.SECURITY_LOGIN]: 'Security Login',
  [ADMIN_LOG_TYPE.SECURITY_LOGOUT]: 'Security Logout',
  [ADMIN_LOG_TYPE.SECURITY_LOGIN_FAILED]: 'Security Login Failed',
  [ADMIN_LOG_TYPE.SECURITY_LOGIN_ATTEMPT]: 'Security Login Attempt',
  [ADMIN_LOG_TYPE.SECURITY_PASSWORD_CHANGE]: 'Security Password Change',
  [ADMIN_LOG_TYPE.SECURITY_PASSWORD_RESET]: 'Security Password Reset',
  [ADMIN_LOG_TYPE.SECURITY_2FA_ENABLE]: '2FA Enabled',
  [ADMIN_LOG_TYPE.SECURITY_2FA_DISABLE]: '2FA Disabled',
  [ADMIN_LOG_TYPE.SECURITY_2FA_VERIFY]: '2FA Verified',
  [ADMIN_LOG_TYPE.SECURITY_IP_BLOCK]: 'IP Blocked',
  [ADMIN_LOG_TYPE.SECURITY_IP_UNBLOCK]: 'IP Unblocked',
  [ADMIN_LOG_TYPE.SECURITY_RATE_LIMIT]: 'Rate Limit Applied',
  [ADMIN_LOG_TYPE.SECURITY_BRUTE_FORCE]: 'Brute Force Attack',
  [ADMIN_LOG_TYPE.SECURITY_SUSPICIOUS]: 'Suspicious Activity',
  [ADMIN_LOG_TYPE.SECURITY_VIOLATION]: 'Security Violation',

  [ADMIN_LOG_TYPE.ACCESS_GRANTED]: 'Access Granted',
  [ADMIN_LOG_TYPE.ACCESS_DENIED]: 'Access Denied',
  [ADMIN_LOG_TYPE.ACCESS_FORBIDDEN]: 'Access Forbidden',
  [ADMIN_LOG_TYPE.ACCESS_UNAUTHORIZED]: 'Access Unauthorized',
  [ADMIN_LOG_TYPE.ACCESS_PERMISSION_CHANGE]: 'Permission Changed',
  [ADMIN_LOG_TYPE.ACCESS_ROLE_CHANGE]: 'Role Changed',

  [ADMIN_LOG_TYPE.AUDIT_CREATE]: 'Audit Create',
  [ADMIN_LOG_TYPE.AUDIT_UPDATE]: 'Audit Update',
  [ADMIN_LOG_TYPE.AUDIT_DELETE]: 'Audit Delete',
  [ADMIN_LOG_TYPE.AUDIT_VIEW]: 'Audit View',
  [ADMIN_LOG_TYPE.AUDIT_APPROVE]: 'Audit Approve',
  [ADMIN_LOG_TYPE.AUDIT_REJECT]: 'Audit Reject',
  [ADMIN_LOG_TYPE.AUDIT_REVIEW]: 'Audit Review',
  [ADMIN_LOG_TYPE.AUDIT_EXPORT]: 'Audit Export',
  [ADMIN_LOG_TYPE.AUDIT_IMPORT]: 'Audit Import',

  [ADMIN_LOG_TYPE.PERFORMANCE_SLOW]: 'Performance Slow',
  [ADMIN_LOG_TYPE.PERFORMANCE_TIMEOUT]: 'Performance Timeout',
  [ADMIN_LOG_TYPE.PERFORMANCE_MEMORY]: 'Performance Memory',
  [ADMIN_LOG_TYPE.PERFORMANCE_CPU]: 'Performance CPU',
  [ADMIN_LOG_TYPE.PERFORMANCE_DISK]: 'Performance Disk',
  [ADMIN_LOG_TYPE.PERFORMANCE_NETWORK]: 'Performance Network',
  [ADMIN_LOG_TYPE.PERFORMANCE_DATABASE]: 'Performance Database',
  [ADMIN_LOG_TYPE.PERFORMANCE_CACHE]: 'Performance Cache',
  [ADMIN_LOG_TYPE.PERFORMANCE_API]: 'Performance API',

  [ADMIN_LOG_TYPE.APPLICATION_START]: 'Application Started',
  [ADMIN_LOG_TYPE.APPLICATION_STOP]: 'Application Stopped',
  [ADMIN_LOG_TYPE.APPLICATION_ERROR]: 'Application Error',
  [ADMIN_LOG_TYPE.APPLICATION_WARNING]: 'Application Warning',
  [ADMIN_LOG_TYPE.APPLICATION_INFO]: 'Application Info',
  [ADMIN_LOG_TYPE.APPLICATION_DEBUG]: 'Application Debug',

  [ADMIN_LOG_TYPE.DATABASE_CONNECT]: 'Database Connected',
  [ADMIN_LOG_TYPE.DATABASE_DISCONNECT]: 'Database Disconnected',
  [ADMIN_LOG_TYPE.DATABASE_ERROR]: 'Database Error',
  [ADMIN_LOG_TYPE.DATABASE_QUERY]: 'Database Query',
  [ADMIN_LOG_TYPE.DATABASE_SLOW_QUERY]: 'Database Slow Query',
  [ADMIN_LOG_TYPE.DATABASE_MIGRATION]: 'Database Migration',
  [ADMIN_LOG_TYPE.DATABASE_SEED]: 'Database Seeded',
  [ADMIN_LOG_TYPE.DATABASE_BACKUP]: 'Database Backup',
  [ADMIN_LOG_TYPE.DATABASE_RESTORE]: 'Database Restored',
  [ADMIN_LOG_TYPE.DATABASE_OPTIMIZE]: 'Database Optimized',

  [ADMIN_LOG_TYPE.CACHE_SET]: 'Cache Set',
  [ADMIN_LOG_TYPE.CACHE_GET]: 'Cache Get',
  [ADMIN_LOG_TYPE.CACHE_DELETE]: 'Cache Delete',
  [ADMIN_LOG_TYPE.CACHE_CLEAR]: 'Cache Cleared',
  [ADMIN_LOG_TYPE.CACHE_HIT]: 'Cache Hit',
  [ADMIN_LOG_TYPE.CACHE_MISS]: 'Cache Miss',
  [ADMIN_LOG_TYPE.CACHE_ERROR]: 'Cache Error',
  [ADMIN_LOG_TYPE.CACHE_WARM]: 'Cache Warmed',
  [ADMIN_LOG_TYPE.CACHE_INVALIDATE]: 'Cache Invalidated',

  [ADMIN_LOG_TYPE.QUEUE_JOB_ADD]: 'Queue Job Added',
  [ADMIN_LOG_TYPE.QUEUE_JOB_PROCESS]: 'Queue Job Processed',
  [ADMIN_LOG_TYPE.QUEUE_JOB_COMPLETE]: 'Queue Job Completed',
  [ADMIN_LOG_TYPE.QUEUE_JOB_FAIL]: 'Queue Job Failed',
  [ADMIN_LOG_TYPE.QUEUE_JOB_RETRY]: 'Queue Job Retried',
  [ADMIN_LOG_TYPE.QUEUE_JOB_DELETE]: 'Queue Job Deleted',
  [ADMIN_LOG_TYPE.QUEUE_PAUSE]: 'Queue Paused',
  [ADMIN_LOG_TYPE.QUEUE_RESUME]: 'Queue Resumed',
  [ADMIN_LOG_TYPE.QUEUE_CLEAR]: 'Queue Cleared',

  [ADMIN_LOG_TYPE.API_REQUEST]: 'API Request',
  [ADMIN_LOG_TYPE.API_RESPONSE]: 'API Response',
  [ADMIN_LOG_TYPE.API_ERROR]: 'API Error',
  [ADMIN_LOG_TYPE.API_RATE_LIMIT]: 'API Rate Limit',
  [ADMIN_LOG_TYPE.API_AUTH]: 'API Auth',
  [ADMIN_LOG_TYPE.API_VALIDATION]: 'API Validation',
  [ADMIN_LOG_TYPE.API_TIMEOUT]: 'API Timeout',

  [ADMIN_LOG_TYPE.USER_CREATE]: 'User Created',
  [ADMIN_LOG_TYPE.USER_UPDATE]: 'User Updated',
  [ADMIN_LOG_TYPE.USER_DELETE]: 'User Deleted',
  [ADMIN_LOG_TYPE.USER_ACTIVATE]: 'User Activated',
  [ADMIN_LOG_TYPE.USER_DEACTIVATE]: 'User Deactivated',
  [ADMIN_LOG_TYPE.USER_BAN]: 'User Banned',
  [ADMIN_LOG_TYPE.USER_UNBAN]: 'User Unbanned',
  [ADMIN_LOG_TYPE.USER_VERIFY]: 'User Verified',
  [ADMIN_LOG_TYPE.USER_UNVERIFY]: 'User Unverified',
  [ADMIN_LOG_TYPE.USER_ROLE_CHANGE]: 'User Role Changed',

  [ADMIN_LOG_TYPE.ADMIN_CREATE]: 'Admin Created',
  [ADMIN_LOG_TYPE.ADMIN_UPDATE]: 'Admin Updated',
  [ADMIN_LOG_TYPE.ADMIN_DELETE]: 'Admin Deleted',
  [ADMIN_LOG_TYPE.ADMIN_ACTIVATE]: 'Admin Activated',
  [ADMIN_LOG_TYPE.ADMIN_DEACTIVATE]: 'Admin Deactivated',
  [ADMIN_LOG_TYPE.ADMIN_ROLE_CHANGE]: 'Admin Role Changed',
  [ADMIN_LOG_TYPE.ADMIN_PERMISSION_CHANGE]: 'Admin Permission Changed',

  [ADMIN_LOG_TYPE.PAYMENT_PROCESS]: 'Payment Processed',
  [ADMIN_LOG_TYPE.PAYMENT_SUCCESS]: 'Payment Success',
  [ADMIN_LOG_TYPE.PAYMENT_FAILED]: 'Payment Failed',
  [ADMIN_LOG_TYPE.PAYMENT_REFUND]: 'Payment Refunded',
  [ADMIN_LOG_TYPE.PAYMENT_VOID]: 'Payment Voided',
  [ADMIN_LOG_TYPE.PAYMENT_CAPTURE]: 'Payment Captured',

  [ADMIN_LOG_TYPE.ORDER_CREATE]: 'Order Created',
  [ADMIN_LOG_TYPE.ORDER_UPDATE]: 'Order Updated',
  [ADMIN_LOG_TYPE.ORDER_CANCEL]: 'Order Cancelled',
  [ADMIN_LOG_TYPE.ORDER_COMPLETE]: 'Order Completed',
  [ADMIN_LOG_TYPE.ORDER_SHIP]: 'Order Shipped',
  [ADMIN_LOG_TYPE.ORDER_DELIVER]: 'Order Delivered',
  [ADMIN_LOG_TYPE.ORDER_RETURN]: 'Order Returned',
  [ADMIN_LOG_TYPE.ORDER_REFUND]: 'Order Refunded',

  [ADMIN_LOG_TYPE.PRODUCT_CREATE]: 'Product Created',
  [ADMIN_LOG_TYPE.PRODUCT_UPDATE]: 'Product Updated',
  [ADMIN_LOG_TYPE.PRODUCT_DELETE]: 'Product Deleted',
  [ADMIN_LOG_TYPE.PRODUCT_ACTIVATE]: 'Product Activated',
  [ADMIN_LOG_TYPE.PRODUCT_DEACTIVATE]: 'Product Deactivated',
  [ADMIN_LOG_TYPE.PRODUCT_PRICE_UPDATE]: 'Product Price Updated',
  [ADMIN_LOG_TYPE.PRODUCT_INVENTORY_UPDATE]: 'Product Inventory Updated',

  [ADMIN_LOG_TYPE.SHIPMENT_CREATE]: 'Shipment Created',
  [ADMIN_LOG_TYPE.SHIPMENT_UPDATE]: 'Shipment Updated',
  [ADMIN_LOG_TYPE.SHIPMENT_DELETE]: 'Shipment Deleted',
  [ADMIN_LOG_TYPE.SHIPMENT_DELIVER]: 'Shipment Delivered',
  [ADMIN_LOG_TYPE.SHIPMENT_RETURN]: 'Shipment Returned',
  [ADMIN_LOG_TYPE.SHIPMENT_TRACK]: 'Shipment Tracked',

  [ADMIN_LOG_TYPE.NOTIFICATION_SEND]: 'Notification Sent',
  [ADMIN_LOG_TYPE.NOTIFICATION_DELIVER]: 'Notification Delivered',
  [ADMIN_LOG_TYPE.NOTIFICATION_FAIL]: 'Notification Failed',
  [ADMIN_LOG_TYPE.NOTIFICATION_VIEW]: 'Notification Viewed',
  [ADMIN_LOG_TYPE.NOTIFICATION_CLICK]: 'Notification Clicked',

  [ADMIN_LOG_TYPE.REPORT_GENERATE]: 'Report Generated',
  [ADMIN_LOG_TYPE.REPORT_EXPORT]: 'Report Exported',
  [ADMIN_LOG_TYPE.REPORT_EMAIL]: 'Report Emailed',
  [ADMIN_LOG_TYPE.REPORT_VIEW]: 'Report Viewed',
  [ADMIN_LOG_TYPE.REPORT_DELETE]: 'Report Deleted',

  [ADMIN_LOG_TYPE.ANALYTICS_TRACK]: 'Analytics Tracked',
  [ADMIN_LOG_TYPE.ANALYTICS_AGGREGATE]: 'Analytics Aggregated',
  [ADMIN_LOG_TYPE.ANALYTICS_EXPORT]: 'Analytics Exported',
  [ADMIN_LOG_TYPE.ANALYTICS_VIEW]: 'Analytics Viewed',
};

export function getAdminLogTypeCategory(type: AdminLogTypeDetail): string {
  return ADMIN_LOG_TYPE_CATEGORIES[type] || 'other';
}

export function getAdminLogTypeLabel(type: AdminLogTypeDetail): string {
  return ADMIN_LOG_TYPE_LABELS_DETAIL[type] || 'Unknown Log Type';
}

export function isAdminLogSecurityLog(type: AdminLogTypeDetail): boolean {
  return getAdminLogTypeCategory(type) === 'security';
}

export function isAdminLogSystemLog(type: AdminLogTypeDetail): boolean {
  return getAdminLogTypeCategory(type) === 'system';
}

export function isAdminLogAuditLog(type: AdminLogTypeDetail): boolean {
  return getAdminLogTypeCategory(type) === 'audit';
}

export function isAdminLogPerformanceLog(type: AdminLogTypeDetail): boolean {
  return getAdminLogTypeCategory(type) === 'performance';
}

export function isAdminLogAccessLog(type: AdminLogTypeDetail): boolean {
  return getAdminLogTypeCategory(type) === 'access';
}
