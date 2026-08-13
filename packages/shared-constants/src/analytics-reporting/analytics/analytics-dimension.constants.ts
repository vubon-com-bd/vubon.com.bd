/**
 * @fileoverview Analytics dimensions and attributes definitions
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Core analytics dimensions
 */
export enum AnalyticsDimension {
  /** Date dimension */
  DATE = 'DATE',
  /** Hour dimension */
  HOUR = 'HOUR',
  /** Day of week dimension */
  DAY_OF_WEEK = 'DAY_OF_WEEK',
  /** Month dimension */
  MONTH = 'MONTH',
  /** Year dimension */
  YEAR = 'YEAR',
  /** Country dimension */
  COUNTRY = 'COUNTRY',
  /** City dimension */
  CITY = 'CITY',
  /** Device type dimension */
  DEVICE = 'DEVICE',
  /** Browser dimension */
  BROWSER = 'BROWSER',
  /** Operating system dimension */
  OS = 'OS',
  /** Traffic source dimension */
  SOURCE = 'SOURCE',
  /** Traffic medium dimension */
  MEDIUM = 'MEDIUM',
  /** Campaign dimension */
  CAMPAIGN = 'CAMPAIGN',
  /** Product category dimension */
  PRODUCT_CATEGORY = 'PRODUCT_CATEGORY',
  /** Customer segment dimension */
  CUSTOMER_SEGMENT = 'CUSTOMER_SEGMENT',
  /** User type dimension */
  USER_TYPE = 'USER_TYPE',
  /** User gender dimension */
  USER_GENDER = 'USER_GENDER',
  /** User age group dimension */
  USER_AGE_GROUP = 'USER_AGE_GROUP',
  /** User location dimension */
  USER_LOCATION = 'USER_LOCATION',
  /** User language dimension */
  USER_LANGUAGE = 'USER_LANGUAGE',
  /** User device dimension */
  USER_DEVICE = 'USER_DEVICE',
  /** User browser dimension */
  USER_BROWSER = 'USER_BROWSER',
  /** User OS dimension */
  USER_OS = 'USER_OS',
  /** Screen resolution dimension */
  SCREEN_RESOLUTION = 'SCREEN_RESOLUTION',
  /** Viewport size dimension */
  VIEWPORT_SIZE = 'VIEWPORT_SIZE',
  /** Session count dimension */
  SESSION_COUNT = 'SESSION_COUNT',
  /** Session source dimension */
  SESSION_SOURCE = 'SESSION_SOURCE',
  /** Session medium dimension */
  SESSION_MEDIUM = 'SESSION_MEDIUM',
  /** Session campaign dimension */
  SESSION_CAMPAIGN = 'SESSION_CAMPAIGN',
  /** Session keyword dimension */
  SESSION_KEYWORD = 'SESSION_KEYWORD',
  /** Landing page dimension */
  LANDING_PAGE = 'LANDING_PAGE',
  /** Exit page dimension */
  EXIT_PAGE = 'EXIT_PAGE',
  /** Product dimension */
  PRODUCT = 'PRODUCT',
  /** Product SKU dimension */
  PRODUCT_SKU = 'PRODUCT_SKU',
  /** Product brand dimension */
  PRODUCT_BRAND = 'PRODUCT_BRAND',
  /** Product variant dimension */
  PRODUCT_VARIANT = 'PRODUCT_VARIANT',
  /** Order ID dimension */
  ORDER_ID = 'ORDER_ID',
  /** Order status dimension */
  ORDER_STATUS = 'ORDER_STATUS',
  /** Payment method dimension */
  PAYMENT_METHOD = 'PAYMENT_METHOD',
  /** Shipping method dimension */
  SHIPPING_METHOD = 'SHIPPING_METHOD',
  /** Coupon code dimension */
  COUPON_CODE = 'COUPON_CODE',
  /** Discount type dimension */
  DISCOUNT_TYPE = 'DISCOUNT_TYPE',
  /** Referral source dimension */
  REFERRAL_SOURCE = 'REFERRAL_SOURCE',
  /** Referral domain dimension */
  REFERRAL_DOMAIN = 'REFERRAL_DOMAIN',
  /** Social platform dimension */
  SOCIAL_PLATFORM = 'SOCIAL_PLATFORM',
  /** Social post dimension */
  SOCIAL_POST = 'SOCIAL_POST',
  /** Email campaign dimension */
  EMAIL_CAMPAIGN = 'EMAIL_CAMPAIGN',
  /** Email subject dimension */
  EMAIL_SUBJECT = 'EMAIL_SUBJECT',
  /** Ad network dimension */
  AD_NETWORK = 'AD_NETWORK',
  /** Ad format dimension */
  AD_FORMAT = 'AD_FORMAT',
  /** Ad position dimension */
  AD_POSITION = 'AD_POSITION',
  /** Support channel dimension */
  SUPPORT_CHANNEL = 'SUPPORT_CHANNEL',
  /** Support agent dimension */
  SUPPORT_AGENT = 'SUPPORT_AGENT',
  /** Ticket priority dimension */
  TICKET_PRIORITY = 'TICKET_PRIORITY',
  /** Ticket status dimension */
  TICKET_STATUS = 'TICKET_STATUS',
  /** Feedback type dimension */
  FEEDBACK_TYPE = 'FEEDBACK_TYPE',
  /** Rating dimension */
  RATING = 'RATING',
  /** Survey type dimension */
  SURVEY_TYPE = 'SURVEY_TYPE',
  /** Quiz type dimension */
  QUIZ_TYPE = 'QUIZ_TYPE',
  /** User role dimension */
  USER_ROLE = 'USER_ROLE',
  /** User tier dimension */
  USER_TIER = 'USER_TIER',
  /** Subscription plan dimension */
  SUBSCRIPTION_PLAN = 'SUBSCRIPTION_PLAN',
  /** Payment status dimension */
  PAYMENT_STATUS = 'PAYMENT_STATUS',
  /** Transaction type dimension */
  TRANSACTION_TYPE = 'TRANSACTION_TYPE',
  /** Inventory location dimension */
  INVENTORY_LOCATION = 'INVENTORY_LOCATION',
  /** Warehouse dimension */
  WAREHOUSE = 'WAREHOUSE',
}

/**
 * Dimension type classification
 */
export enum AnalyticsDimensionType {
  /** Time-based dimensions */
  TIME = 'TIME',
  /** Location-based dimensions */
  LOCATION = 'LOCATION',
  /** Device-based dimensions */
  DEVICE = 'DEVICE',
  /** User-based dimensions */
  USER = 'USER',
  /** Traffic-based dimensions */
  TRAFFIC = 'TRAFFIC',
  /** Product-based dimensions */
  PRODUCT = 'PRODUCT',
  /** Transaction-based dimensions */
  TRANSACTION = 'TRANSACTION',
  /** Marketing-based dimensions */
  MARKETING = 'MARKETING',
  /** Support-based dimensions */
  SUPPORT = 'SUPPORT',
}

/**
 * Dimension category mapping
 */
export const ANALYTICS_DIMENSION_CATEGORY_MAP: Record<AnalyticsDimension, AnalyticsDimensionType> =
  {
    [AnalyticsDimension.DATE]: AnalyticsDimensionType.TIME,
    [AnalyticsDimension.HOUR]: AnalyticsDimensionType.TIME,
    [AnalyticsDimension.DAY_OF_WEEK]: AnalyticsDimensionType.TIME,
    [AnalyticsDimension.MONTH]: AnalyticsDimensionType.TIME,
    [AnalyticsDimension.YEAR]: AnalyticsDimensionType.TIME,
    [AnalyticsDimension.COUNTRY]: AnalyticsDimensionType.LOCATION,
    [AnalyticsDimension.CITY]: AnalyticsDimensionType.LOCATION,
    [AnalyticsDimension.DEVICE]: AnalyticsDimensionType.DEVICE,
    [AnalyticsDimension.BROWSER]: AnalyticsDimensionType.DEVICE,
    [AnalyticsDimension.OS]: AnalyticsDimensionType.DEVICE,
    [AnalyticsDimension.SOURCE]: AnalyticsDimensionType.TRAFFIC,
    [AnalyticsDimension.MEDIUM]: AnalyticsDimensionType.TRAFFIC,
    [AnalyticsDimension.CAMPAIGN]: AnalyticsDimensionType.MARKETING,
    [AnalyticsDimension.PRODUCT_CATEGORY]: AnalyticsDimensionType.PRODUCT,
    [AnalyticsDimension.CUSTOMER_SEGMENT]: AnalyticsDimensionType.USER,
    [AnalyticsDimension.USER_TYPE]: AnalyticsDimensionType.USER,
    [AnalyticsDimension.USER_GENDER]: AnalyticsDimensionType.USER,
    [AnalyticsDimension.USER_AGE_GROUP]: AnalyticsDimensionType.USER,
    [AnalyticsDimension.USER_LOCATION]: AnalyticsDimensionType.USER,
    [AnalyticsDimension.USER_LANGUAGE]: AnalyticsDimensionType.USER,
    [AnalyticsDimension.USER_DEVICE]: AnalyticsDimensionType.USER,
    [AnalyticsDimension.USER_BROWSER]: AnalyticsDimensionType.USER,
    [AnalyticsDimension.USER_OS]: AnalyticsDimensionType.USER,
    [AnalyticsDimension.SCREEN_RESOLUTION]: AnalyticsDimensionType.DEVICE,
    [AnalyticsDimension.VIEWPORT_SIZE]: AnalyticsDimensionType.DEVICE,
    [AnalyticsDimension.SESSION_COUNT]: AnalyticsDimensionType.TRAFFIC,
    [AnalyticsDimension.SESSION_SOURCE]: AnalyticsDimensionType.TRAFFIC,
    [AnalyticsDimension.SESSION_MEDIUM]: AnalyticsDimensionType.TRAFFIC,
    [AnalyticsDimension.SESSION_CAMPAIGN]: AnalyticsDimensionType.MARKETING,
    [AnalyticsDimension.SESSION_KEYWORD]: AnalyticsDimensionType.TRAFFIC,
    [AnalyticsDimension.LANDING_PAGE]: AnalyticsDimensionType.TRAFFIC,
    [AnalyticsDimension.EXIT_PAGE]: AnalyticsDimensionType.TRAFFIC,
    [AnalyticsDimension.PRODUCT]: AnalyticsDimensionType.PRODUCT,
    [AnalyticsDimension.PRODUCT_SKU]: AnalyticsDimensionType.PRODUCT,
    [AnalyticsDimension.PRODUCT_BRAND]: AnalyticsDimensionType.PRODUCT,
    [AnalyticsDimension.PRODUCT_VARIANT]: AnalyticsDimensionType.PRODUCT,
    [AnalyticsDimension.ORDER_ID]: AnalyticsDimensionType.TRANSACTION,
    [AnalyticsDimension.ORDER_STATUS]: AnalyticsDimensionType.TRANSACTION,
    [AnalyticsDimension.PAYMENT_METHOD]: AnalyticsDimensionType.TRANSACTION,
    [AnalyticsDimension.SHIPPING_METHOD]: AnalyticsDimensionType.TRANSACTION,
    [AnalyticsDimension.COUPON_CODE]: AnalyticsDimensionType.TRANSACTION,
    [AnalyticsDimension.DISCOUNT_TYPE]: AnalyticsDimensionType.TRANSACTION,
    [AnalyticsDimension.REFERRAL_SOURCE]: AnalyticsDimensionType.TRAFFIC,
    [AnalyticsDimension.REFERRAL_DOMAIN]: AnalyticsDimensionType.TRAFFIC,
    [AnalyticsDimension.SOCIAL_PLATFORM]: AnalyticsDimensionType.MARKETING,
    [AnalyticsDimension.SOCIAL_POST]: AnalyticsDimensionType.MARKETING,
    [AnalyticsDimension.EMAIL_CAMPAIGN]: AnalyticsDimensionType.MARKETING,
    [AnalyticsDimension.EMAIL_SUBJECT]: AnalyticsDimensionType.MARKETING,
    [AnalyticsDimension.AD_NETWORK]: AnalyticsDimensionType.MARKETING,
    [AnalyticsDimension.AD_FORMAT]: AnalyticsDimensionType.MARKETING,
    [AnalyticsDimension.AD_POSITION]: AnalyticsDimensionType.MARKETING,
    [AnalyticsDimension.SUPPORT_CHANNEL]: AnalyticsDimensionType.SUPPORT,
    [AnalyticsDimension.SUPPORT_AGENT]: AnalyticsDimensionType.SUPPORT,
    [AnalyticsDimension.TICKET_PRIORITY]: AnalyticsDimensionType.SUPPORT,
    [AnalyticsDimension.TICKET_STATUS]: AnalyticsDimensionType.SUPPORT,
    [AnalyticsDimension.FEEDBACK_TYPE]: AnalyticsDimensionType.SUPPORT,
    [AnalyticsDimension.RATING]: AnalyticsDimensionType.SUPPORT,
    [AnalyticsDimension.SURVEY_TYPE]: AnalyticsDimensionType.SUPPORT,
    [AnalyticsDimension.QUIZ_TYPE]: AnalyticsDimensionType.SUPPORT,
    [AnalyticsDimension.USER_ROLE]: AnalyticsDimensionType.USER,
    [AnalyticsDimension.USER_TIER]: AnalyticsDimensionType.USER,
    [AnalyticsDimension.SUBSCRIPTION_PLAN]: AnalyticsDimensionType.TRANSACTION,
    [AnalyticsDimension.PAYMENT_STATUS]: AnalyticsDimensionType.TRANSACTION,
    [AnalyticsDimension.TRANSACTION_TYPE]: AnalyticsDimensionType.TRANSACTION,
    [AnalyticsDimension.INVENTORY_LOCATION]: AnalyticsDimensionType.PRODUCT,
    [AnalyticsDimension.WAREHOUSE]: AnalyticsDimensionType.PRODUCT,
  };

/**
 * Dimension configuration with labels and descriptions
 */
export interface AnalyticsDimensionConfig {
  label: string;
  description: string;
  icon?: string;
  color?: string;
  dataType: 'string' | 'number' | 'date' | 'boolean';
  isHierarchical: boolean;
  priority: number;
}

export const ANALYTICS_DIMENSION_CONFIG: Record<AnalyticsDimension, AnalyticsDimensionConfig> = {
  [AnalyticsDimension.DATE]: {
    label: 'Date',
    description: 'Date of the analytics data',
    icon: 'Calendar',
    color: '#3B82F6',
    dataType: 'date',
    isHierarchical: true,
    priority: 1,
  },
  [AnalyticsDimension.HOUR]: {
    label: 'Hour',
    description: 'Hour of the day',
    icon: 'Clock',
    color: '#6366F1',
    dataType: 'number',
    isHierarchical: true,
    priority: 2,
  },
  [AnalyticsDimension.DAY_OF_WEEK]: {
    label: 'Day of Week',
    description: 'Day of the week',
    icon: 'Calendar',
    color: '#8B5CF6',
    dataType: 'string',
    isHierarchical: true,
    priority: 2,
  },
  [AnalyticsDimension.MONTH]: {
    label: 'Month',
    description: 'Month of the year',
    icon: 'Calendar',
    color: '#10B981',
    dataType: 'string',
    isHierarchical: true,
    priority: 2,
  },
  [AnalyticsDimension.YEAR]: {
    label: 'Year',
    description: 'Year of the data',
    icon: 'Calendar',
    color: '#F59E0B',
    dataType: 'number',
    isHierarchical: true,
    priority: 2,
  },
  [AnalyticsDimension.COUNTRY]: {
    label: 'Country',
    description: 'User country location',
    icon: 'Globe',
    color: '#3B82F6',
    dataType: 'string',
    isHierarchical: true,
    priority: 1,
  },
  [AnalyticsDimension.CITY]: {
    label: 'City',
    description: 'User city location',
    icon: 'MapPin',
    color: '#10B981',
    dataType: 'string',
    isHierarchical: true,
    priority: 2,
  },
  [AnalyticsDimension.DEVICE]: {
    label: 'Device',
    description: 'Device type used (Mobile, Desktop, Tablet)',
    icon: 'Smartphone',
    color: '#8B5CF6',
    dataType: 'string',
    isHierarchical: false,
    priority: 2,
  },
  [AnalyticsDimension.BROWSER]: {
    label: 'Browser',
    description: 'Browser used by the user',
    icon: 'Globe',
    color: '#F59E0B',
    dataType: 'string',
    isHierarchical: false,
    priority: 3,
  },
  [AnalyticsDimension.OS]: {
    label: 'Operating System',
    description: 'User operating system',
    icon: 'Monitor',
    color: '#6366F1',
    dataType: 'string',
    isHierarchical: false,
    priority: 3,
  },
  [AnalyticsDimension.SOURCE]: {
    label: 'Source',
    description: 'Traffic source',
    icon: 'ArrowRight',
    color: '#3B82F6',
    dataType: 'string',
    isHierarchical: false,
    priority: 1,
  },
  [AnalyticsDimension.MEDIUM]: {
    label: 'Medium',
    description: 'Traffic medium',
    icon: 'Layers',
    color: '#8B5CF6',
    dataType: 'string',
    isHierarchical: false,
    priority: 1,
  },
  [AnalyticsDimension.CAMPAIGN]: {
    label: 'Campaign',
    description: 'Marketing campaign name',
    icon: 'Megaphone',
    color: '#F59E0B',
    dataType: 'string',
    isHierarchical: false,
    priority: 1,
  },
  [AnalyticsDimension.PRODUCT_CATEGORY]: {
    label: 'Product Category',
    description: 'Product category classification',
    icon: 'Folder',
    color: '#10B981',
    dataType: 'string',
    isHierarchical: true,
    priority: 2,
  },
  [AnalyticsDimension.CUSTOMER_SEGMENT]: {
    label: 'Customer Segment',
    description: 'Customer segment classification',
    icon: 'Users',
    color: '#F472B6',
    dataType: 'string',
    isHierarchical: false,
    priority: 2,
  },
  [AnalyticsDimension.USER_TYPE]: {
    label: 'User Type',
    description: 'Type of user (New, Returning, Guest)',
    icon: 'User',
    color: '#3B82F6',
    dataType: 'string',
    isHierarchical: false,
    priority: 2,
  },
  [AnalyticsDimension.USER_GENDER]: {
    label: 'User Gender',
    description: 'User gender demographic',
    icon: 'User',
    color: '#F472B6',
    dataType: 'string',
    isHierarchical: false,
    priority: 3,
  },
  [AnalyticsDimension.USER_AGE_GROUP]: {
    label: 'User Age Group',
    description: 'User age demographic group',
    icon: 'User',
    color: '#F59E0B',
    dataType: 'string',
    isHierarchical: false,
    priority: 3,
  },
  [AnalyticsDimension.USER_LOCATION]: {
    label: 'User Location',
    description: 'User geographic location',
    icon: 'MapPin',
    color: '#10B981',
    dataType: 'string',
    isHierarchical: true,
    priority: 2,
  },
  [AnalyticsDimension.USER_LANGUAGE]: {
    label: 'User Language',
    description: 'User language preference',
    icon: 'MessageSquare',
    color: '#8B5CF6',
    dataType: 'string',
    isHierarchical: false,
    priority: 3,
  },
  [AnalyticsDimension.USER_DEVICE]: {
    label: 'User Device',
    description: 'User device information',
    icon: 'Smartphone',
    color: '#3B82F6',
    dataType: 'string',
    isHierarchical: false,
    priority: 3,
  },
  [AnalyticsDimension.USER_BROWSER]: {
    label: 'User Browser',
    description: 'User browser information',
    icon: 'Globe',
    color: '#F59E0B',
    dataType: 'string',
    isHierarchical: false,
    priority: 3,
  },
  [AnalyticsDimension.USER_OS]: {
    label: 'User OS',
    description: 'User operating system',
    icon: 'Monitor',
    color: '#6366F1',
    dataType: 'string',
    isHierarchical: false,
    priority: 3,
  },
  [AnalyticsDimension.SCREEN_RESOLUTION]: {
    label: 'Screen Resolution',
    description: 'User screen resolution',
    icon: 'Monitor',
    color: '#8B5CF6',
    dataType: 'string',
    isHierarchical: false,
    priority: 3,
  },
  [AnalyticsDimension.VIEWPORT_SIZE]: {
    label: 'Viewport Size',
    description: 'User viewport dimensions',
    icon: 'Layout',
    color: '#10B981',
    dataType: 'string',
    isHierarchical: false,
    priority: 3,
  },
  [AnalyticsDimension.SESSION_COUNT]: {
    label: 'Session Count',
    description: 'Number of sessions',
    icon: 'Activity',
    color: '#3B82F6',
    dataType: 'number',
    isHierarchical: false,
    priority: 2,
  },
  [AnalyticsDimension.SESSION_SOURCE]: {
    label: 'Session Source',
    description: 'Source of the session',
    icon: 'ArrowRight',
    color: '#F59E0B',
    dataType: 'string',
    isHierarchical: false,
    priority: 2,
  },
  [AnalyticsDimension.SESSION_MEDIUM]: {
    label: 'Session Medium',
    description: 'Medium of the session',
    icon: 'Layers',
    color: '#8B5CF6',
    dataType: 'string',
    isHierarchical: false,
    priority: 2,
  },
  [AnalyticsDimension.SESSION_CAMPAIGN]: {
    label: 'Session Campaign',
    description: 'Campaign of the session',
    icon: 'Megaphone',
    color: '#F472B6',
    dataType: 'string',
    isHierarchical: false,
    priority: 2,
  },
  [AnalyticsDimension.SESSION_KEYWORD]: {
    label: 'Session Keyword',
    description: 'Keyword used in the session',
    icon: 'Search',
    color: '#EF4444',
    dataType: 'string',
    isHierarchical: false,
    priority: 3,
  },
  [AnalyticsDimension.LANDING_PAGE]: {
    label: 'Landing Page',
    description: 'First page of the session',
    icon: 'FileText',
    color: '#3B82F6',
    dataType: 'string',
    isHierarchical: false,
    priority: 2,
  },
  [AnalyticsDimension.EXIT_PAGE]: {
    label: 'Exit Page',
    description: 'Last page of the session',
    icon: 'FileText',
    color: '#EF4444',
    dataType: 'string',
    isHierarchical: false,
    priority: 2,
  },
  [AnalyticsDimension.PRODUCT]: {
    label: 'Product',
    description: 'Product name',
    icon: 'Package',
    color: '#8B5CF6',
    dataType: 'string',
    isHierarchical: false,
    priority: 2,
  },
  [AnalyticsDimension.PRODUCT_SKU]: {
    label: 'Product SKU',
    description: 'Product SKU code',
    icon: 'Barcode',
    color: '#F59E0B',
    dataType: 'string',
    isHierarchical: false,
    priority: 2,
  },
  [AnalyticsDimension.PRODUCT_BRAND]: {
    label: 'Product Brand',
    description: 'Product brand name',
    icon: 'Tag',
    color: '#10B981',
    dataType: 'string',
    isHierarchical: false,
    priority: 2,
  },
  [AnalyticsDimension.PRODUCT_VARIANT]: {
    label: 'Product Variant',
    description: 'Product variant details',
    icon: 'Layers',
    color: '#F472B6',
    dataType: 'string',
    isHierarchical: false,
    priority: 3,
  },
  [AnalyticsDimension.ORDER_ID]: {
    label: 'Order ID',
    description: 'Order identification number',
    icon: 'Hash',
    color: '#3B82F6',
    dataType: 'string',
    isHierarchical: false,
    priority: 2,
  },
  [AnalyticsDimension.ORDER_STATUS]: {
    label: 'Order Status',
    description: 'Current order status',
    icon: 'CheckCircle',
    color: '#10B981',
    dataType: 'string',
    isHierarchical: false,
    priority: 2,
  },
  [AnalyticsDimension.PAYMENT_METHOD]: {
    label: 'Payment Method',
    description: 'Payment method used',
    icon: 'CreditCard',
    color: '#F59E0B',
    dataType: 'string',
    isHierarchical: false,
    priority: 2,
  },
  [AnalyticsDimension.SHIPPING_METHOD]: {
    label: 'Shipping Method',
    description: 'Shipping method used',
    icon: 'Truck',
    color: '#8B5CF6',
    dataType: 'string',
    isHierarchical: false,
    priority: 2,
  },
  [AnalyticsDimension.COUPON_CODE]: {
    label: 'Coupon Code',
    description: 'Coupon code used',
    icon: 'Ticket',
    color: '#F472B6',
    dataType: 'string',
    isHierarchical: false,
    priority: 2,
  },
  [AnalyticsDimension.DISCOUNT_TYPE]: {
    label: 'Discount Type',
    description: 'Type of discount applied',
    icon: 'Percent',
    color: '#10B981',
    dataType: 'string',
    isHierarchical: false,
    priority: 3,
  },
  [AnalyticsDimension.REFERRAL_SOURCE]: {
    label: 'Referral Source',
    description: 'Source of referral traffic',
    icon: 'Link',
    color: '#3B82F6',
    dataType: 'string',
    isHierarchical: false,
    priority: 2,
  },
  [AnalyticsDimension.REFERRAL_DOMAIN]: {
    label: 'Referral Domain',
    description: 'Domain of referral traffic',
    icon: 'Link',
    color: '#6366F1',
    dataType: 'string',
    isHierarchical: false,
    priority: 3,
  },
  [AnalyticsDimension.SOCIAL_PLATFORM]: {
    label: 'Social Platform',
    description: 'Social media platform',
    icon: 'Share2',
    color: '#1DA1F2',
    dataType: 'string',
    isHierarchical: false,
    priority: 2,
  },
  [AnalyticsDimension.SOCIAL_POST]: {
    label: 'Social Post',
    description: 'Social media post content',
    icon: 'MessageSquare',
    color: '#F472B6',
    dataType: 'string',
    isHierarchical: false,
    priority: 3,
  },
  [AnalyticsDimension.EMAIL_CAMPAIGN]: {
    label: 'Email Campaign',
    description: 'Email campaign name',
    icon: 'Mail',
    color: '#EA580C',
    dataType: 'string',
    isHierarchical: false,
    priority: 2,
  },
  [AnalyticsDimension.EMAIL_SUBJECT]: {
    label: 'Email Subject',
    description: 'Subject of the email',
    icon: 'Mail',
    color: '#F59E0B',
    dataType: 'string',
    isHierarchical: false,
    priority: 3,
  },
  [AnalyticsDimension.AD_NETWORK]: {
    label: 'Ad Network',
    description: 'Advertising network',
    icon: 'Layers',
    color: '#8B5CF6',
    dataType: 'string',
    isHierarchical: false,
    priority: 2,
  },
  [AnalyticsDimension.AD_FORMAT]: {
    label: 'Ad Format',
    description: 'Advertising format',
    icon: 'Layout',
    color: '#F59E0B',
    dataType: 'string',
    isHierarchical: false,
    priority: 3,
  },
  [AnalyticsDimension.AD_POSITION]: {
    label: 'Ad Position',
    description: 'Position of the ad',
    icon: 'Layout',
    color: '#10B981',
    dataType: 'string',
    isHierarchical: false,
    priority: 3,
  },
  [AnalyticsDimension.SUPPORT_CHANNEL]: {
    label: 'Support Channel',
    description: 'Support communication channel',
    icon: 'MessageCircle',
    color: '#3B82F6',
    dataType: 'string',
    isHierarchical: false,
    priority: 2,
  },
  [AnalyticsDimension.SUPPORT_AGENT]: {
    label: 'Support Agent',
    description: 'Support agent name',
    icon: 'User',
    color: '#8B5CF6',
    dataType: 'string',
    isHierarchical: false,
    priority: 2,
  },
  [AnalyticsDimension.TICKET_PRIORITY]: {
    label: 'Ticket Priority',
    description: 'Support ticket priority level',
    icon: 'Flag',
    color: '#EF4444',
    dataType: 'string',
    isHierarchical: false,
    priority: 2,
  },
  [AnalyticsDimension.TICKET_STATUS]: {
    label: 'Ticket Status',
    description: 'Support ticket status',
    icon: 'CheckCircle',
    color: '#10B981',
    dataType: 'string',
    isHierarchical: false,
    priority: 2,
  },
  [AnalyticsDimension.FEEDBACK_TYPE]: {
    label: 'Feedback Type',
    description: 'Type of feedback received',
    icon: 'MessageSquare',
    color: '#F59E0B',
    dataType: 'string',
    isHierarchical: false,
    priority: 3,
  },
  [AnalyticsDimension.RATING]: {
    label: 'Rating',
    description: 'Rating score',
    icon: 'Star',
    color: '#F472B6',
    dataType: 'number',
    isHierarchical: false,
    priority: 2,
  },
  [AnalyticsDimension.SURVEY_TYPE]: {
    label: 'Survey Type',
    description: 'Type of survey',
    icon: 'FileText',
    color: '#3B82F6',
    dataType: 'string',
    isHierarchical: false,
    priority: 3,
  },
  [AnalyticsDimension.QUIZ_TYPE]: {
    label: 'Quiz Type',
    description: 'Type of quiz',
    icon: 'HelpCircle',
    color: '#8B5CF6',
    dataType: 'string',
    isHierarchical: false,
    priority: 3,
  },
  [AnalyticsDimension.USER_ROLE]: {
    label: 'User Role',
    description: 'User role in the system',
    icon: 'User',
    color: '#10B981',
    dataType: 'string',
    isHierarchical: false,
    priority: 2,
  },
  [AnalyticsDimension.USER_TIER]: {
    label: 'User Tier',
    description: 'User tier level',
    icon: 'Crown',
    color: '#F59E0B',
    dataType: 'string',
    isHierarchical: false,
    priority: 2,
  },
  [AnalyticsDimension.SUBSCRIPTION_PLAN]: {
    label: 'Subscription Plan',
    description: 'Subscription plan name',
    icon: 'Repeat',
    color: '#6366F1',
    dataType: 'string',
    isHierarchical: false,
    priority: 2,
  },
  [AnalyticsDimension.PAYMENT_STATUS]: {
    label: 'Payment Status',
    description: 'Payment transaction status',
    icon: 'CreditCard',
    color: '#F59E0B',
    dataType: 'string',
    isHierarchical: false,
    priority: 2,
  },
  [AnalyticsDimension.TRANSACTION_TYPE]: {
    label: 'Transaction Type',
    description: 'Type of transaction',
    icon: 'DollarSign',
    color: '#10B981',
    dataType: 'string',
    isHierarchical: false,
    priority: 2,
  },
  [AnalyticsDimension.INVENTORY_LOCATION]: {
    label: 'Inventory Location',
    description: 'Inventory storage location',
    icon: 'MapPin',
    color: '#3B82F6',
    dataType: 'string',
    isHierarchical: true,
    priority: 3,
  },
  [AnalyticsDimension.WAREHOUSE]: {
    label: 'Warehouse',
    description: 'Warehouse location',
    icon: 'Building',
    color: '#8B5CF6',
    dataType: 'string',
    isHierarchical: true,
    priority: 3,
  },
};

/**
 * Get dimension category
 */
export function getDimensionCategory(dimension: AnalyticsDimension): AnalyticsDimensionType {
  return ANALYTICS_DIMENSION_CATEGORY_MAP[dimension];
}

/**
 * Get dimension label
 */
export function getDimensionLabel(dimension: AnalyticsDimension): string {
  return ANALYTICS_DIMENSION_CONFIG[dimension]?.label || dimension;
}

/**
 * Get dimension description
 */
export function getDimensionDescription(dimension: AnalyticsDimension): string {
  return ANALYTICS_DIMENSION_CONFIG[dimension]?.description || '';
}

/**
 * Get dimensions by category
 */
export function getDimensionsByCategory(category: AnalyticsDimensionType): AnalyticsDimension[] {
  return Object.entries(ANALYTICS_DIMENSION_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([dimension]) => dimension as AnalyticsDimension);
}

/**
 * Check if dimension is hierarchical
 */
export function isDimensionHierarchical(dimension: AnalyticsDimension): boolean {
  return ANALYTICS_DIMENSION_CONFIG[dimension]?.isHierarchical || false;
}

/**
 * Get time-based dimensions
 */
export function getTimeDimensions(): AnalyticsDimension[] {
  return getDimensionsByCategory(AnalyticsDimensionType.TIME);
}

/**
 * Get location-based dimensions
 */
export function getLocationDimensions(): AnalyticsDimension[] {
  return getDimensionsByCategory(AnalyticsDimensionType.LOCATION);
}

/**
 * Get user-based dimensions
 */
export function getUserDimensions(): AnalyticsDimension[] {
  return getDimensionsByCategory(AnalyticsDimensionType.USER);
}

/**
 * Get traffic-based dimensions
 */
export function getTrafficDimensions(): AnalyticsDimension[] {
  return getDimensionsByCategory(AnalyticsDimensionType.TRAFFIC);
}

/**
 * Get product-based dimensions
 */
export function getProductDimensions(): AnalyticsDimension[] {
  return getDimensionsByCategory(AnalyticsDimensionType.PRODUCT);
}

/**
 * Get transaction-based dimensions
 */
export function getTransactionDimensions(): AnalyticsDimension[] {
  return getDimensionsByCategory(AnalyticsDimensionType.TRANSACTION);
}

/**
 * Get marketing-based dimensions
 */
export function getMarketingDimensions(): AnalyticsDimension[] {
  return getDimensionsByCategory(AnalyticsDimensionType.MARKETING);
}

/**
 * Get support-based dimensions
 */
export function getSupportDimensions(): AnalyticsDimension[] {
  return getDimensionsByCategory(AnalyticsDimensionType.SUPPORT);
}

/**
 * Get common dimension combinations
 */
export const DIMENSION_COMBINATIONS = {
  /** Time-based analysis */
  TIME: [AnalyticsDimension.YEAR, AnalyticsDimension.MONTH, AnalyticsDimension.DATE],
  /** Location-based analysis */
  LOCATION: [AnalyticsDimension.COUNTRY, AnalyticsDimension.CITY],
  /** Device-based analysis */
  DEVICE: [AnalyticsDimension.DEVICE, AnalyticsDimension.OS, AnalyticsDimension.BROWSER],
  /** Traffic analysis */
  TRAFFIC: [AnalyticsDimension.SOURCE, AnalyticsDimension.MEDIUM, AnalyticsDimension.CAMPAIGN],
  /** User analysis */
  USER: [AnalyticsDimension.USER_TYPE, AnalyticsDimension.CUSTOMER_SEGMENT],
  /** Product analysis */
  PRODUCT: [AnalyticsDimension.PRODUCT_CATEGORY, AnalyticsDimension.PRODUCT_BRAND],
  /** Transaction analysis */
  TRANSACTION: [AnalyticsDimension.ORDER_STATUS, AnalyticsDimension.PAYMENT_METHOD],
};
