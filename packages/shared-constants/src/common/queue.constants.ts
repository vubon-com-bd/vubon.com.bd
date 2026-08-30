/**
 * Queue Constants
 * Common queue configurations, job types, priorities, and statuses
 */

/**
 * Queue names for different modules
 */
export const QUEUE_NAMES = {
  // Auth queues
  AUTH: 'auth',
  AUTH_EMAIL: 'auth:email',
  AUTH_SMS: 'auth:sms',
  AUTH_VERIFICATION: 'auth:verification',
  AUTH_PASSWORD_RESET: 'auth:password_reset',
  AUTH_MFA: 'auth:mfa',

  // User queues
  USER: 'user',
  USER_PROFILE: 'user:profile',
  USER_VERIFICATION: 'user:verification',
  USER_KYC: 'user:kyc',
  USER_ACTIVITY: 'user:activity',
  USER_NOTIFICATION: 'user:notification',

  // Admin queues
  ADMIN: 'admin',
  ADMIN_AUDIT: 'admin:audit',
  ADMIN_ACTIVITY: 'admin:activity',
  ADMIN_NOTIFICATION: 'admin:notification',

  // Vendor queues
  VENDOR: 'vendor',
  VENDOR_VERIFICATION: 'vendor:verification',
  VENDOR_COMMISSION: 'vendor:commission',
  VENDOR_PAYOUT: 'vendor:payout',
  VENDOR_PERFORMANCE: 'vendor:performance',
  VENDOR_DOCUMENT: 'vendor:document',

  // Product queues
  PRODUCT: 'product',
  PRODUCT_INDEX: 'product:index',
  PRODUCT_SYNC: 'product:sync',
  PRODUCT_INVENTORY: 'product:inventory',
  PRODUCT_PRICE: 'product:price',
  PRODUCT_REVIEW: 'product:review',

  // Order queues
  ORDER: 'order',
  ORDER_PROCESSING: 'order:processing',
  ORDER_FULFILLMENT: 'order:fulfillment',
  ORDER_SHIPPING: 'order:shipping',
  ORDER_DELIVERY: 'order:delivery',
  ORDER_CANCELLATION: 'order:cancellation',

  // Payment queues
  PAYMENT: 'payment',
  PAYMENT_PROCESSING: 'payment:processing',
  PAYMENT_VERIFICATION: 'payment:verification',
  PAYMENT_REFUND: 'payment:refund',
  PAYMENT_RECONCILIATION: 'payment:reconciliation',
  PAYMENT_SETTLEMENT: 'payment:settlement',

  // Notification queues
  NOTIFICATION: 'notification',
  NOTIFICATION_EMAIL: 'notification:email',
  NOTIFICATION_SMS: 'notification:sms',
  NOTIFICATION_PUSH: 'notification:push',
  NOTIFICATION_IN_APP: 'notification:in_app',
  NOTIFICATION_WEBHOOK: 'notification:webhook',

  // Email queues
  EMAIL: 'email',
  EMAIL_WELCOME: 'email:welcome',
  EMAIL_VERIFICATION: 'email:verification',
  EMAIL_PASSWORD_RESET: 'email:password_reset',
  EMAIL_ORDER_CONFIRMATION: 'email:order_confirmation',
  EMAIL_INVOICE: 'email:invoice',
  EMAIL_REPORT: 'email:report',
  EMAIL_MARKETING: 'email:marketing',
  EMAIL_NEWSLETTER: 'email:newsletter',

  // SMS queues
  SMS: 'sms',
  SMS_OTP: 'sms:otp',
  SMS_VERIFICATION: 'sms:verification',
  SMS_ALERT: 'sms:alert',
  SMS_NOTIFICATION: 'sms:notification',
  SMS_MARKETING: 'sms:marketing',

  // Push notification queues
  PUSH: 'push',
  PUSH_NOTIFICATION: 'push:notification',
  PUSH_ALERT: 'push:alert',
  PUSH_REMINDER: 'push:reminder',

  // Analytics queues
  ANALYTICS: 'analytics',
  ANALYTICS_EVENT: 'analytics:event',
  ANALYTICS_REPORT: 'analytics:report',
  ANALYTICS_AGGREGATION: 'analytics:aggregation',
  ANALYTICS_SYNC: 'analytics:sync',

  // Reporting queues
  REPORT: 'report',
  REPORT_GENERATION: 'report:generation',
  REPORT_EXPORT: 'report:export',
  REPORT_EMAIL: 'report:email',

  // Search queues
  SEARCH: 'search',
  SEARCH_INDEX: 'search:index',
  SEARCH_REINDEX: 'search:reindex',
  SEARCH_SYNC: 'search:sync',
  SEARCH_SUGGESTION: 'search:suggestion',

  // Cache queues
  CACHE: 'cache',
  CACHE_CLEAR: 'cache:clear',
  CACHE_INVALIDATE: 'cache:invalidate',
  CACHE_WARM: 'cache:warm',

  // File queues
  FILE: 'file',
  FILE_UPLOAD: 'file:upload',
  FILE_PROCESS: 'file:process',
  FILE_CONVERT: 'file:convert',
  FILE_OPTIMIZE: 'file:optimize',
  FILE_DELETE: 'file:delete',

  // Image queues
  IMAGE: 'image',
  IMAGE_RESIZE: 'image:resize',
  IMAGE_OPTIMIZE: 'image:optimize',
  IMAGE_UPLOAD: 'image:upload',
  IMAGE_PROCESS: 'image:process',

  // Export queues
  EXPORT: 'export',
  EXPORT_CSV: 'export:csv',
  EXPORT_EXCEL: 'export:excel',
  EXPORT_PDF: 'export:pdf',

  // Import queues
  IMPORT: 'import',
  IMPORT_CSV: 'import:csv',
  IMPORT_EXCEL: 'import:excel',
  IMPORT_BULK: 'import:bulk',

  // Backup queues
  BACKUP: 'backup',
  BACKUP_DATABASE: 'backup:database',
  BACKUP_FILE: 'backup:file',
  BACKUP_SYSTEM: 'backup:system',

  // Cleanup queues
  CLEANUP: 'cleanup',
  CLEANUP_LOG: 'cleanup:log',
  CLEANUP_SESSION: 'cleanup:session',
  CLEANUP_TEMP: 'cleanup:temp',
  CLEANUP_ARCHIVE: 'cleanup:archive',

  // Sync queues
  SYNC: 'sync',
  SYNC_DATA: 'sync:data',
  SYNC_METADATA: 'sync:metadata',
  SYNC_REALTIME: 'sync:realtime',

  // Integration queues
  INTEGRATION: 'integration',
  INTEGRATION_API: 'integration:api',
  INTEGRATION_WEBHOOK: 'integration:webhook',
  INTEGRATION_THIRD_PARTY: 'integration:third_party',

  // Webhook queues
  WEBHOOK: 'webhook',
  WEBHOOK_DELIVERY: 'webhook:delivery',
  WEBHOOK_RETRY: 'webhook:retry',

  // Event queues
  EVENT: 'event',
  EVENT_PUBLISH: 'event:publish',
  EVENT_PROCESS: 'event:process',

  // Job queues
  JOB: 'job',
  JOB_SCHEDULE: 'job:schedule',
  JOB_PROCESS: 'job:process',
  JOB_RETRY: 'job:retry',

  // Logging queues
  LOG: 'log',
  LOG_AUDIT: 'log:audit',
  LOG_SYSTEM: 'log:system',
  LOG_ACCESS: 'log:access',
  LOG_ERROR: 'log:error',

  // Monitoring queues
  MONITOR: 'monitor',
  MONITOR_METRIC: 'monitor:metric',
  MONITOR_ALERT: 'monitor:alert',
  MONITOR_HEALTH: 'monitor:health',

  // Notification preference queues
  NOTIFICATION_PREFERENCE: 'notification:preference',

  // Discount queues
  DISCOUNT: 'discount',
  DISCOUNT_APPLY: 'discount:apply',
  DISCOUNT_CALCULATE: 'discount:calculate',

  // Coupon queues
  COUPON: 'coupon',
  COUPON_VALIDATE: 'coupon:validate',
  COUPON_APPLY: 'coupon:apply',
  COUPON_RELEASE: 'coupon:release',

  // Flash sale queues
  FLASH_SALE: 'flash_sale',
  FLASH_SALE_START: 'flash_sale:start',
  FLASH_SALE_END: 'flash_sale:end',
  FLASH_SALE_INVENTORY: 'flash_sale:inventory',
  FLASH_SALE_NOTIFICATION: 'flash_sale:notification',

  // Inventory queues
  INVENTORY: 'inventory',
  INVENTORY_UPDATE: 'inventory:update',
  INVENTORY_SYNC: 'inventory:sync',
  INVENTORY_CHECK: 'inventory:check',
  INVENTORY_RESERVE: 'inventory:reserve',
  INVENTORY_RELEASE: 'inventory:release',

  // Shipping queues
  SHIPPING: 'shipping',
  SHIPPING_CALCULATE: 'shipping:calculate',
  SHIPPING_LABEL: 'shipping:label',
  SHIPPING_TRACK: 'shipping:track',
  SHIPPING_UPDATE: 'shipping:update',

  // Fulfillment queues
  FULFILLMENT: 'fulfillment',
  FULFILLMENT_PROCESS: 'fulfillment:process',
  FULFILLMENT_COMPLETE: 'fulfillment:complete',

  // Return queues
  RETURN: 'return',
  RETURN_REQUEST: 'return:request',
  RETURN_APPROVE: 'return:approve',
  RETURN_PROCESS: 'return:process',
  RETURN_REFUND: 'return:refund',

  // Refund queues
  REFUND: 'refund',
  REFUND_PROCESS: 'refund:process',
  REFUND_APPROVE: 'refund:approve',
  REFUND_COMPLETE: 'refund:complete',

  // Invoice queues
  INVOICE: 'invoice',
  INVOICE_GENERATE: 'invoice:generate',
  INVOICE_SEND: 'invoice:send',
  INVOICE_PAYMENT: 'invoice:payment',

  // Tax queues
  TAX: 'tax',
  TAX_CALCULATE: 'tax:calculate',
  TAX_REPORT: 'tax:report',

  // Commission queues
  COMMISSION: 'commission',
  COMMISSION_CALCULATE: 'commission:calculate',
  COMMISSION_PAYOUT: 'commission:payout',

  // Settlement queues
  SETTLEMENT: 'settlement',
  SETTLEMENT_PROCESS: 'settlement:process',
  SETTLEMENT_COMPLETE: 'settlement:complete',

  // Reconciliation queues
  RECONCILIATION: 'reconciliation',
  RECONCILIATION_PROCESS: 'reconciliation:process',
  RECONCILIATION_REPORT: 'reconciliation:report',
} as const;

/**
 * Queue job priorities
 */
export const QUEUE_PRIORITY = {
  /** Highest priority */
  CRITICAL: 1,
  /** High priority */
  HIGH: 2,
  /** Normal priority */
  NORMAL: 3,
  /** Low priority */
  LOW: 4,
  /** Lowest priority */
  LOWEST: 5,
} as const;

/**
 * Queue job statuses
 */
export const QUEUE_JOB_STATUS = {
  /** Job is waiting to be processed */
  WAITING: 'waiting',
  /** Job is currently being processed */
  ACTIVE: 'active',
  /** Job has been completed successfully */
  COMPLETED: 'completed',
  /** Job has failed */
  FAILED: 'failed',
  /** Job has been delayed */
  DELAYED: 'delayed',
  /** Job has been paused */
  PAUSED: 'paused',
  /** Job has been cancelled */
  CANCELLED: 'cancelled',
  /** Job is being retried */
  RETRYING: 'retrying',
  /** Job is in progress */
  IN_PROGRESS: 'in_progress',
  /** Job is scheduled for later */
  SCHEDULED: 'scheduled',
  /** Job has been archived */
  ARCHIVED: 'archived',
  /** Job has expired */
  EXPIRED: 'expired',
  /** Job is on hold */
  ON_HOLD: 'on_hold',
  /** Job is being processed in background */
  BACKGROUND: 'background',
} as const;

/**
 * Queue job types
 */
export const QUEUE_JOB_TYPE = {
  /** One-time jobs */
  ONCE: 'once',
  /** Recurring jobs */
  RECURRING: 'recurring',
  /** Delayed jobs */
  DELAYED: 'delayed',
  /** Scheduled jobs */
  SCHEDULED: 'scheduled',
  /** Cron jobs */
  CRON: 'cron',
  /** Batch jobs */
  BATCH: 'batch',
  /** Chained jobs */
  CHAINED: 'chained',
  /** Parallel jobs */
  PARALLEL: 'parallel',
  /** Sequential jobs */
  SEQUENTIAL: 'sequential',
  /** Priority jobs */
  PRIORITY: 'priority',
  /** Retry jobs */
  RETRY: 'retry',
  /** Dead letter jobs */
  DEAD_LETTER: 'dead_letter',
} as const;

/**
 * Queue retry strategies
 */
export const QUEUE_RETRY_STRATEGY = {
  /** No retry */
  NONE: 'none',
  /** Fixed delay between retries */
  FIXED: 'fixed',
  /** Exponential backoff */
  EXPONENTIAL: 'exponential',
  /** Linear backoff */
  LINEAR: 'linear',
  /** Custom retry strategy */
  CUSTOM: 'custom',
  /** Immediate retry */
  IMMEDIATE: 'immediate',
} as const;

/**
 * Queue concurrency types
 */
export const QUEUE_CONCURRENCY = {
  /** Single job at a time */
  SINGLE: 1,
  /** Limited concurrent jobs */
  LIMITED: 'limited',
  /** Unlimited concurrent jobs */
  UNLIMITED: 'unlimited',
  /** Custom concurrency */
  CUSTOM: 'custom',
} as const;

/**
 * Queue event types
 */
export const QUEUE_EVENT = {
  JOB_ADDED: 'job_added',
  JOB_PROCESSING: 'job_processing',
  JOB_COMPLETED: 'job_completed',
  JOB_FAILED: 'job_failed',
  JOB_RETRY: 'job_retry',
  JOB_DELAYED: 'job_delayed',
  JOB_CANCELLED: 'job_cancelled',
  JOB_PAUSED: 'job_paused',
  JOB_RESUMED: 'job_resumed',
  JOB_PROGRESS: 'job_progress',
  QUEUE_EMPTY: 'queue_empty',
  QUEUE_DRAINED: 'queue_drained',
  QUEUE_ERROR: 'queue_error',
} as const;

/**
 * Queue options
 */
export interface QueueOptions {
  /** Queue name */
  name: string;
  /** Number of concurrent jobs */
  concurrency?: number;
  /** Max number of retries */
  maxRetries?: number;
  /** Retry strategy */
  retryStrategy?: keyof typeof QUEUE_RETRY_STRATEGY;
  /** Retry delay in seconds */
  retryDelay?: number;
  /** Job timeout in seconds */
  timeout?: number;
  /** Job priority */
  priority?: number;
  /** Enable job removal on completion */
  removeOnComplete?: boolean;
  /** Enable job removal on failure */
  removeOnFail?: boolean;
  /** Enable job progress tracking */
  progressTracking?: boolean;
  /** Enable job logging */
  logging?: boolean;
  /** Enable job metrics */
  metrics?: boolean;
  /** Enable dead letter queue */
  deadLetterQueue?: boolean;
}

/**
 * Job options
 */
export interface JobOptions {
  /** Job priority */
  priority?: number;
  /** Job delay in seconds */
  delay?: number;
  /** Job timeout in seconds */
  timeout?: number;
  /** Max retries for this job */
  maxRetries?: number;
  /** Retry delay for this job */
  retryDelay?: number;
  /** Job ID (for deduplication) */
  jobId?: string;
  /** Job group */
  group?: string;
  /** Enable job removal on completion */
  removeOnComplete?: boolean;
  /** Enable job removal on failure */
  removeOnFail?: boolean;
  /** Enable progress tracking */
  progressTracking?: boolean;
  /** Job metadata */
  metadata?: Record<string, unknown>;
  /** Job tags for filtering */
  tags?: string[];
}

/**
 * Build queue name with prefix
 */
export function buildQueueName(queueName: string): string {
  return `queue:${queueName}`;
}

/**
 * Build job key with queue and job ID
 */
export function buildJobKey(queueName: string, jobId: string): string {
  return `${queueName}:job:${jobId}`;
}

/**
 * Build dead letter queue name
 */
export function buildDeadLetterQueueName(queueName: string): string {
  return `${queueName}:dead_letter`;
}

/**
 * Build retry queue name
 */
export function buildRetryQueueName(queueName: string): string {
  return `${queueName}:retry`;
}

/**
 * Build delayed queue name
 */
export function buildDelayedQueueName(queueName: string): string {
  return `${queueName}:delayed`;
}

/**
 * Build queue group name
 */
export function buildQueueGroupName(groupName: string): string {
  return `queue:group:${groupName}`;
}

/**
 * Check if job is recoverable
 */
export function isJobRecoverable(error: Error): boolean {
  const unrecoverableErrors = [
    'ValidationError',
    'AuthenticationError',
    'AuthorizationError',
    'NotFoundError',
  ];

  return !unrecoverableErrors.some(
    (errType) => error.name === errType || error.message.includes(errType)
  );
}

/**
 * Get retry delay based on retry count
 */
export function getRetryDelay(
  retryCount: number,
  strategy: keyof typeof QUEUE_RETRY_STRATEGY,
  baseDelay: number = 60
): number {
  switch (strategy) {
    case 'NONE':
      return 0;

    case 'IMMEDIATE':
      return 0;

    case 'FIXED':
      return baseDelay;

    case 'LINEAR':
      return baseDelay * (retryCount + 1);

    case 'EXPONENTIAL':
      return Math.min(
        baseDelay * Math.pow(2, retryCount),
        86400 // Max 24 hours
      );

    case 'CUSTOM':
      return baseDelay * (retryCount + 1);

    default:
      return baseDelay;
  }
}

/**
 * Calculate exponential backoff with jitter
 */
export function getExponentialBackoffWithJitter(
  retryCount: number,
  baseDelay: number = 60,
  maxDelay: number = 86400
): number {
  const delay = Math.min(baseDelay * Math.pow(2, retryCount), maxDelay);
  const jitter = Math.random() * 0.1 * delay; // 10% jitter
  return delay + jitter;
}
