/**
 * Marketing Analytics Metric Constants
 * Metrics for measuring marketing campaign performance
 */

export const MARKETING_ANALYTICS_METRIC = {
  // Campaign Count Metrics
  COUNT_METRICS: {
    TOTAL_CAMPAIGNS: 'total_campaigns',
    ACTIVE_CAMPAIGNS: 'active_campaigns',
    COMPLETED_CAMPAIGNS: 'completed_campaigns',
    CANCELLED_CAMPAIGNS: 'cancelled_campaigns',
    SCHEDULED_CAMPAIGNS: 'scheduled_campaigns',
    DRAFT_CAMPAIGNS: 'draft_campaigns',
    CAMPAIGN_SUCCESS_RATE: 'campaign_success_rate',
    CAMPAIGN_FAILURE_RATE: 'campaign_failure_rate',
  } as const,

  // Reach Metrics
  REACH_METRICS: {
    TOTAL_REACH: 'total_reach',
    UNIQUE_REACH: 'unique_reach',
    IMPRESSIONS: 'impressions',
    UNIQUE_IMPRESSIONS: 'unique_impressions',
    AVERAGE_FREQUENCY: 'average_frequency',
    REACH_PER_CAMPAIGN: 'reach_per_campaign',
    REACH_PER_CHANNEL: 'reach_per_channel',
    DAILY_REACH: 'daily_reach',
    WEEKLY_REACH: 'weekly_reach',
    MONTHLY_REACH: 'monthly_reach',
  } as const,

  // Engagement Metrics
  ENGAGEMENT_METRICS: {
    ENGAGEMENT_RATE: 'engagement_rate',
    TOTAL_ENGAGEMENTS: 'total_engagements',
    CLICKS: 'clicks',
    CLICK_THROUGH_RATE: 'click_through_rate',
    CLICK_TO_IMPRESSION_RATIO: 'click_to_impression_ratio',
    SOCIAL_SHARES: 'social_shares',
    LIKES: 'likes',
    COMMENTS: 'comments',
    REACTIONS: 'reactions',
    ENGAGEMENTS_PER_POST: 'engagements_per_post',
    ENGAGEMENTS_PER_CAMPAIGN: 'engagements_per_campaign',
  } as const,

  // Conversion Metrics
  CONVERSION_METRICS: {
    CONVERSIONS: 'conversions',
    CONVERSION_RATE: 'conversion_rate',
    CONVERSION_VALUE: 'conversion_value',
    COST_PER_CONVERSION: 'cost_per_conversion',
    CONVERSION_PER_CAMPAIGN: 'conversion_per_campaign',
    CONVERSION_PER_CHANNEL: 'conversion_per_channel',
    CONVERSION_PER_IMPRESSION: 'conversion_per_impression',
    CONVERSION_PER_CLICK: 'conversion_per_click',
    AVERAGE_CONVERSION_VALUE: 'average_conversion_value',
  } as const,

  // ROI Metrics
  ROI_METRICS: {
    ROI: 'roi',
    ROAS: 'roas',
    ROMI: 'romi',
    RETURN_ON_AD_SPEND: 'return_on_ad_spend',
    COST_PER_ACQUISITION: 'cost_per_acquisition',
    COST_PER_LEAD: 'cost_per_lead',
    COST_PER_CLICK: 'cost_per_click',
    COST_PER_IMPRESSION: 'cost_per_impression',
    LIFETIME_VALUE: 'lifetime_value',
    CUSTOMER_ACQUISITION_COST: 'customer_acquisition_cost',
    MARKETING_EFFICIENCY_RATIO: 'marketing_efficiency_ratio',
  } as const,

  // Brand Metrics
  BRAND_METRICS: {
    BRAND_AWARENESS: 'brand_awareness',
    BRAND_SENTIMENT: 'brand_sentiment',
    BRAND_REACH: 'brand_reach',
    BRAND_LOYALTY: 'brand_loyalty',
    BRAND_PREFERENCE: 'brand_preference',
    BRAND_RECALL: 'brand_recall',
    BRAND_RECOGNITION: 'brand_recognition',
    BRAND_CREDIBILITY: 'brand_credibility',
    NET_PROMOTER_SCORE: 'net_promoter_score',
    BRAND_MENTIONS: 'brand_mentions',
    SENTIMENT_SCORE: 'sentiment_score',
  } as const,

  // Customer Metrics
  CUSTOMER_METRICS: {
    LEADS_GENERATED: 'leads_generated',
    LEAD_CONVERSION_RATE: 'lead_conversion_rate',
    CUSTOMERS_ACQUIRED: 'customers_acquired',
    CUSTOMER_RETENTION_RATE: 'customer_retention_rate',
    CUSTOMER_CHURN_RATE: 'customer_churn_rate',
    REFERRAL_RATE: 'referral_rate',
    REFERRAL_VALUE: 'referral_value',
    CUSTOMER_SATISFACTION: 'customer_satisfaction',
    REPEAT_PURCHASE_RATE: 'repeat_purchase_rate',
    AVERAGE_CUSTOMER_LIFETIME: 'average_customer_lifetime',
  } as const,

  // Channel Metrics
  CHANNEL_METRICS: {
    CHANNEL_REACH: 'channel_reach',
    CHANNEL_ENGAGEMENT: 'channel_engagement',
    CHANNEL_CONVERSION: 'channel_conversion',
    CHANNEL_ROI: 'channel_roi',
    CHANNEL_COST: 'channel_cost',
    CHANNEL_REVENUE: 'channel_revenue',
    CHANNEL_PREFERENCE: 'channel_preference',
    MULTI_CHANNEL_ATTRIBUTION: 'multi_channel_attribution',
    CHANNEL_SYNERGY: 'channel_synergy',
    CHANNEL_EFFECTIVENESS: 'channel_effectiveness',
  } as const,

  // Time Metrics
  TIME_METRICS: {
    DAILY_ACTIVITY: 'daily_activity',
    WEEKLY_ACTIVITY: 'weekly_activity',
    MONTHLY_ACTIVITY: 'monthly_activity',
    PEAK_HOURS: 'peak_hours',
    BEST_TIME_TO_POST: 'best_time_to_post',
    DAY_OF_WEEK_PERFORMANCE: 'day_of_week_performance',
    TIME_TO_CONVERSION: 'time_to_conversion',
    CAMPAIGN_DURATION: 'campaign_duration',
    AVERAGE_SESSION_DURATION: 'average_session_duration',
  } as const,

  // Comparison Metrics
  COMPARISON_METRICS: {
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',
    WEEK_OVER_WEEK: 'week_over_week',
    PERIOD_COMPARISON: 'period_comparison',
    CAMPAIGN_COMPARISON: 'campaign_comparison',
    CHANNEL_COMPARISON: 'channel_comparison',
    BENCHMARK_COMPARISON: 'benchmark_comparison',
    COMPETITOR_COMPARISON: 'competitor_comparison',
  } as const,

  // Metric Categories
  CATEGORIES: {
    COUNT: 'count',
    REACH: 'reach',
    ENGAGEMENT: 'engagement',
    CONVERSION: 'conversion',
    ROI: 'roi',
    BRAND: 'brand',
    CUSTOMER: 'customer',
    CHANNEL: 'channel',
    TIME: 'time',
    COMPARISON: 'comparison',
  } as const,

  // Metric Types
  TYPES: {
    ABSOLUTE: 'absolute',
    AVERAGE: 'average',
    PERCENTAGE: 'percentage',
    RATIO: 'ratio',
    RATE: 'rate',
    SCORE: 'score',
  } as const,

  // Metric Formats
  FORMATS: {
    NUMBER: 'number',
    DECIMAL: 'decimal',
    PERCENTAGE: 'percentage',
    CURRENCY: 'currency',
    DURATION: 'duration',
    RATING: 'rating',
  } as const,

  // Metric Priority
  PRIORITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,
} as const;

// Marketing Analytics Count Metrics
export type MarketingAnalyticsCountMetric =
  (typeof MARKETING_ANALYTICS_METRIC.COUNT_METRICS)[keyof typeof MARKETING_ANALYTICS_METRIC.COUNT_METRICS];

// Marketing Analytics Reach Metrics
export type MarketingAnalyticsReachMetric =
  (typeof MARKETING_ANALYTICS_METRIC.REACH_METRICS)[keyof typeof MARKETING_ANALYTICS_METRIC.REACH_METRICS];

// Marketing Analytics Engagement Metrics
export type MarketingAnalyticsEngagementMetric =
  (typeof MARKETING_ANALYTICS_METRIC.ENGAGEMENT_METRICS)[keyof typeof MARKETING_ANALYTICS_METRIC.ENGAGEMENT_METRICS];

// Marketing Analytics Conversion Metrics
export type MarketingAnalyticsConversionMetric =
  (typeof MARKETING_ANALYTICS_METRIC.CONVERSION_METRICS)[keyof typeof MARKETING_ANALYTICS_METRIC.CONVERSION_METRICS];

// Marketing Analytics ROI Metrics
export type MarketingAnalyticsROIMetric =
  (typeof MARKETING_ANALYTICS_METRIC.ROI_METRICS)[keyof typeof MARKETING_ANALYTICS_METRIC.ROI_METRICS];

// Marketing Analytics Brand Metrics
export type MarketingAnalyticsBrandMetric =
  (typeof MARKETING_ANALYTICS_METRIC.BRAND_METRICS)[keyof typeof MARKETING_ANALYTICS_METRIC.BRAND_METRICS];

// Marketing Analytics Customer Metrics
export type MarketingAnalyticsCustomerMetric =
  (typeof MARKETING_ANALYTICS_METRIC.CUSTOMER_METRICS)[keyof typeof MARKETING_ANALYTICS_METRIC.CUSTOMER_METRICS];

// Marketing Analytics Channel Metrics
export type MarketingAnalyticsChannelMetric =
  (typeof MARKETING_ANALYTICS_METRIC.CHANNEL_METRICS)[keyof typeof MARKETING_ANALYTICS_METRIC.CHANNEL_METRICS];

// Marketing Analytics Time Metrics
export type MarketingAnalyticsTimeMetric =
  (typeof MARKETING_ANALYTICS_METRIC.TIME_METRICS)[keyof typeof MARKETING_ANALYTICS_METRIC.TIME_METRICS];

// Marketing Analytics Comparison Metrics
export type MarketingAnalyticsComparisonMetric =
  (typeof MARKETING_ANALYTICS_METRIC.COMPARISON_METRICS)[keyof typeof MARKETING_ANALYTICS_METRIC.COMPARISON_METRICS];

// Marketing Analytics Metric Categories
export type MarketingAnalyticsMetricCategory =
  (typeof MARKETING_ANALYTICS_METRIC.CATEGORIES)[keyof typeof MARKETING_ANALYTICS_METRIC.CATEGORIES];

// Marketing Analytics Metric Types
export type MarketingAnalyticsMetricType =
  (typeof MARKETING_ANALYTICS_METRIC.TYPES)[keyof typeof MARKETING_ANALYTICS_METRIC.TYPES];

// Marketing Analytics Metric Formats
export type MarketingAnalyticsMetricFormat =
  (typeof MARKETING_ANALYTICS_METRIC.FORMATS)[keyof typeof MARKETING_ANALYTICS_METRIC.FORMATS];

// Marketing Analytics Metric Priority
export type MarketingAnalyticsMetricPriority =
  (typeof MARKETING_ANALYTICS_METRIC.PRIORITY)[keyof typeof MARKETING_ANALYTICS_METRIC.PRIORITY];

// Marketing Analytics Metric Labels
export function getMarketingAnalyticsMetricLabel(metric: string): string {
  const labels: Record<string, string> = {
    // Count Metrics
    total_campaigns: 'Total Campaigns',
    active_campaigns: 'Active Campaigns',
    completed_campaigns: 'Completed Campaigns',
    cancelled_campaigns: 'Cancelled Campaigns',
    scheduled_campaigns: 'Scheduled Campaigns',
    draft_campaigns: 'Draft Campaigns',
    campaign_success_rate: 'Campaign Success Rate',
    campaign_failure_rate: 'Campaign Failure Rate',

    // Reach Metrics
    total_reach: 'Total Reach',
    unique_reach: 'Unique Reach',
    impressions: 'Impressions',
    unique_impressions: 'Unique Impressions',
    average_frequency: 'Average Frequency',
    reach_per_campaign: 'Reach Per Campaign',
    reach_per_channel: 'Reach Per Channel',
    daily_reach: 'Daily Reach',
    weekly_reach: 'Weekly Reach',
    monthly_reach: 'Monthly Reach',

    // Engagement Metrics
    engagement_rate: 'Engagement Rate',
    total_engagements: 'Total Engagements',
    clicks: 'Clicks',
    click_through_rate: 'Click-through Rate',
    click_to_impression_ratio: 'Click to Impression Ratio',
    social_shares: 'Social Shares',
    likes: 'Likes',
    comments: 'Comments',
    reactions: 'Reactions',
    engagements_per_post: 'Engagements Per Post',
    engagements_per_campaign: 'Engagements Per Campaign',

    // Conversion Metrics
    conversions: 'Conversions',
    conversion_rate: 'Conversion Rate',
    conversion_value: 'Conversion Value',
    cost_per_conversion: 'Cost Per Conversion',
    conversion_per_campaign: 'Conversion Per Campaign',
    conversion_per_channel: 'Conversion Per Channel',
    conversion_per_impression: 'Conversion Per Impression',
    conversion_per_click: 'Conversion Per Click',
    average_conversion_value: 'Average Conversion Value',

    // ROI Metrics
    roi: 'ROI',
    roas: 'ROAS',
    romi: 'ROMI',
    return_on_ad_spend: 'Return on Ad Spend',
    cost_per_acquisition: 'Cost Per Acquisition',
    cost_per_lead: 'Cost Per Lead',
    cost_per_click: 'Cost Per Click',
    cost_per_impression: 'Cost Per Impression',
    lifetime_value: 'Lifetime Value',
    customer_acquisition_cost: 'Customer Acquisition Cost',
    marketing_efficiency_ratio: 'Marketing Efficiency Ratio',

    // Brand Metrics
    brand_awareness: 'Brand Awareness',
    brand_sentiment: 'Brand Sentiment',
    brand_reach: 'Brand Reach',
    brand_loyalty: 'Brand Loyalty',
    brand_preference: 'Brand Preference',
    brand_recall: 'Brand Recall',
    brand_recognition: 'Brand Recognition',
    brand_credibility: 'Brand Credibility',
    net_promoter_score: 'Net Promoter Score',
    brand_mentions: 'Brand Mentions',
    sentiment_score: 'Sentiment Score',

    // Customer Metrics
    leads_generated: 'Leads Generated',
    lead_conversion_rate: 'Lead Conversion Rate',
    customers_acquired: 'Customers Acquired',
    customer_retention_rate: 'Customer Retention Rate',
    customer_churn_rate: 'Customer Churn Rate',
    referral_rate: 'Referral Rate',
    referral_value: 'Referral Value',
    customer_satisfaction: 'Customer Satisfaction',
    repeat_purchase_rate: 'Repeat Purchase Rate',
    average_customer_lifetime: 'Average Customer Lifetime',

    // Channel Metrics
    channel_reach: 'Channel Reach',
    channel_engagement: 'Channel Engagement',
    channel_conversion: 'Channel Conversion',
    channel_roi: 'Channel ROI',
    channel_cost: 'Channel Cost',
    channel_revenue: 'Channel Revenue',
    channel_preference: 'Channel Preference',
    multi_channel_attribution: 'Multi-Channel Attribution',
    channel_synergy: 'Channel Synergy',
    channel_effectiveness: 'Channel Effectiveness',

    // Time Metrics
    daily_activity: 'Daily Activity',
    weekly_activity: 'Weekly Activity',
    monthly_activity: 'Monthly Activity',
    peak_hours: 'Peak Hours',
    best_time_to_post: 'Best Time to Post',
    day_of_week_performance: 'Day of Week Performance',
    time_to_conversion: 'Time to Conversion',
    campaign_duration: 'Campaign Duration',
    average_session_duration: 'Average Session Duration',

    // Comparison Metrics
    year_over_year: 'Year Over Year',
    quarter_over_quarter: 'Quarter Over Quarter',
    month_over_month: 'Month Over Month',
    week_over_week: 'Week Over Week',
    period_comparison: 'Period Comparison',
    campaign_comparison: 'Campaign Comparison',
    channel_comparison: 'Channel Comparison',
    benchmark_comparison: 'Benchmark Comparison',
    competitor_comparison: 'Competitor Comparison',
  };

  return (
    labels[metric] || metric.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
  );
}

// Marketing Analytics Metric Category Labels
export function getMarketingAnalyticsMetricCategoryLabel(
  category: MarketingAnalyticsMetricCategory
): string {
  const labels: Record<MarketingAnalyticsMetricCategory, string> = {
    [MARKETING_ANALYTICS_METRIC.CATEGORIES.COUNT]: 'Count',
    [MARKETING_ANALYTICS_METRIC.CATEGORIES.REACH]: 'Reach',
    [MARKETING_ANALYTICS_METRIC.CATEGORIES.ENGAGEMENT]: 'Engagement',
    [MARKETING_ANALYTICS_METRIC.CATEGORIES.CONVERSION]: 'Conversion',
    [MARKETING_ANALYTICS_METRIC.CATEGORIES.ROI]: 'ROI',
    [MARKETING_ANALYTICS_METRIC.CATEGORIES.BRAND]: 'Brand',
    [MARKETING_ANALYTICS_METRIC.CATEGORIES.CUSTOMER]: 'Customer',
    [MARKETING_ANALYTICS_METRIC.CATEGORIES.CHANNEL]: 'Channel',
    [MARKETING_ANALYTICS_METRIC.CATEGORIES.TIME]: 'Time',
    [MARKETING_ANALYTICS_METRIC.CATEGORIES.COMPARISON]: 'Comparison',
  };
  return labels[category] || 'Unknown';
}

// Marketing Analytics Metric Type Labels
export function getMarketingAnalyticsMetricTypeLabel(type: MarketingAnalyticsMetricType): string {
  const labels: Record<MarketingAnalyticsMetricType, string> = {
    [MARKETING_ANALYTICS_METRIC.TYPES.ABSOLUTE]: 'Absolute',
    [MARKETING_ANALYTICS_METRIC.TYPES.AVERAGE]: 'Average',
    [MARKETING_ANALYTICS_METRIC.TYPES.PERCENTAGE]: 'Percentage',
    [MARKETING_ANALYTICS_METRIC.TYPES.RATIO]: 'Ratio',
    [MARKETING_ANALYTICS_METRIC.TYPES.RATE]: 'Rate',
    [MARKETING_ANALYTICS_METRIC.TYPES.SCORE]: 'Score',
  };
  return labels[type] || 'Unknown';
}

// Marketing Analytics Metric Format Labels
export function getMarketingAnalyticsMetricFormatLabel(
  format: MarketingAnalyticsMetricFormat
): string {
  const labels: Record<MarketingAnalyticsMetricFormat, string> = {
    [MARKETING_ANALYTICS_METRIC.FORMATS.NUMBER]: 'Number',
    [MARKETING_ANALYTICS_METRIC.FORMATS.DECIMAL]: 'Decimal',
    [MARKETING_ANALYTICS_METRIC.FORMATS.PERCENTAGE]: 'Percentage',
    [MARKETING_ANALYTICS_METRIC.FORMATS.CURRENCY]: 'Currency',
    [MARKETING_ANALYTICS_METRIC.FORMATS.DURATION]: 'Duration',
    [MARKETING_ANALYTICS_METRIC.FORMATS.RATING]: 'Rating',
  };
  return labels[format] || 'Unknown';
}

// Marketing Analytics Metric Priority Labels
export function getMarketingAnalyticsMetricPriorityLabel(
  priority: MarketingAnalyticsMetricPriority
): string {
  const labels: Record<MarketingAnalyticsMetricPriority, string> = {
    [MARKETING_ANALYTICS_METRIC.PRIORITY.CRITICAL]: 'Critical',
    [MARKETING_ANALYTICS_METRIC.PRIORITY.HIGH]: 'High',
    [MARKETING_ANALYTICS_METRIC.PRIORITY.MEDIUM]: 'Medium',
    [MARKETING_ANALYTICS_METRIC.PRIORITY.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

// Get metric category
export function getMarketingAnalyticsMetricCategory(
  metric: string
): MarketingAnalyticsMetricCategory {
  const countMetrics: readonly string[] = Object.values(MARKETING_ANALYTICS_METRIC.COUNT_METRICS);
  const reachMetrics: readonly string[] = Object.values(MARKETING_ANALYTICS_METRIC.REACH_METRICS);
  const engagementMetrics: readonly string[] = Object.values(
    MARKETING_ANALYTICS_METRIC.ENGAGEMENT_METRICS
  );
  const conversionMetrics: readonly string[] = Object.values(
    MARKETING_ANALYTICS_METRIC.CONVERSION_METRICS
  );
  const roiMetrics: readonly string[] = Object.values(MARKETING_ANALYTICS_METRIC.ROI_METRICS);
  const brandMetrics: readonly string[] = Object.values(MARKETING_ANALYTICS_METRIC.BRAND_METRICS);
  const customerMetrics: readonly string[] = Object.values(
    MARKETING_ANALYTICS_METRIC.CUSTOMER_METRICS
  );
  const channelMetrics: readonly string[] = Object.values(
    MARKETING_ANALYTICS_METRIC.CHANNEL_METRICS
  );
  const timeMetrics: readonly string[] = Object.values(MARKETING_ANALYTICS_METRIC.TIME_METRICS);
  const comparisonMetrics: readonly string[] = Object.values(
    MARKETING_ANALYTICS_METRIC.COMPARISON_METRICS
  );

  if (countMetrics.includes(metric)) return MARKETING_ANALYTICS_METRIC.CATEGORIES.COUNT;
  if (reachMetrics.includes(metric)) return MARKETING_ANALYTICS_METRIC.CATEGORIES.REACH;
  if (engagementMetrics.includes(metric)) return MARKETING_ANALYTICS_METRIC.CATEGORIES.ENGAGEMENT;
  if (conversionMetrics.includes(metric)) return MARKETING_ANALYTICS_METRIC.CATEGORIES.CONVERSION;
  if (roiMetrics.includes(metric)) return MARKETING_ANALYTICS_METRIC.CATEGORIES.ROI;
  if (brandMetrics.includes(metric)) return MARKETING_ANALYTICS_METRIC.CATEGORIES.BRAND;
  if (customerMetrics.includes(metric)) return MARKETING_ANALYTICS_METRIC.CATEGORIES.CUSTOMER;
  if (channelMetrics.includes(metric)) return MARKETING_ANALYTICS_METRIC.CATEGORIES.CHANNEL;
  if (timeMetrics.includes(metric)) return MARKETING_ANALYTICS_METRIC.CATEGORIES.TIME;
  if (comparisonMetrics.includes(metric)) return MARKETING_ANALYTICS_METRIC.CATEGORIES.COMPARISON;

  return MARKETING_ANALYTICS_METRIC.CATEGORIES.COUNT;
}

// Get metric type
export function getMarketingAnalyticsMetricType(metric: string): MarketingAnalyticsMetricType {
  const percentageMetrics: readonly string[] = [
    'rate',
    'percentage',
    'roi',
    'roas',
    'romi',
    'conversion',
    'retention',
    'churn',
    'engagement',
    'success',
    'failure',
    'preference',
    'satisfaction',
  ];

  const averageMetrics: readonly string[] = ['avg', 'average', 'mean', 'median'];

  const scoreMetrics: readonly string[] = [
    'score',
    'nps',
    'sentiment',
    'rating',
    'credibility',
    'loyalty',
  ];

  const lowerMetric = metric.toLowerCase();

  if (percentageMetrics.some((pm: string) => lowerMetric.includes(pm))) {
    return MARKETING_ANALYTICS_METRIC.TYPES.PERCENTAGE;
  }

  if (averageMetrics.some((am: string) => lowerMetric.includes(am))) {
    return MARKETING_ANALYTICS_METRIC.TYPES.AVERAGE;
  }

  if (scoreMetrics.some((sm: string) => lowerMetric.includes(sm))) {
    return MARKETING_ANALYTICS_METRIC.TYPES.SCORE;
  }

  return MARKETING_ANALYTICS_METRIC.TYPES.ABSOLUTE;
}

// Get metric format
export function getMarketingAnalyticsMetricFormat(metric: string): MarketingAnalyticsMetricFormat {
  const currencyMetrics: readonly string[] = [
    'cost',
    'value',
    'revenue',
    'spend',
    'price',
    'acquisition',
    'lifetime',
  ];

  const percentageMetrics: readonly string[] = [
    'rate',
    'percentage',
    'roi',
    'roas',
    'romi',
    'conversion',
    'retention',
    'churn',
    'engagement',
    'success',
    'failure',
    'preference',
    'satisfaction',
  ];

  const ratingMetrics: readonly string[] = [
    'score',
    'nps',
    'sentiment',
    'rating',
    'credibility',
    'loyalty',
  ];

  const durationMetrics: readonly string[] = ['time', 'duration', 'session', 'lifetime'];

  const lowerMetric = metric.toLowerCase();

  if (currencyMetrics.some((cm: string) => lowerMetric.includes(cm))) {
    return MARKETING_ANALYTICS_METRIC.FORMATS.CURRENCY;
  }

  if (durationMetrics.some((dm: string) => lowerMetric.includes(dm))) {
    return MARKETING_ANALYTICS_METRIC.FORMATS.DURATION;
  }

  if (ratingMetrics.some((rm: string) => lowerMetric.includes(rm))) {
    return MARKETING_ANALYTICS_METRIC.FORMATS.RATING;
  }

  if (percentageMetrics.some((pm: string) => lowerMetric.includes(pm))) {
    return MARKETING_ANALYTICS_METRIC.FORMATS.PERCENTAGE;
  }

  return MARKETING_ANALYTICS_METRIC.FORMATS.NUMBER;
}

// Calculate ROI
export function calculateMarketingAnalyticsROI(revenue: number, cost: number): number {
  if (cost === 0) return 0;
  return ((revenue - cost) / cost) * 100;
}

// Calculate ROAS
export function calculateMarketingAnalyticsROAS(revenue: number, adSpend: number): number {
  if (adSpend === 0) return 0;
  return revenue / adSpend;
}

// Calculate conversion rate
export function calculateMarketingAnalyticsConversionRate(
  conversions: number,
  impressions: number
): number {
  if (impressions === 0) return 0;
  return (conversions / impressions) * 100;
}

// Calculate engagement rate
export function calculateMarketingAnalyticsEngagementRate(
  engagements: number,
  reach: number
): number {
  if (reach === 0) return 0;
  return (engagements / reach) * 100;
}

// Calculate click-through rate
export function calculateMarketingAnalyticsCTR(clicks: number, impressions: number): number {
  if (impressions === 0) return 0;
  return (clicks / impressions) * 100;
}

// Calculate customer retention rate
export function calculateMarketingAnalyticsRetentionRate(
  retainedCustomers: number,
  totalCustomers: number
): number {
  if (totalCustomers === 0) return 0;
  return (retainedCustomers / totalCustomers) * 100;
}

// Calculate churn rate
export function calculateMarketingAnalyticsChurnRate(
  churnedCustomers: number,
  totalCustomers: number
): number {
  if (totalCustomers === 0) return 0;
  return (churnedCustomers / totalCustomers) * 100;
}

// Calculate NPS
export function calculateMarketingAnalyticsNPS(
  promoters: number,
  passives: number,
  detractors: number
): number {
  const total = promoters + passives + detractors;
  if (total === 0) return 0;
  return ((promoters - detractors) / total) * 100;
}
