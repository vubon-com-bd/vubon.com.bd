/**
 * Vendor Analytics Constants
 * Configuration for vendor performance analytics and tracking
 */

export const VENDOR_ANALYTICS = {
  // Vendor Analytics Types
  TYPES: {
    // Performance Analytics
    PERFORMANCE: 'performance',
    SALES: 'sales',
    REVENUE: 'revenue',
    PROFIT: 'profit',
    MARGIN: 'margin',

    // Vendor Metrics
    VENDOR: 'vendor',
    SUPPLIER: 'supplier',
    RATING: 'rating',
    COMPLIANCE: 'compliance',
    QUALITY: 'quality',

    // Product Analytics
    PRODUCTS: 'products',
    INVENTORY: 'inventory',
    FULFILLMENT: 'fulfillment',
    DELIVERY: 'delivery',

    // Financial Analytics
    FINANCIAL: 'financial',
    PAYMENT: 'payment',
    COMMISSION: 'commission',
    SETTLEMENT: 'settlement',

    // Relationship Analytics
    RELATIONSHIP: 'relationship',
    COMMUNICATION: 'communication',
    SATISFACTION: 'satisfaction',
    RETENTION: 'retention',

    // Time Analytics
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,

  // Vendor Analytics Status
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

  // Vendor Analytics Scopes
  SCOPES: {
    INDIVIDUAL: 'individual',
    CATEGORY: 'category',
    TIER: 'tier',
    REGION: 'region',
    ALL_VENDORS: 'all_vendors',
    TOP_VENDORS: 'top_vendors',
    ACTIVE_VENDORS: 'active_vendors',
    PENDING_VENDORS: 'pending_vendors',
    COMPARATIVE: 'comparative',
  } as const,

  // Vendor Analytics Events
  EVENTS: {
    // Vendor Lifecycle Events
    VENDOR_REGISTERED: 'vendor_registered',
    VENDOR_APPROVED: 'vendor_approved',
    VENDOR_REJECTED: 'vendor_rejected',
    VENDOR_SUSPENDED: 'vendor_suspended',
    VENDOR_ACTIVATED: 'vendor_activated',
    VENDOR_DEACTIVATED: 'vendor_deactivated',
    VENDOR_TERMINATED: 'vendor_terminated',

    // Vendor Performance Events
    VENDOR_SALE: 'vendor_sale',
    VENDOR_ORDER: 'vendor_order',
    VENDOR_RETURN: 'vendor_return',
    VENDOR_REFUND: 'vendor_refund',

    // Vendor Product Events
    PRODUCT_ADDED: 'product_added',
    PRODUCT_UPDATED: 'product_updated',
    PRODUCT_DELETED: 'product_deleted',
    PRODUCT_PUBLISHED: 'product_published',
    PRODUCT_UNPUBLISHED: 'product_unpublished',

    // Vendor Financial Events
    PAYMENT_RECEIVED: 'payment_received',
    PAYMENT_PROCESSED: 'payment_processed',
    COMMISSION_CALCULATED: 'commission_calculated',
    SETTLEMENT_COMPLETED: 'settlement_completed',
    INVOICE_GENERATED: 'invoice_generated',
    INVOICE_PAID: 'invoice_paid',

    // Vendor Compliance Events
    COMPLIANCE_CHECK: 'compliance_check',
    COMPLIANCE_PASSED: 'compliance_passed',
    COMPLIANCE_FAILED: 'compliance_failed',
    AUDIT_COMPLETED: 'audit_completed',

    // Vendor Quality Events
    QUALITY_CHECK: 'quality_check',
    QUALITY_PASSED: 'quality_passed',
    QUALITY_FAILED: 'quality_failed',
    RATING_UPDATED: 'rating_updated',
    REVIEW_RECEIVED: 'review_received',

    // Vendor Communication Events
    CONTACTED: 'contacted',
    FOLLOW_UP: 'follow_up',
    MEETING_SCHEDULED: 'meeting_scheduled',
    MEETING_COMPLETED: 'meeting_completed',
  } as const,

  // Vendor Analytics Dimensions
  DIMENSIONS: {
    // Vendor Attributes
    VENDOR_ID: 'vendor_id',
    VENDOR_NAME: 'vendor_name',
    VENDOR_TYPE: 'vendor_type',
    VENDOR_TIER: 'vendor_tier',
    VENDOR_STATUS: 'vendor_status',
    VENDOR_CATEGORY: 'vendor_category',

    // Contact Attributes
    CONTACT_NAME: 'contact_name',
    CONTACT_EMAIL: 'contact_email',
    CONTACT_PHONE: 'contact_phone',
    CONTACT_ROLE: 'contact_role',

    // Location Attributes
    COUNTRY: 'country',
    REGION: 'region',
    CITY: 'city',
    ADDRESS: 'address',

    // Product Attributes
    PRODUCT_ID: 'product_id',
    PRODUCT_NAME: 'product_name',
    PRODUCT_CATEGORY: 'product_category',
    PRODUCT_COUNT: 'product_count',

    // Financial Attributes
    TOTAL_SALES: 'total_sales',
    TOTAL_REVENUE: 'total_revenue',
    TOTAL_COMMISSION: 'total_commission',
    PAYMENT_STATUS: 'payment_status',
    SETTLEMENT_STATUS: 'settlement_status',

    // Performance Attributes
    RATING: 'rating',
    REVIEW_COUNT: 'review_count',
    FULFILLMENT_RATE: 'fulfillment_rate',
    DELIVERY_RATE: 'delivery_rate',
    RETURN_RATE: 'return_rate',

    // Time Attributes
    REGISTERED_DATE: 'registered_date',
    APPROVED_DATE: 'approved_date',
    LAST_ACTIVE_DATE: 'last_active_date',
    SALE_DATE: 'sale_date',
    SALE_MONTH: 'sale_month',
    SALE_QUARTER: 'sale_quarter',
    SALE_YEAR: 'sale_year',

    // Relationship Attributes
    PARTNERSHIP_DURATION: 'partnership_duration',
    COMMUNICATION_FREQUENCY: 'communication_frequency',
    SATISFACTION_LEVEL: 'satisfaction_level',
  } as const,

  // Vendor Analytics Metrics
  METRICS: {
    // Vendor Count Metrics
    TOTAL_VENDORS: 'total_vendors',
    ACTIVE_VENDORS: 'active_vendors',
    INACTIVE_VENDORS: 'inactive_vendors',
    PENDING_VENDORS: 'pending_vendors',
    APPROVED_VENDORS: 'approved_vendors',
    SUSPENDED_VENDORS: 'suspended_vendors',
    NEW_VENDORS: 'new_vendors',

    // Vendor Revenue Metrics
    TOTAL_REVENUE: 'total_revenue',
    AVG_REVENUE_PER_VENDOR: 'avg_revenue_per_vendor',
    REVENUE_GROWTH: 'revenue_growth',
    REVENUE_SHARE: 'revenue_share',

    // Vendor Sales Metrics
    TOTAL_SALES: 'total_sales',
    AVG_SALES_PER_VENDOR: 'avg_sales_per_vendor',
    SALES_GROWTH: 'sales_growth',
    UNITS_SOLD: 'units_sold',

    // Vendor Profit Metrics
    TOTAL_PROFIT: 'total_profit',
    AVG_PROFIT_PER_VENDOR: 'avg_profit_per_vendor',
    PROFIT_MARGIN: 'profit_margin',

    // Vendor Commission Metrics
    TOTAL_COMMISSION: 'total_commission',
    AVG_COMMISSION_RATE: 'avg_commission_rate',
    COMMISSION_EARNED: 'commission_earned',

    // Vendor Quality Metrics
    AVG_RATING: 'avg_rating',
    TOTAL_REVIEWS: 'total_reviews',
    POSITIVE_REVIEW_RATE: 'positive_review_rate',
    NEGATIVE_REVIEW_RATE: 'negative_review_rate',
    FULFILLMENT_RATE: 'fulfillment_rate',
    DELIVERY_RATE: 'delivery_rate',
    RETURN_RATE: 'return_rate',

    // Vendor Compliance Metrics
    COMPLIANCE_RATE: 'compliance_rate',
    COMPLIANCE_SCORE: 'compliance_score',
    AUDIT_RATE: 'audit_rate',

    // Vendor Time Metrics
    AVG_APPROVAL_TIME: 'avg_approval_time',
    AVG_RESPONSE_TIME: 'avg_response_time',
    AVG_FULFILLMENT_TIME: 'avg_fulfillment_time',
    AVG_DELIVERY_TIME: 'avg_delivery_time',
    PARTNERSHIP_DURATION: 'partnership_duration',

    // Vendor Comparison Metrics
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',
    TIER_COMPARISON: 'tier_comparison',
    CATEGORY_COMPARISON: 'category_comparison',
  } as const,

  // Vendor Analytics Segments
  SEGMENTS: {
    // Tier Segments
    TIER_1: 'tier_1',
    TIER_2: 'tier_2',
    TIER_3: 'tier_3',
    TIER_4: 'tier_4',

    // Status Segments
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    SUSPENDED: 'suspended',
    TERMINATED: 'terminated',

    // Performance Segments
    TOP_PERFORMING: 'top_performing',
    AVERAGE_PERFORMING: 'average_performing',
    LOW_PERFORMING: 'low_performing',
    HIGH_RATED: 'high_rated',
    LOW_RATED: 'low_rated',

    // Category Segments
    ELECTRONICS: 'electronics',
    FASHION: 'fashion',
    HOME: 'home',
    BEAUTY: 'beauty',
    FOOD: 'food',

    // Location Segments
    DOMESTIC: 'domestic',
    INTERNATIONAL: 'international',
    LOCAL: 'local',
  } as const,

  // Vendor Analytics Cohorts
  COHORTS: {
    REGISTRATION_DATE: 'registration_date',
    APPROVAL_DATE: 'approval_date',
    TIER: 'tier',
    CATEGORY: 'category',
    LOCATION: 'location',
    FIRST_SALE_DATE: 'first_sale_date',
  } as const,

  // Vendor Analytics Granularity
  GRANULARITY: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,
} as const;

// Vendor Analytics Types
export type VendorAnalyticsType =
  (typeof VENDOR_ANALYTICS.TYPES)[keyof typeof VENDOR_ANALYTICS.TYPES];

// Vendor Analytics Status
export type VendorAnalyticsStatus =
  (typeof VENDOR_ANALYTICS.STATUS)[keyof typeof VENDOR_ANALYTICS.STATUS];

// Vendor Analytics Scopes
export type VendorAnalyticsScope =
  (typeof VENDOR_ANALYTICS.SCOPES)[keyof typeof VENDOR_ANALYTICS.SCOPES];

// Vendor Analytics Events
export type VendorAnalyticsEvent =
  (typeof VENDOR_ANALYTICS.EVENTS)[keyof typeof VENDOR_ANALYTICS.EVENTS];

// Vendor Analytics Dimensions
export type VendorAnalyticsDimension =
  (typeof VENDOR_ANALYTICS.DIMENSIONS)[keyof typeof VENDOR_ANALYTICS.DIMENSIONS];

// Vendor Analytics Metrics
export type VendorAnalyticsMetric =
  (typeof VENDOR_ANALYTICS.METRICS)[keyof typeof VENDOR_ANALYTICS.METRICS];

// Vendor Analytics Segments
export type VendorAnalyticsSegment =
  (typeof VENDOR_ANALYTICS.SEGMENTS)[keyof typeof VENDOR_ANALYTICS.SEGMENTS];

// Vendor Analytics Cohorts
export type VendorAnalyticsCohort =
  (typeof VENDOR_ANALYTICS.COHORTS)[keyof typeof VENDOR_ANALYTICS.COHORTS];

// Vendor Analytics Granularity
export type VendorAnalyticsGranularity =
  (typeof VENDOR_ANALYTICS.GRANULARITY)[keyof typeof VENDOR_ANALYTICS.GRANULARITY];

// Vendor Analytics Status Labels
export function getVendorAnalyticsStatusLabel(status: VendorAnalyticsStatus): string {
  const labels: Record<VendorAnalyticsStatus, string> = {
    [VENDOR_ANALYTICS.STATUS.TRACKING]: 'Tracking',
    [VENDOR_ANALYTICS.STATUS.PROCESSING]: 'Processing',
    [VENDOR_ANALYTICS.STATUS.ANALYZING]: 'Analyzing',
    [VENDOR_ANALYTICS.STATUS.COMPLETED]: 'Completed',
    [VENDOR_ANALYTICS.STATUS.FAILED]: 'Failed',
    [VENDOR_ANALYTICS.STATUS.PAUSED]: 'Paused',
    [VENDOR_ANALYTICS.STATUS.STOPPED]: 'Stopped',
    [VENDOR_ANALYTICS.STATUS.UPDATING]: 'Updating',
    [VENDOR_ANALYTICS.STATUS.REFRESHING]: 'Refreshing',
  };
  return labels[status] || 'Unknown';
}

// Vendor Analytics Event Labels
export function getVendorAnalyticsEventLabel(event: VendorAnalyticsEvent): string {
  const labels: Record<VendorAnalyticsEvent, string> = {
    [VENDOR_ANALYTICS.EVENTS.VENDOR_REGISTERED]: 'Vendor Registered',
    [VENDOR_ANALYTICS.EVENTS.VENDOR_APPROVED]: 'Vendor Approved',
    [VENDOR_ANALYTICS.EVENTS.VENDOR_REJECTED]: 'Vendor Rejected',
    [VENDOR_ANALYTICS.EVENTS.VENDOR_SUSPENDED]: 'Vendor Suspended',
    [VENDOR_ANALYTICS.EVENTS.VENDOR_ACTIVATED]: 'Vendor Activated',
    [VENDOR_ANALYTICS.EVENTS.VENDOR_DEACTIVATED]: 'Vendor Deactivated',
    [VENDOR_ANALYTICS.EVENTS.VENDOR_TERMINATED]: 'Vendor Terminated',
    [VENDOR_ANALYTICS.EVENTS.VENDOR_SALE]: 'Vendor Sale',
    [VENDOR_ANALYTICS.EVENTS.VENDOR_ORDER]: 'Vendor Order',
    [VENDOR_ANALYTICS.EVENTS.VENDOR_RETURN]: 'Vendor Return',
    [VENDOR_ANALYTICS.EVENTS.VENDOR_REFUND]: 'Vendor Refund',
    [VENDOR_ANALYTICS.EVENTS.PRODUCT_ADDED]: 'Product Added',
    [VENDOR_ANALYTICS.EVENTS.PRODUCT_UPDATED]: 'Product Updated',
    [VENDOR_ANALYTICS.EVENTS.PRODUCT_DELETED]: 'Product Deleted',
    [VENDOR_ANALYTICS.EVENTS.PRODUCT_PUBLISHED]: 'Product Published',
    [VENDOR_ANALYTICS.EVENTS.PRODUCT_UNPUBLISHED]: 'Product Unpublished',
    [VENDOR_ANALYTICS.EVENTS.PAYMENT_RECEIVED]: 'Payment Received',
    [VENDOR_ANALYTICS.EVENTS.PAYMENT_PROCESSED]: 'Payment Processed',
    [VENDOR_ANALYTICS.EVENTS.COMMISSION_CALCULATED]: 'Commission Calculated',
    [VENDOR_ANALYTICS.EVENTS.SETTLEMENT_COMPLETED]: 'Settlement Completed',
    [VENDOR_ANALYTICS.EVENTS.INVOICE_GENERATED]: 'Invoice Generated',
    [VENDOR_ANALYTICS.EVENTS.INVOICE_PAID]: 'Invoice Paid',
    [VENDOR_ANALYTICS.EVENTS.COMPLIANCE_CHECK]: 'Compliance Check',
    [VENDOR_ANALYTICS.EVENTS.COMPLIANCE_PASSED]: 'Compliance Passed',
    [VENDOR_ANALYTICS.EVENTS.COMPLIANCE_FAILED]: 'Compliance Failed',
    [VENDOR_ANALYTICS.EVENTS.AUDIT_COMPLETED]: 'Audit Completed',
    [VENDOR_ANALYTICS.EVENTS.QUALITY_CHECK]: 'Quality Check',
    [VENDOR_ANALYTICS.EVENTS.QUALITY_PASSED]: 'Quality Passed',
    [VENDOR_ANALYTICS.EVENTS.QUALITY_FAILED]: 'Quality Failed',
    [VENDOR_ANALYTICS.EVENTS.RATING_UPDATED]: 'Rating Updated',
    [VENDOR_ANALYTICS.EVENTS.REVIEW_RECEIVED]: 'Review Received',
    [VENDOR_ANALYTICS.EVENTS.CONTACTED]: 'Contacted',
    [VENDOR_ANALYTICS.EVENTS.FOLLOW_UP]: 'Follow Up',
    [VENDOR_ANALYTICS.EVENTS.MEETING_SCHEDULED]: 'Meeting Scheduled',
    [VENDOR_ANALYTICS.EVENTS.MEETING_COMPLETED]: 'Meeting Completed',
  };
  return labels[event] || 'Unknown';
}

// Vendor Analytics Dimension Labels
export function getVendorAnalyticsDimensionLabel(dimension: VendorAnalyticsDimension): string {
  const labels: Record<VendorAnalyticsDimension, string> = {
    [VENDOR_ANALYTICS.DIMENSIONS.VENDOR_ID]: 'Vendor ID',
    [VENDOR_ANALYTICS.DIMENSIONS.VENDOR_NAME]: 'Vendor Name',
    [VENDOR_ANALYTICS.DIMENSIONS.VENDOR_TYPE]: 'Vendor Type',
    [VENDOR_ANALYTICS.DIMENSIONS.VENDOR_TIER]: 'Vendor Tier',
    [VENDOR_ANALYTICS.DIMENSIONS.VENDOR_STATUS]: 'Vendor Status',
    [VENDOR_ANALYTICS.DIMENSIONS.VENDOR_CATEGORY]: 'Vendor Category',
    [VENDOR_ANALYTICS.DIMENSIONS.CONTACT_NAME]: 'Contact Name',
    [VENDOR_ANALYTICS.DIMENSIONS.CONTACT_EMAIL]: 'Contact Email',
    [VENDOR_ANALYTICS.DIMENSIONS.CONTACT_PHONE]: 'Contact Phone',
    [VENDOR_ANALYTICS.DIMENSIONS.CONTACT_ROLE]: 'Contact Role',
    [VENDOR_ANALYTICS.DIMENSIONS.COUNTRY]: 'Country',
    [VENDOR_ANALYTICS.DIMENSIONS.REGION]: 'Region',
    [VENDOR_ANALYTICS.DIMENSIONS.CITY]: 'City',
    [VENDOR_ANALYTICS.DIMENSIONS.ADDRESS]: 'Address',
    [VENDOR_ANALYTICS.DIMENSIONS.PRODUCT_ID]: 'Product ID',
    [VENDOR_ANALYTICS.DIMENSIONS.PRODUCT_NAME]: 'Product Name',
    [VENDOR_ANALYTICS.DIMENSIONS.PRODUCT_CATEGORY]: 'Product Category',
    [VENDOR_ANALYTICS.DIMENSIONS.PRODUCT_COUNT]: 'Product Count',
    [VENDOR_ANALYTICS.DIMENSIONS.TOTAL_SALES]: 'Total Sales',
    [VENDOR_ANALYTICS.DIMENSIONS.TOTAL_REVENUE]: 'Total Revenue',
    [VENDOR_ANALYTICS.DIMENSIONS.TOTAL_COMMISSION]: 'Total Commission',
    [VENDOR_ANALYTICS.DIMENSIONS.PAYMENT_STATUS]: 'Payment Status',
    [VENDOR_ANALYTICS.DIMENSIONS.SETTLEMENT_STATUS]: 'Settlement Status',
    [VENDOR_ANALYTICS.DIMENSIONS.RATING]: 'Rating',
    [VENDOR_ANALYTICS.DIMENSIONS.REVIEW_COUNT]: 'Review Count',
    [VENDOR_ANALYTICS.DIMENSIONS.FULFILLMENT_RATE]: 'Fulfillment Rate',
    [VENDOR_ANALYTICS.DIMENSIONS.DELIVERY_RATE]: 'Delivery Rate',
    [VENDOR_ANALYTICS.DIMENSIONS.RETURN_RATE]: 'Return Rate',
    [VENDOR_ANALYTICS.DIMENSIONS.REGISTERED_DATE]: 'Registered Date',
    [VENDOR_ANALYTICS.DIMENSIONS.APPROVED_DATE]: 'Approved Date',
    [VENDOR_ANALYTICS.DIMENSIONS.LAST_ACTIVE_DATE]: 'Last Active Date',
    [VENDOR_ANALYTICS.DIMENSIONS.SALE_DATE]: 'Sale Date',
    [VENDOR_ANALYTICS.DIMENSIONS.SALE_MONTH]: 'Sale Month',
    [VENDOR_ANALYTICS.DIMENSIONS.SALE_QUARTER]: 'Sale Quarter',
    [VENDOR_ANALYTICS.DIMENSIONS.SALE_YEAR]: 'Sale Year',
    [VENDOR_ANALYTICS.DIMENSIONS.PARTNERSHIP_DURATION]: 'Partnership Duration',
    [VENDOR_ANALYTICS.DIMENSIONS.COMMUNICATION_FREQUENCY]: 'Communication Frequency',
    [VENDOR_ANALYTICS.DIMENSIONS.SATISFACTION_LEVEL]: 'Satisfaction Level',
  };
  return labels[dimension] || 'Unknown';
}

// Vendor Analytics Segment Labels
export function getVendorAnalyticsSegmentLabel(segment: VendorAnalyticsSegment): string {
  const labels: Record<VendorAnalyticsSegment, string> = {
    [VENDOR_ANALYTICS.SEGMENTS.TIER_1]: 'Tier 1',
    [VENDOR_ANALYTICS.SEGMENTS.TIER_2]: 'Tier 2',
    [VENDOR_ANALYTICS.SEGMENTS.TIER_3]: 'Tier 3',
    [VENDOR_ANALYTICS.SEGMENTS.TIER_4]: 'Tier 4',
    [VENDOR_ANALYTICS.SEGMENTS.ACTIVE]: 'Active',
    [VENDOR_ANALYTICS.SEGMENTS.INACTIVE]: 'Inactive',
    [VENDOR_ANALYTICS.SEGMENTS.PENDING]: 'Pending',
    [VENDOR_ANALYTICS.SEGMENTS.SUSPENDED]: 'Suspended',
    [VENDOR_ANALYTICS.SEGMENTS.TERMINATED]: 'Terminated',
    [VENDOR_ANALYTICS.SEGMENTS.TOP_PERFORMING]: 'Top Performing',
    [VENDOR_ANALYTICS.SEGMENTS.AVERAGE_PERFORMING]: 'Average Performing',
    [VENDOR_ANALYTICS.SEGMENTS.LOW_PERFORMING]: 'Low Performing',
    [VENDOR_ANALYTICS.SEGMENTS.HIGH_RATED]: 'High Rated',
    [VENDOR_ANALYTICS.SEGMENTS.LOW_RATED]: 'Low Rated',
    [VENDOR_ANALYTICS.SEGMENTS.ELECTRONICS]: 'Electronics',
    [VENDOR_ANALYTICS.SEGMENTS.FASHION]: 'Fashion',
    [VENDOR_ANALYTICS.SEGMENTS.HOME]: 'Home',
    [VENDOR_ANALYTICS.SEGMENTS.BEAUTY]: 'Beauty',
    [VENDOR_ANALYTICS.SEGMENTS.FOOD]: 'Food',
    [VENDOR_ANALYTICS.SEGMENTS.DOMESTIC]: 'Domestic',
    [VENDOR_ANALYTICS.SEGMENTS.INTERNATIONAL]: 'International',
    [VENDOR_ANALYTICS.SEGMENTS.LOCAL]: 'Local',
  };
  return labels[segment] || 'Unknown';
}

// Vendor Analytics Cohort Labels
export function getVendorAnalyticsCohortLabel(cohort: VendorAnalyticsCohort): string {
  const labels: Record<VendorAnalyticsCohort, string> = {
    [VENDOR_ANALYTICS.COHORTS.REGISTRATION_DATE]: 'Registration Date',
    [VENDOR_ANALYTICS.COHORTS.APPROVAL_DATE]: 'Approval Date',
    [VENDOR_ANALYTICS.COHORTS.TIER]: 'Tier',
    [VENDOR_ANALYTICS.COHORTS.CATEGORY]: 'Category',
    [VENDOR_ANALYTICS.COHORTS.LOCATION]: 'Location',
    [VENDOR_ANALYTICS.COHORTS.FIRST_SALE_DATE]: 'First Sale Date',
  };
  return labels[cohort] || 'Unknown';
}

// Vendor Analytics Granularity Labels
export function getVendorAnalyticsGranularityLabel(
  granularity: VendorAnalyticsGranularity
): string {
  const labels: Record<VendorAnalyticsGranularity, string> = {
    [VENDOR_ANALYTICS.GRANULARITY.DAILY]: 'Daily',
    [VENDOR_ANALYTICS.GRANULARITY.WEEKLY]: 'Weekly',
    [VENDOR_ANALYTICS.GRANULARITY.MONTHLY]: 'Monthly',
    [VENDOR_ANALYTICS.GRANULARITY.QUARTERLY]: 'Quarterly',
    [VENDOR_ANALYTICS.GRANULARITY.YEARLY]: 'Yearly',
  };
  return labels[granularity] || 'Unknown';
}

// Check if vendor analytics is active
export function isVendorAnalyticsActive(status: VendorAnalyticsStatus): boolean {
  const activeStatuses: VendorAnalyticsStatus[] = [
    VENDOR_ANALYTICS.STATUS.TRACKING,
    VENDOR_ANALYTICS.STATUS.PROCESSING,
    VENDOR_ANALYTICS.STATUS.ANALYZING,
    VENDOR_ANALYTICS.STATUS.UPDATING,
    VENDOR_ANALYTICS.STATUS.REFRESHING,
  ];
  return activeStatuses.includes(status);
}

// Check if vendor analytics is completed
export function isVendorAnalyticsCompleted(status: VendorAnalyticsStatus): boolean {
  return status === VENDOR_ANALYTICS.STATUS.COMPLETED;
}

// Check if vendor analytics has failed
export function isVendorAnalyticsFailed(status: VendorAnalyticsStatus): boolean {
  return status === VENDOR_ANALYTICS.STATUS.FAILED;
}

// Check if event is vendor lifecycle event
export function isVendorAnalyticsLifecycleEvent(event: VendorAnalyticsEvent): boolean {
  const lifecycleEvents: VendorAnalyticsEvent[] = [
    VENDOR_ANALYTICS.EVENTS.VENDOR_REGISTERED,
    VENDOR_ANALYTICS.EVENTS.VENDOR_APPROVED,
    VENDOR_ANALYTICS.EVENTS.VENDOR_REJECTED,
    VENDOR_ANALYTICS.EVENTS.VENDOR_SUSPENDED,
    VENDOR_ANALYTICS.EVENTS.VENDOR_ACTIVATED,
    VENDOR_ANALYTICS.EVENTS.VENDOR_DEACTIVATED,
    VENDOR_ANALYTICS.EVENTS.VENDOR_TERMINATED,
  ];
  return lifecycleEvents.includes(event);
}

// Check if event is vendor financial event
export function isVendorAnalyticsFinancialEvent(event: VendorAnalyticsEvent): boolean {
  const financialEvents: VendorAnalyticsEvent[] = [
    VENDOR_ANALYTICS.EVENTS.PAYMENT_RECEIVED,
    VENDOR_ANALYTICS.EVENTS.PAYMENT_PROCESSED,
    VENDOR_ANALYTICS.EVENTS.COMMISSION_CALCULATED,
    VENDOR_ANALYTICS.EVENTS.SETTLEMENT_COMPLETED,
    VENDOR_ANALYTICS.EVENTS.INVOICE_GENERATED,
    VENDOR_ANALYTICS.EVENTS.INVOICE_PAID,
  ];
  return financialEvents.includes(event);
}

// Check if event is vendor quality event
export function isVendorAnalyticsQualityEvent(event: VendorAnalyticsEvent): boolean {
  const qualityEvents: VendorAnalyticsEvent[] = [
    VENDOR_ANALYTICS.EVENTS.QUALITY_CHECK,
    VENDOR_ANALYTICS.EVENTS.QUALITY_PASSED,
    VENDOR_ANALYTICS.EVENTS.QUALITY_FAILED,
    VENDOR_ANALYTICS.EVENTS.RATING_UPDATED,
    VENDOR_ANALYTICS.EVENTS.REVIEW_RECEIVED,
  ];
  return qualityEvents.includes(event);
}

// Check if event is vendor compliance event
export function isVendorAnalyticsComplianceEvent(event: VendorAnalyticsEvent): boolean {
  const complianceEvents: VendorAnalyticsEvent[] = [
    VENDOR_ANALYTICS.EVENTS.COMPLIANCE_CHECK,
    VENDOR_ANALYTICS.EVENTS.COMPLIANCE_PASSED,
    VENDOR_ANALYTICS.EVENTS.COMPLIANCE_FAILED,
    VENDOR_ANALYTICS.EVENTS.AUDIT_COMPLETED,
  ];
  return complianceEvents.includes(event);
}
