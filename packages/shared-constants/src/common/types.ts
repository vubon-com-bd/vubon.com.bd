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

  // Vendor specific types
  BASIC: 'basic',
  SILVER: 'silver',
  GOLD: 'gold',
  PLATINUM: 'platinum',
  DIAMOND: 'diamond',
  ENTERPRISE: 'enterprise',
  PREMIUM: 'premium',

  // Performance types
  GOOD: 'good',
  AVERAGE: 'average',
  POOR: 'poor',
  EXCELLENT: 'excellent',
  CRITICAL: 'critical',

  // Activity types
  LOGIN: 'login',
  LOGOUT: 'logout',

  // Document types
  NID: 'nid',
  PASSPORT: 'passport',
  DRIVING_LICENSE: 'driving_license',
  BUSINESS_LICENSE: 'business_license',
  TRADE_LICENSE: 'trade_license',
  TIN: 'tin',
  BANK_STATEMENT: 'bank_statement',
  ADDRESS_PROOF: 'address_proof',

  // Payment types
  PAYMENT: 'payment',
  REFUND: 'refund',
  CAPTURE: 'capture',
  AUTHORIZE: 'authorize',
  VOID: 'void',

  // Order types
  REGULAR: 'regular',
  BULK: 'bulk',
  WHOLESALE_ORDER: 'wholesale_order',
  RENTAL: 'rental',
  GIFT_ORDER: 'gift_order',

  // Delivery types
  DELIVERY: 'delivery',
  PICKED: 'picked',
  IN_TRANSIT: 'in_transit',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  ATTEMPTED: 'attempted',
  DELIVERED: 'delivered',

  // Vendor activity types
  PRODUCT_CREATE: 'product_create',
  PRODUCT_UPDATE: 'product_update',
  PRODUCT_DELETE: 'product_delete',
  ORDER_CREATE: 'order_create',
  ORDER_UPDATE: 'order_update',
  ORDER_CANCEL: 'order_cancel',
  PAYMENT_REQUEST: 'payment_request',
  PAYMENT_RECEIVE: 'payment_receive',
  SETTINGS_UPDATE: 'settings_update',
  PROFILE_UPDATE: 'profile_update',
  DOCUMENT_UPLOAD: 'document_upload',
  DOCUMENT_DELETE: 'document_delete',
  TEAM_ADD: 'team_add',
  TEAM_REMOVE: 'team_remove',
  TEAM_UPDATE: 'team_update',

  // Vendor warranty types
  EXTENDED: 'extended',
  LIFETIME: 'lifetime',
  NO_WARRANTY: 'no_warranty',
  REPLACEMENT: 'replacement',

  // Vendor return policy types
  NO_RETURN: 'no_return',
  STORE_CREDIT: 'store_credit',

  // Vendor report types
  SALES: 'sales',
  ORDERS_REPORT: 'orders_report',
  PRODUCTS_REPORT: 'products_report',
  PAYMENTS_REPORT: 'payments_report',
  REVENUE: 'revenue',
  PROFIT_REPORT: 'profit_report',
  CUSTOMERS: 'customers',
  ANALYTICS: 'analytics',
  PERFORMANCE: 'performance',
  INVENTORY: 'inventory',
  COMPARISON: 'comparison',
} as const;

export type CommonType = (typeof TYPES)[keyof typeof TYPES];
