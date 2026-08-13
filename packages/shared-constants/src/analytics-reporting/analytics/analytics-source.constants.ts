/**
 * @fileoverview Analytics data source definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Analytics data sources enum
 */
export enum AnalyticsDataSource {
  /** Website traffic and interactions */
  WEBSITE = 'WEBSITE',
  /** Mobile application data */
  MOBILE_APP = 'MOBILE_APP',
  /** API calls and integrations */
  API = 'API',
  /** Webhook events and callbacks */
  WEBHOOK = 'WEBHOOK',
  /** Database queries and logs */
  DATABASE = 'DATABASE',
  /** Third-party services and integrations */
  THIRD_PARTY = 'THIRD_PARTY',
  /** Social media platforms */
  SOCIAL_MEDIA = 'SOCIAL_MEDIA',
  /** Email campaign data */
  EMAIL_CAMPAIGN = 'EMAIL_CAMPAIGN',
  /** Search engine traffic */
  SEARCH_ENGINE = 'SEARCH_ENGINE',
  /** Direct traffic to website/app */
  DIRECT_TRAFFIC = 'DIRECT_TRAFFIC',
  /** Referral traffic from other sites */
  REFERRAL = 'REFERRAL',
  /** CRM system data */
  CRM = 'CRM',
  /** ERP system data */
  ERP = 'ERP',
  /** Point of Sale system */
  POS = 'POS',
  /** IoT devices and sensors */
  IOT = 'IOT',
  /** Payment gateways */
  PAYMENT_GATEWAY = 'PAYMENT_GATEWAY',
  /** User feedback and surveys */
  USER_FEEDBACK = 'USER_FEEDBACK',
  /** Customer support system */
  CUSTOMER_SUPPORT = 'CUSTOMER_SUPPORT',
  /** Marketing automation platform */
  MARKETING_AUTOMATION = 'MARKETING_AUTOMATION',
  /** Analytics tools like Google Analytics */
  ANALYTICS_TOOL = 'ANALYTICS_TOOL',
  /** Advertising platforms */
  ADVERTISING_PLATFORM = 'ADVERTISING_PLATFORM',
  /** File uploads and imports */
  FILE_UPLOAD = 'FILE_UPLOAD',
  /** Manual data entry */
  MANUAL_ENTRY = 'MANUAL_ENTRY',
  /** Data warehouse */
  DATA_WAREHOUSE = 'DATA_WAREHOUSE',
  /** Streaming data sources */
  STREAMING = 'STREAMING',
  /** Email marketing platform */
  EMAIL_MARKETING = 'EMAIL_MARKETING',
  /** SMS and messaging platforms */
  SMS_PLATFORM = 'SMS_PLATFORM',
  /** Push notifications */
  PUSH_NOTIFICATION = 'PUSH_NOTIFICATION',
  /** In-app messaging */
  IN_APP_MESSAGING = 'IN_APP_MESSAGING',
}

/**
 * Data source type classification
 */
export enum AnalyticsSourceType {
  /** Internal source - part of the system */
  INTERNAL = 'INTERNAL',
  /** External source - outside the system */
  EXTERNAL = 'EXTERNAL',
  /** Hybrid source - both internal and external */
  HYBRID = 'HYBRID',
  /** Third-party source */
  THIRD_PARTY = 'THIRD_PARTY',
}

/**
 * Source type mapping
 */
export const ANALYTICS_SOURCE_TYPE_MAP: Record<AnalyticsDataSource, AnalyticsSourceType> = {
  [AnalyticsDataSource.WEBSITE]: AnalyticsSourceType.INTERNAL,
  [AnalyticsDataSource.MOBILE_APP]: AnalyticsSourceType.INTERNAL,
  [AnalyticsDataSource.API]: AnalyticsSourceType.INTERNAL,
  [AnalyticsDataSource.WEBHOOK]: AnalyticsSourceType.HYBRID,
  [AnalyticsDataSource.DATABASE]: AnalyticsSourceType.INTERNAL,
  [AnalyticsDataSource.THIRD_PARTY]: AnalyticsSourceType.THIRD_PARTY,
  [AnalyticsDataSource.SOCIAL_MEDIA]: AnalyticsSourceType.EXTERNAL,
  [AnalyticsDataSource.EMAIL_CAMPAIGN]: AnalyticsSourceType.EXTERNAL,
  [AnalyticsDataSource.SEARCH_ENGINE]: AnalyticsSourceType.EXTERNAL,
  [AnalyticsDataSource.DIRECT_TRAFFIC]: AnalyticsSourceType.EXTERNAL,
  [AnalyticsDataSource.REFERRAL]: AnalyticsSourceType.EXTERNAL,
  [AnalyticsDataSource.CRM]: AnalyticsSourceType.THIRD_PARTY,
  [AnalyticsDataSource.ERP]: AnalyticsSourceType.THIRD_PARTY,
  [AnalyticsDataSource.POS]: AnalyticsSourceType.THIRD_PARTY,
  [AnalyticsDataSource.IOT]: AnalyticsSourceType.EXTERNAL,
  [AnalyticsDataSource.PAYMENT_GATEWAY]: AnalyticsSourceType.THIRD_PARTY,
  [AnalyticsDataSource.USER_FEEDBACK]: AnalyticsSourceType.INTERNAL,
  [AnalyticsDataSource.CUSTOMER_SUPPORT]: AnalyticsSourceType.INTERNAL,
  [AnalyticsDataSource.MARKETING_AUTOMATION]: AnalyticsSourceType.THIRD_PARTY,
  [AnalyticsDataSource.ANALYTICS_TOOL]: AnalyticsSourceType.THIRD_PARTY,
  [AnalyticsDataSource.ADVERTISING_PLATFORM]: AnalyticsSourceType.THIRD_PARTY,
  [AnalyticsDataSource.FILE_UPLOAD]: AnalyticsSourceType.INTERNAL,
  [AnalyticsDataSource.MANUAL_ENTRY]: AnalyticsSourceType.INTERNAL,
  [AnalyticsDataSource.DATA_WAREHOUSE]: AnalyticsSourceType.INTERNAL,
  [AnalyticsDataSource.STREAMING]: AnalyticsSourceType.HYBRID,
  [AnalyticsDataSource.EMAIL_MARKETING]: AnalyticsSourceType.THIRD_PARTY,
  [AnalyticsDataSource.SMS_PLATFORM]: AnalyticsSourceType.THIRD_PARTY,
  [AnalyticsDataSource.PUSH_NOTIFICATION]: AnalyticsSourceType.INTERNAL,
  [AnalyticsDataSource.IN_APP_MESSAGING]: AnalyticsSourceType.INTERNAL,
};

/**
 * Data source configuration with labels and descriptions
 */
export const ANALYTICS_SOURCE_CONFIG: Record<
  AnalyticsDataSource,
  { label: string; description: string; icon?: string; color?: string }
> = {
  [AnalyticsDataSource.WEBSITE]: {
    label: 'Website',
    description: 'Data from website traffic, user interactions, and page views',
    icon: 'Globe',
    color: '#3B82F6',
  },
  [AnalyticsDataSource.MOBILE_APP]: {
    label: 'Mobile App',
    description: 'Data from mobile application usage and user behavior',
    icon: 'Smartphone',
    color: '#10B981',
  },
  [AnalyticsDataSource.API]: {
    label: 'API',
    description: 'Data from API calls, requests, and integrations',
    icon: 'Code',
    color: '#8B5CF6',
  },
  [AnalyticsDataSource.WEBHOOK]: {
    label: 'Webhook',
    description: 'Data from webhook events and real-time notifications',
    icon: 'Zap',
    color: '#F59E0B',
  },
  [AnalyticsDataSource.DATABASE]: {
    label: 'Database',
    description: 'Data from database queries, logs, and stored procedures',
    icon: 'Database',
    color: '#EF4444',
  },
  [AnalyticsDataSource.THIRD_PARTY]: {
    label: 'Third Party',
    description: 'Data from third-party services and integrations',
    icon: 'Plug',
    color: '#6B7280',
  },
  [AnalyticsDataSource.SOCIAL_MEDIA]: {
    label: 'Social Media',
    description: 'Data from social media platforms and interactions',
    icon: 'Share2',
    color: '#1DA1F2',
  },
  [AnalyticsDataSource.EMAIL_CAMPAIGN]: {
    label: 'Email Campaign',
    description: 'Data from email marketing campaigns and engagement',
    icon: 'Mail',
    color: '#EA580C',
  },
  [AnalyticsDataSource.SEARCH_ENGINE]: {
    label: 'Search Engine',
    description: 'Data from search engine traffic and SEO metrics',
    icon: 'Search',
    color: '#4285F4',
  },
  [AnalyticsDataSource.DIRECT_TRAFFIC]: {
    label: 'Direct Traffic',
    description: 'Data from direct traffic to websites and apps',
    icon: 'ArrowRight',
    color: '#22C55E',
  },
  [AnalyticsDataSource.REFERRAL]: {
    label: 'Referral',
    description: 'Data from referral traffic from other sources',
    icon: 'Link',
    color: '#A855F7',
  },
  [AnalyticsDataSource.CRM]: {
    label: 'CRM',
    description: 'Data from Customer Relationship Management system',
    icon: 'Users',
    color: '#3B82F6',
  },
  [AnalyticsDataSource.ERP]: {
    label: 'ERP',
    description: 'Data from Enterprise Resource Planning system',
    icon: 'Building',
    color: '#6366F1',
  },
  [AnalyticsDataSource.POS]: {
    label: 'Point of Sale',
    description: 'Data from point of sale systems and transactions',
    icon: 'ShoppingCart',
    color: '#F59E0B',
  },
  [AnalyticsDataSource.IOT]: {
    label: 'IoT Devices',
    description: 'Data from Internet of Things devices and sensors',
    icon: 'Cpu',
    color: '#22D3EE',
  },
  [AnalyticsDataSource.PAYMENT_GATEWAY]: {
    label: 'Payment Gateway',
    description: 'Data from payment gateways and transaction processing',
    icon: 'CreditCard',
    color: '#10B981',
  },
  [AnalyticsDataSource.USER_FEEDBACK]: {
    label: 'User Feedback',
    description: 'Data from user feedback, surveys, and ratings',
    icon: 'MessageSquare',
    color: '#F472B6',
  },
  [AnalyticsDataSource.CUSTOMER_SUPPORT]: {
    label: 'Customer Support',
    description: 'Data from customer support tickets and interactions',
    icon: 'Headset',
    color: '#8B5CF6',
  },
  [AnalyticsDataSource.MARKETING_AUTOMATION]: {
    label: 'Marketing Automation',
    description: 'Data from marketing automation platforms',
    icon: 'Megaphone',
    color: '#F97316',
  },
  [AnalyticsDataSource.ANALYTICS_TOOL]: {
    label: 'Analytics Tool',
    description: 'Data from third-party analytics tools',
    icon: 'PieChart',
    color: '#EC4899',
  },
  [AnalyticsDataSource.ADVERTISING_PLATFORM]: {
    label: 'Advertising Platform',
    description: 'Data from advertising and ad networks',
    icon: 'TrendingUp',
    color: '#EF4444',
  },
  [AnalyticsDataSource.FILE_UPLOAD]: {
    label: 'File Upload',
    description: 'Data from file uploads and imports',
    icon: 'Upload',
    color: '#F59E0B',
  },
  [AnalyticsDataSource.MANUAL_ENTRY]: {
    label: 'Manual Entry',
    description: 'Data entered manually by users',
    icon: 'PenTool',
    color: '#6B7280',
  },
  [AnalyticsDataSource.DATA_WAREHOUSE]: {
    label: 'Data Warehouse',
    description: 'Data from data warehouse and data lakes',
    icon: 'Database',
    color: '#3B82F6',
  },
  [AnalyticsDataSource.STREAMING]: {
    label: 'Streaming',
    description: 'Data from real-time streaming sources',
    icon: 'Radio',
    color: '#EC4899',
  },
  [AnalyticsDataSource.EMAIL_MARKETING]: {
    label: 'Email Marketing',
    description: 'Data from email marketing platforms',
    icon: 'Mail',
    color: '#DC2626',
  },
  [AnalyticsDataSource.SMS_PLATFORM]: {
    label: 'SMS Platform',
    description: 'Data from SMS messaging platforms',
    icon: 'MessageCircle',
    color: '#10B981',
  },
  [AnalyticsDataSource.PUSH_NOTIFICATION]: {
    label: 'Push Notification',
    description: 'Data from push notification delivery and engagement',
    icon: 'Bell',
    color: '#F472B6',
  },
  [AnalyticsDataSource.IN_APP_MESSAGING]: {
    label: 'In-App Messaging',
    description: 'Data from in-app messaging and communication',
    icon: 'MessageSquare',
    color: '#8B5CF6',
  },
};

/**
 * Source reliability ratings
 */
export enum AnalyticsSourceReliability {
  /** Very reliable - trusted source */
  VERY_HIGH = 'VERY_HIGH',
  /** High reliability - mostly accurate */
  HIGH = 'HIGH',
  /** Medium reliability - occasional issues */
  MEDIUM = 'MEDIUM',
  /** Low reliability - frequent issues */
  LOW = 'LOW',
}

/**
 * Source reliability mapping
 */
export const ANALYTICS_SOURCE_RELIABILITY: Record<AnalyticsDataSource, AnalyticsSourceReliability> =
  {
    [AnalyticsDataSource.WEBSITE]: AnalyticsSourceReliability.VERY_HIGH,
    [AnalyticsDataSource.MOBILE_APP]: AnalyticsSourceReliability.VERY_HIGH,
    [AnalyticsDataSource.API]: AnalyticsSourceReliability.HIGH,
    [AnalyticsDataSource.WEBHOOK]: AnalyticsSourceReliability.HIGH,
    [AnalyticsDataSource.DATABASE]: AnalyticsSourceReliability.VERY_HIGH,
    [AnalyticsDataSource.THIRD_PARTY]: AnalyticsSourceReliability.MEDIUM,
    [AnalyticsDataSource.SOCIAL_MEDIA]: AnalyticsSourceReliability.HIGH,
    [AnalyticsDataSource.EMAIL_CAMPAIGN]: AnalyticsSourceReliability.HIGH,
    [AnalyticsDataSource.SEARCH_ENGINE]: AnalyticsSourceReliability.MEDIUM,
    [AnalyticsDataSource.DIRECT_TRAFFIC]: AnalyticsSourceReliability.HIGH,
    [AnalyticsDataSource.REFERRAL]: AnalyticsSourceReliability.MEDIUM,
    [AnalyticsDataSource.CRM]: AnalyticsSourceReliability.VERY_HIGH,
    [AnalyticsDataSource.ERP]: AnalyticsSourceReliability.VERY_HIGH,
    [AnalyticsDataSource.POS]: AnalyticsSourceReliability.VERY_HIGH,
    [AnalyticsDataSource.IOT]: AnalyticsSourceReliability.MEDIUM,
    [AnalyticsDataSource.PAYMENT_GATEWAY]: AnalyticsSourceReliability.VERY_HIGH,
    [AnalyticsDataSource.USER_FEEDBACK]: AnalyticsSourceReliability.HIGH,
    [AnalyticsDataSource.CUSTOMER_SUPPORT]: AnalyticsSourceReliability.HIGH,
    [AnalyticsDataSource.MARKETING_AUTOMATION]: AnalyticsSourceReliability.HIGH,
    [AnalyticsDataSource.ANALYTICS_TOOL]: AnalyticsSourceReliability.MEDIUM,
    [AnalyticsDataSource.ADVERTISING_PLATFORM]: AnalyticsSourceReliability.MEDIUM,
    [AnalyticsDataSource.FILE_UPLOAD]: AnalyticsSourceReliability.MEDIUM,
    [AnalyticsDataSource.MANUAL_ENTRY]: AnalyticsSourceReliability.LOW,
    [AnalyticsDataSource.DATA_WAREHOUSE]: AnalyticsSourceReliability.HIGH,
    [AnalyticsDataSource.STREAMING]: AnalyticsSourceReliability.HIGH,
    [AnalyticsDataSource.EMAIL_MARKETING]: AnalyticsSourceReliability.HIGH,
    [AnalyticsDataSource.SMS_PLATFORM]: AnalyticsSourceReliability.HIGH,
    [AnalyticsDataSource.PUSH_NOTIFICATION]: AnalyticsSourceReliability.HIGH,
    [AnalyticsDataSource.IN_APP_MESSAGING]: AnalyticsSourceReliability.HIGH,
  };

/**
 * Source status for operational control
 */
export enum AnalyticsSourceStatus {
  /** Active and collecting data */
  ACTIVE = 'ACTIVE',
  /** Inactive and not collecting data */
  INACTIVE = 'INACTIVE',
  /** Under maintenance */
  MAINTENANCE = 'MAINTENANCE',
  /** Deprecated and will be removed */
  DEPRECATED = 'DEPRECATED',
  /** Disabled due to errors */
  DISABLED = 'DISABLED',
}

/**
 * Default status for each source
 */
export const ANALYTICS_SOURCE_DEFAULT_STATUS: Record<AnalyticsDataSource, AnalyticsSourceStatus> = {
  [AnalyticsDataSource.WEBSITE]: AnalyticsSourceStatus.ACTIVE,
  [AnalyticsDataSource.MOBILE_APP]: AnalyticsSourceStatus.ACTIVE,
  [AnalyticsDataSource.API]: AnalyticsSourceStatus.ACTIVE,
  [AnalyticsDataSource.WEBHOOK]: AnalyticsSourceStatus.ACTIVE,
  [AnalyticsDataSource.DATABASE]: AnalyticsSourceStatus.ACTIVE,
  [AnalyticsDataSource.THIRD_PARTY]: AnalyticsSourceStatus.ACTIVE,
  [AnalyticsDataSource.SOCIAL_MEDIA]: AnalyticsSourceStatus.ACTIVE,
  [AnalyticsDataSource.EMAIL_CAMPAIGN]: AnalyticsSourceStatus.ACTIVE,
  [AnalyticsDataSource.SEARCH_ENGINE]: AnalyticsSourceStatus.ACTIVE,
  [AnalyticsDataSource.DIRECT_TRAFFIC]: AnalyticsSourceStatus.ACTIVE,
  [AnalyticsDataSource.REFERRAL]: AnalyticsSourceStatus.ACTIVE,
  [AnalyticsDataSource.CRM]: AnalyticsSourceStatus.ACTIVE,
  [AnalyticsDataSource.ERP]: AnalyticsSourceStatus.ACTIVE,
  [AnalyticsDataSource.POS]: AnalyticsSourceStatus.ACTIVE,
  [AnalyticsDataSource.IOT]: AnalyticsSourceStatus.ACTIVE,
  [AnalyticsDataSource.PAYMENT_GATEWAY]: AnalyticsSourceStatus.ACTIVE,
  [AnalyticsDataSource.USER_FEEDBACK]: AnalyticsSourceStatus.ACTIVE,
  [AnalyticsDataSource.CUSTOMER_SUPPORT]: AnalyticsSourceStatus.ACTIVE,
  [AnalyticsDataSource.MARKETING_AUTOMATION]: AnalyticsSourceStatus.ACTIVE,
  [AnalyticsDataSource.ANALYTICS_TOOL]: AnalyticsSourceStatus.ACTIVE,
  [AnalyticsDataSource.ADVERTISING_PLATFORM]: AnalyticsSourceStatus.ACTIVE,
  [AnalyticsDataSource.FILE_UPLOAD]: AnalyticsSourceStatus.ACTIVE,
  [AnalyticsDataSource.MANUAL_ENTRY]: AnalyticsSourceStatus.ACTIVE,
  [AnalyticsDataSource.DATA_WAREHOUSE]: AnalyticsSourceStatus.ACTIVE,
  [AnalyticsDataSource.STREAMING]: AnalyticsSourceStatus.ACTIVE,
  [AnalyticsDataSource.EMAIL_MARKETING]: AnalyticsSourceStatus.ACTIVE,
  [AnalyticsDataSource.SMS_PLATFORM]: AnalyticsSourceStatus.ACTIVE,
  [AnalyticsDataSource.PUSH_NOTIFICATION]: AnalyticsSourceStatus.ACTIVE,
  [AnalyticsDataSource.IN_APP_MESSAGING]: AnalyticsSourceStatus.ACTIVE,
};

/**
 * Get label for a data source
 */
export function getAnalyticsSourceLabel(source: AnalyticsDataSource): string {
  return ANALYTICS_SOURCE_CONFIG[source]?.label || source;
}

/**
 * Get description for a data source
 */
export function getAnalyticsSourceDescription(source: AnalyticsDataSource): string {
  return ANALYTICS_SOURCE_CONFIG[source]?.description || '';
}

/**
 * Get source type for a data source
 */
export function getAnalyticsSourceType(source: AnalyticsDataSource): AnalyticsSourceType {
  return ANALYTICS_SOURCE_TYPE_MAP[source];
}

/**
 * Get reliability for a data source
 */
export function getAnalyticsSourceReliability(
  source: AnalyticsDataSource
): AnalyticsSourceReliability {
  return ANALYTICS_SOURCE_RELIABILITY[source];
}

/**
 * Get status for a data source
 */
export function getAnalyticsSourceStatus(source: AnalyticsDataSource): AnalyticsSourceStatus {
  return ANALYTICS_SOURCE_DEFAULT_STATUS[source];
}

/**
 * Set status for a data source
 */
export function setAnalyticsSourceStatus(
  source: AnalyticsDataSource,
  status: AnalyticsSourceStatus
): void {
  ANALYTICS_SOURCE_DEFAULT_STATUS[source] = status;
}

/**
 * Check if source is active
 */
export function isSourceActive(source: AnalyticsDataSource): boolean {
  return getAnalyticsSourceStatus(source) === AnalyticsSourceStatus.ACTIVE;
}

/**
 * Check if source is reliable
 */
export function isSourceReliable(source: AnalyticsDataSource): boolean {
  const reliability = getAnalyticsSourceReliability(source);
  return (
    reliability === AnalyticsSourceReliability.VERY_HIGH ||
    reliability === AnalyticsSourceReliability.HIGH
  );
}

/**
 * Get sources by type
 */
export function getSourcesByType(type: AnalyticsSourceType): AnalyticsDataSource[] {
  return Object.entries(ANALYTICS_SOURCE_TYPE_MAP)
    .filter(([_, t]) => t === type)
    .map(([source]) => source as AnalyticsDataSource);
}

/**
 * Get sources by reliability
 */
export function getSourcesByReliability(
  reliability: AnalyticsSourceReliability
): AnalyticsDataSource[] {
  return Object.entries(ANALYTICS_SOURCE_RELIABILITY)
    .filter(([_, r]) => r === reliability)
    .map(([source]) => source as AnalyticsDataSource);
}

/**
 * Get active sources
 */
export function getActiveSources(): AnalyticsDataSource[] {
  return Object.values(AnalyticsDataSource).filter((source) => isSourceActive(source));
}

/**
 * Source priority for data processing
 */
export enum AnalyticsSourcePriority {
  /** Critical sources - process immediately */
  CRITICAL = 'CRITICAL',
  /** High priority sources - process quickly */
  HIGH = 'HIGH',
  /** Medium priority sources - normal processing */
  MEDIUM = 'MEDIUM',
  /** Low priority sources - process when resources available */
  LOW = 'LOW',
}

/**
 * Get source priority
 */
export function getSourcePriority(source: AnalyticsDataSource): AnalyticsSourcePriority {
  const type = getAnalyticsSourceType(source);
  const reliability = getAnalyticsSourceReliability(source);

  if (type === AnalyticsSourceType.INTERNAL) {
    return AnalyticsSourcePriority.CRITICAL;
  }
  if (
    type === AnalyticsSourceType.THIRD_PARTY &&
    reliability === AnalyticsSourceReliability.VERY_HIGH
  ) {
    return AnalyticsSourcePriority.HIGH;
  }
  if (reliability === AnalyticsSourceReliability.HIGH) {
    return AnalyticsSourcePriority.MEDIUM;
  }
  return AnalyticsSourcePriority.LOW;
}
