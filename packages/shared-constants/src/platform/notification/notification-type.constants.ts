import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const NOTIFICATION_TYPE = {
  TYPES: {
    ...COMMON_TYPES,
    // System Notifications
    SYSTEM_ALERT: 'system_alert',
    SYSTEM_MAINTENANCE: 'system_maintenance',
    SYSTEM_UPDATE: 'system_update',

    // User Notifications
    USER_WELCOME: 'user_welcome',
    USER_VERIFICATION: 'user_verification',
    USER_PASSWORD_RESET: 'user_password_reset',
    USER_EMAIL_CHANGE: 'user_email_change',
    USER_PROFILE_UPDATE: 'user_profile_update',
    USER_ACCOUNT_SUSPENDED: 'user_account_suspended',
    USER_ACCOUNT_ACTIVATED: 'user_account_activated',

    // Order Notifications
    ORDER_CONFIRMATION: 'order_confirmation',
    ORDER_PROCESSING: 'order_processing',
    ORDER_SHIPPED: 'order_shipped',
    ORDER_DELIVERED: 'order_delivered',
    ORDER_CANCELLED: 'order_cancelled',
    ORDER_RETURNED: 'order_returned',
    ORDER_REFUNDED: 'order_refunded',

    // Payment Notifications
    PAYMENT_RECEIVED: 'payment_received',
    PAYMENT_FAILED: 'payment_failed',
    PAYMENT_REFUNDED: 'payment_refunded',
    INVOICE_GENERATED: 'invoice_generated',

    // Cart Notifications
    CART_ABANDONED: 'cart_abandoned',
    CART_REMINDER: 'cart_reminder',
    PRICE_DROP: 'price_drop',
    BACK_IN_STOCK: 'back_in_stock',

    // Marketing Notifications
    PROMOTIONAL_OFFER: 'promotional_offer',
    DISCOUNT_ALERT: 'discount_alert',
    FLASH_SALE: 'flash_sale',
    NEW_ARRIVAL: 'new_arrival',
    SPECIAL_OFFER: 'special_offer',
    REFERRAL_REWARD: 'referral_reward',
    LOYALTY_POINTS: 'loyalty_points',

    // Vendor Notifications
    VENDOR_ORDER_RECEIVED: 'vendor_order_received',
    VENDOR_PAYOUT: 'vendor_payout',
    VENDOR_APPROVAL: 'vendor_approval',
    VENDOR_SUSPENSION: 'vendor_suspension',
    VENDOR_REVIEW: 'vendor_review',

    // Support Notifications
    SUPPORT_TICKET_CREATED: 'support_ticket_created',
    SUPPORT_TICKET_UPDATED: 'support_ticket_updated',
    SUPPORT_TICKET_RESOLVED: 'support_ticket_resolved',
    SUPPORT_TICKET_ESCALATED: 'support_ticket_escalated',
    SUPPORT_SATISFACTION: 'support_satisfaction',

    // Security Notifications
    SECURITY_ALERT: 'security_alert',
    LOGIN_ATTEMPT: 'login_attempt',
    SUSPICIOUS_ACTIVITY: 'suspicious_activity',
    DEVICE_VERIFICATION: 'device_verification',

    // Social Notifications
    SOCIAL_FOLLOW: 'social_follow',
    SOCIAL_LIKE: 'social_like',
    SOCIAL_COMMENT: 'social_comment',
    SOCIAL_SHARE: 'social_share',
    SOCIAL_MENTION: 'social_mention',
  },
} as const;
