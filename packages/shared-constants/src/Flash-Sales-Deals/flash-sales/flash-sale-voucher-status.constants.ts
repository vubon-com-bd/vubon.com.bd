/**
 * Flash Sale Voucher Status Constants
 * ভাউচারের স্ট্যাটাসসমূহ
 */

// ভাউচার স্ট্যাটাস এনাম
export const VOUCHER_STATUS = {
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
  REDEEMED: 'redeemed',
} as const;

// ভাউচার স্ট্যাটাস টাইপ
export type VoucherStatus = (typeof VOUCHER_STATUS)[keyof typeof VOUCHER_STATUS];

// স্ট্যাটাসের লেবেল
export const VOUCHER_STATUS_LABELS: Record<VoucherStatus, string> = {
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
  redeemed: 'রিডিমকৃত',
};

// স্ট্যাটাসের বিবরণ
export const VOUCHER_STATUS_DESCRIPTIONS: Record<VoucherStatus, string> = {
  active: 'ভাউচারটি বর্তমানে সক্রিয় এবং ব্যবহারযোগ্য',
  inactive: 'ভাউচারটি নিষ্ক্রিয় করা হয়েছে',
  used: 'ভাউচারটি ব্যবহার করা হয়েছে',
  expired: 'ভাউচারটির মেয়াদ শেষ হয়েছে',
  cancelled: 'ভাউচারটি বাতিল করা হয়েছে',
  pending: 'ভাউচারটি অনুমোদনের অপেক্ষায়',
  approved: 'ভাউচারটি অনুমোদিত হয়েছে',
  rejected: 'ভাউচারটি প্রত্যাখ্যাত হয়েছে',
  archived: 'ভাউচারটি আর্কাইভ করা হয়েছে',
  deleted: 'ভাউচারটি মুছে ফেলা হয়েছে',
  draft: 'ভাউচারটি খসড়া অবস্থায় আছে',
  published: 'ভাউচারটি প্রকাশিত হয়েছে',
  scheduled: 'ভাউচারটি নির্ধারিত সময়ে সক্রিয় হবে',
  on_hold: 'ভাউচারটি সাময়িকভাবে হোল্ডে রয়েছে',
  suspended: 'ভাউচারটি স্থগিত করা হয়েছে',
  fully_used: 'ভাউচারটি সম্পূর্ণরূপে ব্যবহার করা হয়েছে',
  partially_used: 'ভাউচারটি আংশিকভাবে ব্যবহার করা হয়েছে',
  unused: 'ভাউচারটি এখনও ব্যবহার করা হয়নি',
  redeemed: 'ভাউচারটি রিডিম করা হয়েছে',
};

// স্ট্যাটাসের কালার কোড
export const VOUCHER_STATUS_COLORS: Record<VoucherStatus, string> = {
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
  redeemed: '#10B981',
};

// স্ট্যাটাসের আইকন (আইকন নাম)
export const VOUCHER_STATUS_ICONS: Record<VoucherStatus, string> = {
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
  redeemed: 'Gift',
};

// স্ট্যাটাসের ডিসপ্লে অর্ডার
export const VOUCHER_STATUS_DISPLAY_ORDER: Record<VoucherStatus, number> = {
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
  redeemed: 11,
  on_hold: 12,
  suspended: 13,
  inactive: 14,
  expired: 15,
  cancelled: 16,
  rejected: 17,
  archived: 18,
  deleted: 19,
};

// স্ট্যাটাস গ্রুপ
export const VOUCHER_STATUS_GROUPS = {
  ACTIVE_STATUSES: ['active', 'approved', 'published', 'unused'] as VoucherStatus[],
  INACTIVE_STATUSES: ['inactive', 'archived', 'deleted', 'cancelled', 'expired'] as VoucherStatus[],
  PENDING_STATUSES: ['draft', 'pending', 'scheduled'] as VoucherStatus[],
  USED_STATUSES: ['used', 'fully_used', 'partially_used', 'redeemed'] as VoucherStatus[],
  ISSUE_STATUSES: ['rejected', 'on_hold', 'suspended'] as VoucherStatus[],
} as const;

// স্ট্যাটাস ট্রানজিশন
export const VOUCHER_STATUS_TRANSITIONS: Record<VoucherStatus, VoucherStatus[]> = {
  draft: ['published', 'pending', 'scheduled', 'archived', 'deleted'],
  pending: ['approved', 'rejected', 'cancelled', 'archived', 'deleted'],
  approved: ['published', 'active', 'scheduled', 'archived', 'deleted'],
  published: ['active', 'scheduled', 'on_hold', 'archived', 'deleted'],
  scheduled: ['active', 'published', 'on_hold', 'archived', 'deleted'],
  active: ['used', 'partially_used', 'redeemed', 'inactive', 'expired', 'suspended', 'cancelled'],
  unused: ['active', 'partially_used', 'used', 'inactive', 'expired', 'cancelled'],
  partially_used: ['used', 'fully_used', 'redeemed', 'inactive', 'expired', 'cancelled'],
  used: ['fully_used', 'redeemed', 'inactive', 'expired', 'archived'],
  fully_used: ['inactive', 'expired', 'archived', 'deleted'],
  redeemed: ['inactive', 'expired', 'archived', 'deleted'],
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
export interface VoucherStatusConfig {
  status: VoucherStatus;
  label: string;
  description: string;
  color: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
  canTransitionTo: VoucherStatus[];
}

// সম্পূর্ণ স্ট্যাটাস কনফিগারেশন
export const VOUCHER_STATUS_CONFIGS: Record<VoucherStatus, VoucherStatusConfig> = {
  active: {
    status: 'active',
    label: VOUCHER_STATUS_LABELS.active,
    description: VOUCHER_STATUS_DESCRIPTIONS.active,
    color: VOUCHER_STATUS_COLORS.active,
    icon: VOUCHER_STATUS_ICONS.active,
    displayOrder: VOUCHER_STATUS_DISPLAY_ORDER.active,
    isActive: true,
    canTransitionTo: VOUCHER_STATUS_TRANSITIONS.active,
  },
  inactive: {
    status: 'inactive',
    label: VOUCHER_STATUS_LABELS.inactive,
    description: VOUCHER_STATUS_DESCRIPTIONS.inactive,
    color: VOUCHER_STATUS_COLORS.inactive,
    icon: VOUCHER_STATUS_ICONS.inactive,
    displayOrder: VOUCHER_STATUS_DISPLAY_ORDER.inactive,
    isActive: false,
    canTransitionTo: VOUCHER_STATUS_TRANSITIONS.inactive,
  },
  used: {
    status: 'used',
    label: VOUCHER_STATUS_LABELS.used,
    description: VOUCHER_STATUS_DESCRIPTIONS.used,
    color: VOUCHER_STATUS_COLORS.used,
    icon: VOUCHER_STATUS_ICONS.used,
    displayOrder: VOUCHER_STATUS_DISPLAY_ORDER.used,
    isActive: false,
    canTransitionTo: VOUCHER_STATUS_TRANSITIONS.used,
  },
  expired: {
    status: 'expired',
    label: VOUCHER_STATUS_LABELS.expired,
    description: VOUCHER_STATUS_DESCRIPTIONS.expired,
    color: VOUCHER_STATUS_COLORS.expired,
    icon: VOUCHER_STATUS_ICONS.expired,
    displayOrder: VOUCHER_STATUS_DISPLAY_ORDER.expired,
    isActive: false,
    canTransitionTo: VOUCHER_STATUS_TRANSITIONS.expired,
  },
  cancelled: {
    status: 'cancelled',
    label: VOUCHER_STATUS_LABELS.cancelled,
    description: VOUCHER_STATUS_DESCRIPTIONS.cancelled,
    color: VOUCHER_STATUS_COLORS.cancelled,
    icon: VOUCHER_STATUS_ICONS.cancelled,
    displayOrder: VOUCHER_STATUS_DISPLAY_ORDER.cancelled,
    isActive: false,
    canTransitionTo: VOUCHER_STATUS_TRANSITIONS.cancelled,
  },
  pending: {
    status: 'pending',
    label: VOUCHER_STATUS_LABELS.pending,
    description: VOUCHER_STATUS_DESCRIPTIONS.pending,
    color: VOUCHER_STATUS_COLORS.pending,
    icon: VOUCHER_STATUS_ICONS.pending,
    displayOrder: VOUCHER_STATUS_DISPLAY_ORDER.pending,
    isActive: false,
    canTransitionTo: VOUCHER_STATUS_TRANSITIONS.pending,
  },
  approved: {
    status: 'approved',
    label: VOUCHER_STATUS_LABELS.approved,
    description: VOUCHER_STATUS_DESCRIPTIONS.approved,
    color: VOUCHER_STATUS_COLORS.approved,
    icon: VOUCHER_STATUS_ICONS.approved,
    displayOrder: VOUCHER_STATUS_DISPLAY_ORDER.approved,
    isActive: true,
    canTransitionTo: VOUCHER_STATUS_TRANSITIONS.approved,
  },
  rejected: {
    status: 'rejected',
    label: VOUCHER_STATUS_LABELS.rejected,
    description: VOUCHER_STATUS_DESCRIPTIONS.rejected,
    color: VOUCHER_STATUS_COLORS.rejected,
    icon: VOUCHER_STATUS_ICONS.rejected,
    displayOrder: VOUCHER_STATUS_DISPLAY_ORDER.rejected,
    isActive: false,
    canTransitionTo: VOUCHER_STATUS_TRANSITIONS.rejected,
  },
  archived: {
    status: 'archived',
    label: VOUCHER_STATUS_LABELS.archived,
    description: VOUCHER_STATUS_DESCRIPTIONS.archived,
    color: VOUCHER_STATUS_COLORS.archived,
    icon: VOUCHER_STATUS_ICONS.archived,
    displayOrder: VOUCHER_STATUS_DISPLAY_ORDER.archived,
    isActive: false,
    canTransitionTo: VOUCHER_STATUS_TRANSITIONS.archived,
  },
  deleted: {
    status: 'deleted',
    label: VOUCHER_STATUS_LABELS.deleted,
    description: VOUCHER_STATUS_DESCRIPTIONS.deleted,
    color: VOUCHER_STATUS_COLORS.deleted,
    icon: VOUCHER_STATUS_ICONS.deleted,
    displayOrder: VOUCHER_STATUS_DISPLAY_ORDER.deleted,
    isActive: false,
    canTransitionTo: VOUCHER_STATUS_TRANSITIONS.deleted,
  },
  draft: {
    status: 'draft',
    label: VOUCHER_STATUS_LABELS.draft,
    description: VOUCHER_STATUS_DESCRIPTIONS.draft,
    color: VOUCHER_STATUS_COLORS.draft,
    icon: VOUCHER_STATUS_ICONS.draft,
    displayOrder: VOUCHER_STATUS_DISPLAY_ORDER.draft,
    isActive: false,
    canTransitionTo: VOUCHER_STATUS_TRANSITIONS.draft,
  },
  published: {
    status: 'published',
    label: VOUCHER_STATUS_LABELS.published,
    description: VOUCHER_STATUS_DESCRIPTIONS.published,
    color: VOUCHER_STATUS_COLORS.published,
    icon: VOUCHER_STATUS_ICONS.published,
    displayOrder: VOUCHER_STATUS_DISPLAY_ORDER.published,
    isActive: true,
    canTransitionTo: VOUCHER_STATUS_TRANSITIONS.published,
  },
  scheduled: {
    status: 'scheduled',
    label: VOUCHER_STATUS_LABELS.scheduled,
    description: VOUCHER_STATUS_DESCRIPTIONS.scheduled,
    color: VOUCHER_STATUS_COLORS.scheduled,
    icon: VOUCHER_STATUS_ICONS.scheduled,
    displayOrder: VOUCHER_STATUS_DISPLAY_ORDER.scheduled,
    isActive: false,
    canTransitionTo: VOUCHER_STATUS_TRANSITIONS.scheduled,
  },
  on_hold: {
    status: 'on_hold',
    label: VOUCHER_STATUS_LABELS.on_hold,
    description: VOUCHER_STATUS_DESCRIPTIONS.on_hold,
    color: VOUCHER_STATUS_COLORS.on_hold,
    icon: VOUCHER_STATUS_ICONS.on_hold,
    displayOrder: VOUCHER_STATUS_DISPLAY_ORDER.on_hold,
    isActive: false,
    canTransitionTo: VOUCHER_STATUS_TRANSITIONS.on_hold,
  },
  suspended: {
    status: 'suspended',
    label: VOUCHER_STATUS_LABELS.suspended,
    description: VOUCHER_STATUS_DESCRIPTIONS.suspended,
    color: VOUCHER_STATUS_COLORS.suspended,
    icon: VOUCHER_STATUS_ICONS.suspended,
    displayOrder: VOUCHER_STATUS_DISPLAY_ORDER.suspended,
    isActive: false,
    canTransitionTo: VOUCHER_STATUS_TRANSITIONS.suspended,
  },
  fully_used: {
    status: 'fully_used',
    label: VOUCHER_STATUS_LABELS.fully_used,
    description: VOUCHER_STATUS_DESCRIPTIONS.fully_used,
    color: VOUCHER_STATUS_COLORS.fully_used,
    icon: VOUCHER_STATUS_ICONS.fully_used,
    displayOrder: VOUCHER_STATUS_DISPLAY_ORDER.fully_used,
    isActive: false,
    canTransitionTo: VOUCHER_STATUS_TRANSITIONS.fully_used,
  },
  partially_used: {
    status: 'partially_used',
    label: VOUCHER_STATUS_LABELS.partially_used,
    description: VOUCHER_STATUS_DESCRIPTIONS.partially_used,
    color: VOUCHER_STATUS_COLORS.partially_used,
    icon: VOUCHER_STATUS_ICONS.partially_used,
    displayOrder: VOUCHER_STATUS_DISPLAY_ORDER.partially_used,
    isActive: false,
    canTransitionTo: VOUCHER_STATUS_TRANSITIONS.partially_used,
  },
  unused: {
    status: 'unused',
    label: VOUCHER_STATUS_LABELS.unused,
    description: VOUCHER_STATUS_DESCRIPTIONS.unused,
    color: VOUCHER_STATUS_COLORS.unused,
    icon: VOUCHER_STATUS_ICONS.unused,
    displayOrder: VOUCHER_STATUS_DISPLAY_ORDER.unused,
    isActive: true,
    canTransitionTo: VOUCHER_STATUS_TRANSITIONS.unused,
  },
  redeemed: {
    status: 'redeemed',
    label: VOUCHER_STATUS_LABELS.redeemed,
    description: VOUCHER_STATUS_DESCRIPTIONS.redeemed,
    color: VOUCHER_STATUS_COLORS.redeemed,
    icon: VOUCHER_STATUS_ICONS.redeemed,
    displayOrder: VOUCHER_STATUS_DISPLAY_ORDER.redeemed,
    isActive: false,
    canTransitionTo: VOUCHER_STATUS_TRANSITIONS.redeemed,
  },
};

// হেল্পার ফাংশন: স্ট্যাটাস ভ্যালিড কিনা চেক করুন
export const isValidVoucherStatus = (status: string): status is VoucherStatus => {
  return Object.values(VOUCHER_STATUS).includes(status as VoucherStatus);
};

// হেল্পার ফাংশন: সক্রিয় স্ট্যাটাস গুলো পান
export const getActiveVoucherStatuses = (): VoucherStatus[] => {
  return Object.values(VOUCHER_STATUS_CONFIGS)
    .filter((config) => config.isActive)
    .map((config) => config.status);
};

// হেল্পার ফাংশন: ডিসপ্লে অর্ডার অনুযায়ী সাজান
export const getVoucherStatusesByOrder = (): VoucherStatus[] => {
  return Object.values(VOUCHER_STATUS_CONFIGS)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((config) => config.status);
};

// হেল্পার ফাংশন: স্ট্যাটাস গ্রুপ অনুযায়ী ফিল্টার
export const getVoucherStatusesByGroup = (
  group: keyof typeof VOUCHER_STATUS_GROUPS
): VoucherStatus[] => {
  return VOUCHER_STATUS_GROUPS[group] || [];
};

// হেল্পার ফাংশন: স্ট্যাটাসের লেবেল পান
export const getVoucherStatusLabel = (status: VoucherStatus): string => {
  return VOUCHER_STATUS_LABELS[status] || status;
};

// হেল্পার ফাংশন: স্ট্যাটাসের বিবরণ পান
export const getVoucherStatusDescription = (status: VoucherStatus): string => {
  return VOUCHER_STATUS_DESCRIPTIONS[status] || '';
};

// হেল্পার ফাংশন: স্ট্যাটাসের কালার পান
export const getVoucherStatusColor = (status: VoucherStatus): string => {
  return VOUCHER_STATUS_COLORS[status] || '#6B7280';
};

// হেল্পার ফাংশন: স্ট্যাটাসের আইকন পান
export const getVoucherStatusIcon = (status: VoucherStatus): string => {
  return VOUCHER_STATUS_ICONS[status] || 'Circle';
};

// হেল্পার ফাংশন: স্ট্যাটাস ট্রানজিশন সম্ভব কিনা চেক করুন
export const canTransitionToVoucherStatus = (from: VoucherStatus, to: VoucherStatus): boolean => {
  return VOUCHER_STATUS_TRANSITIONS[from]?.includes(to) || false;
};

// হেল্পার ফাংশন: স্ট্যাটাস টার্মিনাল কিনা চেক করুন
export const isTerminalVoucherStatus = (status: VoucherStatus): boolean => {
  const terminalStatuses: VoucherStatus[] = [
    'fully_used',
    'redeemed',
    'expired',
    'cancelled',
    'rejected',
    'deleted',
    'archived',
  ];
  return terminalStatuses.includes(status);
};

// হেল্পার ফাংশন: স্ট্যাটাস ইউজেবল কিনা চেক করুন
export const isUsableVoucherStatus = (status: VoucherStatus): boolean => {
  const usableStatuses: VoucherStatus[] = ['active', 'unused', 'partially_used'];
  return usableStatuses.includes(status);
};
