/**
 * Flash Sale Price Status Constants
 * প্রাইসের স্ট্যাটাসসমূহ
 */

// প্রাইস স্ট্যাটাস এনাম
export const PRICE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
  ARCHIVED: 'archived',
  DRAFT: 'draft',
  PUBLISHED: 'published',
  SCHEDULED: 'scheduled',
  ON_HOLD: 'on_hold',
  UNDER_REVIEW: 'under_review',
  FAILED: 'failed',
  SUCCESSFUL: 'successful',
  UPDATED: 'updated',
  ROLLED_BACK: 'rolled_back',
} as const;

// প্রাইস স্ট্যাটাস টাইপ
export type PriceStatus = (typeof PRICE_STATUS)[keyof typeof PRICE_STATUS];

// স্ট্যাটাসের লেবেল
export const PRICE_STATUS_LABELS: Record<PriceStatus, string> = {
  active: 'সক্রিয়',
  inactive: 'নিষ্ক্রিয়',
  pending: 'অপেক্ষমান',
  approved: 'অনুমোদিত',
  rejected: 'প্রত্যাখ্যাত',
  expired: 'মেয়াদোত্তীর্ণ',
  cancelled: 'বাতিলকৃত',
  archived: 'আর্কাইভড',
  draft: 'খসড়া',
  published: 'প্রকাশিত',
  scheduled: 'নির্ধারিত',
  on_hold: 'হোল্ডে',
  under_review: 'পর্যালোচনাধীন',
  failed: 'ব্যর্থ',
  successful: 'সফল',
  updated: 'আপডেটকৃত',
  rolled_back: 'রোলব্যাককৃত',
};

// স্ট্যাটাসের বিবরণ
export const PRICE_STATUS_DESCRIPTIONS: Record<PriceStatus, string> = {
  active: 'প্রাইসটি বর্তমানে সক্রিয় এবং ব্যবহারযোগ্য',
  inactive: 'প্রাইসটি নিষ্ক্রিয় করা হয়েছে',
  pending: 'প্রাইসটি অনুমোদনের অপেক্ষায়',
  approved: 'প্রাইসটি অনুমোদিত হয়েছে',
  rejected: 'প্রাইসটি প্রত্যাখ্যাত হয়েছে',
  expired: 'প্রাইসটির মেয়াদ শেষ হয়েছে',
  cancelled: 'প্রাইসটি বাতিল করা হয়েছে',
  archived: 'প্রাইসটি আর্কাইভ করা হয়েছে',
  draft: 'প্রাইসটি খসড়া অবস্থায় আছে',
  published: 'প্রাইসটি প্রকাশিত হয়েছে',
  scheduled: 'প্রাইসটি নির্ধারিত সময়ে কার্যকর হবে',
  on_hold: 'প্রাইসটি সাময়িকভাবে হোল্ডে রয়েছে',
  under_review: 'প্রাইসটি পর্যালোচনা চলছে',
  failed: 'প্রাইসটি প্রয়োগ করতে ব্যর্থ হয়েছে',
  successful: 'প্রাইসটি সফলভাবে প্রয়োগ হয়েছে',
  updated: 'প্রাইসটি আপডেট করা হয়েছে',
  rolled_back: 'প্রাইসটি পূর্ববর্তী অবস্থায় ফিরিয়ে আনা হয়েছে',
};

// স্ট্যাটাসের কালার কোড
export const PRICE_STATUS_COLORS: Record<PriceStatus, string> = {
  active: '#22C55E',
  inactive: '#9CA3AF',
  pending: '#FCD34D',
  approved: '#34D399',
  rejected: '#F87171',
  expired: '#F97316',
  cancelled: '#6B7280',
  archived: '#9CA3AF',
  draft: '#9CA3AF',
  published: '#3B82F6',
  scheduled: '#8B5CF6',
  on_hold: '#F59E0B',
  under_review: '#06B6D4',
  failed: '#EF4444',
  successful: '#10B981',
  updated: '#3B82F6',
  rolled_back: '#F97316',
};

// স্ট্যাটাসের আইকন (আইকন নাম)
export const PRICE_STATUS_ICONS: Record<PriceStatus, string> = {
  active: 'CheckCircle',
  inactive: 'XCircle',
  pending: 'Clock',
  approved: 'Check',
  rejected: 'X',
  expired: 'AlertCircle',
  cancelled: 'X',
  archived: 'Archive',
  draft: 'FileText',
  published: 'Globe',
  scheduled: 'CalendarClock',
  on_hold: 'Pause',
  under_review: 'Eye',
  failed: 'AlertTriangle',
  successful: 'CheckCheck',
  updated: 'RefreshCw',
  rolled_back: 'Undo',
};

// স্ট্যাটাসের ডিসপ্লে অর্ডার
export const PRICE_STATUS_DISPLAY_ORDER: Record<PriceStatus, number> = {
  draft: 1,
  pending: 2,
  under_review: 3,
  approved: 4,
  scheduled: 5,
  published: 6,
  active: 7,
  updated: 8,
  successful: 9,
  on_hold: 10,
  inactive: 11,
  expired: 12,
  cancelled: 13,
  rejected: 14,
  failed: 15,
  rolled_back: 16,
  archived: 17,
};

// স্ট্যাটাস গ্রুপ
export const PRICE_STATUS_GROUPS = {
  ACTIVE_STATUSES: ['active', 'published', 'approved', 'successful'] as PriceStatus[],
  INACTIVE_STATUSES: ['inactive', 'archived', 'cancelled', 'expired'] as PriceStatus[],
  PENDING_STATUSES: ['draft', 'pending', 'under_review', 'scheduled'] as PriceStatus[],
  ISSUE_STATUSES: ['failed', 'rejected', 'on_hold', 'rolled_back'] as PriceStatus[],
  UPDATED_STATUSES: ['updated'] as PriceStatus[],
} as const;

// স্ট্যাটাস ট্রানজিশন
export const PRICE_STATUS_TRANSITIONS: Record<PriceStatus, PriceStatus[]> = {
  draft: ['pending', 'published', 'scheduled', 'archived', 'cancelled'],
  pending: ['approved', 'rejected', 'under_review', 'cancelled'],
  under_review: ['approved', 'rejected', 'cancelled'],
  approved: ['published', 'active', 'scheduled', 'cancelled'],
  scheduled: ['active', 'published', 'cancelled', 'on_hold'],
  published: ['active', 'scheduled', 'on_hold', 'archived', 'cancelled'],
  active: ['updated', 'inactive', 'expired', 'cancelled', 'on_hold'],
  updated: ['active', 'rolled_back', 'cancelled'],
  successful: ['archived', 'inactive'],
  on_hold: ['active', 'cancelled', 'archived'],
  inactive: ['active', 'archived', 'cancelled'],
  expired: ['archived', 'inactive'],
  cancelled: ['archived', 'inactive'],
  rejected: ['draft', 'cancelled', 'archived'],
  failed: ['draft', 'pending', 'cancelled', 'archived'],
  rolled_back: ['draft', 'pending', 'active'],
  archived: [],
};

// স্ট্যাটাস কনফিগারেশন ইন্টারফেস
export interface PriceStatusConfig {
  status: PriceStatus;
  label: string;
  description: string;
  color: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
  canTransitionTo: PriceStatus[];
}

// সম্পূর্ণ স্ট্যাটাস কনফিগারেশন
export const PRICE_STATUS_CONFIGS: Record<PriceStatus, PriceStatusConfig> = {
  active: {
    status: 'active',
    label: PRICE_STATUS_LABELS.active,
    description: PRICE_STATUS_DESCRIPTIONS.active,
    color: PRICE_STATUS_COLORS.active,
    icon: PRICE_STATUS_ICONS.active,
    displayOrder: PRICE_STATUS_DISPLAY_ORDER.active,
    isActive: true,
    canTransitionTo: PRICE_STATUS_TRANSITIONS.active,
  },
  inactive: {
    status: 'inactive',
    label: PRICE_STATUS_LABELS.inactive,
    description: PRICE_STATUS_DESCRIPTIONS.inactive,
    color: PRICE_STATUS_COLORS.inactive,
    icon: PRICE_STATUS_ICONS.inactive,
    displayOrder: PRICE_STATUS_DISPLAY_ORDER.inactive,
    isActive: false,
    canTransitionTo: PRICE_STATUS_TRANSITIONS.inactive,
  },
  pending: {
    status: 'pending',
    label: PRICE_STATUS_LABELS.pending,
    description: PRICE_STATUS_DESCRIPTIONS.pending,
    color: PRICE_STATUS_COLORS.pending,
    icon: PRICE_STATUS_ICONS.pending,
    displayOrder: PRICE_STATUS_DISPLAY_ORDER.pending,
    isActive: false,
    canTransitionTo: PRICE_STATUS_TRANSITIONS.pending,
  },
  approved: {
    status: 'approved',
    label: PRICE_STATUS_LABELS.approved,
    description: PRICE_STATUS_DESCRIPTIONS.approved,
    color: PRICE_STATUS_COLORS.approved,
    icon: PRICE_STATUS_ICONS.approved,
    displayOrder: PRICE_STATUS_DISPLAY_ORDER.approved,
    isActive: true,
    canTransitionTo: PRICE_STATUS_TRANSITIONS.approved,
  },
  rejected: {
    status: 'rejected',
    label: PRICE_STATUS_LABELS.rejected,
    description: PRICE_STATUS_DESCRIPTIONS.rejected,
    color: PRICE_STATUS_COLORS.rejected,
    icon: PRICE_STATUS_ICONS.rejected,
    displayOrder: PRICE_STATUS_DISPLAY_ORDER.rejected,
    isActive: false,
    canTransitionTo: PRICE_STATUS_TRANSITIONS.rejected,
  },
  expired: {
    status: 'expired',
    label: PRICE_STATUS_LABELS.expired,
    description: PRICE_STATUS_DESCRIPTIONS.expired,
    color: PRICE_STATUS_COLORS.expired,
    icon: PRICE_STATUS_ICONS.expired,
    displayOrder: PRICE_STATUS_DISPLAY_ORDER.expired,
    isActive: false,
    canTransitionTo: PRICE_STATUS_TRANSITIONS.expired,
  },
  cancelled: {
    status: 'cancelled',
    label: PRICE_STATUS_LABELS.cancelled,
    description: PRICE_STATUS_DESCRIPTIONS.cancelled,
    color: PRICE_STATUS_COLORS.cancelled,
    icon: PRICE_STATUS_ICONS.cancelled,
    displayOrder: PRICE_STATUS_DISPLAY_ORDER.cancelled,
    isActive: false,
    canTransitionTo: PRICE_STATUS_TRANSITIONS.cancelled,
  },
  archived: {
    status: 'archived',
    label: PRICE_STATUS_LABELS.archived,
    description: PRICE_STATUS_DESCRIPTIONS.archived,
    color: PRICE_STATUS_COLORS.archived,
    icon: PRICE_STATUS_ICONS.archived,
    displayOrder: PRICE_STATUS_DISPLAY_ORDER.archived,
    isActive: false,
    canTransitionTo: PRICE_STATUS_TRANSITIONS.archived,
  },
  draft: {
    status: 'draft',
    label: PRICE_STATUS_LABELS.draft,
    description: PRICE_STATUS_DESCRIPTIONS.draft,
    color: PRICE_STATUS_COLORS.draft,
    icon: PRICE_STATUS_ICONS.draft,
    displayOrder: PRICE_STATUS_DISPLAY_ORDER.draft,
    isActive: false,
    canTransitionTo: PRICE_STATUS_TRANSITIONS.draft,
  },
  published: {
    status: 'published',
    label: PRICE_STATUS_LABELS.published,
    description: PRICE_STATUS_DESCRIPTIONS.published,
    color: PRICE_STATUS_COLORS.published,
    icon: PRICE_STATUS_ICONS.published,
    displayOrder: PRICE_STATUS_DISPLAY_ORDER.published,
    isActive: true,
    canTransitionTo: PRICE_STATUS_TRANSITIONS.published,
  },
  scheduled: {
    status: 'scheduled',
    label: PRICE_STATUS_LABELS.scheduled,
    description: PRICE_STATUS_DESCRIPTIONS.scheduled,
    color: PRICE_STATUS_COLORS.scheduled,
    icon: PRICE_STATUS_ICONS.scheduled,
    displayOrder: PRICE_STATUS_DISPLAY_ORDER.scheduled,
    isActive: false,
    canTransitionTo: PRICE_STATUS_TRANSITIONS.scheduled,
  },
  on_hold: {
    status: 'on_hold',
    label: PRICE_STATUS_LABELS.on_hold,
    description: PRICE_STATUS_DESCRIPTIONS.on_hold,
    color: PRICE_STATUS_COLORS.on_hold,
    icon: PRICE_STATUS_ICONS.on_hold,
    displayOrder: PRICE_STATUS_DISPLAY_ORDER.on_hold,
    isActive: false,
    canTransitionTo: PRICE_STATUS_TRANSITIONS.on_hold,
  },
  under_review: {
    status: 'under_review',
    label: PRICE_STATUS_LABELS.under_review,
    description: PRICE_STATUS_DESCRIPTIONS.under_review,
    color: PRICE_STATUS_COLORS.under_review,
    icon: PRICE_STATUS_ICONS.under_review,
    displayOrder: PRICE_STATUS_DISPLAY_ORDER.under_review,
    isActive: false,
    canTransitionTo: PRICE_STATUS_TRANSITIONS.under_review,
  },
  failed: {
    status: 'failed',
    label: PRICE_STATUS_LABELS.failed,
    description: PRICE_STATUS_DESCRIPTIONS.failed,
    color: PRICE_STATUS_COLORS.failed,
    icon: PRICE_STATUS_ICONS.failed,
    displayOrder: PRICE_STATUS_DISPLAY_ORDER.failed,
    isActive: false,
    canTransitionTo: PRICE_STATUS_TRANSITIONS.failed,
  },
  successful: {
    status: 'successful',
    label: PRICE_STATUS_LABELS.successful,
    description: PRICE_STATUS_DESCRIPTIONS.successful,
    color: PRICE_STATUS_COLORS.successful,
    icon: PRICE_STATUS_ICONS.successful,
    displayOrder: PRICE_STATUS_DISPLAY_ORDER.successful,
    isActive: false,
    canTransitionTo: PRICE_STATUS_TRANSITIONS.successful,
  },
  updated: {
    status: 'updated',
    label: PRICE_STATUS_LABELS.updated,
    description: PRICE_STATUS_DESCRIPTIONS.updated,
    color: PRICE_STATUS_COLORS.updated,
    icon: PRICE_STATUS_ICONS.updated,
    displayOrder: PRICE_STATUS_DISPLAY_ORDER.updated,
    isActive: false,
    canTransitionTo: PRICE_STATUS_TRANSITIONS.updated,
  },
  rolled_back: {
    status: 'rolled_back',
    label: PRICE_STATUS_LABELS.rolled_back,
    description: PRICE_STATUS_DESCRIPTIONS.rolled_back,
    color: PRICE_STATUS_COLORS.rolled_back,
    icon: PRICE_STATUS_ICONS.rolled_back,
    displayOrder: PRICE_STATUS_DISPLAY_ORDER.rolled_back,
    isActive: false,
    canTransitionTo: PRICE_STATUS_TRANSITIONS.rolled_back,
  },
};

// হেল্পার ফাংশন: স্ট্যাটাস ভ্যালিড কিনা চেক করুন
export const isValidPriceStatus = (status: string): status is PriceStatus => {
  return Object.values(PRICE_STATUS).includes(status as PriceStatus);
};

// হেল্পার ফাংশন: সক্রিয় স্ট্যাটাস গুলো পান
export const getActivePriceStatuses = (): PriceStatus[] => {
  return Object.values(PRICE_STATUS_CONFIGS)
    .filter((config) => config.isActive)
    .map((config) => config.status);
};

// হেল্পার ফাংশন: ডিসপ্লে অর্ডার অনুযায়ী সাজান
export const getPriceStatusesByOrder = (): PriceStatus[] => {
  return Object.values(PRICE_STATUS_CONFIGS)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((config) => config.status);
};

// হেল্পার ফাংশন: স্ট্যাটাস গ্রুপ অনুযায়ী ফিল্টার
export const getPriceStatusesByGroup = (group: keyof typeof PRICE_STATUS_GROUPS): PriceStatus[] => {
  return PRICE_STATUS_GROUPS[group] || [];
};

// হেল্পার ফাংশন: স্ট্যাটাসের লেবেল পান
export const getPriceStatusLabel = (status: PriceStatus): string => {
  return PRICE_STATUS_LABELS[status] || status;
};

// হেল্পার ফাংশন: স্ট্যাটাসের বিবরণ পান
export const getPriceStatusDescription = (status: PriceStatus): string => {
  return PRICE_STATUS_DESCRIPTIONS[status] || '';
};

// হেল্পার ফাংশন: স্ট্যাটাসের কালার পান
export const getPriceStatusColor = (status: PriceStatus): string => {
  return PRICE_STATUS_COLORS[status] || '#6B7280';
};

// হেল্পার ফাংশন: স্ট্যাটাসের আইকন পান
export const getPriceStatusIcon = (status: PriceStatus): string => {
  return PRICE_STATUS_ICONS[status] || 'Circle';
};

// হেল্পার ফাংশন: স্ট্যাটাস ট্রানজিশন সম্ভব কিনা চেক করুন
export const canTransitionToPriceStatus = (from: PriceStatus, to: PriceStatus): boolean => {
  return PRICE_STATUS_TRANSITIONS[from]?.includes(to) || false;
};

// হেল্পার ফাংশন: স্ট্যাটাস টার্মিনাল কিনা চেক করুন
export const isTerminalPriceStatus = (status: PriceStatus): boolean => {
  const terminalStatuses: PriceStatus[] = [
    'active',
    'inactive',
    'archived',
    'cancelled',
    'expired',
    'rejected',
    'failed',
  ];
  return terminalStatuses.includes(status);
};
