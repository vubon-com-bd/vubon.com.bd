/**
 * Flash Sale Notification Constants
 * নোটিফিকেশন সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// ডিফল্ট নোটিফিকেশন টাইপ
export const DEFAULT_NOTIFICATION_TYPE = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
  reminder: 'reminder',
  alert: 'alert',
  promotion: 'promotion',
  update: 'update',
};

// ডিফল্ট প্রায়োরিটি
export const DEFAULT_NOTIFICATION_PRIORITY = {
  low: 'low',
  medium: 'medium',
  high: 'high',
  urgent: 'urgent',
  critical: 'critical',
};

// ডিফল্ট ডেলিভারি মেথড
export const DEFAULT_NOTIFICATION_DELIVERY_METHOD = {
  email: 'email',
  sms: 'sms',
  push: 'push',
  inApp: 'in_app',
  webhook: 'webhook',
};

// নোটিফিকেশন টাইমআউট (মিলিসেকেন্ডে)
export const NOTIFICATION_TIMEOUT = 30000; // ৩০ সেকেন্ড

// ডিফল্ট রিট্রাই কাউন্ট
export const DEFAULT_RETRY_COUNT = 3;

// ক্যাশ সেটিংস
export const NOTIFICATION_CACHE_SETTINGS = {
  ttl: 3600, // ১ ঘন্টা
  maxSize: 500,
  enabled: true,
};

// ডিফল্ট পেজিনেশন
export const NOTIFICATION_PAGINATION_SIZE = 10;

// ডিফল্ট সর্টিং
export const DEFAULT_NOTIFICATION_SORTING = {
  field: 'createdAt',
  order: 'desc' as const,
};

// API রেসপন্স লিমিট
export const NOTIFICATION_API_RESPONSE_LIMIT = 100;

// নোটিফিকেশন স্ট্যাটাস
export const NOTIFICATION_STATUS = {
  PENDING: 'pending',
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
} as const;

// টেমপ্লেট সেটিংস
export const TEMPLATE_SETTINGS = {
  defaultLocale: 'bn',
  fallbackLocale: 'en',
  maxTemplateSize: 1048576, // 1MB
  allowedVariables: [
    'userName',
    'userEmail',
    'dealName',
    'dealPrice',
    'discountAmount',
    'startTime',
    'endTime',
    'remainingTime',
    'participantCount',
  ],
};

// নোটিফিকেশন কনফিগারেশন ইন্টারফেস
export interface FlashSaleNotificationConfig {
  defaultTypes: {
    info: string;
    success: string;
    warning: string;
    error: string;
    reminder: string;
    alert: string;
    promotion: string;
    update: string;
  };
  defaultPriorities: {
    low: string;
    medium: string;
    high: string;
    urgent: string;
    critical: string;
  };
  defaultDeliveryMethods: {
    email: string;
    sms: string;
    push: string;
    inApp: string;
    webhook: string;
  };
  timeout: number;
  defaultRetryCount: number;
  cacheSettings: {
    ttl: number;
    maxSize: number;
    enabled: boolean;
  };
  paginationSize: number;
  defaultSorting: {
    field: string;
    order: 'asc' | 'desc';
  };
  apiResponseLimit: number;
  templateSettings: {
    defaultLocale: string;
    fallbackLocale: string;
    maxTemplateSize: number;
    allowedVariables: string[];
  };
}

// ডিফল্ট নোটিফিকেশন কনফিগারেশন
export const DEFAULT_NOTIFICATION_CONFIG: FlashSaleNotificationConfig = {
  defaultTypes: DEFAULT_NOTIFICATION_TYPE,
  defaultPriorities: DEFAULT_NOTIFICATION_PRIORITY,
  defaultDeliveryMethods: DEFAULT_NOTIFICATION_DELIVERY_METHOD,
  timeout: NOTIFICATION_TIMEOUT,
  defaultRetryCount: DEFAULT_RETRY_COUNT,
  cacheSettings: NOTIFICATION_CACHE_SETTINGS,
  paginationSize: NOTIFICATION_PAGINATION_SIZE,
  defaultSorting: DEFAULT_NOTIFICATION_SORTING,
  apiResponseLimit: NOTIFICATION_API_RESPONSE_LIMIT,
  templateSettings: TEMPLATE_SETTINGS,
};

// নোটিফিকেশন টাইপের লেবেল
export const NOTIFICATION_TYPE_LABELS: Record<
  (typeof DEFAULT_NOTIFICATION_TYPE)[keyof typeof DEFAULT_NOTIFICATION_TYPE],
  string
> = {
  info: 'তথ্য',
  success: 'সফল',
  warning: 'সতর্কতা',
  error: 'ত্রুটি',
  reminder: 'স্মারক',
  alert: 'সতর্কীকরণ',
  promotion: 'প্রচার',
  update: 'আপডেট',
};

// নোটিফিকেশন টাইপের কালার
export const NOTIFICATION_TYPE_COLORS: Record<
  (typeof DEFAULT_NOTIFICATION_TYPE)[keyof typeof DEFAULT_NOTIFICATION_TYPE],
  string
> = {
  info: '#3B82F6',
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  reminder: '#8B5CF6',
  alert: '#F97316',
  promotion: '#EC4899',
  update: '#06B6D4',
};

// নোটিফিকেশন টাইপের আইকন
export const NOTIFICATION_TYPE_ICONS: Record<
  (typeof DEFAULT_NOTIFICATION_TYPE)[keyof typeof DEFAULT_NOTIFICATION_TYPE],
  string
> = {
  info: 'Info',
  success: 'CheckCircle',
  warning: 'AlertTriangle',
  error: 'XCircle',
  reminder: 'Bell',
  alert: 'AlertOctagon',
  promotion: 'Gift',
  update: 'RefreshCw',
};

// নোটিফিকেশন প্রায়োরিটির লেবেল
export const NOTIFICATION_PRIORITY_LABELS: Record<
  (typeof DEFAULT_NOTIFICATION_PRIORITY)[keyof typeof DEFAULT_NOTIFICATION_PRIORITY],
  string
> = {
  low: 'নিম্ন',
  medium: 'মাঝারি',
  high: 'উচ্চ',
  urgent: 'জরুরি',
  critical: 'সমালোচনামূলক',
};

// নোটিফিকেশন প্রায়োরিটির কালার
export const NOTIFICATION_PRIORITY_COLORS: Record<
  (typeof DEFAULT_NOTIFICATION_PRIORITY)[keyof typeof DEFAULT_NOTIFICATION_PRIORITY],
  string
> = {
  low: '#9CA3AF',
  medium: '#3B82F6',
  high: '#F59E0B',
  urgent: '#F97316',
  critical: '#EF4444',
};

// নোটিফিকেশন ডেলিভারি মেথডের লেবেল
export const NOTIFICATION_DELIVERY_METHOD_LABELS: Record<
  (typeof DEFAULT_NOTIFICATION_DELIVERY_METHOD)[keyof typeof DEFAULT_NOTIFICATION_DELIVERY_METHOD],
  string
> = {
  email: 'ইমেইল',
  sms: 'এসএমএস',
  push: 'পুশ',
  inApp: 'ইন-অ্যাপ',
  webhook: 'ওয়েবহুক',
};

// নোটিফিকেশন স্ট্যাটাসের লেবেল
export const NOTIFICATION_STATUS_LABELS: Record<
  (typeof NOTIFICATION_STATUS)[keyof typeof NOTIFICATION_STATUS],
  string
> = {
  pending: 'অপেক্ষমান',
  sent: 'প্রেরিত',
  delivered: 'পৌঁছেছে',
  read: 'পঠিত',
  failed: 'ব্যর্থ',
  cancelled: 'বাতিলকৃত',
};

// নোটিফিকেশন স্ট্যাটাসের কালার
export const NOTIFICATION_STATUS_COLORS: Record<
  (typeof NOTIFICATION_STATUS)[keyof typeof NOTIFICATION_STATUS],
  string
> = {
  pending: '#FCD34D',
  sent: '#3B82F6',
  delivered: '#22C55E',
  read: '#10B981',
  failed: '#EF4444',
  cancelled: '#6B7280',
};

// হেল্পার ফাংশন: নোটিফিকেশন টাইপ ভ্যালিড কিনা চেক করুন
export const isValidNotificationType = (
  type: string
): type is (typeof DEFAULT_NOTIFICATION_TYPE)[keyof typeof DEFAULT_NOTIFICATION_TYPE] => {
  return Object.values(DEFAULT_NOTIFICATION_TYPE).includes(
    type as (typeof DEFAULT_NOTIFICATION_TYPE)[keyof typeof DEFAULT_NOTIFICATION_TYPE]
  );
};

// হেল্পার ফাংশন: নোটিফিকেশন প্রায়োরিটি ভ্যালিড কিনা চেক করুন
export const isValidNotificationPriority = (
  priority: string
): priority is (typeof DEFAULT_NOTIFICATION_PRIORITY)[keyof typeof DEFAULT_NOTIFICATION_PRIORITY] => {
  return Object.values(DEFAULT_NOTIFICATION_PRIORITY).includes(
    priority as (typeof DEFAULT_NOTIFICATION_PRIORITY)[keyof typeof DEFAULT_NOTIFICATION_PRIORITY]
  );
};

// হেল্পার ফাংশন: নোটিফিকেশন ডেলিভারি মেথড ভ্যালিড কিনা চেক করুন
export const isValidNotificationDeliveryMethod = (
  method: string
): method is (typeof DEFAULT_NOTIFICATION_DELIVERY_METHOD)[keyof typeof DEFAULT_NOTIFICATION_DELIVERY_METHOD] => {
  return Object.values(DEFAULT_NOTIFICATION_DELIVERY_METHOD).includes(
    method as (typeof DEFAULT_NOTIFICATION_DELIVERY_METHOD)[keyof typeof DEFAULT_NOTIFICATION_DELIVERY_METHOD]
  );
};

// হেল্পার ফাংশন: নোটিফিকেশন স্ট্যাটাস ভ্যালিড কিনা চেক করুন
export const isValidNotificationStatus = (
  status: string
): status is (typeof NOTIFICATION_STATUS)[keyof typeof NOTIFICATION_STATUS] => {
  return Object.values(NOTIFICATION_STATUS).includes(
    status as (typeof NOTIFICATION_STATUS)[keyof typeof NOTIFICATION_STATUS]
  );
};

// হেল্পার ফাংশন: নোটিফিকেশন টাইপের লেবেল পান
export const getNotificationTypeLabel = (type: string): string => {
  return NOTIFICATION_TYPE_LABELS[type as keyof typeof NOTIFICATION_TYPE_LABELS] || type;
};

// হেল্পার ফাংশন: নোটিফিকেশন টাইপের কালার পান
export const getNotificationTypeColor = (type: string): string => {
  return NOTIFICATION_TYPE_COLORS[type as keyof typeof NOTIFICATION_TYPE_COLORS] || '#6B7280';
};

// হেল্পার ফাংশন: নোটিফিকেশন টাইপের আইকন পান
export const getNotificationTypeIcon = (type: string): string => {
  return NOTIFICATION_TYPE_ICONS[type as keyof typeof NOTIFICATION_TYPE_ICONS] || 'Bell';
};

// হেল্পার ফাংশন: নোটিফিকেশন প্রায়োরিটির লেবেল পান
export const getNotificationPriorityLabel = (priority: string): string => {
  return (
    NOTIFICATION_PRIORITY_LABELS[priority as keyof typeof NOTIFICATION_PRIORITY_LABELS] || priority
  );
};

// হেল্পার ফাংশন: নোটিফিকেশন ডেলিভারি মেথডের লেবেল পান
export const getNotificationDeliveryMethodLabel = (method: string): string => {
  return (
    NOTIFICATION_DELIVERY_METHOD_LABELS[
      method as keyof typeof NOTIFICATION_DELIVERY_METHOD_LABELS
    ] || method
  );
};

// হেল্পার ফাংশন: নোটিফিকেশন স্ট্যাটাসের লেবেল পান
export const getNotificationStatusLabel = (status: string): string => {
  return NOTIFICATION_STATUS_LABELS[status as keyof typeof NOTIFICATION_STATUS_LABELS] || status;
};

// হেল্পার ফাংশন: নোটিফিকেশন স্ট্যাটাসের কালার পান
export const getNotificationStatusColor = (status: string): string => {
  return NOTIFICATION_STATUS_COLORS[status as keyof typeof NOTIFICATION_STATUS_COLORS] || '#6B7280';
};
