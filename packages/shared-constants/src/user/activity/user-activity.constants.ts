/**
 * User Activity Constants
 * Core user activity tracking-related constants
 */

import { USER_ACTIVITY_TYPE } from './user-activity-type.constants';
import { USER_ACTIVITY_STATUS } from './user-activity-status.constants';

export const USER_ACTIVITY = {
  // Default values
  DEFAULTS: {
    STATUS: USER_ACTIVITY_STATUS.ACTIVE,
    TYPE: USER_ACTIVITY_TYPE.LOGIN,
    SEVERITY: 'info',
    IS_READ: false,
    IS_ARCHIVED: false,
  },

  // Severity levels
  SEVERITY: {
    INFO: 'info',
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  },

  // Activity fields
  FIELDS: {
    ID: 'id',
    USER_ID: 'userId',
    TYPE: 'type',
    STATUS: 'status',
    SEVERITY: 'severity',
    DESCRIPTION: 'description',
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
    IS_READ: 'isRead',
    IS_ARCHIVED: 'isArchived',
    CREATED_AT: 'createdAt',
    UPDATED_AT: 'updatedAt',
  },

  // Activity status messages
  STATUS_MESSAGES: {
    [USER_ACTIVITY_STATUS.ACTIVE]: 'Activity is active',
    [USER_ACTIVITY_STATUS.PENDING]: 'Activity is pending',
    [USER_ACTIVITY_STATUS.COMPLETED]: 'Activity completed successfully',
    [USER_ACTIVITY_STATUS.FAILED]: 'Activity failed',
    [USER_ACTIVITY_STATUS.CANCELLED]: 'Activity was cancelled',
    [USER_ACTIVITY_STATUS.ARCHIVED]: 'Activity is archived',
  },

  // Common activity metadata keys
  METADATA_KEYS: {
    ORDER_ID: 'orderId',
    PRODUCT_ID: 'productId',
    PAYMENT_ID: 'paymentId',
    TRANSACTION_ID: 'transactionId',
    SESSION_ID: 'sessionId',
    REFERRAL_ID: 'referralId',
    COUPON_ID: 'couponId',
    VENDOR_ID: 'vendorId',
    CATEGORY_ID: 'categoryId',
    REVIEW_ID: 'reviewId',
    MESSAGE_ID: 'messageId',
    TICKET_ID: 'ticketId',
    SHIPMENT_ID: 'shipmentId',
  },

  // Activity timeframes
  TIMEFRAMES: {
    TODAY: 'today',
    YESTERDAY: 'yesterday',
    LAST_7_DAYS: 'last-7-days',
    LAST_30_DAYS: 'last-30-days',
    LAST_90_DAYS: 'last-90-days',
    LAST_YEAR: 'last-year',
    CUSTOM: 'custom',
  },
} as const;

export type UserActivitySeverity =
  (typeof USER_ACTIVITY.SEVERITY)[keyof typeof USER_ACTIVITY.SEVERITY];
export type UserActivityTimeframe =
  (typeof USER_ACTIVITY.TIMEFRAMES)[keyof typeof USER_ACTIVITY.TIMEFRAMES];
export type UserActivityMetadataKey =
  (typeof USER_ACTIVITY.METADATA_KEYS)[keyof typeof USER_ACTIVITY.METADATA_KEYS];

export function getSeverityLabel(severity: UserActivitySeverity): string {
  const labels: Record<UserActivitySeverity, string> = {
    [USER_ACTIVITY.SEVERITY.INFO]: 'Information',
    [USER_ACTIVITY.SEVERITY.LOW]: 'Low Risk',
    [USER_ACTIVITY.SEVERITY.MEDIUM]: 'Medium Risk',
    [USER_ACTIVITY.SEVERITY.HIGH]: 'High Risk',
    [USER_ACTIVITY.SEVERITY.CRITICAL]: 'Critical Risk',
  };
  return labels[severity] || 'Unknown';
}

export function getSeverityColor(severity: UserActivitySeverity): string {
  const colors: Record<UserActivitySeverity, string> = {
    [USER_ACTIVITY.SEVERITY.INFO]: 'info',
    [USER_ACTIVITY.SEVERITY.LOW]: 'success',
    [USER_ACTIVITY.SEVERITY.MEDIUM]: 'warning',
    [USER_ACTIVITY.SEVERITY.HIGH]: 'danger',
    [USER_ACTIVITY.SEVERITY.CRITICAL]: 'danger',
  };
  return colors[severity] || 'secondary';
}

export function getSeverityPriority(severity: UserActivitySeverity): number {
  const priorities: Record<UserActivitySeverity, number> = {
    [USER_ACTIVITY.SEVERITY.INFO]: 1,
    [USER_ACTIVITY.SEVERITY.LOW]: 2,
    [USER_ACTIVITY.SEVERITY.MEDIUM]: 3,
    [USER_ACTIVITY.SEVERITY.HIGH]: 4,
    [USER_ACTIVITY.SEVERITY.CRITICAL]: 5,
  };
  return priorities[severity] || 0;
}

export function getActivityStatusMessage(status: string): string {
  return (
    USER_ACTIVITY.STATUS_MESSAGES[status as keyof typeof USER_ACTIVITY.STATUS_MESSAGES] ||
    'Unknown status'
  );
}

export function isActivityActive(status: string): boolean {
  return status === USER_ACTIVITY_STATUS.ACTIVE || status === USER_ACTIVITY_STATUS.PENDING;
}

export function isActivityCompleted(status: string): boolean {
  return status === USER_ACTIVITY_STATUS.COMPLETED;
}

export function isActivityFailed(status: string): boolean {
  return status === USER_ACTIVITY_STATUS.FAILED;
}

export function isActivityRead(activity: { isRead: boolean }): boolean {
  return activity.isRead === true;
}

export function isActivityArchived(activity: { isArchived: boolean }): boolean {
  return activity.isArchived === true;
}

export function getActivityTimeframeLabel(timeframe: UserActivityTimeframe): string {
  const labels: Record<UserActivityTimeframe, string> = {
    [USER_ACTIVITY.TIMEFRAMES.TODAY]: 'Today',
    [USER_ACTIVITY.TIMEFRAMES.YESTERDAY]: 'Yesterday',
    [USER_ACTIVITY.TIMEFRAMES.LAST_7_DAYS]: 'Last 7 Days',
    [USER_ACTIVITY.TIMEFRAMES.LAST_30_DAYS]: 'Last 30 Days',
    [USER_ACTIVITY.TIMEFRAMES.LAST_90_DAYS]: 'Last 90 Days',
    [USER_ACTIVITY.TIMEFRAMES.LAST_YEAR]: 'Last Year',
    [USER_ACTIVITY.TIMEFRAMES.CUSTOM]: 'Custom Range',
  };
  return labels[timeframe] || 'Unknown';
}

export function getTimeframeDateRange(timeframe: UserActivityTimeframe): {
  startDate: Date;
  endDate: Date;
} {
  const now = new Date();
  const endDate = new Date(now);
  let startDate = new Date(now);

  switch (timeframe) {
    case USER_ACTIVITY.TIMEFRAMES.TODAY:
      startDate.setHours(0, 0, 0, 0);
      break;
    case USER_ACTIVITY.TIMEFRAMES.YESTERDAY:
      startDate.setDate(startDate.getDate() - 1);
      startDate.setHours(0, 0, 0, 0);
      endDate.setDate(endDate.getDate() - 1);
      endDate.setHours(23, 59, 59, 999);
      break;
    case USER_ACTIVITY.TIMEFRAMES.LAST_7_DAYS:
      startDate.setDate(startDate.getDate() - 7);
      startDate.setHours(0, 0, 0, 0);
      break;
    case USER_ACTIVITY.TIMEFRAMES.LAST_30_DAYS:
      startDate.setDate(startDate.getDate() - 30);
      startDate.setHours(0, 0, 0, 0);
      break;
    case USER_ACTIVITY.TIMEFRAMES.LAST_90_DAYS:
      startDate.setDate(startDate.getDate() - 90);
      startDate.setHours(0, 0, 0, 0);
      break;
    case USER_ACTIVITY.TIMEFRAMES.LAST_YEAR:
      startDate.setFullYear(startDate.getFullYear() - 1);
      startDate.setHours(0, 0, 0, 0);
      break;
    default:
      startDate = new Date(0);
  }

  return { startDate, endDate };
}

export function getActivityMetadataValue(
  metadata: Record<string, unknown>,
  key: UserActivityMetadataKey
): unknown {
  return metadata[key] || null;
}

export function hasActivityMetadata(
  metadata: Record<string, unknown>,
  key: UserActivityMetadataKey
): boolean {
  return key in metadata && metadata[key] !== null && metadata[key] !== undefined;
}

export function getActivityDescription(
  type: string,
  _metadata: Record<string, unknown> = {}
): string {
  const descriptions: Record<string, string> = {
    [USER_ACTIVITY_TYPE.LOGIN]: 'User logged in',
    [USER_ACTIVITY_TYPE.LOGOUT]: 'User logged out',
    [USER_ACTIVITY_TYPE.REGISTER]: 'User registered',
    [USER_ACTIVITY_TYPE.PROFILE_UPDATE]: 'User updated profile',
    [USER_ACTIVITY_TYPE.PASSWORD_CHANGE]: 'User changed password',
    [USER_ACTIVITY_TYPE.ORDER_CREATE]: 'User created order',
    [USER_ACTIVITY_TYPE.ORDER_UPDATE]: 'User updated order',
    [USER_ACTIVITY_TYPE.ORDER_CANCEL]: 'User cancelled order',
    [USER_ACTIVITY_TYPE.PAYMENT]: 'User made payment',
    [USER_ACTIVITY_TYPE.REFUND]: 'User requested refund',
    [USER_ACTIVITY_TYPE.REVIEW]: 'User wrote review',
    [USER_ACTIVITY_TYPE.WISHLIST_ADD]: 'User added to wishlist',
    [USER_ACTIVITY_TYPE.WISHLIST_REMOVE]: 'User removed from wishlist',
    [USER_ACTIVITY_TYPE.WISHLIST_VIEW]: 'User viewed wishlist',
    [USER_ACTIVITY_TYPE.WISHLIST_SHARE]: 'User shared wishlist',
    [USER_ACTIVITY_TYPE.CART_ADD]: 'User added to cart',
    [USER_ACTIVITY_TYPE.CART_REMOVE]: 'User removed from cart',
    [USER_ACTIVITY_TYPE.CART_UPDATE]: 'User updated cart',
    [USER_ACTIVITY_TYPE.CART_CLEAR]: 'User cleared cart',
    [USER_ACTIVITY_TYPE.CART_VIEW]: 'User viewed cart',
    [USER_ACTIVITY_TYPE.SEARCH]: 'User performed search',
    [USER_ACTIVITY_TYPE.VIEW]: 'User viewed page',
    [USER_ACTIVITY_TYPE.DOWNLOAD]: 'User downloaded file',
    [USER_ACTIVITY_TYPE.SHARE]: 'User shared content',
    [USER_ACTIVITY_TYPE.FOLLOW]: 'User followed another user',
    [USER_ACTIVITY_TYPE.UNFOLLOW]: 'User unfollowed another user',
    [USER_ACTIVITY_TYPE.REPORT]: 'User submitted report',
    [USER_ACTIVITY_TYPE.FEEDBACK]: 'User provided feedback',
  };
  return descriptions[type] || 'User performed activity';
}

export function shouldArchiveActivity(createdAt: Date, archiveAfterDays: number = 30): boolean {
  const now = new Date();
  const diffDays = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays >= archiveAfterDays;
}

export function getActivitySeverityFromType(type: string): UserActivitySeverity {
  const highSeverityTypes: string[] = [
    USER_ACTIVITY_TYPE.PAYMENT,
    USER_ACTIVITY_TYPE.REFUND,
    USER_ACTIVITY_TYPE.PASSWORD_CHANGE,
    USER_ACTIVITY_TYPE.REPORT,
  ];

  const criticalSeverityTypes: string[] = [USER_ACTIVITY_TYPE.LOGIN, USER_ACTIVITY_TYPE.REGISTER];

  if (criticalSeverityTypes.includes(type)) {
    return USER_ACTIVITY.SEVERITY.CRITICAL;
  }
  if (highSeverityTypes.includes(type)) {
    return USER_ACTIVITY.SEVERITY.HIGH;
  }
  return USER_ACTIVITY.SEVERITY.INFO;
}
