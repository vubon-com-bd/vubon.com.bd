/**
 * Common Types
 * সাধারণ টাইপ কনস্ট্যান্টস
 */

export const TYPES = {
  // Default
  DEFAULT: 'default',

  // User types
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  GUEST: 'guest',
  VENDOR: 'vendor',
  MANAGER: 'manager',
  SUPPORT: 'support',
  DELIVERY_AGENT: 'delivery_agent',

  // Content types
  ARTICLE: 'article',
  VIDEO: 'video',
  IMAGE: 'image',
  AUDIO: 'audio',
  DOCUMENT: 'document',

  // Status types
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  DELETED: 'deleted',
  SUSPENDED: 'suspended',
  BANNED: 'banned',
  VERIFIED: 'verified',
  UNVERIFIED: 'unverified',

  // Attribute types (for product attributes)
  TEXT: 'text',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  DATE: 'date',
  DATETIME: 'datetime',

  // Pricing types
  FIXED: 'fixed',
  VARIABLE: 'variable',
  SUBSCRIPTION: 'subscription',
  DOWNLOADABLE: 'downloadable',
  VIRTUAL: 'virtual',
  SERVICE: 'service',
  DIGITAL: 'digital',
  PHYSICAL: 'physical',

  // Tax types
  VAT: 'vat',
  SALES_TAX: 'sales_tax',
  SERVICE_TAX: 'service_tax',
  IMPORT_DUTY: 'import_duty',
  CUSTOM_DUTY: 'custom_duty',
  EXCISE: 'excise',
  GST: 'gst',

  // Shipping types
  STANDARD: 'standard',
  EXPRESS: 'express',
  SAME_DAY: 'same_day',
  NEXT_DAY: 'next_day',
  INTERNATIONAL: 'international',
  FREE: 'free',
  PICKUP: 'pickup',
  DROPSHIPPING: 'dropshipping',

  // Coupon types
  DISCOUNT: 'discount',
  FREE_SHIPPING: 'free_shipping',
  BUY_GET: 'buy_get',
  GIFT: 'gift',
  VOUCHER: 'voucher',
  WELCOME: 'welcome',
  REFERRAL: 'referral',
  BIRTHDAY: 'birthday',
  SEASONAL: 'seasonal',
  FLASH_SALE: 'flash_sale',
  BUNDLE: 'bundle',

  // Discount types
  PERCENTAGE: 'percentage',
  BUY_X_GET_Y: 'buy_x_get_y',
  TIERED: 'tiered',
  VOLUME: 'volume',
  MEMBERSHIP: 'membership',
  WHOLESALE: 'wholesale',

  // Tax calculation types
  INCLUSIVE: 'inclusive',
  EXCLUSIVE: 'exclusive',
  COMPOUND: 'compound',
} as const;

export type CommonType = (typeof TYPES)[keyof typeof TYPES];
