/**
 * Admin Audit Type Constants
 * Detailed audit type definitions for compliance
 */

export const ADMIN_AUDIT_TYPE = {
  // Authentication audits
  USER_LOGIN: 'user_login',
  USER_LOGOUT: 'user_logout',
  USER_LOGIN_FAILED: 'user_login_failed',
  USER_LOGOUT_FAILED: 'user_logout_failed',
  USER_REGISTER: 'user_register',
  USER_VERIFY_EMAIL: 'user_verify_email',
  USER_RESET_PASSWORD: 'user_reset_password',
  USER_CHANGE_PASSWORD: 'user_change_password',
  USER_TWO_FA: 'user_two_fa',
  USER_TWO_FA_ENABLE: 'user_two_fa_enable',
  USER_TWO_FA_DISABLE: 'user_two_fa_disable',
  USER_TWO_FA_VERIFY: 'user_two_fa_verify',

  // Authorization audits
  PERMISSION_GRANTED: 'permission_granted',
  PERMISSION_REVOKED: 'permission_revoked',
  ROLE_ASSIGNED: 'role_assigned',
  ROLE_REMOVED: 'role_removed',
  ROLE_CREATED: 'role_created',
  ROLE_UPDATED: 'role_updated',
  ROLE_DELETED: 'role_deleted',
  PERMISSION_CREATED: 'permission_created',
  PERMISSION_UPDATED: 'permission_updated',
  PERMISSION_DELETED: 'permission_deleted',

  // User management audits
  USER_CREATED: 'user_created',
  USER_UPDATED: 'user_updated',
  USER_DELETED: 'user_deleted',
  USER_ACTIVATED: 'user_activated',
  USER_DEACTIVATED: 'user_deactivated',
  USER_BANNED: 'user_banned',
  USER_UNBANNED: 'user_unbanned',
  USER_SUSPENDED: 'user_suspended',
  USER_UNSUSPENDED: 'user_unsuspended',
  USER_VERIFIED: 'user_verified',
  USER_UNVERIFIED: 'user_unverified',
  USER_PROFILE_UPDATED: 'user_profile_updated',
  USER_SETTINGS_UPDATED: 'user_settings_updated',
  USER_PREFERENCES_UPDATED: 'user_preferences_updated',
  USER_ADDRESS_ADDED: 'user_address_added',
  USER_ADDRESS_UPDATED: 'user_address_updated',
  USER_ADDRESS_DELETED: 'user_address_deleted',

  // Admin management audits
  ADMIN_CREATED: 'admin_created',
  ADMIN_UPDATED: 'admin_updated',
  ADMIN_DELETED: 'admin_deleted',
  ADMIN_ACTIVATED: 'admin_activated',
  ADMIN_DEACTIVATED: 'admin_deactivated',
  ADMIN_SUSPENDED: 'admin_suspended',
  ADMIN_UNSUSPENDED: 'admin_unsuspended',
  ADMIN_ROLE_CHANGED: 'admin_role_changed',
  ADMIN_PERMISSION_CHANGED: 'admin_permission_changed',
  ADMIN_LEVEL_CHANGED: 'admin_level_changed',
  ADMIN_DEPARTMENT_CHANGED: 'admin_department_changed',
  ADMIN_TEAM_CHANGED: 'admin_team_changed',

  // Content management audits
  CONTENT_CREATED: 'content_created',
  CONTENT_UPDATED: 'content_updated',
  CONTENT_DELETED: 'content_deleted',
  CONTENT_PUBLISHED: 'content_published',
  CONTENT_UNPUBLISHED: 'content_unpublished',
  CONTENT_ARCHIVED: 'content_archived',
  CONTENT_RESTORED: 'content_restored',
  CONTENT_APPROVED: 'content_approved',
  CONTENT_REJECTED: 'content_rejected',
  CONTENT_REVIEWED: 'content_reviewed',

  // Product management audits
  PRODUCT_CREATED: 'product_created',
  PRODUCT_UPDATED: 'product_updated',
  PRODUCT_DELETED: 'product_deleted',
  PRODUCT_PUBLISHED: 'product_published',
  PRODUCT_UNPUBLISHED: 'product_unpublished',
  PRODUCT_APPROVED: 'product_approved',
  PRODUCT_REJECTED: 'product_rejected',
  PRODUCT_FEATURED: 'product_featured',
  PRODUCT_UNFEATURED: 'product_unfeatured',
  PRODUCT_PRICE_CHANGED: 'product_price_changed',
  PRODUCT_INVENTORY_CHANGED: 'product_inventory_changed',
  PRODUCT_CATEGORY_CHANGED: 'product_category_changed',

  // Order management audits
  ORDER_CREATED: 'order_created',
  ORDER_UPDATED: 'order_updated',
  ORDER_CANCELLED: 'order_cancelled',
  ORDER_COMPLETED: 'order_completed',
  ORDER_SHIPPED: 'order_shipped',
  ORDER_DELIVERED: 'order_delivered',
  ORDER_RETURNED: 'order_returned',
  ORDER_REFUNDED: 'order_refunded',
  ORDER_STATUS_CHANGED: 'order_status_changed',

  // Payment management audits
  PAYMENT_PROCESSED: 'payment_processed',
  PAYMENT_VERIFIED: 'payment_verified',
  PAYMENT_REFUNDED: 'payment_refunded',
  PAYMENT_CAPTURED: 'payment_captured',
  PAYMENT_VOIDED: 'payment_voided',
  PAYMENT_RECONCILED: 'payment_reconciled',
  PAYMENT_SETTLED: 'payment_settled',

  // System management audits
  SYSTEM_BACKUP: 'system_backup',
  SYSTEM_RESTORE: 'system_restore',
  SYSTEM_UPDATED: 'system_updated',
  SYSTEM_UPGRADED: 'system_upgraded',
  SYSTEM_MAINTENANCE: 'system_maintenance',
  SYSTEM_CONFIG_CHANGED: 'system_config_changed',
  SYSTEM_CACHE_CLEARED: 'system_cache_cleared',
  SYSTEM_QUEUE_PROCESSED: 'system_queue_processed',
  SYSTEM_DB_MIGRATED: 'system_db_migrated',
  SYSTEM_DB_SEEDED: 'system_db_seeded',

  // Security audits
  SECURITY_AUDIT: 'security_audit',
  SECURITY_SCAN: 'security_scan',
  SECURITY_ALERT: 'security_alert',
  SECURITY_IP_BLOCKED: 'security_ip_blocked',
  SECURITY_IP_UNBLOCKED: 'security_ip_unblocked',
  SECURITY_RATE_LIMIT: 'security_rate_limit',
  SECURITY_FIREWALL_UPDATED: 'security_firewall_updated',
  SECURITY_SSL_UPDATED: 'security_ssl_updated',
  SECURITY_BRUTE_FORCE: 'security_brute_force',
  SECURITY_SUSPICIOUS: 'security_suspicious',

  // Data audits
  DATA_EXPORTED: 'data_exported',
  DATA_IMPORTED: 'data_imported',
  DATA_SYNCED: 'data_synced',
  DATA_BACKUP: 'data_backup',
  DATA_RESTORE: 'data_restore',
  DATA_CLEARED: 'data_cleared',
  DATA_PURGED: 'data_purged',

  // Reporting audits
  REPORT_GENERATED: 'report_generated',
  REPORT_EXPORTED: 'report_exported',
  REPORT_EMAILED: 'report_emailed',
  REPORT_VIEWED: 'report_viewed',
  REPORT_DELETED: 'report_deleted',
  REPORT_SHARED: 'report_shared',

  // Analytics audits
  ANALYTICS_VIEWED: 'analytics_viewed',
  ANALYTICS_EXPORTED: 'analytics_exported',
  ANALYTICS_TRACKED: 'analytics_tracked',
  ANALYTICS_AGGREGATED: 'analytics_aggregated',

  // Support audits
  TICKET_CREATED: 'ticket_created',
  TICKET_UPDATED: 'ticket_updated',
  TICKET_DELETED: 'ticket_deleted',
  TICKET_ASSIGNED: 'ticket_assigned',
  TICKET_UNASSIGNED: 'ticket_unassigned',
  TICKET_ESCALATED: 'ticket_escalated',
  TICKET_RESOLVED: 'ticket_resolved',
  TICKET_CLOSED: 'ticket_closed',
  TICKET_REOPENED: 'ticket_reopened',

  // Logistics audits
  SHIPMENT_CREATED: 'shipment_created',
  SHIPMENT_UPDATED: 'shipment_updated',
  SHIPMENT_DELETED: 'shipment_deleted',
  SHIPMENT_SHIPPED: 'shipment_shipped',
  SHIPMENT_DELIVERED: 'shipment_delivered',
  SHIPMENT_RETURNED: 'shipment_returned',
  SHIPMENT_TRACKED: 'shipment_tracked',

  // Vendor audits
  VENDOR_CREATED: 'vendor_created',
  VENDOR_UPDATED: 'vendor_updated',
  VENDOR_DELETED: 'vendor_deleted',
  VENDOR_APPROVED: 'vendor_approved',
  VENDOR_REJECTED: 'vendor_rejected',
  VENDOR_SUSPENDED: 'vendor_suspended',
  VENDOR_UNSUSPENDED: 'vendor_unsuspended',
  VENDOR_VERIFIED: 'vendor_verified',
  VENDOR_PAYOUT: 'vendor_payout',

  // Marketing audits
  CAMPAIGN_CREATED: 'campaign_created',
  CAMPAIGN_UPDATED: 'campaign_updated',
  CAMPAIGN_DELETED: 'campaign_deleted',
  CAMPAIGN_STARTED: 'campaign_started',
  CAMPAIGN_STOPPED: 'campaign_stopped',
  CAMPAIGN_PAUSED: 'campaign_paused',
  CAMPAIGN_RESUMED: 'campaign_resumed',

  // Notification audits
  NOTIFICATION_SENT: 'notification_sent',
  NOTIFICATION_DELIVERED: 'notification_delivered',
  NOTIFICATION_FAILED: 'notification_failed',
  NOTIFICATION_VIEWED: 'notification_viewed',
  NOTIFICATION_CLICKED: 'notification_clicked',
  NOTIFICATION_BROADCAST: 'notification_broadcast',

  // Compliance audits
  COMPLIANCE_AUDIT: 'compliance_audit',
  COMPLIANCE_REPORT: 'compliance_report',
  COMPLIANCE_VIOLATION: 'compliance_violation',
  COMPLIANCE_RESOLVED: 'compliance_resolved',
  POLICY_UPDATED: 'policy_updated',
  POLICY_CREATED: 'policy_created',
  POLICY_DELETED: 'policy_deleted',

  // Finance audits
  TRANSACTION_PROCESSED: 'transaction_processed',
  TRANSACTION_VERIFIED: 'transaction_verified',
  TRANSACTION_REVERSED: 'transaction_reversed',
  INVOICE_CREATED: 'invoice_created',
  INVOICE_UPDATED: 'invoice_updated',
  INVOICE_PAID: 'invoice_paid',
  INVOICE_CANCELLED: 'invoice_cancelled',

  // HR audits
  EMPLOYEE_CREATED: 'employee_created',
  EMPLOYEE_UPDATED: 'employee_updated',
  EMPLOYEE_DELETED: 'employee_deleted',
  EMPLOYEE_PROMOTED: 'employee_promoted',
  EMPLOYEE_DEMOTED: 'employee_demoted',
  EMPLOYEE_TERMINATED: 'employee_terminated',
} as const;

export type AdminAuditTypeDetail = (typeof ADMIN_AUDIT_TYPE)[keyof typeof ADMIN_AUDIT_TYPE];

export const ADMIN_AUDIT_TYPE_CATEGORIES: Record<AdminAuditTypeDetail, string> = {
  // Authentication
  [ADMIN_AUDIT_TYPE.USER_LOGIN]: 'authentication',
  [ADMIN_AUDIT_TYPE.USER_LOGOUT]: 'authentication',
  [ADMIN_AUDIT_TYPE.USER_LOGIN_FAILED]: 'authentication',
  [ADMIN_AUDIT_TYPE.USER_LOGOUT_FAILED]: 'authentication',
  [ADMIN_AUDIT_TYPE.USER_REGISTER]: 'authentication',
  [ADMIN_AUDIT_TYPE.USER_VERIFY_EMAIL]: 'authentication',
  [ADMIN_AUDIT_TYPE.USER_RESET_PASSWORD]: 'authentication',
  [ADMIN_AUDIT_TYPE.USER_CHANGE_PASSWORD]: 'authentication',
  [ADMIN_AUDIT_TYPE.USER_TWO_FA]: 'authentication',
  [ADMIN_AUDIT_TYPE.USER_TWO_FA_ENABLE]: 'authentication',
  [ADMIN_AUDIT_TYPE.USER_TWO_FA_DISABLE]: 'authentication',
  [ADMIN_AUDIT_TYPE.USER_TWO_FA_VERIFY]: 'authentication',

  // Authorization
  [ADMIN_AUDIT_TYPE.PERMISSION_GRANTED]: 'authorization',
  [ADMIN_AUDIT_TYPE.PERMISSION_REVOKED]: 'authorization',
  [ADMIN_AUDIT_TYPE.ROLE_ASSIGNED]: 'authorization',
  [ADMIN_AUDIT_TYPE.ROLE_REMOVED]: 'authorization',
  [ADMIN_AUDIT_TYPE.ROLE_CREATED]: 'authorization',
  [ADMIN_AUDIT_TYPE.ROLE_UPDATED]: 'authorization',
  [ADMIN_AUDIT_TYPE.ROLE_DELETED]: 'authorization',
  [ADMIN_AUDIT_TYPE.PERMISSION_CREATED]: 'authorization',
  [ADMIN_AUDIT_TYPE.PERMISSION_UPDATED]: 'authorization',
  [ADMIN_AUDIT_TYPE.PERMISSION_DELETED]: 'authorization',

  // User Management
  [ADMIN_AUDIT_TYPE.USER_CREATED]: 'user_management',
  [ADMIN_AUDIT_TYPE.USER_UPDATED]: 'user_management',
  [ADMIN_AUDIT_TYPE.USER_DELETED]: 'user_management',
  [ADMIN_AUDIT_TYPE.USER_ACTIVATED]: 'user_management',
  [ADMIN_AUDIT_TYPE.USER_DEACTIVATED]: 'user_management',
  [ADMIN_AUDIT_TYPE.USER_BANNED]: 'user_management',
  [ADMIN_AUDIT_TYPE.USER_UNBANNED]: 'user_management',
  [ADMIN_AUDIT_TYPE.USER_SUSPENDED]: 'user_management',
  [ADMIN_AUDIT_TYPE.USER_UNSUSPENDED]: 'user_management',
  [ADMIN_AUDIT_TYPE.USER_VERIFIED]: 'user_management',
  [ADMIN_AUDIT_TYPE.USER_UNVERIFIED]: 'user_management',
  [ADMIN_AUDIT_TYPE.USER_PROFILE_UPDATED]: 'user_management',
  [ADMIN_AUDIT_TYPE.USER_SETTINGS_UPDATED]: 'user_management',
  [ADMIN_AUDIT_TYPE.USER_PREFERENCES_UPDATED]: 'user_management',
  [ADMIN_AUDIT_TYPE.USER_ADDRESS_ADDED]: 'user_management',
  [ADMIN_AUDIT_TYPE.USER_ADDRESS_UPDATED]: 'user_management',
  [ADMIN_AUDIT_TYPE.USER_ADDRESS_DELETED]: 'user_management',

  // Admin Management
  [ADMIN_AUDIT_TYPE.ADMIN_CREATED]: 'admin_management',
  [ADMIN_AUDIT_TYPE.ADMIN_UPDATED]: 'admin_management',
  [ADMIN_AUDIT_TYPE.ADMIN_DELETED]: 'admin_management',
  [ADMIN_AUDIT_TYPE.ADMIN_ACTIVATED]: 'admin_management',
  [ADMIN_AUDIT_TYPE.ADMIN_DEACTIVATED]: 'admin_management',
  [ADMIN_AUDIT_TYPE.ADMIN_SUSPENDED]: 'admin_management',
  [ADMIN_AUDIT_TYPE.ADMIN_UNSUSPENDED]: 'admin_management',
  [ADMIN_AUDIT_TYPE.ADMIN_ROLE_CHANGED]: 'admin_management',
  [ADMIN_AUDIT_TYPE.ADMIN_PERMISSION_CHANGED]: 'admin_management',
  [ADMIN_AUDIT_TYPE.ADMIN_LEVEL_CHANGED]: 'admin_management',
  [ADMIN_AUDIT_TYPE.ADMIN_DEPARTMENT_CHANGED]: 'admin_management',
  [ADMIN_AUDIT_TYPE.ADMIN_TEAM_CHANGED]: 'admin_management',

  // Content Management
  [ADMIN_AUDIT_TYPE.CONTENT_CREATED]: 'content_management',
  [ADMIN_AUDIT_TYPE.CONTENT_UPDATED]: 'content_management',
  [ADMIN_AUDIT_TYPE.CONTENT_DELETED]: 'content_management',
  [ADMIN_AUDIT_TYPE.CONTENT_PUBLISHED]: 'content_management',
  [ADMIN_AUDIT_TYPE.CONTENT_UNPUBLISHED]: 'content_management',
  [ADMIN_AUDIT_TYPE.CONTENT_ARCHIVED]: 'content_management',
  [ADMIN_AUDIT_TYPE.CONTENT_RESTORED]: 'content_management',
  [ADMIN_AUDIT_TYPE.CONTENT_APPROVED]: 'content_management',
  [ADMIN_AUDIT_TYPE.CONTENT_REJECTED]: 'content_management',
  [ADMIN_AUDIT_TYPE.CONTENT_REVIEWED]: 'content_management',

  // Product Management
  [ADMIN_AUDIT_TYPE.PRODUCT_CREATED]: 'product_management',
  [ADMIN_AUDIT_TYPE.PRODUCT_UPDATED]: 'product_management',
  [ADMIN_AUDIT_TYPE.PRODUCT_DELETED]: 'product_management',
  [ADMIN_AUDIT_TYPE.PRODUCT_PUBLISHED]: 'product_management',
  [ADMIN_AUDIT_TYPE.PRODUCT_UNPUBLISHED]: 'product_management',
  [ADMIN_AUDIT_TYPE.PRODUCT_APPROVED]: 'product_management',
  [ADMIN_AUDIT_TYPE.PRODUCT_REJECTED]: 'product_management',
  [ADMIN_AUDIT_TYPE.PRODUCT_FEATURED]: 'product_management',
  [ADMIN_AUDIT_TYPE.PRODUCT_UNFEATURED]: 'product_management',
  [ADMIN_AUDIT_TYPE.PRODUCT_PRICE_CHANGED]: 'product_management',
  [ADMIN_AUDIT_TYPE.PRODUCT_INVENTORY_CHANGED]: 'product_management',
  [ADMIN_AUDIT_TYPE.PRODUCT_CATEGORY_CHANGED]: 'product_management',

  // Order Management
  [ADMIN_AUDIT_TYPE.ORDER_CREATED]: 'order_management',
  [ADMIN_AUDIT_TYPE.ORDER_UPDATED]: 'order_management',
  [ADMIN_AUDIT_TYPE.ORDER_CANCELLED]: 'order_management',
  [ADMIN_AUDIT_TYPE.ORDER_COMPLETED]: 'order_management',
  [ADMIN_AUDIT_TYPE.ORDER_SHIPPED]: 'order_management',
  [ADMIN_AUDIT_TYPE.ORDER_DELIVERED]: 'order_management',
  [ADMIN_AUDIT_TYPE.ORDER_RETURNED]: 'order_management',
  [ADMIN_AUDIT_TYPE.ORDER_REFUNDED]: 'order_management',
  [ADMIN_AUDIT_TYPE.ORDER_STATUS_CHANGED]: 'order_management',

  // Payment Management
  [ADMIN_AUDIT_TYPE.PAYMENT_PROCESSED]: 'payment_management',
  [ADMIN_AUDIT_TYPE.PAYMENT_VERIFIED]: 'payment_management',
  [ADMIN_AUDIT_TYPE.PAYMENT_REFUNDED]: 'payment_management',
  [ADMIN_AUDIT_TYPE.PAYMENT_CAPTURED]: 'payment_management',
  [ADMIN_AUDIT_TYPE.PAYMENT_VOIDED]: 'payment_management',
  [ADMIN_AUDIT_TYPE.PAYMENT_RECONCILED]: 'payment_management',
  [ADMIN_AUDIT_TYPE.PAYMENT_SETTLED]: 'payment_management',

  // System Management
  [ADMIN_AUDIT_TYPE.SYSTEM_BACKUP]: 'system_management',
  [ADMIN_AUDIT_TYPE.SYSTEM_RESTORE]: 'system_management',
  [ADMIN_AUDIT_TYPE.SYSTEM_UPDATED]: 'system_management',
  [ADMIN_AUDIT_TYPE.SYSTEM_UPGRADED]: 'system_management',
  [ADMIN_AUDIT_TYPE.SYSTEM_MAINTENANCE]: 'system_management',
  [ADMIN_AUDIT_TYPE.SYSTEM_CONFIG_CHANGED]: 'system_management',
  [ADMIN_AUDIT_TYPE.SYSTEM_CACHE_CLEARED]: 'system_management',
  [ADMIN_AUDIT_TYPE.SYSTEM_QUEUE_PROCESSED]: 'system_management',
  [ADMIN_AUDIT_TYPE.SYSTEM_DB_MIGRATED]: 'system_management',
  [ADMIN_AUDIT_TYPE.SYSTEM_DB_SEEDED]: 'system_management',

  // Security
  [ADMIN_AUDIT_TYPE.SECURITY_AUDIT]: 'security',
  [ADMIN_AUDIT_TYPE.SECURITY_SCAN]: 'security',
  [ADMIN_AUDIT_TYPE.SECURITY_ALERT]: 'security',
  [ADMIN_AUDIT_TYPE.SECURITY_IP_BLOCKED]: 'security',
  [ADMIN_AUDIT_TYPE.SECURITY_IP_UNBLOCKED]: 'security',
  [ADMIN_AUDIT_TYPE.SECURITY_RATE_LIMIT]: 'security',
  [ADMIN_AUDIT_TYPE.SECURITY_FIREWALL_UPDATED]: 'security',
  [ADMIN_AUDIT_TYPE.SECURITY_SSL_UPDATED]: 'security',
  [ADMIN_AUDIT_TYPE.SECURITY_BRUTE_FORCE]: 'security',
  [ADMIN_AUDIT_TYPE.SECURITY_SUSPICIOUS]: 'security',

  // Data
  [ADMIN_AUDIT_TYPE.DATA_EXPORTED]: 'data',
  [ADMIN_AUDIT_TYPE.DATA_IMPORTED]: 'data',
  [ADMIN_AUDIT_TYPE.DATA_SYNCED]: 'data',
  [ADMIN_AUDIT_TYPE.DATA_BACKUP]: 'data',
  [ADMIN_AUDIT_TYPE.DATA_RESTORE]: 'data',
  [ADMIN_AUDIT_TYPE.DATA_CLEARED]: 'data',
  [ADMIN_AUDIT_TYPE.DATA_PURGED]: 'data',

  // Reporting
  [ADMIN_AUDIT_TYPE.REPORT_GENERATED]: 'reporting',
  [ADMIN_AUDIT_TYPE.REPORT_EXPORTED]: 'reporting',
  [ADMIN_AUDIT_TYPE.REPORT_EMAILED]: 'reporting',
  [ADMIN_AUDIT_TYPE.REPORT_VIEWED]: 'reporting',
  [ADMIN_AUDIT_TYPE.REPORT_DELETED]: 'reporting',
  [ADMIN_AUDIT_TYPE.REPORT_SHARED]: 'reporting',

  // Analytics
  [ADMIN_AUDIT_TYPE.ANALYTICS_VIEWED]: 'analytics',
  [ADMIN_AUDIT_TYPE.ANALYTICS_EXPORTED]: 'analytics',
  [ADMIN_AUDIT_TYPE.ANALYTICS_TRACKED]: 'analytics',
  [ADMIN_AUDIT_TYPE.ANALYTICS_AGGREGATED]: 'analytics',

  // Support
  [ADMIN_AUDIT_TYPE.TICKET_CREATED]: 'support',
  [ADMIN_AUDIT_TYPE.TICKET_UPDATED]: 'support',
  [ADMIN_AUDIT_TYPE.TICKET_DELETED]: 'support',
  [ADMIN_AUDIT_TYPE.TICKET_ASSIGNED]: 'support',
  [ADMIN_AUDIT_TYPE.TICKET_UNASSIGNED]: 'support',
  [ADMIN_AUDIT_TYPE.TICKET_ESCALATED]: 'support',
  [ADMIN_AUDIT_TYPE.TICKET_RESOLVED]: 'support',
  [ADMIN_AUDIT_TYPE.TICKET_CLOSED]: 'support',
  [ADMIN_AUDIT_TYPE.TICKET_REOPENED]: 'support',

  // Logistics
  [ADMIN_AUDIT_TYPE.SHIPMENT_CREATED]: 'logistics',
  [ADMIN_AUDIT_TYPE.SHIPMENT_UPDATED]: 'logistics',
  [ADMIN_AUDIT_TYPE.SHIPMENT_DELETED]: 'logistics',
  [ADMIN_AUDIT_TYPE.SHIPMENT_SHIPPED]: 'logistics',
  [ADMIN_AUDIT_TYPE.SHIPMENT_DELIVERED]: 'logistics',
  [ADMIN_AUDIT_TYPE.SHIPMENT_RETURNED]: 'logistics',
  [ADMIN_AUDIT_TYPE.SHIPMENT_TRACKED]: 'logistics',

  // Vendor
  [ADMIN_AUDIT_TYPE.VENDOR_CREATED]: 'vendor_management',
  [ADMIN_AUDIT_TYPE.VENDOR_UPDATED]: 'vendor_management',
  [ADMIN_AUDIT_TYPE.VENDOR_DELETED]: 'vendor_management',
  [ADMIN_AUDIT_TYPE.VENDOR_APPROVED]: 'vendor_management',
  [ADMIN_AUDIT_TYPE.VENDOR_REJECTED]: 'vendor_management',
  [ADMIN_AUDIT_TYPE.VENDOR_SUSPENDED]: 'vendor_management',
  [ADMIN_AUDIT_TYPE.VENDOR_UNSUSPENDED]: 'vendor_management',
  [ADMIN_AUDIT_TYPE.VENDOR_VERIFIED]: 'vendor_management',
  [ADMIN_AUDIT_TYPE.VENDOR_PAYOUT]: 'vendor_management',

  // Marketing
  [ADMIN_AUDIT_TYPE.CAMPAIGN_CREATED]: 'marketing',
  [ADMIN_AUDIT_TYPE.CAMPAIGN_UPDATED]: 'marketing',
  [ADMIN_AUDIT_TYPE.CAMPAIGN_DELETED]: 'marketing',
  [ADMIN_AUDIT_TYPE.CAMPAIGN_STARTED]: 'marketing',
  [ADMIN_AUDIT_TYPE.CAMPAIGN_STOPPED]: 'marketing',
  [ADMIN_AUDIT_TYPE.CAMPAIGN_PAUSED]: 'marketing',
  [ADMIN_AUDIT_TYPE.CAMPAIGN_RESUMED]: 'marketing',

  // Notification
  [ADMIN_AUDIT_TYPE.NOTIFICATION_SENT]: 'notification',
  [ADMIN_AUDIT_TYPE.NOTIFICATION_DELIVERED]: 'notification',
  [ADMIN_AUDIT_TYPE.NOTIFICATION_FAILED]: 'notification',
  [ADMIN_AUDIT_TYPE.NOTIFICATION_VIEWED]: 'notification',
  [ADMIN_AUDIT_TYPE.NOTIFICATION_CLICKED]: 'notification',
  [ADMIN_AUDIT_TYPE.NOTIFICATION_BROADCAST]: 'notification',

  // Compliance
  [ADMIN_AUDIT_TYPE.COMPLIANCE_AUDIT]: 'compliance',
  [ADMIN_AUDIT_TYPE.COMPLIANCE_REPORT]: 'compliance',
  [ADMIN_AUDIT_TYPE.COMPLIANCE_VIOLATION]: 'compliance',
  [ADMIN_AUDIT_TYPE.COMPLIANCE_RESOLVED]: 'compliance',
  [ADMIN_AUDIT_TYPE.POLICY_UPDATED]: 'compliance',
  [ADMIN_AUDIT_TYPE.POLICY_CREATED]: 'compliance',
  [ADMIN_AUDIT_TYPE.POLICY_DELETED]: 'compliance',

  // Finance
  [ADMIN_AUDIT_TYPE.TRANSACTION_PROCESSED]: 'finance',
  [ADMIN_AUDIT_TYPE.TRANSACTION_VERIFIED]: 'finance',
  [ADMIN_AUDIT_TYPE.TRANSACTION_REVERSED]: 'finance',
  [ADMIN_AUDIT_TYPE.INVOICE_CREATED]: 'finance',
  [ADMIN_AUDIT_TYPE.INVOICE_UPDATED]: 'finance',
  [ADMIN_AUDIT_TYPE.INVOICE_PAID]: 'finance',
  [ADMIN_AUDIT_TYPE.INVOICE_CANCELLED]: 'finance',

  // HR
  [ADMIN_AUDIT_TYPE.EMPLOYEE_CREATED]: 'hr',
  [ADMIN_AUDIT_TYPE.EMPLOYEE_UPDATED]: 'hr',
  [ADMIN_AUDIT_TYPE.EMPLOYEE_DELETED]: 'hr',
  [ADMIN_AUDIT_TYPE.EMPLOYEE_PROMOTED]: 'hr',
  [ADMIN_AUDIT_TYPE.EMPLOYEE_DEMOTED]: 'hr',
  [ADMIN_AUDIT_TYPE.EMPLOYEE_TERMINATED]: 'hr',
};

export const ADMIN_AUDIT_TYPE_LABELS_DETAIL: Record<AdminAuditTypeDetail, string> = {
  // Authentication
  [ADMIN_AUDIT_TYPE.USER_LOGIN]: 'User Login',
  [ADMIN_AUDIT_TYPE.USER_LOGOUT]: 'User Logout',
  [ADMIN_AUDIT_TYPE.USER_LOGIN_FAILED]: 'User Login Failed',
  [ADMIN_AUDIT_TYPE.USER_LOGOUT_FAILED]: 'User Logout Failed',
  [ADMIN_AUDIT_TYPE.USER_REGISTER]: 'User Registered',
  [ADMIN_AUDIT_TYPE.USER_VERIFY_EMAIL]: 'User Email Verified',
  [ADMIN_AUDIT_TYPE.USER_RESET_PASSWORD]: 'User Password Reset',
  [ADMIN_AUDIT_TYPE.USER_CHANGE_PASSWORD]: 'User Password Changed',
  [ADMIN_AUDIT_TYPE.USER_TWO_FA]: '2FA Performed',
  [ADMIN_AUDIT_TYPE.USER_TWO_FA_ENABLE]: '2FA Enabled',
  [ADMIN_AUDIT_TYPE.USER_TWO_FA_DISABLE]: '2FA Disabled',
  [ADMIN_AUDIT_TYPE.USER_TWO_FA_VERIFY]: '2FA Verified',

  // Authorization
  [ADMIN_AUDIT_TYPE.PERMISSION_GRANTED]: 'Permission Granted',
  [ADMIN_AUDIT_TYPE.PERMISSION_REVOKED]: 'Permission Revoked',
  [ADMIN_AUDIT_TYPE.ROLE_ASSIGNED]: 'Role Assigned',
  [ADMIN_AUDIT_TYPE.ROLE_REMOVED]: 'Role Removed',
  [ADMIN_AUDIT_TYPE.ROLE_CREATED]: 'Role Created',
  [ADMIN_AUDIT_TYPE.ROLE_UPDATED]: 'Role Updated',
  [ADMIN_AUDIT_TYPE.ROLE_DELETED]: 'Role Deleted',
  [ADMIN_AUDIT_TYPE.PERMISSION_CREATED]: 'Permission Created',
  [ADMIN_AUDIT_TYPE.PERMISSION_UPDATED]: 'Permission Updated',
  [ADMIN_AUDIT_TYPE.PERMISSION_DELETED]: 'Permission Deleted',

  // User Management
  [ADMIN_AUDIT_TYPE.USER_CREATED]: 'User Created',
  [ADMIN_AUDIT_TYPE.USER_UPDATED]: 'User Updated',
  [ADMIN_AUDIT_TYPE.USER_DELETED]: 'User Deleted',
  [ADMIN_AUDIT_TYPE.USER_ACTIVATED]: 'User Activated',
  [ADMIN_AUDIT_TYPE.USER_DEACTIVATED]: 'User Deactivated',
  [ADMIN_AUDIT_TYPE.USER_BANNED]: 'User Banned',
  [ADMIN_AUDIT_TYPE.USER_UNBANNED]: 'User Unbanned',
  [ADMIN_AUDIT_TYPE.USER_SUSPENDED]: 'User Suspended',
  [ADMIN_AUDIT_TYPE.USER_UNSUSPENDED]: 'User Unsuspended',
  [ADMIN_AUDIT_TYPE.USER_VERIFIED]: 'User Verified',
  [ADMIN_AUDIT_TYPE.USER_UNVERIFIED]: 'User Unverified',
  [ADMIN_AUDIT_TYPE.USER_PROFILE_UPDATED]: 'User Profile Updated',
  [ADMIN_AUDIT_TYPE.USER_SETTINGS_UPDATED]: 'User Settings Updated',
  [ADMIN_AUDIT_TYPE.USER_PREFERENCES_UPDATED]: 'User Preferences Updated',
  [ADMIN_AUDIT_TYPE.USER_ADDRESS_ADDED]: 'User Address Added',
  [ADMIN_AUDIT_TYPE.USER_ADDRESS_UPDATED]: 'User Address Updated',
  [ADMIN_AUDIT_TYPE.USER_ADDRESS_DELETED]: 'User Address Deleted',

  // Admin Management
  [ADMIN_AUDIT_TYPE.ADMIN_CREATED]: 'Admin Created',
  [ADMIN_AUDIT_TYPE.ADMIN_UPDATED]: 'Admin Updated',
  [ADMIN_AUDIT_TYPE.ADMIN_DELETED]: 'Admin Deleted',
  [ADMIN_AUDIT_TYPE.ADMIN_ACTIVATED]: 'Admin Activated',
  [ADMIN_AUDIT_TYPE.ADMIN_DEACTIVATED]: 'Admin Deactivated',
  [ADMIN_AUDIT_TYPE.ADMIN_SUSPENDED]: 'Admin Suspended',
  [ADMIN_AUDIT_TYPE.ADMIN_UNSUSPENDED]: 'Admin Unsuspended',
  [ADMIN_AUDIT_TYPE.ADMIN_ROLE_CHANGED]: 'Admin Role Changed',
  [ADMIN_AUDIT_TYPE.ADMIN_PERMISSION_CHANGED]: 'Admin Permission Changed',
  [ADMIN_AUDIT_TYPE.ADMIN_LEVEL_CHANGED]: 'Admin Level Changed',
  [ADMIN_AUDIT_TYPE.ADMIN_DEPARTMENT_CHANGED]: 'Admin Department Changed',
  [ADMIN_AUDIT_TYPE.ADMIN_TEAM_CHANGED]: 'Admin Team Changed',

  // Content Management
  [ADMIN_AUDIT_TYPE.CONTENT_CREATED]: 'Content Created',
  [ADMIN_AUDIT_TYPE.CONTENT_UPDATED]: 'Content Updated',
  [ADMIN_AUDIT_TYPE.CONTENT_DELETED]: 'Content Deleted',
  [ADMIN_AUDIT_TYPE.CONTENT_PUBLISHED]: 'Content Published',
  [ADMIN_AUDIT_TYPE.CONTENT_UNPUBLISHED]: 'Content Unpublished',
  [ADMIN_AUDIT_TYPE.CONTENT_ARCHIVED]: 'Content Archived',
  [ADMIN_AUDIT_TYPE.CONTENT_RESTORED]: 'Content Restored',
  [ADMIN_AUDIT_TYPE.CONTENT_APPROVED]: 'Content Approved',
  [ADMIN_AUDIT_TYPE.CONTENT_REJECTED]: 'Content Rejected',
  [ADMIN_AUDIT_TYPE.CONTENT_REVIEWED]: 'Content Reviewed',

  // Product Management
  [ADMIN_AUDIT_TYPE.PRODUCT_CREATED]: 'Product Created',
  [ADMIN_AUDIT_TYPE.PRODUCT_UPDATED]: 'Product Updated',
  [ADMIN_AUDIT_TYPE.PRODUCT_DELETED]: 'Product Deleted',
  [ADMIN_AUDIT_TYPE.PRODUCT_PUBLISHED]: 'Product Published',
  [ADMIN_AUDIT_TYPE.PRODUCT_UNPUBLISHED]: 'Product Unpublished',
  [ADMIN_AUDIT_TYPE.PRODUCT_APPROVED]: 'Product Approved',
  [ADMIN_AUDIT_TYPE.PRODUCT_REJECTED]: 'Product Rejected',
  [ADMIN_AUDIT_TYPE.PRODUCT_FEATURED]: 'Product Featured',
  [ADMIN_AUDIT_TYPE.PRODUCT_UNFEATURED]: 'Product Unfeatured',
  [ADMIN_AUDIT_TYPE.PRODUCT_PRICE_CHANGED]: 'Product Price Changed',
  [ADMIN_AUDIT_TYPE.PRODUCT_INVENTORY_CHANGED]: 'Product Inventory Changed',
  [ADMIN_AUDIT_TYPE.PRODUCT_CATEGORY_CHANGED]: 'Product Category Changed',

  // Order Management
  [ADMIN_AUDIT_TYPE.ORDER_CREATED]: 'Order Created',
  [ADMIN_AUDIT_TYPE.ORDER_UPDATED]: 'Order Updated',
  [ADMIN_AUDIT_TYPE.ORDER_CANCELLED]: 'Order Cancelled',
  [ADMIN_AUDIT_TYPE.ORDER_COMPLETED]: 'Order Completed',
  [ADMIN_AUDIT_TYPE.ORDER_SHIPPED]: 'Order Shipped',
  [ADMIN_AUDIT_TYPE.ORDER_DELIVERED]: 'Order Delivered',
  [ADMIN_AUDIT_TYPE.ORDER_RETURNED]: 'Order Returned',
  [ADMIN_AUDIT_TYPE.ORDER_REFUNDED]: 'Order Refunded',
  [ADMIN_AUDIT_TYPE.ORDER_STATUS_CHANGED]: 'Order Status Changed',

  // Payment Management
  [ADMIN_AUDIT_TYPE.PAYMENT_PROCESSED]: 'Payment Processed',
  [ADMIN_AUDIT_TYPE.PAYMENT_VERIFIED]: 'Payment Verified',
  [ADMIN_AUDIT_TYPE.PAYMENT_REFUNDED]: 'Payment Refunded',
  [ADMIN_AUDIT_TYPE.PAYMENT_CAPTURED]: 'Payment Captured',
  [ADMIN_AUDIT_TYPE.PAYMENT_VOIDED]: 'Payment Voided',
  [ADMIN_AUDIT_TYPE.PAYMENT_RECONCILED]: 'Payment Reconciled',
  [ADMIN_AUDIT_TYPE.PAYMENT_SETTLED]: 'Payment Settled',

  // System Management
  [ADMIN_AUDIT_TYPE.SYSTEM_BACKUP]: 'System Backup',
  [ADMIN_AUDIT_TYPE.SYSTEM_RESTORE]: 'System Restore',
  [ADMIN_AUDIT_TYPE.SYSTEM_UPDATED]: 'System Updated',
  [ADMIN_AUDIT_TYPE.SYSTEM_UPGRADED]: 'System Upgraded',
  [ADMIN_AUDIT_TYPE.SYSTEM_MAINTENANCE]: 'System Maintenance',
  [ADMIN_AUDIT_TYPE.SYSTEM_CONFIG_CHANGED]: 'System Config Changed',
  [ADMIN_AUDIT_TYPE.SYSTEM_CACHE_CLEARED]: 'System Cache Cleared',
  [ADMIN_AUDIT_TYPE.SYSTEM_QUEUE_PROCESSED]: 'System Queue Processed',
  [ADMIN_AUDIT_TYPE.SYSTEM_DB_MIGRATED]: 'Database Migrated',
  [ADMIN_AUDIT_TYPE.SYSTEM_DB_SEEDED]: 'Database Seeded',

  // Security
  [ADMIN_AUDIT_TYPE.SECURITY_AUDIT]: 'Security Audit',
  [ADMIN_AUDIT_TYPE.SECURITY_SCAN]: 'Security Scan',
  [ADMIN_AUDIT_TYPE.SECURITY_ALERT]: 'Security Alert',
  [ADMIN_AUDIT_TYPE.SECURITY_IP_BLOCKED]: 'IP Blocked',
  [ADMIN_AUDIT_TYPE.SECURITY_IP_UNBLOCKED]: 'IP Unblocked',
  [ADMIN_AUDIT_TYPE.SECURITY_RATE_LIMIT]: 'Rate Limit Applied',
  [ADMIN_AUDIT_TYPE.SECURITY_FIREWALL_UPDATED]: 'Firewall Updated',
  [ADMIN_AUDIT_TYPE.SECURITY_SSL_UPDATED]: 'SSL Updated',
  [ADMIN_AUDIT_TYPE.SECURITY_BRUTE_FORCE]: 'Brute Force Attack',
  [ADMIN_AUDIT_TYPE.SECURITY_SUSPICIOUS]: 'Suspicious Activity',

  // Data
  [ADMIN_AUDIT_TYPE.DATA_EXPORTED]: 'Data Exported',
  [ADMIN_AUDIT_TYPE.DATA_IMPORTED]: 'Data Imported',
  [ADMIN_AUDIT_TYPE.DATA_SYNCED]: 'Data Synced',
  [ADMIN_AUDIT_TYPE.DATA_BACKUP]: 'Data Backup',
  [ADMIN_AUDIT_TYPE.DATA_RESTORE]: 'Data Restore',
  [ADMIN_AUDIT_TYPE.DATA_CLEARED]: 'Data Cleared',
  [ADMIN_AUDIT_TYPE.DATA_PURGED]: 'Data Purged',

  // Reporting
  [ADMIN_AUDIT_TYPE.REPORT_GENERATED]: 'Report Generated',
  [ADMIN_AUDIT_TYPE.REPORT_EXPORTED]: 'Report Exported',
  [ADMIN_AUDIT_TYPE.REPORT_EMAILED]: 'Report Emailed',
  [ADMIN_AUDIT_TYPE.REPORT_VIEWED]: 'Report Viewed',
  [ADMIN_AUDIT_TYPE.REPORT_DELETED]: 'Report Deleted',
  [ADMIN_AUDIT_TYPE.REPORT_SHARED]: 'Report Shared',

  // Analytics
  [ADMIN_AUDIT_TYPE.ANALYTICS_VIEWED]: 'Analytics Viewed',
  [ADMIN_AUDIT_TYPE.ANALYTICS_EXPORTED]: 'Analytics Exported',
  [ADMIN_AUDIT_TYPE.ANALYTICS_TRACKED]: 'Analytics Tracked',
  [ADMIN_AUDIT_TYPE.ANALYTICS_AGGREGATED]: 'Analytics Aggregated',

  // Support
  [ADMIN_AUDIT_TYPE.TICKET_CREATED]: 'Support Ticket Created',
  [ADMIN_AUDIT_TYPE.TICKET_UPDATED]: 'Support Ticket Updated',
  [ADMIN_AUDIT_TYPE.TICKET_DELETED]: 'Support Ticket Deleted',
  [ADMIN_AUDIT_TYPE.TICKET_ASSIGNED]: 'Support Ticket Assigned',
  [ADMIN_AUDIT_TYPE.TICKET_UNASSIGNED]: 'Support Ticket Unassigned',
  [ADMIN_AUDIT_TYPE.TICKET_ESCALATED]: 'Support Ticket Escalated',
  [ADMIN_AUDIT_TYPE.TICKET_RESOLVED]: 'Support Ticket Resolved',
  [ADMIN_AUDIT_TYPE.TICKET_CLOSED]: 'Support Ticket Closed',
  [ADMIN_AUDIT_TYPE.TICKET_REOPENED]: 'Support Ticket Reopened',

  // Logistics
  [ADMIN_AUDIT_TYPE.SHIPMENT_CREATED]: 'Shipment Created',
  [ADMIN_AUDIT_TYPE.SHIPMENT_UPDATED]: 'Shipment Updated',
  [ADMIN_AUDIT_TYPE.SHIPMENT_DELETED]: 'Shipment Deleted',
  [ADMIN_AUDIT_TYPE.SHIPMENT_SHIPPED]: 'Shipment Shipped',
  [ADMIN_AUDIT_TYPE.SHIPMENT_DELIVERED]: 'Shipment Delivered',
  [ADMIN_AUDIT_TYPE.SHIPMENT_RETURNED]: 'Shipment Returned',
  [ADMIN_AUDIT_TYPE.SHIPMENT_TRACKED]: 'Shipment Tracked',

  // Vendor
  [ADMIN_AUDIT_TYPE.VENDOR_CREATED]: 'Vendor Created',
  [ADMIN_AUDIT_TYPE.VENDOR_UPDATED]: 'Vendor Updated',
  [ADMIN_AUDIT_TYPE.VENDOR_DELETED]: 'Vendor Deleted',
  [ADMIN_AUDIT_TYPE.VENDOR_APPROVED]: 'Vendor Approved',
  [ADMIN_AUDIT_TYPE.VENDOR_REJECTED]: 'Vendor Rejected',
  [ADMIN_AUDIT_TYPE.VENDOR_SUSPENDED]: 'Vendor Suspended',
  [ADMIN_AUDIT_TYPE.VENDOR_UNSUSPENDED]: 'Vendor Unsuspended',
  [ADMIN_AUDIT_TYPE.VENDOR_VERIFIED]: 'Vendor Verified',
  [ADMIN_AUDIT_TYPE.VENDOR_PAYOUT]: 'Vendor Payout',

  // Marketing
  [ADMIN_AUDIT_TYPE.CAMPAIGN_CREATED]: 'Campaign Created',
  [ADMIN_AUDIT_TYPE.CAMPAIGN_UPDATED]: 'Campaign Updated',
  [ADMIN_AUDIT_TYPE.CAMPAIGN_DELETED]: 'Campaign Deleted',
  [ADMIN_AUDIT_TYPE.CAMPAIGN_STARTED]: 'Campaign Started',
  [ADMIN_AUDIT_TYPE.CAMPAIGN_STOPPED]: 'Campaign Stopped',
  [ADMIN_AUDIT_TYPE.CAMPAIGN_PAUSED]: 'Campaign Paused',
  [ADMIN_AUDIT_TYPE.CAMPAIGN_RESUMED]: 'Campaign Resumed',

  // Notification
  [ADMIN_AUDIT_TYPE.NOTIFICATION_SENT]: 'Notification Sent',
  [ADMIN_AUDIT_TYPE.NOTIFICATION_DELIVERED]: 'Notification Delivered',
  [ADMIN_AUDIT_TYPE.NOTIFICATION_FAILED]: 'Notification Failed',
  [ADMIN_AUDIT_TYPE.NOTIFICATION_VIEWED]: 'Notification Viewed',
  [ADMIN_AUDIT_TYPE.NOTIFICATION_CLICKED]: 'Notification Clicked',
  [ADMIN_AUDIT_TYPE.NOTIFICATION_BROADCAST]: 'Notification Broadcast',

  // Compliance
  [ADMIN_AUDIT_TYPE.COMPLIANCE_AUDIT]: 'Compliance Audit',
  [ADMIN_AUDIT_TYPE.COMPLIANCE_REPORT]: 'Compliance Report',
  [ADMIN_AUDIT_TYPE.COMPLIANCE_VIOLATION]: 'Compliance Violation',
  [ADMIN_AUDIT_TYPE.COMPLIANCE_RESOLVED]: 'Compliance Resolved',
  [ADMIN_AUDIT_TYPE.POLICY_UPDATED]: 'Policy Updated',
  [ADMIN_AUDIT_TYPE.POLICY_CREATED]: 'Policy Created',
  [ADMIN_AUDIT_TYPE.POLICY_DELETED]: 'Policy Deleted',

  // Finance
  [ADMIN_AUDIT_TYPE.TRANSACTION_PROCESSED]: 'Transaction Processed',
  [ADMIN_AUDIT_TYPE.TRANSACTION_VERIFIED]: 'Transaction Verified',
  [ADMIN_AUDIT_TYPE.TRANSACTION_REVERSED]: 'Transaction Reversed',
  [ADMIN_AUDIT_TYPE.INVOICE_CREATED]: 'Invoice Created',
  [ADMIN_AUDIT_TYPE.INVOICE_UPDATED]: 'Invoice Updated',
  [ADMIN_AUDIT_TYPE.INVOICE_PAID]: 'Invoice Paid',
  [ADMIN_AUDIT_TYPE.INVOICE_CANCELLED]: 'Invoice Cancelled',

  // HR
  [ADMIN_AUDIT_TYPE.EMPLOYEE_CREATED]: 'Employee Created',
  [ADMIN_AUDIT_TYPE.EMPLOYEE_UPDATED]: 'Employee Updated',
  [ADMIN_AUDIT_TYPE.EMPLOYEE_DELETED]: 'Employee Deleted',
  [ADMIN_AUDIT_TYPE.EMPLOYEE_PROMOTED]: 'Employee Promoted',
  [ADMIN_AUDIT_TYPE.EMPLOYEE_DEMOTED]: 'Employee Demoted',
  [ADMIN_AUDIT_TYPE.EMPLOYEE_TERMINATED]: 'Employee Terminated',
};

export function getAdminAuditTypeCategory(type: AdminAuditTypeDetail): string {
  return ADMIN_AUDIT_TYPE_CATEGORIES[type] || 'other';
}

export function getAdminAuditTypeLabel(type: AdminAuditTypeDetail): string {
  return ADMIN_AUDIT_TYPE_LABELS_DETAIL[type] || 'Unknown Audit Type';
}

export function isAdminAuditSecurity(type: AdminAuditTypeDetail): boolean {
  return getAdminAuditTypeCategory(type) === 'security';
}

export function isAdminAuditCompliance(type: AdminAuditTypeDetail): boolean {
  return getAdminAuditTypeCategory(type) === 'compliance';
}

export function isAdminAuditFinancial(type: AdminAuditTypeDetail): boolean {
  return getAdminAuditTypeCategory(type) === 'finance';
}

export function isAdminAuditUser(type: AdminAuditTypeDetail): boolean {
  return (
    getAdminAuditTypeCategory(type) === 'user_management' ||
    getAdminAuditTypeCategory(type) === 'authentication'
  );
}

export function isAdminAuditSystem(type: AdminAuditTypeDetail): boolean {
  return getAdminAuditTypeCategory(type) === 'system_management';
}
