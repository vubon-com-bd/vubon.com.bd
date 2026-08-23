/**
 * Analytics Dimension Constants
 * Dimensions for segmenting and grouping analytics data
 */

export const ANALYTICS_DIMENSION = {
  // User Dimensions
  USER: {
    USER_ID: 'user_id',
    USER_NAME: 'user_name',
    USER_EMAIL: 'user_email',
    USER_TYPE: 'user_type',
    USER_ROLE: 'user_role',
    USER_STATUS: 'user_status',
    USER_SEGMENT: 'user_segment',
    USER_COHORT: 'user_cohort',
    USER_LIFECYCLE: 'user_lifecycle',
  } as const,

  // Session Dimensions
  SESSION: {
    SESSION_ID: 'session_id',
    SESSION_DURATION: 'session_duration',
    SESSION_TYPE: 'session_type',
    SESSION_STATUS: 'session_status',
    SESSION_START: 'session_start',
    SESSION_END: 'session_end',
    SESSION_DEVICE: 'session_device',
    SESSION_BROWSER: 'session_browser',
    SESSION_OS: 'session_os',
  } as const,

  // Location Dimensions
  LOCATION: {
    COUNTRY: 'country',
    COUNTRY_CODE: 'country_code',
    REGION: 'region',
    STATE: 'state',
    CITY: 'city',
    CITY_NAME: 'city_name',
    POSTAL_CODE: 'postal_code',
    TIMEZONE: 'timezone',
    LATITUDE: 'latitude',
    LONGITUDE: 'longitude',
    CONTINENT: 'continent',
  } as const,

  // Device Dimensions
  DEVICE: {
    DEVICE_TYPE: 'device_type',
    DEVICE_CATEGORY: 'device_category',
    DEVICE_MODEL: 'device_model',
    DEVICE_BRAND: 'device_brand',
    DEVICE_OS: 'device_os',
    DEVICE_OS_VERSION: 'device_os_version',
    DEVICE_BROWSER: 'device_browser',
    DEVICE_BROWSER_VERSION: 'device_browser_version',
    DEVICE_SCREEN_SIZE: 'device_screen_size',
    DEVICE_PIXEL_RATIO: 'device_pixel_ratio',
    DEVICE_ORIENTATION: 'device_orientation',
  } as const,

  // Traffic Dimensions
  TRAFFIC: {
    SOURCE: 'source',
    MEDIUM: 'medium',
    CAMPAIGN: 'campaign',
    TERM: 'term',
    CONTENT: 'content',
    REFERRER: 'referrer',
    LANDING_PAGE: 'landing_page',
    EXIT_PAGE: 'exit_page',
    CHANNEL: 'channel',
    SOURCE_TYPE: 'source_type',
  } as const,

  // Product Dimensions
  PRODUCT: {
    PRODUCT_ID: 'product_id',
    PRODUCT_NAME: 'product_name',
    PRODUCT_SKU: 'product_sku',
    PRODUCT_CATEGORY: 'product_category',
    PRODUCT_SUB_CATEGORY: 'product_sub_category',
    PRODUCT_BRAND: 'product_brand',
    PRODUCT_VENDOR: 'product_vendor',
    PRODUCT_STATUS: 'product_status',
    PRODUCT_TYPE: 'product_type',
    PRODUCT_PRICE: 'product_price',
    PRODUCT_WEIGHT: 'product_weight',
  } as const,

  // Order Dimensions
  ORDER: {
    ORDER_ID: 'order_id',
    ORDER_TYPE: 'order_type',
    ORDER_STATUS: 'order_status',
    ORDER_CHANNEL: 'order_channel',
    PAYMENT_METHOD: 'payment_method',
    PAYMENT_STATUS: 'payment_status',
    SHIPPING_METHOD: 'shipping_method',
    SHIPPING_STATUS: 'shipping_status',
  } as const,

  // Time Dimensions
  TIME: {
    YEAR: 'year',
    QUARTER: 'quarter',
    MONTH: 'month',
    WEEK: 'week',
    DAY: 'day',
    HOUR: 'hour',
    MINUTE: 'minute',
    DATE: 'date',
    DATE_TIME: 'date_time',
    DAY_OF_WEEK: 'day_of_week',
    DAY_OF_MONTH: 'day_of_month',
    WEEK_OF_YEAR: 'week_of_year',
    MONTH_OF_YEAR: 'month_of_year',
    QUARTER_OF_YEAR: 'quarter_of_year',
    HOUR_OF_DAY: 'hour_of_day',
    MINUTE_OF_HOUR: 'minute_of_hour',
    TIME_RANGE: 'time_range',
  } as const,

  // Page Dimensions
  PAGE: {
    PAGE_URL: 'page_url',
    PAGE_PATH: 'page_path',
    PAGE_TITLE: 'page_title',
    PAGE_TYPE: 'page_type',
    PAGE_CATEGORY: 'page_category',
    PAGE_REFERRER: 'page_referrer',
    PAGE_LOAD_TIME: 'page_load_time',
    PAGE_DEPTH: 'page_depth',
  } as const,

  // Event Dimensions
  EVENT: {
    EVENT_CATEGORY: 'event_category',
    EVENT_ACTION: 'event_action',
    EVENT_LABEL: 'event_label',
    EVENT_VALUE: 'event_value',
    EVENT_ID: 'event_id',
    EVENT_TYPE: 'event_type',
    EVENT_STATUS: 'event_status',
  } as const,

  // Marketing Dimensions
  MARKETING: {
    CAMPAIGN_ID: 'campaign_id',
    CAMPAIGN_NAME: 'campaign_name',
    CAMPAIGN_TYPE: 'campaign_type',
    AD_ID: 'ad_id',
    AD_GROUP: 'ad_group',
    CREATIVE: 'creative',
    KEYWORD: 'keyword',
    TARGETING: 'targeting',
  } as const,

  // System Dimensions
  SYSTEM: {
    SYSTEM_ID: 'system_id',
    SYSTEM_NAME: 'system_name',
    SYSTEM_TYPE: 'system_type',
    SYSTEM_ENVIRONMENT: 'system_environment',
    SYSTEM_VERSION: 'system_version',
    SERVER_ID: 'server_id',
    SERVER_LOCATION: 'server_location',
    API_VERSION: 'api_version',
    ENDPOINT: 'endpoint',
    STATUS_CODE: 'status_code',
  } as const,

  // Dimension Categories
  CATEGORIES: {
    USER: 'user',
    SESSION: 'session',
    LOCATION: 'location',
    DEVICE: 'device',
    TRAFFIC: 'traffic',
    PRODUCT: 'product',
    ORDER: 'order',
    TIME: 'time',
    PAGE: 'page',
    EVENT: 'event',
    MARKETING: 'marketing',
    SYSTEM: 'system',
  } as const,

  // Dimension Types
  TYPES: {
    STRING: 'string',
    NUMBER: 'number',
    DATE: 'date',
    DATE_TIME: 'date_time',
    BOOLEAN: 'boolean',
    JSON: 'json',
    ARRAY: 'array',
  } as const,

  // Dimension Granularity
  GRANULARITY: {
    RAW: 'raw',
    AGGREGATED: 'aggregated',
    ROLLED_UP: 'rolled_up',
    DRILL_DOWN: 'drill_down',
    SUMMARY: 'summary',
  } as const,
} as const;

// Analytics User Dimensions
export type AnalyticsUserDimension =
  (typeof ANALYTICS_DIMENSION.USER)[keyof typeof ANALYTICS_DIMENSION.USER];

// Analytics Session Dimensions
export type AnalyticsSessionDimension =
  (typeof ANALYTICS_DIMENSION.SESSION)[keyof typeof ANALYTICS_DIMENSION.SESSION];

// Analytics Location Dimensions
export type AnalyticsLocationDimension =
  (typeof ANALYTICS_DIMENSION.LOCATION)[keyof typeof ANALYTICS_DIMENSION.LOCATION];

// Analytics Device Dimensions
export type AnalyticsDeviceDimension =
  (typeof ANALYTICS_DIMENSION.DEVICE)[keyof typeof ANALYTICS_DIMENSION.DEVICE];

// Analytics Traffic Dimensions
export type AnalyticsTrafficDimension =
  (typeof ANALYTICS_DIMENSION.TRAFFIC)[keyof typeof ANALYTICS_DIMENSION.TRAFFIC];

// Analytics Product Dimensions
export type AnalyticsProductDimension =
  (typeof ANALYTICS_DIMENSION.PRODUCT)[keyof typeof ANALYTICS_DIMENSION.PRODUCT];

// Analytics Order Dimensions
export type AnalyticsOrderDimension =
  (typeof ANALYTICS_DIMENSION.ORDER)[keyof typeof ANALYTICS_DIMENSION.ORDER];

// Analytics Time Dimensions
export type AnalyticsTimeDimension =
  (typeof ANALYTICS_DIMENSION.TIME)[keyof typeof ANALYTICS_DIMENSION.TIME];

// Analytics Page Dimensions
export type AnalyticsPageDimension =
  (typeof ANALYTICS_DIMENSION.PAGE)[keyof typeof ANALYTICS_DIMENSION.PAGE];

// Analytics Event Dimensions
export type AnalyticsEventDimension =
  (typeof ANALYTICS_DIMENSION.EVENT)[keyof typeof ANALYTICS_DIMENSION.EVENT];

// Analytics Marketing Dimensions
export type AnalyticsMarketingDimension =
  (typeof ANALYTICS_DIMENSION.MARKETING)[keyof typeof ANALYTICS_DIMENSION.MARKETING];

// Analytics System Dimensions
export type AnalyticsSystemDimension =
  (typeof ANALYTICS_DIMENSION.SYSTEM)[keyof typeof ANALYTICS_DIMENSION.SYSTEM];

// Analytics Dimension Categories
export type AnalyticsDimensionCategory =
  (typeof ANALYTICS_DIMENSION.CATEGORIES)[keyof typeof ANALYTICS_DIMENSION.CATEGORIES];

// Analytics Dimension Types
export type AnalyticsDimensionType =
  (typeof ANALYTICS_DIMENSION.TYPES)[keyof typeof ANALYTICS_DIMENSION.TYPES];

// Analytics Dimension Granularity
export type AnalyticsDimensionGranularity =
  (typeof ANALYTICS_DIMENSION.GRANULARITY)[keyof typeof ANALYTICS_DIMENSION.GRANULARITY];

// Analytics Dimension Label
export function getAnalyticsDimensionLabel(dimension: string): string {
  const labels: Record<string, string> = {
    // User Dimensions
    user_id: 'User ID',
    user_name: 'User Name',
    user_email: 'User Email',
    user_type: 'User Type',
    user_role: 'User Role',
    user_status: 'User Status',
    user_segment: 'User Segment',
    user_cohort: 'User Cohort',
    user_lifecycle: 'User Lifecycle',

    // Session Dimensions
    session_id: 'Session ID',
    session_duration: 'Session Duration',
    session_type: 'Session Type',
    session_status: 'Session Status',
    session_start: 'Session Start',
    session_end: 'Session End',
    session_device: 'Session Device',
    session_browser: 'Session Browser',
    session_os: 'Session OS',

    // Location Dimensions
    country: 'Country',
    country_code: 'Country Code',
    region: 'Region',
    state: 'State',
    city: 'City',
    city_name: 'City Name',
    postal_code: 'Postal Code',
    timezone: 'Timezone',
    latitude: 'Latitude',
    longitude: 'Longitude',
    continent: 'Continent',

    // Device Dimensions
    device_type: 'Device Type',
    device_category: 'Device Category',
    device_model: 'Device Model',
    device_brand: 'Device Brand',
    device_os: 'Device OS',
    device_os_version: 'Device OS Version',
    device_browser: 'Device Browser',
    device_browser_version: 'Device Browser Version',
    device_screen_size: 'Device Screen Size',
    device_pixel_ratio: 'Device Pixel Ratio',
    device_orientation: 'Device Orientation',

    // Traffic Dimensions
    source: 'Source',
    medium: 'Medium',
    campaign: 'Campaign',
    term: 'Term',
    content: 'Content',
    referrer: 'Referrer',
    landing_page: 'Landing Page',
    exit_page: 'Exit Page',
    channel: 'Channel',
    source_type: 'Source Type',

    // Product Dimensions
    product_id: 'Product ID',
    product_name: 'Product Name',
    product_sku: 'Product SKU',
    product_category: 'Product Category',
    product_sub_category: 'Product Sub-Category',
    product_brand: 'Product Brand',
    product_vendor: 'Product Vendor',
    product_status: 'Product Status',
    product_type: 'Product Type',
    product_price: 'Product Price',
    product_weight: 'Product Weight',

    // Order Dimensions
    order_id: 'Order ID',
    order_type: 'Order Type',
    order_status: 'Order Status',
    order_channel: 'Order Channel',
    payment_method: 'Payment Method',
    payment_status: 'Payment Status',
    shipping_method: 'Shipping Method',
    shipping_status: 'Shipping Status',

    // Time Dimensions
    year: 'Year',
    quarter: 'Quarter',
    month: 'Month',
    week: 'Week',
    day: 'Day',
    hour: 'Hour',
    minute: 'Minute',
    date: 'Date',
    date_time: 'Date & Time',
    day_of_week: 'Day of Week',
    day_of_month: 'Day of Month',
    week_of_year: 'Week of Year',
    month_of_year: 'Month of Year',
    quarter_of_year: 'Quarter of Year',
    hour_of_day: 'Hour of Day',
    minute_of_hour: 'Minute of Hour',
    time_range: 'Time Range',

    // Page Dimensions
    page_url: 'Page URL',
    page_path: 'Page Path',
    page_title: 'Page Title',
    page_type: 'Page Type',
    page_category: 'Page Category',
    page_referrer: 'Page Referrer',
    page_load_time: 'Page Load Time',
    page_depth: 'Page Depth',

    // Event Dimensions
    event_category: 'Event Category',
    event_action: 'Event Action',
    event_label: 'Event Label',
    event_value: 'Event Value',
    event_id: 'Event ID',
    event_type: 'Event Type',
    event_status: 'Event Status',

    // Marketing Dimensions
    campaign_id: 'Campaign ID',
    campaign_name: 'Campaign Name',
    campaign_type: 'Campaign Type',
    ad_id: 'Ad ID',
    ad_group: 'Ad Group',
    creative: 'Creative',
    keyword: 'Keyword',
    targeting: 'Targeting',

    // System Dimensions
    system_id: 'System ID',
    system_name: 'System Name',
    system_type: 'System Type',
    system_environment: 'System Environment',
    system_version: 'System Version',
    server_id: 'Server ID',
    server_location: 'Server Location',
    api_version: 'API Version',
    endpoint: 'Endpoint',
    status_code: 'Status Code',
  };

  return (
    labels[dimension] ||
    dimension.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
  );
}

// Analytics Dimension Category Labels
export function getAnalyticsDimensionCategoryLabel(category: AnalyticsDimensionCategory): string {
  const labels: Record<AnalyticsDimensionCategory, string> = {
    [ANALYTICS_DIMENSION.CATEGORIES.USER]: 'User',
    [ANALYTICS_DIMENSION.CATEGORIES.SESSION]: 'Session',
    [ANALYTICS_DIMENSION.CATEGORIES.LOCATION]: 'Location',
    [ANALYTICS_DIMENSION.CATEGORIES.DEVICE]: 'Device',
    [ANALYTICS_DIMENSION.CATEGORIES.TRAFFIC]: 'Traffic',
    [ANALYTICS_DIMENSION.CATEGORIES.PRODUCT]: 'Product',
    [ANALYTICS_DIMENSION.CATEGORIES.ORDER]: 'Order',
    [ANALYTICS_DIMENSION.CATEGORIES.TIME]: 'Time',
    [ANALYTICS_DIMENSION.CATEGORIES.PAGE]: 'Page',
    [ANALYTICS_DIMENSION.CATEGORIES.EVENT]: 'Event',
    [ANALYTICS_DIMENSION.CATEGORIES.MARKETING]: 'Marketing',
    [ANALYTICS_DIMENSION.CATEGORIES.SYSTEM]: 'System',
  };
  return labels[category] || 'Unknown';
}

// Analytics Dimension Type Labels
export function getAnalyticsDimensionTypeLabel(type: AnalyticsDimensionType): string {
  const labels: Record<AnalyticsDimensionType, string> = {
    [ANALYTICS_DIMENSION.TYPES.STRING]: 'String',
    [ANALYTICS_DIMENSION.TYPES.NUMBER]: 'Number',
    [ANALYTICS_DIMENSION.TYPES.DATE]: 'Date',
    [ANALYTICS_DIMENSION.TYPES.DATE_TIME]: 'Date & Time',
    [ANALYTICS_DIMENSION.TYPES.BOOLEAN]: 'Boolean',
    [ANALYTICS_DIMENSION.TYPES.JSON]: 'JSON',
    [ANALYTICS_DIMENSION.TYPES.ARRAY]: 'Array',
  };
  return labels[type] || 'Unknown';
}

// Get dimension category
export function getAnalyticsDimensionCategory(dimension: string): AnalyticsDimensionCategory {
  const userDimensions: readonly string[] = Object.values(ANALYTICS_DIMENSION.USER);
  const sessionDimensions: readonly string[] = Object.values(ANALYTICS_DIMENSION.SESSION);
  const locationDimensions: readonly string[] = Object.values(ANALYTICS_DIMENSION.LOCATION);
  const deviceDimensions: readonly string[] = Object.values(ANALYTICS_DIMENSION.DEVICE);
  const trafficDimensions: readonly string[] = Object.values(ANALYTICS_DIMENSION.TRAFFIC);
  const productDimensions: readonly string[] = Object.values(ANALYTICS_DIMENSION.PRODUCT);
  const orderDimensions: readonly string[] = Object.values(ANALYTICS_DIMENSION.ORDER);
  const timeDimensions: readonly string[] = Object.values(ANALYTICS_DIMENSION.TIME);
  const pageDimensions: readonly string[] = Object.values(ANALYTICS_DIMENSION.PAGE);
  const eventDimensions: readonly string[] = Object.values(ANALYTICS_DIMENSION.EVENT);
  const marketingDimensions: readonly string[] = Object.values(ANALYTICS_DIMENSION.MARKETING);
  const systemDimensions: readonly string[] = Object.values(ANALYTICS_DIMENSION.SYSTEM);

  if (userDimensions.includes(dimension)) return ANALYTICS_DIMENSION.CATEGORIES.USER;
  if (sessionDimensions.includes(dimension)) return ANALYTICS_DIMENSION.CATEGORIES.SESSION;
  if (locationDimensions.includes(dimension)) return ANALYTICS_DIMENSION.CATEGORIES.LOCATION;
  if (deviceDimensions.includes(dimension)) return ANALYTICS_DIMENSION.CATEGORIES.DEVICE;
  if (trafficDimensions.includes(dimension)) return ANALYTICS_DIMENSION.CATEGORIES.TRAFFIC;
  if (productDimensions.includes(dimension)) return ANALYTICS_DIMENSION.CATEGORIES.PRODUCT;
  if (orderDimensions.includes(dimension)) return ANALYTICS_DIMENSION.CATEGORIES.ORDER;
  if (timeDimensions.includes(dimension)) return ANALYTICS_DIMENSION.CATEGORIES.TIME;
  if (pageDimensions.includes(dimension)) return ANALYTICS_DIMENSION.CATEGORIES.PAGE;
  if (eventDimensions.includes(dimension)) return ANALYTICS_DIMENSION.CATEGORIES.EVENT;
  if (marketingDimensions.includes(dimension)) return ANALYTICS_DIMENSION.CATEGORIES.MARKETING;
  if (systemDimensions.includes(dimension)) return ANALYTICS_DIMENSION.CATEGORIES.SYSTEM;

  return ANALYTICS_DIMENSION.CATEGORIES.USER;
}
