/**
 * User Activity Type Constants
 * Defines all possible user activity types
 */

export const USER_ACTIVITY_TYPE = {
  // Authentication
  LOGIN: 'login',
  LOGOUT: 'logout',
  REGISTER: 'register',
  PASSWORD_CHANGE: 'password-change',
  PASSWORD_RESET: 'password-reset',
  TWO_FACTOR_ENABLE: 'two-factor-enable',
  TWO_FACTOR_DISABLE: 'two-factor-disable',

  // Profile
  PROFILE_UPDATE: 'profile-update',
  PROFILE_AVATAR: 'profile-avatar',
  PROFILE_COVER: 'profile-cover',
  PROFILE_VERIFICATION: 'profile-verification',

  // Orders
  ORDER_CREATE: 'order-create',
  ORDER_UPDATE: 'order-update',
  ORDER_CANCEL: 'order-cancel',
  ORDER_VIEW: 'order-view',
  ORDER_TRACK: 'order-track',

  // Payments
  PAYMENT: 'payment',
  PAYMENT_METHOD_ADD: 'payment-method-add',
  PAYMENT_METHOD_REMOVE: 'payment-method-remove',
  REFUND: 'refund',
  WITHDRAWAL: 'withdrawal',

  // Products
  PRODUCT_VIEW: 'product-view',
  PRODUCT_COMPARE: 'product-compare',
  PRODUCT_SAVE: 'product-save',
  PRODUCT_REPORT: 'product-report',

  // Reviews
  REVIEW: 'review',
  REVIEW_UPDATE: 'review-update',
  REVIEW_DELETE: 'review-delete',
  REVIEW_LIKE: 'review-like',
  REVIEW_REPORT: 'review-report',

  // Wishlist
  WISHLIST_ADD: 'wishlist-add',
  WISHLIST_REMOVE: 'wishlist-remove',
  WISHLIST_VIEW: 'wishlist-view',
  WISHLIST_SHARE: 'wishlist-share',

  // Cart
  CART_ADD: 'cart-add',
  CART_REMOVE: 'cart-remove',
  CART_UPDATE: 'cart-update',
  CART_CLEAR: 'cart-clear',
  CART_VIEW: 'cart-view',

  // Search
  SEARCH: 'search',
  SEARCH_FILTER: 'search-filter',
  SEARCH_SORT: 'search-sort',

  // Social
  FOLLOW: 'follow',
  UNFOLLOW: 'unfollow',
  SHARE: 'share',
  LIKE: 'like',
  COMMENT: 'comment',

  // Support
  TICKET_CREATE: 'ticket-create',
  TICKET_UPDATE: 'ticket-update',
  TICKET_CLOSE: 'ticket-close',
  FEEDBACK: 'feedback',
  REPORT: 'report',

  // Downloads
  DOWNLOAD: 'download',
  DOWNLOAD_INVOICE: 'download-invoice',
  DOWNLOAD_REPORT: 'download-report',

  // Settings
  SETTINGS_UPDATE: 'settings-update',
  PREFERENCES_UPDATE: 'preferences-update',
  NOTIFICATION_SETTINGS: 'notification-settings',

  // Address
  ADDRESS_ADD: 'address-add',
  ADDRESS_UPDATE: 'address-update',
  ADDRESS_DELETE: 'address-delete',
  ADDRESS_DEFAULT: 'address-default',

  // Other
  VIEW: 'view',
  NAVIGATE: 'navigate',
  CLICK: 'click',
  SCROLL: 'scroll',
  ERROR: 'error',
  UNKNOWN: 'unknown',
} as const;

export type UserActivityType = (typeof USER_ACTIVITY_TYPE)[keyof typeof USER_ACTIVITY_TYPE];

export const USER_ACTIVITY_TYPE_LABELS: Record<UserActivityType, string> = {
  [USER_ACTIVITY_TYPE.LOGIN]: 'Login',
  [USER_ACTIVITY_TYPE.LOGOUT]: 'Logout',
  [USER_ACTIVITY_TYPE.REGISTER]: 'Register',
  [USER_ACTIVITY_TYPE.PASSWORD_CHANGE]: 'Password Change',
  [USER_ACTIVITY_TYPE.PASSWORD_RESET]: 'Password Reset',
  [USER_ACTIVITY_TYPE.TWO_FACTOR_ENABLE]: '2FA Enable',
  [USER_ACTIVITY_TYPE.TWO_FACTOR_DISABLE]: '2FA Disable',
  [USER_ACTIVITY_TYPE.PROFILE_UPDATE]: 'Profile Update',
  [USER_ACTIVITY_TYPE.PROFILE_AVATAR]: 'Profile Avatar',
  [USER_ACTIVITY_TYPE.PROFILE_COVER]: 'Profile Cover',
  [USER_ACTIVITY_TYPE.PROFILE_VERIFICATION]: 'Profile Verification',
  [USER_ACTIVITY_TYPE.ORDER_CREATE]: 'Order Create',
  [USER_ACTIVITY_TYPE.ORDER_UPDATE]: 'Order Update',
  [USER_ACTIVITY_TYPE.ORDER_CANCEL]: 'Order Cancel',
  [USER_ACTIVITY_TYPE.ORDER_VIEW]: 'Order View',
  [USER_ACTIVITY_TYPE.ORDER_TRACK]: 'Order Track',
  [USER_ACTIVITY_TYPE.PAYMENT]: 'Payment',
  [USER_ACTIVITY_TYPE.PAYMENT_METHOD_ADD]: 'Payment Method Add',
  [USER_ACTIVITY_TYPE.PAYMENT_METHOD_REMOVE]: 'Payment Method Remove',
  [USER_ACTIVITY_TYPE.REFUND]: 'Refund',
  [USER_ACTIVITY_TYPE.WITHDRAWAL]: 'Withdrawal',
  [USER_ACTIVITY_TYPE.PRODUCT_VIEW]: 'Product View',
  [USER_ACTIVITY_TYPE.PRODUCT_COMPARE]: 'Product Compare',
  [USER_ACTIVITY_TYPE.PRODUCT_SAVE]: 'Product Save',
  [USER_ACTIVITY_TYPE.PRODUCT_REPORT]: 'Product Report',
  [USER_ACTIVITY_TYPE.REVIEW]: 'Review',
  [USER_ACTIVITY_TYPE.REVIEW_UPDATE]: 'Review Update',
  [USER_ACTIVITY_TYPE.REVIEW_DELETE]: 'Review Delete',
  [USER_ACTIVITY_TYPE.REVIEW_LIKE]: 'Review Like',
  [USER_ACTIVITY_TYPE.REVIEW_REPORT]: 'Review Report',
  [USER_ACTIVITY_TYPE.WISHLIST_ADD]: 'Wishlist Add',
  [USER_ACTIVITY_TYPE.WISHLIST_REMOVE]: 'Wishlist Remove',
  [USER_ACTIVITY_TYPE.WISHLIST_VIEW]: 'Wishlist View',
  [USER_ACTIVITY_TYPE.WISHLIST_SHARE]: 'Wishlist Share',
  [USER_ACTIVITY_TYPE.CART_ADD]: 'Cart Add',
  [USER_ACTIVITY_TYPE.CART_REMOVE]: 'Cart Remove',
  [USER_ACTIVITY_TYPE.CART_UPDATE]: 'Cart Update',
  [USER_ACTIVITY_TYPE.CART_CLEAR]: 'Cart Clear',
  [USER_ACTIVITY_TYPE.CART_VIEW]: 'Cart View',
  [USER_ACTIVITY_TYPE.SEARCH]: 'Search',
  [USER_ACTIVITY_TYPE.SEARCH_FILTER]: 'Search Filter',
  [USER_ACTIVITY_TYPE.SEARCH_SORT]: 'Search Sort',
  [USER_ACTIVITY_TYPE.FOLLOW]: 'Follow',
  [USER_ACTIVITY_TYPE.UNFOLLOW]: 'Unfollow',
  [USER_ACTIVITY_TYPE.SHARE]: 'Share',
  [USER_ACTIVITY_TYPE.LIKE]: 'Like',
  [USER_ACTIVITY_TYPE.COMMENT]: 'Comment',
  [USER_ACTIVITY_TYPE.TICKET_CREATE]: 'Ticket Create',
  [USER_ACTIVITY_TYPE.TICKET_UPDATE]: 'Ticket Update',
  [USER_ACTIVITY_TYPE.TICKET_CLOSE]: 'Ticket Close',
  [USER_ACTIVITY_TYPE.FEEDBACK]: 'Feedback',
  [USER_ACTIVITY_TYPE.REPORT]: 'Report',
  [USER_ACTIVITY_TYPE.DOWNLOAD]: 'Download',
  [USER_ACTIVITY_TYPE.DOWNLOAD_INVOICE]: 'Download Invoice',
  [USER_ACTIVITY_TYPE.DOWNLOAD_REPORT]: 'Download Report',
  [USER_ACTIVITY_TYPE.SETTINGS_UPDATE]: 'Settings Update',
  [USER_ACTIVITY_TYPE.PREFERENCES_UPDATE]: 'Preferences Update',
  [USER_ACTIVITY_TYPE.NOTIFICATION_SETTINGS]: 'Notification Settings',
  [USER_ACTIVITY_TYPE.ADDRESS_ADD]: 'Address Add',
  [USER_ACTIVITY_TYPE.ADDRESS_UPDATE]: 'Address Update',
  [USER_ACTIVITY_TYPE.ADDRESS_DELETE]: 'Address Delete',
  [USER_ACTIVITY_TYPE.ADDRESS_DEFAULT]: 'Address Default',
  [USER_ACTIVITY_TYPE.VIEW]: 'View',
  [USER_ACTIVITY_TYPE.NAVIGATE]: 'Navigate',
  [USER_ACTIVITY_TYPE.CLICK]: 'Click',
  [USER_ACTIVITY_TYPE.SCROLL]: 'Scroll',
  [USER_ACTIVITY_TYPE.ERROR]: 'Error',
  [USER_ACTIVITY_TYPE.UNKNOWN]: 'Unknown',
};

export const USER_ACTIVITY_TYPE_CATEGORIES = {
  AUTHENTICATION: [
    USER_ACTIVITY_TYPE.LOGIN,
    USER_ACTIVITY_TYPE.LOGOUT,
    USER_ACTIVITY_TYPE.REGISTER,
    USER_ACTIVITY_TYPE.PASSWORD_CHANGE,
    USER_ACTIVITY_TYPE.PASSWORD_RESET,
    USER_ACTIVITY_TYPE.TWO_FACTOR_ENABLE,
    USER_ACTIVITY_TYPE.TWO_FACTOR_DISABLE,
  ] as readonly UserActivityType[],
  PROFILE: [
    USER_ACTIVITY_TYPE.PROFILE_UPDATE,
    USER_ACTIVITY_TYPE.PROFILE_AVATAR,
    USER_ACTIVITY_TYPE.PROFILE_COVER,
    USER_ACTIVITY_TYPE.PROFILE_VERIFICATION,
  ] as readonly UserActivityType[],
  ORDER: [
    USER_ACTIVITY_TYPE.ORDER_CREATE,
    USER_ACTIVITY_TYPE.ORDER_UPDATE,
    USER_ACTIVITY_TYPE.ORDER_CANCEL,
    USER_ACTIVITY_TYPE.ORDER_VIEW,
    USER_ACTIVITY_TYPE.ORDER_TRACK,
  ] as readonly UserActivityType[],
  PAYMENT: [
    USER_ACTIVITY_TYPE.PAYMENT,
    USER_ACTIVITY_TYPE.PAYMENT_METHOD_ADD,
    USER_ACTIVITY_TYPE.PAYMENT_METHOD_REMOVE,
    USER_ACTIVITY_TYPE.REFUND,
    USER_ACTIVITY_TYPE.WITHDRAWAL,
  ] as readonly UserActivityType[],
  PRODUCT: [
    USER_ACTIVITY_TYPE.PRODUCT_VIEW,
    USER_ACTIVITY_TYPE.PRODUCT_COMPARE,
    USER_ACTIVITY_TYPE.PRODUCT_SAVE,
    USER_ACTIVITY_TYPE.PRODUCT_REPORT,
  ] as readonly UserActivityType[],
  REVIEW: [
    USER_ACTIVITY_TYPE.REVIEW,
    USER_ACTIVITY_TYPE.REVIEW_UPDATE,
    USER_ACTIVITY_TYPE.REVIEW_DELETE,
    USER_ACTIVITY_TYPE.REVIEW_LIKE,
    USER_ACTIVITY_TYPE.REVIEW_REPORT,
  ] as readonly UserActivityType[],
  WISHLIST: [
    USER_ACTIVITY_TYPE.WISHLIST_ADD,
    USER_ACTIVITY_TYPE.WISHLIST_REMOVE,
    USER_ACTIVITY_TYPE.WISHLIST_VIEW,
    USER_ACTIVITY_TYPE.WISHLIST_SHARE,
  ] as readonly UserActivityType[],
  CART: [
    USER_ACTIVITY_TYPE.CART_ADD,
    USER_ACTIVITY_TYPE.CART_REMOVE,
    USER_ACTIVITY_TYPE.CART_UPDATE,
    USER_ACTIVITY_TYPE.CART_CLEAR,
    USER_ACTIVITY_TYPE.CART_VIEW,
  ] as readonly UserActivityType[],
  SEARCH: [
    USER_ACTIVITY_TYPE.SEARCH,
    USER_ACTIVITY_TYPE.SEARCH_FILTER,
    USER_ACTIVITY_TYPE.SEARCH_SORT,
  ] as readonly UserActivityType[],
  SOCIAL: [
    USER_ACTIVITY_TYPE.FOLLOW,
    USER_ACTIVITY_TYPE.UNFOLLOW,
    USER_ACTIVITY_TYPE.SHARE,
    USER_ACTIVITY_TYPE.LIKE,
    USER_ACTIVITY_TYPE.COMMENT,
  ] as readonly UserActivityType[],
  SUPPORT: [
    USER_ACTIVITY_TYPE.TICKET_CREATE,
    USER_ACTIVITY_TYPE.TICKET_UPDATE,
    USER_ACTIVITY_TYPE.TICKET_CLOSE,
    USER_ACTIVITY_TYPE.FEEDBACK,
    USER_ACTIVITY_TYPE.REPORT,
  ] as readonly UserActivityType[],
  DOWNLOAD: [
    USER_ACTIVITY_TYPE.DOWNLOAD,
    USER_ACTIVITY_TYPE.DOWNLOAD_INVOICE,
    USER_ACTIVITY_TYPE.DOWNLOAD_REPORT,
  ] as readonly UserActivityType[],
  SETTINGS: [
    USER_ACTIVITY_TYPE.SETTINGS_UPDATE,
    USER_ACTIVITY_TYPE.PREFERENCES_UPDATE,
    USER_ACTIVITY_TYPE.NOTIFICATION_SETTINGS,
  ] as readonly UserActivityType[],
  ADDRESS: [
    USER_ACTIVITY_TYPE.ADDRESS_ADD,
    USER_ACTIVITY_TYPE.ADDRESS_UPDATE,
    USER_ACTIVITY_TYPE.ADDRESS_DELETE,
    USER_ACTIVITY_TYPE.ADDRESS_DEFAULT,
  ] as readonly UserActivityType[],
  OTHER: [
    USER_ACTIVITY_TYPE.VIEW,
    USER_ACTIVITY_TYPE.NAVIGATE,
    USER_ACTIVITY_TYPE.CLICK,
    USER_ACTIVITY_TYPE.SCROLL,
    USER_ACTIVITY_TYPE.ERROR,
    USER_ACTIVITY_TYPE.UNKNOWN,
  ] as readonly UserActivityType[],
} as const;

export type UserActivityCategory = keyof typeof USER_ACTIVITY_TYPE_CATEGORIES;

export function getActivityTypeLabel(type: UserActivityType): string {
  return USER_ACTIVITY_TYPE_LABELS[type] || 'Unknown';
}

export function getActivityCategory(type: UserActivityType): UserActivityCategory | null {
  for (const [category, types] of Object.entries(USER_ACTIVITY_TYPE_CATEGORIES)) {
    if (types.includes(type)) {
      return category as UserActivityCategory;
    }
  }
  return null;
}

export function getActivityTypesByCategory(
  category: UserActivityCategory
): readonly UserActivityType[] {
  return USER_ACTIVITY_TYPE_CATEGORIES[category] || [];
}

export function isAuthenticationActivity(type: UserActivityType): boolean {
  return getActivityCategory(type) === 'AUTHENTICATION';
}

export function isOrderActivity(type: UserActivityType): boolean {
  return getActivityCategory(type) === 'ORDER';
}

export function isPaymentActivity(type: UserActivityType): boolean {
  return getActivityCategory(type) === 'PAYMENT';
}

export function isProductActivity(type: UserActivityType): boolean {
  return getActivityCategory(type) === 'PRODUCT';
}

export function isSocialActivity(type: UserActivityType): boolean {
  return getActivityCategory(type) === 'SOCIAL';
}

export function isSupportActivity(type: UserActivityType): boolean {
  return getActivityCategory(type) === 'SUPPORT';
}
