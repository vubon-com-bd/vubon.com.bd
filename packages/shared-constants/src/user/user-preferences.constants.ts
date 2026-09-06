/**
 * User Preferences Constants (EXTENDS common/types)
 * @module shared-constants/user/user-preferences.constants
 */

import { TYPES } from '../common/types.constants';

export const USER_PREFERENCES = {
  // Base types from common
  ...TYPES,

  // Preference categories
  CATEGORIES: {
    GENERAL: 'general',
    NOTIFICATIONS: 'notifications',
    DISPLAY: 'display',
    LANGUAGE: 'language',
    REGIONAL: 'regional',
    ACCESSIBILITY: 'accessibility',
    PRIVACY: 'privacy',
    CONTENT: 'content',
    SHOPPING: 'shopping',
    PAYMENT: 'payment',
    SHIPPING: 'shipping',
    SOCIAL: 'social',
    COMMUNICATION: 'communication',
  } as const,

  // Preference types
  TYPES: {
    SWITCH: 'switch',
    SELECT: 'select',
    MULTI_SELECT: 'multi_select',
    SLIDER: 'slider',
    INPUT: 'input',
    TEXTAREA: 'textarea',
    DATE: 'date',
    TIME: 'time',
    COLOR: 'color',
    FILE: 'file',
    IMAGE: 'image',
  } as const,

  // Content preferences
  CONTENT: {
    SHOW_AGE_RESTRICTED: 'show_age_restricted',
    SHOW_MATURE_CONTENT: 'show_mature_content',
    SHOW_ADULT_CONTENT: 'show_adult_content',
    SAFE_SEARCH: 'safe_search',
    EXPLICIT_FILTER: 'explicit_filter',
    PROFANITY_FILTER: 'profanity_filter',
    CONTENT_LANGUAGE: 'content_language',
    CONTENT_REGION: 'content_region',
    PERSONALIZED_CONTENT: 'personalized_content',
    RECOMMENDATIONS: 'recommendations',
  } as const,

  // Shopping preferences
  SHOPPING: {
    WISHLIST_VISIBILITY: 'wishlist_visibility',
    ORDER_HISTORY_VISIBILITY: 'order_history_visibility',
    SAVED_PAYMENT_METHODS: 'saved_payment_methods',
    DEFAULT_PAYMENT_METHOD: 'default_payment_method',
    DEFAULT_SHIPPING_ADDRESS: 'default_shipping_address',
    DEFAULT_BILLING_ADDRESS: 'default_billing_address',
    SAVE_ADDRESSES: 'save_addresses',
    SAVE_PAYMENT_INFO: 'save_payment_info',
    AUTO_APPLY_DISCOUNTS: 'auto_apply_discounts',
    PRICE_ALERTS: 'price_alerts',
    BACK_IN_STOCK_ALERTS: 'back_in_stock_alerts',
    NEW_PRODUCT_ALERTS: 'new_product_alerts',
  } as const,

  // Communication preferences
  COMMUNICATION: {
    EMAIL_FREQUENCY: 'email_frequency',
    SMS_FREQUENCY: 'sms_frequency',
    PUSH_FREQUENCY: 'push_frequency',
    MARKETING_EMAILS: 'marketing_emails',
    PROMOTIONAL_SMS: 'promotional_sms',
    NEWSLETTER: 'newsletter',
    SURVEYS: 'surveys',
    FEEDBACK_REQUESTS: 'feedback_requests',
    SUPPORT_UPDATES: 'support_updates',
    ORDER_UPDATES: 'order_updates',
    PAYMENT_UPDATES: 'payment_updates',
    SHIPPING_UPDATES: 'shipping_updates',
    SECURITY_ALERTS: 'security_alerts',
    SYSTEM_NOTIFICATIONS: 'system_notifications',
  } as const,

  // Social preferences
  SOCIAL: {
    SHARE_ACTIVITY: 'share_activity',
    SHARE_PURCHASES: 'share_purchases',
    SHARE_REVIEWS: 'share_reviews',
    SHARE_RATINGS: 'share_ratings',
    SOCIAL_LOGIN: 'social_login',
    AUTO_SHARE: 'auto_share',
    SHOW_SOCIAL_PROFILE: 'show_social_profile',
    CONNECT_SOCIAL_ACCOUNTS: 'connect_social_accounts',
  } as const,

  // Accessibility preferences
  ACCESSIBILITY: {
    HIGH_CONTRAST: 'high_contrast',
    LARGE_TEXT: 'large_text',
    REDUCED_MOTION: 'reduced_motion',
    SCREEN_READER: 'screen_reader',
    KEYBOARD_NAVIGATION: 'keyboard_navigation',
    CAPTIONS: 'captions',
    AUDIO_DESCRIPTION: 'audio_description',
    FONT_FAMILY: 'font_family',
    LINE_HEIGHT: 'line_height',
    LETTER_SPACING: 'letter_spacing',
  } as const,

  // Default values
  DEFAULTS: {
    EMAIL_FREQUENCY: 'daily',
    SMS_FREQUENCY: 'instant',
    PUSH_FREQUENCY: 'instant',
    WISHLIST_VISIBILITY: 'private',
    ORDER_HISTORY_VISIBILITY: 'private',
    SAVE_ADDRESSES: true,
    SAVE_PAYMENT_INFO: false,
    AUTO_APPLY_DISCOUNTS: true,
    PRICE_ALERTS: true,
    BACK_IN_STOCK_ALERTS: true,
    NEW_PRODUCT_ALERTS: false,
    MARKETING_EMAILS: true,
    PROMOTIONAL_SMS: false,
    NEWSLETTER: true,
    SURVEYS: false,
    FEEDBACK_REQUESTS: true,
    SHARE_ACTIVITY: false,
    SHARE_PURCHASES: false,
    SHARE_REVIEWS: true,
    SOCIAL_LOGIN: true,
    AUTO_SHARE: false,
    HIGH_CONTRAST: false,
    LARGE_TEXT: false,
    REDUCED_MOTION: false,
    SCREEN_READER: false,
    KEYBOARD_NAVIGATION: true,
    CAPTIONS: true,
    SAFE_SEARCH: true,
    EXPLICIT_FILTER: true,
    PROFANITY_FILTER: true,
    PERSONALIZED_CONTENT: true,
    RECOMMENDATIONS: true,
  },
} as const;

export type UserPreferenceCategory =
  (typeof USER_PREFERENCES.CATEGORIES)[keyof typeof USER_PREFERENCES.CATEGORIES];
export type UserPreferenceType =
  (typeof USER_PREFERENCES.TYPES)[keyof typeof USER_PREFERENCES.TYPES];
