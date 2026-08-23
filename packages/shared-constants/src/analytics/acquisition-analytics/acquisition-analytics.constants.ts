/**
 * Acquisition Analytics Constants
 * Configuration for customer acquisition analytics and tracking
 */

export const ACQUISITION_ANALYTICS = {
  // Acquisition Analytics Types
  TYPES: {
    // Channel Acquisition
    CHANNEL: 'channel',
    SOURCE: 'source',
    MEDIUM: 'medium',
    CAMPAIGN: 'campaign',

    // Customer Acquisition
    CUSTOMER: 'customer',
    LEAD: 'lead',
    PROSPECT: 'prospect',
    CONVERSION: 'conversion',

    // Cost Acquisition
    COST: 'cost',
    CAC: 'cac',
    ROI: 'roi',
    EFFICIENCY: 'efficiency',

    // Time Acquisition
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,

  // Acquisition Analytics Status
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

  // Acquisition Analytics Scopes
  SCOPES: {
    INDIVIDUAL: 'individual',
    CHANNEL: 'channel',
    CAMPAIGN: 'campaign',
    SOURCE: 'source',
    ALL_ACQUISITION: 'all_acquisition',
    COMPARATIVE: 'comparative',
  } as const,

  // Acquisition Analytics Events
  EVENTS: {
    // Lead Events
    LEAD_CREATED: 'lead_created',
    LEAD_UPDATED: 'lead_updated',
    LEAD_QUALIFIED: 'lead_qualified',
    LEAD_CONVERTED: 'lead_converted',
    LEAD_LOST: 'lead_lost',

    // Prospect Events
    PROSPECT_IDENTIFIED: 'prospect_identified',
    PROSPECT_ENGAGED: 'prospect_engaged',
    PROSPECT_CONVERTED: 'prospect_converted',

    // Customer Events
    CUSTOMER_ACQUIRED: 'customer_acquired',
    CUSTOMER_ACTIVATED: 'customer_activated',
    CUSTOMER_WELCOMED: 'customer_welcomed',

    // Channel Events
    CHANNEL_ACQUISITION: 'channel_acquisition',
    CHANNEL_CONVERSION: 'channel_conversion',
    CHANNEL_COST: 'channel_cost',

    // Campaign Events
    CAMPAIGN_STARTED: 'campaign_started',
    CAMPAIGN_ENDED: 'campaign_ended',
    CAMPAIGN_CONVERTED: 'campaign_converted',

    // Cost Events
    COST_INCURRED: 'cost_incurred',
    COST_OPTIMIZED: 'cost_optimized',
    CAC_UPDATED: 'cac_updated',

    // ROI Events
    ROI_CALCULATED: 'roi_calculated',
    ROI_IMPROVED: 'roi_improved',
    ROI_DECLINED: 'roi_declined',
  } as const,

  // Acquisition Analytics Dimensions
  DIMENSIONS: {
    // Customer Attributes
    CUSTOMER_ID: 'customer_id',
    CUSTOMER_NAME: 'customer_name',
    CUSTOMER_TYPE: 'customer_type',
    CUSTOMER_SEGMENT: 'customer_segment',

    // Lead Attributes
    LEAD_ID: 'lead_id',
    LEAD_NAME: 'lead_name',
    LEAD_STATUS: 'lead_status',
    LEAD_SOURCE: 'lead_source',

    // Channel Attributes
    CHANNEL: 'channel',
    CHANNEL_TYPE: 'channel_type',
    SOURCE: 'source',
    MEDIUM: 'medium',
    CAMPAIGN: 'campaign',

    // Cost Attributes
    ACQUISITION_COST: 'acquisition_cost',
    CAC: 'cac',
    LTV: 'ltv',
    ROI: 'roi',

    // Time Attributes
    ACQUISITION_DATE: 'acquisition_date',
    ACQUISITION_MONTH: 'acquisition_month',
    ACQUISITION_QUARTER: 'acquisition_quarter',
    ACQUISITION_YEAR: 'acquisition_year',

    // Location Attributes
    COUNTRY: 'country',
    REGION: 'region',
    CITY: 'city',

    // Device Attributes
    DEVICE_TYPE: 'device_type',
    BROWSER: 'browser',
    OS: 'os',
  } as const,

  // Acquisition Analytics Metrics
  METRICS: {
    // Lead Metrics
    TOTAL_LEADS: 'total_leads',
    QUALIFIED_LEADS: 'qualified_leads',
    CONVERTED_LEADS: 'converted_leads',
    LOST_LEADS: 'lost_leads',
    LEAD_CONVERSION_RATE: 'lead_conversion_rate',

    // Customer Metrics
    TOTAL_CUSTOMERS: 'total_customers',
    NEW_CUSTOMERS: 'new_customers',
    CUSTOMER_ACQUISITION_RATE: 'customer_acquisition_rate',
    CUSTOMER_ACQUISITION_COST: 'customer_acquisition_cost',

    // Channel Metrics
    CHANNEL_ACQUISITIONS: 'channel_acquisitions',
    CHANNEL_CONVERSION_RATE: 'channel_conversion_rate',
    CHANNEL_EFFECTIVENESS: 'channel_effectiveness',

    // Campaign Metrics
    CAMPAIGN_ACQUISITIONS: 'campaign_acquisitions',
    CAMPAIGN_CONVERSION_RATE: 'campaign_conversion_rate',
    CAMPAIGN_ROI: 'campaign_roi',

    // Cost Metrics
    TOTAL_ACQUISITION_COST: 'total_acquisition_cost',
    COST_PER_LEAD: 'cost_per_lead',
    COST_PER_ACQUISITION: 'cost_per_acquisition',
    CAC: 'cac',

    // ROI Metrics
    ROI: 'roi',
    ROAS: 'roas',
    LTV_TO_CAC_RATIO: 'ltv_to_cac_ratio',

    // Comparison Metrics
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',
    PERIOD_COMPARISON: 'period_comparison',
  } as const,

  // Acquisition Analytics Segments
  SEGMENTS: {
    // Channel Segments
    ORGANIC: 'organic',
    PAID: 'paid',
    SOCIAL: 'social',
    SEARCH: 'search',
    DISPLAY: 'display',
    EMAIL: 'email',
    REFERRAL: 'referral',
    DIRECT: 'direct',

    // Cost Segments
    HIGH_COST: 'high_cost',
    MEDIUM_COST: 'medium_cost',
    LOW_COST: 'low_cost',

    // ROI Segments
    HIGH_ROI: 'high_roi',
    MEDIUM_ROI: 'medium_roi',
    LOW_ROI: 'low_roi',
    NEGATIVE_ROI: 'negative_roi',

    // Customer Segments
    HIGH_VALUE: 'high_value',
    MEDIUM_VALUE: 'medium_value',
    LOW_VALUE: 'low_value',

    // Lead Segments
    HOT_LEAD: 'hot_lead',
    WARM_LEAD: 'warm_lead',
    COLD_LEAD: 'cold_lead',
  } as const,

  // Acquisition Analytics Cohorts
  COHORTS: {
    ACQUISITION_DATE: 'acquisition_date',
    ACQUISITION_CHANNEL: 'acquisition_channel',
    ACQUISITION_CAMPAIGN: 'acquisition_campaign',
    CUSTOMER_TYPE: 'customer_type',
    SOURCE: 'source',
  } as const,

  // Acquisition Analytics Granularity
  GRANULARITY: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,
} as const;

// Acquisition Analytics Types
export type AcquisitionAnalyticsType =
  (typeof ACQUISITION_ANALYTICS.TYPES)[keyof typeof ACQUISITION_ANALYTICS.TYPES];

// Acquisition Analytics Status
export type AcquisitionAnalyticsStatus =
  (typeof ACQUISITION_ANALYTICS.STATUS)[keyof typeof ACQUISITION_ANALYTICS.STATUS];

// Acquisition Analytics Scopes
export type AcquisitionAnalyticsScope =
  (typeof ACQUISITION_ANALYTICS.SCOPES)[keyof typeof ACQUISITION_ANALYTICS.SCOPES];

// Acquisition Analytics Events
export type AcquisitionAnalyticsEvent =
  (typeof ACQUISITION_ANALYTICS.EVENTS)[keyof typeof ACQUISITION_ANALYTICS.EVENTS];

// Acquisition Analytics Dimensions
export type AcquisitionAnalyticsDimension =
  (typeof ACQUISITION_ANALYTICS.DIMENSIONS)[keyof typeof ACQUISITION_ANALYTICS.DIMENSIONS];

// Acquisition Analytics Metrics
export type AcquisitionAnalyticsMetric =
  (typeof ACQUISITION_ANALYTICS.METRICS)[keyof typeof ACQUISITION_ANALYTICS.METRICS];

// Acquisition Analytics Segments
export type AcquisitionAnalyticsSegment =
  (typeof ACQUISITION_ANALYTICS.SEGMENTS)[keyof typeof ACQUISITION_ANALYTICS.SEGMENTS];

// Acquisition Analytics Cohorts
export type AcquisitionAnalyticsCohort =
  (typeof ACQUISITION_ANALYTICS.COHORTS)[keyof typeof ACQUISITION_ANALYTICS.COHORTS];

// Acquisition Analytics Granularity
export type AcquisitionAnalyticsGranularity =
  (typeof ACQUISITION_ANALYTICS.GRANULARITY)[keyof typeof ACQUISITION_ANALYTICS.GRANULARITY];

// Acquisition Analytics Status Labels
export function getAcquisitionAnalyticsStatusLabel(status: AcquisitionAnalyticsStatus): string {
  const labels: Record<AcquisitionAnalyticsStatus, string> = {
    [ACQUISITION_ANALYTICS.STATUS.TRACKING]: 'Tracking',
    [ACQUISITION_ANALYTICS.STATUS.PROCESSING]: 'Processing',
    [ACQUISITION_ANALYTICS.STATUS.ANALYZING]: 'Analyzing',
    [ACQUISITION_ANALYTICS.STATUS.COMPLETED]: 'Completed',
    [ACQUISITION_ANALYTICS.STATUS.FAILED]: 'Failed',
    [ACQUISITION_ANALYTICS.STATUS.PAUSED]: 'Paused',
    [ACQUISITION_ANALYTICS.STATUS.STOPPED]: 'Stopped',
    [ACQUISITION_ANALYTICS.STATUS.UPDATING]: 'Updating',
    [ACQUISITION_ANALYTICS.STATUS.REFRESHING]: 'Refreshing',
  };
  return labels[status] || 'Unknown';
}

// Acquisition Analytics Event Labels
export function getAcquisitionAnalyticsEventLabel(event: AcquisitionAnalyticsEvent): string {
  const labels: Record<AcquisitionAnalyticsEvent, string> = {
    [ACQUISITION_ANALYTICS.EVENTS.LEAD_CREATED]: 'Lead Created',
    [ACQUISITION_ANALYTICS.EVENTS.LEAD_UPDATED]: 'Lead Updated',
    [ACQUISITION_ANALYTICS.EVENTS.LEAD_QUALIFIED]: 'Lead Qualified',
    [ACQUISITION_ANALYTICS.EVENTS.LEAD_CONVERTED]: 'Lead Converted',
    [ACQUISITION_ANALYTICS.EVENTS.LEAD_LOST]: 'Lead Lost',
    [ACQUISITION_ANALYTICS.EVENTS.PROSPECT_IDENTIFIED]: 'Prospect Identified',
    [ACQUISITION_ANALYTICS.EVENTS.PROSPECT_ENGAGED]: 'Prospect Engaged',
    [ACQUISITION_ANALYTICS.EVENTS.PROSPECT_CONVERTED]: 'Prospect Converted',
    [ACQUISITION_ANALYTICS.EVENTS.CUSTOMER_ACQUIRED]: 'Customer Acquired',
    [ACQUISITION_ANALYTICS.EVENTS.CUSTOMER_ACTIVATED]: 'Customer Activated',
    [ACQUISITION_ANALYTICS.EVENTS.CUSTOMER_WELCOMED]: 'Customer Welcomed',
    [ACQUISITION_ANALYTICS.EVENTS.CHANNEL_ACQUISITION]: 'Channel Acquisition',
    [ACQUISITION_ANALYTICS.EVENTS.CHANNEL_CONVERSION]: 'Channel Conversion',
    [ACQUISITION_ANALYTICS.EVENTS.CHANNEL_COST]: 'Channel Cost',
    [ACQUISITION_ANALYTICS.EVENTS.CAMPAIGN_STARTED]: 'Campaign Started',
    [ACQUISITION_ANALYTICS.EVENTS.CAMPAIGN_ENDED]: 'Campaign Ended',
    [ACQUISITION_ANALYTICS.EVENTS.CAMPAIGN_CONVERTED]: 'Campaign Converted',
    [ACQUISITION_ANALYTICS.EVENTS.COST_INCURRED]: 'Cost Incurred',
    [ACQUISITION_ANALYTICS.EVENTS.COST_OPTIMIZED]: 'Cost Optimized',
    [ACQUISITION_ANALYTICS.EVENTS.CAC_UPDATED]: 'CAC Updated',
    [ACQUISITION_ANALYTICS.EVENTS.ROI_CALCULATED]: 'ROI Calculated',
    [ACQUISITION_ANALYTICS.EVENTS.ROI_IMPROVED]: 'ROI Improved',
    [ACQUISITION_ANALYTICS.EVENTS.ROI_DECLINED]: 'ROI Declined',
  };
  return labels[event] || 'Unknown';
}

// Acquisition Analytics Dimension Labels
export function getAcquisitionAnalyticsDimensionLabel(
  dimension: AcquisitionAnalyticsDimension
): string {
  const labels: Record<AcquisitionAnalyticsDimension, string> = {
    [ACQUISITION_ANALYTICS.DIMENSIONS.CUSTOMER_ID]: 'Customer ID',
    [ACQUISITION_ANALYTICS.DIMENSIONS.CUSTOMER_NAME]: 'Customer Name',
    [ACQUISITION_ANALYTICS.DIMENSIONS.CUSTOMER_TYPE]: 'Customer Type',
    [ACQUISITION_ANALYTICS.DIMENSIONS.CUSTOMER_SEGMENT]: 'Customer Segment',
    [ACQUISITION_ANALYTICS.DIMENSIONS.LEAD_ID]: 'Lead ID',
    [ACQUISITION_ANALYTICS.DIMENSIONS.LEAD_NAME]: 'Lead Name',
    [ACQUISITION_ANALYTICS.DIMENSIONS.LEAD_STATUS]: 'Lead Status',
    [ACQUISITION_ANALYTICS.DIMENSIONS.LEAD_SOURCE]: 'Lead Source',
    [ACQUISITION_ANALYTICS.DIMENSIONS.CHANNEL]: 'Channel',
    [ACQUISITION_ANALYTICS.DIMENSIONS.CHANNEL_TYPE]: 'Channel Type',
    [ACQUISITION_ANALYTICS.DIMENSIONS.SOURCE]: 'Source',
    [ACQUISITION_ANALYTICS.DIMENSIONS.MEDIUM]: 'Medium',
    [ACQUISITION_ANALYTICS.DIMENSIONS.CAMPAIGN]: 'Campaign',
    [ACQUISITION_ANALYTICS.DIMENSIONS.ACQUISITION_COST]: 'Acquisition Cost',
    [ACQUISITION_ANALYTICS.DIMENSIONS.CAC]: 'CAC',
    [ACQUISITION_ANALYTICS.DIMENSIONS.LTV]: 'LTV',
    [ACQUISITION_ANALYTICS.DIMENSIONS.ROI]: 'ROI',
    [ACQUISITION_ANALYTICS.DIMENSIONS.ACQUISITION_DATE]: 'Acquisition Date',
    [ACQUISITION_ANALYTICS.DIMENSIONS.ACQUISITION_MONTH]: 'Acquisition Month',
    [ACQUISITION_ANALYTICS.DIMENSIONS.ACQUISITION_QUARTER]: 'Acquisition Quarter',
    [ACQUISITION_ANALYTICS.DIMENSIONS.ACQUISITION_YEAR]: 'Acquisition Year',
    [ACQUISITION_ANALYTICS.DIMENSIONS.COUNTRY]: 'Country',
    [ACQUISITION_ANALYTICS.DIMENSIONS.REGION]: 'Region',
    [ACQUISITION_ANALYTICS.DIMENSIONS.CITY]: 'City',
    [ACQUISITION_ANALYTICS.DIMENSIONS.DEVICE_TYPE]: 'Device Type',
    [ACQUISITION_ANALYTICS.DIMENSIONS.BROWSER]: 'Browser',
    [ACQUISITION_ANALYTICS.DIMENSIONS.OS]: 'OS',
  };
  return labels[dimension] || 'Unknown';
}

// Acquisition Analytics Segment Labels
export function getAcquisitionAnalyticsSegmentLabel(segment: AcquisitionAnalyticsSegment): string {
  const labels: Record<AcquisitionAnalyticsSegment, string> = {
    [ACQUISITION_ANALYTICS.SEGMENTS.ORGANIC]: 'Organic',
    [ACQUISITION_ANALYTICS.SEGMENTS.PAID]: 'Paid',
    [ACQUISITION_ANALYTICS.SEGMENTS.SOCIAL]: 'Social',
    [ACQUISITION_ANALYTICS.SEGMENTS.SEARCH]: 'Search',
    [ACQUISITION_ANALYTICS.SEGMENTS.DISPLAY]: 'Display',
    [ACQUISITION_ANALYTICS.SEGMENTS.EMAIL]: 'Email',
    [ACQUISITION_ANALYTICS.SEGMENTS.REFERRAL]: 'Referral',
    [ACQUISITION_ANALYTICS.SEGMENTS.DIRECT]: 'Direct',
    [ACQUISITION_ANALYTICS.SEGMENTS.HIGH_COST]: 'High Cost',
    [ACQUISITION_ANALYTICS.SEGMENTS.MEDIUM_COST]: 'Medium Cost',
    [ACQUISITION_ANALYTICS.SEGMENTS.LOW_COST]: 'Low Cost',
    [ACQUISITION_ANALYTICS.SEGMENTS.HIGH_ROI]: 'High ROI',
    [ACQUISITION_ANALYTICS.SEGMENTS.MEDIUM_ROI]: 'Medium ROI',
    [ACQUISITION_ANALYTICS.SEGMENTS.LOW_ROI]: 'Low ROI',
    [ACQUISITION_ANALYTICS.SEGMENTS.NEGATIVE_ROI]: 'Negative ROI',
    [ACQUISITION_ANALYTICS.SEGMENTS.HIGH_VALUE]: 'High Value',
    [ACQUISITION_ANALYTICS.SEGMENTS.MEDIUM_VALUE]: 'Medium Value',
    [ACQUISITION_ANALYTICS.SEGMENTS.LOW_VALUE]: 'Low Value',
    [ACQUISITION_ANALYTICS.SEGMENTS.HOT_LEAD]: 'Hot Lead',
    [ACQUISITION_ANALYTICS.SEGMENTS.WARM_LEAD]: 'Warm Lead',
    [ACQUISITION_ANALYTICS.SEGMENTS.COLD_LEAD]: 'Cold Lead',
  };
  return labels[segment] || 'Unknown';
}

// Acquisition Analytics Cohort Labels
export function getAcquisitionAnalyticsCohortLabel(cohort: AcquisitionAnalyticsCohort): string {
  const labels: Record<AcquisitionAnalyticsCohort, string> = {
    [ACQUISITION_ANALYTICS.COHORTS.ACQUISITION_DATE]: 'Acquisition Date',
    [ACQUISITION_ANALYTICS.COHORTS.ACQUISITION_CHANNEL]: 'Acquisition Channel',
    [ACQUISITION_ANALYTICS.COHORTS.ACQUISITION_CAMPAIGN]: 'Acquisition Campaign',
    [ACQUISITION_ANALYTICS.COHORTS.CUSTOMER_TYPE]: 'Customer Type',
    [ACQUISITION_ANALYTICS.COHORTS.SOURCE]: 'Source',
  };
  return labels[cohort] || 'Unknown';
}

// Acquisition Analytics Granularity Labels
export function getAcquisitionAnalyticsGranularityLabel(
  granularity: AcquisitionAnalyticsGranularity
): string {
  const labels: Record<AcquisitionAnalyticsGranularity, string> = {
    [ACQUISITION_ANALYTICS.GRANULARITY.DAILY]: 'Daily',
    [ACQUISITION_ANALYTICS.GRANULARITY.WEEKLY]: 'Weekly',
    [ACQUISITION_ANALYTICS.GRANULARITY.MONTHLY]: 'Monthly',
    [ACQUISITION_ANALYTICS.GRANULARITY.QUARTERLY]: 'Quarterly',
    [ACQUISITION_ANALYTICS.GRANULARITY.YEARLY]: 'Yearly',
  };
  return labels[granularity] || 'Unknown';
}

// Check if acquisition analytics is active
export function isAcquisitionAnalyticsActive(status: AcquisitionAnalyticsStatus): boolean {
  const activeStatuses: AcquisitionAnalyticsStatus[] = [
    ACQUISITION_ANALYTICS.STATUS.TRACKING,
    ACQUISITION_ANALYTICS.STATUS.PROCESSING,
    ACQUISITION_ANALYTICS.STATUS.ANALYZING,
    ACQUISITION_ANALYTICS.STATUS.UPDATING,
    ACQUISITION_ANALYTICS.STATUS.REFRESHING,
  ];
  return activeStatuses.includes(status);
}

// Check if acquisition analytics is completed
export function isAcquisitionAnalyticsCompleted(status: AcquisitionAnalyticsStatus): boolean {
  return status === ACQUISITION_ANALYTICS.STATUS.COMPLETED;
}

// Check if acquisition analytics has failed
export function isAcquisitionAnalyticsFailed(status: AcquisitionAnalyticsStatus): boolean {
  return status === ACQUISITION_ANALYTICS.STATUS.FAILED;
}

// Check if event is lead event
export function isAcquisitionAnalyticsLeadEvent(event: AcquisitionAnalyticsEvent): boolean {
  const leadEvents: AcquisitionAnalyticsEvent[] = [
    ACQUISITION_ANALYTICS.EVENTS.LEAD_CREATED,
    ACQUISITION_ANALYTICS.EVENTS.LEAD_UPDATED,
    ACQUISITION_ANALYTICS.EVENTS.LEAD_QUALIFIED,
    ACQUISITION_ANALYTICS.EVENTS.LEAD_CONVERTED,
    ACQUISITION_ANALYTICS.EVENTS.LEAD_LOST,
  ];
  return leadEvents.includes(event);
}

// Check if event is customer event
export function isAcquisitionAnalyticsCustomerEvent(event: AcquisitionAnalyticsEvent): boolean {
  const customerEvents: AcquisitionAnalyticsEvent[] = [
    ACQUISITION_ANALYTICS.EVENTS.CUSTOMER_ACQUIRED,
    ACQUISITION_ANALYTICS.EVENTS.CUSTOMER_ACTIVATED,
    ACQUISITION_ANALYTICS.EVENTS.CUSTOMER_WELCOMED,
  ];
  return customerEvents.includes(event);
}

// Check if event is channel event
export function isAcquisitionAnalyticsChannelEvent(event: AcquisitionAnalyticsEvent): boolean {
  const channelEvents: AcquisitionAnalyticsEvent[] = [
    ACQUISITION_ANALYTICS.EVENTS.CHANNEL_ACQUISITION,
    ACQUISITION_ANALYTICS.EVENTS.CHANNEL_CONVERSION,
    ACQUISITION_ANALYTICS.EVENTS.CHANNEL_COST,
  ];
  return channelEvents.includes(event);
}
