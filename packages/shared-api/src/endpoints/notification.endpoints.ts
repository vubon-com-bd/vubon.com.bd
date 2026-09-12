/**
 * Notification API endpoint paths.
 * @module shared-api/endpoints/notification
 */

export const NOTIFICATION_ENDPOINTS = {
  LIST: '/notifications',
  SEND: '/notifications',
  GET: (notificationId: string) => `/notifications/${notificationId}`,
  MARK_READ: (notificationId: string) => `/notifications/${notificationId}/read`,
  MARK_ALL_READ: '/notifications/read-all',
  DELETE: (notificationId: string) => `/notifications/${notificationId}`,
  CLEAR_ALL: '/notifications/clear-all',
  UNREAD_COUNT: '/notifications/unread-count',
  SETTINGS: '/notifications/settings',
  SUBSCRIBE: '/notifications/subscribe',
  UNSUBSCRIBE: '/notifications/unsubscribe',
} as const;
