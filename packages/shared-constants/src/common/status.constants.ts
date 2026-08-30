/**
 * Status Constants
 * Common status values used across the application
 */

/**
 * Generic status types
 */
export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  SUSPENDED: 'suspended',
  DELETED: 'deleted',
  ARCHIVED: 'archived',
  DRAFT: 'draft',
  PUBLISHED: 'published',
  UNPUBLISHED: 'unpublished',
  SCHEDULED: 'scheduled',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  FAILED: 'failed',
  SUCCESS: 'success',
  PROCESSING: 'processing',
  INITIATED: 'initiated',
  CONFIRMED: 'confirmed',
  REJECTED: 'rejected',
  APPROVED: 'approved',
  REVIEW: 'review',
  ON_HOLD: 'on_hold',
  PAUSED: 'paused',
  RESUMED: 'resumed',
  LOCKED: 'locked',
  UNLOCKED: 'unlocked',
  VERIFIED: 'verified',
  UNVERIFIED: 'unverified',
  BLOCKED: 'blocked',
  ENABLED: 'enabled',
  DISABLED: 'disabled',
  OPEN: 'open',
  CLOSED: 'closed',
  AVAILABLE: 'available',
  UNAVAILABLE: 'unavailable',
  IN_STOCK: 'in_stock',
  OUT_OF_STOCK: 'out_of_stock',
  PRE_ORDER: 'pre_order',
  BACK_ORDER: 'back_order',
  DISCONTINUED: 'discontinued',
  NEW: 'new',
  USED: 'used',
  REFURBISHED: 'refurbished',
  RENTED: 'rented',
  LEASED: 'leased',
} as const;

/**
 * Status category types
 */
export const STATUS_CATEGORY = {
  /** Active statuses */
  ACTIVE: 'active',
  /** Inactive statuses */
  INACTIVE: 'inactive',
  /** Transitional statuses */
  TRANSITIONAL: 'transitional',
  /** Terminal statuses */
  TERMINAL: 'terminal',
  /** Error statuses */
  ERROR: 'error',
} as const;

/**
 * Status group for filtering
 */
export const STATUS_GROUP = {
  /** All statuses */
  ALL: 'all',
  /** Active and enabled statuses */
  ACTIVE: 'active',
  /** Inactive and disabled statuses */
  INACTIVE: 'inactive',
  /** Pending statuses */
  PENDING: 'pending',
  /** Completed statuses */
  COMPLETED: 'completed',
  /** Failed statuses */
  FAILED: 'failed',
  /** Deleted statuses */
  DELETED: 'deleted',
  /** Archived statuses */
  ARCHIVED: 'archived',
} as const;

/**
 * Status color mapping for UI
 */
export const STATUS_COLOR: Record<string, string> = {
  [STATUS.ACTIVE]: 'success',
  [STATUS.INACTIVE]: 'default',
  [STATUS.PENDING]: 'warning',
  [STATUS.SUSPENDED]: 'error',
  [STATUS.DELETED]: 'error',
  [STATUS.ARCHIVED]: 'default',
  [STATUS.DRAFT]: 'default',
  [STATUS.PUBLISHED]: 'success',
  [STATUS.UNPUBLISHED]: 'default',
  [STATUS.SCHEDULED]: 'info',
  [STATUS.EXPIRED]: 'error',
  [STATUS.CANCELLED]: 'error',
  [STATUS.COMPLETED]: 'success',
  [STATUS.FAILED]: 'error',
  [STATUS.SUCCESS]: 'success',
  [STATUS.PROCESSING]: 'info',
  [STATUS.INITIATED]: 'info',
  [STATUS.CONFIRMED]: 'success',
  [STATUS.REJECTED]: 'error',
  [STATUS.APPROVED]: 'success',
  [STATUS.REVIEW]: 'warning',
  [STATUS.ON_HOLD]: 'warning',
  [STATUS.PAUSED]: 'warning',
  [STATUS.RESUMED]: 'success',
  [STATUS.LOCKED]: 'error',
  [STATUS.UNLOCKED]: 'success',
  [STATUS.VERIFIED]: 'success',
  [STATUS.UNVERIFIED]: 'warning',
  [STATUS.BLOCKED]: 'error',
  [STATUS.ENABLED]: 'success',
  [STATUS.DISABLED]: 'error',
  [STATUS.OPEN]: 'success',
  [STATUS.CLOSED]: 'default',
  [STATUS.AVAILABLE]: 'success',
  [STATUS.UNAVAILABLE]: 'error',
  [STATUS.IN_STOCK]: 'success',
  [STATUS.OUT_OF_STOCK]: 'error',
  [STATUS.PRE_ORDER]: 'warning',
  [STATUS.BACK_ORDER]: 'warning',
  [STATUS.DISCONTINUED]: 'error',
  [STATUS.NEW]: 'success',
  [STATUS.USED]: 'warning',
  [STATUS.REFURBISHED]: 'info',
  [STATUS.RENTED]: 'info',
  [STATUS.LEASED]: 'info',
};

/**
 * Status icon mapping for UI
 */
export const STATUS_ICON: Record<string, string> = {
  [STATUS.ACTIVE]: 'check-circle',
  [STATUS.INACTIVE]: 'circle',
  [STATUS.PENDING]: 'clock',
  [STATUS.SUSPENDED]: 'ban',
  [STATUS.DELETED]: 'trash',
  [STATUS.ARCHIVED]: 'archive',
  [STATUS.DRAFT]: 'edit',
  [STATUS.PUBLISHED]: 'globe',
  [STATUS.UNPUBLISHED]: 'eye-slash',
  [STATUS.SCHEDULED]: 'calendar-clock',
  [STATUS.EXPIRED]: 'calendar-times',
  [STATUS.CANCELLED]: 'times',
  [STATUS.COMPLETED]: 'check-double',
  [STATUS.FAILED]: 'exclamation-triangle',
  [STATUS.SUCCESS]: 'check',
  [STATUS.PROCESSING]: 'spinner',
  [STATUS.INITIATED]: 'play',
  [STATUS.CONFIRMED]: 'check-circle',
  [STATUS.REJECTED]: 'times-circle',
  [STATUS.APPROVED]: 'check-circle',
  [STATUS.REVIEW]: 'eye',
  [STATUS.ON_HOLD]: 'pause',
  [STATUS.PAUSED]: 'pause-circle',
  [STATUS.RESUMED]: 'play-circle',
  [STATUS.LOCKED]: 'lock',
  [STATUS.UNLOCKED]: 'lock-open',
  [STATUS.VERIFIED]: 'badge-check',
  [STATUS.UNVERIFIED]: 'question',
  [STATUS.BLOCKED]: 'ban',
  [STATUS.ENABLED]: 'power-on',
  [STATUS.DISABLED]: 'power-off',
  [STATUS.OPEN]: 'folder-open',
  [STATUS.CLOSED]: 'folder',
  [STATUS.AVAILABLE]: 'check',
  [STATUS.UNAVAILABLE]: 'times',
  [STATUS.IN_STOCK]: 'box',
  [STATUS.OUT_OF_STOCK]: 'box-open',
  [STATUS.PRE_ORDER]: 'clock',
  [STATUS.BACK_ORDER]: 'clock',
  [STATUS.DISCONTINUED]: 'stop',
  [STATUS.NEW]: 'star',
  [STATUS.USED]: 'history',
  [STATUS.REFURBISHED]: 'sync',
  [STATUS.RENTED]: 'hand',
  [STATUS.LEASED]: 'handshake',
};

/**
 * Status label mapping for UI
 */
export const STATUS_LABEL: Record<string, string> = {
  [STATUS.ACTIVE]: 'Active',
  [STATUS.INACTIVE]: 'Inactive',
  [STATUS.PENDING]: 'Pending',
  [STATUS.SUSPENDED]: 'Suspended',
  [STATUS.DELETED]: 'Deleted',
  [STATUS.ARCHIVED]: 'Archived',
  [STATUS.DRAFT]: 'Draft',
  [STATUS.PUBLISHED]: 'Published',
  [STATUS.UNPUBLISHED]: 'Unpublished',
  [STATUS.SCHEDULED]: 'Scheduled',
  [STATUS.EXPIRED]: 'Expired',
  [STATUS.CANCELLED]: 'Cancelled',
  [STATUS.COMPLETED]: 'Completed',
  [STATUS.FAILED]: 'Failed',
  [STATUS.SUCCESS]: 'Success',
  [STATUS.PROCESSING]: 'Processing',
  [STATUS.INITIATED]: 'Initiated',
  [STATUS.CONFIRMED]: 'Confirmed',
  [STATUS.REJECTED]: 'Rejected',
  [STATUS.APPROVED]: 'Approved',
  [STATUS.REVIEW]: 'Review',
  [STATUS.ON_HOLD]: 'On Hold',
  [STATUS.PAUSED]: 'Paused',
  [STATUS.RESUMED]: 'Resumed',
  [STATUS.LOCKED]: 'Locked',
  [STATUS.UNLOCKED]: 'Unlocked',
  [STATUS.VERIFIED]: 'Verified',
  [STATUS.UNVERIFIED]: 'Unverified',
  [STATUS.BLOCKED]: 'Blocked',
  [STATUS.ENABLED]: 'Enabled',
  [STATUS.DISABLED]: 'Disabled',
  [STATUS.OPEN]: 'Open',
  [STATUS.CLOSED]: 'Closed',
  [STATUS.AVAILABLE]: 'Available',
  [STATUS.UNAVAILABLE]: 'Unavailable',
  [STATUS.IN_STOCK]: 'In Stock',
  [STATUS.OUT_OF_STOCK]: 'Out of Stock',
  [STATUS.PRE_ORDER]: 'Pre-Order',
  [STATUS.BACK_ORDER]: 'Back Order',
  [STATUS.DISCONTINUED]: 'Discontinued',
  [STATUS.NEW]: 'New',
  [STATUS.USED]: 'Used',
  [STATUS.REFURBISHED]: 'Refurbished',
  [STATUS.RENTED]: 'Rented',
  [STATUS.LEASED]: 'Leased',
};

/**
 * Status priority for sorting
 */
export const STATUS_PRIORITY: Record<string, number> = {
  [STATUS.ACTIVE]: 1,
  [STATUS.PENDING]: 2,
  [STATUS.PROCESSING]: 3,
  [STATUS.INITIATED]: 4,
  [STATUS.CONFIRMED]: 5,
  [STATUS.APPROVED]: 6,
  [STATUS.REVIEW]: 7,
  [STATUS.ON_HOLD]: 8,
  [STATUS.PAUSED]: 9,
  [STATUS.RESUMED]: 10,
  [STATUS.COMPLETED]: 11,
  [STATUS.SUCCESS]: 12,
  [STATUS.FAILED]: 13,
  [STATUS.REJECTED]: 14,
  [STATUS.CANCELLED]: 15,
  [STATUS.EXPIRED]: 16,
  [STATUS.SUSPENDED]: 17,
  [STATUS.BLOCKED]: 18,
  [STATUS.LOCKED]: 19,
  [STATUS.INACTIVE]: 20,
  [STATUS.DISABLED]: 21,
  [STATUS.DELETED]: 22,
  [STATUS.ARCHIVED]: 23,
  [STATUS.DRAFT]: 24,
  [STATUS.UNPUBLISHED]: 25,
  [STATUS.UNVERIFIED]: 26,
  [STATUS.CLOSED]: 27,
  [STATUS.UNAVAILABLE]: 28,
  [STATUS.OUT_OF_STOCK]: 29,
  [STATUS.DISCONTINUED]: 30,
  [STATUS.PRE_ORDER]: 31,
  [STATUS.BACK_ORDER]: 32,
  [STATUS.USED]: 33,
  [STATUS.REFURBISHED]: 34,
  [STATUS.RENTED]: 35,
  [STATUS.LEASED]: 36,
  [STATUS.NEW]: 37,
  [STATUS.VERIFIED]: 38,
  [STATUS.ENABLED]: 39,
  [STATUS.OPEN]: 40,
  [STATUS.AVAILABLE]: 41,
  [STATUS.IN_STOCK]: 42,
  [STATUS.UNLOCKED]: 43,
  [STATUS.PUBLISHED]: 44,
  [STATUS.SCHEDULED]: 45,
};

/**
 * Check if status is active
 */
export function isActiveStatus(status: string): boolean {
  const activeStatuses: string[] = [
    STATUS.ACTIVE,
    STATUS.PUBLISHED,
    STATUS.CONFIRMED,
    STATUS.APPROVED,
    STATUS.VERIFIED,
    STATUS.ENABLED,
    STATUS.OPEN,
    STATUS.AVAILABLE,
    STATUS.IN_STOCK,
    STATUS.NEW,
  ];
  return activeStatuses.includes(status);
}

/**
 * Check if status is inactive
 */
export function isInactiveStatus(status: string): boolean {
  const inactiveStatuses: string[] = [
    STATUS.INACTIVE,
    STATUS.SUSPENDED,
    STATUS.DELETED,
    STATUS.ARCHIVED,
    STATUS.UNPUBLISHED,
    STATUS.EXPIRED,
    STATUS.CANCELLED,
    STATUS.FAILED,
    STATUS.REJECTED,
    STATUS.LOCKED,
    STATUS.UNVERIFIED,
    STATUS.BLOCKED,
    STATUS.DISABLED,
    STATUS.CLOSED,
    STATUS.UNAVAILABLE,
    STATUS.OUT_OF_STOCK,
    STATUS.DISCONTINUED,
    STATUS.USED,
  ];
  return inactiveStatuses.includes(status);
}

/**
 * Check if status is transitional
 */
export function isTransitionalStatus(status: string): boolean {
  const transitionalStatuses: string[] = [
    STATUS.PENDING,
    STATUS.DRAFT,
    STATUS.SCHEDULED,
    STATUS.PROCESSING,
    STATUS.INITIATED,
    STATUS.REVIEW,
    STATUS.ON_HOLD,
    STATUS.PAUSED,
    STATUS.RESUMED,
    STATUS.PRE_ORDER,
    STATUS.BACK_ORDER,
    STATUS.REFURBISHED,
    STATUS.RENTED,
    STATUS.LEASED,
  ];
  return transitionalStatuses.includes(status);
}

/**
 * Check if status is terminal
 */
export function isTerminalStatus(status: string): boolean {
  const terminalStatuses: string[] = [
    STATUS.COMPLETED,
    STATUS.SUCCESS,
    STATUS.DELETED,
    STATUS.ARCHIVED,
    STATUS.CANCELLED,
    STATUS.REJECTED,
    STATUS.EXPIRED,
    STATUS.FAILED,
    STATUS.CLOSED,
    STATUS.DISCONTINUED,
  ];
  return terminalStatuses.includes(status);
}

/**
 * Get status category
 */
export function getStatusCategory(status: string): keyof typeof STATUS_CATEGORY {
  if (isActiveStatus(status)) {
    return 'ACTIVE';
  }
  if (isInactiveStatus(status)) {
    return 'INACTIVE';
  }
  if (isTransitionalStatus(status)) {
    return 'TRANSITIONAL';
  }
  if (isTerminalStatus(status)) {
    return 'TERMINAL';
  }
  return 'INACTIVE';
}

/**
 * Get status color for UI
 */
export function getStatusColor(status: string): string {
  return STATUS_COLOR[status] || 'default';
}

/**
 * Get status icon for UI
 */
export function getStatusIcon(status: string): string {
  return STATUS_ICON[status] || 'circle';
}

/**
 * Get status label for UI
 */
export function getStatusLabel(status: string): string {
  return STATUS_LABEL[status] || status;
}

/**
 * Get status priority
 */
export function getStatusPriority(status: string): number {
  return STATUS_PRIORITY[status] || 999;
}

/**
 * Check if status is valid
 */
export function isValidStatus(status: string): boolean {
  return Object.values(STATUS).includes(status as (typeof STATUS)[keyof typeof STATUS]);
}

/**
 * Get all active statuses
 */
export function getActiveStatuses(): string[] {
  return Object.values(STATUS).filter(isActiveStatus);
}

/**
 * Get all inactive statuses
 */
export function getInactiveStatuses(): string[] {
  return Object.values(STATUS).filter(isInactiveStatus);
}

/**
 * Get all transitional statuses
 */
export function getTransitionalStatuses(): string[] {
  return Object.values(STATUS).filter(isTransitionalStatus);
}

/**
 * Get all terminal statuses
 */
export function getTerminalStatuses(): string[] {
  return Object.values(STATUS).filter(isTerminalStatus);
}

/**
 * Status transition validation
 */
export interface StatusTransition {
  from: string;
  to: string;
  allowed: boolean;
}

/**
 * Validate status transition
 */
export function validateStatusTransition(
  currentStatus: string,
  newStatus: string,
  allowedTransitions?: StatusTransition[]
): boolean {
  // If no allowed transitions provided, allow all
  if (!allowedTransitions || allowedTransitions.length === 0) {
    return true;
  }

  const transition = allowedTransitions.find((t) => t.from === currentStatus && t.to === newStatus);

  return transition?.allowed || false;
}

/**
 * Common status transitions
 */
export const COMMON_STATUS_TRANSITIONS: StatusTransition[] = [
  { from: STATUS.DRAFT, to: STATUS.PENDING, allowed: true },
  { from: STATUS.DRAFT, to: STATUS.PUBLISHED, allowed: true },
  { from: STATUS.DRAFT, to: STATUS.ARCHIVED, allowed: true },

  { from: STATUS.PENDING, to: STATUS.APPROVED, allowed: true },
  { from: STATUS.PENDING, to: STATUS.REJECTED, allowed: true },
  { from: STATUS.PENDING, to: STATUS.CANCELLED, allowed: true },

  { from: STATUS.PUBLISHED, to: STATUS.UNPUBLISHED, allowed: true },
  { from: STATUS.PUBLISHED, to: STATUS.ARCHIVED, allowed: true },
  { from: STATUS.PUBLISHED, to: STATUS.EXPIRED, allowed: true },

  { from: STATUS.APPROVED, to: STATUS.ACTIVE, allowed: true },
  { from: STATUS.APPROVED, to: STATUS.SUSPENDED, allowed: true },

  { from: STATUS.ACTIVE, to: STATUS.SUSPENDED, allowed: true },
  { from: STATUS.ACTIVE, to: STATUS.INACTIVE, allowed: true },
  { from: STATUS.ACTIVE, to: STATUS.BLOCKED, allowed: true },

  { from: STATUS.SUSPENDED, to: STATUS.ACTIVE, allowed: true },
  { from: STATUS.SUSPENDED, to: STATUS.DELETED, allowed: true },

  { from: STATUS.INACTIVE, to: STATUS.ACTIVE, allowed: true },
  { from: STATUS.INACTIVE, to: STATUS.DELETED, allowed: true },

  { from: STATUS.ON_HOLD, to: STATUS.RESUMED, allowed: true },
  { from: STATUS.ON_HOLD, to: STATUS.PAUSED, allowed: true },
  { from: STATUS.ON_HOLD, to: STATUS.CANCELLED, allowed: true },

  { from: STATUS.PAUSED, to: STATUS.RESUMED, allowed: true },
  { from: STATUS.PAUSED, to: STATUS.CANCELLED, allowed: true },

  { from: STATUS.RESUMED, to: STATUS.ACTIVE, allowed: true },
  { from: STATUS.RESUMED, to: STATUS.PAUSED, allowed: true },

  { from: STATUS.PROCESSING, to: STATUS.COMPLETED, allowed: true },
  { from: STATUS.PROCESSING, to: STATUS.FAILED, allowed: true },
  { from: STATUS.PROCESSING, to: STATUS.CANCELLED, allowed: true },

  { from: STATUS.INITIATED, to: STATUS.PROCESSING, allowed: true },
  { from: STATUS.INITIATED, to: STATUS.CANCELLED, allowed: true },

  { from: STATUS.CONFIRMED, to: STATUS.PROCESSING, allowed: true },
  { from: STATUS.CONFIRMED, to: STATUS.CANCELLED, allowed: true },

  { from: STATUS.COMPLETED, to: STATUS.ARCHIVED, allowed: true },
  { from: STATUS.COMPLETED, to: STATUS.DELETED, allowed: true },

  { from: STATUS.FAILED, to: STATUS.PENDING, allowed: true },
  { from: STATUS.FAILED, to: STATUS.CANCELLED, allowed: true },

  { from: STATUS.REVIEW, to: STATUS.APPROVED, allowed: true },
  { from: STATUS.REVIEW, to: STATUS.REJECTED, allowed: true },

  { from: STATUS.LOCKED, to: STATUS.UNLOCKED, allowed: true },
  { from: STATUS.UNLOCKED, to: STATUS.LOCKED, allowed: true },

  { from: STATUS.BLOCKED, to: STATUS.ACTIVE, allowed: true },
  { from: STATUS.ACTIVE, to: STATUS.BLOCKED, allowed: true },

  { from: STATUS.OPEN, to: STATUS.CLOSED, allowed: true },
  { from: STATUS.CLOSED, to: STATUS.OPEN, allowed: true },

  { from: STATUS.AVAILABLE, to: STATUS.UNAVAILABLE, allowed: true },
  { from: STATUS.UNAVAILABLE, to: STATUS.AVAILABLE, allowed: true },

  { from: STATUS.IN_STOCK, to: STATUS.OUT_OF_STOCK, allowed: true },
  { from: STATUS.IN_STOCK, to: STATUS.PRE_ORDER, allowed: true },
  { from: STATUS.IN_STOCK, to: STATUS.BACK_ORDER, allowed: true },

  { from: STATUS.OUT_OF_STOCK, to: STATUS.IN_STOCK, allowed: true },
  { from: STATUS.OUT_OF_STOCK, to: STATUS.DISCONTINUED, allowed: true },

  { from: STATUS.PRE_ORDER, to: STATUS.IN_STOCK, allowed: true },
  { from: STATUS.PRE_ORDER, to: STATUS.OUT_OF_STOCK, allowed: true },

  { from: STATUS.BACK_ORDER, to: STATUS.IN_STOCK, allowed: true },
  { from: STATUS.BACK_ORDER, to: STATUS.OUT_OF_STOCK, allowed: true },

  { from: STATUS.DISCONTINUED, to: STATUS.ARCHIVED, allowed: true },
  { from: STATUS.DISCONTINUED, to: STATUS.DELETED, allowed: true },
];

/**
 * Get allowed next statuses for a given status
 */
export function getAllowedNextStatuses(
  currentStatus: string,
  allowedTransitions: StatusTransition[] = COMMON_STATUS_TRANSITIONS
): string[] {
  return allowedTransitions.filter((t) => t.from === currentStatus && t.allowed).map((t) => t.to);
}

/**
 * Check if status transition is allowed
 */
export function canTransitionTo(
  currentStatus: string,
  nextStatus: string,
  allowedTransitions: StatusTransition[] = COMMON_STATUS_TRANSITIONS
): boolean {
  return allowedTransitions.some(
    (t) => t.from === currentStatus && t.to === nextStatus && t.allowed
  );
}
