/**
 * Acquisition Analytics Metric Constants
 * Metrics for measuring customer acquisition performance
 */

export const ACQUISITION_ANALYTICS_METRIC = {
  // Lead Metrics
  LEAD_METRICS: {
    TOTAL_LEADS: 'total_leads',
    NEW_LEADS: 'new_leads',
    QUALIFIED_LEADS: 'qualified_leads',
    CONVERTED_LEADS: 'converted_leads',
    LOST_LEADS: 'lost_leads',
    LEAD_CONVERSION_RATE: 'lead_conversion_rate',
    LEAD_QUALIFICATION_RATE: 'lead_qualification_rate',
    LEAD_LOSS_RATE: 'lead_loss_rate',
  } as const,

  // Customer Metrics
  CUSTOMER_METRICS: {
    TOTAL_CUSTOMERS: 'total_customers',
    NEW_CUSTOMERS: 'new_customers',
    CUSTOMER_ACQUISITION_RATE: 'customer_acquisition_rate',
    CUSTOMER_ACTIVATION_RATE: 'customer_activation_rate',
    CUSTOMER_ACQUISITION_COST: 'customer_acquisition_cost',
    CUSTOMER_LIFETIME_VALUE: 'customer_lifetime_value',
  } as const,

  // Channel Metrics
  CHANNEL_METRICS: {
    CHANNEL_ACQUISITIONS: 'channel_acquisitions',
    CHANNEL_CONVERSION_RATE: 'channel_conversion_rate',
    CHANNEL_EFFECTIVENESS: 'channel_effectiveness',
    CHANNEL_COST: 'channel_cost',
    CHANNEL_ROI: 'channel_roi',
    CHANNEL_SHARE: 'channel_share',
  } as const,

  // Campaign Metrics
  CAMPAIGN_METRICS: {
    CAMPAIGN_ACQUISITIONS: 'campaign_acquisitions',
    CAMPAIGN_CONVERSION_RATE: 'campaign_conversion_rate',
    CAMPAIGN_ROI: 'campaign_roi',
    CAMPAIGN_COST: 'campaign_cost',
    CAMPAIGN_EFFECTIVENESS: 'campaign_effectiveness',
  } as const,

  // Cost Metrics
  COST_METRICS: {
    TOTAL_ACQUISITION_COST: 'total_acquisition_cost',
    COST_PER_LEAD: 'cost_per_lead',
    COST_PER_QUALIFIED_LEAD: 'cost_per_qualified_lead',
    COST_PER_ACQUISITION: 'cost_per_acquisition',
    CAC: 'cac',
    CAC_TO_LTV_RATIO: 'cac_to_ltv_ratio',
  } as const,

  // ROI Metrics
  ROI_METRICS: {
    ROI: 'roi',
    ROAS: 'roas',
    ROMI: 'romi',
    LTV_TO_CAC_RATIO: 'ltv_to_cac_ratio',
    PAYBACK_PERIOD: 'payback_period',
  } as const,

  // Funnel Metrics
  FUNNEL_METRICS: {
    AWARENESS_TO_INTEREST: 'awareness_to_interest',
    INTEREST_TO_CONSIDERATION: 'interest_to_consideration',
    CONSIDERATION_TO_INTENT: 'consideration_to_intent',
    INTENT_TO_PURCHASE: 'intent_to_purchase',
    OVERALL_CONVERSION_RATE: 'overall_conversion_rate',
    FUNNEL_DROPOFF_RATE: 'funnel_dropoff_rate',
  } as const,

  // Comparison Metrics
  COMPARISON_METRICS: {
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',
    PERIOD_COMPARISON: 'period_comparison',
    CHANNEL_COMPARISON: 'channel_comparison',
    CAMPAIGN_COMPARISON: 'campaign_comparison',
  } as const,

  // Metric Categories
  CATEGORIES: {
    LEAD: 'lead',
    CUSTOMER: 'customer',
    CHANNEL: 'channel',
    CAMPAIGN: 'campaign',
    COST: 'cost',
    ROI: 'roi',
    FUNNEL: 'funnel',
    COMPARISON: 'comparison',
  } as const,

  // Metric Types
  TYPES: {
    ABSOLUTE: 'absolute',
    AVERAGE: 'average',
    PERCENTAGE: 'percentage',
    RATIO: 'ratio',
    RATE: 'rate',
    COST: 'cost',
  } as const,

  // Metric Formats
  FORMATS: {
    NUMBER: 'number',
    DECIMAL: 'decimal',
    PERCENTAGE: 'percentage',
    CURRENCY: 'currency',
    DURATION: 'duration',
    RATIO: 'ratio',
  } as const,

  // Metric Priority
  PRIORITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,
} as const;

// Acquisition Analytics Lead Metrics
export type AcquisitionAnalyticsLeadMetric =
  (typeof ACQUISITION_ANALYTICS_METRIC.LEAD_METRICS)[keyof typeof ACQUISITION_ANALYTICS_METRIC.LEAD_METRICS];

// Acquisition Analytics Customer Metrics
export type AcquisitionAnalyticsCustomerMetric =
  (typeof ACQUISITION_ANALYTICS_METRIC.CUSTOMER_METRICS)[keyof typeof ACQUISITION_ANALYTICS_METRIC.CUSTOMER_METRICS];

// Acquisition Analytics Channel Metrics
export type AcquisitionAnalyticsChannelMetric =
  (typeof ACQUISITION_ANALYTICS_METRIC.CHANNEL_METRICS)[keyof typeof ACQUISITION_ANALYTICS_METRIC.CHANNEL_METRICS];

// Acquisition Analytics Campaign Metrics
export type AcquisitionAnalyticsCampaignMetric =
  (typeof ACQUISITION_ANALYTICS_METRIC.CAMPAIGN_METRICS)[keyof typeof ACQUISITION_ANALYTICS_METRIC.CAMPAIGN_METRICS];

// Acquisition Analytics Cost Metrics
export type AcquisitionAnalyticsCostMetric =
  (typeof ACQUISITION_ANALYTICS_METRIC.COST_METRICS)[keyof typeof ACQUISITION_ANALYTICS_METRIC.COST_METRICS];

// Acquisition Analytics ROI Metrics
export type AcquisitionAnalyticsROIMetric =
  (typeof ACQUISITION_ANALYTICS_METRIC.ROI_METRICS)[keyof typeof ACQUISITION_ANALYTICS_METRIC.ROI_METRICS];

// Acquisition Analytics Funnel Metrics
export type AcquisitionAnalyticsFunnelMetric =
  (typeof ACQUISITION_ANALYTICS_METRIC.FUNNEL_METRICS)[keyof typeof ACQUISITION_ANALYTICS_METRIC.FUNNEL_METRICS];

// Acquisition Analytics Comparison Metrics
export type AcquisitionAnalyticsComparisonMetric =
  (typeof ACQUISITION_ANALYTICS_METRIC.COMPARISON_METRICS)[keyof typeof ACQUISITION_ANALYTICS_METRIC.COMPARISON_METRICS];

// Acquisition Analytics Metric Categories
export type AcquisitionAnalyticsMetricCategory =
  (typeof ACQUISITION_ANALYTICS_METRIC.CATEGORIES)[keyof typeof ACQUISITION_ANALYTICS_METRIC.CATEGORIES];

// Acquisition Analytics Metric Types
export type AcquisitionAnalyticsMetricType =
  (typeof ACQUISITION_ANALYTICS_METRIC.TYPES)[keyof typeof ACQUISITION_ANALYTICS_METRIC.TYPES];

// Acquisition Analytics Metric Formats
export type AcquisitionAnalyticsMetricFormat =
  (typeof ACQUISITION_ANALYTICS_METRIC.FORMATS)[keyof typeof ACQUISITION_ANALYTICS_METRIC.FORMATS];

// Acquisition Analytics Metric Priority
export type AcquisitionAnalyticsMetricPriority =
  (typeof ACQUISITION_ANALYTICS_METRIC.PRIORITY)[keyof typeof ACQUISITION_ANALYTICS_METRIC.PRIORITY];

// Acquisition Analytics Metric Labels
export function getAcquisitionAnalyticsMetricLabel(metric: string): string {
  const labels: Record<string, string> = {
    // Lead Metrics
    total_leads: 'Total Leads',
    new_leads: 'New Leads',
    qualified_leads: 'Qualified Leads',
    converted_leads: 'Converted Leads',
    lost_leads: 'Lost Leads',
    lead_conversion_rate: 'Lead Conversion Rate',
    lead_qualification_rate: 'Lead Qualification Rate',
    lead_loss_rate: 'Lead Loss Rate',

    // Customer Metrics
    total_customers: 'Total Customers',
    new_customers: 'New Customers',
    customer_acquisition_rate: 'Customer Acquisition Rate',
    customer_activation_rate: 'Customer Activation Rate',
    customer_acquisition_cost: 'Customer Acquisition Cost',
    customer_lifetime_value: 'Customer Lifetime Value',

    // Channel Metrics
    channel_acquisitions: 'Channel Acquisitions',
    channel_conversion_rate: 'Channel Conversion Rate',
    channel_effectiveness: 'Channel Effectiveness',
    channel_cost: 'Channel Cost',
    channel_roi: 'Channel ROI',
    channel_share: 'Channel Share',

    // Campaign Metrics
    campaign_acquisitions: 'Campaign Acquisitions',
    campaign_conversion_rate: 'Campaign Conversion Rate',
    campaign_roi: 'Campaign ROI',
    campaign_cost: 'Campaign Cost',
    campaign_effectiveness: 'Campaign Effectiveness',

    // Cost Metrics
    total_acquisition_cost: 'Total Acquisition Cost',
    cost_per_lead: 'Cost Per Lead',
    cost_per_qualified_lead: 'Cost Per Qualified Lead',
    cost_per_acquisition: 'Cost Per Acquisition',
    cac: 'CAC',
    cac_to_ltv_ratio: 'CAC to LTV Ratio',

    // ROI Metrics
    roi: 'ROI',
    roas: 'ROAS',
    romi: 'ROMI',
    ltv_to_cac_ratio: 'LTV to CAC Ratio',
    payback_period: 'Payback Period',

    // Funnel Metrics
    awareness_to_interest: 'Awareness to Interest',
    interest_to_consideration: 'Interest to Consideration',
    consideration_to_intent: 'Consideration to Intent',
    intent_to_purchase: 'Intent to Purchase',
    overall_conversion_rate: 'Overall Conversion Rate',
    funnel_dropoff_rate: 'Funnel Dropoff Rate',

    // Comparison Metrics
    year_over_year: 'Year Over Year',
    quarter_over_quarter: 'Quarter Over Quarter',
    month_over_month: 'Month Over Month',
    period_comparison: 'Period Comparison',
    channel_comparison: 'Channel Comparison',
    campaign_comparison: 'Campaign Comparison',
  };

  return (
    labels[metric] || metric.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
  );
}

// Acquisition Analytics Metric Category Labels
export function getAcquisitionAnalyticsMetricCategoryLabel(
  category: AcquisitionAnalyticsMetricCategory
): string {
  const labels: Record<AcquisitionAnalyticsMetricCategory, string> = {
    [ACQUISITION_ANALYTICS_METRIC.CATEGORIES.LEAD]: 'Lead',
    [ACQUISITION_ANALYTICS_METRIC.CATEGORIES.CUSTOMER]: 'Customer',
    [ACQUISITION_ANALYTICS_METRIC.CATEGORIES.CHANNEL]: 'Channel',
    [ACQUISITION_ANALYTICS_METRIC.CATEGORIES.CAMPAIGN]: 'Campaign',
    [ACQUISITION_ANALYTICS_METRIC.CATEGORIES.COST]: 'Cost',
    [ACQUISITION_ANALYTICS_METRIC.CATEGORIES.ROI]: 'ROI',
    [ACQUISITION_ANALYTICS_METRIC.CATEGORIES.FUNNEL]: 'Funnel',
    [ACQUISITION_ANALYTICS_METRIC.CATEGORIES.COMPARISON]: 'Comparison',
  };
  return labels[category] || 'Unknown';
}

// Acquisition Analytics Metric Type Labels
export function getAcquisitionAnalyticsMetricTypeLabel(
  type: AcquisitionAnalyticsMetricType
): string {
  const labels: Record<AcquisitionAnalyticsMetricType, string> = {
    [ACQUISITION_ANALYTICS_METRIC.TYPES.ABSOLUTE]: 'Absolute',
    [ACQUISITION_ANALYTICS_METRIC.TYPES.AVERAGE]: 'Average',
    [ACQUISITION_ANALYTICS_METRIC.TYPES.PERCENTAGE]: 'Percentage',
    [ACQUISITION_ANALYTICS_METRIC.TYPES.RATIO]: 'Ratio',
    [ACQUISITION_ANALYTICS_METRIC.TYPES.RATE]: 'Rate',
    [ACQUISITION_ANALYTICS_METRIC.TYPES.COST]: 'Cost',
  };
  return labels[type] || 'Unknown';
}

// Acquisition Analytics Metric Format Labels
export function getAcquisitionAnalyticsMetricFormatLabel(
  format: AcquisitionAnalyticsMetricFormat
): string {
  const labels: Record<AcquisitionAnalyticsMetricFormat, string> = {
    [ACQUISITION_ANALYTICS_METRIC.FORMATS.NUMBER]: 'Number',
    [ACQUISITION_ANALYTICS_METRIC.FORMATS.DECIMAL]: 'Decimal',
    [ACQUISITION_ANALYTICS_METRIC.FORMATS.PERCENTAGE]: 'Percentage',
    [ACQUISITION_ANALYTICS_METRIC.FORMATS.CURRENCY]: 'Currency',
    [ACQUISITION_ANALYTICS_METRIC.FORMATS.DURATION]: 'Duration',
    [ACQUISITION_ANALYTICS_METRIC.FORMATS.RATIO]: 'Ratio',
  };
  return labels[format] || 'Unknown';
}

// Acquisition Analytics Metric Priority Labels
export function getAcquisitionAnalyticsMetricPriorityLabel(
  priority: AcquisitionAnalyticsMetricPriority
): string {
  const labels: Record<AcquisitionAnalyticsMetricPriority, string> = {
    [ACQUISITION_ANALYTICS_METRIC.PRIORITY.CRITICAL]: 'Critical',
    [ACQUISITION_ANALYTICS_METRIC.PRIORITY.HIGH]: 'High',
    [ACQUISITION_ANALYTICS_METRIC.PRIORITY.MEDIUM]: 'Medium',
    [ACQUISITION_ANALYTICS_METRIC.PRIORITY.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

// Get metric category
export function getAcquisitionAnalyticsMetricCategory(
  metric: string
): AcquisitionAnalyticsMetricCategory {
  const leadMetrics = Object.values(ACQUISITION_ANALYTICS_METRIC.LEAD_METRICS) as readonly string[];
  const customerMetrics = Object.values(
    ACQUISITION_ANALYTICS_METRIC.CUSTOMER_METRICS
  ) as readonly string[];
  const channelMetrics = Object.values(
    ACQUISITION_ANALYTICS_METRIC.CHANNEL_METRICS
  ) as readonly string[];
  const campaignMetrics = Object.values(
    ACQUISITION_ANALYTICS_METRIC.CAMPAIGN_METRICS
  ) as readonly string[];
  const costMetrics = Object.values(ACQUISITION_ANALYTICS_METRIC.COST_METRICS) as readonly string[];
  const roiMetrics = Object.values(ACQUISITION_ANALYTICS_METRIC.ROI_METRICS) as readonly string[];
  const funnelMetrics = Object.values(
    ACQUISITION_ANALYTICS_METRIC.FUNNEL_METRICS
  ) as readonly string[];
  const comparisonMetrics = Object.values(
    ACQUISITION_ANALYTICS_METRIC.COMPARISON_METRICS
  ) as readonly string[];

  if (leadMetrics.includes(metric)) return ACQUISITION_ANALYTICS_METRIC.CATEGORIES.LEAD;
  if (customerMetrics.includes(metric)) return ACQUISITION_ANALYTICS_METRIC.CATEGORIES.CUSTOMER;
  if (channelMetrics.includes(metric)) return ACQUISITION_ANALYTICS_METRIC.CATEGORIES.CHANNEL;
  if (campaignMetrics.includes(metric)) return ACQUISITION_ANALYTICS_METRIC.CATEGORIES.CAMPAIGN;
  if (costMetrics.includes(metric)) return ACQUISITION_ANALYTICS_METRIC.CATEGORIES.COST;
  if (roiMetrics.includes(metric)) return ACQUISITION_ANALYTICS_METRIC.CATEGORIES.ROI;
  if (funnelMetrics.includes(metric)) return ACQUISITION_ANALYTICS_METRIC.CATEGORIES.FUNNEL;
  if (comparisonMetrics.includes(metric)) return ACQUISITION_ANALYTICS_METRIC.CATEGORIES.COMPARISON;

  return ACQUISITION_ANALYTICS_METRIC.CATEGORIES.LEAD;
}

// Get metric type
export function getAcquisitionAnalyticsMetricType(metric: string): AcquisitionAnalyticsMetricType {
  const percentageMetrics: string[] = [
    'rate',
    'percentage',
    'conversion',
    'qualification',
    'loss',
    'activation',
    'effectiveness',
    'share',
    'roi',
    'roas',
    'romi',
    'dropoff',
  ];

  const costMetrics: string[] = ['cost', 'cac', 'ltv'];

  const averageMetrics: string[] = ['avg', 'average'];

  const ratioMetrics: string[] = ['ratio'];

  const lowerMetric = metric.toLowerCase();

  if (costMetrics.some((cm) => lowerMetric.includes(cm))) {
    return ACQUISITION_ANALYTICS_METRIC.TYPES.COST;
  }

  if (percentageMetrics.some((pm) => lowerMetric.includes(pm))) {
    return ACQUISITION_ANALYTICS_METRIC.TYPES.PERCENTAGE;
  }

  if (averageMetrics.some((am) => lowerMetric.includes(am))) {
    return ACQUISITION_ANALYTICS_METRIC.TYPES.AVERAGE;
  }

  if (ratioMetrics.some((rm) => lowerMetric.includes(rm))) {
    return ACQUISITION_ANALYTICS_METRIC.TYPES.RATIO;
  }

  return ACQUISITION_ANALYTICS_METRIC.TYPES.ABSOLUTE;
}

// Get metric format
export function getAcquisitionAnalyticsMetricFormat(
  metric: string
): AcquisitionAnalyticsMetricFormat {
  const currencyMetrics: string[] = ['cost', 'cac', 'ltv', 'acquisition'];

  const percentageMetrics: string[] = [
    'rate',
    'percentage',
    'conversion',
    'qualification',
    'loss',
    'activation',
    'effectiveness',
    'share',
    'roi',
    'roas',
    'romi',
    'dropoff',
  ];

  const durationMetrics: string[] = ['period', 'payback'];

  const lowerMetric = metric.toLowerCase();

  if (currencyMetrics.some((cm) => lowerMetric.includes(cm))) {
    return ACQUISITION_ANALYTICS_METRIC.FORMATS.CURRENCY;
  }

  if (durationMetrics.some((dm) => lowerMetric.includes(dm))) {
    return ACQUISITION_ANALYTICS_METRIC.FORMATS.DURATION;
  }

  if (percentageMetrics.some((pm) => lowerMetric.includes(pm))) {
    return ACQUISITION_ANALYTICS_METRIC.FORMATS.PERCENTAGE;
  }

  return ACQUISITION_ANALYTICS_METRIC.FORMATS.NUMBER;
}

// Calculate lead conversion rate
export function calculateAcquisitionAnalyticsLeadConversionRate(
  convertedLeads: number,
  totalLeads: number
): number {
  if (totalLeads === 0) return 0;
  return (convertedLeads / totalLeads) * 100;
}

// Calculate customer acquisition cost
export function calculateAcquisitionAnalyticsCAC(
  totalAcquisitionCost: number,
  newCustomers: number
): number {
  if (newCustomers === 0) return 0;
  return totalAcquisitionCost / newCustomers;
}

// Calculate LTV to CAC ratio
export function calculateAcquisitionAnalyticsLTVToCACRatio(ltv: number, cac: number): number {
  if (cac === 0) return 0;
  return ltv / cac;
}

// Calculate ROI
export function calculateAcquisitionAnalyticsROI(revenue: number, cost: number): number {
  if (cost === 0) return 0;
  return ((revenue - cost) / cost) * 100;
}

// Calculate ROAS
export function calculateAcquisitionAnalyticsROAS(revenue: number, adSpend: number): number {
  if (adSpend === 0) return 0;
  return revenue / adSpend;
}

// Calculate funnel conversion rate
export function calculateAcquisitionAnalyticsFunnelConversion(
  converted: number,
  total: number
): number {
  if (total === 0) return 0;
  return (converted / total) * 100;
}

// Calculate funnel dropoff rate
export function calculateAcquisitionAnalyticsFunnelDropoff(dropped: number, total: number): number {
  if (total === 0) return 0;
  return (dropped / total) * 100;
}

// Calculate cost per lead
export function calculateAcquisitionAnalyticsCostPerLead(
  totalCost: number,
  totalLeads: number
): number {
  if (totalLeads === 0) return 0;
  return totalCost / totalLeads;
}
