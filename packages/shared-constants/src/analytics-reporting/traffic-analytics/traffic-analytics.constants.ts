/**
 * @fileoverview Traffic analytics system core constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Traffic source categories
 */
export enum TrafficSourceCategory {
  /** Organic search traffic */
  ORGANIC = 'ORGANIC',
  /** Paid search traffic */
  PAID_SEARCH = 'PAID_SEARCH',
  /** Social media traffic */
  SOCIAL = 'SOCIAL',
  /** Email traffic */
  EMAIL = 'EMAIL',
  /** Referral traffic */
  REFERRAL = 'REFERRAL',
  /** Direct traffic */
  DIRECT = 'DIRECT',
  /** Display advertising */
  DISPLAY = 'DISPLAY',
  /** Video advertising */
  VIDEO = 'VIDEO',
  /** Affiliate traffic */
  AFFILIATE = 'AFFILIATE',
  /** Influencer traffic */
  INFLUENCER = 'INFLUENCER',
  /** PR traffic */
  PR = 'PR',
  /** Events traffic */
  EVENTS = 'EVENTS',
  /** Mobile app traffic */
  MOBILE_APP = 'MOBILE_APP',
  /** Other traffic */
  OTHER = 'OTHER',
}

/**
 * Traffic source configuration
 */
export const TRAFFIC_SOURCE_CONFIG: Record<
  TrafficSourceCategory,
  { label: string; description: string; color: string; typicalConversionRate: number }
> = {
  [TrafficSourceCategory.ORGANIC]: {
    label: 'Organic Search',
    description: 'Traffic from search engine organic results',
    color: '#22C55E',
    typicalConversionRate: 0.03,
  },
  [TrafficSourceCategory.PAID_SEARCH]: {
    label: 'Paid Search',
    description: 'Traffic from paid search advertising',
    color: '#4285F4',
    typicalConversionRate: 0.025,
  },
  [TrafficSourceCategory.SOCIAL]: {
    label: 'Social Media',
    description: 'Traffic from social media platforms',
    color: '#1DA1F2',
    typicalConversionRate: 0.015,
  },
  [TrafficSourceCategory.EMAIL]: {
    label: 'Email',
    description: 'Traffic from email campaigns',
    color: '#EA580C',
    typicalConversionRate: 0.04,
  },
  [TrafficSourceCategory.REFERRAL]: {
    label: 'Referral',
    description: 'Traffic from referral websites',
    color: '#A855F7',
    typicalConversionRate: 0.02,
  },
  [TrafficSourceCategory.DIRECT]: {
    label: 'Direct',
    description: 'Direct traffic from bookmarks or typed URLs',
    color: '#6B7280',
    typicalConversionRate: 0.035,
  },
  [TrafficSourceCategory.DISPLAY]: {
    label: 'Display',
    description: 'Traffic from display advertising',
    color: '#3B82F6',
    typicalConversionRate: 0.01,
  },
  [TrafficSourceCategory.VIDEO]: {
    label: 'Video',
    description: 'Traffic from video advertising',
    color: '#EC4899',
    typicalConversionRate: 0.02,
  },
  [TrafficSourceCategory.AFFILIATE]: {
    label: 'Affiliate',
    description: 'Traffic from affiliate marketing',
    color: '#10B981',
    typicalConversionRate: 0.025,
  },
  [TrafficSourceCategory.INFLUENCER]: {
    label: 'Influencer',
    description: 'Traffic from influencer marketing',
    color: '#F472B6',
    typicalConversionRate: 0.02,
  },
  [TrafficSourceCategory.PR]: {
    label: 'PR',
    description: 'Traffic from public relations',
    color: '#6B7280',
    typicalConversionRate: 0.015,
  },
  [TrafficSourceCategory.EVENTS]: {
    label: 'Events',
    description: 'Traffic from events and conferences',
    color: '#F59E0B',
    typicalConversionRate: 0.03,
  },
  [TrafficSourceCategory.MOBILE_APP]: {
    label: 'Mobile App',
    description: 'Traffic from mobile applications',
    color: '#10B981',
    typicalConversionRate: 0.04,
  },
  [TrafficSourceCategory.OTHER]: {
    label: 'Other',
    description: 'Traffic from other sources',
    color: '#6B7280',
    typicalConversionRate: 0.01,
  },
};

/**
 * Traffic monitoring settings
 */
export interface TrafficMonitoringSettings {
  /** Monitoring interval in seconds */
  monitoringIntervalSeconds: number;
  /** Real-time monitoring enabled */
  enableRealTimeMonitoring: boolean;
  /** Historical data retention in days */
  dataRetentionDays: number;
  /** Alert frequency in minutes */
  alertFrequencyMinutes: number;
  /** Maximum alerts per day */
  maxAlertsPerDay: number;
}

export const DEFAULT_TRAFFIC_MONITORING_SETTINGS: TrafficMonitoringSettings = {
  monitoringIntervalSeconds: 60,
  enableRealTimeMonitoring: true,
  dataRetentionDays: 90,
  alertFrequencyMinutes: 5,
  maxAlertsPerDay: 50,
};

/**
 * Traffic threshold alerts
 */
export interface TrafficThresholdAlerts {
  /** Enable threshold alerts */
  enableAlerts: boolean;
  /** Traffic spike threshold percentage */
  spikeThresholdPercent: number;
  /** Traffic drop threshold percentage */
  dropThresholdPercent: number;
  /** Session count threshold */
  sessionCountThreshold: number;
  /** Page view threshold */
  pageViewThreshold: number;
  /** Time on site threshold in seconds */
  timeOnSiteThreshold: number;
}

export const DEFAULT_TRAFFIC_THRESHOLD_ALERTS: TrafficThresholdAlerts = {
  enableAlerts: true,
  spikeThresholdPercent: 50,
  dropThresholdPercent: 30,
  sessionCountThreshold: 100,
  pageViewThreshold: 500,
  timeOnSiteThreshold: 30,
};

/**
 * Traffic pattern detection settings
 */
export interface TrafficPatternDetectionSettings {
  /** Enable pattern detection */
  enablePatternDetection: boolean;
  /** Pattern detection window in hours */
  detectionWindowHours: number;
  /** Seasonal pattern detection */
  detectSeasonalPatterns: boolean;
  /** Daily pattern detection */
  detectDailyPatterns: boolean;
  /** Weekly pattern detection */
  detectWeeklyPatterns: boolean;
  /** Anomaly detection sensitivity */
  anomalySensitivity: 'LOW' | 'MEDIUM' | 'HIGH';
  /** Minimum data points for pattern detection */
  minDataPoints: number;
}

export const DEFAULT_TRAFFIC_PATTERN_DETECTION_SETTINGS: TrafficPatternDetectionSettings = {
  enablePatternDetection: true,
  detectionWindowHours: 24,
  detectSeasonalPatterns: true,
  detectDailyPatterns: true,
  detectWeeklyPatterns: true,
  anomalySensitivity: 'MEDIUM',
  minDataPoints: 30,
};

/**
 * Bounce rate thresholds
 */
export interface BounceRateThresholds {
  /** Critical bounce rate percentage */
  criticalThreshold: number;
  /** Warning bounce rate percentage */
  warningThreshold: number;
  /** Good bounce rate percentage */
  goodThreshold: number;
  /** Mobile bounce rate threshold */
  mobileThreshold: number;
  /** Desktop bounce rate threshold */
  desktopThreshold: number;
}

export const DEFAULT_BOUNCE_RATE_THRESHOLDS: BounceRateThresholds = {
  criticalThreshold: 70,
  warningThreshold: 50,
  goodThreshold: 30,
  mobileThreshold: 55,
  desktopThreshold: 40,
};

/**
 * Session timeout settings
 */
export interface SessionTimeoutSettings {
  /** Session timeout in minutes */
  timeoutMinutes: number;
  /** Session extension on activity in minutes */
  extensionMinutes: number;
  /** Maximum session duration in minutes */
  maxDurationMinutes: number;
  /** Session idle warning in minutes */
  idleWarningMinutes: number;
  /** Enable session timeout */
  enableTimeout: boolean;
}

export const DEFAULT_SESSION_TIMEOUT_SETTINGS: SessionTimeoutSettings = {
  timeoutMinutes: 30,
  extensionMinutes: 15,
  maxDurationMinutes: 120,
  idleWarningMinutes: 5,
  enableTimeout: true,
};

/**
 * Referral tracking settings
 */
export interface ReferralTrackingSettings {
  /** Enable referral tracking */
  enableReferralTracking: boolean;
  /** Track referral domains */
  trackReferralDomains: boolean;
  /** Track referral URLs */
  trackReferralURLs: boolean;
  /** Track referral parameters */
  trackReferralParameters: boolean;
  /** Track referral campaigns */
  trackReferralCampaigns: boolean;
  /** Referral cookie duration in days */
  cookieDurationDays: number;
  /** Referral attribution window in days */
  attributionWindowDays: number;
}

export const DEFAULT_REFERRAL_TRACKING_SETTINGS: ReferralTrackingSettings = {
  enableReferralTracking: true,
  trackReferralDomains: true,
  trackReferralURLs: true,
  trackReferralParameters: true,
  trackReferralCampaigns: true,
  cookieDurationDays: 30,
  attributionWindowDays: 7,
};

/**
 * URL parameter tracking settings
 */
export interface URLParameterTrackingSettings {
  /** Enable URL parameter tracking */
  enableURLParameterTracking: boolean;
  /** UTM parameters to track */
  utmParameters: ('utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_term' | 'utm_content')[];
  /** Custom parameters to track */
  customParameters: string[];
  /** Track parameter values */
  trackParameterValues: boolean;
  /** Maximum parameter length */
  maxParameterLength: number;
}

export const DEFAULT_URL_PARAMETER_TRACKING_SETTINGS: URLParameterTrackingSettings = {
  enableURLParameterTracking: true,
  utmParameters: ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'],
  customParameters: [],
  trackParameterValues: true,
  maxParameterLength: 255,
};

/**
 * Traffic filtering rules
 */
export interface TrafficFilteringRules {
  /** Enable traffic filtering */
  enableFiltering: boolean;
  /** Block bot traffic */
  blockBotTraffic: boolean;
  /** Block internal traffic */
  blockInternalTraffic: boolean;
  /** IP blacklist */
  ipBlacklist: string[];
  /** IP whitelist */
  ipWhitelist: string[];
  /** User agent filter */
  userAgentFilter: ('bot' | 'crawler' | 'scraper' | 'spider')[];
  /** Referer filter */
  refererFilter: string[];
}

export const DEFAULT_TRAFFIC_FILTERING_RULES: TrafficFilteringRules = {
  enableFiltering: true,
  blockBotTraffic: true,
  blockInternalTraffic: true,
  ipBlacklist: [],
  ipWhitelist: [],
  userAgentFilter: ['bot', 'crawler', 'scraper', 'spider'],
  refererFilter: [],
};

/**
 * Bot traffic detection settings
 */
export interface BotTrafficDetectionSettings {
  /** Enable bot detection */
  enableBotDetection: boolean;
  /** User agent pattern matching */
  userAgentPatternMatching: boolean;
  /** IP pattern matching */
  ipPatternMatching: boolean;
  /** Behavior pattern matching */
  behaviorPatternMatching: boolean;
  /** Bot patterns list */
  botPatterns: string[];
  /** Suspicious behavior threshold */
  suspiciousBehaviorThreshold: number;
}

export const DEFAULT_BOT_TRAFFIC_DETECTION_SETTINGS: BotTrafficDetectionSettings = {
  enableBotDetection: true,
  userAgentPatternMatching: true,
  ipPatternMatching: true,
  behaviorPatternMatching: true,
  botPatterns: [
    'Googlebot',
    'Bingbot',
    'Slurp',
    'DuckDuckBot',
    'baiduspider',
    'YandexBot',
    'facebookexternalhit',
    'Twitterbot',
    'LinkedInBot',
    'Pinterestbot',
    'Applebot',
    'Amazonbot',
  ],
  suspiciousBehaviorThreshold: 5,
};

/**
 * Traffic analytics configuration
 */
export const TRAFFIC_ANALYTICS_CONFIG = {
  /** Maximum sessions to process */
  MAX_SESSIONS: 100000,
  /** Traffic analytics cache TTL in seconds */
  CACHE_TTL_SECONDS: 300,
  /** Traffic query timeout in seconds */
  QUERY_TIMEOUT_SECONDS: 30,
  /** Maximum sessions in report */
  MAX_SESSIONS_IN_REPORT: 10000,
  /** Traffic data export limit */
  EXPORT_LIMIT: 50000,
  /** Traffic analytics version */
  VERSION: '1.0.0',
} as const;

/**
 * Traffic event types
 */
export enum TrafficEventType {
  /** Page view event */
  PAGE_VIEW = 'PAGE_VIEW',
  /** Session start event */
  SESSION_START = 'SESSION_START',
  /** Session end event */
  SESSION_END = 'SESSION_END',
  /** Click event */
  CLICK = 'CLICK',
  /** Scroll event */
  SCROLL = 'SCROLL',
  /** Form submit event */
  FORM_SUBMIT = 'FORM_SUBMIT',
  /** Exit event */
  EXIT = 'EXIT',
  /** Conversion event */
  CONVERSION = 'CONVERSION',
}

/**
 * Traffic functions
 */
export function getTrafficSourceLabel(source: TrafficSourceCategory): string {
  return TRAFFIC_SOURCE_CONFIG[source]?.label || source;
}

export function getTrafficSourceColor(source: TrafficSourceCategory): string {
  return TRAFFIC_SOURCE_CONFIG[source]?.color || '#6B7280';
}

export function getTrafficSourceConversionRate(source: TrafficSourceCategory): number {
  return TRAFFIC_SOURCE_CONFIG[source]?.typicalConversionRate || 0;
}

export function getTrafficSourceDescription(source: TrafficSourceCategory): string {
  return TRAFFIC_SOURCE_CONFIG[source]?.description || '';
}
