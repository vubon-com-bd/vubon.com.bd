/**
 * Traffic Analytics Constants
 * Configuration for website traffic analytics and tracking
 */

export const TRAFFIC_ANALYTICS = {
  // Traffic Analytics Types
  TYPES: {
    // Traffic Sources
    ORGANIC: 'organic',
    DIRECT: 'direct',
    REFERRAL: 'referral',
    SOCIAL: 'social',
    PAID: 'paid',
    EMAIL: 'email',
    OTHER: 'other',

    // Traffic Metrics
    VISITS: 'visits',
    VISITORS: 'visitors',
    PAGE_VIEWS: 'page_views',
    SESSIONS: 'sessions',
    BOUNCE: 'bounce',

    // Device Analytics
    DESKTOP: 'desktop',
    MOBILE: 'mobile',
    TABLET: 'tablet',
    OTHER_DEVICE: 'other_device',

    // Browser Analytics
    CHROME: 'chrome',
    FIREFOX: 'firefox',
    SAFARI: 'safari',
    EDGE: 'edge',
    OTHER_BROWSER: 'other_browser',

    // Location Analytics
    COUNTRY: 'country',
    REGION: 'region',
    CITY: 'city',
    LANGUAGE: 'language',

    // Time Analytics
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,

  // Traffic Analytics Status
  STATUS: {
    TRACKING: 'tracking',
    PROCESSING: 'processing',
    ANALYZING: 'analyzing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    PAUSED: 'paused',
    STOPPED: 'stopped',
    UPDATING: 'updating',
    REFRESHING: 'refreshing',
  } as const,

  // Traffic Analytics Scopes
  SCOPES: {
    WEBSITE: 'website',
    PAGE: 'page',
    SEGMENT: 'segment',
    LOCATION: 'location',
    DEVICE: 'device',
    SOURCE: 'source',
    ALL_TRAFFIC: 'all_traffic',
    UNIQUE_VISITORS: 'unique_visitors',
    RETURNING_VISITORS: 'returning_visitors',
    COMPARATIVE: 'comparative',
  } as const,

  // Traffic Analytics Events
  EVENTS: {
    // Page Events
    PAGE_VIEW: 'page_view',
    PAGE_LOAD: 'page_load',
    PAGE_EXIT: 'page_exit',
    PAGE_SCROLL: 'page_scroll',

    // Visitor Events
    VISITOR_ARRIVED: 'visitor_arrived',
    VISITOR_DEPARTED: 'visitor_departed',
    VISITOR_RETURNED: 'visitor_returned',
    VISITOR_ENGAGED: 'visitor_engaged',

    // Session Events
    SESSION_START: 'session_start',
    SESSION_END: 'session_end',
    SESSION_TIMEOUT: 'session_timeout',
    SESSION_DURATION: 'session_duration',

    // Traffic Source Events
    ORGANIC_SEARCH: 'organic_search',
    DIRECT_ACCESS: 'direct_access',
    REFERRAL_LINK: 'referral_link',
    SOCIAL_MEDIA: 'social_media',
    PAID_AD: 'paid_ad',
    EMAIL_LINK: 'email_link',

    // Device Events
    DEVICE_DETECTED: 'device_detected',
    DEVICE_CHANGED: 'device_changed',
    SCREEN_RESIZE: 'screen_resize',

    // Location Events
    LOCATION_DETECTED: 'location_detected',
    LOCATION_CHANGED: 'location_changed',

    // Performance Events
    PAGE_SPEED: 'page_speed',
    LOAD_TIME: 'load_time',
    RESPONSE_TIME: 'response_time',
    ERROR_ENCOUNTERED: 'error_encountered',

    // Conversion Events
    GOAL_ACHIEVED: 'goal_achieved',
    CONVERSION_COMPLETED: 'conversion_completed',
    FUNNEL_STEP: 'funnel_step',
    FUNNEL_COMPLETED: 'funnel_completed',
  } as const,

  // Traffic Analytics Dimensions
  DIMENSIONS: {
    // Visitor Attributes
    VISITOR_ID: 'visitor_id',
    VISITOR_TYPE: 'visitor_type',
    VISITOR_STATUS: 'visitor_status',
    VISITOR_SEGMENT: 'visitor_segment',

    // Session Attributes
    SESSION_ID: 'session_id',
    SESSION_DURATION: 'session_duration',
    SESSION_DEPTH: 'session_depth',
    SESSION_QUALITY: 'session_quality',

    // Page Attributes
    PAGE_URL: 'page_url',
    PAGE_PATH: 'page_path',
    PAGE_TITLE: 'page_title',
    PAGE_TYPE: 'page_type',
    PAGE_CATEGORY: 'page_category',

    // Traffic Source Attributes
    SOURCE: 'source',
    MEDIUM: 'medium',
    CAMPAIGN: 'campaign',
    TERM: 'term',
    CONTENT: 'content',
    REFERRER: 'referrer',

    // Device Attributes
    DEVICE_TYPE: 'device_type',
    DEVICE_BRAND: 'device_brand',
    DEVICE_MODEL: 'device_model',
    OS: 'os',
    OS_VERSION: 'os_version',
    BROWSER: 'browser',
    BROWSER_VERSION: 'browser_version',
    SCREEN_RESOLUTION: 'screen_resolution',
    VIEWPORT_SIZE: 'viewport_size',

    // Location Attributes
    COUNTRY: 'country',
    COUNTRY_CODE: 'country_code',
    REGION: 'region',
    CITY: 'city',
    CITY_NAME: 'city_name',
    POSTAL_CODE: 'postal_code',
    TIMEZONE: 'timezone',
    LANGUAGE: 'language',

    // Time Attributes
    DATE: 'date',
    DATE_TIME: 'date_time',
    HOUR: 'hour',
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    QUARTER: 'quarter',
    YEAR: 'year',
    DAY_OF_WEEK: 'day_of_week',
    HOUR_OF_DAY: 'hour_of_day',

    // Performance Attributes
    LOAD_TIME: 'load_time',
    DOM_LOAD_TIME: 'dom_load_time',
    PAGE_SIZE: 'page_size',
    REQUEST_COUNT: 'request_count',
    ERROR_COUNT: 'error_count',
  } as const,

  // Traffic Analytics Metrics
  METRICS: {
    // Visitor Metrics
    TOTAL_VISITORS: 'total_visitors',
    UNIQUE_VISITORS: 'unique_visitors',
    RETURNING_VISITORS: 'returning_visitors',
    NEW_VISITORS: 'new_visitors',
    ACTIVE_VISITORS: 'active_visitors',
    VISITOR_GROWTH: 'visitor_growth',

    // Session Metrics
    TOTAL_SESSIONS: 'total_sessions',
    AVG_SESSION_DURATION: 'avg_session_duration',
    TOTAL_SESSION_DURATION: 'total_session_duration',
    SESSIONS_PER_VISITOR: 'sessions_per_visitor',
    SESSION_DEPTH: 'session_depth',

    // Page View Metrics
    TOTAL_PAGE_VIEWS: 'total_page_views',
    AVG_PAGE_VIEWS_PER_SESSION: 'avg_page_views_per_session',
    AVG_PAGE_VIEWS_PER_VISITOR: 'avg_page_views_per_visitor',
    UNIQUE_PAGE_VIEWS: 'unique_page_views',

    // Bounce Metrics
    BOUNCE_RATE: 'bounce_rate',
    BOUNCE_COUNT: 'bounce_count',
    EXIT_RATE: 'exit_rate',
    EXIT_COUNT: 'exit_count',

    // Traffic Source Metrics
    ORGANIC_TRAFFIC: 'organic_traffic',
    DIRECT_TRAFFIC: 'direct_traffic',
    REFERRAL_TRAFFIC: 'referral_traffic',
    SOCIAL_TRAFFIC: 'social_traffic',
    PAID_TRAFFIC: 'paid_traffic',
    EMAIL_TRAFFIC: 'email_traffic',

    // Device Metrics
    DESKTOP_TRAFFIC: 'desktop_traffic',
    MOBILE_TRAFFIC: 'mobile_traffic',
    TABLET_TRAFFIC: 'tablet_traffic',
    DEVICE_SHARE: 'device_share',

    // Browser Metrics
    CHROME_TRAFFIC: 'chrome_traffic',
    FIREFOX_TRAFFIC: 'firefox_traffic',
    SAFARI_TRAFFIC: 'safari_traffic',
    EDGE_TRAFFIC: 'edge_traffic',
    BROWSER_SHARE: 'browser_share',

    // Location Metrics
    TOP_COUNTRIES: 'top_countries',
    TOP_REGIONS: 'top_regions',
    TOP_CITIES: 'top_cities',
    LOCATION_SHARE: 'location_share',

    // Time Metrics
    DAILY_TRAFFIC: 'daily_traffic',
    WEEKLY_TRAFFIC: 'weekly_traffic',
    MONTHLY_TRAFFIC: 'monthly_traffic',
    PEAK_HOURS: 'peak_hours',
    BEST_DAYS: 'best_days',

    // Performance Metrics
    AVG_LOAD_TIME: 'avg_load_time',
    AVG_DOM_LOAD_TIME: 'avg_dom_load_time',
    AVG_PAGE_SIZE: 'avg_page_size',
    ERROR_RATE: 'error_rate',

    // Conversion Metrics
    CONVERSION_RATE: 'conversion_rate',
    GOAL_COMPLETIONS: 'goal_completions',
    FUNNEL_COMPLETION_RATE: 'funnel_completion_rate',

    // Comparison Metrics
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',
    WEEK_OVER_WEEK: 'week_over_week',
    PERIOD_COMPARISON: 'period_comparison',
  } as const,

  // Traffic Analytics Segments
  SEGMENTS: {
    // Visitor Segments
    NEW_VISITORS: 'new_visitors',
    RETURNING_VISITORS: 'returning_visitors',
    ENGAGED_VISITORS: 'engaged_visitors',
    DISENGAGED_VISITORS: 'disengaged_visitors',
    HIGH_VALUE_VISITORS: 'high_value_visitors',

    // Traffic Source Segments
    ORGANIC: 'organic',
    DIRECT: 'direct',
    REFERRAL: 'referral',
    SOCIAL: 'social',
    PAID: 'paid',
    EMAIL: 'email',

    // Device Segments
    DESKTOP: 'desktop',
    MOBILE: 'mobile',
    TABLET: 'tablet',

    // Browser Segments
    CHROME: 'chrome',
    FIREFOX: 'firefox',
    SAFARI: 'safari',
    EDGE: 'edge',

    // Location Segments
    DOMESTIC: 'domestic',
    INTERNATIONAL: 'international',
    LOCAL: 'local',

    // Behavior Segments
    HIGH_ENGAGEMENT: 'high_engagement',
    LOW_ENGAGEMENT: 'low_engagement',
    CONVERTERS: 'converters',
    NON_CONVERTERS: 'non_converters',
    BOUNCERS: 'bouncers',
  } as const,

  // Traffic Analytics Cohorts
  COHORTS: {
    FIRST_VISIT: 'first_visit',
    ACQUISITION_CHANNEL: 'acquisition_channel',
    DEVICE_TYPE: 'device_type',
    LOCATION: 'location',
    BROWSER: 'browser',
    CAMPAIGN: 'campaign',
  } as const,

  // Traffic Analytics Granularity
  GRANULARITY: {
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,
} as const;

// Traffic Analytics Types
export type TrafficAnalyticsType =
  (typeof TRAFFIC_ANALYTICS.TYPES)[keyof typeof TRAFFIC_ANALYTICS.TYPES];

// Traffic Analytics Status
export type TrafficAnalyticsStatus =
  (typeof TRAFFIC_ANALYTICS.STATUS)[keyof typeof TRAFFIC_ANALYTICS.STATUS];

// Traffic Analytics Scopes
export type TrafficAnalyticsScope =
  (typeof TRAFFIC_ANALYTICS.SCOPES)[keyof typeof TRAFFIC_ANALYTICS.SCOPES];

// Traffic Analytics Events
export type TrafficAnalyticsEvent =
  (typeof TRAFFIC_ANALYTICS.EVENTS)[keyof typeof TRAFFIC_ANALYTICS.EVENTS];

// Traffic Analytics Dimensions
export type TrafficAnalyticsDimension =
  (typeof TRAFFIC_ANALYTICS.DIMENSIONS)[keyof typeof TRAFFIC_ANALYTICS.DIMENSIONS];

// Traffic Analytics Metrics
export type TrafficAnalyticsMetric =
  (typeof TRAFFIC_ANALYTICS.METRICS)[keyof typeof TRAFFIC_ANALYTICS.METRICS];

// Traffic Analytics Segments
export type TrafficAnalyticsSegment =
  (typeof TRAFFIC_ANALYTICS.SEGMENTS)[keyof typeof TRAFFIC_ANALYTICS.SEGMENTS];

// Traffic Analytics Cohorts
export type TrafficAnalyticsCohort =
  (typeof TRAFFIC_ANALYTICS.COHORTS)[keyof typeof TRAFFIC_ANALYTICS.COHORTS];

// Traffic Analytics Granularity
export type TrafficAnalyticsGranularity =
  (typeof TRAFFIC_ANALYTICS.GRANULARITY)[keyof typeof TRAFFIC_ANALYTICS.GRANULARITY];

// Traffic Analytics Status Labels
export function getTrafficAnalyticsStatusLabel(status: TrafficAnalyticsStatus): string {
  const labels: Record<TrafficAnalyticsStatus, string> = {
    [TRAFFIC_ANALYTICS.STATUS.TRACKING]: 'Tracking',
    [TRAFFIC_ANALYTICS.STATUS.PROCESSING]: 'Processing',
    [TRAFFIC_ANALYTICS.STATUS.ANALYZING]: 'Analyzing',
    [TRAFFIC_ANALYTICS.STATUS.COMPLETED]: 'Completed',
    [TRAFFIC_ANALYTICS.STATUS.FAILED]: 'Failed',
    [TRAFFIC_ANALYTICS.STATUS.PAUSED]: 'Paused',
    [TRAFFIC_ANALYTICS.STATUS.STOPPED]: 'Stopped',
    [TRAFFIC_ANALYTICS.STATUS.UPDATING]: 'Updating',
    [TRAFFIC_ANALYTICS.STATUS.REFRESHING]: 'Refreshing',
  };
  return labels[status] || 'Unknown';
}

// Traffic Analytics Event Labels
export function getTrafficAnalyticsEventLabel(event: TrafficAnalyticsEvent): string {
  const labels: Record<TrafficAnalyticsEvent, string> = {
    [TRAFFIC_ANALYTICS.EVENTS.PAGE_VIEW]: 'Page View',
    [TRAFFIC_ANALYTICS.EVENTS.PAGE_LOAD]: 'Page Load',
    [TRAFFIC_ANALYTICS.EVENTS.PAGE_EXIT]: 'Page Exit',
    [TRAFFIC_ANALYTICS.EVENTS.PAGE_SCROLL]: 'Page Scroll',
    [TRAFFIC_ANALYTICS.EVENTS.VISITOR_ARRIVED]: 'Visitor Arrived',
    [TRAFFIC_ANALYTICS.EVENTS.VISITOR_DEPARTED]: 'Visitor Departed',
    [TRAFFIC_ANALYTICS.EVENTS.VISITOR_RETURNED]: 'Visitor Returned',
    [TRAFFIC_ANALYTICS.EVENTS.VISITOR_ENGAGED]: 'Visitor Engaged',
    [TRAFFIC_ANALYTICS.EVENTS.SESSION_START]: 'Session Start',
    [TRAFFIC_ANALYTICS.EVENTS.SESSION_END]: 'Session End',
    [TRAFFIC_ANALYTICS.EVENTS.SESSION_TIMEOUT]: 'Session Timeout',
    [TRAFFIC_ANALYTICS.EVENTS.SESSION_DURATION]: 'Session Duration',
    [TRAFFIC_ANALYTICS.EVENTS.ORGANIC_SEARCH]: 'Organic Search',
    [TRAFFIC_ANALYTICS.EVENTS.DIRECT_ACCESS]: 'Direct Access',
    [TRAFFIC_ANALYTICS.EVENTS.REFERRAL_LINK]: 'Referral Link',
    [TRAFFIC_ANALYTICS.EVENTS.SOCIAL_MEDIA]: 'Social Media',
    [TRAFFIC_ANALYTICS.EVENTS.PAID_AD]: 'Paid Ad',
    [TRAFFIC_ANALYTICS.EVENTS.EMAIL_LINK]: 'Email Link',
    [TRAFFIC_ANALYTICS.EVENTS.DEVICE_DETECTED]: 'Device Detected',
    [TRAFFIC_ANALYTICS.EVENTS.DEVICE_CHANGED]: 'Device Changed',
    [TRAFFIC_ANALYTICS.EVENTS.SCREEN_RESIZE]: 'Screen Resize',
    [TRAFFIC_ANALYTICS.EVENTS.LOCATION_DETECTED]: 'Location Detected',
    [TRAFFIC_ANALYTICS.EVENTS.LOCATION_CHANGED]: 'Location Changed',
    [TRAFFIC_ANALYTICS.EVENTS.PAGE_SPEED]: 'Page Speed',
    [TRAFFIC_ANALYTICS.EVENTS.LOAD_TIME]: 'Load Time',
    [TRAFFIC_ANALYTICS.EVENTS.RESPONSE_TIME]: 'Response Time',
    [TRAFFIC_ANALYTICS.EVENTS.ERROR_ENCOUNTERED]: 'Error Encountered',
    [TRAFFIC_ANALYTICS.EVENTS.GOAL_ACHIEVED]: 'Goal Achieved',
    [TRAFFIC_ANALYTICS.EVENTS.CONVERSION_COMPLETED]: 'Conversion Completed',
    [TRAFFIC_ANALYTICS.EVENTS.FUNNEL_STEP]: 'Funnel Step',
    [TRAFFIC_ANALYTICS.EVENTS.FUNNEL_COMPLETED]: 'Funnel Completed',
  };
  return labels[event] || 'Unknown';
}

// Traffic Analytics Dimension Labels
export function getTrafficAnalyticsDimensionLabel(dimension: TrafficAnalyticsDimension): string {
  const labels: Record<TrafficAnalyticsDimension, string> = {
    [TRAFFIC_ANALYTICS.DIMENSIONS.VISITOR_ID]: 'Visitor ID',
    [TRAFFIC_ANALYTICS.DIMENSIONS.VISITOR_TYPE]: 'Visitor Type',
    [TRAFFIC_ANALYTICS.DIMENSIONS.VISITOR_STATUS]: 'Visitor Status',
    [TRAFFIC_ANALYTICS.DIMENSIONS.VISITOR_SEGMENT]: 'Visitor Segment',
    [TRAFFIC_ANALYTICS.DIMENSIONS.SESSION_ID]: 'Session ID',
    [TRAFFIC_ANALYTICS.DIMENSIONS.SESSION_DURATION]: 'Session Duration',
    [TRAFFIC_ANALYTICS.DIMENSIONS.SESSION_DEPTH]: 'Session Depth',
    [TRAFFIC_ANALYTICS.DIMENSIONS.SESSION_QUALITY]: 'Session Quality',
    [TRAFFIC_ANALYTICS.DIMENSIONS.PAGE_URL]: 'Page URL',
    [TRAFFIC_ANALYTICS.DIMENSIONS.PAGE_PATH]: 'Page Path',
    [TRAFFIC_ANALYTICS.DIMENSIONS.PAGE_TITLE]: 'Page Title',
    [TRAFFIC_ANALYTICS.DIMENSIONS.PAGE_TYPE]: 'Page Type',
    [TRAFFIC_ANALYTICS.DIMENSIONS.PAGE_CATEGORY]: 'Page Category',
    [TRAFFIC_ANALYTICS.DIMENSIONS.SOURCE]: 'Source',
    [TRAFFIC_ANALYTICS.DIMENSIONS.MEDIUM]: 'Medium',
    [TRAFFIC_ANALYTICS.DIMENSIONS.CAMPAIGN]: 'Campaign',
    [TRAFFIC_ANALYTICS.DIMENSIONS.TERM]: 'Term',
    [TRAFFIC_ANALYTICS.DIMENSIONS.CONTENT]: 'Content',
    [TRAFFIC_ANALYTICS.DIMENSIONS.REFERRER]: 'Referrer',
    [TRAFFIC_ANALYTICS.DIMENSIONS.DEVICE_TYPE]: 'Device Type',
    [TRAFFIC_ANALYTICS.DIMENSIONS.DEVICE_BRAND]: 'Device Brand',
    [TRAFFIC_ANALYTICS.DIMENSIONS.DEVICE_MODEL]: 'Device Model',
    [TRAFFIC_ANALYTICS.DIMENSIONS.OS]: 'OS',
    [TRAFFIC_ANALYTICS.DIMENSIONS.OS_VERSION]: 'OS Version',
    [TRAFFIC_ANALYTICS.DIMENSIONS.BROWSER]: 'Browser',
    [TRAFFIC_ANALYTICS.DIMENSIONS.BROWSER_VERSION]: 'Browser Version',
    [TRAFFIC_ANALYTICS.DIMENSIONS.SCREEN_RESOLUTION]: 'Screen Resolution',
    [TRAFFIC_ANALYTICS.DIMENSIONS.VIEWPORT_SIZE]: 'Viewport Size',
    [TRAFFIC_ANALYTICS.DIMENSIONS.COUNTRY]: 'Country',
    [TRAFFIC_ANALYTICS.DIMENSIONS.COUNTRY_CODE]: 'Country Code',
    [TRAFFIC_ANALYTICS.DIMENSIONS.REGION]: 'Region',
    [TRAFFIC_ANALYTICS.DIMENSIONS.CITY]: 'City',
    [TRAFFIC_ANALYTICS.DIMENSIONS.CITY_NAME]: 'City Name',
    [TRAFFIC_ANALYTICS.DIMENSIONS.POSTAL_CODE]: 'Postal Code',
    [TRAFFIC_ANALYTICS.DIMENSIONS.TIMEZONE]: 'Timezone',
    [TRAFFIC_ANALYTICS.DIMENSIONS.LANGUAGE]: 'Language',
    [TRAFFIC_ANALYTICS.DIMENSIONS.DATE]: 'Date',
    [TRAFFIC_ANALYTICS.DIMENSIONS.DATE_TIME]: 'Date & Time',
    [TRAFFIC_ANALYTICS.DIMENSIONS.HOUR]: 'Hour',
    [TRAFFIC_ANALYTICS.DIMENSIONS.DAY]: 'Day',
    [TRAFFIC_ANALYTICS.DIMENSIONS.WEEK]: 'Week',
    [TRAFFIC_ANALYTICS.DIMENSIONS.MONTH]: 'Month',
    [TRAFFIC_ANALYTICS.DIMENSIONS.QUARTER]: 'Quarter',
    [TRAFFIC_ANALYTICS.DIMENSIONS.YEAR]: 'Year',
    [TRAFFIC_ANALYTICS.DIMENSIONS.DAY_OF_WEEK]: 'Day of Week',
    [TRAFFIC_ANALYTICS.DIMENSIONS.HOUR_OF_DAY]: 'Hour of Day',
    [TRAFFIC_ANALYTICS.DIMENSIONS.LOAD_TIME]: 'Load Time',
    [TRAFFIC_ANALYTICS.DIMENSIONS.DOM_LOAD_TIME]: 'DOM Load Time',
    [TRAFFIC_ANALYTICS.DIMENSIONS.PAGE_SIZE]: 'Page Size',
    [TRAFFIC_ANALYTICS.DIMENSIONS.REQUEST_COUNT]: 'Request Count',
    [TRAFFIC_ANALYTICS.DIMENSIONS.ERROR_COUNT]: 'Error Count',
  };
  return labels[dimension] || 'Unknown';
}

// Traffic Analytics Segment Labels
export function getTrafficAnalyticsSegmentLabel(segment: TrafficAnalyticsSegment): string {
  const labels: Record<TrafficAnalyticsSegment, string> = {
    [TRAFFIC_ANALYTICS.SEGMENTS.NEW_VISITORS]: 'New Visitors',
    [TRAFFIC_ANALYTICS.SEGMENTS.RETURNING_VISITORS]: 'Returning Visitors',
    [TRAFFIC_ANALYTICS.SEGMENTS.ENGAGED_VISITORS]: 'Engaged Visitors',
    [TRAFFIC_ANALYTICS.SEGMENTS.DISENGAGED_VISITORS]: 'Disengaged Visitors',
    [TRAFFIC_ANALYTICS.SEGMENTS.HIGH_VALUE_VISITORS]: 'High Value Visitors',
    [TRAFFIC_ANALYTICS.SEGMENTS.ORGANIC]: 'Organic',
    [TRAFFIC_ANALYTICS.SEGMENTS.DIRECT]: 'Direct',
    [TRAFFIC_ANALYTICS.SEGMENTS.REFERRAL]: 'Referral',
    [TRAFFIC_ANALYTICS.SEGMENTS.SOCIAL]: 'Social',
    [TRAFFIC_ANALYTICS.SEGMENTS.PAID]: 'Paid',
    [TRAFFIC_ANALYTICS.SEGMENTS.EMAIL]: 'Email',
    [TRAFFIC_ANALYTICS.SEGMENTS.DESKTOP]: 'Desktop',
    [TRAFFIC_ANALYTICS.SEGMENTS.MOBILE]: 'Mobile',
    [TRAFFIC_ANALYTICS.SEGMENTS.TABLET]: 'Tablet',
    [TRAFFIC_ANALYTICS.SEGMENTS.CHROME]: 'Chrome',
    [TRAFFIC_ANALYTICS.SEGMENTS.FIREFOX]: 'Firefox',
    [TRAFFIC_ANALYTICS.SEGMENTS.SAFARI]: 'Safari',
    [TRAFFIC_ANALYTICS.SEGMENTS.EDGE]: 'Edge',
    [TRAFFIC_ANALYTICS.SEGMENTS.DOMESTIC]: 'Domestic',
    [TRAFFIC_ANALYTICS.SEGMENTS.INTERNATIONAL]: 'International',
    [TRAFFIC_ANALYTICS.SEGMENTS.LOCAL]: 'Local',
    [TRAFFIC_ANALYTICS.SEGMENTS.HIGH_ENGAGEMENT]: 'High Engagement',
    [TRAFFIC_ANALYTICS.SEGMENTS.LOW_ENGAGEMENT]: 'Low Engagement',
    [TRAFFIC_ANALYTICS.SEGMENTS.CONVERTERS]: 'Converters',
    [TRAFFIC_ANALYTICS.SEGMENTS.NON_CONVERTERS]: 'Non-Converters',
    [TRAFFIC_ANALYTICS.SEGMENTS.BOUNCERS]: 'Bouncers',
  };
  return labels[segment] || 'Unknown';
}

// Traffic Analytics Cohort Labels
export function getTrafficAnalyticsCohortLabel(cohort: TrafficAnalyticsCohort): string {
  const labels: Record<TrafficAnalyticsCohort, string> = {
    [TRAFFIC_ANALYTICS.COHORTS.FIRST_VISIT]: 'First Visit',
    [TRAFFIC_ANALYTICS.COHORTS.ACQUISITION_CHANNEL]: 'Acquisition Channel',
    [TRAFFIC_ANALYTICS.COHORTS.DEVICE_TYPE]: 'Device Type',
    [TRAFFIC_ANALYTICS.COHORTS.LOCATION]: 'Location',
    [TRAFFIC_ANALYTICS.COHORTS.BROWSER]: 'Browser',
    [TRAFFIC_ANALYTICS.COHORTS.CAMPAIGN]: 'Campaign',
  };
  return labels[cohort] || 'Unknown';
}

// Traffic Analytics Granularity Labels
export function getTrafficAnalyticsGranularityLabel(
  granularity: TrafficAnalyticsGranularity
): string {
  const labels: Record<TrafficAnalyticsGranularity, string> = {
    [TRAFFIC_ANALYTICS.GRANULARITY.HOURLY]: 'Hourly',
    [TRAFFIC_ANALYTICS.GRANULARITY.DAILY]: 'Daily',
    [TRAFFIC_ANALYTICS.GRANULARITY.WEEKLY]: 'Weekly',
    [TRAFFIC_ANALYTICS.GRANULARITY.MONTHLY]: 'Monthly',
    [TRAFFIC_ANALYTICS.GRANULARITY.QUARTERLY]: 'Quarterly',
    [TRAFFIC_ANALYTICS.GRANULARITY.YEARLY]: 'Yearly',
  };
  return labels[granularity] || 'Unknown';
}

// Check if traffic analytics is active
export function isTrafficAnalyticsActive(status: TrafficAnalyticsStatus): boolean {
  const activeStatuses: TrafficAnalyticsStatus[] = [
    TRAFFIC_ANALYTICS.STATUS.TRACKING,
    TRAFFIC_ANALYTICS.STATUS.PROCESSING,
    TRAFFIC_ANALYTICS.STATUS.ANALYZING,
    TRAFFIC_ANALYTICS.STATUS.UPDATING,
    TRAFFIC_ANALYTICS.STATUS.REFRESHING,
  ];
  return activeStatuses.includes(status);
}

// Check if traffic analytics is completed
export function isTrafficAnalyticsCompleted(status: TrafficAnalyticsStatus): boolean {
  return status === TRAFFIC_ANALYTICS.STATUS.COMPLETED;
}

// Check if traffic analytics has failed
export function isTrafficAnalyticsFailed(status: TrafficAnalyticsStatus): boolean {
  return status === TRAFFIC_ANALYTICS.STATUS.FAILED;
}

// Check if event is page event
export function isTrafficAnalyticsPageEvent(event: TrafficAnalyticsEvent): boolean {
  const pageEvents: TrafficAnalyticsEvent[] = [
    TRAFFIC_ANALYTICS.EVENTS.PAGE_VIEW,
    TRAFFIC_ANALYTICS.EVENTS.PAGE_LOAD,
    TRAFFIC_ANALYTICS.EVENTS.PAGE_EXIT,
    TRAFFIC_ANALYTICS.EVENTS.PAGE_SCROLL,
  ];
  return pageEvents.includes(event);
}

// Check if event is visitor event
export function isTrafficAnalyticsVisitorEvent(event: TrafficAnalyticsEvent): boolean {
  const visitorEvents: TrafficAnalyticsEvent[] = [
    TRAFFIC_ANALYTICS.EVENTS.VISITOR_ARRIVED,
    TRAFFIC_ANALYTICS.EVENTS.VISITOR_DEPARTED,
    TRAFFIC_ANALYTICS.EVENTS.VISITOR_RETURNED,
    TRAFFIC_ANALYTICS.EVENTS.VISITOR_ENGAGED,
  ];
  return visitorEvents.includes(event);
}

// Check if event is session event
export function isTrafficAnalyticsSessionEvent(event: TrafficAnalyticsEvent): boolean {
  const sessionEvents: TrafficAnalyticsEvent[] = [
    TRAFFIC_ANALYTICS.EVENTS.SESSION_START,
    TRAFFIC_ANALYTICS.EVENTS.SESSION_END,
    TRAFFIC_ANALYTICS.EVENTS.SESSION_TIMEOUT,
    TRAFFIC_ANALYTICS.EVENTS.SESSION_DURATION,
  ];
  return sessionEvents.includes(event);
}

// Check if event is traffic source event
export function isTrafficAnalyticsSourceEvent(event: TrafficAnalyticsEvent): boolean {
  const sourceEvents: TrafficAnalyticsEvent[] = [
    TRAFFIC_ANALYTICS.EVENTS.ORGANIC_SEARCH,
    TRAFFIC_ANALYTICS.EVENTS.DIRECT_ACCESS,
    TRAFFIC_ANALYTICS.EVENTS.REFERRAL_LINK,
    TRAFFIC_ANALYTICS.EVENTS.SOCIAL_MEDIA,
    TRAFFIC_ANALYTICS.EVENTS.PAID_AD,
    TRAFFIC_ANALYTICS.EVENTS.EMAIL_LINK,
  ];
  return sourceEvents.includes(event);
}
