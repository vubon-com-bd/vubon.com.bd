/**
 * Product Deal Status Constants
 * প্রোডাক্ট ডিলের স্ট্যাটাসসমূহ সংজ্ঞায়িত
 */

// প্রোডাক্ট ডিল স্ট্যাটাস এনাম
export const PRODUCT_DEAL_STATUS = {
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

// প্রোডাক্ট ডিল স্ট্যাটাস টাইপ
export type ProductDealStatus = (typeof PRODUCT_DEAL_STATUS)[keyof typeof PRODUCT_DEAL_STATUS];

// স্ট্যাটাসের লেবেল
export const PRODUCT_DEAL_STATUS_LABELS: Record<ProductDealStatus, string> = {
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
export const PRODUCT_DEAL_STATUS_DESCRIPTIONS: Record<ProductDealStatus, string> = {
  active: 'প্রোডাক্ট ডিলটি বর্তমানে সক্রিয় এবং চলমান',
  inactive: 'প্রোডাক্ট ডিলটি নিষ্ক্রিয় করা হয়েছে',
  expired: 'প্রোডাক্ট ডিলটির মেয়াদ শেষ হয়েছে',
  cancelled: 'প্রোডাক্ট ডিলটি বাতিল করা হয়েছে',
  paused: 'প্রোডাক্ট ডিলটি সাময়িকভাবে বিরতিপ্রাপ্ত',
  scheduled: 'প্রোডাক্ট ডিলটি নির্ধারিত সময়ে শুরু হবে',
  ended: 'প্রোডাক্ট ডিলটি সমাপ্ত হয়েছে',
  draft: 'প্রোডাক্ট ডিলটি খসড়া অবস্থায় আছে',
  published: 'প্রোডাক্ট ডিলটি প্রকাশিত হয়েছে',
  pending: 'প্রোডাক্ট ডিলটি অনুমোদনের অপেক্ষায়',
  approved: 'প্রোডাক্ট ডিলটি অনুমোদিত হয়েছে',
  rejected: 'প্রোডাক্ট ডিলটি প্রত্যাখ্যাত হয়েছে',
  out_of_stock: 'প্রোডাক্টের স্টক শেষ হয়ে গেছে',
  limited_stock: 'প্রোডাক্টের সীমিত স্টক অবশিষ্ট আছে',
  available: 'প্রোডাক্ট ডিলটি উপলব্ধ',
  unavailable: 'প্রোডাক্ট ডিলটি অনুপলব্ধ',
};

// স্ট্যাটাসের কালার কোড
export const PRODUCT_DEAL_STATUS_COLORS: Record<ProductDealStatus, string> = {
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
export const PRODUCT_DEAL_STATUS_ICONS: Record<ProductDealStatus, string> = {
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
export const PRODUCT_DEAL_STATUS_DISPLAY_ORDER: Record<ProductDealStatus, number> = {
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
export const PRODUCT_DEAL_STATUS_GROUPS = {
  ACTIVE_STATUSES: ['active', 'available', 'approved', 'published'] as ProductDealStatus[],
  INACTIVE_STATUSES: ['inactive', 'draft', 'unavailable'] as ProductDealStatus[],
  COMPLETED_STATUSES: ['ended', 'expired'] as ProductDealStatus[],
  PENDING_STATUSES: ['pending', 'scheduled'] as ProductDealStatus[],
  ISSUE_STATUSES: ['cancelled', 'rejected', 'paused', 'out_of_stock'] as ProductDealStatus[],
  STOCK_STATUSES: [
    'out_of_stock',
    'limited_stock',
    'available',
    'unavailable',
  ] as ProductDealStatus[],
} as const;

// স্ট্যাটাস ট্রানজিশন
export const PRODUCT_DEAL_STATUS_TRANSITIONS: Record<ProductDealStatus, ProductDealStatus[]> = {
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
export interface ProductDealStatusConfig {
  status: ProductDealStatus;
  label: string;
  description: string;
  color: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
  canTransitionTo: ProductDealStatus[];
}

// সম্পূর্ণ স্ট্যাটাস কনফিগারেশন
export const PRODUCT_DEAL_STATUS_CONFIGS: Record<ProductDealStatus, ProductDealStatusConfig> = {
  active: {
    status: 'active',
    label: PRODUCT_DEAL_STATUS_LABELS.active,
    description: PRODUCT_DEAL_STATUS_DESCRIPTIONS.active,
    color: PRODUCT_DEAL_STATUS_COLORS.active,
    icon: PRODUCT_DEAL_STATUS_ICONS.active,
    displayOrder: PRODUCT_DEAL_STATUS_DISPLAY_ORDER.active,
    isActive: true,
    canTransitionTo: PRODUCT_DEAL_STATUS_TRANSITIONS.active,
  },
  inactive: {
    status: 'inactive',
    label: PRODUCT_DEAL_STATUS_LABELS.inactive,
    description: PRODUCT_DEAL_STATUS_DESCRIPTIONS.inactive,
    color: PRODUCT_DEAL_STATUS_COLORS.inactive,
    icon: PRODUCT_DEAL_STATUS_ICONS.inactive,
    displayOrder: PRODUCT_DEAL_STATUS_DISPLAY_ORDER.inactive,
    isActive: false,
    canTransitionTo: PRODUCT_DEAL_STATUS_TRANSITIONS.inactive,
  },
  expired: {
    status: 'expired',
    label: PRODUCT_DEAL_STATUS_LABELS.expired,
    description: PRODUCT_DEAL_STATUS_DESCRIPTIONS.expired,
    color: PRODUCT_DEAL_STATUS_COLORS.expired,
    icon: PRODUCT_DEAL_STATUS_ICONS.expired,
    displayOrder: PRODUCT_DEAL_STATUS_DISPLAY_ORDER.expired,
    isActive: false,
    canTransitionTo: PRODUCT_DEAL_STATUS_TRANSITIONS.expired,
  },
  cancelled: {
    status: 'cancelled',
    label: PRODUCT_DEAL_STATUS_LABELS.cancelled,
    description: PRODUCT_DEAL_STATUS_DESCRIPTIONS.cancelled,
    color: PRODUCT_DEAL_STATUS_COLORS.cancelled,
    icon: PRODUCT_DEAL_STATUS_ICONS.cancelled,
    displayOrder: PRODUCT_DEAL_STATUS_DISPLAY_ORDER.cancelled,
    isActive: false,
    canTransitionTo: PRODUCT_DEAL_STATUS_TRANSITIONS.cancelled,
  },
  paused: {
    status: 'paused',
    label: PRODUCT_DEAL_STATUS_LABELS.paused,
    description: PRODUCT_DEAL_STATUS_DESCRIPTIONS.paused,
    color: PRODUCT_DEAL_STATUS_COLORS.paused,
    icon: PRODUCT_DEAL_STATUS_ICONS.paused,
    displayOrder: PRODUCT_DEAL_STATUS_DISPLAY_ORDER.paused,
    isActive: false,
    canTransitionTo: PRODUCT_DEAL_STATUS_TRANSITIONS.paused,
  },
  scheduled: {
    status: 'scheduled',
    label: PRODUCT_DEAL_STATUS_LABELS.scheduled,
    description: PRODUCT_DEAL_STATUS_DESCRIPTIONS.scheduled,
    color: PRODUCT_DEAL_STATUS_COLORS.scheduled,
    icon: PRODUCT_DEAL_STATUS_ICONS.scheduled,
    displayOrder: PRODUCT_DEAL_STATUS_DISPLAY_ORDER.scheduled,
    isActive: false,
    canTransitionTo: PRODUCT_DEAL_STATUS_TRANSITIONS.scheduled,
  },
  ended: {
    status: 'ended',
    label: PRODUCT_DEAL_STATUS_LABELS.ended,
    description: PRODUCT_DEAL_STATUS_DESCRIPTIONS.ended,
    color: PRODUCT_DEAL_STATUS_COLORS.ended,
    icon: PRODUCT_DEAL_STATUS_ICONS.ended,
    displayOrder: PRODUCT_DEAL_STATUS_DISPLAY_ORDER.ended,
    isActive: false,
    canTransitionTo: PRODUCT_DEAL_STATUS_TRANSITIONS.ended,
  },
  draft: {
    status: 'draft',
    label: PRODUCT_DEAL_STATUS_LABELS.draft,
    description: PRODUCT_DEAL_STATUS_DESCRIPTIONS.draft,
    color: PRODUCT_DEAL_STATUS_COLORS.draft,
    icon: PRODUCT_DEAL_STATUS_ICONS.draft,
    displayOrder: PRODUCT_DEAL_STATUS_DISPLAY_ORDER.draft,
    isActive: false,
    canTransitionTo: PRODUCT_DEAL_STATUS_TRANSITIONS.draft,
  },
  published: {
    status: 'published',
    label: PRODUCT_DEAL_STATUS_LABELS.published,
    description: PRODUCT_DEAL_STATUS_DESCRIPTIONS.published,
    color: PRODUCT_DEAL_STATUS_COLORS.published,
    icon: PRODUCT_DEAL_STATUS_ICONS.published,
    displayOrder: PRODUCT_DEAL_STATUS_DISPLAY_ORDER.published,
    isActive: true,
    canTransitionTo: PRODUCT_DEAL_STATUS_TRANSITIONS.published,
  },
  pending: {
    status: 'pending',
    label: PRODUCT_DEAL_STATUS_LABELS.pending,
    description: PRODUCT_DEAL_STATUS_DESCRIPTIONS.pending,
    color: PRODUCT_DEAL_STATUS_COLORS.pending,
    icon: PRODUCT_DEAL_STATUS_ICONS.pending,
    displayOrder: PRODUCT_DEAL_STATUS_DISPLAY_ORDER.pending,
    isActive: false,
    canTransitionTo: PRODUCT_DEAL_STATUS_TRANSITIONS.pending,
  },
  approved: {
    status: 'approved',
    label: PRODUCT_DEAL_STATUS_LABELS.approved,
    description: PRODUCT_DEAL_STATUS_DESCRIPTIONS.approved,
    color: PRODUCT_DEAL_STATUS_COLORS.approved,
    icon: PRODUCT_DEAL_STATUS_ICONS.approved,
    displayOrder: PRODUCT_DEAL_STATUS_DISPLAY_ORDER.approved,
    isActive: true,
    canTransitionTo: PRODUCT_DEAL_STATUS_TRANSITIONS.approved,
  },
  rejected: {
    status: 'rejected',
    label: PRODUCT_DEAL_STATUS_LABELS.rejected,
    description: PRODUCT_DEAL_STATUS_DESCRIPTIONS.rejected,
    color: PRODUCT_DEAL_STATUS_COLORS.rejected,
    icon: PRODUCT_DEAL_STATUS_ICONS.rejected,
    displayOrder: PRODUCT_DEAL_STATUS_DISPLAY_ORDER.rejected,
    isActive: false,
    canTransitionTo: PRODUCT_DEAL_STATUS_TRANSITIONS.rejected,
  },
  out_of_stock: {
    status: 'out_of_stock',
    label: PRODUCT_DEAL_STATUS_LABELS.out_of_stock,
    description: PRODUCT_DEAL_STATUS_DESCRIPTIONS.out_of_stock,
    color: PRODUCT_DEAL_STATUS_COLORS.out_of_stock,
    icon: PRODUCT_DEAL_STATUS_ICONS.out_of_stock,
    displayOrder: PRODUCT_DEAL_STATUS_DISPLAY_ORDER.out_of_stock,
    isActive: false,
    canTransitionTo: PRODUCT_DEAL_STATUS_TRANSITIONS.out_of_stock,
  },
  limited_stock: {
    status: 'limited_stock',
    label: PRODUCT_DEAL_STATUS_LABELS.limited_stock,
    description: PRODUCT_DEAL_STATUS_DESCRIPTIONS.limited_stock,
    color: PRODUCT_DEAL_STATUS_COLORS.limited_stock,
    icon: PRODUCT_DEAL_STATUS_ICONS.limited_stock,
    displayOrder: PRODUCT_DEAL_STATUS_DISPLAY_ORDER.limited_stock,
    isActive: false,
    canTransitionTo: PRODUCT_DEAL_STATUS_TRANSITIONS.limited_stock,
  },
  available: {
    status: 'available',
    label: PRODUCT_DEAL_STATUS_LABELS.available,
    description: PRODUCT_DEAL_STATUS_DESCRIPTIONS.available,
    color: PRODUCT_DEAL_STATUS_COLORS.available,
    icon: PRODUCT_DEAL_STATUS_ICONS.available,
    displayOrder: PRODUCT_DEAL_STATUS_DISPLAY_ORDER.available,
    isActive: true,
    canTransitionTo: PRODUCT_DEAL_STATUS_TRANSITIONS.available,
  },
  unavailable: {
    status: 'unavailable',
    label: PRODUCT_DEAL_STATUS_LABELS.unavailable,
    description: PRODUCT_DEAL_STATUS_DESCRIPTIONS.unavailable,
    color: PRODUCT_DEAL_STATUS_COLORS.unavailable,
    icon: PRODUCT_DEAL_STATUS_ICONS.unavailable,
    displayOrder: PRODUCT_DEAL_STATUS_DISPLAY_ORDER.unavailable,
    isActive: false,
    canTransitionTo: PRODUCT_DEAL_STATUS_TRANSITIONS.unavailable,
  },
};

// হেল্পার ফাংশন: স্ট্যাটাস ভ্যালিড কিনা চেক করুন
export const isValidProductDealStatus = (status: string): status is ProductDealStatus => {
  return Object.values(PRODUCT_DEAL_STATUS).includes(status as ProductDealStatus);
};

// হেল্পার ফাংশন: সক্রিয় স্ট্যাটাস গুলো পান
export const getActiveProductDealStatuses = (): ProductDealStatus[] => {
  return Object.values(PRODUCT_DEAL_STATUS_CONFIGS)
    .filter((config) => config.isActive)
    .map((config) => config.status);
};

// হেল্পার ফাংশন: ডিসপ্লে অর্ডার অনুযায়ী সাজান
export const getProductDealStatusesByOrder = (): ProductDealStatus[] => {
  return Object.values(PRODUCT_DEAL_STATUS_CONFIGS)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((config) => config.status);
};

// হেল্পার ফাংশন: স্ট্যাটাস গ্রুপ অনুযায়ী ফিল্টার
export const getProductDealStatusesByGroup = (
  group: keyof typeof PRODUCT_DEAL_STATUS_GROUPS
): ProductDealStatus[] => {
  return PRODUCT_DEAL_STATUS_GROUPS[group] || [];
};

// হেল্পার ফাংশন: স্ট্যাটাসের লেবেল পান
export const getProductDealStatusLabel = (status: ProductDealStatus): string => {
  return PRODUCT_DEAL_STATUS_LABELS[status] || status;
};

// হেল্পার ফাংশন: স্ট্যাটাসের কালার পান
export const getProductDealStatusColor = (status: ProductDealStatus): string => {
  return PRODUCT_DEAL_STATUS_COLORS[status] || '#6B7280';
};

// হেল্পার ফাংশন: স্ট্যাটাসের আইকন পান
export const getProductDealStatusIcon = (status: ProductDealStatus): string => {
  return PRODUCT_DEAL_STATUS_ICONS[status] || 'Circle';
};

// হেল্পার ফাংশন: স্ট্যাটাস ট্রানজিশন সম্ভব কিনা চেক করুন
export const canTransitionToProductDealStatus = (
  from: ProductDealStatus,
  to: ProductDealStatus
): boolean => {
  return PRODUCT_DEAL_STATUS_TRANSITIONS[from]?.includes(to) || false;
};
