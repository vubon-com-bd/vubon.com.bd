export const ANALYTICS_EVENT = {
  PAGE_VIEW: 'page_view',
  SESSION_START: 'session_start',
  SESSION_END: 'session_end',
  CLICK: 'click',
  SCROLL: 'scroll',
  FORM_SUBMIT: 'form_submit',
  SIGN_UP: 'sign_up',
  LOGIN: 'login',
  LOGOUT: 'logout',
  SEARCH: 'search',
  VIEW_ITEM: 'view_item',
  ADD_TO_CART: 'add_to_cart',
  REMOVE_FROM_CART: 'remove_from_cart',
  BEGIN_CHECKOUT: 'begin_checkout',
  ADD_PAYMENT_INFO: 'add_payment_info',
  PURCHASE: 'purchase',
  REFUND: 'refund',
  SHARE: 'share',
  DOWNLOAD: 'download',
  VIDEO_PLAY: 'video_play',
  VIDEO_COMPLETE: 'video_complete',
  ERROR: 'error',
} as const;

export const ANALYTICS_EVENT_CATEGORY = {
  ENGAGEMENT: 'engagement',
  ECOMMERCE: 'ecommerce',
  AUTH: 'auth',
  NAVIGATION: 'navigation',
  CONTENT: 'content',
  SYSTEM: 'system',
} as const;

export type AnalyticsEventType = (typeof ANALYTICS_EVENT)[keyof typeof ANALYTICS_EVENT];
export type AnalyticsEventCategoryType =
  (typeof ANALYTICS_EVENT_CATEGORY)[keyof typeof ANALYTICS_EVENT_CATEGORY];
