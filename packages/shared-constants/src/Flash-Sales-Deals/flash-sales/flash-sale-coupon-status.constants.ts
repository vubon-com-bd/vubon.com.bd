/**
 * Flash Sale Coupon Status Constants
 * কুপনের স্ট্যাটাসসমূহ
 */

// কুপন স্ট্যাটাস এনাম
export const COUPON_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  USED: 'used',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  ARCHIVED: 'archived',
  DELETED: 'deleted',
  DRAFT: 'draft',
  PUBLISHED: 'published',
  SCHEDULED: 'scheduled',
  ON_HOLD: 'on_hold',
  SUSPENDED: 'suspended',
  FULLY_USED: 'fully_used',
  PARTIALLY_USED: 'partially_used',
  UNUSED: 'unused',
} as const;

// কুপন স্ট্যাটাস টাইপ
export type CouponStatus = (typeof COUPON_STATUS)[keyof typeof COUPON_STATUS];

// স্ট্যাটাসের লেবেল
export const COUPON_STATUS_LABELS: Record<CouponStatus, string> = {
  active: 'সক্রিয়',
  inactive: 'নিষ্ক্রিয়',
  used: 'ব্যবহৃত',
  expired: 'মেয়াদোত্তীর্ণ',
  cancelled: 'বাতিলকৃত',
  pending: 'অপেক্ষমান',
  approved: 'অনুমোদিত',
  rejected: 'প্রত্যাখ্যাত',
  archived: 'আর্কাইভড',
  deleted: 'মুছে ফেলা',
  draft: 'খসড়া',
  published: 'প্রকাশিত',
  scheduled: 'নির্ধারিত',
  on_hold: 'হোল্ডে',
  suspended: 'স্থগিত',
  fully_used: 'সম্পূর্ণ ব্যবহৃত',
  partially_used: 'আংশিক ব্যবহৃত',
  unused: 'অব্যবহৃত',
};

// স্ট্যাটাসের বিবরণ
export const COUPON_STATUS_DESCRIPTIONS: Record<CouponStatus, string> = {
  active: 'কুপনটি বর্তমানে সক্রিয় এবং ব্যবহারযোগ্য',
  inactive: 'কুপনটি নিষ্ক্রিয় করা হয়েছে',
  used: 'কুপনটি ব্যবহার করা হয়েছে',
  expired: 'কুপনটির মেয়াদ শেষ হয়েছে',
  cancelled: 'কুপনটি বাতিল করা হয়েছে',
  pending: 'কুপনটি অনুমোদনের অপেক্ষায়',
  approved: 'কুপনটি অনুমোদিত হয়েছে',
  rejected: 'কুপনটি প্রত্যাখ্যাত হয়েছে',
  archived: 'কুপনটি আর্কাইভ করা হয়েছে',
  deleted: 'কুপনটি মুছে ফেলা হয়েছে',
  draft: 'কুপনটি খসড়া অবস্থায় আছে',
  published: 'কুপনটি প্রকাশিত হয়েছে',
  scheduled: 'কুপনটি নির্ধারিত সময়ে সক্রিয় হবে',
  on_hold: 'কুপনটি সাময়িকভাবে হোল্ডে রয়েছে',
  suspended: 'কুপনটি স্থগিত করা হয়েছে',
  fully_used: 'কুপনটি সম্পূর্ণরূপে ব্যবহার করা হয়েছে',
  partially_used: 'কুপনটি আংশিকভাবে ব্যবহার করা হয়েছে',
  unused: 'কুপনটি এখনও ব্যবহার করা হয়নি',
};

// স্ট্যাটাসের কালার কোড
export const COUPON_STATUS_COLORS: Record<CouponStatus, string> = {
  active: '#22C55E',
  inactive: '#9CA3AF',
  used: '#3B82F6',
  expired: '#F97316',
  cancelled: '#6B7280',
  pending: '#FCD34D',
  approved: '#34D399',
  rejected: '#F87171',
  archived: '#9CA3AF',
  deleted: '#DC2626',
  draft: '#9CA3AF',
  published: '#3B82F6',
  scheduled: '#8B5CF6',
  on_hold: '#F59E0B',
  suspended: '#F59E0B',
  fully_used: '#6B7280',
  partially_used: '#F59E0B',
  unused: '#22C55E',
};

// স্ট্যাটাসের আইকন (আইকন নাম)
export const COUPON_STATUS_ICONS: Record<CouponStatus, string> = {
  active: 'CheckCircle',
  inactive: 'XCircle',
  used: 'Check',
  expired: 'AlertCircle',
  cancelled: 'X',
  pending: 'Clock',
  approved: 'Check',
  rejected: 'X',
  archived: 'Archive',
  deleted: 'Trash2',
  draft: 'FileText',
  published: 'Globe',
  scheduled: 'CalendarClock',
  on_hold: 'Pause',
  suspended: 'Minus',
  fully_used: 'CheckCheck',
  partially_used: 'Minus',
  unused: 'Circle',
};

// স্ট্যাটাসের ডিসপ্লে অর্ডার
export const COUPON_STATUS_DISPLAY_ORDER: Record<CouponStatus, number> = {
  draft: 1,
  pending: 2,
  approved: 3,
  published: 4,
  scheduled: 5,
  active: 6,
  unused: 7,
  partially_used: 8,
  used: 9,
  fully_used: 10,
  on_hold: 11,
  suspended: 12,
  inactive: 13,
  expired: 14,
  cancelled: 15,
  rejected: 16,
  archived: 17,
  deleted: 18,
};

// স্ট্যাটাস গ্রুপ
export const COUPON_STATUS_GROUPS = {
  ACTIVE_STATUSES: ['active', 'approved', 'published', 'unused'] as CouponStatus[],
  INACTIVE_STATUSES: ['inactive', 'archived', 'deleted', 'cancelled', 'expired'] as CouponStatus[],
  PENDING_STATUSES: ['draft', 'pending', 'scheduled'] as CouponStatus[],
  USED_STATUSES: ['used', 'fully_used', 'partially_used'] as CouponStatus[],
  ISSUE_STATUSES: ['rejected', 'on_hold', 'suspended'] as CouponStatus[],
} as const;

// স্ট্যাটাস ট্রানজিশন
export const COUPON_STATUS_TRANSITIONS: Record<CouponStatus, CouponStatus[]> = {
  draft: ['published', 'pending', 'scheduled', 'archived', 'deleted'],
  pending: ['approved', 'rejected', 'cancelled', 'archived', 'deleted'],
  approved: ['published', 'active', 'scheduled', 'archived', 'deleted'],
  published: ['active', 'scheduled', 'on_hold', 'archived', 'deleted'],
  scheduled: ['active', 'published', 'on_hold', 'archived', 'deleted'],
  active: ['used', 'partially_used', 'inactive', 'expired', 'suspended', 'cancelled'],
  unused: ['active', 'partially_used', 'used', 'inactive', 'expired', 'cancelled'],
  partially_used: ['used', 'fully_used', 'inactive', 'expired', 'cancelled'],
  used: ['fully_used', 'inactive', 'expired', 'archived'],
  fully_used: ['inactive', 'expired', 'archived', 'deleted'],
  on_hold: ['active', 'suspended', 'cancelled', 'archived'],
  suspended: ['active', 'on_hold', 'cancelled', 'archived'],
  inactive: ['active', 'archived', 'deleted'],
  expired: ['archived', 'deleted'],
  cancelled: ['archived', 'deleted'],
  rejected: ['draft', 'cancelled', 'archived', 'deleted'],
  archived: ['deleted'],
  deleted: [],
};

// স্ট্যাটাস কনফিগারেশন ইন্টারফেস
export interface CouponStatusConfig {
  status: CouponStatus;
  label: string;
  description: string;
  color: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
  canTransitionTo: CouponStatus[];
}

// সম্পূর্ণ স্ট্যাটাস কনফিগারেশন
export const COUPON_STATUS_CONFIGS: Record<CouponStatus, CouponStatusConfig> = {
  active: {
    status: 'active',
    label: COUPON_STATUS_LABELS.active,
    description: COUPON_STATUS_DESCRIPTIONS.active,
    color: COUPON_STATUS_COLORS.active,
    icon: COUPON_STATUS_ICONS.active,
    displayOrder: COUPON_STATUS_DISPLAY_ORDER.active,
    isActive: true,
    canTransitionTo: COUPON_STATUS_TRANSITIONS.active,
  },
  inactive: {
    status: 'inactive',
    label: COUPON_STATUS_LABELS.inactive,
    description: COUPON_STATUS_DESCRIPTIONS.inactive,
    color: COUPON_STATUS_COLORS.inactive,
    icon: COUPON_STATUS_ICONS.inactive,
    displayOrder: COUPON_STATUS_DISPLAY_ORDER.inactive,
    isActive: false,
    canTransitionTo: COUPON_STATUS_TRANSITIONS.inactive,
  },
  used: {
    status: 'used',
    label: COUPON_STATUS_LABELS.used,
    description: COUPON_STATUS_DESCRIPTIONS.used,
    color: COUPON_STATUS_COLORS.used,
    icon: COUPON_STATUS_ICONS.used,
    displayOrder: COUPON_STATUS_DISPLAY_ORDER.used,
    isActive: false,
    canTransitionTo: COUPON_STATUS_TRANSITIONS.used,
  },
  expired: {
    status: 'expired',
    label: COUPON_STATUS_LABELS.expired,
    description: COUPON_STATUS_DESCRIPTIONS.expired,
    color: COUPON_STATUS_COLORS.expired,
    icon: COUPON_STATUS_ICONS.expired,
    displayOrder: COUPON_STATUS_DISPLAY_ORDER.expired,
    isActive: false,
    canTransitionTo: COUPON_STATUS_TRANSITIONS.expired,
  },
  cancelled: {
    status: 'cancelled',
    label: COUPON_STATUS_LABELS.cancelled,
    description: COUPON_STATUS_DESCRIPTIONS.cancelled,
    color: COUPON_STATUS_COLORS.cancelled,
    icon: COUPON_STATUS_ICONS.cancelled,
    displayOrder: COUPON_STATUS_DISPLAY_ORDER.cancelled,
    isActive: false,
    canTransitionTo: COUPON_STATUS_TRANSITIONS.cancelled,
  },
  pending: {
    status: 'pending',
    label: COUPON_STATUS_LABELS.pending,
    description: COUPON_STATUS_DESCRIPTIONS.pending,
    color: COUPON_STATUS_COLORS.pending,
    icon: COUPON_STATUS_ICONS.pending,
    displayOrder: COUPON_STATUS_DISPLAY_ORDER.pending,
    isActive: false,
    canTransitionTo: COUPON_STATUS_TRANSITIONS.pending,
  },
  approved: {
    status: 'approved',
    label: COUPON_STATUS_LABELS.approved,
    description: COUPON_STATUS_DESCRIPTIONS.approved,
    color: COUPON_STATUS_COLORS.approved,
    icon: COUPON_STATUS_ICONS.approved,
    displayOrder: COUPON_STATUS_DISPLAY_ORDER.approved,
    isActive: true,
    canTransitionTo: COUPON_STATUS_TRANSITIONS.approved,
  },
  rejected: {
    status: 'rejected',
    label: COUPON_STATUS_LABELS.rejected,
    description: COUPON_STATUS_DESCRIPTIONS.rejected,
    color: COUPON_STATUS_COLORS.rejected,
    icon: COUPON_STATUS_ICONS.rejected,
    displayOrder: COUPON_STATUS_DISPLAY_ORDER.rejected,
    isActive: false,
    canTransitionTo: COUPON_STATUS_TRANSITIONS.rejected,
  },
  archived: {
    status: 'archived',
    label: COUPON_STATUS_LABELS.archived,
    description: COUPON_STATUS_DESCRIPTIONS.archived,
    color: COUPON_STATUS_COLORS.archived,
    icon: COUPON_STATUS_ICONS.archived,
    displayOrder: COUPON_STATUS_DISPLAY_ORDER.archived,
    isActive: false,
    canTransitionTo: COUPON_STATUS_TRANSITIONS.archived,
  },
  deleted: {
    status: 'deleted',
    label: COUPON_STATUS_LABELS.deleted,
    description: COUPON_STATUS_DESCRIPTIONS.deleted,
    color: COUPON_STATUS_COLORS.deleted,
    icon: COUPON_STATUS_ICONS.deleted,
    displayOrder: COUPON_STATUS_DISPLAY_ORDER.deleted,
    isActive: false,
    canTransitionTo: COUPON_STATUS_TRANSITIONS.deleted,
  },
  draft: {
    status: 'draft',
    label: COUPON_STATUS_LABELS.draft,
    description: COUPON_STATUS_DESCRIPTIONS.draft,
    color: COUPON_STATUS_COLORS.draft,
    icon: COUPON_STATUS_ICONS.draft,
    displayOrder: COUPON_STATUS_DISPLAY_ORDER.draft,
    isActive: false,
    canTransitionTo: COUPON_STATUS_TRANSITIONS.draft,
  },
  published: {
    status: 'published',
    label: COUPON_STATUS_LABELS.published,
    description: COUPON_STATUS_DESCRIPTIONS.published,
    color: COUPON_STATUS_COLORS.published,
    icon: COUPON_STATUS_ICONS.published,
    displayOrder: COUPON_STATUS_DISPLAY_ORDER.published,
    isActive: true,
    canTransitionTo: COUPON_STATUS_TRANSITIONS.published,
  },
  scheduled: {
    status: 'scheduled',
    label: COUPON_STATUS_LABELS.scheduled,
    description: COUPON_STATUS_DESCRIPTIONS.scheduled,
    color: COUPON_STATUS_COLORS.scheduled,
    icon: COUPON_STATUS_ICONS.scheduled,
    displayOrder: COUPON_STATUS_DISPLAY_ORDER.scheduled,
    isActive: false,
    canTransitionTo: COUPON_STATUS_TRANSITIONS.scheduled,
  },
  on_hold: {
    status: 'on_hold',
    label: COUPON_STATUS_LABELS.on_hold,
    description: COUPON_STATUS_DESCRIPTIONS.on_hold,
    color: COUPON_STATUS_COLORS.on_hold,
    icon: COUPON_STATUS_ICONS.on_hold,
    displayOrder: COUPON_STATUS_DISPLAY_ORDER.on_hold,
    isActive: false,
    canTransitionTo: COUPON_STATUS_TRANSITIONS.on_hold,
  },
  suspended: {
    status: 'suspended',
    label: COUPON_STATUS_LABELS.suspended,
    description: COUPON_STATUS_DESCRIPTIONS.suspended,
    color: COUPON_STATUS_COLORS.suspended,
    icon: COUPON_STATUS_ICONS.suspended,
    displayOrder: COUPON_STATUS_DISPLAY_ORDER.suspended,
    isActive: false,
    canTransitionTo: COUPON_STATUS_TRANSITIONS.suspended,
  },
  fully_used: {
    status: 'fully_used',
    label: COUPON_STATUS_LABELS.fully_used,
    description: COUPON_STATUS_DESCRIPTIONS.fully_used,
    color: COUPON_STATUS_COLORS.fully_used,
    icon: COUPON_STATUS_ICONS.fully_used,
    displayOrder: COUPON_STATUS_DISPLAY_ORDER.fully_used,
    isActive: false,
    canTransitionTo: COUPON_STATUS_TRANSITIONS.fully_used,
  },
  partially_used: {
    status: 'partially_used',
    label: COUPON_STATUS_LABELS.partially_used,
    description: COUPON_STATUS_DESCRIPTIONS.partially_used,
    color: COUPON_STATUS_COLORS.partially_used,
    icon: COUPON_STATUS_ICONS.partially_used,
    displayOrder: COUPON_STATUS_DISPLAY_ORDER.partially_used,
    isActive: false,
    canTransitionTo: COUPON_STATUS_TRANSITIONS.partially_used,
  },
  unused: {
    status: 'unused',
    label: COUPON_STATUS_LABELS.unused,
    description: COUPON_STATUS_DESCRIPTIONS.unused,
    color: COUPON_STATUS_COLORS.unused,
    icon: COUPON_STATUS_ICONS.unused,
    displayOrder: COUPON_STATUS_DISPLAY_ORDER.unused,
    isActive: true,
    canTransitionTo: COUPON_STATUS_TRANSITIONS.unused,
  },
};

// হেল্পার ফাংশন: স্ট্যাটাস ভ্যালিড কিনা চেক করুন
export const isValidCouponStatus = (status: string): status is CouponStatus => {
  return Object.values(COUPON_STATUS).includes(status as CouponStatus);
};

// হেল্পার ফাংশন: সক্রিয় স্ট্যাটাস গুলো পান
export const getActiveCouponStatuses = (): CouponStatus[] => {
  return Object.values(COUPON_STATUS_CONFIGS)
    .filter((config) => config.isActive)
    .map((config) => config.status);
};

// হেল্পার ফাংশন: ডিসপ্লে অর্ডার অনুযায়ী সাজান
export const getCouponStatusesByOrder = (): CouponStatus[] => {
  return Object.values(COUPON_STATUS_CONFIGS)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((config) => config.status);
};

// হেল্পার ফাংশন: স্ট্যাটাস গ্রুপ অনুযায়ী ফিল্টার
export const getCouponStatusesByGroup = (
  group: keyof typeof COUPON_STATUS_GROUPS
): CouponStatus[] => {
  return COUPON_STATUS_GROUPS[group] || [];
};

// হেল্পার ফাংশন: স্ট্যাটাসের লেবেল পান
export const getCouponStatusLabel = (status: CouponStatus): string => {
  return COUPON_STATUS_LABELS[status] || status;
};

// হেল্পার ফাংশন: স্ট্যাটাসের বিবরণ পান
export const getCouponStatusDescription = (status: CouponStatus): string => {
  return COUPON_STATUS_DESCRIPTIONS[status] || '';
};

// হেল্পার ফাংশন: স্ট্যাটাসের কালার পান
export const getCouponStatusColor = (status: CouponStatus): string => {
  return COUPON_STATUS_COLORS[status] || '#6B7280';
};

// হেল্পার ফাংশন: স্ট্যাটাসের আইকন পান
export const getCouponStatusIcon = (status: CouponStatus): string => {
  return COUPON_STATUS_ICONS[status] || 'Circle';
};

// হেল্পার ফাংশন: স্ট্যাটাস ট্রানজিশন সম্ভব কিনা চেক করুন
export const canTransitionToCouponStatus = (from: CouponStatus, to: CouponStatus): boolean => {
  return COUPON_STATUS_TRANSITIONS[from]?.includes(to) || false;
};

// হেল্পার ফাংশন: স্ট্যাটাস টার্মিনাল কিনা চেক করুন
export const isTerminalCouponStatus = (status: CouponStatus): boolean => {
  const terminalStatuses: CouponStatus[] = [
    'fully_used',
    'expired',
    'cancelled',
    'rejected',
    'deleted',
    'archived',
  ];
  return terminalStatuses.includes(status);
};

// হেল্পার ফাংশন: স্ট্যাটাস ইউজেবল কিনা চেক করুন
export const isUsableCouponStatus = (status: CouponStatus): boolean => {
  const usableStatuses: CouponStatus[] = ['active', 'unused', 'partially_used'];
  return usableStatuses.includes(status);
};
