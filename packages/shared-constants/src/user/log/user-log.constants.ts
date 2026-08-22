/**
 * User Log Constants
 * Core user logging-related constants
 */

import { USER_LOG_TYPE } from './user-log-type.constants';
import { USER_LOG_STATUS } from './user-log-status.constants';

export const USER_LOG = {
  // Default values
  DEFAULTS: {
    STATUS: USER_LOG_STATUS.ACTIVE,
    TYPE: USER_LOG_TYPE.INFO,
    SEVERITY: 'info',
    IS_READ: false,
    IS_ARCHIVED: false,
  },

  // Severity levels
  SEVERITY: {
    DEBUG: 'debug',
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error',
    CRITICAL: 'critical',
  },

  // Log fields
  FIELDS: {
    ID: 'id',
    USER_ID: 'userId',
    TYPE: 'type',
    STATUS: 'status',
    SEVERITY: 'severity',
    MESSAGE: 'message',
    DETAILS: 'details',
    IP_ADDRESS: 'ipAddress',
    USER_AGENT: 'userAgent',
    DEVICE_ID: 'deviceId',
    DEVICE_TYPE: 'deviceType',
    LOCATION: 'location',
    REFERER: 'referer',
    URL: 'url',
    METHOD: 'method',
    DURATION: 'duration',
    METADATA: 'metadata',
    STACK_TRACE: 'stackTrace',
    IS_READ: 'isRead',
    IS_ARCHIVED: 'isArchived',
    CREATED_AT: 'createdAt',
    UPDATED_AT: 'updatedAt',
  },

  // Log status messages
  STATUS_MESSAGES: {
    [USER_LOG_STATUS.ACTIVE]: 'Log is active',
    [USER_LOG_STATUS.PENDING]: 'Log is pending',
    [USER_LOG_STATUS.PROCESSED]: 'Log processed successfully',
    [USER_LOG_STATUS.FAILED]: 'Log processing failed',
    [USER_LOG_STATUS.ARCHIVED]: 'Log is archived',
  },

  // Common log metadata keys
  METADATA_KEYS: {
    ORDER_ID: 'orderId',
    PRODUCT_ID: 'productId',
    PAYMENT_ID: 'paymentId',
    TRANSACTION_ID: 'transactionId',
    SESSION_ID: 'sessionId',
    ERROR_CODE: 'errorCode',
    STATUS_CODE: 'statusCode',
    RESPONSE_TIME: 'responseTime',
    REQUEST_ID: 'requestId',
    CORRELATION_ID: 'correlationId',
  },
} as const;

export type UserLogSeverity = (typeof USER_LOG.SEVERITY)[keyof typeof USER_LOG.SEVERITY];
export type UserLogMetadataKey =
  (typeof USER_LOG.METADATA_KEYS)[keyof typeof USER_LOG.METADATA_KEYS];

export function getLogSeverityLabel(severity: UserLogSeverity): string {
  const labels: Record<UserLogSeverity, string> = {
    [USER_LOG.SEVERITY.DEBUG]: 'Debug',
    [USER_LOG.SEVERITY.INFO]: 'Information',
    [USER_LOG.SEVERITY.WARNING]: 'Warning',
    [USER_LOG.SEVERITY.ERROR]: 'Error',
    [USER_LOG.SEVERITY.CRITICAL]: 'Critical',
  };
  return labels[severity] || 'Unknown';
}

export function getLogSeverityColor(severity: UserLogSeverity): string {
  const colors: Record<UserLogSeverity, string> = {
    [USER_LOG.SEVERITY.DEBUG]: 'info',
    [USER_LOG.SEVERITY.INFO]: 'info',
    [USER_LOG.SEVERITY.WARNING]: 'warning',
    [USER_LOG.SEVERITY.ERROR]: 'danger',
    [USER_LOG.SEVERITY.CRITICAL]: 'danger',
  };
  return colors[severity] || 'secondary';
}

export function getLogSeverityPriority(severity: UserLogSeverity): number {
  const priorities: Record<UserLogSeverity, number> = {
    [USER_LOG.SEVERITY.DEBUG]: 1,
    [USER_LOG.SEVERITY.INFO]: 2,
    [USER_LOG.SEVERITY.WARNING]: 3,
    [USER_LOG.SEVERITY.ERROR]: 4,
    [USER_LOG.SEVERITY.CRITICAL]: 5,
  };
  return priorities[severity] || 0;
}

export function getLogStatusMessage(status: string): string {
  return (
    USER_LOG.STATUS_MESSAGES[status as keyof typeof USER_LOG.STATUS_MESSAGES] || 'Unknown status'
  );
}

export function isLogActive(status: string): boolean {
  return status === USER_LOG_STATUS.ACTIVE || status === USER_LOG_STATUS.PENDING;
}

export function isLogProcessed(status: string): boolean {
  return status === USER_LOG_STATUS.PROCESSED;
}

export function isLogFailed(status: string): boolean {
  return status === USER_LOG_STATUS.FAILED;
}

export function isLogArchived(status: string): boolean {
  return status === USER_LOG_STATUS.ARCHIVED;
}

export function getLogMetadataValue(
  metadata: Record<string, unknown>,
  key: UserLogMetadataKey
): unknown {
  return metadata[key] || null;
}

export function hasLogMetadata(
  metadata: Record<string, unknown>,
  key: UserLogMetadataKey
): boolean {
  return key in metadata && metadata[key] !== null && metadata[key] !== undefined;
}

export function formatLogMessage(message: string, details?: string): string {
  if (details) {
    return `${message}: ${details}`;
  }
  return message;
}

export function getLogMessageForType(type: string, details?: string): string {
  const messages: Record<string, string> = {
    [USER_LOG_TYPE.INFO]: 'Information log entry',
    [USER_LOG_TYPE.WARNING]: 'Warning log entry',
    [USER_LOG_TYPE.ERROR]: 'Error log entry',
    [USER_LOG_TYPE.DEBUG]: 'Debug log entry',
    [USER_LOG_TYPE.AUDIT]: 'Audit log entry',
    [USER_LOG_TYPE.SECURITY]: 'Security log entry',
    [USER_LOG_TYPE.PERFORMANCE]: 'Performance log entry',
    [USER_LOG_TYPE.ACCESS]: 'Access log entry',
  };
  const baseMessage = messages[type] || 'Log entry';
  return formatLogMessage(baseMessage, details);
}

export function shouldArchiveLog(createdAt: Date, archiveAfterDays: number = 90): boolean {
  const now = new Date();
  const diffDays = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays >= archiveAfterDays;
}

export function getLogSeverityFromType(type: string): UserLogSeverity {
  if (type === USER_LOG_TYPE.ERROR || type === USER_LOG_TYPE.SECURITY) {
    return USER_LOG.SEVERITY.ERROR;
  }
  if (type === USER_LOG_TYPE.WARNING) {
    return USER_LOG.SEVERITY.WARNING;
  }
  if (type === USER_LOG_TYPE.AUDIT || type === USER_LOG_TYPE.PERFORMANCE) {
    return USER_LOG.SEVERITY.INFO;
  }
  if (type === USER_LOG_TYPE.DEBUG) {
    return USER_LOG.SEVERITY.DEBUG;
  }
  return USER_LOG.SEVERITY.INFO;
}

// ইউজার লগ টাইপ চেক করার ফাংশন
export function isUserAuditLog(type: string): boolean {
  return type === USER_LOG_TYPE.AUDIT;
}

export function isUserPerformanceLog(type: string): boolean {
  return type === USER_LOG_TYPE.PERFORMANCE;
}

export function isUserSecurityLog(type: string): boolean {
  return type === USER_LOG_TYPE.SECURITY;
}

export function isUserSystemLog(type: string): boolean {
  return type === USER_LOG_TYPE.SYSTEM || type === USER_LOG_TYPE.APPLICATION;
}
