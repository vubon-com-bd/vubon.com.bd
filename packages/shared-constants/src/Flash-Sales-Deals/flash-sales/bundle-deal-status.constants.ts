/**
 * Bundle Deal Status Constants
 * বান্ডেল ডিলের স্ট্যাটাসসমূহ সংজ্ঞায়িত
 */

// বান্ডেল ডিল স্ট্যাটাস এনাম
export const BUNDLE_DEAL_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
  PAUSED: 'paused',
  SCHEDULED: 'scheduled',
  ENDED: 'ended',
  DRAFT: 'draft',
  PUBLISHED: 'published',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  OUT_OF_STOCK: 'out_of_stock',
  LIMITED_STOCK: 'limited_stock',
  AVAILABLE: 'available',
  UNAVAILABLE: 'unavailable',
} as const;

// বান্ডেল ডিল স্ট্যাটাস টাইপ
export type BundleDealStatus = (typeof BUNDLE_DEAL_STATUS)[keyof typeof BUNDLE_DEAL_STATUS];

// স্ট্যাটাসের লেবেল
export const BUNDLE_DEAL_STATUS_LABELS: Record<BundleDealStatus, string> = {
  active: 'সক্রিয়',
  inactive: 'নিষ্ক্রিয়',
  expired: 'মেয়াদোত্তীর্ণ',
  cancelled: 'বাতিলকৃত',
  paused: 'বিরতিপ্রাপ্ত',
  scheduled: 'নির্ধারিত',
  ended: 'সমাপ্ত',
  draft: 'খসড়া',
  published: 'প্রকাশিত',
  pending: 'অপেক্ষমান',
  approved: 'অনুমোদিত',
  rejected: 'প্রত্যাখ্যাত',
  out_of_stock: 'স্টক শেষ',
  limited_stock: 'সীমিত স্টক',
  available: 'উপলব্ধ',
  unavailable: 'অনুপলব্ধ',
};

// স্ট্যাটাসের বিবরণ
export const BUNDLE_DEAL_STATUS_DESCRIPTIONS: Record<BundleDealStatus, string> = {
  active: 'বান্ডেল ডিলটি বর্তমানে সক্রিয় এবং চলমান',
  inactive: 'বান্ডেল ডিলটি নিষ্ক্রিয় করা হয়েছে',
  expired: 'বান্ডেল ডিলটির মেয়াদ শেষ হয়েছে',
  cancelled: 'বান্ডেল ডিলটি বাতিল করা হয়েছে',
  paused: 'বান্ডেল ডিলটি সাময়িকভাবে বিরতিপ্রাপ্ত',
  scheduled: 'বান্ডেল ডিলটি নির্ধারিত সময়ে শুরু হবে',
  ended: 'বান্ডেল ডিলটি সমাপ্ত হয়েছে',
  draft: 'বান্ডেল ডিলটি খসড়া অবস্থায় আছে',
  published: 'বান্ডেল ডিলটি প্রকাশিত হয়েছে',
  pending: 'বান্ডেল ডিলটি অনুমোদনের অপেক্ষায়',
  approved: 'বান্ডেল ডিলটি অনুমোদিত হয়েছে',
  rejected: 'বান্ডেল ডিলটি প্রত্যাখ্যাত হয়েছে',
  out_of_stock: 'বান্ডেলের পণ্যের স্টক শেষ হয়ে গেছে',
  limited_stock: 'বান্ডেলের পণ্যের সীমিত স্টক অবশিষ্ট আছে',
  available: 'বান্ডেল ডিলটি উপলব্ধ',
  unavailable: 'বান্ডেল ডিলটি অনুপলব্ধ',
};

// স্ট্যাটাসের কালার কোড
export const BUNDLE_DEAL_STATUS_COLORS: Record<BundleDealStatus, string> = {
  active: '#22C55E', // Green
  inactive: '#9CA3AF', // Gray
  expired: '#F97316', // Orange
  cancelled: '#EF4444', // Red
  paused: '#F59E0B', // Amber
  scheduled: '#8B5CF6', // Purple
  ended: '#6B7280', // Gray
  draft: '#9CA3AF', // Gray
  published: '#3B82F6', // Blue
  pending: '#FCD34D', // Yellow
  approved: '#34D399', // Green
  rejected: '#F87171', // Red
  out_of_stock: '#DC2626', // Dark Red
  limited_stock: '#F59E0B', // Amber
  available: '#10B981', // Emerald
  unavailable: '#6B7280', // Gray
};

// স্ট্যাটাসের আইকন (আইকন নাম)
export const BUNDLE_DEAL_STATUS_ICONS: Record<BundleDealStatus, string> = {
  active: 'CheckCircle',
  inactive: 'XCircle',
  expired: 'AlertTriangle',
  cancelled: 'XCircle',
  paused: 'Pause',
  scheduled: 'CalendarClock',
  ended: 'CheckCircle',
  draft: 'FileText',
  published: 'Globe',
  pending: 'Clock',
  approved: 'Check',
  rejected: 'X',
  out_of_stock: 'PackageX',
  limited_stock: 'Package',
  available: 'PackageCheck',
  unavailable: 'PackageX',
};

// স্ট্যাটাসের ডিসপ্লে অর্ডার
export const BUNDLE_DEAL_STATUS_DISPLAY_ORDER: Record<BundleDealStatus, number> = {
  active: 1,
  available: 2,
  approved: 3,
  published: 4,
  scheduled: 5,
  pending: 6,
  limited_stock: 7,
  paused: 8,
  ended: 9,
  expired: 10,
  cancelled: 11,
  rejected: 12,
  out_of_stock: 13,
  draft: 14,
  inactive: 15,
  unavailable: 16,
};

// স্ট্যাটাস গ্রুপ
export const BUNDLE_DEAL_STATUS_GROUPS = {
  ACTIVE_STATUSES: ['active', 'available', 'approved', 'published'] as BundleDealStatus[],
  INACTIVE_STATUSES: ['inactive', 'draft', 'unavailable'] as BundleDealStatus[],
  COMPLETED_STATUSES: ['ended', 'expired'] as BundleDealStatus[],
  PENDING_STATUSES: ['pending', 'scheduled'] as BundleDealStatus[],
  ISSUE_STATUSES: ['cancelled', 'rejected', 'paused', 'out_of_stock'] as BundleDealStatus[],
  STOCK_STATUSES: [
    'out_of_stock',
    'limited_stock',
    'available',
    'unavailable',
  ] as BundleDealStatus[],
} as const;

// স্ট্যাটাস ট্রানজিশন
export const BUNDLE_DEAL_STATUS_TRANSITIONS: Record<BundleDealStatus, BundleDealStatus[]> = {
  draft: ['published', 'scheduled', 'pending', 'cancelled', 'inactive'],
  published: ['scheduled', 'active', 'pending', 'cancelled', 'inactive'],
  scheduled: ['active', 'published', 'pending', 'cancelled', 'inactive'],
  active: ['paused', 'ended', 'cancelled', 'inactive'],
  paused: ['active', 'ended', 'cancelled', 'inactive'],
  ended: ['inactive', 'unavailable'],
  cancelled: ['inactive', 'unavailable'],
  expired: ['inactive', 'unavailable'],
  pending: ['approved', 'rejected', 'cancelled', 'draft'],
  approved: ['scheduled', 'active', 'published', 'cancelled', 'inactive'],
  rejected: ['draft', 'cancelled', 'inactive'],
  out_of_stock: ['inactive', 'unavailable'],
  limited_stock: ['active', 'available'],
  available: ['limited_stock', 'active', 'inactive'],
  unavailable: ['available', 'inactive'],
  inactive: ['draft', 'active', 'cancelled'],
};

// স্ট্যাটাস কনফিগারেশন ইন্টারফেস
export interface BundleDealStatusConfig {
  status: BundleDealStatus;
  label: string;
  description: string;
  color: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
  canTransitionTo: BundleDealStatus[];
}

// সম্পূর্ণ স্ট্যাটাস কনফিগারেশন
export const BUNDLE_DEAL_STATUS_CONFIGS: Record<BundleDealStatus, BundleDealStatusConfig> = {
  active: {
    status: 'active',
    label: BUNDLE_DEAL_STATUS_LABELS.active,
    description: BUNDLE_DEAL_STATUS_DESCRIPTIONS.active,
    color: BUNDLE_DEAL_STATUS_COLORS.active,
    icon: BUNDLE_DEAL_STATUS_ICONS.active,
    displayOrder: BUNDLE_DEAL_STATUS_DISPLAY_ORDER.active,
    isActive: true,
    canTransitionTo: BUNDLE_DEAL_STATUS_TRANSITIONS.active,
  },
  inactive: {
    status: 'inactive',
    label: BUNDLE_DEAL_STATUS_LABELS.inactive,
    description: BUNDLE_DEAL_STATUS_DESCRIPTIONS.inactive,
    color: BUNDLE_DEAL_STATUS_COLORS.inactive,
    icon: BUNDLE_DEAL_STATUS_ICONS.inactive,
    displayOrder: BUNDLE_DEAL_STATUS_DISPLAY_ORDER.inactive,
    isActive: false,
    canTransitionTo: BUNDLE_DEAL_STATUS_TRANSITIONS.inactive,
  },
  expired: {
    status: 'expired',
    label: BUNDLE_DEAL_STATUS_LABELS.expired,
    description: BUNDLE_DEAL_STATUS_DESCRIPTIONS.expired,
    color: BUNDLE_DEAL_STATUS_COLORS.expired,
    icon: BUNDLE_DEAL_STATUS_ICONS.expired,
    displayOrder: BUNDLE_DEAL_STATUS_DISPLAY_ORDER.expired,
    isActive: false,
    canTransitionTo: BUNDLE_DEAL_STATUS_TRANSITIONS.expired,
  },
  cancelled: {
    status: 'cancelled',
    label: BUNDLE_DEAL_STATUS_LABELS.cancelled,
    description: BUNDLE_DEAL_STATUS_DESCRIPTIONS.cancelled,
    color: BUNDLE_DEAL_STATUS_COLORS.cancelled,
    icon: BUNDLE_DEAL_STATUS_ICONS.cancelled,
    displayOrder: BUNDLE_DEAL_STATUS_DISPLAY_ORDER.cancelled,
    isActive: false,
    canTransitionTo: BUNDLE_DEAL_STATUS_TRANSITIONS.cancelled,
  },
  paused: {
    status: 'paused',
    label: BUNDLE_DEAL_STATUS_LABELS.paused,
    description: BUNDLE_DEAL_STATUS_DESCRIPTIONS.paused,
    color: BUNDLE_DEAL_STATUS_COLORS.paused,
    icon: BUNDLE_DEAL_STATUS_ICONS.paused,
    displayOrder: BUNDLE_DEAL_STATUS_DISPLAY_ORDER.paused,
    isActive: false,
    canTransitionTo: BUNDLE_DEAL_STATUS_TRANSITIONS.paused,
  },
  scheduled: {
    status: 'scheduled',
    label: BUNDLE_DEAL_STATUS_LABELS.scheduled,
    description: BUNDLE_DEAL_STATUS_DESCRIPTIONS.scheduled,
    color: BUNDLE_DEAL_STATUS_COLORS.scheduled,
    icon: BUNDLE_DEAL_STATUS_ICONS.scheduled,
    displayOrder: BUNDLE_DEAL_STATUS_DISPLAY_ORDER.scheduled,
    isActive: false,
    canTransitionTo: BUNDLE_DEAL_STATUS_TRANSITIONS.scheduled,
  },
  ended: {
    status: 'ended',
    label: BUNDLE_DEAL_STATUS_LABELS.ended,
    description: BUNDLE_DEAL_STATUS_DESCRIPTIONS.ended,
    color: BUNDLE_DEAL_STATUS_COLORS.ended,
    icon: BUNDLE_DEAL_STATUS_ICONS.ended,
    displayOrder: BUNDLE_DEAL_STATUS_DISPLAY_ORDER.ended,
    isActive: false,
    canTransitionTo: BUNDLE_DEAL_STATUS_TRANSITIONS.ended,
  },
  draft: {
    status: 'draft',
    label: BUNDLE_DEAL_STATUS_LABELS.draft,
    description: BUNDLE_DEAL_STATUS_DESCRIPTIONS.draft,
    color: BUNDLE_DEAL_STATUS_COLORS.draft,
    icon: BUNDLE_DEAL_STATUS_ICONS.draft,
    displayOrder: BUNDLE_DEAL_STATUS_DISPLAY_ORDER.draft,
    isActive: false,
    canTransitionTo: BUNDLE_DEAL_STATUS_TRANSITIONS.draft,
  },
  published: {
    status: 'published',
    label: BUNDLE_DEAL_STATUS_LABELS.published,
    description: BUNDLE_DEAL_STATUS_DESCRIPTIONS.published,
    color: BUNDLE_DEAL_STATUS_COLORS.published,
    icon: BUNDLE_DEAL_STATUS_ICONS.published,
    displayOrder: BUNDLE_DEAL_STATUS_DISPLAY_ORDER.published,
    isActive: true,
    canTransitionTo: BUNDLE_DEAL_STATUS_TRANSITIONS.published,
  },
  pending: {
    status: 'pending',
    label: BUNDLE_DEAL_STATUS_LABELS.pending,
    description: BUNDLE_DEAL_STATUS_DESCRIPTIONS.pending,
    color: BUNDLE_DEAL_STATUS_COLORS.pending,
    icon: BUNDLE_DEAL_STATUS_ICONS.pending,
    displayOrder: BUNDLE_DEAL_STATUS_DISPLAY_ORDER.pending,
    isActive: false,
    canTransitionTo: BUNDLE_DEAL_STATUS_TRANSITIONS.pending,
  },
  approved: {
    status: 'approved',
    label: BUNDLE_DEAL_STATUS_LABELS.approved,
    description: BUNDLE_DEAL_STATUS_DESCRIPTIONS.approved,
    color: BUNDLE_DEAL_STATUS_COLORS.approved,
    icon: BUNDLE_DEAL_STATUS_ICONS.approved,
    displayOrder: BUNDLE_DEAL_STATUS_DISPLAY_ORDER.approved,
    isActive: true,
    canTransitionTo: BUNDLE_DEAL_STATUS_TRANSITIONS.approved,
  },
  rejected: {
    status: 'rejected',
    label: BUNDLE_DEAL_STATUS_LABELS.rejected,
    description: BUNDLE_DEAL_STATUS_DESCRIPTIONS.rejected,
    color: BUNDLE_DEAL_STATUS_COLORS.rejected,
    icon: BUNDLE_DEAL_STATUS_ICONS.rejected,
    displayOrder: BUNDLE_DEAL_STATUS_DISPLAY_ORDER.rejected,
    isActive: false,
    canTransitionTo: BUNDLE_DEAL_STATUS_TRANSITIONS.rejected,
  },
  out_of_stock: {
    status: 'out_of_stock',
    label: BUNDLE_DEAL_STATUS_LABELS.out_of_stock,
    description: BUNDLE_DEAL_STATUS_DESCRIPTIONS.out_of_stock,
    color: BUNDLE_DEAL_STATUS_COLORS.out_of_stock,
    icon: BUNDLE_DEAL_STATUS_ICONS.out_of_stock,
    displayOrder: BUNDLE_DEAL_STATUS_DISPLAY_ORDER.out_of_stock,
    isActive: false,
    canTransitionTo: BUNDLE_DEAL_STATUS_TRANSITIONS.out_of_stock,
  },
  limited_stock: {
    status: 'limited_stock',
    label: BUNDLE_DEAL_STATUS_LABELS.limited_stock,
    description: BUNDLE_DEAL_STATUS_DESCRIPTIONS.limited_stock,
    color: BUNDLE_DEAL_STATUS_COLORS.limited_stock,
    icon: BUNDLE_DEAL_STATUS_ICONS.limited_stock,
    displayOrder: BUNDLE_DEAL_STATUS_DISPLAY_ORDER.limited_stock,
    isActive: false,
    canTransitionTo: BUNDLE_DEAL_STATUS_TRANSITIONS.limited_stock,
  },
  available: {
    status: 'available',
    label: BUNDLE_DEAL_STATUS_LABELS.available,
    description: BUNDLE_DEAL_STATUS_DESCRIPTIONS.available,
    color: BUNDLE_DEAL_STATUS_COLORS.available,
    icon: BUNDLE_DEAL_STATUS_ICONS.available,
    displayOrder: BUNDLE_DEAL_STATUS_DISPLAY_ORDER.available,
    isActive: true,
    canTransitionTo: BUNDLE_DEAL_STATUS_TRANSITIONS.available,
  },
  unavailable: {
    status: 'unavailable',
    label: BUNDLE_DEAL_STATUS_LABELS.unavailable,
    description: BUNDLE_DEAL_STATUS_DESCRIPTIONS.unavailable,
    color: BUNDLE_DEAL_STATUS_COLORS.unavailable,
    icon: BUNDLE_DEAL_STATUS_ICONS.unavailable,
    displayOrder: BUNDLE_DEAL_STATUS_DISPLAY_ORDER.unavailable,
    isActive: false,
    canTransitionTo: BUNDLE_DEAL_STATUS_TRANSITIONS.unavailable,
  },
};

// হেল্পার ফাংশন: স্ট্যাটাস ভ্যালিড কিনা চেক করুন
export const isValidBundleDealStatus = (status: string): status is BundleDealStatus => {
  return Object.values(BUNDLE_DEAL_STATUS).includes(status as BundleDealStatus);
};

// হেল্পার ফাংশন: সক্রিয় স্ট্যাটাস গুলো পান
export const getActiveBundleDealStatuses = (): BundleDealStatus[] => {
  return Object.values(BUNDLE_DEAL_STATUS_CONFIGS)
    .filter((config) => config.isActive)
    .map((config) => config.status);
};

// হেল্পার ফাংশন: ডিসপ্লে অর্ডার অনুযায়ী সাজান
export const getBundleDealStatusesByOrder = (): BundleDealStatus[] => {
  return Object.values(BUNDLE_DEAL_STATUS_CONFIGS)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((config) => config.status);
};

// হেল্পার ফাংশন: স্ট্যাটাস গ্রুপ অনুযায়ী ফিল্টার
export const getBundleDealStatusesByGroup = (
  group: keyof typeof BUNDLE_DEAL_STATUS_GROUPS
): BundleDealStatus[] => {
  return BUNDLE_DEAL_STATUS_GROUPS[group] || [];
};

// হেল্পার ফাংশন: স্ট্যাটাসের লেবেল পান
export const getBundleDealStatusLabel = (status: BundleDealStatus): string => {
  return BUNDLE_DEAL_STATUS_LABELS[status] || status;
};

// হেল্পার ফাংশন: স্ট্যাটাসের কালার পান
export const getBundleDealStatusColor = (status: BundleDealStatus): string => {
  return BUNDLE_DEAL_STATUS_COLORS[status] || '#6B7280';
};

// হেল্পার ফাংশন: স্ট্যাটাসের আইকন পান
export const getBundleDealStatusIcon = (status: BundleDealStatus): string => {
  return BUNDLE_DEAL_STATUS_ICONS[status] || 'Circle';
};

// হেল্পার ফাংশন: স্ট্যাটাস ট্রানজিশন সম্ভব কিনা চেক করুন
export const canTransitionToBundleDealStatus = (
  from: BundleDealStatus,
  to: BundleDealStatus
): boolean => {
  return BUNDLE_DEAL_STATUS_TRANSITIONS[from]?.includes(to) || false;
};
