/**
 * Flash Sale Wishlist Types
 * Type definitions for flash sale wishlists based on shared-constants
 * @module FlashSaleWishlistTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants flash-sales wishlist
// ============================================================
import {
  // Wishlist Core
  FLASH_SALE_WISHLIST,
  FlashSaleWishlistType,
  FlashSaleWishlistCategory,
  FlashSaleWishlistPriority,
  FlashSaleWishlistStatus,
  FlashSaleWishlistSharing,
  FlashSaleWishlistAccess,
  flashsalesWishlistGetTypeLabel,
  flashsalesWishlistGetCategoryLabel,
  flashsalesWishlistGetPriorityLabel,
  flashsalesWishlistGetStatusLabel,
  flashsalesWishlistGetSharingLabel,
  flashsalesWishlistGetAccessLabel,
  flashsalesWishlistIsValidType,
  flashsalesWishlistIsValidCategory,
  flashsalesWishlistIsValidPriority,
  flashsalesWishlistIsValidStatus,
  flashsalesWishlistIsActive,
  flashsalesWishlistIsShared,
  flashsalesWishlistIsCollaborative,
  flashsalesWishlistIsPublic,
  flashsalesWishlistIsPrivate,
  flashsalesWishlistGetDefaultMaxItems,
  flashsalesWishlistGetDefaultMaxSharedUsers,
  flashsalesWishlistGetDefaultMaxCollaborators,
  flashsalesWishlistGetMaxItems,
  flashsalesWishlistGetMaxSharedUsers,
  flashsalesWishlistGetMaxWishlistsPerUser,
  flashsalesWishlistGetMinNameLength,
  flashsalesWishlistGetMaxNameLength,
  // Wishlist Status
  FLASH_SALE_WISHLIST_STATUS,
  FlashSaleWishlistStatusType,
  FlashSaleWishlistStatusCategory,
  FlashSaleWishlistStatusColor,
  FlashSaleWishlistStatusPriority,
  FlashSaleWishlistItemStatus,
  FlashSaleWishlistItemPriority,
  flashsalesWishlistStatusGetLabel,
  flashsalesWishlistStatusGetCategory,
  flashsalesWishlistStatusGetColor,
  flashsalesWishlistStatusGetPriority,
  flashsalesWishlistStatusIsActive,
  flashsalesWishlistStatusIsApproved,
  flashsalesWishlistStatusIsTerminated,
  flashsalesWishlistStatusCanTransitionTo,
  flashsalesWishlistStatusGetAvailableTransitions,
  flashsalesWishlistStatusCanApprove,
  flashsalesWishlistStatusCanReject,
  flashsalesWishlistStatusCanActivate,
  flashsalesWishlistStatusCanPause,
  flashsalesWishlistStatusCanResume,
  flashsalesWishlistStatusCanArchive,
  flashsalesWishlistStatusCanDelete,
  flashsalesWishlistStatusGetItemStatusLabel,
  flashsalesWishlistStatusGetItemPriorityLabel,
  flashsalesWishlistStatusIsValid,
  flashsalesWishlistStatusIsValidItemStatus,
  flashsalesWishlistStatusIsValidItemPriority,
} from '@vubon/shared-constants';

// ============================================================
// Flash Sale Wishlist Extended Types
// ============================================================

/**
 * Flash Sale Wishlist Item
 */
export interface FlashSaleWishlistItem extends BaseEntity, Timestamp {
  id: ID;
  wishlistId: ID;
  productId: ID;
  variantId?: ID;
  status: FlashSaleWishlistItemStatus;
  priority: FlashSaleWishlistItemPriority;
  notes?: string;
  addedAt: Date;
  metadata?: Metadata;
}

/**
 * Flash Sale Wishlist
 */
export interface FlashSaleWishlist extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  name: string;
  description?: string;
  type: FlashSaleWishlistType;
  category: FlashSaleWishlistCategory;
  priority: FlashSaleWishlistPriority;
  status: FlashSaleWishlistStatusType;
  sharing: FlashSaleWishlistSharing;
  access: FlashSaleWishlistAccess;
  items: FlashSaleWishlistItem[];
  isActive: boolean;
  isShared: boolean;
  isCollaborative: boolean;
  isPublic: boolean;
  isPrivate: boolean;
  isApproved: boolean;
  isTerminated: boolean;
  sharedUsers: ID[];
  collaborators: ID[];
  metadata?: Metadata;
}

/**
 * Flash Sale Wishlist Filter
 */
export interface FlashSaleWishlistFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: FlashSaleWishlistType[];
  categories?: FlashSaleWishlistCategory[];
  priorities?: FlashSaleWishlistPriority[];
  statuses?: FlashSaleWishlistStatusType[];
  sharings?: FlashSaleWishlistSharing[];
  accesses?: FlashSaleWishlistAccess[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isShared?: boolean;
  isCollaborative?: boolean;
  isPublic?: boolean;
  isPrivate?: boolean;
  isApproved?: boolean;
  isTerminated?: boolean;
  searchTerm?: string;
  name?: string;
}

/**
 * Flash Sale Wishlist Statistics
 */
export interface FlashSaleWishlistStatistics {
  userId: ID;
  totalWishlists: number;
  activeWishlists: number;
  sharedWishlists: number;
  collaborativeWishlists: number;
  publicWishlists: number;
  privateWishlists: number;
  approvedWishlists: number;
  terminatedWishlists: number;
  byType: Record<FlashSaleWishlistType, number>;
  byCategory: Record<FlashSaleWishlistCategory, number>;
  byPriority: Record<FlashSaleWishlistPriority, number>;
  byStatus: Record<FlashSaleWishlistStatusType, number>;
  bySharing: Record<FlashSaleWishlistSharing, number>;
  byAccess: Record<FlashSaleWishlistAccess, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalItems: number;
  averageItemsPerWishlist: number;
  maxItemsPerWishlist: number;
  minItemsPerWishlist: number;
  totalSharedUsers: number;
  totalCollaborators: number;
  mostFrequentType: FlashSaleWishlistType;
  mostFrequentCategory: FlashSaleWishlistCategory;
  mostFrequentStatus: FlashSaleWishlistStatusType;
}

/**
 * Flash Sale Wishlist Summary
 */
export interface FlashSaleWishlistSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalWishlists: number;
  active: number;
  shared: number;
  collaborative: number;
  public: number;
  private: number;
  approved: number;
  terminated: number;
  byType: Record<FlashSaleWishlistType, number>;
  byCategory: Record<FlashSaleWishlistCategory, number>;
  byPriority: Record<FlashSaleWishlistPriority, number>;
  byStatus: Record<FlashSaleWishlistStatusType, number>;
  bySharing: Record<FlashSaleWishlistSharing, number>;
  byAccess: Record<FlashSaleWishlistAccess, number>;
  wishlistTrend: {
    date: Date;
    total: number;
    active: number;
    shared: number;
  }[];
  topTypes: {
    type: FlashSaleWishlistType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: FlashSaleWishlistCategory;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: FlashSaleWishlistStatusType;
    count: number;
    label: string;
  }[];
  itemMetrics: {
    totalItems: number;
    averageItemsPerWishlist: number;
    maxItemsPerWishlist: number;
    minItemsPerWishlist: number;
  };
}

/**
 * Flash Sale Wishlist Configuration
 */
export interface FlashSaleWishlistConfiguration {
  enabled: boolean;
  defaultType: FlashSaleWishlistType;
  defaultCategory: FlashSaleWishlistCategory;
  defaultPriority: FlashSaleWishlistPriority;
  defaultStatus: FlashSaleWishlistStatusType;
  defaultSharing: FlashSaleWishlistSharing;
  defaultAccess: FlashSaleWishlistAccess;
  defaultMaxItems: number;
  defaultMaxSharedUsers: number;
  defaultMaxCollaborators: number;
  maxItems: number;
  maxSharedUsers: number;
  maxWishlistsPerUser: number;
  minNameLength: number;
  maxNameLength: number;
  requireApproval: boolean;
  allowCollaboration: boolean;
  allowSharing: boolean;
  allowPublicWishlists: boolean;
  allowPrivateWishlists: boolean;
  allowPause: boolean;
  allowResume: boolean;
  allowArchive: boolean;
  allowDelete: boolean;
  notificationOnCreate: boolean;
  notificationOnApprove: boolean;
  notificationOnReject: boolean;
  notificationOnActivate: boolean;
  notificationOnPause: boolean;
  notificationOnResume: boolean;
  notificationOnArchive: boolean;
  notificationOnDelete: boolean;
  notificationOnShare: boolean;
  notificationOnCollaborate: boolean;
  alertConfig?: FlashSaleWishlistAlertConfig;
}

/**
 * Flash Sale Wishlist Alert Configuration
 */
export interface FlashSaleWishlistAlertConfig {
  enabled: boolean;
  highItemCountAlert: boolean;
  highItemCountThreshold: number;
  lowItemCountAlert: boolean;
  lowItemCountThreshold: number;
  sharingAlert: boolean;
  collaborationAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Flash Sale Wishlist History
 */
export interface FlashSaleWishlistHistory extends BaseEntity, Timestamp {
  id: ID;
  wishlistId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'approve'
    | 'reject'
    | 'activate'
    | 'pause'
    | 'resume'
    | 'archive'
    | 'delete'
    | 'restore'
    | 'share'
    | 'unshare'
    | 'collaborate'
    | 'uncollaborate'
    | 'add_item'
    | 'remove_item'
    | 'update_item';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Flash Sale Wishlist Validation
 */
export interface FlashSaleWishlistValidation {
  isValid: boolean;
  wishlistId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Flash Sale Wishlist Export
 */
export interface FlashSaleWishlistExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: FlashSaleWishlistFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Flash Sale Wishlist Share
 */
export interface FlashSaleWishlistShare extends BaseEntity, Timestamp {
  id: ID;
  wishlistId: ID;
  userId: ID;
  sharedWithUserId: ID;
  accessLevel: 'view' | 'edit' | 'collaborate';
  sharedAt: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * Flash Sale Wishlist Item Priority Update
 */
export interface FlashSaleWishlistItemPriorityUpdate extends BaseEntity, Timestamp {
  id: ID;
  itemId: ID;
  wishlistId: ID;
  userId: ID;
  previousPriority: FlashSaleWishlistItemPriority;
  newPriority: FlashSaleWishlistItemPriority;
  updatedAt: Date;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Wishlist Core
  FLASH_SALE_WISHLIST,
  FlashSaleWishlistType,
  FlashSaleWishlistCategory,
  FlashSaleWishlistPriority,
  FlashSaleWishlistStatus,
  FlashSaleWishlistSharing,
  FlashSaleWishlistAccess,
  flashsalesWishlistGetTypeLabel,
  flashsalesWishlistGetCategoryLabel,
  flashsalesWishlistGetPriorityLabel,
  flashsalesWishlistGetStatusLabel,
  flashsalesWishlistGetSharingLabel,
  flashsalesWishlistGetAccessLabel,
  flashsalesWishlistIsValidType,
  flashsalesWishlistIsValidCategory,
  flashsalesWishlistIsValidPriority,
  flashsalesWishlistIsValidStatus,
  flashsalesWishlistIsActive,
  flashsalesWishlistIsShared,
  flashsalesWishlistIsCollaborative,
  flashsalesWishlistIsPublic,
  flashsalesWishlistIsPrivate,
  flashsalesWishlistGetDefaultMaxItems,
  flashsalesWishlistGetDefaultMaxSharedUsers,
  flashsalesWishlistGetDefaultMaxCollaborators,
  flashsalesWishlistGetMaxItems,
  flashsalesWishlistGetMaxSharedUsers,
  flashsalesWishlistGetMaxWishlistsPerUser,
  flashsalesWishlistGetMinNameLength,
  flashsalesWishlistGetMaxNameLength,
  // Wishlist Status
  FLASH_SALE_WISHLIST_STATUS,
  FlashSaleWishlistStatusType,
  FlashSaleWishlistStatusCategory,
  FlashSaleWishlistStatusColor,
  FlashSaleWishlistStatusPriority,
  FlashSaleWishlistItemStatus,
  FlashSaleWishlistItemPriority,
  flashsalesWishlistStatusGetLabel,
  flashsalesWishlistStatusGetCategory,
  flashsalesWishlistStatusGetColor,
  flashsalesWishlistStatusGetPriority,
  flashsalesWishlistStatusIsActive,
  flashsalesWishlistStatusIsApproved,
  flashsalesWishlistStatusIsTerminated,
  flashsalesWishlistStatusCanTransitionTo,
  flashsalesWishlistStatusGetAvailableTransitions,
  flashsalesWishlistStatusCanApprove,
  flashsalesWishlistStatusCanReject,
  flashsalesWishlistStatusCanActivate,
  flashsalesWishlistStatusCanPause,
  flashsalesWishlistStatusCanResume,
  flashsalesWishlistStatusCanArchive,
  flashsalesWishlistStatusCanDelete,
  flashsalesWishlistStatusGetItemStatusLabel,
  flashsalesWishlistStatusGetItemPriorityLabel,
  flashsalesWishlistStatusIsValid,
  flashsalesWishlistStatusIsValidItemStatus,
  flashsalesWishlistStatusIsValidItemPriority,
};
