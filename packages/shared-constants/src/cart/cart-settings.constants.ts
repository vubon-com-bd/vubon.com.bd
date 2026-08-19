/**
 * কার্ট সেটিংস কনস্ট্যান্ট
 * কার্ট সিস্টেমের বিভিন্ন সেটিংস এবং কনফিগারেশন
 */

/**
 * ডিফল্ট সেটিংস অবজেক্ট
 */
export const DEFAULT_SETTINGS = {
  currency: 'BDT',
  locale: 'bn-BD',
  timezone: 'Asia/Dhaka',
} as const;

export type DefaultSettings = typeof DEFAULT_SETTINGS;

/**
 * শিপিং কনফিগারেশন
 */
export const SHIPPING_SETTINGS = {
  freeShippingThreshold: 1000,
  defaultShippingMethod: 'standard',
  allowInternational: false,
  maxDeliveryDays: 7,
} as const;

export type ShippingSettings = typeof SHIPPING_SETTINGS;

/**
 * ট্যাক্স কনফিগারেশন
 */
export const TAX_SETTINGS = {
  taxInclusive: true,
  taxRate: 0.15,
  taxLabel: 'VAT',
  taxRounding: 2,
} as const;

export type TaxSettings = typeof TAX_SETTINGS;

/**
 * পেমেন্ট কনফিগারেশন
 */
export const PAYMENT_SETTINGS = {
  allowedMethods: ['cash_on_delivery', 'stripe', 'sslcommerz'],
  requirePaymentConfirmation: true,
  paymentTimeout: 30,
  allowPartialPayment: false,
} as const;

export type PaymentSettings = typeof PAYMENT_SETTINGS;

/**
 * নোটিফিকেশন কনফিগারেশন
 */
export const NOTIFICATION_SETTINGS = {
  emailNotifications: true,
  smsNotifications: false,
  pushNotifications: true,
  orderConfirmationEmail: true,
  abandonedCartEmail: true,
} as const;

export type NotificationSettings = typeof NOTIFICATION_SETTINGS;

/**
 * সিকিউরিটি কনফিগারেশন
 */
export const SECURITY_SETTINGS = {
  sessionTimeout: 60,
  maxLoginAttempts: 5,
  requireCaptcha: true,
  ipRestriction: false,
  csrfProtection: true,
} as const;

export type SecuritySettings = typeof SECURITY_SETTINGS;

/**
 * চেকআউট কনফিগারেশন
 */
export const CHECKOUT_SETTINGS = {
  guestCheckout: true,
  requireAccountForCheckout: false,
  showOrderSummary: true,
  allowNotes: true,
  requireTermsAcceptance: true,
} as const;

export type CheckoutSettings = typeof CHECKOUT_SETTINGS;
