/**
 * Analytics Event Constants
 * Event types and tracking categories for analytics
 */

export const ANALYTICS_EVENT = {
  // Event Categories
  CATEGORIES: {
    // User Events
    USER: 'user',
    USER_LOGIN: 'user_login',
    USER_LOGOUT: 'user_logout',
    USER_SIGNUP: 'user_signup',
    USER_VERIFICATION: 'user_verification',
    USER_PROFILE: 'user_profile',
    USER_PREFERENCES: 'user_preferences',

    // Product Events
    PRODUCT: 'product',
    PRODUCT_VIEW: 'product_view',
    PRODUCT_SEARCH: 'product_search',
    PRODUCT_FILTER: 'product_filter',
    PRODUCT_COMPARE: 'product_compare',
    PRODUCT_WISHLIST: 'product_wishlist',
    PRODUCT_REVIEW: 'product_review',
    PRODUCT_RATING: 'product_rating',

    // Cart Events
    CART: 'cart',
    CART_ADD: 'cart_add',
    CART_REMOVE: 'cart_remove',
    CART_UPDATE: 'cart_update',
    CART_VIEW: 'cart_view',
    CART_ABANDON: 'cart_abandon',

    // Checkout Events
    CHECKOUT: 'checkout',
    CHECKOUT_START: 'checkout_start',
    CHECKOUT_STEP: 'checkout_step',
    CHECKOUT_COMPLETE: 'checkout_complete',
    CHECKOUT_FAIL: 'checkout_fail',

    // Order Events
    ORDER: 'order',
    ORDER_PLACE: 'order_place',
    ORDER_CANCEL: 'order_cancel',
    ORDER_RETURN: 'order_return',
    ORDER_STATUS: 'order_status',

    // Payment Events
    PAYMENT: 'payment',
    PAYMENT_INITIATE: 'payment_initiate',
    PAYMENT_SUCCESS: 'payment_success',
    PAYMENT_FAIL: 'payment_fail',
    PAYMENT_REFUND: 'payment_refund',

    // Marketing Events
    MARKETING: 'marketing',
    CAMPAIGN_VIEW: 'campaign_view',
    CAMPAIGN_CLICK: 'campaign_click',
    CAMPAIGN_CONVERT: 'campaign_convert',
    REFERRAL: 'referral',
    SHARE: 'share',

    // Engagement Events
    ENGAGEMENT: 'engagement',
    PAGE_VIEW: 'page_view',
    SCROLL: 'scroll',
    CLICK: 'click',
    HOVER: 'hover',
    VIDEO_PLAY: 'video_play',
    VIDEO_PAUSE: 'video_pause',
    VIDEO_COMPLETE: 'video_complete',

    // Social Events
    SOCIAL: 'social',
    SOCIAL_SHARE: 'social_share',
    SOCIAL_LIKE: 'social_like',
    SOCIAL_COMMENT: 'social_comment',
    SOCIAL_FOLLOW: 'social_follow',

    // System Events
    SYSTEM: 'system',
    ERROR: 'error',
    PERFORMANCE: 'performance',
    SECURITY: 'security',
    MAINTENANCE: 'maintenance',
  } as const,

  // Event Actions
  ACTIONS: {
    VIEW: 'view',
    CLICK: 'click',
    TAP: 'tap',
    SWIPE: 'swipe',
    DRAG: 'drag',
    DROP: 'drop',
    SCROLL: 'scroll',
    HOVER: 'hover',
    FOCUS: 'focus',
    BLUR: 'blur',
    CHANGE: 'change',
    SUBMIT: 'submit',
    RESET: 'reset',
    CANCEL: 'cancel',
    CONFIRM: 'confirm',
    START: 'start',
    STOP: 'stop',
    PAUSE: 'pause',
    RESUME: 'resume',
    COMPLETE: 'complete',
    FAIL: 'fail',
    SUCCESS: 'success',
    ERROR: 'error',
  } as const,

  // Event Labels
  LABELS: {
    // User Labels
    LOGIN: 'login',
    LOGOUT: 'logout',
    SIGNUP: 'signup',
    VERIFY: 'verify',
    UPDATE: 'update',
    DELETE: 'delete',

    // Product Labels
    VIEW: 'view',
    SEARCH: 'search',
    FILTER: 'filter',
    COMPARE: 'compare',
    ADD_TO_WISHLIST: 'add_to_wishlist',
    REMOVE_FROM_WISHLIST: 'remove_from_wishlist',
    ADD_REVIEW: 'add_review',
    ADD_RATING: 'add_rating',

    // Cart Labels
    ADD_ITEM: 'add_item',
    REMOVE_ITEM: 'remove_item',
    UPDATE_ITEM: 'update_item',
    CLEAR_CART: 'clear_cart',

    // Checkout Labels
    START_CHECKOUT: 'start_checkout',
    COMPLETE_CHECKOUT: 'complete_checkout',
    FAIL_CHECKOUT: 'fail_checkout',

    // Payment Labels
    INITIATE: 'initiate',
    SUCCESS: 'success',
    FAIL: 'fail',
    REFUND: 'refund',

    // Marketing Labels
    VIEW_CAMPAIGN: 'view_campaign',
    CLICK_CAMPAIGN: 'click_campaign',
    CONVERT_CAMPAIGN: 'convert_campaign',
    SHARE_CONTENT: 'share_content',

    // Engagement Labels
    VIEW_PAGE: 'view_page',
    SCROLL_PAGE: 'scroll_page',
    CLICK_ELEMENT: 'click_element',
    PLAY_VIDEO: 'play_video',
    PAUSE_VIDEO: 'pause_video',
    COMPLETE_VIDEO: 'complete_video',

    // Social Labels
    SHARE: 'share',
    LIKE: 'like',
    COMMENT: 'comment',
    FOLLOW: 'follow',
  } as const,

  // Event Values
  VALUES: {
    // Numeric Values
    VALUE_1: 1,
    VALUE_2: 2,
    VALUE_3: 3,
    VALUE_4: 4,
    VALUE_5: 5,

    // Boolean Values
    TRUE: 1,
    FALSE: 0,
  } as const,

  // Event Priority
  PRIORITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,

  // Event Status
  STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    DROPPED: 'dropped',
  } as const,
} as const;

// Analytics Event Categories
export type AnalyticsEventCategory =
  (typeof ANALYTICS_EVENT.CATEGORIES)[keyof typeof ANALYTICS_EVENT.CATEGORIES];

// Analytics Event Actions
export type AnalyticsEventAction =
  (typeof ANALYTICS_EVENT.ACTIONS)[keyof typeof ANALYTICS_EVENT.ACTIONS];

// Analytics Event Labels
export type AnalyticsEventLabel =
  (typeof ANALYTICS_EVENT.LABELS)[keyof typeof ANALYTICS_EVENT.LABELS];

// Analytics Event Values
export type AnalyticsEventValue =
  (typeof ANALYTICS_EVENT.VALUES)[keyof typeof ANALYTICS_EVENT.VALUES];

// Analytics Event Priority
export type AnalyticsEventPriority =
  (typeof ANALYTICS_EVENT.PRIORITY)[keyof typeof ANALYTICS_EVENT.PRIORITY];

// Analytics Event Status
export type AnalyticsEventStatus =
  (typeof ANALYTICS_EVENT.STATUS)[keyof typeof ANALYTICS_EVENT.STATUS];

// Analytics Event Category Labels
export function getAnalyticsEventCategoryLabel(category: AnalyticsEventCategory): string {
  const labels: Record<AnalyticsEventCategory, string> = {
    [ANALYTICS_EVENT.CATEGORIES.USER]: 'User',
    [ANALYTICS_EVENT.CATEGORIES.USER_LOGIN]: 'User Login',
    [ANALYTICS_EVENT.CATEGORIES.USER_LOGOUT]: 'User Logout',
    [ANALYTICS_EVENT.CATEGORIES.USER_SIGNUP]: 'User Signup',
    [ANALYTICS_EVENT.CATEGORIES.USER_VERIFICATION]: 'User Verification',
    [ANALYTICS_EVENT.CATEGORIES.USER_PROFILE]: 'User Profile',
    [ANALYTICS_EVENT.CATEGORIES.USER_PREFERENCES]: 'User Preferences',
    [ANALYTICS_EVENT.CATEGORIES.PRODUCT]: 'Product',
    [ANALYTICS_EVENT.CATEGORIES.PRODUCT_VIEW]: 'Product View',
    [ANALYTICS_EVENT.CATEGORIES.PRODUCT_SEARCH]: 'Product Search',
    [ANALYTICS_EVENT.CATEGORIES.PRODUCT_FILTER]: 'Product Filter',
    [ANALYTICS_EVENT.CATEGORIES.PRODUCT_COMPARE]: 'Product Compare',
    [ANALYTICS_EVENT.CATEGORIES.PRODUCT_WISHLIST]: 'Product Wishlist',
    [ANALYTICS_EVENT.CATEGORIES.PRODUCT_REVIEW]: 'Product Review',
    [ANALYTICS_EVENT.CATEGORIES.PRODUCT_RATING]: 'Product Rating',
    [ANALYTICS_EVENT.CATEGORIES.CART]: 'Cart',
    [ANALYTICS_EVENT.CATEGORIES.CART_ADD]: 'Cart Add',
    [ANALYTICS_EVENT.CATEGORIES.CART_REMOVE]: 'Cart Remove',
    [ANALYTICS_EVENT.CATEGORIES.CART_UPDATE]: 'Cart Update',
    [ANALYTICS_EVENT.CATEGORIES.CART_VIEW]: 'Cart View',
    [ANALYTICS_EVENT.CATEGORIES.CART_ABANDON]: 'Cart Abandon',
    [ANALYTICS_EVENT.CATEGORIES.CHECKOUT]: 'Checkout',
    [ANALYTICS_EVENT.CATEGORIES.CHECKOUT_START]: 'Checkout Start',
    [ANALYTICS_EVENT.CATEGORIES.CHECKOUT_STEP]: 'Checkout Step',
    [ANALYTICS_EVENT.CATEGORIES.CHECKOUT_COMPLETE]: 'Checkout Complete',
    [ANALYTICS_EVENT.CATEGORIES.CHECKOUT_FAIL]: 'Checkout Fail',
    [ANALYTICS_EVENT.CATEGORIES.ORDER]: 'Order',
    [ANALYTICS_EVENT.CATEGORIES.ORDER_PLACE]: 'Order Place',
    [ANALYTICS_EVENT.CATEGORIES.ORDER_CANCEL]: 'Order Cancel',
    [ANALYTICS_EVENT.CATEGORIES.ORDER_RETURN]: 'Order Return',
    [ANALYTICS_EVENT.CATEGORIES.ORDER_STATUS]: 'Order Status',
    [ANALYTICS_EVENT.CATEGORIES.PAYMENT]: 'Payment',
    [ANALYTICS_EVENT.CATEGORIES.PAYMENT_INITIATE]: 'Payment Initiate',
    [ANALYTICS_EVENT.CATEGORIES.PAYMENT_SUCCESS]: 'Payment Success',
    [ANALYTICS_EVENT.CATEGORIES.PAYMENT_FAIL]: 'Payment Fail',
    [ANALYTICS_EVENT.CATEGORIES.PAYMENT_REFUND]: 'Payment Refund',
    [ANALYTICS_EVENT.CATEGORIES.MARKETING]: 'Marketing',
    [ANALYTICS_EVENT.CATEGORIES.CAMPAIGN_VIEW]: 'Campaign View',
    [ANALYTICS_EVENT.CATEGORIES.CAMPAIGN_CLICK]: 'Campaign Click',
    [ANALYTICS_EVENT.CATEGORIES.CAMPAIGN_CONVERT]: 'Campaign Convert',
    [ANALYTICS_EVENT.CATEGORIES.REFERRAL]: 'Referral',
    [ANALYTICS_EVENT.CATEGORIES.SHARE]: 'Share',
    [ANALYTICS_EVENT.CATEGORIES.ENGAGEMENT]: 'Engagement',
    [ANALYTICS_EVENT.CATEGORIES.PAGE_VIEW]: 'Page View',
    [ANALYTICS_EVENT.CATEGORIES.SCROLL]: 'Scroll',
    [ANALYTICS_EVENT.CATEGORIES.CLICK]: 'Click',
    [ANALYTICS_EVENT.CATEGORIES.HOVER]: 'Hover',
    [ANALYTICS_EVENT.CATEGORIES.VIDEO_PLAY]: 'Video Play',
    [ANALYTICS_EVENT.CATEGORIES.VIDEO_PAUSE]: 'Video Pause',
    [ANALYTICS_EVENT.CATEGORIES.VIDEO_COMPLETE]: 'Video Complete',
    [ANALYTICS_EVENT.CATEGORIES.SOCIAL]: 'Social',
    [ANALYTICS_EVENT.CATEGORIES.SOCIAL_SHARE]: 'Social Share',
    [ANALYTICS_EVENT.CATEGORIES.SOCIAL_LIKE]: 'Social Like',
    [ANALYTICS_EVENT.CATEGORIES.SOCIAL_COMMENT]: 'Social Comment',
    [ANALYTICS_EVENT.CATEGORIES.SOCIAL_FOLLOW]: 'Social Follow',
    [ANALYTICS_EVENT.CATEGORIES.SYSTEM]: 'System',
    [ANALYTICS_EVENT.CATEGORIES.ERROR]: 'Error',
    [ANALYTICS_EVENT.CATEGORIES.PERFORMANCE]: 'Performance',
    [ANALYTICS_EVENT.CATEGORIES.SECURITY]: 'Security',
    [ANALYTICS_EVENT.CATEGORIES.MAINTENANCE]: 'Maintenance',
  };
  return labels[category] || 'Unknown';
}

// Analytics Event Action Labels
export function getAnalyticsEventActionLabel(action: AnalyticsEventAction): string {
  const labels: Record<AnalyticsEventAction, string> = {
    [ANALYTICS_EVENT.ACTIONS.VIEW]: 'View',
    [ANALYTICS_EVENT.ACTIONS.CLICK]: 'Click',
    [ANALYTICS_EVENT.ACTIONS.TAP]: 'Tap',
    [ANALYTICS_EVENT.ACTIONS.SWIPE]: 'Swipe',
    [ANALYTICS_EVENT.ACTIONS.DRAG]: 'Drag',
    [ANALYTICS_EVENT.ACTIONS.DROP]: 'Drop',
    [ANALYTICS_EVENT.ACTIONS.SCROLL]: 'Scroll',
    [ANALYTICS_EVENT.ACTIONS.HOVER]: 'Hover',
    [ANALYTICS_EVENT.ACTIONS.FOCUS]: 'Focus',
    [ANALYTICS_EVENT.ACTIONS.BLUR]: 'Blur',
    [ANALYTICS_EVENT.ACTIONS.CHANGE]: 'Change',
    [ANALYTICS_EVENT.ACTIONS.SUBMIT]: 'Submit',
    [ANALYTICS_EVENT.ACTIONS.RESET]: 'Reset',
    [ANALYTICS_EVENT.ACTIONS.CANCEL]: 'Cancel',
    [ANALYTICS_EVENT.ACTIONS.CONFIRM]: 'Confirm',
    [ANALYTICS_EVENT.ACTIONS.START]: 'Start',
    [ANALYTICS_EVENT.ACTIONS.STOP]: 'Stop',
    [ANALYTICS_EVENT.ACTIONS.PAUSE]: 'Pause',
    [ANALYTICS_EVENT.ACTIONS.RESUME]: 'Resume',
    [ANALYTICS_EVENT.ACTIONS.COMPLETE]: 'Complete',
    [ANALYTICS_EVENT.ACTIONS.FAIL]: 'Fail',
    [ANALYTICS_EVENT.ACTIONS.SUCCESS]: 'Success',
    [ANALYTICS_EVENT.ACTIONS.ERROR]: 'Error',
  };
  return labels[action] || 'Unknown';
}

// Analytics Event Label Labels
export function getAnalyticsEventLabelName(label: AnalyticsEventLabel): string {
  const labels: Record<AnalyticsEventLabel, string> = {
    [ANALYTICS_EVENT.LABELS.LOGIN]: 'Login',
    [ANALYTICS_EVENT.LABELS.LOGOUT]: 'Logout',
    [ANALYTICS_EVENT.LABELS.SIGNUP]: 'Signup',
    [ANALYTICS_EVENT.LABELS.VERIFY]: 'Verify',
    [ANALYTICS_EVENT.LABELS.UPDATE]: 'Update',
    [ANALYTICS_EVENT.LABELS.DELETE]: 'Delete',
    [ANALYTICS_EVENT.LABELS.VIEW]: 'View',
    [ANALYTICS_EVENT.LABELS.SEARCH]: 'Search',
    [ANALYTICS_EVENT.LABELS.FILTER]: 'Filter',
    [ANALYTICS_EVENT.LABELS.COMPARE]: 'Compare',
    [ANALYTICS_EVENT.LABELS.ADD_TO_WISHLIST]: 'Add to Wishlist',
    [ANALYTICS_EVENT.LABELS.REMOVE_FROM_WISHLIST]: 'Remove from Wishlist',
    [ANALYTICS_EVENT.LABELS.ADD_REVIEW]: 'Add Review',
    [ANALYTICS_EVENT.LABELS.ADD_RATING]: 'Add Rating',
    [ANALYTICS_EVENT.LABELS.ADD_ITEM]: 'Add Item',
    [ANALYTICS_EVENT.LABELS.REMOVE_ITEM]: 'Remove Item',
    [ANALYTICS_EVENT.LABELS.UPDATE_ITEM]: 'Update Item',
    [ANALYTICS_EVENT.LABELS.CLEAR_CART]: 'Clear Cart',
    [ANALYTICS_EVENT.LABELS.START_CHECKOUT]: 'Start Checkout',
    [ANALYTICS_EVENT.LABELS.COMPLETE_CHECKOUT]: 'Complete Checkout',
    [ANALYTICS_EVENT.LABELS.FAIL_CHECKOUT]: 'Fail Checkout',
    [ANALYTICS_EVENT.LABELS.INITIATE]: 'Initiate',
    [ANALYTICS_EVENT.LABELS.SUCCESS]: 'Success',
    [ANALYTICS_EVENT.LABELS.FAIL]: 'Fail',
    [ANALYTICS_EVENT.LABELS.REFUND]: 'Refund',
    [ANALYTICS_EVENT.LABELS.VIEW_CAMPAIGN]: 'View Campaign',
    [ANALYTICS_EVENT.LABELS.CLICK_CAMPAIGN]: 'Click Campaign',
    [ANALYTICS_EVENT.LABELS.CONVERT_CAMPAIGN]: 'Convert Campaign',
    [ANALYTICS_EVENT.LABELS.SHARE_CONTENT]: 'Share Content',
    [ANALYTICS_EVENT.LABELS.VIEW_PAGE]: 'View Page',
    [ANALYTICS_EVENT.LABELS.SCROLL_PAGE]: 'Scroll Page',
    [ANALYTICS_EVENT.LABELS.CLICK_ELEMENT]: 'Click Element',
    [ANALYTICS_EVENT.LABELS.PLAY_VIDEO]: 'Play Video',
    [ANALYTICS_EVENT.LABELS.PAUSE_VIDEO]: 'Pause Video',
    [ANALYTICS_EVENT.LABELS.COMPLETE_VIDEO]: 'Complete Video',
    [ANALYTICS_EVENT.LABELS.SHARE]: 'Share',
    [ANALYTICS_EVENT.LABELS.LIKE]: 'Like',
    [ANALYTICS_EVENT.LABELS.COMMENT]: 'Comment',
    [ANALYTICS_EVENT.LABELS.FOLLOW]: 'Follow',
  };
  return labels[label] || 'Unknown';
}

// Analytics Event Priority Labels
export function getAnalyticsEventPriorityLabel(priority: AnalyticsEventPriority): string {
  const labels: Record<AnalyticsEventPriority, string> = {
    [ANALYTICS_EVENT.PRIORITY.CRITICAL]: 'Critical',
    [ANALYTICS_EVENT.PRIORITY.HIGH]: 'High',
    [ANALYTICS_EVENT.PRIORITY.MEDIUM]: 'Medium',
    [ANALYTICS_EVENT.PRIORITY.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

// Analytics Event Status Labels
export function getAnalyticsEventStatusLabel(status: AnalyticsEventStatus): string {
  const labels: Record<AnalyticsEventStatus, string> = {
    [ANALYTICS_EVENT.STATUS.PENDING]: 'Pending',
    [ANALYTICS_EVENT.STATUS.PROCESSING]: 'Processing',
    [ANALYTICS_EVENT.STATUS.COMPLETED]: 'Completed',
    [ANALYTICS_EVENT.STATUS.FAILED]: 'Failed',
    [ANALYTICS_EVENT.STATUS.DROPPED]: 'Dropped',
  };
  return labels[status] || 'Unknown';
}

// Check if event is completed
export function isAnalyticsEventCompleted(status: AnalyticsEventStatus): boolean {
  return status === ANALYTICS_EVENT.STATUS.COMPLETED;
}

// Check if event is processing
export function isAnalyticsEventProcessing(status: AnalyticsEventStatus): boolean {
  return status === ANALYTICS_EVENT.STATUS.PENDING || status === ANALYTICS_EVENT.STATUS.PROCESSING;
}

// Check if event is failed
export function isAnalyticsEventFailed(status: AnalyticsEventStatus): boolean {
  return status === ANALYTICS_EVENT.STATUS.FAILED || status === ANALYTICS_EVENT.STATUS.DROPPED;
}
