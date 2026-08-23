/**
 * Gallery Constants
 * Configuration for galleries, albums, and collections
 */

export const CONTENT_GALLERY = {
  // Gallery Types
  TYPES: {
    PHOTO: 'photo',
    VIDEO: 'video',
    MIXED: 'mixed',
    PRODUCT: 'product',
    PORTFOLIO: 'portfolio',
    COLLECTION: 'collection',
    BLOG: 'blog',
    EVENT: 'event',
    CUSTOM: 'custom',
  } as const,

  // Gallery Statuses
  STATUSES: {
    DRAFT: 'draft',
    PENDING_REVIEW: 'pending_review',
    IN_REVIEW: 'in_review',
    REVIEWED: 'reviewed',
    PENDING_APPROVAL: 'pending_approval',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    PUBLISHED: 'published',
    SCHEDULED: 'scheduled',
    PRIVATE: 'private',
    UNLISTED: 'unlisted',
    ARCHIVED: 'archived',
    DEPRECATED: 'deprecated',
    DELETED: 'deleted',
  } as const,

  // Gallery Layouts
  LAYOUTS: {
    GRID: 'grid',
    MASONRY: 'masonry',
    SLIDER: 'slider',
    CAROUSEL: 'carousel',
    TIMELINE: 'timeline',
    THUMBNAIL: 'thumbnail',
    FULL_WIDTH: 'full_width',
    SIDEBAR: 'sidebar',
    CUSTOM: 'custom',
  } as const,

  // Gallery Display Modes
  DISPLAY_MODES: {
    STANDARD: 'standard',
    SLIDESHOW: 'slideshow',
    LIGHTBOX: 'lightbox',
    MAGNIFY: 'magnify',
    COMPARE: 'compare',
    CUSTOM: 'custom',
  } as const,

  // Gallery Sort Options
  SORT_OPTIONS: {
    DATE_DESC: 'date_desc',
    DATE_ASC: 'date_asc',
    TITLE_ASC: 'title_asc',
    TITLE_DESC: 'title_desc',
    POPULAR: 'popular',
    VIEWS: 'views',
    LIKES: 'likes',
    CUSTOM: 'custom',
  } as const,

  // Gallery Visibility
  VISIBILITY: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    UNLISTED: 'unlisted',
    PASSWORD_PROTECTED: 'password_protected',
    MEMBERS_ONLY: 'members_only',
    SUBSCRIBERS_ONLY: 'subscribers_only',
    PREMIUM_ONLY: 'premium_only',
    TEAM_ONLY: 'team_only',
  } as const,

  // Gallery Access
  ACCESS: {
    VIEW: 'view',
    DOWNLOAD: 'download',
    SHARE: 'share',
    COMMENT: 'comment',
    UPLOAD: 'upload',
    EDIT: 'edit',
    DELETE: 'delete',
    ADMIN: 'admin',
  } as const,

  // Gallery Defaults
  DEFAULTS: {
    STATUS: 'draft',
    VISIBILITY: 'public',
    LAYOUT: 'grid',
    DISPLAY_MODE: 'standard',
    SORT: 'date_desc',
    ITEMS_PER_PAGE: 20,
    MAX_COLUMNS: 4,
    PREVIEW_LENGTH: 5,
  } as const,

  // Gallery Limits
  LIMITS: {
    MAX_TITLE_LENGTH: 200,
    MAX_DESCRIPTION_LENGTH: 500,
    MAX_ITEMS: 1000,
    MAX_ITEMS_PER_PAGE: 100,
    MAX_COLUMNS: 6,
    MIN_COLUMNS: 1,
  } as const,
} as const;

// Gallery Types
export type ContentGalleryType = (typeof CONTENT_GALLERY.TYPES)[keyof typeof CONTENT_GALLERY.TYPES];

// Gallery Statuses
export type ContentGalleryStatus =
  (typeof CONTENT_GALLERY.STATUSES)[keyof typeof CONTENT_GALLERY.STATUSES];

// Gallery Layouts
export type ContentGalleryLayout =
  (typeof CONTENT_GALLERY.LAYOUTS)[keyof typeof CONTENT_GALLERY.LAYOUTS];

// Gallery Display Modes
export type ContentGalleryDisplayMode =
  (typeof CONTENT_GALLERY.DISPLAY_MODES)[keyof typeof CONTENT_GALLERY.DISPLAY_MODES];

// Gallery Sort Options
export type ContentGallerySortOption =
  (typeof CONTENT_GALLERY.SORT_OPTIONS)[keyof typeof CONTENT_GALLERY.SORT_OPTIONS];

// Gallery Visibility
export type ContentGalleryVisibility =
  (typeof CONTENT_GALLERY.VISIBILITY)[keyof typeof CONTENT_GALLERY.VISIBILITY];

// Gallery Access
export type ContentGalleryAccess =
  (typeof CONTENT_GALLERY.ACCESS)[keyof typeof CONTENT_GALLERY.ACCESS];

// Utility Functions
export function contentGalleryGetTypeLabel(type: ContentGalleryType): string {
  const labels: Record<ContentGalleryType, string> = {
    [CONTENT_GALLERY.TYPES.PHOTO]: 'Photo Gallery',
    [CONTENT_GALLERY.TYPES.VIDEO]: 'Video Gallery',
    [CONTENT_GALLERY.TYPES.MIXED]: 'Mixed Gallery',
    [CONTENT_GALLERY.TYPES.PRODUCT]: 'Product Gallery',
    [CONTENT_GALLERY.TYPES.PORTFOLIO]: 'Portfolio Gallery',
    [CONTENT_GALLERY.TYPES.COLLECTION]: 'Collection Gallery',
    [CONTENT_GALLERY.TYPES.BLOG]: 'Blog Gallery',
    [CONTENT_GALLERY.TYPES.EVENT]: 'Event Gallery',
    [CONTENT_GALLERY.TYPES.CUSTOM]: 'Custom Gallery',
  };
  return labels[type] || 'Unknown Gallery Type';
}

export function contentGalleryGetStatusLabel(status: ContentGalleryStatus): string {
  const labels: Record<ContentGalleryStatus, string> = {
    [CONTENT_GALLERY.STATUSES.DRAFT]: 'Draft',
    [CONTENT_GALLERY.STATUSES.PENDING_REVIEW]: 'Pending Review',
    [CONTENT_GALLERY.STATUSES.IN_REVIEW]: 'In Review',
    [CONTENT_GALLERY.STATUSES.REVIEWED]: 'Reviewed',
    [CONTENT_GALLERY.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [CONTENT_GALLERY.STATUSES.APPROVED]: 'Approved',
    [CONTENT_GALLERY.STATUSES.REJECTED]: 'Rejected',
    [CONTENT_GALLERY.STATUSES.PUBLISHED]: 'Published',
    [CONTENT_GALLERY.STATUSES.SCHEDULED]: 'Scheduled',
    [CONTENT_GALLERY.STATUSES.PRIVATE]: 'Private',
    [CONTENT_GALLERY.STATUSES.UNLISTED]: 'Unlisted',
    [CONTENT_GALLERY.STATUSES.ARCHIVED]: 'Archived',
    [CONTENT_GALLERY.STATUSES.DEPRECATED]: 'Deprecated',
    [CONTENT_GALLERY.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function contentGalleryGetLayoutLabel(layout: ContentGalleryLayout): string {
  const labels: Record<ContentGalleryLayout, string> = {
    [CONTENT_GALLERY.LAYOUTS.GRID]: 'Grid Layout',
    [CONTENT_GALLERY.LAYOUTS.MASONRY]: 'Masonry Layout',
    [CONTENT_GALLERY.LAYOUTS.SLIDER]: 'Slider Layout',
    [CONTENT_GALLERY.LAYOUTS.CAROUSEL]: 'Carousel Layout',
    [CONTENT_GALLERY.LAYOUTS.TIMELINE]: 'Timeline Layout',
    [CONTENT_GALLERY.LAYOUTS.THUMBNAIL]: 'Thumbnail Layout',
    [CONTENT_GALLERY.LAYOUTS.FULL_WIDTH]: 'Full Width Layout',
    [CONTENT_GALLERY.LAYOUTS.SIDEBAR]: 'Sidebar Layout',
    [CONTENT_GALLERY.LAYOUTS.CUSTOM]: 'Custom Layout',
  };
  return labels[layout] || 'Unknown Layout';
}

export function contentGalleryGetDisplayModeLabel(mode: ContentGalleryDisplayMode): string {
  const labels: Record<ContentGalleryDisplayMode, string> = {
    [CONTENT_GALLERY.DISPLAY_MODES.STANDARD]: 'Standard',
    [CONTENT_GALLERY.DISPLAY_MODES.SLIDESHOW]: 'Slideshow',
    [CONTENT_GALLERY.DISPLAY_MODES.LIGHTBOX]: 'Lightbox',
    [CONTENT_GALLERY.DISPLAY_MODES.MAGNIFY]: 'Magnify',
    [CONTENT_GALLERY.DISPLAY_MODES.COMPARE]: 'Compare',
    [CONTENT_GALLERY.DISPLAY_MODES.CUSTOM]: 'Custom',
  };
  return labels[mode] || 'Unknown Display Mode';
}

export function contentGalleryGetSortOptionLabel(sort: ContentGallerySortOption): string {
  const labels: Record<ContentGallerySortOption, string> = {
    [CONTENT_GALLERY.SORT_OPTIONS.DATE_DESC]: 'Newest First',
    [CONTENT_GALLERY.SORT_OPTIONS.DATE_ASC]: 'Oldest First',
    [CONTENT_GALLERY.SORT_OPTIONS.TITLE_ASC]: 'Title A-Z',
    [CONTENT_GALLERY.SORT_OPTIONS.TITLE_DESC]: 'Title Z-A',
    [CONTENT_GALLERY.SORT_OPTIONS.POPULAR]: 'Most Popular',
    [CONTENT_GALLERY.SORT_OPTIONS.VIEWS]: 'Most Viewed',
    [CONTENT_GALLERY.SORT_OPTIONS.LIKES]: 'Most Liked',
    [CONTENT_GALLERY.SORT_OPTIONS.CUSTOM]: 'Custom Sort',
  };
  return labels[sort] || 'Unknown Sort Option';
}

export function contentGalleryGetVisibilityLabel(visibility: ContentGalleryVisibility): string {
  const labels: Record<ContentGalleryVisibility, string> = {
    [CONTENT_GALLERY.VISIBILITY.PUBLIC]: 'Public',
    [CONTENT_GALLERY.VISIBILITY.PRIVATE]: 'Private',
    [CONTENT_GALLERY.VISIBILITY.UNLISTED]: 'Unlisted',
    [CONTENT_GALLERY.VISIBILITY.PASSWORD_PROTECTED]: 'Password Protected',
    [CONTENT_GALLERY.VISIBILITY.MEMBERS_ONLY]: 'Members Only',
    [CONTENT_GALLERY.VISIBILITY.SUBSCRIBERS_ONLY]: 'Subscribers Only',
    [CONTENT_GALLERY.VISIBILITY.PREMIUM_ONLY]: 'Premium Only',
    [CONTENT_GALLERY.VISIBILITY.TEAM_ONLY]: 'Team Only',
  };
  return labels[visibility] || 'Unknown Visibility';
}

export function contentGalleryGetAccessLabel(access: ContentGalleryAccess): string {
  const labels: Record<ContentGalleryAccess, string> = {
    [CONTENT_GALLERY.ACCESS.VIEW]: 'View',
    [CONTENT_GALLERY.ACCESS.DOWNLOAD]: 'Download',
    [CONTENT_GALLERY.ACCESS.SHARE]: 'Share',
    [CONTENT_GALLERY.ACCESS.COMMENT]: 'Comment',
    [CONTENT_GALLERY.ACCESS.UPLOAD]: 'Upload',
    [CONTENT_GALLERY.ACCESS.EDIT]: 'Edit',
    [CONTENT_GALLERY.ACCESS.DELETE]: 'Delete',
    [CONTENT_GALLERY.ACCESS.ADMIN]: 'Admin',
  };
  return labels[access] || 'Unknown Access';
}

export function contentGalleryIsPublished(status: ContentGalleryStatus): boolean {
  const publishedStatuses: ContentGalleryStatus[] = [
    CONTENT_GALLERY.STATUSES.PUBLISHED,
    CONTENT_GALLERY.STATUSES.SCHEDULED,
  ];
  return publishedStatuses.includes(status);
}

export function contentGalleryIsEditable(status: ContentGalleryStatus): boolean {
  const editableStatuses: ContentGalleryStatus[] = [
    CONTENT_GALLERY.STATUSES.DRAFT,
    CONTENT_GALLERY.STATUSES.PENDING_REVIEW,
    CONTENT_GALLERY.STATUSES.IN_REVIEW,
    CONTENT_GALLERY.STATUSES.REVIEWED,
    CONTENT_GALLERY.STATUSES.PENDING_APPROVAL,
    CONTENT_GALLERY.STATUSES.REJECTED,
    CONTENT_GALLERY.STATUSES.PRIVATE,
    CONTENT_GALLERY.STATUSES.UNLISTED,
  ];
  return editableStatuses.includes(status);
}

export function contentGalleryGetDefaultStatus(): ContentGalleryStatus {
  return CONTENT_GALLERY.DEFAULTS.STATUS as ContentGalleryStatus;
}

export function contentGalleryGetDefaultVisibility(): ContentGalleryVisibility {
  return CONTENT_GALLERY.DEFAULTS.VISIBILITY as ContentGalleryVisibility;
}

export function contentGalleryGetDefaultLayout(): ContentGalleryLayout {
  return CONTENT_GALLERY.DEFAULTS.LAYOUT as ContentGalleryLayout;
}

export function contentGalleryGetDefaultDisplayMode(): ContentGalleryDisplayMode {
  return CONTENT_GALLERY.DEFAULTS.DISPLAY_MODE as ContentGalleryDisplayMode;
}

export function contentGalleryGetDefaultSort(): ContentGallerySortOption {
  return CONTENT_GALLERY.DEFAULTS.SORT as ContentGallerySortOption;
}

export function contentGalleryGetItemsPerPage(): number {
  return CONTENT_GALLERY.DEFAULTS.ITEMS_PER_PAGE;
}

export function contentGalleryGetMaxColumns(): number {
  return CONTENT_GALLERY.DEFAULTS.MAX_COLUMNS;
}

export function contentGalleryIsValidType(type: string): type is ContentGalleryType {
  return Object.values(CONTENT_GALLERY.TYPES).includes(type as ContentGalleryType);
}

export function contentGalleryIsValidStatus(status: string): status is ContentGalleryStatus {
  return Object.values(CONTENT_GALLERY.STATUSES).includes(status as ContentGalleryStatus);
}

export function contentGalleryIsValidLayout(layout: string): layout is ContentGalleryLayout {
  return Object.values(CONTENT_GALLERY.LAYOUTS).includes(layout as ContentGalleryLayout);
}

export function contentGalleryIsValidDisplayMode(mode: string): mode is ContentGalleryDisplayMode {
  return Object.values(CONTENT_GALLERY.DISPLAY_MODES).includes(mode as ContentGalleryDisplayMode);
}

export function contentGalleryIsValidSortOption(sort: string): sort is ContentGallerySortOption {
  return Object.values(CONTENT_GALLERY.SORT_OPTIONS).includes(sort as ContentGallerySortOption);
}
