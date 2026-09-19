export const USER_ACTIVITY = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  REGISTER: 'register',
  PROFILE_UPDATE: 'profile_update',
  PASSWORD_CHANGE: 'password_change',
  EMAIL_VERIFY: 'email_verify',
  PHONE_VERIFY: 'phone_verify',
  ADDRESS_ADD: 'address_add',
  ADDRESS_UPDATE: 'address_update',
  ADDRESS_DELETE: 'address_delete',
  ORDER_PLACE: 'order_place',
  ORDER_CANCEL: 'order_cancel',
  PAYMENT_MADE: 'payment_made',
  REVIEW_POST: 'review_post',
  WISHLIST_ADD: 'wishlist_add',
  WISHLIST_REMOVE: 'wishlist_remove',
} as const;

export const USER_ACTIVITY_CATEGORY = {
  AUTH: 'auth',
  PROFILE: 'profile',
  ORDER: 'order',
  PAYMENT: 'payment',
  SOCIAL: 'social',
  SECURITY: 'security',
} as const;

export type UserActivityType = (typeof USER_ACTIVITY)[keyof typeof USER_ACTIVITY];
export type UserActivityCategoryType =
  (typeof USER_ACTIVITY_CATEGORY)[keyof typeof USER_ACTIVITY_CATEGORY];
