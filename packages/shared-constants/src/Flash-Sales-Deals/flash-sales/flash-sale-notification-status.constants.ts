/**
 * Flash Sale Notification Status Constants
 * নোটিফিকেশনের স্ট্যাটাসসমূহ
 */

// নোটিফিকেশন স্ট্যাটাস এনাম
export const NOTIFICATION_STATUS = {
  PENDING: 'pending',
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
  SCHEDULED: 'scheduled',
  PROCESSING: 'processing',
  QUEUED: 'queued',
  RETRYING: 'retrying',
  EXPIRED: 'expired',
  ARCHIVED: 'archived',
  DELETED: 'deleted',
  DRAFT: 'draft',
  PUBLISHED: 'published',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

// নোটিফিকেশন স্ট্যাটাস টাইপ
export type NotificationStatus = (typeof NOTIFICATION_STATUS)[keyof typeof NOTIFICATION_STATUS];

// স্ট্যাটাসের লেবেল
export const NOTIFICATION_STATUS_LABELS: Record<NotificationStatus, string> = {
  pending: 'অপেক্ষমান',
  sent: 'প্রেরিত',
  delivered: 'পৌঁছেছে',
  read: 'পঠিত',
  failed: 'ব্যর্থ',
  cancelled: 'বাতিলকৃত',
  scheduled: 'নির্ধারিত',
  processing: 'প্রক্রিয়াকরণ',
  queued: 'কিউভুক্ত',
  retrying: 'পুনরায় চেষ্টা',
  expired: 'মেয়াদোত্তীর্ণ',
  archived: 'আর্কাইভড',
  deleted: 'মুছে ফেলা',
  draft: 'খসড়া',
  published: 'প্রকাশিত',
  approved: 'অনুমোদিত',
  rejected: 'প্রত্যাখ্যাত',
};

// স্ট্যাটাসের বিবরণ
export const NOTIFICATION_STATUS_DESCRIPTIONS: Record<NotificationStatus, string> = {
  pending: 'নোটিফিকেশন প্রেরণের অপেক্ষায়',
  sent: 'নোটিফিকেশন প্রেরণ করা হয়েছে',
  delivered: 'নোটিফিকেশন প্রাপকের কাছে পৌঁছেছে',
  read: 'নোটিফিকেশন প্রাপক পড়েছেন',
  failed: 'নোটিফিকেশন প্রেরণ ব্যর্থ হয়েছে',
  cancelled: 'নোটিফিকেশন বাতিল করা হয়েছে',
  scheduled: 'নোটিফিকেশন নির্ধারিত সময়ে প্রেরণ হবে',
  processing: 'নোটিফিকেশন প্রক্রিয়াকরণ চলছে',
  queued: 'নোটিফিকেশন প্রেরণের জন্য কিউতে রয়েছে',
  retrying: 'নোটিফিকেশন পুনরায় প্রেরণের চেষ্টা চলছে',
  expired: 'নোটিফিকেশনের মেয়াদ শেষ হয়েছে',
  archived: 'নোটিফিকেশন আর্কাইভ করা হয়েছে',
  deleted: 'নোটিফিকেশন মুছে ফেলা হয়েছে',
  draft: 'নোটিফিকেশন খসড়া অবস্থায় আছে',
  published: 'নোটিফিকেশন প্রকাশিত হয়েছে',
  approved: 'নোটিফিকেশন অনুমোদিত হয়েছে',
  rejected: 'নোটিফিকেশন প্রত্যাখ্যাত হয়েছে',
};

// স্ট্যাটাসের কালার কোড
export const NOTIFICATION_STATUS_COLORS: Record<NotificationStatus, string> = {
  pending: '#FCD34D',
  sent: '#3B82F6',
  delivered: '#22C55E',
  read: '#10B981',
  failed: '#EF4444',
  cancelled: '#6B7280',
  scheduled: '#8B5CF6',
  processing: '#06B6D4',
  queued: '#F59E0B',
  retrying: '#F97316',
  expired: '#F97316',
  archived: '#9CA3AF',
  deleted: '#DC2626',
  draft: '#9CA3AF',
  published: '#3B82F6',
  approved: '#34D399',
  rejected: '#F87171',
};

// স্ট্যাটাসের আইকন (আইকন নাম)
export const NOTIFICATION_STATUS_ICONS: Record<NotificationStatus, string> = {
  pending: 'Clock',
  sent: 'Send',
  delivered: 'CheckCircle',
  read: 'Eye',
  failed: 'XCircle',
  cancelled: 'X',
  scheduled: 'CalendarClock',
  processing: 'Loader',
  queued: 'List',
  retrying: 'RefreshCw',
  expired: 'AlertCircle',
  archived: 'Archive',
  deleted: 'Trash2',
  draft: 'FileText',
  published: 'Globe',
  approved: 'Check',
  rejected: 'XOctagon',
};

// স্ট্যাটাসের ডিসপ্লে অর্ডার
export const NOTIFICATION_STATUS_DISPLAY_ORDER: Record<NotificationStatus, number> = {
  draft: 1,
  pending: 2,
  queued: 3,
  scheduled: 4,
  processing: 5,
  sent: 6,
  delivered: 7,
  read: 8,
  approved: 9,
  published: 10,
  retrying: 11,
  failed: 12,
  cancelled: 13,
  expired: 14,
  rejected: 15,
  archived: 16,
  deleted: 17,
};

// স্ট্যাটাস গ্রুপ
export const NOTIFICATION_STATUS_GROUPS = {
  ACTIVE_STATUSES: ['sent', 'delivered', 'read', 'published', 'approved'] as NotificationStatus[],
  INACTIVE_STATUSES: ['archived', 'deleted', 'expired', 'cancelled'] as NotificationStatus[],
  PENDING_STATUSES: ['pending', 'queued', 'scheduled', 'draft'] as NotificationStatus[],
  PROCESSING_STATUSES: ['processing', 'retrying'] as NotificationStatus[],
  ISSUE_STATUSES: ['failed', 'rejected'] as NotificationStatus[],
} as const;

// স্ট্যাটাস ট্রানজিশন
export const NOTIFICATION_STATUS_TRANSITIONS: Record<NotificationStatus, NotificationStatus[]> = {
  draft: ['published', 'scheduled', 'pending', 'archived', 'deleted'],
  pending: ['queued', 'processing', 'cancelled', 'archived', 'deleted'],
  queued: ['processing', 'scheduled', 'cancelled', 'archived', 'deleted'],
  scheduled: ['processing', 'pending', 'cancelled', 'archived', 'deleted'],
  processing: ['sent', 'failed', 'retrying', 'cancelled'],
  sent: ['delivered', 'failed', 'cancelled', 'archived', 'deleted'],
  delivered: ['read', 'expired', 'archived', 'deleted'],
  read: ['archived', 'deleted'],
  approved: ['published', 'sent', 'scheduled', 'archived', 'deleted'],
  published: ['sent', 'scheduled', 'archived', 'deleted'],
  retrying: ['processing', 'sent', 'failed', 'cancelled'],
  failed: ['pending', 'retrying', 'cancelled', 'archived', 'deleted'],
  cancelled: ['archived', 'deleted'],
  expired: ['archived', 'deleted'],
  rejected: ['draft', 'archived', 'deleted'],
  archived: ['deleted'],
  deleted: [],
};

// স্ট্যাটাস কনফিগারেশন ইন্টারফেস
export interface NotificationStatusConfig {
  status: NotificationStatus;
  label: string;
  description: string;
  color: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
  canTransitionTo: NotificationStatus[];
}

// সম্পূর্ণ স্ট্যাটাস কনফিগারেশন
export const NOTIFICATION_STATUS_CONFIGS: Record<NotificationStatus, NotificationStatusConfig> = {
  pending: {
    status: 'pending',
    label: NOTIFICATION_STATUS_LABELS.pending,
    description: NOTIFICATION_STATUS_DESCRIPTIONS.pending,
    color: NOTIFICATION_STATUS_COLORS.pending,
    icon: NOTIFICATION_STATUS_ICONS.pending,
    displayOrder: NOTIFICATION_STATUS_DISPLAY_ORDER.pending,
    isActive: false,
    canTransitionTo: NOTIFICATION_STATUS_TRANSITIONS.pending,
  },
  sent: {
    status: 'sent',
    label: NOTIFICATION_STATUS_LABELS.sent,
    description: NOTIFICATION_STATUS_DESCRIPTIONS.sent,
    color: NOTIFICATION_STATUS_COLORS.sent,
    icon: NOTIFICATION_STATUS_ICONS.sent,
    displayOrder: NOTIFICATION_STATUS_DISPLAY_ORDER.sent,
    isActive: true,
    canTransitionTo: NOTIFICATION_STATUS_TRANSITIONS.sent,
  },
  delivered: {
    status: 'delivered',
    label: NOTIFICATION_STATUS_LABELS.delivered,
    description: NOTIFICATION_STATUS_DESCRIPTIONS.delivered,
    color: NOTIFICATION_STATUS_COLORS.delivered,
    icon: NOTIFICATION_STATUS_ICONS.delivered,
    displayOrder: NOTIFICATION_STATUS_DISPLAY_ORDER.delivered,
    isActive: true,
    canTransitionTo: NOTIFICATION_STATUS_TRANSITIONS.delivered,
  },
  read: {
    status: 'read',
    label: NOTIFICATION_STATUS_LABELS.read,
    description: NOTIFICATION_STATUS_DESCRIPTIONS.read,
    color: NOTIFICATION_STATUS_COLORS.read,
    icon: NOTIFICATION_STATUS_ICONS.read,
    displayOrder: NOTIFICATION_STATUS_DISPLAY_ORDER.read,
    isActive: true,
    canTransitionTo: NOTIFICATION_STATUS_TRANSITIONS.read,
  },
  failed: {
    status: 'failed',
    label: NOTIFICATION_STATUS_LABELS.failed,
    description: NOTIFICATION_STATUS_DESCRIPTIONS.failed,
    color: NOTIFICATION_STATUS_COLORS.failed,
    icon: NOTIFICATION_STATUS_ICONS.failed,
    displayOrder: NOTIFICATION_STATUS_DISPLAY_ORDER.failed,
    isActive: false,
    canTransitionTo: NOTIFICATION_STATUS_TRANSITIONS.failed,
  },
  cancelled: {
    status: 'cancelled',
    label: NOTIFICATION_STATUS_LABELS.cancelled,
    description: NOTIFICATION_STATUS_DESCRIPTIONS.cancelled,
    color: NOTIFICATION_STATUS_COLORS.cancelled,
    icon: NOTIFICATION_STATUS_ICONS.cancelled,
    displayOrder: NOTIFICATION_STATUS_DISPLAY_ORDER.cancelled,
    isActive: false,
    canTransitionTo: NOTIFICATION_STATUS_TRANSITIONS.cancelled,
  },
  scheduled: {
    status: 'scheduled',
    label: NOTIFICATION_STATUS_LABELS.scheduled,
    description: NOTIFICATION_STATUS_DESCRIPTIONS.scheduled,
    color: NOTIFICATION_STATUS_COLORS.scheduled,
    icon: NOTIFICATION_STATUS_ICONS.scheduled,
    displayOrder: NOTIFICATION_STATUS_DISPLAY_ORDER.scheduled,
    isActive: false,
    canTransitionTo: NOTIFICATION_STATUS_TRANSITIONS.scheduled,
  },
  processing: {
    status: 'processing',
    label: NOTIFICATION_STATUS_LABELS.processing,
    description: NOTIFICATION_STATUS_DESCRIPTIONS.processing,
    color: NOTIFICATION_STATUS_COLORS.processing,
    icon: NOTIFICATION_STATUS_ICONS.processing,
    displayOrder: NOTIFICATION_STATUS_DISPLAY_ORDER.processing,
    isActive: false,
    canTransitionTo: NOTIFICATION_STATUS_TRANSITIONS.processing,
  },
  queued: {
    status: 'queued',
    label: NOTIFICATION_STATUS_LABELS.queued,
    description: NOTIFICATION_STATUS_DESCRIPTIONS.queued,
    color: NOTIFICATION_STATUS_COLORS.queued,
    icon: NOTIFICATION_STATUS_ICONS.queued,
    displayOrder: NOTIFICATION_STATUS_DISPLAY_ORDER.queued,
    isActive: false,
    canTransitionTo: NOTIFICATION_STATUS_TRANSITIONS.queued,
  },
  retrying: {
    status: 'retrying',
    label: NOTIFICATION_STATUS_LABELS.retrying,
    description: NOTIFICATION_STATUS_DESCRIPTIONS.retrying,
    color: NOTIFICATION_STATUS_COLORS.retrying,
    icon: NOTIFICATION_STATUS_ICONS.retrying,
    displayOrder: NOTIFICATION_STATUS_DISPLAY_ORDER.retrying,
    isActive: false,
    canTransitionTo: NOTIFICATION_STATUS_TRANSITIONS.retrying,
  },
  expired: {
    status: 'expired',
    label: NOTIFICATION_STATUS_LABELS.expired,
    description: NOTIFICATION_STATUS_DESCRIPTIONS.expired,
    color: NOTIFICATION_STATUS_COLORS.expired,
    icon: NOTIFICATION_STATUS_ICONS.expired,
    displayOrder: NOTIFICATION_STATUS_DISPLAY_ORDER.expired,
    isActive: false,
    canTransitionTo: NOTIFICATION_STATUS_TRANSITIONS.expired,
  },
  archived: {
    status: 'archived',
    label: NOTIFICATION_STATUS_LABELS.archived,
    description: NOTIFICATION_STATUS_DESCRIPTIONS.archived,
    color: NOTIFICATION_STATUS_COLORS.archived,
    icon: NOTIFICATION_STATUS_ICONS.archived,
    displayOrder: NOTIFICATION_STATUS_DISPLAY_ORDER.archived,
    isActive: false,
    canTransitionTo: NOTIFICATION_STATUS_TRANSITIONS.archived,
  },
  deleted: {
    status: 'deleted',
    label: NOTIFICATION_STATUS_LABELS.deleted,
    description: NOTIFICATION_STATUS_DESCRIPTIONS.deleted,
    color: NOTIFICATION_STATUS_COLORS.deleted,
    icon: NOTIFICATION_STATUS_ICONS.deleted,
    displayOrder: NOTIFICATION_STATUS_DISPLAY_ORDER.deleted,
    isActive: false,
    canTransitionTo: NOTIFICATION_STATUS_TRANSITIONS.deleted,
  },
  draft: {
    status: 'draft',
    label: NOTIFICATION_STATUS_LABELS.draft,
    description: NOTIFICATION_STATUS_DESCRIPTIONS.draft,
    color: NOTIFICATION_STATUS_COLORS.draft,
    icon: NOTIFICATION_STATUS_ICONS.draft,
    displayOrder: NOTIFICATION_STATUS_DISPLAY_ORDER.draft,
    isActive: false,
    canTransitionTo: NOTIFICATION_STATUS_TRANSITIONS.draft,
  },
  published: {
    status: 'published',
    label: NOTIFICATION_STATUS_LABELS.published,
    description: NOTIFICATION_STATUS_DESCRIPTIONS.published,
    color: NOTIFICATION_STATUS_COLORS.published,
    icon: NOTIFICATION_STATUS_ICONS.published,
    displayOrder: NOTIFICATION_STATUS_DISPLAY_ORDER.published,
    isActive: true,
    canTransitionTo: NOTIFICATION_STATUS_TRANSITIONS.published,
  },
  approved: {
    status: 'approved',
    label: NOTIFICATION_STATUS_LABELS.approved,
    description: NOTIFICATION_STATUS_DESCRIPTIONS.approved,
    color: NOTIFICATION_STATUS_COLORS.approved,
    icon: NOTIFICATION_STATUS_ICONS.approved,
    displayOrder: NOTIFICATION_STATUS_DISPLAY_ORDER.approved,
    isActive: true,
    canTransitionTo: NOTIFICATION_STATUS_TRANSITIONS.approved,
  },
  rejected: {
    status: 'rejected',
    label: NOTIFICATION_STATUS_LABELS.rejected,
    description: NOTIFICATION_STATUS_DESCRIPTIONS.rejected,
    color: NOTIFICATION_STATUS_COLORS.rejected,
    icon: NOTIFICATION_STATUS_ICONS.rejected,
    displayOrder: NOTIFICATION_STATUS_DISPLAY_ORDER.rejected,
    isActive: false,
    canTransitionTo: NOTIFICATION_STATUS_TRANSITIONS.rejected,
  },
};

// হেল্পার ফাংশন: স্ট্যাটাস ভ্যালিড কিনা চেক করুন
export const isValidNotificationStatus = (status: string): status is NotificationStatus => {
  return Object.values(NOTIFICATION_STATUS).includes(status as NotificationStatus);
};

// হেল্পার ফাংশন: সক্রিয় স্ট্যাটাস গুলো পান
export const getActiveNotificationStatuses = (): NotificationStatus[] => {
  return Object.values(NOTIFICATION_STATUS_CONFIGS)
    .filter((config) => config.isActive)
    .map((config) => config.status);
};

// হেল্পার ফাংশন: ডিসপ্লে অর্ডার অনুযায়ী সাজান
export const getNotificationStatusesByOrder = (): NotificationStatus[] => {
  return Object.values(NOTIFICATION_STATUS_CONFIGS)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((config) => config.status);
};

// হেল্পার ফাংশন: স্ট্যাটাস গ্রুপ অনুযায়ী ফিল্টার
export const getNotificationStatusesByGroup = (
  group: keyof typeof NOTIFICATION_STATUS_GROUPS
): NotificationStatus[] => {
  return NOTIFICATION_STATUS_GROUPS[group] || [];
};

// হেল্পার ফাংশন: স্ট্যাটাসের লেবেল পান
export const getNotificationStatusLabel = (status: NotificationStatus): string => {
  return NOTIFICATION_STATUS_LABELS[status] || status;
};

// হেল্পার ফাংশন: স্ট্যাটাসের বিবরণ পান
export const getNotificationStatusDescription = (status: NotificationStatus): string => {
  return NOTIFICATION_STATUS_DESCRIPTIONS[status] || '';
};

// হেল্পার ফাংশন: স্ট্যাটাসের কালার পান
export const getNotificationStatusColor = (status: NotificationStatus): string => {
  return NOTIFICATION_STATUS_COLORS[status] || '#6B7280';
};

// হেল্পার ফাংশন: স্ট্যাটাসের আইকন পান
export const getNotificationStatusIcon = (status: NotificationStatus): string => {
  return NOTIFICATION_STATUS_ICONS[status] || 'Circle';
};

// হেল্পার ফাংশন: স্ট্যাটাস ট্রানজিশন সম্ভব কিনা চেক করুন
export const canTransitionToNotificationStatus = (
  from: NotificationStatus,
  to: NotificationStatus
): boolean => {
  return NOTIFICATION_STATUS_TRANSITIONS[from]?.includes(to) || false;
};

// হেল্পার ফাংশন: স্ট্যাটাস টার্মিনাল কিনা চেক করুন
export const isTerminalNotificationStatus = (status: NotificationStatus): boolean => {
  const terminalStatuses: NotificationStatus[] = [
    'delivered',
    'read',
    'failed',
    'cancelled',
    'expired',
    'archived',
    'deleted',
    'rejected',
  ];
  return terminalStatuses.includes(status);
};
