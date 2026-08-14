/**
 * Deal Status Constants
 * ডিলের সকল স্ট্যাটাস ডিফাইন করা
 */

// ডিল স্ট্যাটাস এনাম
export const DEAL_STATUS = {
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
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  SUSPENDED: 'suspended',
  INACTIVE: 'inactive',
} as const;

// ডিল স্ট্যাটাস টাইপ
export type DealStatus = (typeof DEAL_STATUS)[keyof typeof DEAL_STATUS];

// স্ট্যাটাসের লেবেল
export const DEAL_STATUS_LABELS: Record<DealStatus, string> = {
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
  pending: 'অপেক্ষমান',
  approved: 'অনুমোদিত',
  rejected: 'প্রত্যাখ্যাত',
  suspended: 'স্থগিত',
  inactive: 'নিষ্ক্রিয়',
};

// স্ট্যাটাসের বিবরণ
export const DEAL_STATUS_DESCRIPTIONS: Record<DealStatus, string> = {
  draft: 'ডিলটি খসড়া অবস্থায় আছে এবং এখনও প্রকাশ করা হয়নি',
  published: 'ডিলটি প্রকাশিত হয়েছে এবং ব্যবহারকারীরা দেখতে পাচ্ছেন',
  scheduled: 'ডিলটি নির্ধারিত সময়ে শুরু হবে',
  active: 'ডিলটি বর্তমানে চলমান আছে',
  paused: 'ডিলটি সাময়িকভাবে বিরতিপ্রাপ্ত',
  ended: 'ডিলটি সমাপ্ত হয়েছে',
  cancelled: 'ডিলটি বাতিল করা হয়েছে',
  archived: 'ডিলটি আর্কাইভ করা হয়েছে',
  deleted: 'ডিলটি মুছে ফেলা হয়েছে',
  expired: 'ডিলটির মেয়াদ শেষ হয়েছে',
  upcoming: 'ডিলটি শীঘ্রই শুরু হবে',
  ongoing: 'ডিলটি বর্তমানে চলমান',
  completed: 'ডিলটি সফলভাবে সম্পন্ন হয়েছে',
  failed: 'ডিলটি ব্যর্থ হয়েছে',
  pending: 'ডিলটি অনুমোদনের অপেক্ষায় রয়েছে',
  approved: 'ডিলটি অনুমোদিত হয়েছে',
  rejected: 'ডিলটি প্রত্যাখ্যাত হয়েছে',
  suspended: 'ডিলটি স্থগিত করা হয়েছে',
  inactive: 'ডিলটি নিষ্ক্রিয় অবস্থায় আছে',
};

// স্ট্যাটাসের কালার কোড
export const DEAL_STATUS_COLORS: Record<DealStatus, string> = {
  draft: '#9CA3AF', // Gray
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
  pending: '#FCD34D', // Yellow
  approved: '#34D399', // Green
  rejected: '#F87171', // Red
  suspended: '#F59E0B', // Amber
  inactive: '#9CA3AF', // Gray
};

// স্ট্যাটাসের আইকন (আইকন নাম)
export const DEAL_STATUS_ICONS: Record<DealStatus, string> = {
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
  pending: 'Clock',
  approved: 'Check',
  rejected: 'X',
  suspended: 'Minus',
  inactive: 'Power',
};

// স্ট্যাটাসের ডিসপ্লে অর্ডার
export const DEAL_STATUS_DISPLAY_ORDER: Record<DealStatus, number> = {
  draft: 1,
  pending: 2,
  scheduled: 3,
  published: 4,
  approved: 5,
  upcoming: 6,
  active: 7,
  ongoing: 8,
  paused: 9,
  suspended: 10,
  completed: 11,
  ended: 12,
  expired: 13,
  failed: 14,
  cancelled: 15,
  rejected: 16,
  archived: 17,
  deleted: 18,
  inactive: 19,
};

// স্ট্যাটাস গ্রুপ
export const DEAL_STATUS_GROUPS = {
  ACTIVE_STATUSES: ['active', 'ongoing', 'published', 'approved'] as DealStatus[],
  INACTIVE_STATUSES: ['draft', 'archived', 'deleted', 'inactive'] as DealStatus[],
  COMPLETED_STATUSES: ['ended', 'completed', 'expired'] as DealStatus[],
  PENDING_STATUSES: ['pending', 'scheduled', 'upcoming'] as DealStatus[],
  ISSUE_STATUSES: ['failed', 'cancelled', 'rejected', 'suspended', 'paused'] as DealStatus[],
} as const;

// স্ট্যাটাস ট্রানজিশন
export const DEAL_STATUS_TRANSITIONS: Record<DealStatus, DealStatus[]> = {
  draft: ['published', 'scheduled', 'pending', 'cancelled', 'deleted', 'inactive'],
  published: ['scheduled', 'active', 'pending', 'cancelled', 'archived', 'deleted', 'inactive'],
  scheduled: ['active', 'published', 'pending', 'cancelled', 'deleted'],
  active: ['paused', 'ended', 'ongoing', 'completed', 'cancelled', 'suspended', 'inactive'],
  paused: ['active', 'ended', 'cancelled', 'suspended', 'inactive'],
  ended: ['archived', 'deleted', 'inactive'],
  cancelled: ['archived', 'deleted', 'inactive'],
  archived: ['deleted', 'inactive'],
  deleted: [],
  expired: ['archived', 'deleted', 'inactive'],
  upcoming: ['active', 'ongoing', 'cancelled', 'suspended'],
  ongoing: ['completed', 'failed', 'paused', 'cancelled', 'suspended', 'ended'],
  completed: ['archived', 'deleted', 'inactive'],
  failed: ['scheduled', 'pending', 'cancelled', 'deleted'],
  pending: ['approved', 'rejected', 'cancelled', 'draft'],
  approved: ['scheduled', 'active', 'published', 'cancelled', 'inactive'],
  rejected: ['draft', 'cancelled', 'deleted', 'inactive'],
  suspended: ['active', 'paused', 'cancelled', 'ended', 'inactive'],
  inactive: ['draft', 'active', 'cancelled', 'deleted'],
};

// স্ট্যাটাস কনফিগারেশন ইন্টারফেস
export interface DealStatusConfig {
  status: DealStatus;
  label: string;
  description: string;
  color: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
  canTransitionTo: DealStatus[];
}

// সম্পূর্ণ স্ট্যাটাস কনফিগারেশন
export const DEAL_STATUS_CONFIGS: Record<DealStatus, DealStatusConfig> = {
  draft: {
    status: 'draft',
    label: DEAL_STATUS_LABELS.draft,
    description: DEAL_STATUS_DESCRIPTIONS.draft,
    color: DEAL_STATUS_COLORS.draft,
    icon: DEAL_STATUS_ICONS.draft,
    displayOrder: DEAL_STATUS_DISPLAY_ORDER.draft,
    isActive: false,
    canTransitionTo: DEAL_STATUS_TRANSITIONS.draft,
  },
  published: {
    status: 'published',
    label: DEAL_STATUS_LABELS.published,
    description: DEAL_STATUS_DESCRIPTIONS.published,
    color: DEAL_STATUS_COLORS.published,
    icon: DEAL_STATUS_ICONS.published,
    displayOrder: DEAL_STATUS_DISPLAY_ORDER.published,
    isActive: true,
    canTransitionTo: DEAL_STATUS_TRANSITIONS.published,
  },
  scheduled: {
    status: 'scheduled',
    label: DEAL_STATUS_LABELS.scheduled,
    description: DEAL_STATUS_DESCRIPTIONS.scheduled,
    color: DEAL_STATUS_COLORS.scheduled,
    icon: DEAL_STATUS_ICONS.scheduled,
    displayOrder: DEAL_STATUS_DISPLAY_ORDER.scheduled,
    isActive: false,
    canTransitionTo: DEAL_STATUS_TRANSITIONS.scheduled,
  },
  active: {
    status: 'active',
    label: DEAL_STATUS_LABELS.active,
    description: DEAL_STATUS_DESCRIPTIONS.active,
    color: DEAL_STATUS_COLORS.active,
    icon: DEAL_STATUS_ICONS.active,
    displayOrder: DEAL_STATUS_DISPLAY_ORDER.active,
    isActive: true,
    canTransitionTo: DEAL_STATUS_TRANSITIONS.active,
  },
  paused: {
    status: 'paused',
    label: DEAL_STATUS_LABELS.paused,
    description: DEAL_STATUS_DESCRIPTIONS.paused,
    color: DEAL_STATUS_COLORS.paused,
    icon: DEAL_STATUS_ICONS.paused,
    displayOrder: DEAL_STATUS_DISPLAY_ORDER.paused,
    isActive: false,
    canTransitionTo: DEAL_STATUS_TRANSITIONS.paused,
  },
  ended: {
    status: 'ended',
    label: DEAL_STATUS_LABELS.ended,
    description: DEAL_STATUS_DESCRIPTIONS.ended,
    color: DEAL_STATUS_COLORS.ended,
    icon: DEAL_STATUS_ICONS.ended,
    displayOrder: DEAL_STATUS_DISPLAY_ORDER.ended,
    isActive: false,
    canTransitionTo: DEAL_STATUS_TRANSITIONS.ended,
  },
  cancelled: {
    status: 'cancelled',
    label: DEAL_STATUS_LABELS.cancelled,
    description: DEAL_STATUS_DESCRIPTIONS.cancelled,
    color: DEAL_STATUS_COLORS.cancelled,
    icon: DEAL_STATUS_ICONS.cancelled,
    displayOrder: DEAL_STATUS_DISPLAY_ORDER.cancelled,
    isActive: false,
    canTransitionTo: DEAL_STATUS_TRANSITIONS.cancelled,
  },
  archived: {
    status: 'archived',
    label: DEAL_STATUS_LABELS.archived,
    description: DEAL_STATUS_DESCRIPTIONS.archived,
    color: DEAL_STATUS_COLORS.archived,
    icon: DEAL_STATUS_ICONS.archived,
    displayOrder: DEAL_STATUS_DISPLAY_ORDER.archived,
    isActive: false,
    canTransitionTo: DEAL_STATUS_TRANSITIONS.archived,
  },
  deleted: {
    status: 'deleted',
    label: DEAL_STATUS_LABELS.deleted,
    description: DEAL_STATUS_DESCRIPTIONS.deleted,
    color: DEAL_STATUS_COLORS.deleted,
    icon: DEAL_STATUS_ICONS.deleted,
    displayOrder: DEAL_STATUS_DISPLAY_ORDER.deleted,
    isActive: false,
    canTransitionTo: DEAL_STATUS_TRANSITIONS.deleted,
  },
  expired: {
    status: 'expired',
    label: DEAL_STATUS_LABELS.expired,
    description: DEAL_STATUS_DESCRIPTIONS.expired,
    color: DEAL_STATUS_COLORS.expired,
    icon: DEAL_STATUS_ICONS.expired,
    displayOrder: DEAL_STATUS_DISPLAY_ORDER.expired,
    isActive: false,
    canTransitionTo: DEAL_STATUS_TRANSITIONS.expired,
  },
  upcoming: {
    status: 'upcoming',
    label: DEAL_STATUS_LABELS.upcoming,
    description: DEAL_STATUS_DESCRIPTIONS.upcoming,
    color: DEAL_STATUS_COLORS.upcoming,
    icon: DEAL_STATUS_ICONS.upcoming,
    displayOrder: DEAL_STATUS_DISPLAY_ORDER.upcoming,
    isActive: false,
    canTransitionTo: DEAL_STATUS_TRANSITIONS.upcoming,
  },
  ongoing: {
    status: 'ongoing',
    label: DEAL_STATUS_LABELS.ongoing,
    description: DEAL_STATUS_DESCRIPTIONS.ongoing,
    color: DEAL_STATUS_COLORS.ongoing,
    icon: DEAL_STATUS_ICONS.ongoing,
    displayOrder: DEAL_STATUS_DISPLAY_ORDER.ongoing,
    isActive: true,
    canTransitionTo: DEAL_STATUS_TRANSITIONS.ongoing,
  },
  completed: {
    status: 'completed',
    label: DEAL_STATUS_LABELS.completed,
    description: DEAL_STATUS_DESCRIPTIONS.completed,
    color: DEAL_STATUS_COLORS.completed,
    icon: DEAL_STATUS_ICONS.completed,
    displayOrder: DEAL_STATUS_DISPLAY_ORDER.completed,
    isActive: false,
    canTransitionTo: DEAL_STATUS_TRANSITIONS.completed,
  },
  failed: {
    status: 'failed',
    label: DEAL_STATUS_LABELS.failed,
    description: DEAL_STATUS_DESCRIPTIONS.failed,
    color: DEAL_STATUS_COLORS.failed,
    icon: DEAL_STATUS_ICONS.failed,
    displayOrder: DEAL_STATUS_DISPLAY_ORDER.failed,
    isActive: false,
    canTransitionTo: DEAL_STATUS_TRANSITIONS.failed,
  },
  pending: {
    status: 'pending',
    label: DEAL_STATUS_LABELS.pending,
    description: DEAL_STATUS_DESCRIPTIONS.pending,
    color: DEAL_STATUS_COLORS.pending,
    icon: DEAL_STATUS_ICONS.pending,
    displayOrder: DEAL_STATUS_DISPLAY_ORDER.pending,
    isActive: false,
    canTransitionTo: DEAL_STATUS_TRANSITIONS.pending,
  },
  approved: {
    status: 'approved',
    label: DEAL_STATUS_LABELS.approved,
    description: DEAL_STATUS_DESCRIPTIONS.approved,
    color: DEAL_STATUS_COLORS.approved,
    icon: DEAL_STATUS_ICONS.approved,
    displayOrder: DEAL_STATUS_DISPLAY_ORDER.approved,
    isActive: true,
    canTransitionTo: DEAL_STATUS_TRANSITIONS.approved,
  },
  rejected: {
    status: 'rejected',
    label: DEAL_STATUS_LABELS.rejected,
    description: DEAL_STATUS_DESCRIPTIONS.rejected,
    color: DEAL_STATUS_COLORS.rejected,
    icon: DEAL_STATUS_ICONS.rejected,
    displayOrder: DEAL_STATUS_DISPLAY_ORDER.rejected,
    isActive: false,
    canTransitionTo: DEAL_STATUS_TRANSITIONS.rejected,
  },
  suspended: {
    status: 'suspended',
    label: DEAL_STATUS_LABELS.suspended,
    description: DEAL_STATUS_DESCRIPTIONS.suspended,
    color: DEAL_STATUS_COLORS.suspended,
    icon: DEAL_STATUS_ICONS.suspended,
    displayOrder: DEAL_STATUS_DISPLAY_ORDER.suspended,
    isActive: false,
    canTransitionTo: DEAL_STATUS_TRANSITIONS.suspended,
  },
  inactive: {
    status: 'inactive',
    label: DEAL_STATUS_LABELS.inactive,
    description: DEAL_STATUS_DESCRIPTIONS.inactive,
    color: DEAL_STATUS_COLORS.inactive,
    icon: DEAL_STATUS_ICONS.inactive,
    displayOrder: DEAL_STATUS_DISPLAY_ORDER.inactive,
    isActive: false,
    canTransitionTo: DEAL_STATUS_TRANSITIONS.inactive,
  },
};

// হেল্পার ফাংশন: স্ট্যাটাস ভ্যালিড কিনা চেক করুন
export const isValidDealStatus = (status: string): status is DealStatus => {
  return Object.values(DEAL_STATUS).includes(status as DealStatus);
};

// হেল্পার ফাংশন: সক্রিয় স্ট্যাটাস গুলো পান
export const getActiveDealStatuses = (): DealStatus[] => {
  return Object.values(DEAL_STATUS_CONFIGS)
    .filter((config) => config.isActive)
    .map((config) => config.status);
};

// হেল্পার ফাংশন: ডিসপ্লে অর্ডার অনুযায়ী সাজান
export const getDealStatusesByOrder = (): DealStatus[] => {
  return Object.values(DEAL_STATUS_CONFIGS)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((config) => config.status);
};

// হেল্পার ফাংশন: স্ট্যাটাস গ্রুপ অনুযায়ী ফিল্টার
export const getDealStatusesByGroup = (group: keyof typeof DEAL_STATUS_GROUPS): DealStatus[] => {
  return DEAL_STATUS_GROUPS[group] || [];
};

// হেল্পার ফাংশন: স্ট্যাটাসের লেবেল পান
export const getDealStatusLabel = (status: DealStatus): string => {
  return DEAL_STATUS_LABELS[status] || status;
};

// হেল্পার ফাংশন: স্ট্যাটাসের কালার পান
export const getDealStatusColor = (status: DealStatus): string => {
  return DEAL_STATUS_COLORS[status] || '#6B7280';
};

// হেল্পার ফাংশন: স্ট্যাটাস ট্রানজিশন সম্ভব কিনা চেক করুন
export const canTransitionToDealStatus = (from: DealStatus, to: DealStatus): boolean => {
  return DEAL_STATUS_TRANSITIONS[from]?.includes(to) || false;
};
