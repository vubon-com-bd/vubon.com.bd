/**
 * Flash Sale Status Constants
 * ফ্ল্যাশ সেলের সকল স্ট্যাটাস ডিফাইন করা
 */

// ফ্ল্যাশ সেল স্ট্যাটাস এনাম
export const FLASH_SALE_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  SCHEDULED: 'scheduled',
  ACTIVE: 'active',
  PAUSED: 'paused',
  ENDED: 'ended',
  CANCELLED: 'cancelled',
  ARCHIVED: 'archived',
  DELETED: 'deleted',
  EXPIRED: 'expired',
  UPCOMING: 'upcoming',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  PENDING_APPROVAL: 'pending_approval',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  SUSPENDED: 'suspended',
} as const;

// ফ্ল্যাশ সেল স্ট্যাটাস টাইপ
export type FlashSaleStatus = (typeof FLASH_SALE_STATUS)[keyof typeof FLASH_SALE_STATUS];

// স্ট্যাটাসের লেবেল
export const FLASH_SALE_STATUS_LABELS: Record<FlashSaleStatus, string> = {
  draft: 'খসড়া',
  published: 'প্রকাশিত',
  scheduled: 'নির্ধারিত',
  active: 'সক্রিয়',
  paused: 'বিরতিপ্রাপ্ত',
  ended: 'সমাপ্ত',
  cancelled: 'বাতিলকৃত',
  archived: 'আর্কাইভড',
  deleted: 'মুছে ফেলা',
  expired: 'মেয়াদোত্তীর্ণ',
  upcoming: 'আসন্ন',
  ongoing: 'চলমান',
  completed: 'সম্পন্ন',
  failed: 'ব্যর্থ',
  pending_approval: 'অনুমোদনের অপেক্ষায়',
  approved: 'অনুমোদিত',
  rejected: 'প্রত্যাখ্যাত',
  suspended: 'স্থগিত',
};

// স্ট্যাটাসের কালার কোড
export const FLASH_SALE_STATUS_COLORS: Record<FlashSaleStatus, string> = {
  draft: '#6B7280', // Gray
  published: '#3B82F6', // Blue
  scheduled: '#8B5CF6', // Purple
  active: '#22C55E', // Green
  paused: '#F59E0B', // Amber
  ended: '#6B7280', // Gray
  cancelled: '#EF4444', // Red
  archived: '#9CA3AF', // Gray
  deleted: '#DC2626', // Red
  expired: '#F97316', // Orange
  upcoming: '#6366F1', // Indigo
  ongoing: '#10B981', // Emerald
  completed: '#059669', // Green
  failed: '#DC2626', // Red
  pending_approval: '#FCD34D', // Yellow
  approved: '#34D399', // Green
  rejected: '#F87171', // Red
  suspended: '#F59E0B', // Amber
};

// স্ট্যাটাসের আইকন (আইকন নাম)
export const FLASH_SALE_STATUS_ICONS: Record<FlashSaleStatus, string> = {
  draft: 'FileText',
  published: 'Globe',
  scheduled: 'CalendarClock',
  active: 'Clock',
  paused: 'Pause',
  ended: 'CheckCircle',
  cancelled: 'XCircle',
  archived: 'Archive',
  deleted: 'Trash2',
  expired: 'AlertCircle',
  upcoming: 'Calendar',
  ongoing: 'Activity',
  completed: 'CheckCheck',
  failed: 'AlertTriangle',
  pending_approval: 'Clock',
  approved: 'Check',
  rejected: 'X',
  suspended: 'Minus',
};

// স্ট্যাটাসের বিবরণ
export const FLASH_SALE_STATUS_DESCRIPTIONS: Record<FlashSaleStatus, string> = {
  draft: 'ফ্ল্যাশ সেলটি খসড়া অবস্থায় আছে এবং এখনও প্রকাশ করা হয়নি',
  published: 'ফ্ল্যাশ সেলটি প্রকাশিত হয়েছে এবং ব্যবহারকারীরা দেখতে পাচ্ছেন',
  scheduled: 'ফ্ল্যাশ সেলটি নির্ধারিত সময়ে শুরু হবে',
  active: 'ফ্ল্যাশ সেলটি বর্তমানে চলমান আছে',
  paused: 'ফ্ল্যাশ সেলটি সাময়িকভাবে বিরতিপ্রাপ্ত',
  ended: 'ফ্ল্যাশ সেলটি সমাপ্ত হয়েছে',
  cancelled: 'ফ্ল্যাশ সেলটি বাতিল করা হয়েছে',
  archived: 'ফ্ল্যাশ সেলটি আর্কাইভ করা হয়েছে',
  deleted: 'ফ্ল্যাশ সেলটি মুছে ফেলা হয়েছে',
  expired: 'ফ্ল্যাশ সেলটির মেয়াদ শেষ হয়েছে',
  upcoming: 'ফ্ল্যাশ সেলটি শীঘ্রই শুরু হবে',
  ongoing: 'ফ্ল্যাশ সেলটি বর্তমানে চলমান',
  completed: 'ফ্ল্যাশ সেলটি সফলভাবে সম্পন্ন হয়েছে',
  failed: 'ফ্ল্যাশ সেলটি ব্যর্থ হয়েছে',
  pending_approval: 'ফ্ল্যাশ সেলটি অনুমোদনের অপেক্ষায় রয়েছে',
  approved: 'ফ্ল্যাশ সেলটি অনুমোদিত হয়েছে',
  rejected: 'ফ্ল্যাশ সেলটি প্রত্যাখ্যাত হয়েছে',
  suspended: 'ফ্ল্যাশ সেলটি স্থগিত করা হয়েছে',
};

// স্ট্যাটাস গ্রুপ
export const FLASH_SALE_STATUS_GROUPS = {
  ACTIVE_STATUSES: ['active', 'ongoing'] as FlashSaleStatus[],
  INACTIVE_STATUSES: ['draft', 'archived', 'deleted'] as FlashSaleStatus[],
  COMPLETED_STATUSES: ['ended', 'completed', 'expired'] as FlashSaleStatus[],
  PENDING_STATUSES: ['pending_approval', 'scheduled'] as FlashSaleStatus[],
  ISSUE_STATUSES: ['failed', 'cancelled', 'rejected', 'suspended'] as FlashSaleStatus[],
} as const;

// স্ট্যাটাস ট্রানজিশন
export const FLASH_SALE_STATUS_TRANSITIONS: Record<FlashSaleStatus, FlashSaleStatus[]> = {
  draft: ['published', 'scheduled', 'cancelled', 'deleted'],
  published: ['scheduled', 'active', 'cancelled', 'archived', 'deleted'],
  scheduled: ['active', 'cancelled', 'deleted'],
  active: ['paused', 'ended', 'cancelled', 'suspended'],
  paused: ['active', 'ended', 'cancelled'],
  ended: ['archived', 'deleted'],
  cancelled: ['archived', 'deleted'],
  archived: ['deleted'],
  deleted: [],
  expired: ['archived', 'deleted'],
  upcoming: ['active', 'cancelled'],
  ongoing: ['completed', 'failed', 'cancelled', 'suspended'],
  completed: ['archived', 'deleted'],
  failed: ['scheduled', 'cancelled', 'deleted'],
  pending_approval: ['approved', 'rejected', 'cancelled'],
  approved: ['scheduled', 'active', 'cancelled'],
  rejected: ['cancelled', 'deleted'],
  suspended: ['active', 'cancelled', 'ended'],
};

// স্ট্যাটাস কনফিগারেশন ইন্টারফেস
export interface FlashSaleStatusConfig {
  status: FlashSaleStatus;
  label: string;
  color: string;
  icon: string;
  description: string;
  isActive: boolean;
  canTransitionTo: FlashSaleStatus[];
}

// সম্পূর্ণ স্ট্যাটাস কনফিগারেশন
export const FLASH_SALE_STATUS_CONFIGS: Record<FlashSaleStatus, FlashSaleStatusConfig> = {
  draft: {
    status: 'draft',
    label: FLASH_SALE_STATUS_LABELS.draft,
    color: FLASH_SALE_STATUS_COLORS.draft,
    icon: FLASH_SALE_STATUS_ICONS.draft,
    description: FLASH_SALE_STATUS_DESCRIPTIONS.draft,
    isActive: false,
    canTransitionTo: FLASH_SALE_STATUS_TRANSITIONS.draft,
  },
  published: {
    status: 'published',
    label: FLASH_SALE_STATUS_LABELS.published,
    color: FLASH_SALE_STATUS_COLORS.published,
    icon: FLASH_SALE_STATUS_ICONS.published,
    description: FLASH_SALE_STATUS_DESCRIPTIONS.published,
    isActive: false,
    canTransitionTo: FLASH_SALE_STATUS_TRANSITIONS.published,
  },
  scheduled: {
    status: 'scheduled',
    label: FLASH_SALE_STATUS_LABELS.scheduled,
    color: FLASH_SALE_STATUS_COLORS.scheduled,
    icon: FLASH_SALE_STATUS_ICONS.scheduled,
    description: FLASH_SALE_STATUS_DESCRIPTIONS.scheduled,
    isActive: false,
    canTransitionTo: FLASH_SALE_STATUS_TRANSITIONS.scheduled,
  },
  active: {
    status: 'active',
    label: FLASH_SALE_STATUS_LABELS.active,
    color: FLASH_SALE_STATUS_COLORS.active,
    icon: FLASH_SALE_STATUS_ICONS.active,
    description: FLASH_SALE_STATUS_DESCRIPTIONS.active,
    isActive: true,
    canTransitionTo: FLASH_SALE_STATUS_TRANSITIONS.active,
  },
  paused: {
    status: 'paused',
    label: FLASH_SALE_STATUS_LABELS.paused,
    color: FLASH_SALE_STATUS_COLORS.paused,
    icon: FLASH_SALE_STATUS_ICONS.paused,
    description: FLASH_SALE_STATUS_DESCRIPTIONS.paused,
    isActive: false,
    canTransitionTo: FLASH_SALE_STATUS_TRANSITIONS.paused,
  },
  ended: {
    status: 'ended',
    label: FLASH_SALE_STATUS_LABELS.ended,
    color: FLASH_SALE_STATUS_COLORS.ended,
    icon: FLASH_SALE_STATUS_ICONS.ended,
    description: FLASH_SALE_STATUS_DESCRIPTIONS.ended,
    isActive: false,
    canTransitionTo: FLASH_SALE_STATUS_TRANSITIONS.ended,
  },
  cancelled: {
    status: 'cancelled',
    label: FLASH_SALE_STATUS_LABELS.cancelled,
    color: FLASH_SALE_STATUS_COLORS.cancelled,
    icon: FLASH_SALE_STATUS_ICONS.cancelled,
    description: FLASH_SALE_STATUS_DESCRIPTIONS.cancelled,
    isActive: false,
    canTransitionTo: FLASH_SALE_STATUS_TRANSITIONS.cancelled,
  },
  archived: {
    status: 'archived',
    label: FLASH_SALE_STATUS_LABELS.archived,
    color: FLASH_SALE_STATUS_COLORS.archived,
    icon: FLASH_SALE_STATUS_ICONS.archived,
    description: FLASH_SALE_STATUS_DESCRIPTIONS.archived,
    isActive: false,
    canTransitionTo: FLASH_SALE_STATUS_TRANSITIONS.archived,
  },
  deleted: {
    status: 'deleted',
    label: FLASH_SALE_STATUS_LABELS.deleted,
    color: FLASH_SALE_STATUS_COLORS.deleted,
    icon: FLASH_SALE_STATUS_ICONS.deleted,
    description: FLASH_SALE_STATUS_DESCRIPTIONS.deleted,
    isActive: false,
    canTransitionTo: FLASH_SALE_STATUS_TRANSITIONS.deleted,
  },
  expired: {
    status: 'expired',
    label: FLASH_SALE_STATUS_LABELS.expired,
    color: FLASH_SALE_STATUS_COLORS.expired,
    icon: FLASH_SALE_STATUS_ICONS.expired,
    description: FLASH_SALE_STATUS_DESCRIPTIONS.expired,
    isActive: false,
    canTransitionTo: FLASH_SALE_STATUS_TRANSITIONS.expired,
  },
  upcoming: {
    status: 'upcoming',
    label: FLASH_SALE_STATUS_LABELS.upcoming,
    color: FLASH_SALE_STATUS_COLORS.upcoming,
    icon: FLASH_SALE_STATUS_ICONS.upcoming,
    description: FLASH_SALE_STATUS_DESCRIPTIONS.upcoming,
    isActive: false,
    canTransitionTo: FLASH_SALE_STATUS_TRANSITIONS.upcoming,
  },
  ongoing: {
    status: 'ongoing',
    label: FLASH_SALE_STATUS_LABELS.ongoing,
    color: FLASH_SALE_STATUS_COLORS.ongoing,
    icon: FLASH_SALE_STATUS_ICONS.ongoing,
    description: FLASH_SALE_STATUS_DESCRIPTIONS.ongoing,
    isActive: true,
    canTransitionTo: FLASH_SALE_STATUS_TRANSITIONS.ongoing,
  },
  completed: {
    status: 'completed',
    label: FLASH_SALE_STATUS_LABELS.completed,
    color: FLASH_SALE_STATUS_COLORS.completed,
    icon: FLASH_SALE_STATUS_ICONS.completed,
    description: FLASH_SALE_STATUS_DESCRIPTIONS.completed,
    isActive: false,
    canTransitionTo: FLASH_SALE_STATUS_TRANSITIONS.completed,
  },
  failed: {
    status: 'failed',
    label: FLASH_SALE_STATUS_LABELS.failed,
    color: FLASH_SALE_STATUS_COLORS.failed,
    icon: FLASH_SALE_STATUS_ICONS.failed,
    description: FLASH_SALE_STATUS_DESCRIPTIONS.failed,
    isActive: false,
    canTransitionTo: FLASH_SALE_STATUS_TRANSITIONS.failed,
  },
  pending_approval: {
    status: 'pending_approval',
    label: FLASH_SALE_STATUS_LABELS.pending_approval,
    color: FLASH_SALE_STATUS_COLORS.pending_approval,
    icon: FLASH_SALE_STATUS_ICONS.pending_approval,
    description: FLASH_SALE_STATUS_DESCRIPTIONS.pending_approval,
    isActive: false,
    canTransitionTo: FLASH_SALE_STATUS_TRANSITIONS.pending_approval,
  },
  approved: {
    status: 'approved',
    label: FLASH_SALE_STATUS_LABELS.approved,
    color: FLASH_SALE_STATUS_COLORS.approved,
    icon: FLASH_SALE_STATUS_ICONS.approved,
    description: FLASH_SALE_STATUS_DESCRIPTIONS.approved,
    isActive: false,
    canTransitionTo: FLASH_SALE_STATUS_TRANSITIONS.approved,
  },
  rejected: {
    status: 'rejected',
    label: FLASH_SALE_STATUS_LABELS.rejected,
    color: FLASH_SALE_STATUS_COLORS.rejected,
    icon: FLASH_SALE_STATUS_ICONS.rejected,
    description: FLASH_SALE_STATUS_DESCRIPTIONS.rejected,
    isActive: false,
    canTransitionTo: FLASH_SALE_STATUS_TRANSITIONS.rejected,
  },
  suspended: {
    status: 'suspended',
    label: FLASH_SALE_STATUS_LABELS.suspended,
    color: FLASH_SALE_STATUS_COLORS.suspended,
    icon: FLASH_SALE_STATUS_ICONS.suspended,
    description: FLASH_SALE_STATUS_DESCRIPTIONS.suspended,
    isActive: false,
    canTransitionTo: FLASH_SALE_STATUS_TRANSITIONS.suspended,
  },
};

// হেল্পার ফাংশন: স্ট্যাটাস ভ্যালিড কিনা চেক করুন
export const isValidFlashSaleStatus = (status: string): status is FlashSaleStatus => {
  return Object.values(FLASH_SALE_STATUS).includes(status as FlashSaleStatus);
};

// হেল্পার ফাংশন: সক্রিয় স্ট্যাটাস গুলো পান
export const getActiveFlashSaleStatuses = (): FlashSaleStatus[] => {
  return Object.values(FLASH_SALE_STATUS_CONFIGS)
    .filter((config) => config.isActive)
    .map((config) => config.status);
};

// হেল্পার ফাংশন: স্ট্যাটাস গ্রুপ অনুযায়ী ফিল্টার
export const getFlashSaleStatusesByGroup = (
  group: keyof typeof FLASH_SALE_STATUS_GROUPS
): FlashSaleStatus[] => {
  return FLASH_SALE_STATUS_GROUPS[group] || [];
};
