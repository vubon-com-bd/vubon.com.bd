/**
 * Flash Sale Wishlist Constants
 * Configuration for flash sale wishlist and saved items
 */

export const FLASH_SALE_WISHLIST = {
  // Wishlist Types
  TYPES: {
    PERSONAL: 'personal',
    SHARED: 'shared',
    PUBLIC: 'public',
    PRIVATE: 'private',
    COLLABORATIVE: 'collaborative',
    SEASONAL: 'seasonal',
    OCCASIONAL: 'occasional',
    GIFT: 'gift',
  },

  // Wishlist Categories
  CATEGORIES: {
    PRODUCTS: 'products',
    BUNDLES: 'bundles',
    SERVICES: 'services',
    GIFT_CARDS: 'gift_cards',
    VOUCHERS: 'vouchers',
    DEALS: 'deals',
    FLASH_SALES: 'flash_sales',
    LIMITED_EDITION: 'limited_edition',
  },

  // Wishlist Priority
  PRIORITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    URGENT: 'urgent',
    TOP: 'top',
  },

  // Wishlist Status
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    ARCHIVED: 'archived',
    PENDING: 'pending',
    COMPLETED: 'completed',
    EXPIRED: 'expired',
  },

  // Wishlist Sharing
  SHARING: {
    PRIVATE: 'private',
    SHARED: 'shared',
    PUBLIC: 'public',
    COLLABORATIVE: 'collaborative',
  },

  // Wishlist Access
  ACCESS: {
    OWNER: 'owner',
    EDITOR: 'editor',
    VIEWER: 'viewer',
    COMMENTOR: 'commentor',
    NONE: 'none',
  },

  // Wishlist Defaults
  DEFAULTS: {
    MAX_ITEMS: 50,
    MAX_SHARED_USERS: 10,
    MAX_COLLABORATORS: 5,
    REMINDER_DAYS: 3,
    AUTO_REMOVE_DAYS: 30,
    NOTIFICATION_ENABLED: true,
    AUTO_SYNC: false,
  },

  // Wishlist Limits
  LIMITS: {
    MAX_ITEMS: 200,
    MAX_SHARED_USERS: 50,
    MAX_COLLABORATORS: 20,
    MAX_WISHLISTS_PER_USER: 10,
    MAX_ITEMS_PER_PRODUCT: 1,
    MAX_REMINDERS: 5,
    MIN_REMINDER_DAYS: 1,
    MAX_REMINDER_DAYS: 365,
  },

  // Wishlist Validation
  VALIDATION: {
    MIN_ITEMS: 1,
    MAX_ITEMS: 200,
    MIN_NAME_LENGTH: 3,
    MAX_NAME_LENGTH: 100,
    MIN_DESCRIPTION_LENGTH: 0,
    MAX_DESCRIPTION_LENGTH: 500,
  },
} as const;

// Wishlist Types
export type FlashSaleWishlistType =
  (typeof FLASH_SALE_WISHLIST.TYPES)[keyof typeof FLASH_SALE_WISHLIST.TYPES];

// Wishlist Categories
export type FlashSaleWishlistCategory =
  (typeof FLASH_SALE_WISHLIST.CATEGORIES)[keyof typeof FLASH_SALE_WISHLIST.CATEGORIES];

// Wishlist Priority
export type FlashSaleWishlistPriority =
  (typeof FLASH_SALE_WISHLIST.PRIORITY)[keyof typeof FLASH_SALE_WISHLIST.PRIORITY];

// Wishlist Status
export type FlashSaleWishlistStatus =
  (typeof FLASH_SALE_WISHLIST.STATUS)[keyof typeof FLASH_SALE_WISHLIST.STATUS];

// Wishlist Sharing
export type FlashSaleWishlistSharing =
  (typeof FLASH_SALE_WISHLIST.SHARING)[keyof typeof FLASH_SALE_WISHLIST.SHARING];

// Wishlist Access
export type FlashSaleWishlistAccess =
  (typeof FLASH_SALE_WISHLIST.ACCESS)[keyof typeof FLASH_SALE_WISHLIST.ACCESS];

// Utility Functions
export function flashsalesWishlistGetTypeLabel(type: FlashSaleWishlistType): string {
  const labels: Record<FlashSaleWishlistType, string> = {
    [FLASH_SALE_WISHLIST.TYPES.PERSONAL]: 'Personal Wishlist',
    [FLASH_SALE_WISHLIST.TYPES.SHARED]: 'Shared Wishlist',
    [FLASH_SALE_WISHLIST.TYPES.PUBLIC]: 'Public Wishlist',
    [FLASH_SALE_WISHLIST.TYPES.PRIVATE]: 'Private Wishlist',
    [FLASH_SALE_WISHLIST.TYPES.COLLABORATIVE]: 'Collaborative Wishlist',
    [FLASH_SALE_WISHLIST.TYPES.SEASONAL]: 'Seasonal Wishlist',
    [FLASH_SALE_WISHLIST.TYPES.OCCASIONAL]: 'Occasional Wishlist',
    [FLASH_SALE_WISHLIST.TYPES.GIFT]: 'Gift Wishlist',
  };
  return labels[type] || 'Unknown Wishlist Type';
}

export function flashsalesWishlistGetCategoryLabel(category: FlashSaleWishlistCategory): string {
  const labels: Record<FlashSaleWishlistCategory, string> = {
    [FLASH_SALE_WISHLIST.CATEGORIES.PRODUCTS]: 'Products',
    [FLASH_SALE_WISHLIST.CATEGORIES.BUNDLES]: 'Bundles',
    [FLASH_SALE_WISHLIST.CATEGORIES.SERVICES]: 'Services',
    [FLASH_SALE_WISHLIST.CATEGORIES.GIFT_CARDS]: 'Gift Cards',
    [FLASH_SALE_WISHLIST.CATEGORIES.VOUCHERS]: 'Vouchers',
    [FLASH_SALE_WISHLIST.CATEGORIES.DEALS]: 'Deals',
    [FLASH_SALE_WISHLIST.CATEGORIES.FLASH_SALES]: 'Flash Sales',
    [FLASH_SALE_WISHLIST.CATEGORIES.LIMITED_EDITION]: 'Limited Edition',
  };
  return labels[category] || 'Unknown Category';
}

export function flashsalesWishlistGetPriorityLabel(priority: FlashSaleWishlistPriority): string {
  const labels: Record<FlashSaleWishlistPriority, string> = {
    [FLASH_SALE_WISHLIST.PRIORITY.LOW]: 'Low Priority',
    [FLASH_SALE_WISHLIST.PRIORITY.MEDIUM]: 'Medium Priority',
    [FLASH_SALE_WISHLIST.PRIORITY.HIGH]: 'High Priority',
    [FLASH_SALE_WISHLIST.PRIORITY.URGENT]: 'Urgent Priority',
    [FLASH_SALE_WISHLIST.PRIORITY.TOP]: 'Top Priority',
  };
  return labels[priority] || 'Unknown Priority';
}

export function flashsalesWishlistGetStatusLabel(status: FlashSaleWishlistStatus): string {
  const labels: Record<FlashSaleWishlistStatus, string> = {
    [FLASH_SALE_WISHLIST.STATUS.ACTIVE]: 'Active',
    [FLASH_SALE_WISHLIST.STATUS.INACTIVE]: 'Inactive',
    [FLASH_SALE_WISHLIST.STATUS.ARCHIVED]: 'Archived',
    [FLASH_SALE_WISHLIST.STATUS.PENDING]: 'Pending',
    [FLASH_SALE_WISHLIST.STATUS.COMPLETED]: 'Completed',
    [FLASH_SALE_WISHLIST.STATUS.EXPIRED]: 'Expired',
  };
  return labels[status] || 'Unknown Status';
}

export function flashsalesWishlistGetSharingLabel(sharing: FlashSaleWishlistSharing): string {
  const labels: Record<FlashSaleWishlistSharing, string> = {
    [FLASH_SALE_WISHLIST.SHARING.PRIVATE]: 'Private',
    [FLASH_SALE_WISHLIST.SHARING.SHARED]: 'Shared',
    [FLASH_SALE_WISHLIST.SHARING.PUBLIC]: 'Public',
    [FLASH_SALE_WISHLIST.SHARING.COLLABORATIVE]: 'Collaborative',
  };
  return labels[sharing] || 'Unknown Sharing';
}

export function flashsalesWishlistGetAccessLabel(access: FlashSaleWishlistAccess): string {
  const labels: Record<FlashSaleWishlistAccess, string> = {
    [FLASH_SALE_WISHLIST.ACCESS.OWNER]: 'Owner',
    [FLASH_SALE_WISHLIST.ACCESS.EDITOR]: 'Editor',
    [FLASH_SALE_WISHLIST.ACCESS.VIEWER]: 'Viewer',
    [FLASH_SALE_WISHLIST.ACCESS.COMMENTOR]: 'Commentor',
    [FLASH_SALE_WISHLIST.ACCESS.NONE]: 'No Access',
  };
  return labels[access] || 'Unknown Access';
}

export function flashsalesWishlistIsValidType(type: string): type is FlashSaleWishlistType {
  return Object.values(FLASH_SALE_WISHLIST.TYPES).includes(type as FlashSaleWishlistType);
}

export function flashsalesWishlistIsValidCategory(
  category: string
): category is FlashSaleWishlistCategory {
  return Object.values(FLASH_SALE_WISHLIST.CATEGORIES).includes(
    category as FlashSaleWishlistCategory
  );
}

export function flashsalesWishlistIsValidPriority(
  priority: string
): priority is FlashSaleWishlistPriority {
  return Object.values(FLASH_SALE_WISHLIST.PRIORITY).includes(
    priority as FlashSaleWishlistPriority
  );
}

export function flashsalesWishlistIsValidStatus(status: string): status is FlashSaleWishlistStatus {
  return Object.values(FLASH_SALE_WISHLIST.STATUS).includes(status as FlashSaleWishlistStatus);
}

export function flashsalesWishlistIsActive(status: FlashSaleWishlistStatus): boolean {
  const activeStatuses: FlashSaleWishlistStatus[] = [FLASH_SALE_WISHLIST.STATUS.ACTIVE];
  return activeStatuses.includes(status);
}

export function flashsalesWishlistIsShared(sharing: FlashSaleWishlistSharing): boolean {
  const sharedTypes: FlashSaleWishlistSharing[] = [
    FLASH_SALE_WISHLIST.SHARING.SHARED,
    FLASH_SALE_WISHLIST.SHARING.PUBLIC,
    FLASH_SALE_WISHLIST.SHARING.COLLABORATIVE,
  ];
  return sharedTypes.includes(sharing);
}

export function flashsalesWishlistIsCollaborative(sharing: FlashSaleWishlistSharing): boolean {
  return sharing === FLASH_SALE_WISHLIST.SHARING.COLLABORATIVE;
}

export function flashsalesWishlistIsPublic(sharing: FlashSaleWishlistSharing): boolean {
  return sharing === FLASH_SALE_WISHLIST.SHARING.PUBLIC;
}

export function flashsalesWishlistIsPrivate(sharing: FlashSaleWishlistSharing): boolean {
  return sharing === FLASH_SALE_WISHLIST.SHARING.PRIVATE;
}

export function flashsalesWishlistGetDefaultMaxItems(): number {
  return FLASH_SALE_WISHLIST.DEFAULTS.MAX_ITEMS;
}

export function flashsalesWishlistGetDefaultMaxSharedUsers(): number {
  return FLASH_SALE_WISHLIST.DEFAULTS.MAX_SHARED_USERS;
}

export function flashsalesWishlistGetDefaultMaxCollaborators(): number {
  return FLASH_SALE_WISHLIST.DEFAULTS.MAX_COLLABORATORS;
}

export function flashsalesWishlistGetMaxItems(): number {
  return FLASH_SALE_WISHLIST.LIMITS.MAX_ITEMS;
}

export function flashsalesWishlistGetMaxSharedUsers(): number {
  return FLASH_SALE_WISHLIST.LIMITS.MAX_SHARED_USERS;
}

export function flashsalesWishlistGetMaxWishlistsPerUser(): number {
  return FLASH_SALE_WISHLIST.LIMITS.MAX_WISHLISTS_PER_USER;
}

export function flashsalesWishlistGetMinNameLength(): number {
  return FLASH_SALE_WISHLIST.VALIDATION.MIN_NAME_LENGTH;
}

export function flashsalesWishlistGetMaxNameLength(): number {
  return FLASH_SALE_WISHLIST.VALIDATION.MAX_NAME_LENGTH;
}
