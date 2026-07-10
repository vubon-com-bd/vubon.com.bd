/**
 * Notification Constants - Enterprise Grade
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-constants/notification.constants
 * 
 * RULES:
 * ✅ ONLY pure readonly constants - NO business logic
 * ✅ NO side effects, NO functions, NO class instances
 * ✅ Centralized notification configuration
 * ✅ Bangladesh specific (SMS gateways, Bengali templates)
 * ✅ Extensible for multi-channel notifications
 * 
 * @description
 * Centralized configuration for all notification-related constants.
 * Supports Email, SMS, WhatsApp, Push, and In-App notifications.
 */

// ============================================================
// Notification Channels (Enterprise Grade)
// ============================================================

/**
 * Supported notification channels
 * ✅ Complete list of channels for multi-channel communication
 */
export const NOTIFICATION_CHANNELS = {
  EMAIL: 'email',
  SMS: 'sms',
  WHATSAPP: 'whatsapp',
  PUSH: 'push',
  IN_APP: 'in_app',
  VOICE: 'voice',
} as const;

export type NotificationChannel = typeof NOTIFICATION_CHANNELS[keyof typeof NOTIFICATION_CHANNELS];

// ============================================================
// Notification Types (E-commerce Specific + Bangladesh)
// ============================================================

/**
 * Comprehensive notification types for vubon.com.bd
 * ✅ Covers all user journeys: Auth, Orders, Payments, Marketing, System
 */
export const NOTIFICATION_TYPES = {
  // ========== Authentication & Security ==========
  WELCOME_EMAIL: 'welcome_email',
  EMAIL_VERIFICATION: 'email_verification',
  PHONE_VERIFICATION: 'phone_verification',
  PASSWORD_RESET: 'password_reset',
  PASSWORD_CHANGED: 'password_changed',
  ACCOUNT_LOCKED: 'account_locked',
  ACCOUNT_UNLOCKED: 'account_unlocked',
  LOGIN_ALERT: 'login_alert',
  LOGIN_FROM_NEW_DEVICE: 'login_from_new_device',
  MFA_ENABLED: 'mfa_enabled',
  MFA_DISABLED: 'mfa_disabled',
  MFA_BACKUP_CODES_GENERATED: 'mfa_backup_codes_generated',

  // ========== Order Management ==========
  ORDER_CONFIRMATION: 'order_confirmation',
  ORDER_SHIPPED: 'order_shipped',
  ORDER_OUT_FOR_DELIVERY: 'order_out_for_delivery',
  ORDER_DELIVERED: 'order_delivered',
  ORDER_CANCELLED: 'order_cancelled',
  ORDER_REFUNDED: 'order_refunded',
  ORDER_DELAYED: 'order_delayed',

  // ========== Payment & Billing ==========
  PAYMENT_SUCCESS: 'payment_success',
  PAYMENT_FAILED: 'payment_failed',
  PAYMENT_REFUNDED: 'payment_refunded',
  INVOICE_GENERATED: 'invoice_generated',
  
  // Bangladesh Specific Payment Gateways
  BKASH_PAYMENT_SUCCESS: 'bkash_payment_success',
  BKASH_PAYMENT_FAILED: 'bkash_payment_failed',
  NAGAD_PAYMENT_SUCCESS: 'nagad_payment_success',
  NAGAD_PAYMENT_FAILED: 'nagad_payment_failed',
  ROCKET_PAYMENT_SUCCESS: 'rocket_payment_success',
  ROCKET_PAYMENT_FAILED: 'rocket_payment_failed',

  // ========== Inventory & Products ==========
  LOW_STOCK_ALERT: 'low_stock_alert',
  BACK_IN_STOCK: 'back_in_stock',
  PRICE_DROP: 'price_drop',

  // ========== Marketing & Promotions ==========
  PROMOTIONAL: 'promotional',
  NEWSLETTER: 'newsletter',
  OFFER_AVAILABLE: 'offer_available',
  FLASH_SALE_STARTED: 'flash_sale_started',
  COUPON_AVAILABLE: 'coupon_available',

  // ========== User Engagement ==========
  ABANDONED_CART: 'abandoned_cart',
  WISHLIST_PRICE_DROP: 'wishlist_price_drop',
  ORDER_REMINDER: 'order_reminder',

  // ========== System & Admin ==========
  SYSTEM_ALERT: 'system_alert',
  SECURITY_ALERT: 'security_alert',
  MAINTENANCE_UPDATE: 'maintenance_update',
  COMPLIANCE_REPORT: 'compliance_report',

  // ========== Delivery (Bangladesh Specific) ==========
  DELIVERY_AGENT_ASSIGNED: 'delivery_agent_assigned',
  DELIVERY_AGENT_UPDATE: 'delivery_agent_update',
  DELIVERY_OTP_VERIFICATION: 'delivery_otp_verification',
} as const;

export type NotificationType = typeof NOTIFICATION_TYPES[keyof typeof NOTIFICATION_TYPES];

// ============================================================
// Notification Priority (For Queue & Delivery)
// ============================================================

export const NOTIFICATION_PRIORITY = {
  CRITICAL: 10,  // Account locks, Security alerts
  HIGH: 8,       // Order confirmations, Payment failures
  NORMAL: 5,     // Promotional, Newsletters
  LOW: 3,        // System updates, Maintenance
  BULK: 1,       // Bulk marketing emails
} as const;

export type NotificationPriority = typeof NOTIFICATION_PRIORITY[keyof typeof NOTIFICATION_PRIORITY];

// ============================================================
// TTL (Time-To-Live) Configuration (In Seconds)
// ============================================================

export const NOTIFICATION_TTL = {
  EMAIL: {
    VERIFICATION: 86400,   // 24 hours
    RESET: 3600,           // 1 hour
    OTP: 300,              // 5 minutes
    MARKETING: 604800,     // 7 days
    TRANSACTIONAL: 259200, // 3 days
  },
  SMS: {
    OTP: 300,              // 5 minutes
    TRANSACTIONAL: 3600,   // 1 hour
    PROMOTIONAL: 86400,    // 24 hours
  },
  WHATSAPP: {
    OTP: 300,              // 5 minutes
    ORDER: 3600,           // 1 hour
    PROMOTIONAL: 86400,    // 24 hours
  },
  PUSH: {
    NOTIFICATION: 86400,   // 24 hours
    ALERT: 3600,           // 1 hour
  },
  IN_APP: {
    NOTIFICATION: 604800,  // 7 days
    ALERT: 86400,          // 24 hours
  },
} as const;

export type NotificationTTL = typeof NOTIFICATION_TTL;

// ============================================================
// Bangladesh Specific: SMS Gateway Configuration
// ============================================================

export const SMS_GATEWAY_CONFIG = {
  // ========== Primary Gateways (Bangladesh) ==========
  SSL_WIRELESS: {
    NAME: 'SSL Wireless',
    PRIORITY: 1,
    SUPPORTED_OPERATORS: ['gp', 'robi', 'banglalink', 'teletalk', 'all'],
    MAX_RETRIES: 3,
    TIMEOUT_MS: 5000,
    MAX_PER_SECOND: 100,
  },
  BANGLALINK_SMS: {
    NAME: 'Banglalink SMS',
    PRIORITY: 2,
    SUPPORTED_OPERATORS: ['banglalink'],
    MAX_RETRIES: 3,
    TIMEOUT_MS: 5000,
    MAX_PER_SECOND: 50,
  },
  GP_SMS: {
    NAME: 'Grameenphone SMS',
    PRIORITY: 3,
    SUPPORTED_OPERATORS: ['gp'],
    MAX_RETRIES: 3,
    TIMEOUT_MS: 5000,
    MAX_PER_SECOND: 50,
  },
  ROBI_SMS: {
    NAME: 'Robi SMS',
    PRIORITY: 4,
    SUPPORTED_OPERATORS: ['robi'],
    MAX_RETRIES: 3,
    TIMEOUT_MS: 5000,
    MAX_PER_SECOND: 50,
  },
  TELETALK_SMS: {
    NAME: 'Teletalk SMS',
    PRIORITY: 5,
    SUPPORTED_OPERATORS: ['teletalk'],
    MAX_RETRIES: 3,
    TIMEOUT_MS: 5000,
    MAX_PER_SECOND: 30,
  },
} as const;

// ============================================================
// WhatsApp Business API Configuration
// ============================================================

export const WHATSAPP_TEMPLATES = {
  OTP_VERIFICATION: {
    NAME: 'vubon_otp_verification',
    LANGUAGE: 'en',
    CATEGORY: 'AUTHENTICATION',
    COMPONENTS: ['body', 'footer'],
  },
  ORDER_CONFIRMATION: {
    NAME: 'vubon_order_confirmation',
    LANGUAGE: 'en',
    CATEGORY: 'TRANSACTIONAL',
    COMPONENTS: ['body', 'header', 'footer'],
  },
  ORDER_SHIPPED: {
    NAME: 'vubon_order_shipped',
    LANGUAGE: 'en',
    CATEGORY: 'TRANSACTIONAL',
    COMPONENTS: ['body', 'header', 'footer'],
  },
  PAYMENT_SUCCESS: {
    NAME: 'vubon_payment_success',
    LANGUAGE: 'en',
    CATEGORY: 'TRANSACTIONAL',
    COMPONENTS: ['body', 'header', 'footer'],
  },
  PAYMENT_FAILED: {
    NAME: 'vubon_payment_failed',
    LANGUAGE: 'en',
    CATEGORY: 'TRANSACTIONAL',
    COMPONENTS: ['body', 'header', 'footer'],
  },
  ABANDONED_CART: {
    NAME: 'vubon_abandoned_cart',
    LANGUAGE: 'en',
    CATEGORY: 'MARKETING',
    COMPONENTS: ['body', 'header', 'footer'],
  },
  ACCOUNT_LOCKED: {
    NAME: 'vubon_account_locked',
    LANGUAGE: 'en',
    CATEGORY: 'AUTHENTICATION',
    COMPONENTS: ['body', 'footer'],
  },
  // Bangladesh Specific Templates (Bengali)
  ACCOUNT_LOCKED_BN: {
    NAME: 'vubon_account_locked_bn',
    LANGUAGE: 'bn',
    CATEGORY: 'AUTHENTICATION',
    COMPONENTS: ['body', 'footer'],
  },
  PAYMENT_SUCCESS_BN: {
    NAME: 'vubon_payment_success_bn',
    LANGUAGE: 'bn',
    CATEGORY: 'TRANSACTIONAL',
    COMPONENTS: ['body', 'header', 'footer'],
  },
} as const;

export type WhatsAppTemplateName = typeof WHATSAPP_TEMPLATES[keyof typeof WHATSAPP_TEMPLATES]['NAME'];

// ============================================================
// Email Configuration
// ============================================================

export const EMAIL_CONFIG = {
  // ========== Email Headers ==========
  FROM_NAME: 'Vubon',
  FROM_NAME_BN: 'ভুবন',
  FROM_EMAIL: 'noreply@vubon.com.bd',

  // ========== Template IDs (Transactional & Marketing) ==========
  TEMPLATES: {
    WELCOME: 'd-1a2b3c4d5e6f7g8h9i0j',
    EMAIL_VERIFICATION: 'd-2b3c4d5e6f7g8h9i0j1k',
    PASSWORD_RESET: 'd-3c4d5e6f7g8h9i0j1k2l',
    ORDER_CONFIRMATION: 'd-4d5e6f7g8h9i0j1k2l3m',
    ORDER_SHIPPED: 'd-5e6f7g8h9i0j1k2l3m4n',
    PAYMENT_SUCCESS: 'd-6f7g8h9i0j1k2l3m4n5o',
    PAYMENT_FAILED: 'd-7g8h9i0j1k2l3m4n5o6p',
    ABANDONED_CART: 'd-8h9i0j1k2l3m4n5o6p7q',
    ACCOUNT_LOCKED: 'd-9i0j1k2l3m4n5o6p7q8r',
    MFA_ENABLED: 'd-0j1k2l3m4n5o6p7q8r9s',
    NEWSLETTER: 'd-1k2l3m4n5o6p7q8r9s0t',
    OFFER_ALERT: 'd-2l3m4n5o6p7q8r9s0t1u',
  },

  // ========== Email Delivery Settings ==========
  DELIVERY: {
    MAX_RETRIES: 3,
    RETRY_DELAY_MS: 60000,  // 1 minute
    TIMEOUT_MS: 10000,
    MAX_PER_SECOND: 50,
    MAX_PER_DAY: 100000,
  },

  // ========== Email Categories ==========
  CATEGORIES: {
    TRANSACTIONAL: 'transactional',
    MARKETING: 'marketing',
    SYSTEM: 'system',
    AUTHENTICATION: 'authentication',
    SECURITY: 'security',
  },
} as const;

// ============================================================
// Push Notification Configuration
// ============================================================

export const PUSH_CONFIG = {
  // ========== Platform Support ==========
  PLATFORMS: {
    WEB: 'web',
    ANDROID: 'android',
    IOS: 'ios',
    DESKTOP: 'desktop',
  } as const,

  // ========== Delivery Settings ==========
  DELIVERY: {
    MAX_RETRIES: 3,
    RETRY_DELAY_MS: 30000,
    TIMEOUT_MS: 10000,
    MAX_PER_SECOND: 100,
    TTL_SECONDS: 86400,  // 24 hours
  },

  // ========== Platform-Specific Config ==========
  ANDROID: {
    CHANNEL_ID: 'vubon_notifications',
    CHANNEL_NAME: 'Vubon Notifications',
    CHANNEL_DESCRIPTION: 'Notifications from Vubon E-commerce',
    SOUND: 'default',
    PRIORITY: 'high',
  },
  IOS: {
    SOUND: 'default',
    PRIORITY: 'high',
    INTERRUPTION_LEVEL: 'active',
    RELEVANCE_SCORE: 100,
  },
  WEB: {
    ICON: '/icons/notification-icon.png',
    BADGE: '/icons/badge-icon.png',
    VIBRATE: [200, 100, 200],
  },
} as const;

// ============================================================
// In-App Notification Configuration
// ============================================================

export const IN_APP_CONFIG = {
  // ========== Retention Settings ==========
  RETENTION: {
    READ: 604800,    // 7 days
    UNREAD: 2592000, // 30 days
    MAX_PER_USER: 500,
  },

  // ========== Display Settings ==========
  DISPLAY: {
    MAX_TITLE_LENGTH: 100,
    MAX_BODY_LENGTH: 500,
    MAX_BODY_LENGTH_BN: 1000, // Bengali characters take more space
    RICH_TEXT_SUPPORT: true,
    IMAGE_SUPPORT: true,
    ACTION_BUTTONS: true,
  },

  // ========== Categories ==========
  CATEGORIES: {
    ORDER: 'order',
    PAYMENT: 'payment',
    SHIPPING: 'shipping',
    MARKETING: 'marketing',
    SECURITY: 'security',
    SYSTEM: 'system',
    SOCIAL: 'social',
  },
} as const;

// ============================================================
// Rate Limit Configuration (Prevent Abuse)
// ============================================================

export const NOTIFICATION_RATE_LIMITS = {
  // ========== Per User (Daily) ==========
  PER_USER: {
    EMAIL: {
      MAX_DAILY: 50,
      MAX_HOURLY: 10,
      MAX_MINUTE: 2,
    },
    SMS: {
      MAX_DAILY: 10,
      MAX_HOURLY: 3,
      MAX_MINUTE: 1,
    },
    WHATSAPP: {
      MAX_DAILY: 20,
      MAX_HOURLY: 5,
      MAX_MINUTE: 2,
    },
    PUSH: {
      MAX_DAILY: 100,
      MAX_HOURLY: 20,
      MAX_MINUTE: 5,
    },
    IN_APP: {
      MAX_DAILY: 200,
      MAX_HOURLY: 40,
      MAX_MINUTE: 10,
    },
  },

  // ========== Global Limits ==========
  GLOBAL: {
    EMAIL: 100000,    // Per day
    SMS: 50000,       // Per day
    WHATSAPP: 20000,  // Per day
    PUSH: 500000,     // Per day
    IN_APP: 1000000,  // Per day
  },

  // ========== Cooldown Periods (Seconds) ==========
  COOLDOWN: {
    EMAIL: {
      RESEND: 60,
      PASSWORD_RESET: 300,
    },
    SMS: {
      RESEND: 30,
      OTP: 60,
    },
    WHATSAPP: {
      RESEND: 30,
      OTP: 60,
    },
  },
} as const;

// ============================================================
// Retry & Backoff Configuration
// ============================================================

export const NOTIFICATION_RETRY = {
  // ========== Retry Strategy ==========
  STRATEGY: {
    LINEAR: 'linear',
    EXPONENTIAL: 'exponential',
    FIXED: 'fixed',
  } as const,

  // ========== Retry Counts by Channel ==========
  MAX_ATTEMPTS: {
    EMAIL: 3,
    SMS: 3,
    WHATSAPP: 3,
    PUSH: 3,
    IN_APP: 1,
  },

  // ========== Exponential Backoff ==========
  BACKOFF: {
    INITIAL_DELAY_MS: 1000,
    MAX_DELAY_MS: 60000,
    MULTIPLIER: 2,
  },

  // ========== Dead Letter Queue ==========
  DLQ: {
    ENABLED: true,
    MAX_AGE_DAYS: 7,
    RETRY_SCHEDULE: '0 */6 * * *', // Every 6 hours
  },
} as const;

// ============================================================
// Bangladesh Specific: Language & Formatting
// ============================================================

export const BANGLADESH_NOTIFICATION_CONFIG = {
  // ========== Supported Languages ==========
  LANGUAGES: {
    ENGLISH: 'en',
    BENGALI: 'bn',
  } as const,

  // ========== SMS Character Limits ==========
  SMS_LIMITS: {
    STANDARD: 160,   // 7-bit GSM
    UNICODE: 70,     // For Bengali
    CONCATENATED_MAX: 1530, // 10 messages
  },

  // ========== National Holidays (No Promotional Notifications) ==========
  NATIONAL_HOLIDAYS: [
    '2025-02-21', // Ekushey February
    '2025-03-17', // Bangabandhu Birth Anniversary
    '2025-03-26', // Independence Day
    '2025-04-14', // Bengali New Year
    '2025-05-01', // May Day
    '2025-08-15', // National Mourning Day
    '2025-12-16', // Victory Day
    '2025-12-25', // Christmas
  ],

  // ========== Peak Hours (Avoid Spam) ==========
  PEAK_HOURS: {
    MORNING: { START: 8, END: 10 },
    EVENING: { START: 18, END: 22 },
    AVOID: { START: 22, END: 8 }, // Night time - avoid promotions
  },
} as const;

// ============================================================
// Template Variables (Common Placeholders)
// ============================================================

export const TEMPLATE_VARIABLES = {
  // ========== User Variables ==========
  USER: {
    FIRST_NAME: '{{firstName}}',
    LAST_NAME: '{{lastName}}',
    FULL_NAME: '{{fullName}}',
    EMAIL: '{{email}}',
    PHONE: '{{phone}}',
    USER_ID: '{{userId}}',
  },

  // ========== Order Variables ==========
  ORDER: {
    ID: '{{orderId}}',
    NUMBER: '{{orderNumber}}',
    AMOUNT: '{{orderAmount}}',
    CURRENCY: '{{orderCurrency}}',
    STATUS: '{{orderStatus}}',
    ITEMS: '{{orderItems}}',
    TOTAL_ITEMS: '{{totalItems}}',
    SHIPPING_ADDRESS: '{{shippingAddress}}',
    DELIVERY_DATE: '{{deliveryDate}}',
  },

  // ========== Payment Variables ==========
  PAYMENT: {
    ID: '{{paymentId}}',
    METHOD: '{{paymentMethod}}',
    AMOUNT: '{{paymentAmount}}',
    STATUS: '{{paymentStatus}}',
    TRANSACTION_ID: '{{transactionId}}',
    GATEWAY: '{{paymentGateway}}',
  },

  // ========== Security Variables ==========
  SECURITY: {
    OTP: '{{otp}}',
    OTP_EXPIRY: '{{otpExpiryMinutes}}',
    RESET_LINK: '{{resetLink}}',
    VERIFICATION_LINK: '{{verificationLink}}',
    LOGIN_LINK: '{{loginLink}}',
    DEVICE: '{{device}}',
    IP_ADDRESS: '{{ipAddress}}',
    LOCATION: '{{location}}',
  },

  // ========== Marketing Variables ==========
  MARKETING: {
    OFFER_NAME: '{{offerName}}',
    DISCOUNT: '{{discount}}',
    CODE: '{{promoCode}}',
    EXPIRY_DATE: '{{expiryDate}}',
    PRODUCT_NAME: '{{productName}}',
    PRODUCT_URL: '{{productUrl}}',
    SHOP_URL: '{{shopUrl}}',
  },

  // ========== System Variables ==========
  SYSTEM: {
    APP_NAME: '{{appName}}',
    APP_URL: '{{appUrl}}',
    SUPPORT_EMAIL: '{{supportEmail}}',
    SUPPORT_PHONE: '{{supportPhone}}',
    YEAR: '{{year}}',
  },
} as const;

// ============================================================
// Notification Status (For Tracking)
// ============================================================

export const NOTIFICATION_STATUS = {
  PENDING: 'pending',
  QUEUED: 'queued',
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read',
  CLICKED: 'clicked',
  FAILED: 'failed',
  BOUNCED: 'bounced',
  SPAM: 'spam',
  BLOCKED: 'blocked',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
} as const;

export type NotificationStatus = typeof NOTIFICATION_STATUS[keyof typeof NOTIFICATION_STATUS];

// ============================================================
// Notification Type to Channel Mapping (Business Rules)
// ============================================================

export const NOTIFICATION_TYPE_TO_CHANNEL: Record<NotificationType, NotificationChannel[]> = {
  // Authentication
  [NOTIFICATION_TYPES.WELCOME_EMAIL]: ['email'],
  [NOTIFICATION_TYPES.EMAIL_VERIFICATION]: ['email'],
  [NOTIFICATION_TYPES.PHONE_VERIFICATION]: ['sms', 'whatsapp'],
  [NOTIFICATION_TYPES.PASSWORD_RESET]: ['email', 'sms'],
  [NOTIFICATION_TYPES.PASSWORD_CHANGED]: ['email'],
  [NOTIFICATION_TYPES.ACCOUNT_LOCKED]: ['email', 'sms', 'whatsapp'],
  [NOTIFICATION_TYPES.ACCOUNT_UNLOCKED]: ['email', 'sms'],
  [NOTIFICATION_TYPES.LOGIN_ALERT]: ['email', 'sms', 'push'],
  [NOTIFICATION_TYPES.LOGIN_FROM_NEW_DEVICE]: ['email', 'sms'],
  [NOTIFICATION_TYPES.MFA_ENABLED]: ['email', 'sms'],
  [NOTIFICATION_TYPES.MFA_DISABLED]: ['email'],
  [NOTIFICATION_TYPES.MFA_BACKUP_CODES_GENERATED]: ['email'],

  // Orders
  [NOTIFICATION_TYPES.ORDER_CONFIRMATION]: ['email', 'sms', 'push', 'whatsapp'],
  [NOTIFICATION_TYPES.ORDER_SHIPPED]: ['email', 'sms', 'push', 'whatsapp'],
  [NOTIFICATION_TYPES.ORDER_OUT_FOR_DELIVERY]: ['email', 'sms', 'push'],
  [NOTIFICATION_TYPES.ORDER_DELIVERED]: ['email', 'sms', 'push'],
  [NOTIFICATION_TYPES.ORDER_CANCELLED]: ['email', 'sms'],
  [NOTIFICATION_TYPES.ORDER_REFUNDED]: ['email'],
  [NOTIFICATION_TYPES.ORDER_DELAYED]: ['email', 'sms'],

  // Payments
  [NOTIFICATION_TYPES.PAYMENT_SUCCESS]: ['email', 'sms', 'push', 'whatsapp'],
  [NOTIFICATION_TYPES.PAYMENT_FAILED]: ['email', 'sms', 'push'],
  [NOTIFICATION_TYPES.PAYMENT_REFUNDED]: ['email'],
  [NOTIFICATION_TYPES.INVOICE_GENERATED]: ['email'],
  [NOTIFICATION_TYPES.BKASH_PAYMENT_SUCCESS]: ['email', 'sms'],
  [NOTIFICATION_TYPES.BKASH_PAYMENT_FAILED]: ['email', 'sms'],
  [NOTIFICATION_TYPES.NAGAD_PAYMENT_SUCCESS]: ['email', 'sms'],
  [NOTIFICATION_TYPES.NAGAD_PAYMENT_FAILED]: ['email', 'sms'],
  [NOTIFICATION_TYPES.ROCKET_PAYMENT_SUCCESS]: ['email', 'sms'],
  [NOTIFICATION_TYPES.ROCKET_PAYMENT_FAILED]: ['email', 'sms'],

  // Inventory
  [NOTIFICATION_TYPES.LOW_STOCK_ALERT]: ['email', 'in_app'],
  [NOTIFICATION_TYPES.BACK_IN_STOCK]: ['email', 'push'],
  [NOTIFICATION_TYPES.PRICE_DROP]: ['email', 'push'],

  // Marketing
  [NOTIFICATION_TYPES.PROMOTIONAL]: ['email'],
  [NOTIFICATION_TYPES.NEWSLETTER]: ['email'],
  [NOTIFICATION_TYPES.OFFER_AVAILABLE]: ['email', 'push'],
  [NOTIFICATION_TYPES.FLASH_SALE_STARTED]: ['email', 'push', 'sms'],
  [NOTIFICATION_TYPES.COUPON_AVAILABLE]: ['email', 'push'],

  // Engagement
  [NOTIFICATION_TYPES.ABANDONED_CART]: ['email', 'whatsapp', 'push'],
  [NOTIFICATION_TYPES.WISHLIST_PRICE_DROP]: ['email', 'push'],
  [NOTIFICATION_TYPES.ORDER_REMINDER]: ['email', 'sms'],

  // System
  [NOTIFICATION_TYPES.SYSTEM_ALERT]: ['email', 'in_app'],
  [NOTIFICATION_TYPES.SECURITY_ALERT]: ['email', 'sms'],
  [NOTIFICATION_TYPES.MAINTENANCE_UPDATE]: ['email', 'in_app'],
  [NOTIFICATION_TYPES.COMPLIANCE_REPORT]: ['email'],

  // Delivery (Bangladesh)
  [NOTIFICATION_TYPES.DELIVERY_AGENT_ASSIGNED]: ['sms', 'push', 'whatsapp'],
  [NOTIFICATION_TYPES.DELIVERY_AGENT_UPDATE]: ['sms', 'push'],
  [NOTIFICATION_TYPES.DELIVERY_OTP_VERIFICATION]: ['sms', 'whatsapp'],
};

// ============================================================
// Notification Priority Mapping (Critical, High, Normal, Low)
// ============================================================

export const NOTIFICATION_PRIORITY_MAP: Record<NotificationType, number> = {
  // Critical - Security & Account Safety
  [NOTIFICATION_TYPES.ACCOUNT_LOCKED]: NOTIFICATION_PRIORITY.CRITICAL,
  [NOTIFICATION_TYPES.ACCOUNT_UNLOCKED]: NOTIFICATION_PRIORITY.CRITICAL,
  [NOTIFICATION_TYPES.SECURITY_ALERT]: NOTIFICATION_PRIORITY.CRITICAL,

  // High - Order & Payment
  [NOTIFICATION_TYPES.ORDER_CONFIRMATION]: NOTIFICATION_PRIORITY.HIGH,
  [NOTIFICATION_TYPES.PAYMENT_FAILED]: NOTIFICATION_PRIORITY.HIGH,
  [NOTIFICATION_TYPES.PAYMENT_REFUNDED]: NOTIFICATION_PRIORITY.HIGH,
  [NOTIFICATION_TYPES.ORDER_REFUNDED]: NOTIFICATION_PRIORITY.HIGH,
  [NOTIFICATION_TYPES.PASSWORD_RESET]: NOTIFICATION_PRIORITY.HIGH,
  [NOTIFICATION_TYPES.EMAIL_VERIFICATION]: NOTIFICATION_PRIORITY.HIGH,
  [NOTIFICATION_TYPES.PHONE_VERIFICATION]: NOTIFICATION_PRIORITY.HIGH,
  [NOTIFICATION_TYPES.LOGIN_FROM_NEW_DEVICE]: NOTIFICATION_PRIORITY.HIGH,
  [NOTIFICATION_TYPES.MFA_ENABLED]: NOTIFICATION_PRIORITY.HIGH,
  [NOTIFICATION_TYPES.MFA_BACKUP_CODES_GENERATED]: NOTIFICATION_PRIORITY.HIGH,
  [NOTIFICATION_TYPES.ORDER_OUT_FOR_DELIVERY]: NOTIFICATION_PRIORITY.HIGH,
  [NOTIFICATION_TYPES.DELIVERY_OTP_VERIFICATION]: NOTIFICATION_PRIORITY.HIGH,
  [NOTIFICATION_TYPES.BKASH_PAYMENT_FAILED]: NOTIFICATION_PRIORITY.HIGH,
  [NOTIFICATION_TYPES.NAGAD_PAYMENT_FAILED]: NOTIFICATION_PRIORITY.HIGH,
  [NOTIFICATION_TYPES.ROCKET_PAYMENT_FAILED]: NOTIFICATION_PRIORITY.HIGH,

  // Normal - Updates & Confirmations
  [NOTIFICATION_TYPES.WELCOME_EMAIL]: NOTIFICATION_PRIORITY.NORMAL,
  [NOTIFICATION_TYPES.PASSWORD_CHANGED]: NOTIFICATION_PRIORITY.NORMAL,
  [NOTIFICATION_TYPES.LOGIN_ALERT]: NOTIFICATION_PRIORITY.NORMAL,
  [NOTIFICATION_TYPES.MFA_DISABLED]: NOTIFICATION_PRIORITY.NORMAL,
  [NOTIFICATION_TYPES.ORDER_SHIPPED]: NOTIFICATION_PRIORITY.NORMAL,
  [NOTIFICATION_TYPES.ORDER_DELIVERED]: NOTIFICATION_PRIORITY.NORMAL,
  [NOTIFICATION_TYPES.ORDER_CANCELLED]: NOTIFICATION_PRIORITY.NORMAL,
  [NOTIFICATION_TYPES.PAYMENT_SUCCESS]: NOTIFICATION_PRIORITY.NORMAL,
  [NOTIFICATION_TYPES.INVOICE_GENERATED]: NOTIFICATION_PRIORITY.NORMAL,
  [NOTIFICATION_TYPES.BKASH_PAYMENT_SUCCESS]: NOTIFICATION_PRIORITY.NORMAL,
  [NOTIFICATION_TYPES.NAGAD_PAYMENT_SUCCESS]: NOTIFICATION_PRIORITY.NORMAL,
  [NOTIFICATION_TYPES.ROCKET_PAYMENT_SUCCESS]: NOTIFICATION_PRIORITY.NORMAL,
  [NOTIFICATION_TYPES.ORDER_DELAYED]: NOTIFICATION_PRIORITY.NORMAL,
  [NOTIFICATION_TYPES.BACK_IN_STOCK]: NOTIFICATION_PRIORITY.NORMAL,
  [NOTIFICATION_TYPES.PRICE_DROP]: NOTIFICATION_PRIORITY.NORMAL,
  [NOTIFICATION_TYPES.OFFER_AVAILABLE]: NOTIFICATION_PRIORITY.NORMAL,
  [NOTIFICATION_TYPES.ABANDONED_CART]: NOTIFICATION_PRIORITY.NORMAL,
  [NOTIFICATION_TYPES.WISHLIST_PRICE_DROP]: NOTIFICATION_PRIORITY.NORMAL,
  [NOTIFICATION_TYPES.ORDER_REMINDER]: NOTIFICATION_PRIORITY.NORMAL,
  [NOTIFICATION_TYPES.DELIVERY_AGENT_ASSIGNED]: NOTIFICATION_PRIORITY.NORMAL,
  [NOTIFICATION_TYPES.DELIVERY_AGENT_UPDATE]: NOTIFICATION_PRIORITY.NORMAL,
  [NOTIFICATION_TYPES.SYSTEM_ALERT]: NOTIFICATION_PRIORITY.NORMAL,

  // Low - Marketing & System
  [NOTIFICATION_TYPES.PROMOTIONAL]: NOTIFICATION_PRIORITY.LOW,
  [NOTIFICATION_TYPES.NEWSLETTER]: NOTIFICATION_PRIORITY.LOW,
  [NOTIFICATION_TYPES.FLASH_SALE_STARTED]: NOTIFICATION_PRIORITY.LOW,
  [NOTIFICATION_TYPES.COUPON_AVAILABLE]: NOTIFICATION_PRIORITY.LOW,
  [NOTIFICATION_TYPES.LOW_STOCK_ALERT]: NOTIFICATION_PRIORITY.LOW,
  [NOTIFICATION_TYPES.MAINTENANCE_UPDATE]: NOTIFICATION_PRIORITY.LOW,
  [NOTIFICATION_TYPES.COMPLIANCE_REPORT]: NOTIFICATION_PRIORITY.LOW,
};

// ============================================================
// Type Exports
// ============================================================

export type {
  NotificationChannel as NotificationChannelType,
  NotificationType as NotificationTypeType,
  NotificationPriority as NotificationPriorityType,
  NotificationStatus as NotificationStatusType,
  NotificationTTL as NotificationTTLType,
};
