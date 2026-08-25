/**
 * Admin Analytics Status Constants
 * Status-specific constants for admin analytics
 * @module AdminAnalyticsStatusConstants
 */

/**
 * Admin analytics status (detailed)
 */
export const ADMIN_ANALYTICS_STATUS = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
  EXPIRED: 'EXPIRED',
} as const;

/**
 * Admin analytics status labels (detailed)
 */
export const ADMIN_ANALYTICS_STATUS_LABELS_DETAIL = {
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  COMPLETED: 'Completed',
  FAILED: 'Failed',
  CANCELLED: 'Cancelled',
  EXPIRED: 'Expired',
} as const;

/**
 * Admin analytics status colors (detailed)
 */
export const ADMIN_ANALYTICS_STATUS_COLORS_DETAIL = {
  PENDING: '#FBBF24',
  PROCESSING: '#60A5FA',
  COMPLETED: '#34D399',
  FAILED: '#F87171',
  CANCELLED: '#9CA3AF',
  EXPIRED: '#F59E0B',
} as const;

/**
 * Admin analytics status groups
 */
export const ADMIN_ANALYTICS_STATUS_GROUPS = {
  ACTIVE: ['PENDING', 'PROCESSING'],
  COMPLETED: ['COMPLETED'],
  FAILED: ['FAILED', 'CANCELLED', 'EXPIRED'],
  TERMINAL: ['COMPLETED', 'FAILED', 'CANCELLED', 'EXPIRED'],
} as const;

// ============================================================
// Types
// ============================================================

/**
 * Admin analytics status detail
 */
export type AdminAnalyticsStatusDetail = keyof typeof ADMIN_ANALYTICS_STATUS;

// ============================================================
// Helper Functions
// ============================================================

/**
 * Get analytics status label (detailed)
 */
export const getAdminAnalyticsStatusLabel = (status: AdminAnalyticsStatusDetail): string =>
  ADMIN_ANALYTICS_STATUS_LABELS_DETAIL[status] || status;

/**
 * Get analytics status color (detailed)
 */
export const getAdminAnalyticsStatusColor = (status: AdminAnalyticsStatusDetail): string =>
  ADMIN_ANALYTICS_STATUS_COLORS_DETAIL[status] || '#6B7280';

/**
 * Check if analytics status is active (pending or processing)
 */
export const isAdminAnalyticsActiveStatus = (status: AdminAnalyticsStatusDetail): boolean =>
  status === 'PENDING' || status === 'PROCESSING';

/**
 * Check if analytics status is completed
 */
export const isAdminAnalyticsCompletedStatus = (status: AdminAnalyticsStatusDetail): boolean =>
  status === 'COMPLETED';

/**
 * Check if analytics status is failed
 */
export const isAdminAnalyticsFailedStatus = (status: AdminAnalyticsStatusDetail): boolean =>
  status === 'FAILED' || status === 'CANCELLED' || status === 'EXPIRED';

/**
 * Check if analytics status is terminal
 */
export const isAdminAnalyticsTerminalStatus = (status: AdminAnalyticsStatusDetail): boolean =>
  status === 'COMPLETED' || status === 'FAILED' || status === 'CANCELLED' || status === 'EXPIRED';

/**
 * Get analytics status priority (for ordering)
 */
export const getAdminAnalyticsStatusPriority = (status: AdminAnalyticsStatusDetail): number => {
  const priorities = {
    PENDING: 0,
    PROCESSING: 1,
    COMPLETED: 2,
    FAILED: 3,
    CANCELLED: 4,
    EXPIRED: 5,
  };
  return priorities[status] ?? 9;
};

/**
 * Get all analytics statuses
 */
export const getAdminAnalyticsStatuses = (): AdminAnalyticsStatusDetail[] =>
  Object.keys(ADMIN_ANALYTICS_STATUS) as AdminAnalyticsStatusDetail[];

/**
 * Get active analytics statuses
 */
export const getAdminAnalyticsActiveStatuses = (): AdminAnalyticsStatusDetail[] => [
  'PENDING',
  'PROCESSING',
];

/**
 * Get completed analytics statuses
 */
export const getAdminAnalyticsCompletedStatuses = (): AdminAnalyticsStatusDetail[] => ['COMPLETED'];

/**
 * Get failed analytics statuses
 */
export const getAdminAnalyticsFailedStatuses = (): AdminAnalyticsStatusDetail[] => [
  'FAILED',
  'CANCELLED',
  'EXPIRED',
];

/**
 * Get terminal analytics statuses
 */
export const getAdminAnalyticsTerminalStatuses = (): AdminAnalyticsStatusDetail[] => [
  'COMPLETED',
  'FAILED',
  'CANCELLED',
  'EXPIRED',
];
