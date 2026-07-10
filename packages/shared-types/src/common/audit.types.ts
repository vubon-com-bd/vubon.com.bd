/**
 * Audit Types - Pure TypeScript type contracts for Audit Logging
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-types/src/common/audit.types
 * 
 * RULES:
 * ✅ ONLY type declarations, interfaces, unions
 * ✅ NO imports from constants (not needed)
 * ✅ NO audit logging implementation, event publishing logic
 * ✅ NO functions, classes, enums
 * ✅ NO framework imports
 */

// ============================================================
// Audit Action Types (E-commerce comprehensive)
// ============================================================
export type AuditAction = 
  // ========== Authentication Actions ==========
  | 'LOGIN'
  | 'LOGIN_FAILED'
  | 'LOGOUT'
  | 'REGISTER'
  | 'REGISTER_FAILED'
  | 'PASSWORD_CHANGE'
  | 'PASSWORD_RESET'
  | 'PASSWORD_RESET_REQUEST'
  | 'MFA_ENABLE'
  | 'MFA_DISABLE'
  | 'MFA_VERIFY'
  | 'MFA_VERIFY_FAILED'
  | 'MFA_BACKUP_CODE_USED'
  | 'MFA_RECOVERY_USED'
  | 'SESSION_CREATED'
  | 'SESSION_REVOKED'
  | 'SESSION_EXPIRED'
  | 'SESSION_TRANSFER'
  
  // ========== User Management Actions ==========
  | 'USER_CREATE'
  | 'USER_UPDATE'
  | 'USER_DELETE'
  | 'USER_SUSPEND'
  | 'USER_ACTIVATE'
  | 'USER_BAN'
  | 'USER_UNBAN'
  | 'USER_VERIFY_EMAIL'
  | 'USER_VERIFY_PHONE'
  | 'USER_KYC_VERIFY'
  | 'USER_ROLE_ASSIGN'
  | 'USER_ROLE_REVOKE'
  | 'USER_IMPERSONATE_START'
  | 'USER_IMPERSONATE_END'
  | 'USER_MERGE'
  | 'USER_EXPORT'
  | 'USER_IMPORT'
  
  // ========== Product Management Actions ==========
  | 'PRODUCT_CREATE'
  | 'PRODUCT_UPDATE'
  | 'PRODUCT_DELETE'
  | 'PRODUCT_PUBLISH'
  | 'PRODUCT_UNPUBLISH'
  | 'PRODUCT_APPROVE'
  | 'PRODUCT_REJECT'
  | 'PRODUCT_FEATURE'
  | 'PRODUCT_UNFEATURE'
  | 'PRODUCT_PRICE_UPDATE'
  | 'PRODUCT_STOCK_UPDATE'
  | 'PRODUCT_BULK_UPDATE'
  | 'PRODUCT_IMPORT'
  | 'PRODUCT_EXPORT'
  
  // ========== Category/Brand Actions ==========
  | 'CATEGORY_CREATE'
  | 'CATEGORY_UPDATE'
  | 'CATEGORY_DELETE'
  | 'BRAND_CREATE'
  | 'BRAND_UPDATE'
  | 'BRAND_DELETE'
  
  // ========== Order Management Actions ==========
  | 'ORDER_CREATE'
  | 'ORDER_UPDATE'
  | 'ORDER_CANCEL'
  | 'ORDER_REFUND'
  | 'ORDER_APPROVE'
  | 'ORDER_REJECT'
  | 'ORDER_SHIP'
  | 'ORDER_DELIVER'
  | 'ORDER_STATUS_CHANGE'
  | 'ORDER_BULK_UPDATE'
  | 'ORDER_EXPORT'
  
  // ========== Payment Actions ==========
  | 'PAYMENT_INITIATE'
  | 'PAYMENT_SUCCESS'
  | 'PAYMENT_FAILED'
  | 'PAYMENT_REFUND'
  | 'PAYMENT_VOID'
  | 'PAYMENT_CAPTURE'
  
  // ========== Bangladesh Specific Payment Actions ==========
  | 'BKASH_PAYMENT_INITIATE'
  | 'BKASH_PAYMENT_SUCCESS'
  | 'BKASH_PAYMENT_FAILED'
  | 'NAGAD_PAYMENT_INITIATE'
  | 'NAGAD_PAYMENT_SUCCESS'
  | 'NAGAD_PAYMENT_FAILED'
  | 'ROCKET_PAYMENT_INITIATE'
  | 'ROCKET_PAYMENT_SUCCESS'
  | 'ROCKET_PAYMENT_FAILED'
  | 'SSLCOMMERZ_PAYMENT_SUCCESS'
  | 'SSLCOMMERZ_PAYMENT_FAILED'
  
  // ========== Inventory Actions ==========
  | 'INVENTORY_UPDATE'
  | 'INVENTORY_ADJUST'
  | 'INVENTORY_RESERVE'
  | 'INVENTORY_RELEASE'
  | 'INVENTORY_BULK_UPDATE'
  | 'INVENTORY_LOW_STOCK_ALERT'
  
  // ========== Permission & Role Actions ==========
  | 'PERMISSION_GRANT'
  | 'PERMISSION_REVOKE'
  | 'ROLE_CREATE'
  | 'ROLE_UPDATE'
  | 'ROLE_DELETE'
  | 'ROLE_ASSIGN'
  | 'ROLE_REVOKE'
  
  // ========== Vendor/Seller Actions ==========
  | 'VENDOR_CREATE'
  | 'VENDOR_UPDATE'
  | 'VENDOR_VERIFY'
  | 'VENDOR_SUSPEND'
  | 'VENDOR_ACTIVATE'
  | 'VENDOR_PAYOUT'
  | 'VENDOR_COMMISSION_UPDATE'
  | 'SHOP_CREATE'
  | 'SHOP_UPDATE'
  | 'SHOP_DELETE'
  
  // ========== Delivery Actions ==========
  | 'DELIVERY_ASSIGN'
  | 'DELIVERY_PICKUP'
  | 'DELIVERY_IN_TRANSIT'
  | 'DELIVERY_DELIVERED'
  | 'DELIVERY_FAILED'
  | 'DELIVERY_RETURN'
  
  // ========== Coupon/Offer Actions ==========
  | 'COUPON_CREATE'
  | 'COUPON_UPDATE'
  | 'COUPON_DELETE'
  | 'COUPON_APPLY'
  | 'OFFER_CREATE'
  | 'OFFER_UPDATE'
  | 'OFFER_DELETE'
  | 'FLASH_SALE_START'
  | 'FLASH_SALE_END'
  
  // ========== Review Actions ==========
  | 'REVIEW_CREATE'
  | 'REVIEW_UPDATE'
  | 'REVIEW_DELETE'
  | 'REVIEW_MODERATE'
  | 'REVIEW_REPORT'
  
  // ========== Support/Ticket Actions ==========
  | 'TICKET_CREATE'
  | 'TICKET_UPDATE'
  | 'TICKET_RESOLVE'
  | 'TICKET_ASSIGN'
  
  // ========== Notification Actions ==========
  | 'NOTIFICATION_SEND'
  | 'NOTIFICATION_BROADCAST'
  
  // ========== System Actions ==========
  | 'SYSTEM_CONFIG_UPDATE'
  | 'SYSTEM_CACHE_CLEAR'
  | 'SYSTEM_QUEUE_PURGE'
  | 'SYSTEM_QUEUE_RETRY'
  | 'SYSTEM_BACKUP_CREATE'
  | 'SYSTEM_BACKUP_RESTORE'
  | 'SYSTEM_MAINTENANCE_START'
  | 'SYSTEM_MAINTENANCE_END'
  | 'SYSTEM_HEALTH_CHECK'
  
  // ========== Data Actions ==========
  | 'DATA_EXPORT'
  | 'DATA_IMPORT'
  | 'REPORT_GENERATE'
  | 'REPORT_SCHEDULE'
  | 'REPORT_DELETE'
  
  // ========== Security Actions ==========
  | 'SECURITY_ALERT'
  | 'IP_BLOCK'
  | 'IP_UNBLOCK'
  | 'DEVICE_BLOCK'
  | 'DEVICE_UNBLOCK'
  | 'RATE_LIMIT_CHANGE';

// ============================================================
// Audit Severity Levels
// ============================================================
export type AuditSeverity = 
  | 'info'        // Normal operations
  | 'warning'     // Unusual but not harmful
  | 'error'       // Failed operations
  | 'critical';   // Security breach, data loss

// ============================================================
// Audit Resource Types
// ============================================================
export type AuditResource = 
  | 'auth'
  | 'user'
  | 'role'
  | 'permission'
  | 'product'
  | 'category'
  | 'brand'
  | 'order'
  | 'payment'
  | 'inventory'
  | 'review'
  | 'coupon'
  | 'offer'
  | 'vendor'
  | 'shop'
  | 'delivery'
  | 'ticket'
  | 'notification'
  | 'system'
  | 'config'
  | 'cache'
  | 'queue'
  | 'backup'
  | 'report'
  | 'export'
  | 'import'
  | 'security'
  | 'kyc'
  | 'mfa'
  | 'session'
  | 'device';

// ============================================================
// Audit Log Entry (Core domain model)
// ============================================================
export interface AuditLog {
  readonly id: string;
  readonly userId: string | null;
  readonly userEmail: string | null;
  readonly userRole: string | null;
  readonly userFirstName?: string | null;
  readonly userLastName?: string | null;
  readonly action: AuditAction;
  readonly resource: AuditResource;
  readonly resourceId: string | null;
  readonly resourceName?: string | null;
  readonly changes: readonly AuditChange[];
  readonly metadata: AuditMetadata;
  readonly ipAddress: string;
  readonly userAgent: string;
  readonly deviceId?: string;
  readonly sessionId?: string;
  readonly requestId: string;
  readonly correlationId?: string;
  readonly severity: AuditSeverity;
  readonly createdAt: Date;
  
  // Bangladesh specific
  readonly district?: string;
  readonly mobileOperator?: string;
}

// ============================================================
// Audit Change (Track before/after values)
// ============================================================
export interface AuditChange {
  readonly field: string;
  readonly oldValue: unknown;
  readonly newValue: unknown;
  readonly oldValueDisplay?: string;      // Human readable
  readonly newValueDisplay?: string;      // Human readable
}

// packages/shared-types/src/common/audit.types.ts
// ✅ এই কোড দিয়ে বিদ্যমান AuditMetadata রিপ্লেস করুন

export interface AuditMetadata {
  readonly requestId?: string | null | undefined;
  readonly sessionId?: string | undefined;  // ✅ undefined যোগ করুন
  readonly correlationId?: string | undefined;  // ✅ undefined যোগ করুন
  readonly traceId?: string;
   readonly userId?: string;
  readonly reason?: string;
  readonly source?: string;
  readonly tenantId?: string;
  readonly environment?: 'development' | 'staging' | 'production';
  readonly additionalData?: Record<string, unknown>;
  readonly beforeSnapshot?: Record<string, unknown>;
  readonly afterSnapshot?: Record<string, unknown>;
  readonly timestamp?: Date | string;  // ✅ যোগ করুন
  // ✅ নিচের ফিল্ডগুলো অ্যাড করুন (Base Entity এর জন্য)
  readonly createdBy?: string;
  readonly createdByIp?: string;
  readonly createdByUserAgent?: string;
  readonly lastModifiedBy?: string;
  readonly lastModifiedByIp?: string;
  readonly lastModifiedByUserAgent?: string;
  readonly tags?: string[];
  readonly custom?: Record<string, unknown>;
}



// ============================================================
// Create Audit Log Request (Internal)
// ============================================================
export interface CreateAuditLogRequest {
  readonly userId?: string;
  readonly userEmail?: string;
  readonly userRole?: string;
  readonly userFirstName?: string;
  readonly userLastName?: string;
  readonly action: AuditAction;
  readonly resource: AuditResource;
  readonly resourceId?: string;
  readonly resourceName?: string;
  readonly timestamp?: Date | string;  // ✅ যোগ করুন
  readonly changes?: readonly AuditChange[];
  readonly metadata?: Partial<AuditMetadata>;
  readonly ipAddress?: string;
  readonly userAgent?: string;
  readonly deviceId?: string;
  readonly sessionId?: string;
  readonly requestId?: string;
  readonly correlationId?: string;
  readonly severity?: AuditSeverity;
  
  // Bangladesh specific
  readonly district?: string;
  readonly mobileOperator?: string;
}

// ============================================================
// Audit Log Filter Options
// ============================================================
export interface AuditLogFilters {
  readonly userId?: string;
  readonly userEmail?: string;
  readonly action?: readonly AuditAction[];
  readonly resource?: AuditResource;
  readonly resourceId?: string;
  readonly severity?: readonly AuditSeverity[];
  readonly fromDate?: Date;
  readonly toDate?: Date;
  readonly search?: string;               // Search in fields
  readonly ipAddress?: string;
  readonly sessionId?: string;
  readonly correlationId?: string;
  readonly source?: string;
  
  // Bangladesh specific
  readonly district?: string;
}

// ============================================================
// Audit Log DTO for API Responses
// ============================================================
export interface AuditLogDTO {
  readonly id: string;
  readonly userId: string | null;
  readonly userEmail: string | null;
  readonly userDisplayName: string | null;
  readonly action: AuditAction;
  readonly resource: AuditResource;
  readonly resourceId: string | null;
  readonly resourceName: string | null;
  readonly changes: readonly AuditChange[];
  readonly metadata: AuditMetadata;
  readonly ipAddress: string;
  readonly userAgent: string;
  readonly severity: AuditSeverity;
  readonly createdAt: string;            // ISO date
  readonly requestId: string;
}

// ============================================================
// Audit Statistics
// ============================================================
export interface AuditStatistics {
  readonly totalEvents: number;
  readonly eventsByAction: ReadonlyArray<{
    readonly action: AuditAction;
    readonly count: number;
    readonly percentage: number;
  }>;
  
  readonly eventsBySeverity: ReadonlyArray<{
    readonly severity: AuditSeverity;
    readonly count: number;
    readonly percentage: number;
  }>;
  
  readonly eventsByResource: ReadonlyArray<{
    readonly resource: AuditResource;
    readonly count: number;
  }>;
  
  readonly eventsByHour: ReadonlyArray<{
    readonly hour: string;
    readonly count: number;
  }>;
  
  readonly eventsByDay: ReadonlyArray<{
    readonly day: string;
    readonly count: number;
  }>;
  
  readonly topUsers: ReadonlyArray<{
    readonly userId: string;
    readonly userEmail: string;
    readonly count: number;
  }>;
  
  readonly topActions: ReadonlyArray<{
    readonly action: AuditAction;
    readonly count: number;
  }>;
  
  readonly criticalEvents: number;
  readonly errorEvents: number;
  readonly warningEvents: number;
  readonly infoEvents: number;
  
  readonly timeRange: {
    readonly from: Date;
    readonly to: Date;
  };
}

// ============================================================
// Audit Retention Policy
// ============================================================
export interface AuditRetentionPolicy {
  readonly retentionDays: number;
  readonly archiveAfterDays: number;
  readonly deleteAfterDays: number;
  readonly excludeSeverity?: readonly AuditSeverity[];
  readonly excludeActions?: readonly AuditAction[];
  readonly archiveEnabled: boolean;
  readonly archiveLocation?: string;
  readonly compressionEnabled: boolean;
}

// ============================================================
// Audit Export Request
// ============================================================
export interface AuditExportRequest {
  readonly filters: AuditLogFilters;
  readonly format: 'json' | 'csv' | 'xlsx';
  readonly includeChanges: boolean;
  readonly includeMetadata: boolean;
  readonly dateRange?: {
    readonly from: Date;
    readonly to: Date;
  };
  readonly limit?: number;
}

export interface AuditExportResponse {
  readonly downloadUrl: string;
  readonly expiresAt: Date;
  readonly fileSize: number;
  readonly recordCount: number;
  readonly format: string;
  readonly expiresInSeconds: number;
}

// ============================================================
// Audit Retention Cleanup Result
// ============================================================
export interface AuditCleanupResult {
  readonly totalArchived: number;
  readonly totalDeleted: number;
  readonly archivedByAction: Record<AuditAction, number>;
  readonly cleanupCompletedAt: Date;
  readonly durationMs: number;
}

// ============================================================
// Audit Webhook Event
// ============================================================
export interface AuditWebhookEvent {
  readonly id: string;
  readonly eventType: 'audit.critical' | 'audit.error' | 'audit.security';
  readonly auditLog: AuditLogDTO;
  readonly timestamp: Date;
  readonly recipients: readonly string[];
}

// ============================================================
// Audit Search Result
// ============================================================
export interface AuditSearchResult {
  readonly items: readonly AuditLogDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
  readonly searchTimeMs: number;
}

// ============================================================
// Audit Compliance Report
// ============================================================
export interface AuditComplianceReport {
  readonly reportId: string;
  readonly generatedAt: Date;
  readonly timeRange: {
    readonly from: Date;
    readonly to: Date;
  };
  readonly totalEvents: number;
  readonly sensitiveActionsCount: number;
  readonly adminActionsCount: number;
  readonly exportCount: number;
  readonly deletionCount: number;
  readonly failedLoginsCount: number;
  readonly successfulLoginsCount: number;
  readonly topSensitiveActions: ReadonlyArray<{
    readonly action: AuditAction;
    readonly count: number;
    readonly users: readonly string[];
  }>;
}

// packages/shared-types/src/common/audit.types.ts (আপডেট)

/**
 * Audit Source Type (Alias for backward compatibility)
 * ✅ FIXED: Add this type to match the import in audit.dto.ts
 */
export type AuditSource = 
  | 'API'
  | 'WEB'
  | 'MOBILE'
  | 'ADMIN'
  | 'SYSTEM'
  | 'CRON'
  | 'WEBHOOK'
  | 'INTERNAL'
  | 'THIRD_PARTY'
  | 'BATCH'
  | 'MIGRATION';

/**
 * Audit Entity Type (Alias for backward compatibility)
 * ✅ FIXED: Add this type to match the import in audit.dto.ts
 */
export type AuditEntityType = 
  | 'USER'
  | 'SESSION'
  | 'MFA'
  | 'PRODUCT'
  | 'ORDER'
  | 'PAYMENT'
  | 'INVENTORY'
  | 'CATEGORY'
  | 'BRAND'
  | 'REVIEW'
  | 'COUPON'
  | 'OFFER'
  | 'VENDOR'
  | 'SHOP'
  | 'DELIVERY'
  | 'TICKET'
  | 'NOTIFICATION'
  | 'SYSTEM'
  | 'CONFIG'
  | 'CACHE'
  | 'QUEUE'
  | 'BACKUP'
  | 'REPORT'
  | 'EXPORT'
  | 'IMPORT'
  | 'SECURITY'
  | 'KYC'
  | 'DEVICE';

  export type SupportedLanguage = 'en' | 'bn';

  // packages/shared-types/src/common/audit.types.ts

/**
 * Audit export format types
 */
export type AuditExportFormat = 'json' | 'csv' | 'xlsx';
