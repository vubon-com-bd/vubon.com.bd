/**
 * @fileoverview Marketing analytics metrics and measurements definitions
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Marketing analytics metrics
 */
export enum MarketingAnalyticsMetric {
  /** Campaign reach */
  CAMPAIGN_REACH = 'CAMPAIGN_REACH',
  /** Campaign impressions */
  CAMPAIGN_IMPRESSIONS = 'CAMPAIGN_IMPRESSIONS',
  /** Campaign clicks */
  CAMPAIGN_CLICKS = 'CAMPAIGN_CLICKS',
  /** Campaign click-through rate */
  CAMPAIGN_CTR = 'CAMPAIGN_CTR',
  /** Campaign conversion rate */
  CAMPAIGN_CONVERSION_RATE = 'CAMPAIGN_CONVERSION_RATE',
  /** Campaign cost per acquisition */
  CAMPAIGN_CPA = 'CAMPAIGN_CPA',
  /** Campaign return on investment */
  CAMPAIGN_ROI = 'CAMPAIGN_ROI',
  /** Campaign engagement rate */
  CAMPAIGN_ENGAGEMENT = 'CAMPAIGN_ENGAGEMENT',
  /** Campaign share of voice */
  CAMPAIGN_SHARE_OF_VOICE = 'CAMPAIGN_SHARE_OF_VOICE',
  /** Social media followers */
  SOCIAL_MEDIA_FOLLOWERS = 'SOCIAL_MEDIA_FOLLOWERS',
  /** Social media engagement rate */
  SOCIAL_MEDIA_ENGAGEMENT_RATE = 'SOCIAL_MEDIA_ENGAGEMENT_RATE',
  /** Email open rate */
  EMAIL_OPEN_RATE = 'EMAIL_OPEN_RATE',
  /** Email click rate */
  EMAIL_CLICK_RATE = 'EMAIL_CLICK_RATE',
  /** Email bounce rate */
  EMAIL_BOUNCE_RATE = 'EMAIL_BOUNCE_RATE',
  /** Email unsubscribe rate */
  EMAIL_UNSUBSCRIBE_RATE = 'EMAIL_UNSUBSCRIBE_RATE',
  /** Lead generation rate */
  LEAD_GENERATION_RATE = 'LEAD_GENERATION_RATE',
  /** Lead conversion rate */
  LEAD_CONVERSION_RATE = 'LEAD_CONVERSION_RATE',
  /** Customer acquisition cost */
  CUSTOMER_ACQUISITION_COST = 'CUSTOMER_ACQUISITION_COST',
  /** Customer lifetime value */
  CUSTOMER_LIFETIME_VALUE = 'CUSTOMER_LIFETIME_VALUE',
  /** Marketing qualified leads */
  MARKETING_QUALIFIED_LEADS = 'MARKETING_QUALIFIED_LEADS',
  /** Sales qualified leads */
  SALES_QUALIFIED_LEADS = 'SALES_QUALIFIED_LEADS',
  /** Brand search volume */
  BRAND_SEARCH_VOLUME = 'BRAND_SEARCH_VOLUME',
  /** Brand sentiment score */
  BRAND_SENTIMENT_SCORE = 'BRAND_SENTIMENT_SCORE',
  /** Marketing attribution */
  MARKETING_ATTRIBUTION = 'MARKETING_ATTRIBUTION',
  /** Marketing budget utilization */
  MARKETING_BUDGET_UTILIZATION = 'MARKETING_BUDGET_UTILIZATION',
  /** Marketing channel performance */
  MARKETING_CHANNEL_PERFORMANCE = 'MARKETING_CHANNEL_PERFORMANCE',
  /** Cost per mille (CPM) */
  CPM = 'CPM',
  /** Cost per click (CPC) */
  CPC = 'CPC',
  /** Return on ad spend */
  ROAS = 'ROAS',
  /** Click-to-lead rate */
  CLICK_TO_LEAD_RATE = 'CLICK_TO_LEAD_RATE',
  /** Lead-to-customer rate */
  LEAD_TO_CUSTOMER_RATE = 'LEAD_TO_CUSTOMER_RATE',
  /** Marketing efficiency ratio */
  MARKETING_EFFICIENCY_RATIO = 'MARKETING_EFFICIENCY_RATIO',
  /** Customer engagement score */
  CUSTOMER_ENGAGEMENT_SCORE = 'CUSTOMER_ENGAGEMENT_SCORE',
}

/**
 * Marketing metric type classification
 */
export enum MarketingAnalyticsMetricType {
  /** Reach metrics */
  REACH = 'REACH',
  /** Engagement metrics */
  ENGAGEMENT = 'ENGAGEMENT',
  /** Conversion metrics */
  CONVERSION = 'CONVERSION',
  /** Financial metrics */
  FINANCIAL = 'FINANCIAL',
  /** Brand metrics */
  BRAND = 'BRAND',
  /** Lead metrics */
  LEAD = 'LEAD',
  /** Performance metrics */
  PERFORMANCE = 'PERFORMANCE',
}

/**
 * Marketing metric category mapping
 */
export const MARKETING_ANALYTICS_METRIC_CATEGORY_MAP: Record<
  MarketingAnalyticsMetric,
  MarketingAnalyticsMetricType
> = {
  [MarketingAnalyticsMetric.CAMPAIGN_REACH]: MarketingAnalyticsMetricType.REACH,
  [MarketingAnalyticsMetric.CAMPAIGN_IMPRESSIONS]: MarketingAnalyticsMetricType.REACH,
  [MarketingAnalyticsMetric.CAMPAIGN_CLICKS]: MarketingAnalyticsMetricType.ENGAGEMENT,
  [MarketingAnalyticsMetric.CAMPAIGN_CTR]: MarketingAnalyticsMetricType.ENGAGEMENT,
  [MarketingAnalyticsMetric.CAMPAIGN_CONVERSION_RATE]: MarketingAnalyticsMetricType.CONVERSION,
  [MarketingAnalyticsMetric.CAMPAIGN_CPA]: MarketingAnalyticsMetricType.FINANCIAL,
  [MarketingAnalyticsMetric.CAMPAIGN_ROI]: MarketingAnalyticsMetricType.FINANCIAL,
  [MarketingAnalyticsMetric.CAMPAIGN_ENGAGEMENT]: MarketingAnalyticsMetricType.ENGAGEMENT,
  [MarketingAnalyticsMetric.CAMPAIGN_SHARE_OF_VOICE]: MarketingAnalyticsMetricType.BRAND,
  [MarketingAnalyticsMetric.SOCIAL_MEDIA_FOLLOWERS]: MarketingAnalyticsMetricType.REACH,
  [MarketingAnalyticsMetric.SOCIAL_MEDIA_ENGAGEMENT_RATE]: MarketingAnalyticsMetricType.ENGAGEMENT,
  [MarketingAnalyticsMetric.EMAIL_OPEN_RATE]: MarketingAnalyticsMetricType.ENGAGEMENT,
  [MarketingAnalyticsMetric.EMAIL_CLICK_RATE]: MarketingAnalyticsMetricType.ENGAGEMENT,
  [MarketingAnalyticsMetric.EMAIL_BOUNCE_RATE]: MarketingAnalyticsMetricType.ENGAGEMENT,
  [MarketingAnalyticsMetric.EMAIL_UNSUBSCRIBE_RATE]: MarketingAnalyticsMetricType.ENGAGEMENT,
  [MarketingAnalyticsMetric.LEAD_GENERATION_RATE]: MarketingAnalyticsMetricType.LEAD,
  [MarketingAnalyticsMetric.LEAD_CONVERSION_RATE]: MarketingAnalyticsMetricType.CONVERSION,
  [MarketingAnalyticsMetric.CUSTOMER_ACQUISITION_COST]: MarketingAnalyticsMetricType.FINANCIAL,
  [MarketingAnalyticsMetric.CUSTOMER_LIFETIME_VALUE]: MarketingAnalyticsMetricType.FINANCIAL,
  [MarketingAnalyticsMetric.MARKETING_QUALIFIED_LEADS]: MarketingAnalyticsMetricType.LEAD,
  [MarketingAnalyticsMetric.SALES_QUALIFIED_LEADS]: MarketingAnalyticsMetricType.LEAD,
  [MarketingAnalyticsMetric.BRAND_SEARCH_VOLUME]: MarketingAnalyticsMetricType.BRAND,
  [MarketingAnalyticsMetric.BRAND_SENTIMENT_SCORE]: MarketingAnalyticsMetricType.BRAND,
  [MarketingAnalyticsMetric.MARKETING_ATTRIBUTION]: MarketingAnalyticsMetricType.PERFORMANCE,
  [MarketingAnalyticsMetric.MARKETING_BUDGET_UTILIZATION]: MarketingAnalyticsMetricType.FINANCIAL,
  [MarketingAnalyticsMetric.MARKETING_CHANNEL_PERFORMANCE]:
    MarketingAnalyticsMetricType.PERFORMANCE,
  [MarketingAnalyticsMetric.CPM]: MarketingAnalyticsMetricType.FINANCIAL,
  [MarketingAnalyticsMetric.CPC]: MarketingAnalyticsMetricType.FINANCIAL,
  [MarketingAnalyticsMetric.ROAS]: MarketingAnalyticsMetricType.FINANCIAL,
  [MarketingAnalyticsMetric.CLICK_TO_LEAD_RATE]: MarketingAnalyticsMetricType.CONVERSION,
  [MarketingAnalyticsMetric.LEAD_TO_CUSTOMER_RATE]: MarketingAnalyticsMetricType.CONVERSION,
  [MarketingAnalyticsMetric.MARKETING_EFFICIENCY_RATIO]: MarketingAnalyticsMetricType.PERFORMANCE,
  [MarketingAnalyticsMetric.CUSTOMER_ENGAGEMENT_SCORE]: MarketingAnalyticsMetricType.ENGAGEMENT,
};

/**
 * Marketing metric format type
 */
export enum MarketingAnalyticsMetricFormat {
  /** Currency format */
  CURRENCY = 'CURRENCY',
  /** Percentage format */
  PERCENTAGE = 'PERCENTAGE',
  /** Number format */
  NUMBER = 'NUMBER',
  /** Score format (0-100) */
  SCORE = 'SCORE',
  /** Ratio format */
  RATIO = 'RATIO',
  /** Rate format */
  RATE = 'RATE',
}

/**
 * Marketing metric configuration
 */
export interface MarketingAnalyticsMetricConfig {
  label: string;
  description: string;
  format: MarketingAnalyticsMetricFormat;
  icon?: string;
  color?: string;
  isReversed: boolean;
  priority: number;
  threshold?: {
    good: number;
    average: number;
    poor: number;
  };
}

export const MARKETING_ANALYTICS_METRIC_CONFIG: Record<
  MarketingAnalyticsMetric,
  MarketingAnalyticsMetricConfig
> = {
  [MarketingAnalyticsMetric.CAMPAIGN_REACH]: {
    label: 'Campaign Reach',
    description: 'Number of unique users reached by campaign',
    format: MarketingAnalyticsMetricFormat.NUMBER,
    icon: 'Users',
    color: '#3B82F6',
    isReversed: false,
    priority: 1,
  },
  [MarketingAnalyticsMetric.CAMPAIGN_IMPRESSIONS]: {
    label: 'Campaign Impressions',
    description: 'Total number of impressions',
    format: MarketingAnalyticsMetricFormat.NUMBER,
    icon: 'Eye',
    color: '#6366F1',
    isReversed: false,
    priority: 1,
  },
  [MarketingAnalyticsMetric.CAMPAIGN_CLICKS]: {
    label: 'Campaign Clicks',
    description: 'Total number of clicks',
    format: MarketingAnalyticsMetricFormat.NUMBER,
    icon: 'MousePointer',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [MarketingAnalyticsMetric.CAMPAIGN_CTR]: {
    label: 'Click-Through Rate',
    description: 'Percentage of impressions that resulted in clicks',
    format: MarketingAnalyticsMetricFormat.PERCENTAGE,
    icon: 'MousePointerClick',
    color: '#10B981',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 0.03,
      average: 0.02,
      poor: 0.01,
    },
  },
  [MarketingAnalyticsMetric.CAMPAIGN_CONVERSION_RATE]: {
    label: 'Conversion Rate',
    description: 'Percentage of clicks that resulted in conversions',
    format: MarketingAnalyticsMetricFormat.PERCENTAGE,
    icon: 'TrendingUp',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 0.05,
      average: 0.03,
      poor: 0.01,
    },
  },
  [MarketingAnalyticsMetric.CAMPAIGN_CPA]: {
    label: 'Cost Per Acquisition',
    description: 'Average cost to acquire a customer',
    format: MarketingAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#EF4444',
    isReversed: true,
    priority: 1,
  },
  [MarketingAnalyticsMetric.CAMPAIGN_ROI]: {
    label: 'Campaign ROI',
    description: 'Return on investment for campaign',
    format: MarketingAnalyticsMetricFormat.PERCENTAGE,
    icon: 'TrendingUp',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 30,
      average: 20,
      poor: 10,
    },
  },
  [MarketingAnalyticsMetric.CAMPAIGN_ENGAGEMENT]: {
    label: 'Campaign Engagement',
    description: 'Overall engagement rate for campaign',
    format: MarketingAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Activity',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [MarketingAnalyticsMetric.CAMPAIGN_SHARE_OF_VOICE]: {
    label: 'Share of Voice',
    description: 'Brand share of voice in market',
    format: MarketingAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Volume2',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [MarketingAnalyticsMetric.SOCIAL_MEDIA_FOLLOWERS]: {
    label: 'Social Media Followers',
    description: 'Total social media followers',
    format: MarketingAnalyticsMetricFormat.NUMBER,
    icon: 'Users',
    color: '#1DA1F2',
    isReversed: false,
    priority: 2,
  },
  [MarketingAnalyticsMetric.SOCIAL_MEDIA_ENGAGEMENT_RATE]: {
    label: 'Social Media Engagement Rate',
    description: 'Engagement rate on social media posts',
    format: MarketingAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Share2',
    color: '#F472B6',
    isReversed: false,
    priority: 2,
  },
  [MarketingAnalyticsMetric.EMAIL_OPEN_RATE]: {
    label: 'Email Open Rate',
    description: 'Percentage of emails opened',
    format: MarketingAnalyticsMetricFormat.PERCENTAGE,
    icon: 'MailOpen',
    color: '#EA580C',
    isReversed: false,
    priority: 2,
    threshold: {
      good: 0.25,
      average: 0.2,
      poor: 0.15,
    },
  },
  [MarketingAnalyticsMetric.EMAIL_CLICK_RATE]: {
    label: 'Email Click Rate',
    description: 'Percentage of emails clicked',
    format: MarketingAnalyticsMetricFormat.PERCENTAGE,
    icon: 'MousePointer',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
    threshold: {
      good: 0.05,
      average: 0.03,
      poor: 0.01,
    },
  },
  [MarketingAnalyticsMetric.EMAIL_BOUNCE_RATE]: {
    label: 'Email Bounce Rate',
    description: 'Percentage of emails that bounced',
    format: MarketingAnalyticsMetricFormat.PERCENTAGE,
    icon: 'MailX',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
    threshold: {
      good: 0.02,
      average: 0.05,
      poor: 0.1,
    },
  },
  [MarketingAnalyticsMetric.EMAIL_UNSUBSCRIBE_RATE]: {
    label: 'Email Unsubscribe Rate',
    description: 'Percentage of email unsubscribes',
    format: MarketingAnalyticsMetricFormat.PERCENTAGE,
    icon: 'MailMinus',
    color: '#F97316',
    isReversed: true,
    priority: 2,
  },
  [MarketingAnalyticsMetric.LEAD_GENERATION_RATE]: {
    label: 'Lead Generation Rate',
    description: 'Rate of lead generation',
    format: MarketingAnalyticsMetricFormat.PERCENTAGE,
    icon: 'UserPlus',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [MarketingAnalyticsMetric.LEAD_CONVERSION_RATE]: {
    label: 'Lead Conversion Rate',
    description: 'Percentage of leads converted to customers',
    format: MarketingAnalyticsMetricFormat.PERCENTAGE,
    icon: 'UserCheck',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 0.2,
      average: 0.15,
      poor: 0.1,
    },
  },
  [MarketingAnalyticsMetric.CUSTOMER_ACQUISITION_COST]: {
    label: 'Customer Acquisition Cost',
    description: 'Cost to acquire a new customer',
    format: MarketingAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#EF4444',
    isReversed: true,
    priority: 1,
  },
  [MarketingAnalyticsMetric.CUSTOMER_LIFETIME_VALUE]: {
    label: 'Customer Lifetime Value',
    description: 'Total value of a customer over lifetime',
    format: MarketingAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
  },
  [MarketingAnalyticsMetric.MARKETING_QUALIFIED_LEADS]: {
    label: 'Marketing Qualified Leads',
    description: 'Number of marketing qualified leads',
    format: MarketingAnalyticsMetricFormat.NUMBER,
    icon: 'UserPlus',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [MarketingAnalyticsMetric.SALES_QUALIFIED_LEADS]: {
    label: 'Sales Qualified Leads',
    description: 'Number of sales qualified leads',
    format: MarketingAnalyticsMetricFormat.NUMBER,
    icon: 'UserCheck',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [MarketingAnalyticsMetric.BRAND_SEARCH_VOLUME]: {
    label: 'Brand Search Volume',
    description: 'Search volume for brand keywords',
    format: MarketingAnalyticsMetricFormat.NUMBER,
    icon: 'Search',
    color: '#4285F4',
    isReversed: false,
    priority: 2,
  },
  [MarketingAnalyticsMetric.BRAND_SENTIMENT_SCORE]: {
    label: 'Brand Sentiment Score',
    description: 'Overall brand sentiment score',
    format: MarketingAnalyticsMetricFormat.SCORE,
    icon: 'Smile',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [MarketingAnalyticsMetric.MARKETING_ATTRIBUTION]: {
    label: 'Marketing Attribution',
    description: 'Attribution score for marketing channels',
    format: MarketingAnalyticsMetricFormat.PERCENTAGE,
    icon: 'PieChart',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [MarketingAnalyticsMetric.MARKETING_BUDGET_UTILIZATION]: {
    label: 'Budget Utilization',
    description: 'Percentage of marketing budget used',
    format: MarketingAnalyticsMetricFormat.PERCENTAGE,
    icon: 'DollarSign',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [MarketingAnalyticsMetric.MARKETING_CHANNEL_PERFORMANCE]: {
    label: 'Channel Performance',
    description: 'Overall channel performance score',
    format: MarketingAnalyticsMetricFormat.SCORE,
    icon: 'Layers',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [MarketingAnalyticsMetric.CPM]: {
    label: 'Cost Per Mille',
    description: 'Cost per thousand impressions',
    format: MarketingAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#F59E0B',
    isReversed: true,
    priority: 2,
  },
  [MarketingAnalyticsMetric.CPC]: {
    label: 'Cost Per Click',
    description: 'Average cost per click',
    format: MarketingAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#F97316',
    isReversed: true,
    priority: 2,
  },
  [MarketingAnalyticsMetric.ROAS]: {
    label: 'Return on Ad Spend',
    description: 'Return on advertising spend',
    format: MarketingAnalyticsMetricFormat.RATIO,
    icon: 'TrendingUp',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 5,
      average: 3,
      poor: 1,
    },
  },
  [MarketingAnalyticsMetric.CLICK_TO_LEAD_RATE]: {
    label: 'Click to Lead Rate',
    description: 'Percentage of clicks that become leads',
    format: MarketingAnalyticsMetricFormat.PERCENTAGE,
    icon: 'UserPlus',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [MarketingAnalyticsMetric.LEAD_TO_CUSTOMER_RATE]: {
    label: 'Lead to Customer Rate',
    description: 'Percentage of leads that become customers',
    format: MarketingAnalyticsMetricFormat.PERCENTAGE,
    icon: 'UserCheck',
    color: '#22C55E',
    isReversed: false,
    priority: 2,
  },
  [MarketingAnalyticsMetric.MARKETING_EFFICIENCY_RATIO]: {
    label: 'Marketing Efficiency Ratio',
    description: 'Revenue generated per marketing dollar',
    format: MarketingAnalyticsMetricFormat.RATIO,
    icon: 'DollarSign',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [MarketingAnalyticsMetric.CUSTOMER_ENGAGEMENT_SCORE]: {
    label: 'Customer Engagement Score',
    description: 'Overall customer engagement score',
    format: MarketingAnalyticsMetricFormat.SCORE,
    icon: 'Activity',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
};

/**
 * Get marketing metric category
 */
export function getMarketingMetricCategory(
  metric: MarketingAnalyticsMetric
): MarketingAnalyticsMetricType {
  return MARKETING_ANALYTICS_METRIC_CATEGORY_MAP[metric];
}

/**
 * Get marketing metric label
 */
export function getMarketingMetricLabel(metric: MarketingAnalyticsMetric): string {
  return MARKETING_ANALYTICS_METRIC_CONFIG[metric]?.label || metric;
}

/**
 * Get marketing metric description
 */
export function getMarketingMetricDescription(metric: MarketingAnalyticsMetric): string {
  return MARKETING_ANALYTICS_METRIC_CONFIG[metric]?.description || '';
}

/**
 * Get marketing metric format
 */
export function getMarketingMetricFormat(
  metric: MarketingAnalyticsMetric
): MarketingAnalyticsMetricFormat {
  return MARKETING_ANALYTICS_METRIC_CONFIG[metric]?.format || MarketingAnalyticsMetricFormat.NUMBER;
}

/**
 * Check if marketing metric is reversed (lower is better)
 */
export function isMarketingMetricReversed(metric: MarketingAnalyticsMetric): boolean {
  return MARKETING_ANALYTICS_METRIC_CONFIG[metric]?.isReversed || false;
}

/**
 * Get marketing metrics by category
 */
export function getMarketingMetricsByCategory(
  category: MarketingAnalyticsMetricType
): MarketingAnalyticsMetric[] {
  return Object.entries(MARKETING_ANALYTICS_METRIC_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([metric]) => metric as MarketingAnalyticsMetric);
}

/**
 * Format marketing metric value
 */
export function formatMarketingMetricValue(
  metric: MarketingAnalyticsMetric,
  value: number
): string {
  const format = getMarketingMetricFormat(metric);

  switch (format) {
    case MarketingAnalyticsMetricFormat.CURRENCY:
      return `$${value.toFixed(2)}`;
    case MarketingAnalyticsMetricFormat.PERCENTAGE:
      return `${(value * 100).toFixed(2)}%`;
    case MarketingAnalyticsMetricFormat.SCORE:
      return value.toFixed(1);
    case MarketingAnalyticsMetricFormat.RATIO:
      return value.toFixed(2);
    default:
      return value.toLocaleString();
  }
}

/**
 * Get marketing metric priority
 */
export function getMarketingMetricPriority(metric: MarketingAnalyticsMetric): number {
  return MARKETING_ANALYTICS_METRIC_CONFIG[metric]?.priority || 3;
}

/**
 * Get high priority marketing metrics
 */
export function getHighPriorityMarketingMetrics(): MarketingAnalyticsMetric[] {
  return Object.values(MarketingAnalyticsMetric).filter(
    (metric) => getMarketingMetricPriority(metric) === 1
  );
}

/**
 * Get marketing metric thresholds
 */
export function getMarketingMetricThreshold(
  metric: MarketingAnalyticsMetric
): { good: number; average: number; poor: number } | undefined {
  return MARKETING_ANALYTICS_METRIC_CONFIG[metric]?.threshold;
}

/**
 * Evaluate marketing metric performance
 */
export function evaluateMarketingMetricPerformance(
  metric: MarketingAnalyticsMetric,
  value: number
): 'good' | 'average' | 'poor' {
  const threshold = getMarketingMetricThreshold(metric);
  if (!threshold) {
    return 'average';
  }

  const isReversed = isMarketingMetricReversed(metric);

  if (isReversed) {
    if (value <= threshold.good) return 'good';
    if (value <= threshold.average) return 'average';
    return 'poor';
  } else {
    if (value >= threshold.good) return 'good';
    if (value >= threshold.average) return 'average';
    return 'poor';
  }
}

/**
 * Marketing dashboard metrics
 */
export const MARKETING_DASHBOARD_METRICS: MarketingAnalyticsMetric[] = [
  MarketingAnalyticsMetric.CAMPAIGN_REACH,
  MarketingAnalyticsMetric.CAMPAIGN_IMPRESSIONS,
  MarketingAnalyticsMetric.CAMPAIGN_CTR,
  MarketingAnalyticsMetric.CAMPAIGN_CONVERSION_RATE,
  MarketingAnalyticsMetric.CAMPAIGN_ROI,
  MarketingAnalyticsMetric.CUSTOMER_ACQUISITION_COST,
  MarketingAnalyticsMetric.CUSTOMER_LIFETIME_VALUE,
  MarketingAnalyticsMetric.ROAS,
];

/**
 * Marketing campaign metrics
 */
export const MARKETING_CAMPAIGN_METRICS: MarketingAnalyticsMetric[] = [
  MarketingAnalyticsMetric.CAMPAIGN_REACH,
  MarketingAnalyticsMetric.CAMPAIGN_IMPRESSIONS,
  MarketingAnalyticsMetric.CAMPAIGN_CLICKS,
  MarketingAnalyticsMetric.CAMPAIGN_CTR,
  MarketingAnalyticsMetric.CAMPAIGN_CONVERSION_RATE,
  MarketingAnalyticsMetric.CAMPAIGN_CPA,
  MarketingAnalyticsMetric.CAMPAIGN_ROI,
  MarketingAnalyticsMetric.CAMPAIGN_ENGAGEMENT,
];

/**
 * Marketing financial metrics
 */
export const MARKETING_FINANCIAL_METRICS: MarketingAnalyticsMetric[] = [
  MarketingAnalyticsMetric.CAMPAIGN_CPA,
  MarketingAnalyticsMetric.CAMPAIGN_ROI,
  MarketingAnalyticsMetric.CUSTOMER_ACQUISITION_COST,
  MarketingAnalyticsMetric.CUSTOMER_LIFETIME_VALUE,
  MarketingAnalyticsMetric.CPM,
  MarketingAnalyticsMetric.CPC,
  MarketingAnalyticsMetric.ROAS,
  MarketingAnalyticsMetric.MARKETING_BUDGET_UTILIZATION,
];

/**
 * Marketing engagement metrics
 */
export const MARKETING_ENGAGEMENT_METRICS: MarketingAnalyticsMetric[] = [
  MarketingAnalyticsMetric.CAMPAIGN_ENGAGEMENT,
  MarketingAnalyticsMetric.SOCIAL_MEDIA_ENGAGEMENT_RATE,
  MarketingAnalyticsMetric.EMAIL_OPEN_RATE,
  MarketingAnalyticsMetric.EMAIL_CLICK_RATE,
  MarketingAnalyticsMetric.CUSTOMER_ENGAGEMENT_SCORE,
  MarketingAnalyticsMetric.EMAIL_BOUNCE_RATE,
  MarketingAnalyticsMetric.EMAIL_UNSUBSCRIBE_RATE,
];

/**
 * Marketing lead metrics
 */
export const MARKETING_LEAD_METRICS: MarketingAnalyticsMetric[] = [
  MarketingAnalyticsMetric.LEAD_GENERATION_RATE,
  MarketingAnalyticsMetric.LEAD_CONVERSION_RATE,
  MarketingAnalyticsMetric.MARKETING_QUALIFIED_LEADS,
  MarketingAnalyticsMetric.SALES_QUALIFIED_LEADS,
  MarketingAnalyticsMetric.CLICK_TO_LEAD_RATE,
  MarketingAnalyticsMetric.LEAD_TO_CUSTOMER_RATE,
];

/**
 * Marketing brand metrics
 */
export const MARKETING_BRAND_METRICS: MarketingAnalyticsMetric[] = [
  MarketingAnalyticsMetric.CAMPAIGN_SHARE_OF_VOICE,
  MarketingAnalyticsMetric.BRAND_SEARCH_VOLUME,
  MarketingAnalyticsMetric.BRAND_SENTIMENT_SCORE,
  MarketingAnalyticsMetric.SOCIAL_MEDIA_FOLLOWERS,
];
