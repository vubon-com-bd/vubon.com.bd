/**
 * Flash Sale Wishlist Status Constants
 * উইশলিস্টের স্ট্যাটাসসমূহ
 */

// উইশলিস্ট স্ট্যাটাস এনাম
export const WISHLIST_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ARCHIVED: 'archived',
  DELETED: 'deleted',
  DRAFT: 'draft',
  PUBLISHED: 'published',
  PRIVATE: 'private',
  PUBLIC: 'public',
  SHARED: 'shared',
  FAVORITE: 'favorite',
  PRIORITY: 'priority',
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  PURCHASED: 'purchased',
  EXPIRED: 'expired',
  NOTIFIED: 'notified',
  REMINDED: 'reminded',
  CUSTOM: 'custom',
} as const;

// উইশলিস্ট স্ট্যাটাস টাইপ
export type WishlistStatus = (typeof WISHLIST_STATUS)[keyof typeof WISHLIST_STATUS];

// স্ট্যাটাসের লেবেল
export const WISHLIST_STATUS_LABELS: Record<WishlistStatus, string> = {
  active: 'সক্রিয়',
  inactive: 'নিষ্ক্রিয়',
  archived: 'আর্কাইভড',
  deleted: 'মুছে ফেলা',
  draft: 'খসড়া',
  published: 'প্রকাশিত',
  private: 'ব্যক্তিগত',
  public: 'পাবলিক',
  shared: 'শেয়ারকৃত',
  favorite: 'প্রিয়',
  priority: 'অগ্রাধিকার',
  low: 'নিম্ন',
  medium: 'মাঝারি',
  high: 'উচ্চ',
  purchased: 'ক্রয়কৃত',
  expired: 'মেয়াদোত্তীর্ণ',
  notified: 'বিজ্ঞপ্তি প্রাপ্ত',
  reminded: 'স্মারক প্রাপ্ত',
  custom: 'কাস্টম',
};

// স্ট্যাটাসের বিবরণ
export const WISHLIST_STATUS_DESCRIPTIONS: Record<WishlistStatus, string> = {
  active: 'উইশলিস্টটি বর্তমানে সক্রিয়',
  inactive: 'উইশলিস্টটি নিষ্ক্রিয় করা হয়েছে',
  archived: 'উইশলিস্টটি আর্কাইভ করা হয়েছে',
  deleted: 'উইশলিস্টটি মুছে ফেলা হয়েছে',
  draft: 'উইশলিস্টটি খসড়া অবস্থায় আছে',
  published: 'উইশলিস্টটি প্রকাশিত হয়েছে',
  private: 'উইশলিস্টটি শুধুমাত্র মালিকের জন্য দৃশ্যমান',
  public: 'উইশলিস্টটি সবার জন্য দৃশ্যমান',
  shared: 'উইশলিস্টটি অন্যের সাথে শেয়ার করা হয়েছে',
  favorite: 'উইশলিস্টটি প্রিয় হিসেবে চিহ্নিত',
  priority: 'উইশলিস্টটি অগ্রাধিকার পেয়েছে',
  low: 'নিম্ন অগ্রাধিকার',
  medium: 'মাঝারি অগ্রাধিকার',
  high: 'উচ্চ অগ্রাধিকার',
  purchased: 'উইশলিস্টের আইটেম ক্রয় করা হয়েছে',
  expired: 'উইশলিস্টটির মেয়াদ শেষ হয়েছে',
  notified: 'উইশলিস্টের জন্য বিজ্ঞপ্তি প্রাপ্ত',
  reminded: 'উইশলিস্টের জন্য স্মারক প্রাপ্ত',
  custom: 'কাস্টম স্ট্যাটাস',
};

// স্ট্যাটাসের কালার কোড
export const WISHLIST_STATUS_COLORS: Record<WishlistStatus, string> = {
  active: '#22C55E',
  inactive: '#9CA3AF',
  archived: '#6B7280',
  deleted: '#DC2626',
  draft: '#9CA3AF',
  published: '#3B82F6',
  private: '#8B5CF6',
  public: '#06B6D4',
  shared: '#EC4899',
  favorite: '#FBBF24',
  priority: '#EF4444',
  low: '#9CA3AF',
  medium: '#F59E0B',
  high: '#EF4444',
  purchased: '#10B981',
  expired: '#F97316',
  notified: '#3B82F6',
  reminded: '#8B5CF6',
  custom: '#6366F1',
};

// স্ট্যাটাসের আইকন (আইকন নাম)
export const WISHLIST_STATUS_ICONS: Record<WishlistStatus, string> = {
  active: 'CheckCircle',
  inactive: 'XCircle',
  archived: 'Archive',
  deleted: 'Trash2',
  draft: 'FileText',
  published: 'Globe',
  private: 'Lock',
  public: 'Unlock',
  shared: 'Share2',
  favorite: 'Star',
  priority: 'ArrowUp',
  low: 'ArrowDown',
  medium: 'Minus',
  high: 'ArrowUp',
  purchased: 'ShoppingBag',
  expired: 'AlertCircle',
  notified: 'Bell',
  reminded: 'Clock',
  custom: 'Settings',
};

// স্ট্যাটাসের ডিসপ্লে অর্ডার
export const WISHLIST_STATUS_DISPLAY_ORDER: Record<WishlistStatus, number> = {
  draft: 1,
  private: 2,
  public: 3,
  published: 4,
  active: 5,
  shared: 6,
  favorite: 7,
  priority: 8,
  high: 9,
  medium: 10,
  low: 11,
  notified: 12,
  reminded: 13,
  purchased: 14,
  expired: 15,
  inactive: 16,
  archived: 17,
  deleted: 18,
  custom: 19,
};

// স্ট্যাটাস গ্রুপ
export const WISHLIST_STATUS_GROUPS = {
  ACTIVE_STATUSES: ['active', 'published', 'shared', 'favorite'] as WishlistStatus[],
  INACTIVE_STATUSES: ['inactive', 'archived', 'deleted', 'expired'] as WishlistStatus[],
  PENDING_STATUSES: ['draft', 'private'] as WishlistStatus[],
  PRIORITY_STATUSES: ['priority', 'high', 'medium', 'low'] as WishlistStatus[],
  COMPLETED_STATUSES: ['purchased'] as WishlistStatus[],
  NOTIFICATION_STATUSES: ['notified', 'reminded'] as WishlistStatus[],
  VISIBILITY_STATUSES: ['private', 'public', 'shared'] as WishlistStatus[],
} as const;

// স্ট্যাটাস ট্রানজিশন
export const WISHLIST_STATUS_TRANSITIONS: Record<WishlistStatus, WishlistStatus[]> = {
  draft: ['published', 'private', 'archived', 'deleted'],
  private: ['public', 'shared', 'published', 'archived', 'deleted'],
  public: ['private', 'shared', 'published', 'archived', 'deleted'],
  published: ['active', 'shared', 'archived', 'deleted'],
  active: ['inactive', 'archived', 'deleted'],
  shared: ['active', 'public', 'private', 'archived', 'deleted'],
  favorite: ['active', 'archived', 'deleted'],
  priority: ['active', 'high', 'medium', 'low', 'archived', 'deleted'],
  high: ['priority', 'medium', 'low', 'archived', 'deleted'],
  medium: ['priority', 'high', 'low', 'archived', 'deleted'],
  low: ['priority', 'high', 'medium', 'archived', 'deleted'],
  notified: ['active', 'reminded', 'archived', 'deleted'],
  reminded: ['active', 'notified', 'archived', 'deleted'],
  purchased: ['archived', 'deleted'],
  expired: ['archived', 'deleted'],
  inactive: ['active', 'archived', 'deleted'],
  archived: ['deleted'],
  deleted: [],
  custom: ['active', 'archived', 'deleted'],
};

// স্ট্যাটাস কনফিগারেশন ইন্টারফেস
export interface WishlistStatusConfig {
  status: WishlistStatus;
  label: string;
  description: string;
  color: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
  canTransitionTo: WishlistStatus[];
}

// সম্পূর্ণ স্ট্যাটাস কনফিগারেশন
export const WISHLIST_STATUS_CONFIGS: Record<WishlistStatus, WishlistStatusConfig> = {
  active: {
    status: 'active',
    label: WISHLIST_STATUS_LABELS.active,
    description: WISHLIST_STATUS_DESCRIPTIONS.active,
    color: WISHLIST_STATUS_COLORS.active,
    icon: WISHLIST_STATUS_ICONS.active,
    displayOrder: WISHLIST_STATUS_DISPLAY_ORDER.active,
    isActive: true,
    canTransitionTo: WISHLIST_STATUS_TRANSITIONS.active,
  },
  inactive: {
    status: 'inactive',
    label: WISHLIST_STATUS_LABELS.inactive,
    description: WISHLIST_STATUS_DESCRIPTIONS.inactive,
    color: WISHLIST_STATUS_COLORS.inactive,
    icon: WISHLIST_STATUS_ICONS.inactive,
    displayOrder: WISHLIST_STATUS_DISPLAY_ORDER.inactive,
    isActive: false,
    canTransitionTo: WISHLIST_STATUS_TRANSITIONS.inactive,
  },
  archived: {
    status: 'archived',
    label: WISHLIST_STATUS_LABELS.archived,
    description: WISHLIST_STATUS_DESCRIPTIONS.archived,
    color: WISHLIST_STATUS_COLORS.archived,
    icon: WISHLIST_STATUS_ICONS.archived,
    displayOrder: WISHLIST_STATUS_DISPLAY_ORDER.archived,
    isActive: false,
    canTransitionTo: WISHLIST_STATUS_TRANSITIONS.archived,
  },
  deleted: {
    status: 'deleted',
    label: WISHLIST_STATUS_LABELS.deleted,
    description: WISHLIST_STATUS_DESCRIPTIONS.deleted,
    color: WISHLIST_STATUS_COLORS.deleted,
    icon: WISHLIST_STATUS_ICONS.deleted,
    displayOrder: WISHLIST_STATUS_DISPLAY_ORDER.deleted,
    isActive: false,
    canTransitionTo: WISHLIST_STATUS_TRANSITIONS.deleted,
  },
  draft: {
    status: 'draft',
    label: WISHLIST_STATUS_LABELS.draft,
    description: WISHLIST_STATUS_DESCRIPTIONS.draft,
    color: WISHLIST_STATUS_COLORS.draft,
    icon: WISHLIST_STATUS_ICONS.draft,
    displayOrder: WISHLIST_STATUS_DISPLAY_ORDER.draft,
    isActive: false,
    canTransitionTo: WISHLIST_STATUS_TRANSITIONS.draft,
  },
  published: {
    status: 'published',
    label: WISHLIST_STATUS_LABELS.published,
    description: WISHLIST_STATUS_DESCRIPTIONS.published,
    color: WISHLIST_STATUS_COLORS.published,
    icon: WISHLIST_STATUS_ICONS.published,
    displayOrder: WISHLIST_STATUS_DISPLAY_ORDER.published,
    isActive: true,
    canTransitionTo: WISHLIST_STATUS_TRANSITIONS.published,
  },
  private: {
    status: 'private',
    label: WISHLIST_STATUS_LABELS.private,
    description: WISHLIST_STATUS_DESCRIPTIONS.private,
    color: WISHLIST_STATUS_COLORS.private,
    icon: WISHLIST_STATUS_ICONS.private,
    displayOrder: WISHLIST_STATUS_DISPLAY_ORDER.private,
    isActive: false,
    canTransitionTo: WISHLIST_STATUS_TRANSITIONS.private,
  },
  public: {
    status: 'public',
    label: WISHLIST_STATUS_LABELS.public,
    description: WISHLIST_STATUS_DESCRIPTIONS.public,
    color: WISHLIST_STATUS_COLORS.public,
    icon: WISHLIST_STATUS_ICONS.public,
    displayOrder: WISHLIST_STATUS_DISPLAY_ORDER.public,
    isActive: true,
    canTransitionTo: WISHLIST_STATUS_TRANSITIONS.public,
  },
  shared: {
    status: 'shared',
    label: WISHLIST_STATUS_LABELS.shared,
    description: WISHLIST_STATUS_DESCRIPTIONS.shared,
    color: WISHLIST_STATUS_COLORS.shared,
    icon: WISHLIST_STATUS_ICONS.shared,
    displayOrder: WISHLIST_STATUS_DISPLAY_ORDER.shared,
    isActive: true,
    canTransitionTo: WISHLIST_STATUS_TRANSITIONS.shared,
  },
  favorite: {
    status: 'favorite',
    label: WISHLIST_STATUS_LABELS.favorite,
    description: WISHLIST_STATUS_DESCRIPTIONS.favorite,
    color: WISHLIST_STATUS_COLORS.favorite,
    icon: WISHLIST_STATUS_ICONS.favorite,
    displayOrder: WISHLIST_STATUS_DISPLAY_ORDER.favorite,
    isActive: true,
    canTransitionTo: WISHLIST_STATUS_TRANSITIONS.favorite,
  },
  priority: {
    status: 'priority',
    label: WISHLIST_STATUS_LABELS.priority,
    description: WISHLIST_STATUS_DESCRIPTIONS.priority,
    color: WISHLIST_STATUS_COLORS.priority,
    icon: WISHLIST_STATUS_ICONS.priority,
    displayOrder: WISHLIST_STATUS_DISPLAY_ORDER.priority,
    isActive: false,
    canTransitionTo: WISHLIST_STATUS_TRANSITIONS.priority,
  },
  low: {
    status: 'low',
    label: WISHLIST_STATUS_LABELS.low,
    description: WISHLIST_STATUS_DESCRIPTIONS.low,
    color: WISHLIST_STATUS_COLORS.low,
    icon: WISHLIST_STATUS_ICONS.low,
    displayOrder: WISHLIST_STATUS_DISPLAY_ORDER.low,
    isActive: false,
    canTransitionTo: WISHLIST_STATUS_TRANSITIONS.low,
  },
  medium: {
    status: 'medium',
    label: WISHLIST_STATUS_LABELS.medium,
    description: WISHLIST_STATUS_DESCRIPTIONS.medium,
    color: WISHLIST_STATUS_COLORS.medium,
    icon: WISHLIST_STATUS_ICONS.medium,
    displayOrder: WISHLIST_STATUS_DISPLAY_ORDER.medium,
    isActive: false,
    canTransitionTo: WISHLIST_STATUS_TRANSITIONS.medium,
  },
  high: {
    status: 'high',
    label: WISHLIST_STATUS_LABELS.high,
    description: WISHLIST_STATUS_DESCRIPTIONS.high,
    color: WISHLIST_STATUS_COLORS.high,
    icon: WISHLIST_STATUS_ICONS.high,
    displayOrder: WISHLIST_STATUS_DISPLAY_ORDER.high,
    isActive: false,
    canTransitionTo: WISHLIST_STATUS_TRANSITIONS.high,
  },
  purchased: {
    status: 'purchased',
    label: WISHLIST_STATUS_LABELS.purchased,
    description: WISHLIST_STATUS_DESCRIPTIONS.purchased,
    color: WISHLIST_STATUS_COLORS.purchased,
    icon: WISHLIST_STATUS_ICONS.purchased,
    displayOrder: WISHLIST_STATUS_DISPLAY_ORDER.purchased,
    isActive: false,
    canTransitionTo: WISHLIST_STATUS_TRANSITIONS.purchased,
  },
  expired: {
    status: 'expired',
    label: WISHLIST_STATUS_LABELS.expired,
    description: WISHLIST_STATUS_DESCRIPTIONS.expired,
    color: WISHLIST_STATUS_COLORS.expired,
    icon: WISHLIST_STATUS_ICONS.expired,
    displayOrder: WISHLIST_STATUS_DISPLAY_ORDER.expired,
    isActive: false,
    canTransitionTo: WISHLIST_STATUS_TRANSITIONS.expired,
  },
  notified: {
    status: 'notified',
    label: WISHLIST_STATUS_LABELS.notified,
    description: WISHLIST_STATUS_DESCRIPTIONS.notified,
    color: WISHLIST_STATUS_COLORS.notified,
    icon: WISHLIST_STATUS_ICONS.notified,
    displayOrder: WISHLIST_STATUS_DISPLAY_ORDER.notified,
    isActive: false,
    canTransitionTo: WISHLIST_STATUS_TRANSITIONS.notified,
  },
  reminded: {
    status: 'reminded',
    label: WISHLIST_STATUS_LABELS.reminded,
    description: WISHLIST_STATUS_DESCRIPTIONS.reminded,
    color: WISHLIST_STATUS_COLORS.reminded,
    icon: WISHLIST_STATUS_ICONS.reminded,
    displayOrder: WISHLIST_STATUS_DISPLAY_ORDER.reminded,
    isActive: false,
    canTransitionTo: WISHLIST_STATUS_TRANSITIONS.reminded,
  },
  custom: {
    status: 'custom',
    label: WISHLIST_STATUS_LABELS.custom,
    description: WISHLIST_STATUS_DESCRIPTIONS.custom,
    color: WISHLIST_STATUS_COLORS.custom,
    icon: WISHLIST_STATUS_ICONS.custom,
    displayOrder: WISHLIST_STATUS_DISPLAY_ORDER.custom,
    isActive: false,
    canTransitionTo: WISHLIST_STATUS_TRANSITIONS.custom,
  },
};

// হেল্পার ফাংশন: স্ট্যাটাস ভ্যালিড কিনা চেক করুন
export const isValidWishlistStatus = (status: string): status is WishlistStatus => {
  return Object.values(WISHLIST_STATUS).includes(status as WishlistStatus);
};

// হেল্পার ফাংশন: সক্রিয় স্ট্যাটাস গুলো পান
export const getActiveWishlistStatuses = (): WishlistStatus[] => {
  return Object.values(WISHLIST_STATUS_CONFIGS)
    .filter((config) => config.isActive)
    .map((config) => config.status);
};

// হেল্পার ফাংশন: ডিসপ্লে অর্ডার অনুযায়ী সাজান
export const getWishlistStatusesByOrder = (): WishlistStatus[] => {
  return Object.values(WISHLIST_STATUS_CONFIGS)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((config) => config.status);
};

// হেল্পার ফাংশন: স্ট্যাটাস গ্রুপ অনুযায়ী ফিল্টার
export const getWishlistStatusesByGroup = (
  group: keyof typeof WISHLIST_STATUS_GROUPS
): WishlistStatus[] => {
  return WISHLIST_STATUS_GROUPS[group] || [];
};

// হেল্পার ফাংশন: স্ট্যাটাসের লেবেল পান
export const getWishlistStatusLabel = (status: WishlistStatus): string => {
  return WISHLIST_STATUS_LABELS[status] || status;
};

// হেল্পার ফাংশন: স্ট্যাটাসের বিবরণ পান
export const getWishlistStatusDescription = (status: WishlistStatus): string => {
  return WISHLIST_STATUS_DESCRIPTIONS[status] || '';
};

// হেল্পার ফাংশন: স্ট্যাটাসের কালার পান
export const getWishlistStatusColor = (status: WishlistStatus): string => {
  return WISHLIST_STATUS_COLORS[status] || '#6B7280';
};

// হেল্পার ফাংশন: স্ট্যাটাসের আইকন পান
export const getWishlistStatusIcon = (status: WishlistStatus): string => {
  return WISHLIST_STATUS_ICONS[status] || 'Circle';
};

// হেল্পার ফাংশন: স্ট্যাটাস ট্রানজিশন সম্ভব কিনা চেক করুন
export const canTransitionToWishlistStatus = (
  from: WishlistStatus,
  to: WishlistStatus
): boolean => {
  return WISHLIST_STATUS_TRANSITIONS[from]?.includes(to) || false;
};

// হেল্পার ফাংশন: স্ট্যাটাস টার্মিনাল কিনা চেক করুন
export const isTerminalWishlistStatus = (status: WishlistStatus): boolean => {
  const terminalStatuses: WishlistStatus[] = ['archived', 'deleted', 'expired'];
  return terminalStatuses.includes(status);
};

// হেল্পার ফাংশন: স্ট্যাটাস ভিজিবল কিনা চেক করুন
export const isVisibleWishlistStatus = (status: WishlistStatus): boolean => {
  const visibleStatuses: WishlistStatus[] = ['public', 'shared', 'published', 'active'];
  return visibleStatuses.includes(status);
};
