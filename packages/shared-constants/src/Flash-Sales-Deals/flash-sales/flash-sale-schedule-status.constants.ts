/**
 * Flash Sale Schedule Status Constants
 * ফ্ল্যাশ সেল শিডিউলের স্ট্যাটাসসমূহ
 */

// ফ্ল্যাশ সেল শিডিউল স্ট্যাটাস এনাম
export const FLASH_SALE_SCHEDULE_STATUS = {
  SCHEDULED: 'scheduled',
  ACTIVE: 'active',
  PAUSED: 'paused',
  ENDED: 'ended',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  FAILED: 'failed',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  DELAYED: 'delayed',
  ADVANCED: 'advanced',
  RESCHEDULED: 'rescheduled',
  EXPIRED: 'expired',
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const;

// ফ্ল্যাশ সেল শিডিউল স্ট্যাটাস টাইপ
export type FlashSaleScheduleStatus =
  (typeof FLASH_SALE_SCHEDULE_STATUS)[keyof typeof FLASH_SALE_SCHEDULE_STATUS];

// স্ট্যাটাসের লেবেল
export const FLASH_SALE_SCHEDULE_STATUS_LABELS: Record<FlashSaleScheduleStatus, string> = {
  scheduled: 'নির্ধারিত',
  active: 'সক্রিয়',
  paused: 'বিরতিপ্রাপ্ত',
  ended: 'সমাপ্ত',
  cancelled: 'বাতিলকৃত',
  completed: 'সম্পন্ন',
  failed: 'ব্যর্থ',
  pending: 'অপেক্ষমান',
  approved: 'অনুমোদিত',
  rejected: 'প্রত্যাখ্যাত',
  delayed: 'বিলম্বিত',
  advanced: 'অগ্রসর',
  rescheduled: 'পুনঃনির্ধারিত',
  expired: 'মেয়াদোত্তীর্ণ',
  draft: 'খসড়া',
  published: 'প্রকাশিত',
  archived: 'আর্কাইভড',
};

// স্ট্যাটাসের বিবরণ
export const FLASH_SALE_SCHEDULE_STATUS_DESCRIPTIONS: Record<FlashSaleScheduleStatus, string> = {
  scheduled: 'শিডিউলটি নির্ধারিত সময়ে শুরু হবে',
  active: 'শিডিউলটি বর্তমানে সক্রিয় এবং চলমান',
  paused: 'শিডিউলটি সাময়িকভাবে বিরতিপ্রাপ্ত',
  ended: 'শিডিউলটি সমাপ্ত হয়েছে',
  cancelled: 'শিডিউলটি বাতিল করা হয়েছে',
  completed: 'শিডিউলটি সফলভাবে সম্পন্ন হয়েছে',
  failed: 'শিডিউলটি ব্যর্থ হয়েছে',
  pending: 'শিডিউলটি অনুমোদনের অপেক্ষায়',
  approved: 'শিডিউলটি অনুমোদিত হয়েছে',
  rejected: 'শিডিউলটি প্রত্যাখ্যাত হয়েছে',
  delayed: 'শিডিউলটি বিলম্বিত হয়েছে',
  advanced: 'শিডিউলটি আগে শুরু হয়েছে',
  rescheduled: 'শিডিউলটি পুনঃনির্ধারিত হয়েছে',
  expired: 'শিডিউলটির মেয়াদ শেষ হয়েছে',
  draft: 'শিডিউলটি খসড়া অবস্থায় আছে',
  published: 'শিডিউলটি প্রকাশিত হয়েছে',
  archived: 'শিডিউলটি আর্কাইভ করা হয়েছে',
};

// স্ট্যাটাসের কালার কোড
export const FLASH_SALE_SCHEDULE_STATUS_COLORS: Record<FlashSaleScheduleStatus, string> = {
  scheduled: '#8B5CF6', // Purple
  active: '#22C55E', // Green
  paused: '#F59E0B', // Amber
  ended: '#6B7280', // Gray
  cancelled: '#EF4444', // Red
  completed: '#3B82F6', // Blue
  failed: '#DC2626', // Dark Red
  pending: '#FCD34D', // Yellow
  approved: '#34D399', // Green
  rejected: '#F87171', // Red
  delayed: '#F97316', // Orange
  advanced: '#06B6D4', // Cyan
  rescheduled: '#8B5CF6', // Purple
  expired: '#F97316', // Orange
  draft: '#9CA3AF', // Gray
  published: '#3B82F6', // Blue
  archived: '#9CA3AF', // Gray
};

// স্ট্যাটাসের আইকন (আইকন নাম)
export const FLASH_SALE_SCHEDULE_STATUS_ICONS: Record<FlashSaleScheduleStatus, string> = {
  scheduled: 'CalendarClock',
  active: 'Clock',
  paused: 'Pause',
  ended: 'CheckCircle',
  cancelled: 'XCircle',
  completed: 'CheckCheck',
  failed: 'AlertTriangle',
  pending: 'Clock',
  approved: 'Check',
  rejected: 'X',
  delayed: 'Clock',
  advanced: 'ArrowUp',
  rescheduled: 'Calendar',
  expired: 'AlertCircle',
  draft: 'FileText',
  published: 'Globe',
  archived: 'Archive',
};

// স্ট্যাটাসের ডিসপ্লে অর্ডার
export const FLASH_SALE_SCHEDULE_STATUS_DISPLAY_ORDER: Record<FlashSaleScheduleStatus, number> = {
  draft: 1,
  pending: 2,
  scheduled: 3,
  approved: 4,
  published: 5,
  active: 6,
  advanced: 7,
  paused: 8,
  delayed: 9,
  rescheduled: 10,
  ended: 11,
  completed: 12,
  expired: 13,
  failed: 14,
  cancelled: 15,
  rejected: 16,
  archived: 17,
};

// স্ট্যাটাস গ্রুপ
export const FLASH_SALE_SCHEDULE_STATUS_GROUPS = {
  ACTIVE_STATUSES: ['active', 'approved', 'published'] as FlashSaleScheduleStatus[],
  INACTIVE_STATUSES: ['draft', 'archived'] as FlashSaleScheduleStatus[],
  COMPLETED_STATUSES: ['ended', 'completed', 'expired'] as FlashSaleScheduleStatus[],
  PENDING_STATUSES: ['pending', 'scheduled'] as FlashSaleScheduleStatus[],
  ISSUE_STATUSES: [
    'cancelled',
    'rejected',
    'failed',
    'paused',
    'delayed',
  ] as FlashSaleScheduleStatus[],
  MODIFIED_STATUSES: ['rescheduled', 'advanced'] as FlashSaleScheduleStatus[],
} as const;

// স্ট্যাটাস ট্রানজিশন
export const FLASH_SALE_SCHEDULE_STATUS_TRANSITIONS: Record<
  FlashSaleScheduleStatus,
  FlashSaleScheduleStatus[]
> = {
  draft: ['published', 'scheduled', 'pending', 'cancelled', 'archived'],
  published: ['scheduled', 'active', 'pending', 'cancelled', 'archived'],
  scheduled: ['active', 'published', 'pending', 'rescheduled', 'cancelled', 'archived'],
  active: ['paused', 'ended', 'completed', 'cancelled', 'delayed'],
  paused: ['active', 'ended', 'cancelled', 'archived'],
  ended: ['archived', 'completed'],
  cancelled: ['archived'],
  completed: ['archived'],
  failed: ['scheduled', 'pending', 'cancelled', 'archived'],
  pending: ['approved', 'rejected', 'cancelled', 'draft'],
  approved: ['scheduled', 'active', 'published', 'cancelled', 'archived'],
  rejected: ['draft', 'cancelled', 'archived'],
  delayed: ['active', 'paused', 'cancelled', 'archived'],
  advanced: ['active', 'paused', 'cancelled', 'archived'],
  rescheduled: ['scheduled', 'active', 'cancelled', 'archived'],
  expired: ['archived'],
  archived: [],
};

// স্ট্যাটাস কনফিগারেশন ইন্টারফেস
export interface FlashSaleScheduleStatusConfig {
  status: FlashSaleScheduleStatus;
  label: string;
  description: string;
  color: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
  canTransitionTo: FlashSaleScheduleStatus[];
}

// সম্পূর্ণ স্ট্যাটাস কনফিগারেশন
export const FLASH_SALE_SCHEDULE_STATUS_CONFIGS: Record<
  FlashSaleScheduleStatus,
  FlashSaleScheduleStatusConfig
> = {
  scheduled: {
    status: 'scheduled',
    label: FLASH_SALE_SCHEDULE_STATUS_LABELS.scheduled,
    description: FLASH_SALE_SCHEDULE_STATUS_DESCRIPTIONS.scheduled,
    color: FLASH_SALE_SCHEDULE_STATUS_COLORS.scheduled,
    icon: FLASH_SALE_SCHEDULE_STATUS_ICONS.scheduled,
    displayOrder: FLASH_SALE_SCHEDULE_STATUS_DISPLAY_ORDER.scheduled,
    isActive: false,
    canTransitionTo: FLASH_SALE_SCHEDULE_STATUS_TRANSITIONS.scheduled,
  },
  active: {
    status: 'active',
    label: FLASH_SALE_SCHEDULE_STATUS_LABELS.active,
    description: FLASH_SALE_SCHEDULE_STATUS_DESCRIPTIONS.active,
    color: FLASH_SALE_SCHEDULE_STATUS_COLORS.active,
    icon: FLASH_SALE_SCHEDULE_STATUS_ICONS.active,
    displayOrder: FLASH_SALE_SCHEDULE_STATUS_DISPLAY_ORDER.active,
    isActive: true,
    canTransitionTo: FLASH_SALE_SCHEDULE_STATUS_TRANSITIONS.active,
  },
  paused: {
    status: 'paused',
    label: FLASH_SALE_SCHEDULE_STATUS_LABELS.paused,
    description: FLASH_SALE_SCHEDULE_STATUS_DESCRIPTIONS.paused,
    color: FLASH_SALE_SCHEDULE_STATUS_COLORS.paused,
    icon: FLASH_SALE_SCHEDULE_STATUS_ICONS.paused,
    displayOrder: FLASH_SALE_SCHEDULE_STATUS_DISPLAY_ORDER.paused,
    isActive: false,
    canTransitionTo: FLASH_SALE_SCHEDULE_STATUS_TRANSITIONS.paused,
  },
  ended: {
    status: 'ended',
    label: FLASH_SALE_SCHEDULE_STATUS_LABELS.ended,
    description: FLASH_SALE_SCHEDULE_STATUS_DESCRIPTIONS.ended,
    color: FLASH_SALE_SCHEDULE_STATUS_COLORS.ended,
    icon: FLASH_SALE_SCHEDULE_STATUS_ICONS.ended,
    displayOrder: FLASH_SALE_SCHEDULE_STATUS_DISPLAY_ORDER.ended,
    isActive: false,
    canTransitionTo: FLASH_SALE_SCHEDULE_STATUS_TRANSITIONS.ended,
  },
  cancelled: {
    status: 'cancelled',
    label: FLASH_SALE_SCHEDULE_STATUS_LABELS.cancelled,
    description: FLASH_SALE_SCHEDULE_STATUS_DESCRIPTIONS.cancelled,
    color: FLASH_SALE_SCHEDULE_STATUS_COLORS.cancelled,
    icon: FLASH_SALE_SCHEDULE_STATUS_ICONS.cancelled,
    displayOrder: FLASH_SALE_SCHEDULE_STATUS_DISPLAY_ORDER.cancelled,
    isActive: false,
    canTransitionTo: FLASH_SALE_SCHEDULE_STATUS_TRANSITIONS.cancelled,
  },
  completed: {
    status: 'completed',
    label: FLASH_SALE_SCHEDULE_STATUS_LABELS.completed,
    description: FLASH_SALE_SCHEDULE_STATUS_DESCRIPTIONS.completed,
    color: FLASH_SALE_SCHEDULE_STATUS_COLORS.completed,
    icon: FLASH_SALE_SCHEDULE_STATUS_ICONS.completed,
    displayOrder: FLASH_SALE_SCHEDULE_STATUS_DISPLAY_ORDER.completed,
    isActive: false,
    canTransitionTo: FLASH_SALE_SCHEDULE_STATUS_TRANSITIONS.completed,
  },
  failed: {
    status: 'failed',
    label: FLASH_SALE_SCHEDULE_STATUS_LABELS.failed,
    description: FLASH_SALE_SCHEDULE_STATUS_DESCRIPTIONS.failed,
    color: FLASH_SALE_SCHEDULE_STATUS_COLORS.failed,
    icon: FLASH_SALE_SCHEDULE_STATUS_ICONS.failed,
    displayOrder: FLASH_SALE_SCHEDULE_STATUS_DISPLAY_ORDER.failed,
    isActive: false,
    canTransitionTo: FLASH_SALE_SCHEDULE_STATUS_TRANSITIONS.failed,
  },
  pending: {
    status: 'pending',
    label: FLASH_SALE_SCHEDULE_STATUS_LABELS.pending,
    description: FLASH_SALE_SCHEDULE_STATUS_DESCRIPTIONS.pending,
    color: FLASH_SALE_SCHEDULE_STATUS_COLORS.pending,
    icon: FLASH_SALE_SCHEDULE_STATUS_ICONS.pending,
    displayOrder: FLASH_SALE_SCHEDULE_STATUS_DISPLAY_ORDER.pending,
    isActive: false,
    canTransitionTo: FLASH_SALE_SCHEDULE_STATUS_TRANSITIONS.pending,
  },
  approved: {
    status: 'approved',
    label: FLASH_SALE_SCHEDULE_STATUS_LABELS.approved,
    description: FLASH_SALE_SCHEDULE_STATUS_DESCRIPTIONS.approved,
    color: FLASH_SALE_SCHEDULE_STATUS_COLORS.approved,
    icon: FLASH_SALE_SCHEDULE_STATUS_ICONS.approved,
    displayOrder: FLASH_SALE_SCHEDULE_STATUS_DISPLAY_ORDER.approved,
    isActive: true,
    canTransitionTo: FLASH_SALE_SCHEDULE_STATUS_TRANSITIONS.approved,
  },
  rejected: {
    status: 'rejected',
    label: FLASH_SALE_SCHEDULE_STATUS_LABELS.rejected,
    description: FLASH_SALE_SCHEDULE_STATUS_DESCRIPTIONS.rejected,
    color: FLASH_SALE_SCHEDULE_STATUS_COLORS.rejected,
    icon: FLASH_SALE_SCHEDULE_STATUS_ICONS.rejected,
    displayOrder: FLASH_SALE_SCHEDULE_STATUS_DISPLAY_ORDER.rejected,
    isActive: false,
    canTransitionTo: FLASH_SALE_SCHEDULE_STATUS_TRANSITIONS.rejected,
  },
  delayed: {
    status: 'delayed',
    label: FLASH_SALE_SCHEDULE_STATUS_LABELS.delayed,
    description: FLASH_SALE_SCHEDULE_STATUS_DESCRIPTIONS.delayed,
    color: FLASH_SALE_SCHEDULE_STATUS_COLORS.delayed,
    icon: FLASH_SALE_SCHEDULE_STATUS_ICONS.delayed,
    displayOrder: FLASH_SALE_SCHEDULE_STATUS_DISPLAY_ORDER.delayed,
    isActive: false,
    canTransitionTo: FLASH_SALE_SCHEDULE_STATUS_TRANSITIONS.delayed,
  },
  advanced: {
    status: 'advanced',
    label: FLASH_SALE_SCHEDULE_STATUS_LABELS.advanced,
    description: FLASH_SALE_SCHEDULE_STATUS_DESCRIPTIONS.advanced,
    color: FLASH_SALE_SCHEDULE_STATUS_COLORS.advanced,
    icon: FLASH_SALE_SCHEDULE_STATUS_ICONS.advanced,
    displayOrder: FLASH_SALE_SCHEDULE_STATUS_DISPLAY_ORDER.advanced,
    isActive: false,
    canTransitionTo: FLASH_SALE_SCHEDULE_STATUS_TRANSITIONS.advanced,
  },
  rescheduled: {
    status: 'rescheduled',
    label: FLASH_SALE_SCHEDULE_STATUS_LABELS.rescheduled,
    description: FLASH_SALE_SCHEDULE_STATUS_DESCRIPTIONS.rescheduled,
    color: FLASH_SALE_SCHEDULE_STATUS_COLORS.rescheduled,
    icon: FLASH_SALE_SCHEDULE_STATUS_ICONS.rescheduled,
    displayOrder: FLASH_SALE_SCHEDULE_STATUS_DISPLAY_ORDER.rescheduled,
    isActive: false,
    canTransitionTo: FLASH_SALE_SCHEDULE_STATUS_TRANSITIONS.rescheduled,
  },
  expired: {
    status: 'expired',
    label: FLASH_SALE_SCHEDULE_STATUS_LABELS.expired,
    description: FLASH_SALE_SCHEDULE_STATUS_DESCRIPTIONS.expired,
    color: FLASH_SALE_SCHEDULE_STATUS_COLORS.expired,
    icon: FLASH_SALE_SCHEDULE_STATUS_ICONS.expired,
    displayOrder: FLASH_SALE_SCHEDULE_STATUS_DISPLAY_ORDER.expired,
    isActive: false,
    canTransitionTo: FLASH_SALE_SCHEDULE_STATUS_TRANSITIONS.expired,
  },
  draft: {
    status: 'draft',
    label: FLASH_SALE_SCHEDULE_STATUS_LABELS.draft,
    description: FLASH_SALE_SCHEDULE_STATUS_DESCRIPTIONS.draft,
    color: FLASH_SALE_SCHEDULE_STATUS_COLORS.draft,
    icon: FLASH_SALE_SCHEDULE_STATUS_ICONS.draft,
    displayOrder: FLASH_SALE_SCHEDULE_STATUS_DISPLAY_ORDER.draft,
    isActive: false,
    canTransitionTo: FLASH_SALE_SCHEDULE_STATUS_TRANSITIONS.draft,
  },
  published: {
    status: 'published',
    label: FLASH_SALE_SCHEDULE_STATUS_LABELS.published,
    description: FLASH_SALE_SCHEDULE_STATUS_DESCRIPTIONS.published,
    color: FLASH_SALE_SCHEDULE_STATUS_COLORS.published,
    icon: FLASH_SALE_SCHEDULE_STATUS_ICONS.published,
    displayOrder: FLASH_SALE_SCHEDULE_STATUS_DISPLAY_ORDER.published,
    isActive: true,
    canTransitionTo: FLASH_SALE_SCHEDULE_STATUS_TRANSITIONS.published,
  },
  archived: {
    status: 'archived',
    label: FLASH_SALE_SCHEDULE_STATUS_LABELS.archived,
    description: FLASH_SALE_SCHEDULE_STATUS_DESCRIPTIONS.archived,
    color: FLASH_SALE_SCHEDULE_STATUS_COLORS.archived,
    icon: FLASH_SALE_SCHEDULE_STATUS_ICONS.archived,
    displayOrder: FLASH_SALE_SCHEDULE_STATUS_DISPLAY_ORDER.archived,
    isActive: false,
    canTransitionTo: FLASH_SALE_SCHEDULE_STATUS_TRANSITIONS.archived,
  },
};

// হেল্পার ফাংশন: স্ট্যাটাস ভ্যালিড কিনা চেক করুন
export const isValidFlashSaleScheduleStatus = (
  status: string
): status is FlashSaleScheduleStatus => {
  return Object.values(FLASH_SALE_SCHEDULE_STATUS).includes(status as FlashSaleScheduleStatus);
};

// হেল্পার ফাংশন: সক্রিয় স্ট্যাটাস গুলো পান
export const getActiveFlashSaleScheduleStatuses = (): FlashSaleScheduleStatus[] => {
  return Object.values(FLASH_SALE_SCHEDULE_STATUS_CONFIGS)
    .filter((config) => config.isActive)
    .map((config) => config.status);
};

// হেল্পার ফাংশন: ডিসপ্লে অর্ডার অনুযায়ী সাজান
export const getFlashSaleScheduleStatusesByOrder = (): FlashSaleScheduleStatus[] => {
  return Object.values(FLASH_SALE_SCHEDULE_STATUS_CONFIGS)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((config) => config.status);
};

// হেল্পার ফাংশন: স্ট্যাটাস গ্রুপ অনুযায়ী ফিল্টার
export const getFlashSaleScheduleStatusesByGroup = (
  group: keyof typeof FLASH_SALE_SCHEDULE_STATUS_GROUPS
): FlashSaleScheduleStatus[] => {
  return FLASH_SALE_SCHEDULE_STATUS_GROUPS[group] || [];
};

// হেল্পার ফাংশন: স্ট্যাটাসের লেবেল পান
export const getFlashSaleScheduleStatusLabel = (status: FlashSaleScheduleStatus): string => {
  return FLASH_SALE_SCHEDULE_STATUS_LABELS[status] || status;
};

// হেল্পার ফাংশন: স্ট্যাটাসের কালার পান
export const getFlashSaleScheduleStatusColor = (status: FlashSaleScheduleStatus): string => {
  return FLASH_SALE_SCHEDULE_STATUS_COLORS[status] || '#6B7280';
};

// হেল্পার ফাংশন: স্ট্যাটাসের আইকন পান
export const getFlashSaleScheduleStatusIcon = (status: FlashSaleScheduleStatus): string => {
  return FLASH_SALE_SCHEDULE_STATUS_ICONS[status] || 'Circle';
};

// হেল্পার ফাংশন: স্ট্যাটাস ট্রানজিশন সম্ভব কিনা চেক করুন
export const canTransitionToFlashSaleScheduleStatus = (
  from: FlashSaleScheduleStatus,
  to: FlashSaleScheduleStatus
): boolean => {
  return FLASH_SALE_SCHEDULE_STATUS_TRANSITIONS[from]?.includes(to) || false;
};
