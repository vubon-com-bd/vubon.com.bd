/**
 * Transaction Manager Constants - Enterprise Grade
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-constants/transaction-manager.constants
 * 
 * @description
 * Centralized constants for transaction management across the entire ecosystem.
 * Covers transaction isolation levels, propagation behaviors, timeouts, retry policies,
 * distributed transaction patterns, and Bangladesh-specific transaction requirements.
 * 
 * RULES:
 * ✅ ONLY pure readonly constants - NO functions, NO business logic
 * ✅ NO side effects
 * ✅ Type-safe with 'as const' for immutability
 * ✅ Bangladesh Bank compliance ready
 * 
 * @example
 * import { TRANSACTION_ISOLATION_LEVELS, TRANSACTION_PROPAGATION } from '@vubon/shared-constants';
 */

// ============================================================
// Transaction Isolation Levels (SQL Standard)
// ============================================================

/**
 * Database transaction isolation levels
 * Controls how transaction changes are visible to other concurrent transactions
 */
export const TRANSACTION_ISOLATION_LEVELS = {
  /** Read Uncommitted - Lowest isolation, dirty reads allowed */
  READ_UNCOMMITTED: 'READ UNCOMMITTED',
  /** Read Committed - Default for most databases, prevents dirty reads */
  READ_COMMITTED: 'READ COMMITTED',
  /** Repeatable Read - Prevents non-repeatable reads */
  REPEATABLE_READ: 'REPEATABLE READ',
  /** Serializable - Highest isolation, full ACID compliance */
  SERIALIZABLE: 'SERIALIZABLE',
  /** Snapshot - PostgreSQL specific, MVCC based */
  SNAPSHOT: 'SNAPSHOT',
} as const;

export type TransactionIsolationLevel = typeof TRANSACTION_ISOLATION_LEVELS[keyof typeof TRANSACTION_ISOLATION_LEVELS];

// ============================================================
// Transaction Propagation Behaviors (Spring-style)
// ============================================================

/**
 * Transaction propagation behaviors
 * Defines how transactions relate to each other when nested
 */
export const TRANSACTION_PROPAGATION = {
  /** Required - Join existing transaction or create new */
  REQUIRED: 'REQUIRED',
  /** Requires New - Always start new transaction, suspend existing */
  REQUIRES_NEW: 'REQUIRES_NEW',
  /** Nested - Start nested transaction if exists, else new */
  NESTED: 'NESTED',
  /** Mandatory - Join existing, throw if none */
  MANDATORY: 'MANDATORY',
  /** Not Supported - Run without transaction, suspend existing */
  NOT_SUPPORTED: 'NOT_SUPPORTED',
  /** Never - Run without transaction, throw if exists */
  NEVER: 'NEVER',
  /** Supports - Join if exists, else run non-transactional */
  SUPPORTS: 'SUPPORTS',
} as const;

export type TransactionPropagation = typeof TRANSACTION_PROPAGATION[keyof typeof TRANSACTION_PROPAGATION];

// ============================================================
// Transaction Timeouts (in seconds)
// ============================================================

/**
 * Transaction timeout configuration
 * Default timeouts for different transaction types
 */
export const TRANSACTION_TIMEOUTS = {
  /** Default transaction timeout (30 seconds) */
  DEFAULT: 30,
  /** Short timeout for simple operations (5 seconds) */
  SHORT: 5,
  /** Medium timeout for standard operations (15 seconds) */
  MEDIUM: 15,
  /** Long timeout for complex operations (60 seconds) */
  LONG: 60,
  /** Extended timeout for bulk operations (300 seconds / 5 minutes) */
  EXTENDED: 300,
  /** Maximum timeout for large imports (600 seconds / 10 minutes) */
  MAXIMUM: 600,
  
  /** Timeout by transaction type */
  BY_TYPE: {
    /** Authentication transactions (login, register) */
    AUTH: 10,
    /** User profile updates */
    USER_PROFILE: 15,
    /** MFA setup and verification */
    MFA: 20,
    /** Session management */
    SESSION: 10,
    /** Password reset flows */
    PASSWORD_RESET: 30,
    /** Payment processing */
    PAYMENT: 60,
    /** Order creation and management */
    ORDER: 45,
    /** Inventory updates */
    INVENTORY: 30,
    /** Bulk operations */
    BULK: 300,
    /** Report generation */
    REPORT: 120,
    /** Data export/import */
    DATA_TRANSFER: 180,
    /** System configuration */
    SYSTEM_CONFIG: 15,
    /** Audit logging */
    AUDIT: 10,
    /** Notification sending */
    NOTIFICATION: 20,
  },
} as const;

export type TransactionTimeout = typeof TRANSACTION_TIMEOUTS[keyof typeof TRANSACTION_TIMEOUTS];

// ============================================================
// Retry Configuration
// ============================================================

/**
 * Retry policies for transaction failures
 * Includes exponential backoff and retryable error types
 */
export const TRANSACTION_RETRY_CONFIG = {
  /** Default retry attempts */
  DEFAULT_RETRY_COUNT: 3,
  
  /** Maximum retry attempts */
  MAX_RETRY_COUNT: 5,
  
  /** Initial retry delay in milliseconds */
  INITIAL_RETRY_DELAY_MS: 100,
  
  /** Maximum retry delay in milliseconds (capped) */
  MAX_RETRY_DELAY_MS: 5000,
  
  /** Backoff multiplier (exponential backoff) */
  BACKOFF_MULTIPLIER: 2,
  
  /** Jitter factor (0-1) to prevent thundering herd */
  JITTER_FACTOR: 0.1,
  
  /** Retryable SQL error codes (PostgreSQL) */
  RETRYABLE_SQL_ERRORS: [
    '40001', // Serialization failure
    '40P01', // Deadlock detected
    '57014', // Query canceled
    '08006', // Connection failure
    '08007', // Connection failure
    '08003', // Connection does not exist
    '08004', // Connection rejected
    '08001', // SQL client unable to establish connection
    '08000', // Connection exception
    '08002', // Connection name in use
  ],
  
  /** Retryable application error codes */
  RETRYABLE_APP_ERRORS: [
    'CONNECTION_REFUSED',
    'CONNECTION_TIMEOUT',
    'NETWORK_ERROR',
    'TIMEOUT',
    'SERVICE_UNAVAILABLE',
    'GATEWAY_TIMEOUT',
    'LOCK_TIMEOUT',
    'DEADLOCK_DETECTED',
  ],
  
  /** Retryable HTTP status codes */
  RETRYABLE_HTTP_STATUSES: [
    408, // Request Timeout
    429, // Too Many Requests
    500, // Internal Server Error
    502, // Bad Gateway
    503, // Service Unavailable
    504, // Gateway Timeout
  ],
  
  /** Non-retryable errors (should fail immediately) */
  NON_RETRYABLE_ERRORS: [
    'INVALID_INPUT',
    'VALIDATION_ERROR',
    'DUPLICATE_ENTRY',
    'CONSTRAINT_VIOLATION',
    'DATA_INTEGRITY_VIOLATION',
    'FORBIDDEN',
    'UNAUTHORIZED',
  ],
} as const;

export type TransactionRetryConfig = typeof TRANSACTION_RETRY_CONFIG;

// ============================================================
// Distributed Transaction Patterns
// ============================================================

/**
 * Distributed transaction patterns (Saga, TCC, Outbox)
 * For microservices distributed transactions
 */
export const DISTRIBUTED_TRANSACTION_PATTERNS = {
  /** Saga Pattern - Choreographed or Orchestrated */
  SAGA: 'SAGA',
  /** TCC Pattern - Try, Confirm, Cancel */
  TCC: 'TCC',
  /** Outbox Pattern - Reliable event publishing */
  OUTBOX: 'OUTBOX',
  /** Event Sourcing - Event-driven state changes */
  EVENT_SOURCING: 'EVENT_SOURCING',
  /** Two-Phase Commit - XA compliant */
  TWO_PHASE_COMMIT: 'TWO_PHASE_COMMIT',
  /** Compensation Pattern - Rollback via compensating actions */
  COMPENSATION: 'COMPENSATION',
} as const;

export type DistributedTransactionPattern = typeof DISTRIBUTED_TRANSACTION_PATTERNS[keyof typeof DISTRIBUTED_TRANSACTION_PATTERNS];

// ============================================================
// Transaction Status Codes
// ============================================================

/**
 * Transaction status codes for tracking
 */
export const TRANSACTION_STATUS = {
  /** Transaction is being prepared */
  PREPARING: 'PREPARING',
  /** Transaction is active/in progress */
  ACTIVE: 'ACTIVE',
  /** Transaction is pending commit */
  COMMITTING: 'COMMITTING',
  /** Transaction is pending rollback */
  ROLLING_BACK: 'ROLLING_BACK',
  /** Transaction is committed */
  COMMITTED: 'COMMITTED',
  /** Transaction is rolled back */
  ROLLED_BACK: 'ROLLED_BACK',
  /** Transaction failed with error */
  FAILED: 'FAILED',
  /** Transaction is suspended (nested) */
  SUSPENDED: 'SUSPENDED',
  /** Transaction is in timeout */
  TIMEOUT: 'TIMEOUT',
  /** Transaction is in deadlock */
  DEADLOCK: 'DEADLOCK',
  /** Transaction is marked for retry */
  RETRY: 'RETRY',
  /** Transaction is paused */
  PAUSED: 'PAUSED',
  /** Transaction is completed */
  COMPLETED: 'COMPLETED',
} as const;

export type TransactionStatus = typeof TRANSACTION_STATUS[keyof typeof TRANSACTION_STATUS];

// ============================================================
// Deadlock Detection and Prevention
// ============================================================

/**
 * Deadlock detection and prevention strategies
 */
export const DEADLOCK_STRATEGIES = {
  /** Wait and retry with backoff */
  WAIT_RETRY: 'WAIT_RETRY',
  /** Abort and retry (PostgreSQL default) */
  ABORT_RETRY: 'ABORT_RETRY',
  /** Abort and fail (no retry) */
  ABORT_FAIL: 'ABORT_FAIL',
  /** Wait indefinitely (dangerous) */
  WAIT_INDEFINITE: 'WAIT_INDEFINITE',
  /** Timeout after configured duration */
  TIMEOUT: 'TIMEOUT',
  /** Use deadlock graph to choose victim */
  VICTIM_SELECTION: 'VICTIM_SELECTION',
} as const;

export type DeadlockStrategy = typeof DEADLOCK_STRATEGIES[keyof typeof DEADLOCK_STRATEGIES];

/**
 * Deadlock detection configuration
 */
export const DEADLOCK_DETECTION = {
  /** Default deadlock timeout in milliseconds */
  DEFAULT_TIMEOUT_MS: 5000,
  
  /** Maximum deadlock timeout */
  MAX_TIMEOUT_MS: 30000,
  
  /** Check interval for deadlocks (milliseconds) */
  CHECK_INTERVAL_MS: 1000,
  
  /** Enable deadlock graph logging (production: true) */
  ENABLE_GRAPH_LOGGING: true,
  
  /** Deadlock victim selection strategy */
  VICTIM_SELECTION: 'MINIMAL_IMPACT',
  
  /** Maximum deadlock attempts before escalation */
  MAX_DEADLOCK_ATTEMPTS: 3,
} as const;

export type DeadlockDetection = typeof DEADLOCK_DETECTION;

// ============================================================
// Lock Types (Database-level)
// ============================================================

/**
 * Database lock types
 */
export const DATABASE_LOCK_TYPES = {
  /** Row-level exclusive lock */
  ROW_EXCLUSIVE: 'ROW_EXCLUSIVE',
  /** Row-level shared lock */
  ROW_SHARED: 'ROW_SHARED',
  /** Table-level exclusive lock */
  TABLE_EXCLUSIVE: 'TABLE_EXCLUSIVE',
  /** Table-level shared lock */
  TABLE_SHARED: 'TABLE_SHARED',
  /** Advisory lock (application-specific) */
  ADVISORY: 'ADVISORY',
  /** Pessimistic lock (for update) */
  PESSIMISTIC: 'PESSIMISTIC',
  /** Optimistic lock (version-based) */
  OPTIMISTIC: 'OPTIMISTIC',
  /** Distributed lock (Redis/ZooKeeper) */
  DISTRIBUTED: 'DISTRIBUTED',
  /** Read lock (shared) */
  READ: 'READ',
  /** Write lock (exclusive) */
  WRITE: 'WRITE',
} as const;

export type DatabaseLockType = typeof DATABASE_LOCK_TYPES[keyof typeof DATABASE_LOCK_TYPES];

// ============================================================
// Transaction Propagation (Nested)
// ============================================================

/**
 * Nested transaction behavior
 */
export const NESTED_TRANSACTION = {
  /** Nested transactions are supported */
  ENABLED: true,
  
  /** Maximum nested depth */
  MAX_DEPTH: 10,
  
  /** Nested transaction isolation level (default: inherited) */
  DEFAULT_ISOLATION: TRANSACTION_ISOLATION_LEVELS.READ_COMMITTED,
  
  /** Whether to allow savepoints */
  ALLOW_SAVEPOINTS: true,
  
  /** Whether nested transactions can commit independently */
  INDEPENDENT_COMMIT: false,
  
  /** Rollback behavior on nested failure */
  ROLLBACK_ON_NESTED_FAILURE: true,
} as const;

export type NestedTransaction = typeof NESTED_TRANSACTION;

// ============================================================
// Bangladesh Bank Compliance (Transaction-specific)
// ============================================================

/**
 * Bangladesh Bank transaction compliance requirements
 */
export const BBANK_TRANSACTION_COMPLIANCE = {
  /** Maximum transaction amount before audit required (BDT) */
  AUDIT_THRESHOLD_BDT: 100000,
  
  /** Maximum transaction amount before approval required (BDT) */
  APPROVAL_THRESHOLD_BDT: 500000,
  
  /** Maximum transaction amount before reporting required (BDT) */
  REPORTING_THRESHOLD_BDT: 1000000,
  
  /** Transactions must be logged for minimum days */
  RETENTION_DAYS: 365,
  
  /** Required audit fields for all transactions */
  REQUIRED_AUDIT_FIELDS: [
    'userId',
    'transactionId',
    'amount',
    'timestamp',
    'ipAddress',
    'deviceId',
    'sessionId',
    'userAgent',
    'transactionType',
    'status',
    'correlationId',
  ] as const,
  
  /** Transactions requiring additional KYC checks */
  KYC_REQUIRED_TRANSACTIONS: [
    'payment',
    'withdrawal',
    'refund',
    'vendor_settlement',
    'bulk_order',
    'international_payment',
  ] as const,
  
  /** Transactions requiring MFA */
  MFA_REQUIRED_TRANSACTIONS: [
    'payment_high_value',
    'withdrawal',
    'refund',
    'email_change',
    'phone_change',
    'password_change',
    'mfa_disable',
    'account_deletion',
  ] as const,
  
  /** Maximum transactions per minute */
  MAX_TRANSACTIONS_PER_MINUTE: 100,
  
  /** Maximum transactions per hour */
  MAX_TRANSACTIONS_PER_HOUR: 1000,
  
  /** Maximum transactions per day */
  MAX_TRANSACTIONS_PER_DAY: 10000,
} as const;

export type BBankTransactionCompliance = typeof BBANK_TRANSACTION_COMPLIANCE;

// ============================================================
// Transaction Types (Business-specific)
// ============================================================

/**
 * Business transaction types
 */
export const TRANSACTION_TYPES = {
  /** User authentication */
  AUTH: 'AUTH',
  /** User registration */
  REGISTRATION: 'REGISTRATION',
  /** User profile update */
  PROFILE_UPDATE: 'PROFILE_UPDATE',
  /** Password change */
  PASSWORD_CHANGE: 'PASSWORD_CHANGE',
  /** Password reset */
  PASSWORD_RESET: 'PASSWORD_RESET',
  /** MFA setup */
  MFA_SETUP: 'MFA_SETUP',
  /** MFA verification */
  MFA_VERIFICATION: 'MFA_VERIFICATION',
  /** MFA disable */
  MFA_DISABLE: 'MFA_DISABLE',
  /** Session creation */
  SESSION_CREATE: 'SESSION_CREATE',
  /** Session update */
  SESSION_UPDATE: 'SESSION_UPDATE',
  /** Session termination */
  SESSION_TERMINATE: 'SESSION_TERMINATE',
  /** Payment processing */
  PAYMENT: 'PAYMENT',
  /** Payment refund */
  REFUND: 'REFUND',
  /** Order creation */
  ORDER_CREATE: 'ORDER_CREATE',
  /** Order update */
  ORDER_UPDATE: 'ORDER_UPDATE',
  /** Order cancellation */
  ORDER_CANCEL: 'ORDER_CANCEL',
  /** Inventory update */
  INVENTORY_UPDATE: 'INVENTORY_UPDATE',
  /** Inventory adjustment */
  INVENTORY_ADJUST: 'INVENTORY_ADJUST',
  /** Product creation */
  PRODUCT_CREATE: 'PRODUCT_CREATE',
  /** Product update */
  PRODUCT_UPDATE: 'PRODUCT_UPDATE',
  /** Product deletion */
  PRODUCT_DELETE: 'PRODUCT_DELETE',
  /** Vendor settlement */
  VENDOR_SETTLEMENT: 'VENDOR_SETTLEMENT',
  /** Vendor payout */
  VENDOR_PAYOUT: 'VENDOR_PAYOUT',
  /** Bulk operation */
  BULK_OPERATION: 'BULK_OPERATION',
  /** Data export */
  DATA_EXPORT: 'DATA_EXPORT',
  /** Data import */
  DATA_IMPORT: 'DATA_IMPORT',
  /** Report generation */
  REPORT_GENERATE: 'REPORT_GENERATE',
  /** Notification send */
  NOTIFICATION_SEND: 'NOTIFICATION_SEND',
  /** Audit logging */
  AUDIT_LOG: 'AUDIT_LOG',
  /** System configuration */
  SYSTEM_CONFIG: 'SYSTEM_CONFIG',
  /** Cache operation */
  CACHE_OPERATION: 'CACHE_OPERATION',
  /** Queue operation */
  QUEUE_OPERATION: 'QUEUE_OPERATION',
  /** Email sending */
  EMAIL_SEND: 'EMAIL_SEND',
  /** SMS sending */
  SMS_SEND: 'SMS_SEND',
  /** WhatsApp message sending */
  WHATSAPP_SEND: 'WHATSAPP_SEND',
  /** User deletion */
  USER_DELETE: 'USER_DELETE',
  /** Account lock */
  ACCOUNT_LOCK: 'ACCOUNT_LOCK',
  /** Account unlock */
  ACCOUNT_UNLOCK: 'ACCOUNT_UNLOCK',
  /** Device trust */
  DEVICE_TRUST: 'DEVICE_TRUST',
  /** Token generation */
  TOKEN_GENERATE: 'TOKEN_GENERATE',
  /** Token refresh */
  TOKEN_REFRESH: 'TOKEN_REFRESH',
  /** Token revocation */
  TOKEN_REVOKE: 'TOKEN_REVOKE',
} as const;

export type TransactionType = typeof TRANSACTION_TYPES[keyof typeof TRANSACTION_TYPES];

// ============================================================
// Transaction Prioritization
// ============================================================

/**
 * Transaction priority levels
 * Higher priority = more critical
 */
export const TRANSACTION_PRIORITIES = {
  /** Critical - Payment, authentication */
  CRITICAL: 100,
  /** High - Order, inventory updates */
  HIGH: 80,
  /** Medium - User profile, notifications */
  MEDIUM: 50,
  /** Low - Analytics, reporting */
  LOW: 30,
  /** Background - Cleanup, archival */
  BACKGROUND: 10,
} as const;

export type TransactionPriority = typeof TRANSACTION_PRIORITIES[keyof typeof TRANSACTION_PRIORITIES];

// ============================================================
// Transaction Logging Configuration
// ============================================================

/**
 * Transaction logging levels
 */
export const TRANSACTION_LOG_LEVELS = {
  /** Log only errors */
  ERROR: 'error',
  /** Log errors and warnings */
  WARNING: 'warning',
  /** Log errors, warnings, and info */
  INFO: 'info',
  /** Log everything (debugging) */
  DEBUG: 'debug',
} as const;

export type TransactionLogLevel = typeof TRANSACTION_LOG_LEVELS[keyof typeof TRANSACTION_LOG_LEVELS];

/**
 * Transaction logging configuration
 */
export const TRANSACTION_LOGGING = {
  /** Default log level */
  DEFAULT_LOG_LEVEL: TRANSACTION_LOG_LEVELS.INFO,
  
  /** Log sensitive data (PII) - disabled by default */
  LOG_SENSITIVE_DATA: false,
  
  /** Mask sensitive fields in logs */
  SENSITIVE_FIELDS: [
    'password',
    'token',
    'apiKey',
    'secret',
    'encryptionKey',
    'privateKey',
    'pin',
    'cvv',
    'cardNumber',
    'accountNumber',
  ] as const,
  
  /** Log transaction duration */
  LOG_DURATION: true,
  
  /** Log SQL queries (development only) */
  LOG_QUERIES: false,
  
  /** Log query parameters (development only) */
  LOG_QUERY_PARAMS: false,
  
  /** Transaction log retention (days) */
  RETENTION_DAYS: 90,
} as const;

export type TransactionLogging = typeof TRANSACTION_LOGGING;

// ============================================================
// Transaction Configuration (Combined)
// ============================================================

/**
 * Complete transaction configuration
 */
export const TRANSACTION_CONFIG = {
  /** Default isolation level */
  DEFAULT_ISOLATION: TRANSACTION_ISOLATION_LEVELS.READ_COMMITTED,
  
  /** Default propagation behavior */
  DEFAULT_PROPAGATION: TRANSACTION_PROPAGATION.REQUIRED,
  
  /** Default timeout in seconds */
  DEFAULT_TIMEOUT: TRANSACTION_TIMEOUTS.DEFAULT,
  
  /** Default retry count */
  DEFAULT_RETRY_COUNT: TRANSACTION_RETRY_CONFIG.DEFAULT_RETRY_COUNT,
  
  /** Maximum nested depth */
  MAX_NESTED_DEPTH: NESTED_TRANSACTION.MAX_DEPTH,
  
  /** Default lock type */
  DEFAULT_LOCK_TYPE: DATABASE_LOCK_TYPES.PESSIMISTIC,
  
  /** Default deadlock strategy */
  DEFAULT_DEADLOCK_STRATEGY: DEADLOCK_STRATEGIES.ABORT_RETRY,
  
  /** Enable distributed transactions */
  DISTRIBUTED_TRANSACTIONS_ENABLED: true,
  
  /** Default distributed transaction pattern */
  DEFAULT_DISTRIBUTED_PATTERN: DISTRIBUTED_TRANSACTION_PATTERNS.SAGA,
  
  /** Enable transaction monitoring */
  MONITORING_ENABLED: true,
  
  /** Transaction metrics collection interval (seconds) */
  METRICS_INTERVAL_SECONDS: 60,
  
  /** Enable transaction auditing */
  AUDITING_ENABLED: true,
  
  /** Enable transaction profiling (development only) */
  PROFILING_ENABLED: false,
} as const;

export type TransactionConfig = typeof TRANSACTION_CONFIG;

// ============================================================
// Transaction Alert Thresholds
// ============================================================

/**
 * Transaction alert thresholds
 */
export const TRANSACTION_ALERT_THRESHOLDS = {
  /** Alert when transaction duration exceeds this (milliseconds) */
  SLOW_TRANSACTION_WARNING_MS: 5000,
  
  /** Alert when transaction duration exceeds this (milliseconds) */
  SLOW_TRANSACTION_CRITICAL_MS: 10000,
  
  /** Alert when transaction failure rate exceeds this percentage */
  FAILURE_RATE_WARNING_PERCENT: 5,
  
  /** Alert when transaction failure rate exceeds this percentage */
  FAILURE_RATE_CRITICAL_PERCENT: 15,
  
  /** Alert when deadlocks exceed this count per minute */
  DEADLOCK_WARNING_COUNT: 3,
  
  /** Alert when deadlocks exceed this count per minute */
  DEADLOCK_CRITICAL_COUNT: 10,
  
  /** Alert when transaction queue exceeds this count */
  QUEUE_WARNING_COUNT: 100,
  
  /** Alert when transaction queue exceeds this count */
  QUEUE_CRITICAL_COUNT: 500,
  
  /** Alert when connection pool is exhausted */
  POOL_EXHAUSTION_WARNING: true,
  
  /** Alert when transaction timeout occurs */
  TIMEOUT_WARNING: true,
} as const;

export type TransactionAlertThresholds = typeof TRANSACTION_ALERT_THRESHOLDS;

// ============================================================
// Transaction Metrics
// ============================================================

/**
 * Transaction metric names (for monitoring)
 */
export const TRANSACTION_METRICS = {
  /** Total transactions */
  TOTAL: 'vubon_transaction_total',
  
  /** Transaction duration (histogram) */
  DURATION: 'vubon_transaction_duration_seconds',
  
  /** Transaction success/failure (counter) */
  RESULT: 'vubon_transaction_result_total',
  
  /** Active transactions (gauge) */
  ACTIVE: 'vubon_transaction_active',
  
  /** Transaction queue size (gauge) */
  QUEUE: 'vubon_transaction_queue_size',
  
  /** Transaction retry count (counter) */
  RETRIES: 'vubon_transaction_retries_total',
  
  /** Deadlock count (counter) */
  DEADLOCKS: 'vubon_transaction_deadlocks_total',
  
  /** Connection pool usage (gauge) */
  POOL_USAGE: 'vubon_transaction_pool_usage',
  
  /** Transaction timeout count (counter) */
  TIMEOUTS: 'vubon_transaction_timeouts_total',
  
  /** Transaction rollback count (counter) */
  ROLLBACKS: 'vubon_transaction_rollbacks_total',
  
  /** Transaction latency by type (histogram) */
  LATENCY_BY_TYPE: 'vubon_transaction_latency_by_type_seconds',
} as const;

export type TransactionMetric = typeof TRANSACTION_METRICS[keyof typeof TRANSACTION_METRICS];

// ============================================================
// Type Exports
// ============================================================

export type {
  TransactionIsolationLevel as IsolationLevel,
  TransactionPropagation as Propagation,
  TransactionStatus as Status,
  TransactionType as Type,
  TransactionPriority as Priority,
  TransactionLogLevel as LogLevel,
  TransactionConfig as Config,
};

// ============================================================
// ENTERPRISE SUMMARY
// ============================================================
// 
// Enterprise Features Applied:
// 1. ✅ Full transaction isolation levels (READ_UNCOMMITTED → SERIALIZABLE)
// 2. ✅ Spring-style propagation behaviors (REQUIRED, REQUIRES_NEW, NESTED, etc.)
// 3. ✅ Timeout configuration by transaction type
// 4. ✅ Retry policies with exponential backoff and jitter
// 5. ✅ Distributed transaction patterns (Saga, TCC, Outbox, Event Sourcing)
// 6. ✅ Deadlock detection and prevention strategies
// 7. ✅ Database lock types (row, table, advisory, pessimistic, optimistic)
// 8. ✅ Bangladesh Bank compliance integration
// 9. ✅ Business transaction types (40+ types)
// 10. ✅ Transaction priorities (Critical → Background)
// 11. ✅ Transaction logging with sensitive data masking
// 12. ✅ Alert thresholds for monitoring
// 13. ✅ Metric names for Prometheus/Grafana
// 14. ✅ Nested transaction support with savepoints
// 15. ✅ Type-safe with 'as const' immutability
// 
// Bangladesh Specific:
// - Bangladesh Bank compliance thresholds (BDT amounts)
// - Required audit fields for transaction tracking
// - KYC-required transaction types
// - MFA-required transaction types
// - Local currency (BDT) thresholds
// - Retention periods per Bangladesh Bank guidelines
// 
// Integration Ready:
// - Works with NestJS Transactional decorators
// - Compatible with TypeORM, Prisma, and MikroORM
// - Supports distributed tracing with correlationId
// - Event-sourcing ready for microservices
// - Monitoring ready with Prometheus metrics
// 
// ============================================================
