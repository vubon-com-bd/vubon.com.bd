/**
 * @fileoverview Analytics event definitions and configurations
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Core analytics event types
 */
export enum AnalyticsEventName {
  /** Page view event */
  PAGE_VIEW = 'PAGE_VIEW',
  /** Product view event */
  PRODUCT_VIEW = 'PRODUCT_VIEW',
  /** Add to cart event */
  ADD_TO_CART = 'ADD_TO_CART',
  /** Checkout started event */
  CHECKOUT = 'CHECKOUT',
  /** Purchase completed event */
  PURCHASE = 'PURCHASE',
  /** User sign up event */
  SIGN_UP = 'SIGN_UP',
  /** User login event */
  LOGIN = 'LOGIN',
  /** User logout event */
  LOGOUT = 'LOGOUT',
  /** Search performed event */
  SEARCH = 'SEARCH',
  /** Filter applied event */
  FILTER_APPLY = 'FILTER_APPLY',
  /** Content shared event */
  SHARE = 'SHARE',
  /** File download event */
  DOWNLOAD = 'DOWNLOAD',
  /** Element click event */
  CLICK = 'CLICK',
  /** Page scroll event */
  SCROLL = 'SCROLL',
  /** Form submission event */
  FORM_SUBMIT = 'FORM_SUBMIT',
  /** Error occurred event */
  ERROR = 'ERROR',
  /** User registration event */
  REGISTER = 'REGISTER',
  /** Email verification event */
  EMAIL_VERIFY = 'EMAIL_VERIFY',
  /** Password reset event */
  PASSWORD_RESET = 'PASSWORD_RESET',
  /** Profile update event */
  PROFILE_UPDATE = 'PROFILE_UPDATE',
  /** Settings change event */
  SETTINGS_CHANGE = 'SETTINGS_CHANGE',
  /** Notification received event */
  NOTIFICATION = 'NOTIFICATION',
  /** Notification clicked event */
  NOTIFICATION_CLICK = 'NOTIFICATION_CLICK',
  /** Ad impression event */
  AD_IMPRESSION = 'AD_IMPRESSION',
  /** Ad click event */
  AD_CLICK = 'AD_CLICK',
  /** Product added to wishlist event */
  ADD_TO_WISHLIST = 'ADD_TO_WISHLIST',
  /** Product removed from wishlist event */
  REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST',
  /** Product review event */
  PRODUCT_REVIEW = 'PRODUCT_REVIEW',
  /** Product rating event */
  PRODUCT_RATING = 'PRODUCT_RATING',
  /** Product compare event */
  PRODUCT_COMPARE = 'PRODUCT_COMPARE',
  /** Product share event */
  PRODUCT_SHARE = 'PRODUCT_SHARE',
  /** Product recommendation event */
  PRODUCT_RECOMMENDATION = 'PRODUCT_RECOMMENDATION',
  /** Category view event */
  CATEGORY_VIEW = 'CATEGORY_VIEW',
  /** Brand view event */
  BRAND_VIEW = 'BRAND_VIEW',
  /** Banner view event */
  BANNER_VIEW = 'BANNER_VIEW',
  /** Banner click event */
  BANNER_CLICK = 'BANNER_CLICK',
  /** Popup view event */
  POPUP_VIEW = 'POPUP_VIEW',
  /** Popup close event */
  POPUP_CLOSE = 'POPUP_CLOSE',
  /** Video start event */
  VIDEO_START = 'VIDEO_START',
  /** Video pause event */
  VIDEO_PAUSE = 'VIDEO_PAUSE',
  /** Video complete event */
  VIDEO_COMPLETE = 'VIDEO_COMPLETE',
  /** Audio start event */
  AUDIO_START = 'AUDIO_START',
  /** Audio pause event */
  AUDIO_PAUSE = 'AUDIO_PAUSE',
  /** Audio complete event */
  AUDIO_COMPLETE = 'AUDIO_COMPLETE',
  /** File upload event */
  FILE_UPLOAD = 'FILE_UPLOAD',
  /** File download event */
  FILE_DOWNLOAD = 'FILE_DOWNLOAD',
  /** Print event */
  PRINT = 'PRINT',
  /** Copy event */
  COPY = 'COPY',
  /** Paste event */
  PASTE = 'PASTE',
  /** Cut event */
  CUT = 'CUT',
  /** Undo event */
  UNDO = 'UNDO',
  /** Redo event */
  REDO = 'REDO',
  /** Shortcut used event */
  SHORTCUT = 'SHORTCUT',
  /** Feedback submitted event */
  FEEDBACK = 'FEEDBACK',
  /** Survey started event */
  SURVEY_START = 'SURVEY_START',
  /** Survey completed event */
  SURVEY_COMPLETE = 'SURVEY_COMPLETE',
  /** Survey skipped event */
  SURVEY_SKIP = 'SURVEY_SKIP',
  /** Poll vote event */
  POLL_VOTE = 'POLL_VOTE',
  /** Quiz started event */
  QUIZ_START = 'QUIZ_START',
  /** Quiz completed event */
  QUIZ_COMPLETE = 'QUIZ_COMPLETE',
  /** Quiz skipped event */
  QUIZ_SKIP = 'QUIZ_SKIP',
  /** Chat started event */
  CHAT_START = 'CHAT_START',
  /** Chat ended event */
  CHAT_END = 'CHAT_END',
  /** Chat message event */
  CHAT_MESSAGE = 'CHAT_MESSAGE',
  /** Call started event */
  CALL_START = 'CALL_START',
  /** Call ended event */
  CALL_END = 'CALL_END',
  /** Meeting joined event */
  MEETING_JOIN = 'MEETING_JOIN',
  /** Meeting left event */
  MEETING_LEAVE = 'MEETING_LEAVE',
  /** Meeting scheduled event */
  MEETING_SCHEDULE = 'MEETING_SCHEDULE',
  /** Appointment booked event */
  APPOINTMENT_BOOK = 'APPOINTMENT_BOOK',
  /** Appointment cancelled event */
  APPOINTMENT_CANCEL = 'APPOINTMENT_CANCEL',
  /** Appointment rescheduled event */
  APPOINTMENT_RESCHEDULE = 'APPOINTMENT_RESCHEDULE',
  /** Payment started event */
  PAYMENT_START = 'PAYMENT_START',
  /** Payment completed event */
  PAYMENT_COMPLETE = 'PAYMENT_COMPLETE',
  /** Payment failed event */
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  /** Payment refunded event */
  PAYMENT_REFUND = 'PAYMENT_REFUND',
  /** Subscription started event */
  SUBSCRIPTION_START = 'SUBSCRIPTION_START',
  /** Subscription cancelled event */
  SUBSCRIPTION_CANCEL = 'SUBSCRIPTION_CANCEL',
  /** Subscription renewed event */
  SUBSCRIPTION_RENEW = 'SUBSCRIPTION_RENEW',
  /** Subscription upgraded event */
  SUBSCRIPTION_UPGRADE = 'SUBSCRIPTION_UPGRADE',
  /** Subscription downgraded event */
  SUBSCRIPTION_DOWNGRADE = 'SUBSCRIPTION_DOWNGRADE',
  /** Trial started event */
  TRIAL_START = 'TRIAL_START',
  /** Trial ended event */
  TRIAL_END = 'TRIAL_END',
  /** Referral sent event */
  REFERRAL_SEND = 'REFERRAL_SEND',
  /** Referral accepted event */
  REFERRAL_ACCEPT = 'REFERRAL_ACCEPT',
  /** Referral converted event */
  REFERRAL_CONVERT = 'REFERRAL_CONVERT',
  /** Coupon applied event */
  COUPON_APPLY = 'COUPON_APPLY',
  /** Coupon removed event */
  COUPON_REMOVE = 'COUPON_REMOVE',
  /** Loyalty points earned event */
  LOYALTY_POINTS_EARN = 'LOYALTY_POINTS_EARN',
  /** Loyalty points redeemed event */
  LOYALTY_POINTS_REDEEM = 'LOYALTY_POINTS_REDEEM',
  /** Loyalty points expired event */
  LOYALTY_POINTS_EXPIRE = 'LOYALTY_POINTS_EXPIRE',
  /** Achievement unlocked event */
  ACHIEVEMENT_UNLOCK = 'ACHIEVEMENT_UNLOCK',
  /** Badge awarded event */
  BADGE_AWARD = 'BADGE_AWARD',
  /** Level up event */
  LEVEL_UP = 'LEVEL_UP',
  /** Streak achieved event */
  STREAK_ACHIEVE = 'STREAK_ACHIEVE',
  /** Goal completed event */
  GOAL_COMPLETE = 'GOAL_COMPLETE',
  /** Milestone reached event */
  MILESTONE_REACH = 'MILESTONE_REACH',
  /** Invitation sent event */
  INVITATION_SEND = 'INVITATION_SEND',
  /** Invitation accepted event */
  INVITATION_ACCEPT = 'INVITATION_ACCEPT',
  /** Invitation declined event */
  INVITATION_DECLINE = 'INVITATION_DECLINE',
  /** Contact added event */
  CONTACT_ADD = 'CONTACT_ADD',
  /** Contact removed event */
  CONTACT_REMOVE = 'CONTACT_REMOVE',
  /** Contact updated event */
  CONTACT_UPDATE = 'CONTACT_UPDATE',
  /** Follow event */
  FOLLOW = 'FOLLOW',
  /** Unfollow event */
  UNFOLLOW = 'UNFOLLOW',
  /** Block event */
  BLOCK = 'BLOCK',
  /** Unblock event */
  UNBLOCK = 'UNBLOCK',
  /** Report event */
  REPORT = 'REPORT',
  /** Appeal event */
  APPEAL = 'APPEAL',
}

/**
 * Event category for grouping
 */
export enum AnalyticsEventCategory {
  /** User interaction events */
  USER = 'USER',
  /** Product related events */
  PRODUCT = 'PRODUCT',
  /** Transaction related events */
  TRANSACTION = 'TRANSACTION',
  /** Marketing related events */
  MARKETING = 'MARKETING',
  /** Content related events */
  CONTENT = 'CONTENT',
  /** System related events */
  SYSTEM = 'SYSTEM',
  /** Communication events */
  COMMUNICATION = 'COMMUNICATION',
  /** Engagement events */
  ENGAGEMENT = 'ENGAGEMENT',
  /** Achievement events */
  ACHIEVEMENT = 'ACHIEVEMENT',
  /** Social events */
  SOCIAL = 'SOCIAL',
}

/**
 * Event category mapping
 */
export const ANALYTICS_EVENT_CATEGORY_MAP: Record<AnalyticsEventName, AnalyticsEventCategory> = {
  [AnalyticsEventName.PAGE_VIEW]: AnalyticsEventCategory.USER,
  [AnalyticsEventName.PRODUCT_VIEW]: AnalyticsEventCategory.PRODUCT,
  [AnalyticsEventName.ADD_TO_CART]: AnalyticsEventCategory.PRODUCT,
  [AnalyticsEventName.CHECKOUT]: AnalyticsEventCategory.TRANSACTION,
  [AnalyticsEventName.PURCHASE]: AnalyticsEventCategory.TRANSACTION,
  [AnalyticsEventName.SIGN_UP]: AnalyticsEventCategory.USER,
  [AnalyticsEventName.LOGIN]: AnalyticsEventCategory.USER,
  [AnalyticsEventName.LOGOUT]: AnalyticsEventCategory.USER,
  [AnalyticsEventName.SEARCH]: AnalyticsEventCategory.USER,
  [AnalyticsEventName.FILTER_APPLY]: AnalyticsEventCategory.USER,
  [AnalyticsEventName.SHARE]: AnalyticsEventCategory.SOCIAL,
  [AnalyticsEventName.DOWNLOAD]: AnalyticsEventCategory.USER,
  [AnalyticsEventName.CLICK]: AnalyticsEventCategory.USER,
  [AnalyticsEventName.SCROLL]: AnalyticsEventCategory.USER,
  [AnalyticsEventName.FORM_SUBMIT]: AnalyticsEventCategory.USER,
  [AnalyticsEventName.ERROR]: AnalyticsEventCategory.SYSTEM,
  [AnalyticsEventName.REGISTER]: AnalyticsEventCategory.USER,
  [AnalyticsEventName.EMAIL_VERIFY]: AnalyticsEventCategory.USER,
  [AnalyticsEventName.PASSWORD_RESET]: AnalyticsEventCategory.USER,
  [AnalyticsEventName.PROFILE_UPDATE]: AnalyticsEventCategory.USER,
  [AnalyticsEventName.SETTINGS_CHANGE]: AnalyticsEventCategory.USER,
  [AnalyticsEventName.NOTIFICATION]: AnalyticsEventCategory.COMMUNICATION,
  [AnalyticsEventName.NOTIFICATION_CLICK]: AnalyticsEventCategory.COMMUNICATION,
  [AnalyticsEventName.AD_IMPRESSION]: AnalyticsEventCategory.MARKETING,
  [AnalyticsEventName.AD_CLICK]: AnalyticsEventCategory.MARKETING,
  [AnalyticsEventName.ADD_TO_WISHLIST]: AnalyticsEventCategory.PRODUCT,
  [AnalyticsEventName.REMOVE_FROM_WISHLIST]: AnalyticsEventCategory.PRODUCT,
  [AnalyticsEventName.PRODUCT_REVIEW]: AnalyticsEventCategory.PRODUCT,
  [AnalyticsEventName.PRODUCT_RATING]: AnalyticsEventCategory.PRODUCT,
  [AnalyticsEventName.PRODUCT_COMPARE]: AnalyticsEventCategory.PRODUCT,
  [AnalyticsEventName.PRODUCT_SHARE]: AnalyticsEventCategory.PRODUCT,
  [AnalyticsEventName.PRODUCT_RECOMMENDATION]: AnalyticsEventCategory.PRODUCT,
  [AnalyticsEventName.CATEGORY_VIEW]: AnalyticsEventCategory.PRODUCT,
  [AnalyticsEventName.BRAND_VIEW]: AnalyticsEventCategory.PRODUCT,
  [AnalyticsEventName.BANNER_VIEW]: AnalyticsEventCategory.MARKETING,
  [AnalyticsEventName.BANNER_CLICK]: AnalyticsEventCategory.MARKETING,
  [AnalyticsEventName.POPUP_VIEW]: AnalyticsEventCategory.MARKETING,
  [AnalyticsEventName.POPUP_CLOSE]: AnalyticsEventCategory.MARKETING,
  [AnalyticsEventName.VIDEO_START]: AnalyticsEventCategory.CONTENT,
  [AnalyticsEventName.VIDEO_PAUSE]: AnalyticsEventCategory.CONTENT,
  [AnalyticsEventName.VIDEO_COMPLETE]: AnalyticsEventCategory.CONTENT,
  [AnalyticsEventName.AUDIO_START]: AnalyticsEventCategory.CONTENT,
  [AnalyticsEventName.AUDIO_PAUSE]: AnalyticsEventCategory.CONTENT,
  [AnalyticsEventName.AUDIO_COMPLETE]: AnalyticsEventCategory.CONTENT,
  [AnalyticsEventName.FILE_UPLOAD]: AnalyticsEventCategory.SYSTEM,
  [AnalyticsEventName.FILE_DOWNLOAD]: AnalyticsEventCategory.SYSTEM,
  [AnalyticsEventName.PRINT]: AnalyticsEventCategory.USER,
  [AnalyticsEventName.COPY]: AnalyticsEventCategory.USER,
  [AnalyticsEventName.PASTE]: AnalyticsEventCategory.USER,
  [AnalyticsEventName.CUT]: AnalyticsEventCategory.USER,
  [AnalyticsEventName.UNDO]: AnalyticsEventCategory.USER,
  [AnalyticsEventName.REDO]: AnalyticsEventCategory.USER,
  [AnalyticsEventName.SHORTCUT]: AnalyticsEventCategory.USER,
  [AnalyticsEventName.FEEDBACK]: AnalyticsEventCategory.USER,
  [AnalyticsEventName.SURVEY_START]: AnalyticsEventCategory.ENGAGEMENT,
  [AnalyticsEventName.SURVEY_COMPLETE]: AnalyticsEventCategory.ENGAGEMENT,
  [AnalyticsEventName.SURVEY_SKIP]: AnalyticsEventCategory.ENGAGEMENT,
  [AnalyticsEventName.POLL_VOTE]: AnalyticsEventCategory.ENGAGEMENT,
  [AnalyticsEventName.QUIZ_START]: AnalyticsEventCategory.ENGAGEMENT,
  [AnalyticsEventName.QUIZ_COMPLETE]: AnalyticsEventCategory.ENGAGEMENT,
  [AnalyticsEventName.QUIZ_SKIP]: AnalyticsEventCategory.ENGAGEMENT,
  [AnalyticsEventName.CHAT_START]: AnalyticsEventCategory.COMMUNICATION,
  [AnalyticsEventName.CHAT_END]: AnalyticsEventCategory.COMMUNICATION,
  [AnalyticsEventName.CHAT_MESSAGE]: AnalyticsEventCategory.COMMUNICATION,
  [AnalyticsEventName.CALL_START]: AnalyticsEventCategory.COMMUNICATION,
  [AnalyticsEventName.CALL_END]: AnalyticsEventCategory.COMMUNICATION,
  [AnalyticsEventName.MEETING_JOIN]: AnalyticsEventCategory.COMMUNICATION,
  [AnalyticsEventName.MEETING_LEAVE]: AnalyticsEventCategory.COMMUNICATION,
  [AnalyticsEventName.MEETING_SCHEDULE]: AnalyticsEventCategory.COMMUNICATION,
  [AnalyticsEventName.APPOINTMENT_BOOK]: AnalyticsEventCategory.COMMUNICATION,
  [AnalyticsEventName.APPOINTMENT_CANCEL]: AnalyticsEventCategory.COMMUNICATION,
  [AnalyticsEventName.APPOINTMENT_RESCHEDULE]: AnalyticsEventCategory.COMMUNICATION,
  [AnalyticsEventName.PAYMENT_START]: AnalyticsEventCategory.TRANSACTION,
  [AnalyticsEventName.PAYMENT_COMPLETE]: AnalyticsEventCategory.TRANSACTION,
  [AnalyticsEventName.PAYMENT_FAILED]: AnalyticsEventCategory.TRANSACTION,
  [AnalyticsEventName.PAYMENT_REFUND]: AnalyticsEventCategory.TRANSACTION,
  [AnalyticsEventName.SUBSCRIPTION_START]: AnalyticsEventCategory.TRANSACTION,
  [AnalyticsEventName.SUBSCRIPTION_CANCEL]: AnalyticsEventCategory.TRANSACTION,
  [AnalyticsEventName.SUBSCRIPTION_RENEW]: AnalyticsEventCategory.TRANSACTION,
  [AnalyticsEventName.SUBSCRIPTION_UPGRADE]: AnalyticsEventCategory.TRANSACTION,
  [AnalyticsEventName.SUBSCRIPTION_DOWNGRADE]: AnalyticsEventCategory.TRANSACTION,
  [AnalyticsEventName.TRIAL_START]: AnalyticsEventCategory.TRANSACTION,
  [AnalyticsEventName.TRIAL_END]: AnalyticsEventCategory.TRANSACTION,
  [AnalyticsEventName.REFERRAL_SEND]: AnalyticsEventCategory.SOCIAL,
  [AnalyticsEventName.REFERRAL_ACCEPT]: AnalyticsEventCategory.SOCIAL,
  [AnalyticsEventName.REFERRAL_CONVERT]: AnalyticsEventCategory.SOCIAL,
  [AnalyticsEventName.COUPON_APPLY]: AnalyticsEventCategory.TRANSACTION,
  [AnalyticsEventName.COUPON_REMOVE]: AnalyticsEventCategory.TRANSACTION,
  [AnalyticsEventName.LOYALTY_POINTS_EARN]: AnalyticsEventCategory.ACHIEVEMENT,
  [AnalyticsEventName.LOYALTY_POINTS_REDEEM]: AnalyticsEventCategory.ACHIEVEMENT,
  [AnalyticsEventName.LOYALTY_POINTS_EXPIRE]: AnalyticsEventCategory.ACHIEVEMENT,
  [AnalyticsEventName.ACHIEVEMENT_UNLOCK]: AnalyticsEventCategory.ACHIEVEMENT,
  [AnalyticsEventName.BADGE_AWARD]: AnalyticsEventCategory.ACHIEVEMENT,
  [AnalyticsEventName.LEVEL_UP]: AnalyticsEventCategory.ACHIEVEMENT,
  [AnalyticsEventName.STREAK_ACHIEVE]: AnalyticsEventCategory.ACHIEVEMENT,
  [AnalyticsEventName.GOAL_COMPLETE]: AnalyticsEventCategory.ACHIEVEMENT,
  [AnalyticsEventName.MILESTONE_REACH]: AnalyticsEventCategory.ACHIEVEMENT,
  [AnalyticsEventName.INVITATION_SEND]: AnalyticsEventCategory.SOCIAL,
  [AnalyticsEventName.INVITATION_ACCEPT]: AnalyticsEventCategory.SOCIAL,
  [AnalyticsEventName.INVITATION_DECLINE]: AnalyticsEventCategory.SOCIAL,
  [AnalyticsEventName.CONTACT_ADD]: AnalyticsEventCategory.SOCIAL,
  [AnalyticsEventName.CONTACT_REMOVE]: AnalyticsEventCategory.SOCIAL,
  [AnalyticsEventName.CONTACT_UPDATE]: AnalyticsEventCategory.SOCIAL,
  [AnalyticsEventName.FOLLOW]: AnalyticsEventCategory.SOCIAL,
  [AnalyticsEventName.UNFOLLOW]: AnalyticsEventCategory.SOCIAL,
  [AnalyticsEventName.BLOCK]: AnalyticsEventCategory.SOCIAL,
  [AnalyticsEventName.UNBLOCK]: AnalyticsEventCategory.SOCIAL,
  [AnalyticsEventName.REPORT]: AnalyticsEventCategory.SOCIAL,
  [AnalyticsEventName.APPEAL]: AnalyticsEventCategory.SOCIAL,
};

/**
 * Event configuration with labels and descriptions
 */
export interface AnalyticsEventConfig {
  label: string;
  description: string;
  icon?: string;
  color?: string;
  isCritical: boolean;
  requiresUser: boolean;
}

export const ANALYTICS_EVENT_CONFIG: Record<AnalyticsEventName, AnalyticsEventConfig> = {
  [AnalyticsEventName.PAGE_VIEW]: {
    label: 'Page View',
    description: 'User viewed a page',
    icon: 'Eye',
    color: '#3B82F6',
    isCritical: false,
    requiresUser: false,
  },
  [AnalyticsEventName.PRODUCT_VIEW]: {
    label: 'Product View',
    description: 'User viewed a product',
    icon: 'Package',
    color: '#8B5CF6',
    isCritical: false,
    requiresUser: false,
  },
  [AnalyticsEventName.ADD_TO_CART]: {
    label: 'Add to Cart',
    description: 'User added product to cart',
    icon: 'ShoppingCart',
    color: '#F59E0B',
    isCritical: true,
    requiresUser: true,
  },
  [AnalyticsEventName.CHECKOUT]: {
    label: 'Checkout',
    description: 'User initiated checkout',
    icon: 'CreditCard',
    color: '#10B981',
    isCritical: true,
    requiresUser: true,
  },
  [AnalyticsEventName.PURCHASE]: {
    label: 'Purchase',
    description: 'User completed purchase',
    icon: 'DollarSign',
    color: '#22C55E',
    isCritical: true,
    requiresUser: true,
  },
  [AnalyticsEventName.SIGN_UP]: {
    label: 'Sign Up',
    description: 'User signed up',
    icon: 'UserPlus',
    color: '#3B82F6',
    isCritical: true,
    requiresUser: true,
  },
  [AnalyticsEventName.LOGIN]: {
    label: 'Login',
    description: 'User logged in',
    icon: 'LogIn',
    color: '#6366F1',
    isCritical: true,
    requiresUser: true,
  },
  [AnalyticsEventName.LOGOUT]: {
    label: 'Logout',
    description: 'User logged out',
    icon: 'LogOut',
    color: '#6B7280',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.SEARCH]: {
    label: 'Search',
    description: 'User performed search',
    icon: 'Search',
    color: '#4285F4',
    isCritical: false,
    requiresUser: false,
  },
  [AnalyticsEventName.FILTER_APPLY]: {
    label: 'Filter Apply',
    description: 'User applied filter',
    icon: 'Filter',
    color: '#F59E0B',
    isCritical: false,
    requiresUser: false,
  },
  [AnalyticsEventName.SHARE]: {
    label: 'Share',
    description: 'User shared content',
    icon: 'Share2',
    color: '#1DA1F2',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.DOWNLOAD]: {
    label: 'Download',
    description: 'User downloaded file',
    icon: 'Download',
    color: '#8B5CF6',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.CLICK]: {
    label: 'Click',
    description: 'User clicked element',
    icon: 'MousePointer',
    color: '#3B82F6',
    isCritical: false,
    requiresUser: false,
  },
  [AnalyticsEventName.SCROLL]: {
    label: 'Scroll',
    description: 'User scrolled page',
    icon: 'Scroll',
    color: '#6B7280',
    isCritical: false,
    requiresUser: false,
  },
  [AnalyticsEventName.FORM_SUBMIT]: {
    label: 'Form Submit',
    description: 'User submitted form',
    icon: 'FormInput',
    color: '#10B981',
    isCritical: true,
    requiresUser: true,
  },
  [AnalyticsEventName.ERROR]: {
    label: 'Error',
    description: 'Error occurred',
    icon: 'AlertCircle',
    color: '#EF4444',
    isCritical: true,
    requiresUser: false,
  },
  [AnalyticsEventName.REGISTER]: {
    label: 'Register',
    description: 'User registered',
    icon: 'UserPlus',
    color: '#22C55E',
    isCritical: true,
    requiresUser: true,
  },
  [AnalyticsEventName.EMAIL_VERIFY]: {
    label: 'Email Verify',
    description: 'User verified email',
    icon: 'MailCheck',
    color: '#10B981',
    isCritical: true,
    requiresUser: true,
  },
  [AnalyticsEventName.PASSWORD_RESET]: {
    label: 'Password Reset',
    description: 'User reset password',
    icon: 'Key',
    color: '#F59E0B',
    isCritical: true,
    requiresUser: true,
  },
  [AnalyticsEventName.PROFILE_UPDATE]: {
    label: 'Profile Update',
    description: 'User updated profile',
    icon: 'User',
    color: '#8B5CF6',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.SETTINGS_CHANGE]: {
    label: 'Settings Change',
    description: 'User changed settings',
    icon: 'Settings',
    color: '#6B7280',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.NOTIFICATION]: {
    label: 'Notification',
    description: 'Notification sent',
    icon: 'Bell',
    color: '#F472B6',
    isCritical: false,
    requiresUser: false,
  },
  [AnalyticsEventName.NOTIFICATION_CLICK]: {
    label: 'Notification Click',
    description: 'User clicked notification',
    icon: 'BellRing',
    color: '#EC4899',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.AD_IMPRESSION]: {
    label: 'Ad Impression',
    description: 'Ad was displayed',
    icon: 'Eye',
    color: '#F59E0B',
    isCritical: false,
    requiresUser: false,
  },
  [AnalyticsEventName.AD_CLICK]: {
    label: 'Ad Click',
    description: 'User clicked ad',
    icon: 'MousePointerClick',
    color: '#EF4444',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.ADD_TO_WISHLIST]: {
    label: 'Add to Wishlist',
    description: 'User added product to wishlist',
    icon: 'Heart',
    color: '#EC4899',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.REMOVE_FROM_WISHLIST]: {
    label: 'Remove from Wishlist',
    description: 'User removed product from wishlist',
    icon: 'HeartOff',
    color: '#6B7280',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.PRODUCT_REVIEW]: {
    label: 'Product Review',
    description: 'User reviewed product',
    icon: 'Star',
    color: '#F59E0B',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.PRODUCT_RATING]: {
    label: 'Product Rating',
    description: 'User rated product',
    icon: 'Star',
    color: '#F59E0B',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.PRODUCT_COMPARE]: {
    label: 'Product Compare',
    description: 'User compared products',
    icon: 'GitCompare',
    color: '#8B5CF6',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.PRODUCT_SHARE]: {
    label: 'Product Share',
    description: 'User shared product',
    icon: 'Share2',
    color: '#1DA1F2',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.PRODUCT_RECOMMENDATION]: {
    label: 'Product Recommendation',
    description: 'Product recommendation shown',
    icon: 'Sparkles',
    color: '#F472B6',
    isCritical: false,
    requiresUser: false,
  },
  [AnalyticsEventName.CATEGORY_VIEW]: {
    label: 'Category View',
    description: 'User viewed category',
    icon: 'Folder',
    color: '#3B82F6',
    isCritical: false,
    requiresUser: false,
  },
  [AnalyticsEventName.BRAND_VIEW]: {
    label: 'Brand View',
    description: 'User viewed brand',
    icon: 'Tag',
    color: '#6B7280',
    isCritical: false,
    requiresUser: false,
  },
  [AnalyticsEventName.BANNER_VIEW]: {
    label: 'Banner View',
    description: 'Banner was displayed',
    icon: 'Image',
    color: '#10B981',
    isCritical: false,
    requiresUser: false,
  },
  [AnalyticsEventName.BANNER_CLICK]: {
    label: 'Banner Click',
    description: 'User clicked banner',
    icon: 'Image',
    color: '#22C55E',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.POPUP_VIEW]: {
    label: 'Popup View',
    description: 'Popup was displayed',
    icon: 'MessageSquare',
    color: '#F59E0B',
    isCritical: false,
    requiresUser: false,
  },
  [AnalyticsEventName.POPUP_CLOSE]: {
    label: 'Popup Close',
    description: 'User closed popup',
    icon: 'X',
    color: '#EF4444',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.VIDEO_START]: {
    label: 'Video Start',
    description: 'User started video',
    icon: 'Play',
    color: '#3B82F6',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.VIDEO_PAUSE]: {
    label: 'Video Pause',
    description: 'User paused video',
    icon: 'Pause',
    color: '#F59E0B',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.VIDEO_COMPLETE]: {
    label: 'Video Complete',
    description: 'User completed video',
    icon: 'CheckCircle',
    color: '#22C55E',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.AUDIO_START]: {
    label: 'Audio Start',
    description: 'User started audio',
    icon: 'Play',
    color: '#8B5CF6',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.AUDIO_PAUSE]: {
    label: 'Audio Pause',
    description: 'User paused audio',
    icon: 'Pause',
    color: '#F59E0B',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.AUDIO_COMPLETE]: {
    label: 'Audio Complete',
    description: 'User completed audio',
    icon: 'CheckCircle',
    color: '#22C55E',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.FILE_UPLOAD]: {
    label: 'File Upload',
    description: 'User uploaded file',
    icon: 'Upload',
    color: '#10B981',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.FILE_DOWNLOAD]: {
    label: 'File Download',
    description: 'User downloaded file',
    icon: 'Download',
    color: '#3B82F6',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.PRINT]: {
    label: 'Print',
    description: 'User printed page',
    icon: 'Printer',
    color: '#6B7280',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.COPY]: {
    label: 'Copy',
    description: 'User copied content',
    icon: 'Copy',
    color: '#8B5CF6',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.PASTE]: {
    label: 'Paste',
    description: 'User pasted content',
    icon: 'Clipboard',
    color: '#6B7280',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.CUT]: {
    label: 'Cut',
    description: 'User cut content',
    icon: 'Scissors',
    color: '#EF4444',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.UNDO]: {
    label: 'Undo',
    description: 'User undid action',
    icon: 'Undo',
    color: '#F59E0B',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.REDO]: {
    label: 'Redo',
    description: 'User redid action',
    icon: 'Redo',
    color: '#10B981',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.SHORTCUT]: {
    label: 'Shortcut',
    description: 'User used keyboard shortcut',
    icon: 'Keyboard',
    color: '#8B5CF6',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.FEEDBACK]: {
    label: 'Feedback',
    description: 'User submitted feedback',
    icon: 'MessageSquare',
    color: '#F472B6',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.SURVEY_START]: {
    label: 'Survey Start',
    description: 'User started survey',
    icon: 'FileText',
    color: '#3B82F6',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.SURVEY_COMPLETE]: {
    label: 'Survey Complete',
    description: 'User completed survey',
    icon: 'CheckCircle',
    color: '#22C55E',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.SURVEY_SKIP]: {
    label: 'Survey Skip',
    description: 'User skipped survey',
    icon: 'Skip',
    color: '#F59E0B',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.POLL_VOTE]: {
    label: 'Poll Vote',
    description: 'User voted in poll',
    icon: 'BarChart',
    color: '#8B5CF6',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.QUIZ_START]: {
    label: 'Quiz Start',
    description: 'User started quiz',
    icon: 'HelpCircle',
    color: '#3B82F6',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.QUIZ_COMPLETE]: {
    label: 'Quiz Complete',
    description: 'User completed quiz',
    icon: 'CheckCircle',
    color: '#22C55E',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.QUIZ_SKIP]: {
    label: 'Quiz Skip',
    description: 'User skipped quiz',
    icon: 'Skip',
    color: '#F59E0B',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.CHAT_START]: {
    label: 'Chat Start',
    description: 'User started chat',
    icon: 'MessageSquare',
    color: '#10B981',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.CHAT_END]: {
    label: 'Chat End',
    description: 'User ended chat',
    icon: 'MessageSquare',
    color: '#EF4444',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.CHAT_MESSAGE]: {
    label: 'Chat Message',
    description: 'User sent chat message',
    icon: 'MessageSquare',
    color: '#3B82F6',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.CALL_START]: {
    label: 'Call Start',
    description: 'User started call',
    icon: 'Phone',
    color: '#10B981',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.CALL_END]: {
    label: 'Call End',
    description: 'User ended call',
    icon: 'PhoneOff',
    color: '#EF4444',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.MEETING_JOIN]: {
    label: 'Meeting Join',
    description: 'User joined meeting',
    icon: 'Video',
    color: '#3B82F6',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.MEETING_LEAVE]: {
    label: 'Meeting Leave',
    description: 'User left meeting',
    icon: 'VideoOff',
    color: '#EF4444',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.MEETING_SCHEDULE]: {
    label: 'Meeting Schedule',
    description: 'User scheduled meeting',
    icon: 'Calendar',
    color: '#F59E0B',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.APPOINTMENT_BOOK]: {
    label: 'Appointment Book',
    description: 'User booked appointment',
    icon: 'Calendar',
    color: '#22C55E',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.APPOINTMENT_CANCEL]: {
    label: 'Appointment Cancel',
    description: 'User cancelled appointment',
    icon: 'CalendarX',
    color: '#EF4444',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.APPOINTMENT_RESCHEDULE]: {
    label: 'Appointment Reschedule',
    description: 'User rescheduled appointment',
    icon: 'Calendar',
    color: '#F59E0B',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.PAYMENT_START]: {
    label: 'Payment Start',
    description: 'User started payment',
    icon: 'CreditCard',
    color: '#3B82F6',
    isCritical: true,
    requiresUser: true,
  },
  [AnalyticsEventName.PAYMENT_COMPLETE]: {
    label: 'Payment Complete',
    description: 'User completed payment',
    icon: 'CreditCard',
    color: '#22C55E',
    isCritical: true,
    requiresUser: true,
  },
  [AnalyticsEventName.PAYMENT_FAILED]: {
    label: 'Payment Failed',
    description: 'User payment failed',
    icon: 'CreditCard',
    color: '#EF4444',
    isCritical: true,
    requiresUser: true,
  },
  [AnalyticsEventName.PAYMENT_REFUND]: {
    label: 'Payment Refund',
    description: 'User payment refunded',
    icon: 'CreditCard',
    color: '#F59E0B',
    isCritical: true,
    requiresUser: true,
  },
  [AnalyticsEventName.SUBSCRIPTION_START]: {
    label: 'Subscription Start',
    description: 'User started subscription',
    icon: 'Repeat',
    color: '#22C55E',
    isCritical: true,
    requiresUser: true,
  },
  [AnalyticsEventName.SUBSCRIPTION_CANCEL]: {
    label: 'Subscription Cancel',
    description: 'User cancelled subscription',
    icon: 'Repeat',
    color: '#EF4444',
    isCritical: true,
    requiresUser: true,
  },
  [AnalyticsEventName.SUBSCRIPTION_RENEW]: {
    label: 'Subscription Renew',
    description: 'User renewed subscription',
    icon: 'Repeat',
    color: '#10B981',
    isCritical: true,
    requiresUser: true,
  },
  [AnalyticsEventName.SUBSCRIPTION_UPGRADE]: {
    label: 'Subscription Upgrade',
    description: 'User upgraded subscription',
    icon: 'TrendingUp',
    color: '#3B82F6',
    isCritical: true,
    requiresUser: true,
  },
  [AnalyticsEventName.SUBSCRIPTION_DOWNGRADE]: {
    label: 'Subscription Downgrade',
    description: 'User downgraded subscription',
    icon: 'TrendingDown',
    color: '#EF4444',
    isCritical: true,
    requiresUser: true,
  },
  [AnalyticsEventName.TRIAL_START]: {
    label: 'Trial Start',
    description: 'User started trial',
    icon: 'Rocket',
    color: '#22C55E',
    isCritical: true,
    requiresUser: true,
  },
  [AnalyticsEventName.TRIAL_END]: {
    label: 'Trial End',
    description: 'User ended trial',
    icon: 'Rocket',
    color: '#EF4444',
    isCritical: true,
    requiresUser: true,
  },
  [AnalyticsEventName.REFERRAL_SEND]: {
    label: 'Referral Send',
    description: 'User sent referral',
    icon: 'Share2',
    color: '#3B82F6',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.REFERRAL_ACCEPT]: {
    label: 'Referral Accept',
    description: 'User accepted referral',
    icon: 'CheckCircle',
    color: '#22C55E',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.REFERRAL_CONVERT]: {
    label: 'Referral Convert',
    description: 'Referral converted',
    icon: 'TrendingUp',
    color: '#10B981',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.COUPON_APPLY]: {
    label: 'Coupon Apply',
    description: 'User applied coupon',
    icon: 'Ticket',
    color: '#F59E0B',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.COUPON_REMOVE]: {
    label: 'Coupon Remove',
    description: 'User removed coupon',
    icon: 'TicketX',
    color: '#EF4444',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.LOYALTY_POINTS_EARN]: {
    label: 'Loyalty Points Earn',
    description: 'User earned loyalty points',
    icon: 'Coins',
    color: '#F59E0B',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.LOYALTY_POINTS_REDEEM]: {
    label: 'Loyalty Points Redeem',
    description: 'User redeemed loyalty points',
    icon: 'Coins',
    color: '#10B981',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.LOYALTY_POINTS_EXPIRE]: {
    label: 'Loyalty Points Expire',
    description: 'User loyalty points expired',
    icon: 'Coins',
    color: '#EF4444',
    isCritical: false,
    requiresUser: false,
  },
  [AnalyticsEventName.ACHIEVEMENT_UNLOCK]: {
    label: 'Achievement Unlock',
    description: 'User unlocked achievement',
    icon: 'Trophy',
    color: '#F59E0B',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.BADGE_AWARD]: {
    label: 'Badge Award',
    description: 'User awarded badge',
    icon: 'Award',
    color: '#F472B6',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.LEVEL_UP]: {
    label: 'Level Up',
    description: 'User leveled up',
    icon: 'TrendingUp',
    color: '#22C55E',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.STREAK_ACHIEVE]: {
    label: 'Streak Achieve',
    description: 'User achieved streak',
    icon: 'Flame',
    color: '#EF4444',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.GOAL_COMPLETE]: {
    label: 'Goal Complete',
    description: 'User completed goal',
    icon: 'Flag',
    color: '#3B82F6',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.MILESTONE_REACH]: {
    label: 'Milestone Reach',
    description: 'User reached milestone',
    icon: 'Flag',
    color: '#F59E0B',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.INVITATION_SEND]: {
    label: 'Invitation Send',
    description: 'User sent invitation',
    icon: 'Mail',
    color: '#3B82F6',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.INVITATION_ACCEPT]: {
    label: 'Invitation Accept',
    description: 'User accepted invitation',
    icon: 'CheckCircle',
    color: '#22C55E',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.INVITATION_DECLINE]: {
    label: 'Invitation Decline',
    description: 'User declined invitation',
    icon: 'XCircle',
    color: '#EF4444',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.CONTACT_ADD]: {
    label: 'Contact Add',
    description: 'User added contact',
    icon: 'UserPlus',
    color: '#10B981',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.CONTACT_REMOVE]: {
    label: 'Contact Remove',
    description: 'User removed contact',
    icon: 'UserMinus',
    color: '#EF4444',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.CONTACT_UPDATE]: {
    label: 'Contact Update',
    description: 'User updated contact',
    icon: 'User',
    color: '#F59E0B',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.FOLLOW]: {
    label: 'Follow',
    description: 'User followed another user',
    icon: 'UserPlus',
    color: '#3B82F6',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.UNFOLLOW]: {
    label: 'Unfollow',
    description: 'User unfollowed another user',
    icon: 'UserMinus',
    color: '#EF4444',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.BLOCK]: {
    label: 'Block',
    description: 'User blocked another user',
    icon: 'ShieldOff',
    color: '#EF4444',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.UNBLOCK]: {
    label: 'Unblock',
    description: 'User unblocked another user',
    icon: 'ShieldCheck',
    color: '#22C55E',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.REPORT]: {
    label: 'Report',
    description: 'User reported content or user',
    icon: 'Flag',
    color: '#EF4444',
    isCritical: false,
    requiresUser: true,
  },
  [AnalyticsEventName.APPEAL]: {
    label: 'Appeal',
    description: 'User appealed content or action',
    icon: 'Scale',
    color: '#F59E0B',
    isCritical: false,
    requiresUser: true,
  },
};

/**
 * Get event category
 */
export function getEventCategory(event: AnalyticsEventName): AnalyticsEventCategory {
  return ANALYTICS_EVENT_CATEGORY_MAP[event];
}

/**
 * Get event label
 */
export function getEventLabel(event: AnalyticsEventName): string {
  return ANALYTICS_EVENT_CONFIG[event]?.label || event;
}

/**
 * Get event description
 */
export function getEventDescription(event: AnalyticsEventName): string {
  return ANALYTICS_EVENT_CONFIG[event]?.description || '';
}

/**
 * Check if event is critical
 */
export function isEventCritical(event: AnalyticsEventName): boolean {
  return ANALYTICS_EVENT_CONFIG[event]?.isCritical || false;
}

/**
 * Check if event requires user
 */
export function eventRequiresUser(event: AnalyticsEventName): boolean {
  return ANALYTICS_EVENT_CONFIG[event]?.requiresUser || false;
}

/**
 * Get events by category
 */
export function getEventsByCategory(category: AnalyticsEventCategory): AnalyticsEventName[] {
  return Object.entries(ANALYTICS_EVENT_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([event]) => event as AnalyticsEventName);
}

/**
 * Get critical events
 */
export function getCriticalEvents(): AnalyticsEventName[] {
  return Object.values(AnalyticsEventName).filter((event) => isEventCritical(event));
}

/**
 * Get user events
 */
export function getUserEvents(): AnalyticsEventName[] {
  return Object.values(AnalyticsEventName).filter((event) => eventRequiresUser(event));
}

/**
 * Event priority levels
 */
export enum AnalyticsEventPriority {
  /** Critical events - process immediately */
  CRITICAL = 'CRITICAL',
  /** High priority events - process quickly */
  HIGH = 'HIGH',
  /** Medium priority events - normal processing */
  MEDIUM = 'MEDIUM',
  /** Low priority events - batch processing */
  LOW = 'LOW',
}

/**
 * Get event priority
 */
export function getEventPriority(event: AnalyticsEventName): AnalyticsEventPriority {
  const isCritical = isEventCritical(event);
  const requiresUser = eventRequiresUser(event);

  if (isCritical) {
    return AnalyticsEventPriority.CRITICAL;
  }
  if (requiresUser) {
    return AnalyticsEventPriority.HIGH;
  }
  return AnalyticsEventPriority.MEDIUM;
}
