/**
 * @fileoverview Analytics metrics and measurements definitions
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Core analytics metrics
 */
export enum AnalyticsMetric {
  /** Total revenue generated */
  REVENUE = 'REVENUE',
  /** Total number of orders */
  ORDERS = 'ORDERS',
  /** Total units sold */
  UNITS_SOLD = 'UNITS_SOLD',
  /** Average Order Value */
  AOV = 'AOV',
  /** Conversion rate percentage */
  CONVERSION_RATE = 'CONVERSION_RATE',
  /** Bounce rate percentage */
  BOUNCE_RATE = 'BOUNCE_RATE',
  /** Average session duration in seconds */
  SESSION_DURATION = 'SESSION_DURATION',
  /** Total page views */
  PAGE_VIEWS = 'PAGE_VIEWS',
  /** Click Through Rate percentage */
  CTR = 'CTR',
  /** Return on Investment percentage */
  ROI = 'ROI',
  /** Customer Acquisition Cost */
  CAC = 'CAC',
  /** Customer Lifetime Value */
  LTV = 'LTV',
  /** Net Promoter Score */
  NPS = 'NPS',
  /** Customer Satisfaction score */
  CSAT = 'CSAT',
  /** Gross profit */
  GROSS_PROFIT = 'GROSS_PROFIT',
  /** Net profit */
  NET_PROFIT = 'NET_PROFIT',
  /** Operating margin */
  OPERATING_MARGIN = 'OPERATING_MARGIN',
  /** Customer retention rate */
  RETENTION_RATE = 'RETENTION_RATE',
  /** Customer churn rate */
  CHURN_RATE = 'CHURN_RATE',
  /** Average response time in seconds */
  AVG_RESPONSE_TIME = 'AVG_RESPONSE_TIME',
  /** Error rate percentage */
  ERROR_RATE = 'ERROR_RATE',
  /** Uptime percentage */
  UPTIME = 'UPTIME',
  /** Daily active users */
  DAU = 'DAU',
  /** Monthly active users */
  MAU = 'MAU',
  /** Weekly active users */
  WAU = 'WAU',
  /** Stickiness ratio (DAU/MAU) */
  STICKINESS = 'STICKINESS',
  /** User engagement score */
  ENGAGEMENT_SCORE = 'ENGAGEMENT_SCORE',
  /** Click-through rate for emails */
  EMAIL_CTR = 'EMAIL_CTR',
  /** Email open rate */
  EMAIL_OPEN_RATE = 'EMAIL_OPEN_RATE',
  /** Email bounce rate */
  EMAIL_BOUNCE_RATE = 'EMAIL_BOUNCE_RATE',
  /** Email unsubscribe rate */
  EMAIL_UNSUBSCRIBE_RATE = 'EMAIL_UNSUBSCRIBE_RATE',
  /** Social media followers */
  SOCIAL_FOLLOWERS = 'SOCIAL_FOLLOWERS',
  /** Social media engagement rate */
  SOCIAL_ENGAGEMENT_RATE = 'SOCIAL_ENGAGEMENT_RATE',
  /** Social media share rate */
  SOCIAL_SHARE_RATE = 'SOCIAL_SHARE_RATE',
  /** App downloads */
  APP_DOWNLOADS = 'APP_DOWNLOADS',
  /** App ratings */
  APP_RATING = 'APP_RATING',
  /** App reviews */
  APP_REVIEWS = 'APP_REVIEWS',
  /** Add to cart rate */
  ADD_TO_CART_RATE = 'ADD_TO_CART_RATE',
  /** Checkout abandonment rate */
  CHECKOUT_ABANDONMENT_RATE = 'CHECKOUT_ABANDONMENT_RATE',
  /** Purchase completion rate */
  PURCHASE_COMPLETION_RATE = 'PURCHASE_COMPLETION_RATE',
  /** Average cart value */
  AVG_CART_VALUE = 'AVG_CART_VALUE',
  /** Return rate */
  RETURN_RATE = 'RETURN_RATE',
  /** Refund rate */
  REFUND_RATE = 'REFUND_RATE',
  /** Delivery success rate */
  DELIVERY_SUCCESS_RATE = 'DELIVERY_SUCCESS_RATE',
  /** Average delivery time */
  AVG_DELIVERY_TIME = 'AVG_DELIVERY_TIME',
  /** Inventory turnover rate */
  INVENTORY_TURNOVER = 'INVENTORY_TURNOVER',
  /** Stock out rate */
  STOCK_OUT_RATE = 'STOCK_OUT_RATE',
  /** Lead conversion rate */
  LEAD_CONVERSION_RATE = 'LEAD_CONVERSION_RATE',
  /** Sales qualified leads */
  SQL = 'SQL',
  /** Marketing qualified leads */
  MQL = 'MQL',
  /** Cost per lead */
  COST_PER_LEAD = 'COST_PER_LEAD',
  /** Cost per conversion */
  COST_PER_CONVERSION = 'COST_PER_CONVERSION',
  /** Customer effort score */
  CES = 'CES',
  /** Customer service resolution rate */
  RESOLUTION_RATE = 'RESOLUTION_RATE',
  /** Average resolution time */
  AVG_RESOLUTION_TIME = 'AVG_RESOLUTION_TIME',
}

/**
 * Metric type classification
 */
export enum AnalyticsMetricType {
  /** Financial metrics */
  FINANCIAL = 'FINANCIAL',
  /** Sales metrics */
  SALES = 'SALES',
  /** Marketing metrics */
  MARKETING = 'MARKETING',
  /** Customer metrics */
  CUSTOMER = 'CUSTOMER',
  /** Operational metrics */
  OPERATIONAL = 'OPERATIONAL',
  /** Engagement metrics */
  ENGAGEMENT = 'ENGAGEMENT',
  /** Technical metrics */
  TECHNICAL = 'TECHNICAL',
  /** Social metrics */
  SOCIAL = 'SOCIAL',
  /** Performance metrics */
  PERFORMANCE = 'PERFORMANCE',
}

/**
 * Metric category mapping
 */
export const ANALYTICS_METRIC_CATEGORY_MAP: Record<AnalyticsMetric, AnalyticsMetricType> = {
  [AnalyticsMetric.REVENUE]: AnalyticsMetricType.FINANCIAL,
  [AnalyticsMetric.ORDERS]: AnalyticsMetricType.SALES,
  [AnalyticsMetric.UNITS_SOLD]: AnalyticsMetricType.SALES,
  [AnalyticsMetric.AOV]: AnalyticsMetricType.SALES,
  [AnalyticsMetric.CONVERSION_RATE]: AnalyticsMetricType.MARKETING,
  [AnalyticsMetric.BOUNCE_RATE]: AnalyticsMetricType.PERFORMANCE,
  [AnalyticsMetric.SESSION_DURATION]: AnalyticsMetricType.ENGAGEMENT,
  [AnalyticsMetric.PAGE_VIEWS]: AnalyticsMetricType.ENGAGEMENT,
  [AnalyticsMetric.CTR]: AnalyticsMetricType.MARKETING,
  [AnalyticsMetric.ROI]: AnalyticsMetricType.FINANCIAL,
  [AnalyticsMetric.CAC]: AnalyticsMetricType.MARKETING,
  [AnalyticsMetric.LTV]: AnalyticsMetricType.CUSTOMER,
  [AnalyticsMetric.NPS]: AnalyticsMetricType.CUSTOMER,
  [AnalyticsMetric.CSAT]: AnalyticsMetricType.CUSTOMER,
  [AnalyticsMetric.GROSS_PROFIT]: AnalyticsMetricType.FINANCIAL,
  [AnalyticsMetric.NET_PROFIT]: AnalyticsMetricType.FINANCIAL,
  [AnalyticsMetric.OPERATING_MARGIN]: AnalyticsMetricType.FINANCIAL,
  [AnalyticsMetric.RETENTION_RATE]: AnalyticsMetricType.CUSTOMER,
  [AnalyticsMetric.CHURN_RATE]: AnalyticsMetricType.CUSTOMER,
  [AnalyticsMetric.AVG_RESPONSE_TIME]: AnalyticsMetricType.TECHNICAL,
  [AnalyticsMetric.ERROR_RATE]: AnalyticsMetricType.TECHNICAL,
  [AnalyticsMetric.UPTIME]: AnalyticsMetricType.TECHNICAL,
  [AnalyticsMetric.DAU]: AnalyticsMetricType.ENGAGEMENT,
  [AnalyticsMetric.MAU]: AnalyticsMetricType.ENGAGEMENT,
  [AnalyticsMetric.WAU]: AnalyticsMetricType.ENGAGEMENT,
  [AnalyticsMetric.STICKINESS]: AnalyticsMetricType.ENGAGEMENT,
  [AnalyticsMetric.ENGAGEMENT_SCORE]: AnalyticsMetricType.ENGAGEMENT,
  [AnalyticsMetric.EMAIL_CTR]: AnalyticsMetricType.MARKETING,
  [AnalyticsMetric.EMAIL_OPEN_RATE]: AnalyticsMetricType.MARKETING,
  [AnalyticsMetric.EMAIL_BOUNCE_RATE]: AnalyticsMetricType.MARKETING,
  [AnalyticsMetric.EMAIL_UNSUBSCRIBE_RATE]: AnalyticsMetricType.MARKETING,
  [AnalyticsMetric.SOCIAL_FOLLOWERS]: AnalyticsMetricType.SOCIAL,
  [AnalyticsMetric.SOCIAL_ENGAGEMENT_RATE]: AnalyticsMetricType.SOCIAL,
  [AnalyticsMetric.SOCIAL_SHARE_RATE]: AnalyticsMetricType.SOCIAL,
  [AnalyticsMetric.APP_DOWNLOADS]: AnalyticsMetricType.MARKETING,
  [AnalyticsMetric.APP_RATING]: AnalyticsMetricType.CUSTOMER,
  [AnalyticsMetric.APP_REVIEWS]: AnalyticsMetricType.CUSTOMER,
  [AnalyticsMetric.ADD_TO_CART_RATE]: AnalyticsMetricType.SALES,
  [AnalyticsMetric.CHECKOUT_ABANDONMENT_RATE]: AnalyticsMetricType.SALES,
  [AnalyticsMetric.PURCHASE_COMPLETION_RATE]: AnalyticsMetricType.SALES,
  [AnalyticsMetric.AVG_CART_VALUE]: AnalyticsMetricType.SALES,
  [AnalyticsMetric.RETURN_RATE]: AnalyticsMetricType.OPERATIONAL,
  [AnalyticsMetric.REFUND_RATE]: AnalyticsMetricType.OPERATIONAL,
  [AnalyticsMetric.DELIVERY_SUCCESS_RATE]: AnalyticsMetricType.OPERATIONAL,
  [AnalyticsMetric.AVG_DELIVERY_TIME]: AnalyticsMetricType.OPERATIONAL,
  [AnalyticsMetric.INVENTORY_TURNOVER]: AnalyticsMetricType.OPERATIONAL,
  [AnalyticsMetric.STOCK_OUT_RATE]: AnalyticsMetricType.OPERATIONAL,
  [AnalyticsMetric.LEAD_CONVERSION_RATE]: AnalyticsMetricType.MARKETING,
  [AnalyticsMetric.SQL]: AnalyticsMetricType.SALES,
  [AnalyticsMetric.MQL]: AnalyticsMetricType.MARKETING,
  [AnalyticsMetric.COST_PER_LEAD]: AnalyticsMetricType.MARKETING,
  [AnalyticsMetric.COST_PER_CONVERSION]: AnalyticsMetricType.MARKETING,
  [AnalyticsMetric.CES]: AnalyticsMetricType.CUSTOMER,
  [AnalyticsMetric.RESOLUTION_RATE]: AnalyticsMetricType.OPERATIONAL,
  [AnalyticsMetric.AVG_RESOLUTION_TIME]: AnalyticsMetricType.OPERATIONAL,
};

/**
 * Metric format type
 */
export enum AnalyticsMetricFormat {
  /** Currency format */
  CURRENCY = 'CURRENCY',
  /** Percentage format */
  PERCENTAGE = 'PERCENTAGE',
  /** Number format */
  NUMBER = 'NUMBER',
  /** Time format (seconds) */
  TIME = 'TIME',
  /** Score format (0-100) */
  SCORE = 'SCORE',
  /** Ratio format */
  RATIO = 'RATIO',
}

/**
 * Metric configuration with labels, descriptions, and formats
 */
export interface AnalyticsMetricConfig {
  label: string;
  description: string;
  format: AnalyticsMetricFormat;
  icon?: string;
  color?: string;
  isReversed?: boolean; // Higher is better (false) or lower is better (true)
  priority: number;
}

export const ANALYTICS_METRIC_CONFIG: Record<AnalyticsMetric, AnalyticsMetricConfig> = {
  [AnalyticsMetric.REVENUE]: {
    label: 'Revenue',
    description: 'Total revenue generated from all sources',
    format: AnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
  },
  [AnalyticsMetric.ORDERS]: {
    label: 'Orders',
    description: 'Total number of orders placed',
    format: AnalyticsMetricFormat.NUMBER,
    icon: 'ShoppingBag',
    color: '#3B82F6',
    isReversed: false,
    priority: 1,
  },
  [AnalyticsMetric.UNITS_SOLD]: {
    label: 'Units Sold',
    description: 'Total number of units sold',
    format: AnalyticsMetricFormat.NUMBER,
    icon: 'Package',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [AnalyticsMetric.AOV]: {
    label: 'Average Order Value',
    description: 'Average value of each order',
    format: AnalyticsMetricFormat.CURRENCY,
    icon: 'ShoppingCart',
    color: '#F59E0B',
    isReversed: false,
    priority: 1,
  },
  [AnalyticsMetric.CONVERSION_RATE]: {
    label: 'Conversion Rate',
    description: 'Percentage of visitors who complete a desired action',
    format: AnalyticsMetricFormat.PERCENTAGE,
    icon: 'TrendingUp',
    color: '#10B981',
    isReversed: false,
    priority: 1,
  },
  [AnalyticsMetric.BOUNCE_RATE]: {
    label: 'Bounce Rate',
    description: 'Percentage of visitors who leave without interaction',
    format: AnalyticsMetricFormat.PERCENTAGE,
    icon: 'TrendingDown',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
  },
  [AnalyticsMetric.SESSION_DURATION]: {
    label: 'Session Duration',
    description: 'Average time users spend per session',
    format: AnalyticsMetricFormat.TIME,
    icon: 'Clock',
    color: '#6366F1',
    isReversed: false,
    priority: 2,
  },
  [AnalyticsMetric.PAGE_VIEWS]: {
    label: 'Page Views',
    description: 'Total number of page views',
    format: AnalyticsMetricFormat.NUMBER,
    icon: 'Eye',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [AnalyticsMetric.CTR]: {
    label: 'Click Through Rate',
    description: 'Percentage of impressions that resulted in clicks',
    format: AnalyticsMetricFormat.PERCENTAGE,
    icon: 'MousePointerClick',
    color: '#8B5CF6',
    isReversed: false,
    priority: 1,
  },
  [AnalyticsMetric.ROI]: {
    label: 'Return on Investment',
    description: 'Return on investment percentage',
    format: AnalyticsMetricFormat.PERCENTAGE,
    icon: 'TrendingUp',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
  },
  [AnalyticsMetric.CAC]: {
    label: 'Customer Acquisition Cost',
    description: 'Cost to acquire a new customer',
    format: AnalyticsMetricFormat.CURRENCY,
    icon: 'UserPlus',
    color: '#F97316',
    isReversed: true,
    priority: 1,
  },
  [AnalyticsMetric.LTV]: {
    label: 'Customer Lifetime Value',
    description: 'Total value a customer brings over their lifetime',
    format: AnalyticsMetricFormat.CURRENCY,
    icon: 'Users',
    color: '#10B981',
    isReversed: false,
    priority: 1,
  },
  [AnalyticsMetric.NPS]: {
    label: 'Net Promoter Score',
    description: 'Customer loyalty and satisfaction score (-100 to 100)',
    format: AnalyticsMetricFormat.SCORE,
    icon: 'Smile',
    color: '#F59E0B',
    isReversed: false,
    priority: 1,
  },
  [AnalyticsMetric.CSAT]: {
    label: 'Customer Satisfaction',
    description: 'Customer satisfaction score (0-100)',
    format: AnalyticsMetricFormat.SCORE,
    icon: 'MessageSquare',
    color: '#3B82F6',
    isReversed: false,
    priority: 1,
  },
  [AnalyticsMetric.GROSS_PROFIT]: {
    label: 'Gross Profit',
    description: 'Total revenue minus cost of goods sold',
    format: AnalyticsMetricFormat.CURRENCY,
    icon: 'TrendingUp',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
  },
  [AnalyticsMetric.NET_PROFIT]: {
    label: 'Net Profit',
    description: 'Total revenue minus all expenses',
    format: AnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#10B981',
    isReversed: false,
    priority: 1,
  },
  [AnalyticsMetric.OPERATING_MARGIN]: {
    label: 'Operating Margin',
    description: 'Operating income divided by revenue',
    format: AnalyticsMetricFormat.PERCENTAGE,
    icon: 'PieChart',
    color: '#6366F1',
    isReversed: false,
    priority: 2,
  },
  [AnalyticsMetric.RETENTION_RATE]: {
    label: 'Retention Rate',
    description: 'Percentage of customers retained over time',
    format: AnalyticsMetricFormat.PERCENTAGE,
    icon: 'UserCheck',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
  },
  [AnalyticsMetric.CHURN_RATE]: {
    label: 'Churn Rate',
    description: 'Percentage of customers who stop using the service',
    format: AnalyticsMetricFormat.PERCENTAGE,
    icon: 'UserX',
    color: '#EF4444',
    isReversed: true,
    priority: 1,
  },
  [AnalyticsMetric.AVG_RESPONSE_TIME]: {
    label: 'Avg Response Time',
    description: 'Average server response time in seconds',
    format: AnalyticsMetricFormat.TIME,
    icon: 'Gauge',
    color: '#F59E0B',
    isReversed: true,
    priority: 2,
  },
  [AnalyticsMetric.ERROR_RATE]: {
    label: 'Error Rate',
    description: 'Percentage of requests that resulted in errors',
    format: AnalyticsMetricFormat.PERCENTAGE,
    icon: 'AlertCircle',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
  },
  [AnalyticsMetric.UPTIME]: {
    label: 'Uptime',
    description: 'Percentage of time the service is available',
    format: AnalyticsMetricFormat.PERCENTAGE,
    icon: 'CheckCircle',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
  },
  [AnalyticsMetric.DAU]: {
    label: 'Daily Active Users',
    description: 'Number of unique active users per day',
    format: AnalyticsMetricFormat.NUMBER,
    icon: 'Users',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [AnalyticsMetric.MAU]: {
    label: 'Monthly Active Users',
    description: 'Number of unique active users per month',
    format: AnalyticsMetricFormat.NUMBER,
    icon: 'Users',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [AnalyticsMetric.WAU]: {
    label: 'Weekly Active Users',
    description: 'Number of unique active users per week',
    format: AnalyticsMetricFormat.NUMBER,
    icon: 'Users',
    color: '#6366F1',
    isReversed: false,
    priority: 2,
  },
  [AnalyticsMetric.STICKINESS]: {
    label: 'Stickiness',
    description: 'DAU/MAU ratio indicating user engagement',
    format: AnalyticsMetricFormat.RATIO,
    icon: 'Activity',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [AnalyticsMetric.ENGAGEMENT_SCORE]: {
    label: 'Engagement Score',
    description: 'Overall user engagement score (0-100)',
    format: AnalyticsMetricFormat.SCORE,
    icon: 'BarChart',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [AnalyticsMetric.EMAIL_CTR]: {
    label: 'Email CTR',
    description: 'Email click-through rate',
    format: AnalyticsMetricFormat.PERCENTAGE,
    icon: 'Mail',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [AnalyticsMetric.EMAIL_OPEN_RATE]: {
    label: 'Email Open Rate',
    description: 'Percentage of emails opened',
    format: AnalyticsMetricFormat.PERCENTAGE,
    icon: 'MailOpen',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [AnalyticsMetric.EMAIL_BOUNCE_RATE]: {
    label: 'Email Bounce Rate',
    description: 'Percentage of emails that bounced',
    format: AnalyticsMetricFormat.PERCENTAGE,
    icon: 'MailX',
    color: '#EF4444',
    isReversed: true,
    priority: 3,
  },
  [AnalyticsMetric.EMAIL_UNSUBSCRIBE_RATE]: {
    label: 'Email Unsubscribe Rate',
    description: 'Percentage of users who unsubscribed',
    format: AnalyticsMetricFormat.PERCENTAGE,
    icon: 'MailMinus',
    color: '#F97316',
    isReversed: true,
    priority: 3,
  },
  [AnalyticsMetric.SOCIAL_FOLLOWERS]: {
    label: 'Social Followers',
    description: 'Total number of social media followers',
    format: AnalyticsMetricFormat.NUMBER,
    icon: 'Users',
    color: '#1DA1F2',
    isReversed: false,
    priority: 2,
  },
  [AnalyticsMetric.SOCIAL_ENGAGEMENT_RATE]: {
    label: 'Social Engagement Rate',
    description: 'Engagement rate on social media posts',
    format: AnalyticsMetricFormat.PERCENTAGE,
    icon: 'Share2',
    color: '#F472B6',
    isReversed: false,
    priority: 2,
  },
  [AnalyticsMetric.SOCIAL_SHARE_RATE]: {
    label: 'Social Share Rate',
    description: 'Rate of social media shares',
    format: AnalyticsMetricFormat.PERCENTAGE,
    icon: 'Share2',
    color: '#8B5CF6',
    isReversed: false,
    priority: 3,
  },
  [AnalyticsMetric.APP_DOWNLOADS]: {
    label: 'App Downloads',
    description: 'Total number of app downloads',
    format: AnalyticsMetricFormat.NUMBER,
    icon: 'Smartphone',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [AnalyticsMetric.APP_RATING]: {
    label: 'App Rating',
    description: 'Average app store rating (1-5)',
    format: AnalyticsMetricFormat.SCORE,
    icon: 'Star',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [AnalyticsMetric.APP_REVIEWS]: {
    label: 'App Reviews',
    description: 'Total number of app reviews',
    format: AnalyticsMetricFormat.NUMBER,
    icon: 'MessageSquare',
    color: '#3B82F6',
    isReversed: false,
    priority: 3,
  },
  [AnalyticsMetric.ADD_TO_CART_RATE]: {
    label: 'Add to Cart Rate',
    description: 'Percentage of visitors who add items to cart',
    format: AnalyticsMetricFormat.PERCENTAGE,
    icon: 'ShoppingCart',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [AnalyticsMetric.CHECKOUT_ABANDONMENT_RATE]: {
    label: 'Checkout Abandonment Rate',
    description: 'Percentage of users who abandon checkout',
    format: AnalyticsMetricFormat.PERCENTAGE,
    icon: 'ShoppingCart',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
  },
  [AnalyticsMetric.PURCHASE_COMPLETION_RATE]: {
    label: 'Purchase Completion Rate',
    description: 'Percentage of users who complete purchase',
    format: AnalyticsMetricFormat.PERCENTAGE,
    icon: 'ShoppingBag',
    color: '#22C55E',
    isReversed: false,
    priority: 2,
  },
  [AnalyticsMetric.AVG_CART_VALUE]: {
    label: 'Average Cart Value',
    description: 'Average value of items in cart',
    format: AnalyticsMetricFormat.CURRENCY,
    icon: 'ShoppingCart',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [AnalyticsMetric.RETURN_RATE]: {
    label: 'Return Rate',
    description: 'Percentage of orders that are returned',
    format: AnalyticsMetricFormat.PERCENTAGE,
    icon: 'Undo',
    color: '#F97316',
    isReversed: true,
    priority: 2,
  },
  [AnalyticsMetric.REFUND_RATE]: {
    label: 'Refund Rate',
    description: 'Percentage of orders that are refunded',
    format: AnalyticsMetricFormat.PERCENTAGE,
    icon: 'Undo',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
  },
  [AnalyticsMetric.DELIVERY_SUCCESS_RATE]: {
    label: 'Delivery Success Rate',
    description: 'Percentage of successful deliveries',
    format: AnalyticsMetricFormat.PERCENTAGE,
    icon: 'Truck',
    color: '#22C55E',
    isReversed: false,
    priority: 2,
  },
  [AnalyticsMetric.AVG_DELIVERY_TIME]: {
    label: 'Avg Delivery Time',
    description: 'Average delivery time in hours',
    format: AnalyticsMetricFormat.TIME,
    icon: 'Clock',
    color: '#F59E0B',
    isReversed: true,
    priority: 2,
  },
  [AnalyticsMetric.INVENTORY_TURNOVER]: {
    label: 'Inventory Turnover',
    description: 'Rate of inventory turnover',
    format: AnalyticsMetricFormat.RATIO,
    icon: 'Package',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [AnalyticsMetric.STOCK_OUT_RATE]: {
    label: 'Stock Out Rate',
    description: 'Percentage of items out of stock',
    format: AnalyticsMetricFormat.PERCENTAGE,
    icon: 'PackageX',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
  },
  [AnalyticsMetric.LEAD_CONVERSION_RATE]: {
    label: 'Lead Conversion Rate',
    description: 'Percentage of leads that convert to customers',
    format: AnalyticsMetricFormat.PERCENTAGE,
    icon: 'Users',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [AnalyticsMetric.SQL]: {
    label: 'Sales Qualified Leads',
    description: 'Number of sales qualified leads',
    format: AnalyticsMetricFormat.NUMBER,
    icon: 'UserCheck',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [AnalyticsMetric.MQL]: {
    label: 'Marketing Qualified Leads',
    description: 'Number of marketing qualified leads',
    format: AnalyticsMetricFormat.NUMBER,
    icon: 'UserPlus',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [AnalyticsMetric.COST_PER_LEAD]: {
    label: 'Cost Per Lead',
    description: 'Cost to acquire a lead',
    format: AnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#F97316',
    isReversed: true,
    priority: 2,
  },
  [AnalyticsMetric.COST_PER_CONVERSION]: {
    label: 'Cost Per Conversion',
    description: 'Cost to convert a lead to customer',
    format: AnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
  },
  [AnalyticsMetric.CES]: {
    label: 'Customer Effort Score',
    description: 'Customer effort score (0-100)',
    format: AnalyticsMetricFormat.SCORE,
    icon: 'Gauge',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [AnalyticsMetric.RESOLUTION_RATE]: {
    label: 'Resolution Rate',
    description: 'Customer issue resolution rate',
    format: AnalyticsMetricFormat.PERCENTAGE,
    icon: 'CheckCircle',
    color: '#22C55E',
    isReversed: false,
    priority: 2,
  },
  [AnalyticsMetric.AVG_RESOLUTION_TIME]: {
    label: 'Avg Resolution Time',
    description: 'Average time to resolve customer issues',
    format: AnalyticsMetricFormat.TIME,
    icon: 'Clock',
    color: '#F59E0B',
    isReversed: true,
    priority: 2,
  },
};

/**
 * Get metric category
 */
export function getMetricCategory(metric: AnalyticsMetric): AnalyticsMetricType {
  return ANALYTICS_METRIC_CATEGORY_MAP[metric];
}

/**
 * Get metric label
 */
export function getMetricLabel(metric: AnalyticsMetric): string {
  return ANALYTICS_METRIC_CONFIG[metric]?.label || metric;
}

/**
 * Get metric description
 */
export function getMetricDescription(metric: AnalyticsMetric): string {
  return ANALYTICS_METRIC_CONFIG[metric]?.description || '';
}

/**
 * Get metric format
 */
export function getMetricFormat(metric: AnalyticsMetric): AnalyticsMetricFormat {
  return ANALYTICS_METRIC_CONFIG[metric]?.format || AnalyticsMetricFormat.NUMBER;
}

/**
 * Check if metric is reversed (lower is better)
 */
export function isMetricReversed(metric: AnalyticsMetric): boolean {
  return ANALYTICS_METRIC_CONFIG[metric]?.isReversed || false;
}

/**
 * Get metrics by category
 */
export function getMetricsByCategory(category: AnalyticsMetricType): AnalyticsMetric[] {
  return Object.entries(ANALYTICS_METRIC_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([metric]) => metric as AnalyticsMetric);
}

/**
 * Format metric value based on format type
 */
export function formatMetricValue(metric: AnalyticsMetric, value: number): string {
  const format = getMetricFormat(metric);

  switch (format) {
    case AnalyticsMetricFormat.CURRENCY:
      return `$${value.toFixed(2)}`;
    case AnalyticsMetricFormat.PERCENTAGE:
      return `${(value * 100).toFixed(2)}%`;
    case AnalyticsMetricFormat.TIME:
      if (value >= 3600) {
        const hours = Math.floor(value / 3600);
        const minutes = Math.floor((value % 3600) / 60);
        return `${hours}h ${minutes}m`;
      }
      if (value >= 60) {
        const minutes = Math.floor(value / 60);
        const seconds = Math.floor(value % 60);
        return `${minutes}m ${seconds}s`;
      }
      return `${Math.floor(value)}s`;
    case AnalyticsMetricFormat.SCORE:
      return value.toFixed(1);
    case AnalyticsMetricFormat.RATIO:
      return value.toFixed(2);
    default:
      return value.toLocaleString();
  }
}

/**
 * Get metric priority
 */
export function getMetricPriority(metric: AnalyticsMetric): number {
  return ANALYTICS_METRIC_CONFIG[metric]?.priority || 3;
}

/**
 * Get high priority metrics
 */
export function getHighPriorityMetrics(): AnalyticsMetric[] {
  return Object.values(AnalyticsMetric).filter((metric) => getMetricPriority(metric) === 1);
}

/**
 * Metric threshold for alerts
 */
export interface MetricThreshold {
  warning: number;
  critical: number;
  direction: 'above' | 'below';
}

/**
 * Get metric threshold
 */
export function getMetricThreshold(metric: AnalyticsMetric): MetricThreshold {
  const isReversed = isMetricReversed(metric);

  // Default thresholds based on metric type
  if (isReversed) {
    return {
      warning: 0.1, // 10%
      critical: 0.2, // 20%
      direction: 'above',
    };
  }

  // Custom thresholds for specific metrics
  switch (metric) {
    case AnalyticsMetric.REVENUE:
      return {
        warning: 1000,
        critical: 100,
        direction: 'below',
      };
    case AnalyticsMetric.UPTIME:
      return {
        warning: 0.99,
        critical: 0.95,
        direction: 'below',
      };
    case AnalyticsMetric.NPS:
      return {
        warning: 30,
        critical: 0,
        direction: 'below',
      };
    case AnalyticsMetric.CSAT:
      return {
        warning: 70,
        critical: 50,
        direction: 'below',
      };
    case AnalyticsMetric.CONVERSION_RATE:
      return {
        warning: 0.02,
        critical: 0.01,
        direction: 'below',
      };
    default:
      return {
        warning: 0.1,
        critical: 0.2,
        direction: 'below',
      };
  }
}
