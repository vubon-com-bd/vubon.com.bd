export const IN_APP_TYPE = {
  TOAST: 'toast',
  BANNER: 'banner',
  MODAL: 'modal',
  SNACKBAR: 'snackbar',
  POPUP: 'popup',
  BADGE: 'badge',
  INBOX: 'inbox',
  BELL: 'bell',
  FULL_SCREEN: 'full_screen',
} as const;

export const IN_APP_POSITION = {
  TOP_LEFT: 'top_left',
  TOP_CENTER: 'top_center',
  TOP_RIGHT: 'top_right',
  CENTER: 'center',
  BOTTOM_LEFT: 'bottom_left',
  BOTTOM_CENTER: 'bottom_center',
  BOTTOM_RIGHT: 'bottom_right',
} as const;

export const IN_APP_STATUS = {
  PENDING: 'pending',
  SHOWN: 'shown',
  DISMISSED: 'dismissed',
  CLICKED: 'clicked',
  EXPIRED: 'expired',
  FAILED: 'failed',
} as const;

export const IN_APP = {
  TITLE_MAX_LENGTH: 100,
  BODY_MAX_LENGTH: 500,
  MAX_ACTIONS: 2,
  DISPLAY_DURATION_SECONDS: 5,
  AUTO_DISMISS: true,
  MAX_IN_INBOX: 500,
  RETENTION_DAYS: 90,
  POLLING_INTERVAL_SECONDS: 30,
  WEBSOCKET_ENABLED: true,
} as const;

export type InAppTypeType = (typeof IN_APP_TYPE)[keyof typeof IN_APP_TYPE];
export type InAppPositionType = (typeof IN_APP_POSITION)[keyof typeof IN_APP_POSITION];
export type InAppStatusType = (typeof IN_APP_STATUS)[keyof typeof IN_APP_STATUS];
