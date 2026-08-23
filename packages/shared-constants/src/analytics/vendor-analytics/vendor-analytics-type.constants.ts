/**
 * Vendor Analytics Type Constants
 * Types of vendor analytics data and analysis
 */

export const VENDOR_ANALYTICS_TYPE = {
  // Analysis Types
  ANALYSIS_TYPES: {
    // Performance Analysis
    PERFORMANCE: 'performance',
    VENDOR_PERFORMANCE: 'vendor_performance',
    SALES_PERFORMANCE: 'sales_performance',
    REVENUE_PERFORMANCE: 'revenue_performance',
    PROFIT_PERFORMANCE: 'profit_performance',

    // Quality Analysis
    QUALITY_ANALYSIS: 'quality_analysis',
    RATING_ANALYSIS: 'rating_analysis',
    REVIEW_ANALYSIS: 'review_analysis',
    COMPLIANCE_ANALYSIS: 'compliance_analysis',

    // Financial Analysis
    FINANCIAL_ANALYSIS: 'financial_analysis',
    PAYMENT_ANALYSIS: 'payment_analysis',
    COMMISSION_ANALYSIS: 'commission_analysis',
    SETTLEMENT_ANALYSIS: 'settlement_analysis',

    // Relationship Analysis
    RELATIONSHIP_ANALYSIS: 'relationship_analysis',
    COMMUNICATION_ANALYSIS: 'communication_analysis',
    SATISFACTION_ANALYSIS: 'satisfaction_analysis',
    RETENTION_ANALYSIS: 'retention_analysis',

    // Product Analysis
    PRODUCT_ANALYSIS: 'product_analysis',
    INVENTORY_ANALYSIS: 'inventory_analysis',
    FULFILLMENT_ANALYSIS: 'fulfillment_analysis',
    DELIVERY_ANALYSIS: 'delivery_analysis',

    // Comparative Analysis
    COMPARATIVE: 'comparative',
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',

    // Predictive Analysis
    PREDICTIVE: 'predictive',
    FORECAST: 'forecast',
    TREND: 'trend',
    RISK: 'risk',
  } as const,

  // Data Types
  DATA_TYPES: {
    VENDOR_DATA: 'vendor_data',
    VENDOR_PROFILE: 'vendor_profile',
    VENDOR_PERFORMANCE_DATA: 'vendor_performance_data',

    PRODUCT_DATA: 'product_data',
    INVENTORY_DATA: 'inventory_data',

    FINANCIAL_DATA: 'financial_data',
    PAYMENT_DATA: 'payment_data',
    COMMISSION_DATA: 'commission_data',
    SETTLEMENT_DATA: 'settlement_data',

    QUALITY_DATA: 'quality_data',
    REVIEW_DATA: 'review_data',
    RATING_DATA: 'rating_data',

    COMPLIANCE_DATA: 'compliance_data',
    AUDIT_DATA: 'audit_data',

    RELATIONSHIP_DATA: 'relationship_data',
    COMMUNICATION_DATA: 'communication_data',

    TIME_SERIES: 'time_series',
    AGGREGATED: 'aggregated',
    RAW: 'raw',
  } as const,

  // Vendor Status
  VENDOR_STATUS: {
    PENDING: 'pending',
    PENDING_APPROVAL: 'pending_approval',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended',
    TERMINATED: 'terminated',
    ON_HOLD: 'on_hold',
    UNDER_REVIEW: 'under_review',
  } as const,

  // Vendor Types
  VENDOR_TYPES: {
    INDIVIDUAL: 'individual',
    BUSINESS: 'business',
    ENTERPRISE: 'enterprise',
    SOLE_PROPRIETORSHIP: 'sole_proprietorship',
    PARTNERSHIP: 'partnership',
    LLC: 'llc',
    CORPORATION: 'corporation',
    NON_PROFIT: 'non_profit',
  } as const,

  // Vendor Tiers
  VENDOR_TIERS: {
    TIER_1: 'tier_1',
    TIER_2: 'tier_2',
    TIER_3: 'tier_3',
    TIER_4: 'tier_4',
    PREMIUM: 'premium',
    STANDARD: 'standard',
    BASIC: 'basic',
  } as const,

  // Vendor Performance Levels
  PERFORMANCE_LEVELS: {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    AVERAGE: 'average',
    BELOW_AVERAGE: 'below_average',
    POOR: 'poor',
    CRITICAL: 'critical',
  } as const,

  // Vendor Compliance Levels
  COMPLIANCE_LEVELS: {
    FULLY_COMPLIANT: 'fully_compliant',
    PARTIALLY_COMPLIANT: 'partially_compliant',
    NON_COMPLIANT: 'non_compliant',
    UNDER_REVIEW: 'under_review',
    PENDING: 'pending',
  } as const,

  // Vendor Risk Levels
  RISK_LEVELS: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  } as const,

  // Vendor Satisfaction Levels
  SATISFACTION_LEVELS: {
    VERY_SATISFIED: 'very_satisfied',
    SATISFIED: 'satisfied',
    NEUTRAL: 'neutral',
    DISSATISFIED: 'dissatisfied',
    VERY_DISSATISFIED: 'very_dissatisfied',
  } as const,

  // Vendor Relationship Status
  RELATIONSHIP_STATUS: {
    NEW: 'new',
    ESTABLISHED: 'established',
    STRONG: 'strong',
    WEAK: 'weak',
    AT_RISK: 'at_risk',
    TERMINATING: 'terminating',
  } as const,
} as const;

// Vendor Analytics Analysis Types
export type VendorAnalyticsAnalysisType =
  (typeof VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES)[keyof typeof VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES];

// Vendor Analytics Data Types
export type VendorAnalyticsDataType =
  (typeof VENDOR_ANALYTICS_TYPE.DATA_TYPES)[keyof typeof VENDOR_ANALYTICS_TYPE.DATA_TYPES];

// Vendor Analytics Vendor Status
export type VendorAnalyticsVendorStatus =
  (typeof VENDOR_ANALYTICS_TYPE.VENDOR_STATUS)[keyof typeof VENDOR_ANALYTICS_TYPE.VENDOR_STATUS];

// Vendor Analytics Vendor Types
export type VendorAnalyticsVendorType =
  (typeof VENDOR_ANALYTICS_TYPE.VENDOR_TYPES)[keyof typeof VENDOR_ANALYTICS_TYPE.VENDOR_TYPES];

// Vendor Analytics Vendor Tiers
export type VendorAnalyticsVendorTier =
  (typeof VENDOR_ANALYTICS_TYPE.VENDOR_TIERS)[keyof typeof VENDOR_ANALYTICS_TYPE.VENDOR_TIERS];

// Vendor Analytics Performance Levels
export type VendorAnalyticsPerformanceLevel =
  (typeof VENDOR_ANALYTICS_TYPE.PERFORMANCE_LEVELS)[keyof typeof VENDOR_ANALYTICS_TYPE.PERFORMANCE_LEVELS];

// Vendor Analytics Compliance Levels
export type VendorAnalyticsComplianceLevel =
  (typeof VENDOR_ANALYTICS_TYPE.COMPLIANCE_LEVELS)[keyof typeof VENDOR_ANALYTICS_TYPE.COMPLIANCE_LEVELS];

// Vendor Analytics Risk Levels
export type VendorAnalyticsRiskLevel =
  (typeof VENDOR_ANALYTICS_TYPE.RISK_LEVELS)[keyof typeof VENDOR_ANALYTICS_TYPE.RISK_LEVELS];

// Vendor Analytics Satisfaction Levels
export type VendorAnalyticsSatisfactionLevel =
  (typeof VENDOR_ANALYTICS_TYPE.SATISFACTION_LEVELS)[keyof typeof VENDOR_ANALYTICS_TYPE.SATISFACTION_LEVELS];

// Vendor Analytics Relationship Status
export type VendorAnalyticsRelationshipStatus =
  (typeof VENDOR_ANALYTICS_TYPE.RELATIONSHIP_STATUS)[keyof typeof VENDOR_ANALYTICS_TYPE.RELATIONSHIP_STATUS];

// Vendor Analytics Analysis Type Labels
export function getVendorAnalyticsAnalysisTypeLabel(type: VendorAnalyticsAnalysisType): string {
  const labels: Record<VendorAnalyticsAnalysisType, string> = {
    [VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.PERFORMANCE]: 'Performance Analysis',
    [VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.VENDOR_PERFORMANCE]: 'Vendor Performance',
    [VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.SALES_PERFORMANCE]: 'Sales Performance',
    [VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.REVENUE_PERFORMANCE]: 'Revenue Performance',
    [VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.PROFIT_PERFORMANCE]: 'Profit Performance',
    [VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.QUALITY_ANALYSIS]: 'Quality Analysis',
    [VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.RATING_ANALYSIS]: 'Rating Analysis',
    [VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.REVIEW_ANALYSIS]: 'Review Analysis',
    [VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.COMPLIANCE_ANALYSIS]: 'Compliance Analysis',
    [VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.FINANCIAL_ANALYSIS]: 'Financial Analysis',
    [VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.PAYMENT_ANALYSIS]: 'Payment Analysis',
    [VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.COMMISSION_ANALYSIS]: 'Commission Analysis',
    [VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.SETTLEMENT_ANALYSIS]: 'Settlement Analysis',
    [VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.RELATIONSHIP_ANALYSIS]: 'Relationship Analysis',
    [VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.COMMUNICATION_ANALYSIS]: 'Communication Analysis',
    [VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.SATISFACTION_ANALYSIS]: 'Satisfaction Analysis',
    [VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.RETENTION_ANALYSIS]: 'Retention Analysis',
    [VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.PRODUCT_ANALYSIS]: 'Product Analysis',
    [VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.INVENTORY_ANALYSIS]: 'Inventory Analysis',
    [VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.FULFILLMENT_ANALYSIS]: 'Fulfillment Analysis',
    [VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.DELIVERY_ANALYSIS]: 'Delivery Analysis',
    [VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.COMPARATIVE]: 'Comparative Analysis',
    [VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.YEAR_OVER_YEAR]: 'Year Over Year',
    [VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.QUARTER_OVER_QUARTER]: 'Quarter Over Quarter',
    [VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.MONTH_OVER_MONTH]: 'Month Over Month',
    [VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.PREDICTIVE]: 'Predictive Analysis',
    [VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.FORECAST]: 'Forecast',
    [VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.TREND]: 'Trend Analysis',
    [VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.RISK]: 'Risk Analysis',
  };
  return labels[type] || 'Unknown';
}

// Vendor Analytics Data Type Labels
export function getVendorAnalyticsDataTypeLabel(type: VendorAnalyticsDataType): string {
  const labels: Record<VendorAnalyticsDataType, string> = {
    [VENDOR_ANALYTICS_TYPE.DATA_TYPES.VENDOR_DATA]: 'Vendor Data',
    [VENDOR_ANALYTICS_TYPE.DATA_TYPES.VENDOR_PROFILE]: 'Vendor Profile',
    [VENDOR_ANALYTICS_TYPE.DATA_TYPES.VENDOR_PERFORMANCE_DATA]: 'Vendor Performance Data',
    [VENDOR_ANALYTICS_TYPE.DATA_TYPES.PRODUCT_DATA]: 'Product Data',
    [VENDOR_ANALYTICS_TYPE.DATA_TYPES.INVENTORY_DATA]: 'Inventory Data',
    [VENDOR_ANALYTICS_TYPE.DATA_TYPES.FINANCIAL_DATA]: 'Financial Data',
    [VENDOR_ANALYTICS_TYPE.DATA_TYPES.PAYMENT_DATA]: 'Payment Data',
    [VENDOR_ANALYTICS_TYPE.DATA_TYPES.COMMISSION_DATA]: 'Commission Data',
    [VENDOR_ANALYTICS_TYPE.DATA_TYPES.SETTLEMENT_DATA]: 'Settlement Data',
    [VENDOR_ANALYTICS_TYPE.DATA_TYPES.QUALITY_DATA]: 'Quality Data',
    [VENDOR_ANALYTICS_TYPE.DATA_TYPES.REVIEW_DATA]: 'Review Data',
    [VENDOR_ANALYTICS_TYPE.DATA_TYPES.RATING_DATA]: 'Rating Data',
    [VENDOR_ANALYTICS_TYPE.DATA_TYPES.COMPLIANCE_DATA]: 'Compliance Data',
    [VENDOR_ANALYTICS_TYPE.DATA_TYPES.AUDIT_DATA]: 'Audit Data',
    [VENDOR_ANALYTICS_TYPE.DATA_TYPES.RELATIONSHIP_DATA]: 'Relationship Data',
    [VENDOR_ANALYTICS_TYPE.DATA_TYPES.COMMUNICATION_DATA]: 'Communication Data',
    [VENDOR_ANALYTICS_TYPE.DATA_TYPES.TIME_SERIES]: 'Time Series',
    [VENDOR_ANALYTICS_TYPE.DATA_TYPES.AGGREGATED]: 'Aggregated',
    [VENDOR_ANALYTICS_TYPE.DATA_TYPES.RAW]: 'Raw',
  };
  return labels[type] || 'Unknown';
}

// Vendor Analytics Vendor Status Labels
export function getVendorAnalyticsVendorStatusLabel(status: VendorAnalyticsVendorStatus): string {
  const labels: Record<VendorAnalyticsVendorStatus, string> = {
    [VENDOR_ANALYTICS_TYPE.VENDOR_STATUS.PENDING]: 'Pending',
    [VENDOR_ANALYTICS_TYPE.VENDOR_STATUS.PENDING_APPROVAL]: 'Pending Approval',
    [VENDOR_ANALYTICS_TYPE.VENDOR_STATUS.APPROVED]: 'Approved',
    [VENDOR_ANALYTICS_TYPE.VENDOR_STATUS.REJECTED]: 'Rejected',
    [VENDOR_ANALYTICS_TYPE.VENDOR_STATUS.ACTIVE]: 'Active',
    [VENDOR_ANALYTICS_TYPE.VENDOR_STATUS.INACTIVE]: 'Inactive',
    [VENDOR_ANALYTICS_TYPE.VENDOR_STATUS.SUSPENDED]: 'Suspended',
    [VENDOR_ANALYTICS_TYPE.VENDOR_STATUS.TERMINATED]: 'Terminated',
    [VENDOR_ANALYTICS_TYPE.VENDOR_STATUS.ON_HOLD]: 'On Hold',
    [VENDOR_ANALYTICS_TYPE.VENDOR_STATUS.UNDER_REVIEW]: 'Under Review',
  };
  return labels[status] || 'Unknown';
}

// Vendor Analytics Vendor Type Labels
export function getVendorAnalyticsVendorTypeLabel(type: VendorAnalyticsVendorType): string {
  const labels: Record<VendorAnalyticsVendorType, string> = {
    [VENDOR_ANALYTICS_TYPE.VENDOR_TYPES.INDIVIDUAL]: 'Individual',
    [VENDOR_ANALYTICS_TYPE.VENDOR_TYPES.BUSINESS]: 'Business',
    [VENDOR_ANALYTICS_TYPE.VENDOR_TYPES.ENTERPRISE]: 'Enterprise',
    [VENDOR_ANALYTICS_TYPE.VENDOR_TYPES.SOLE_PROPRIETORSHIP]: 'Sole Proprietorship',
    [VENDOR_ANALYTICS_TYPE.VENDOR_TYPES.PARTNERSHIP]: 'Partnership',
    [VENDOR_ANALYTICS_TYPE.VENDOR_TYPES.LLC]: 'LLC',
    [VENDOR_ANALYTICS_TYPE.VENDOR_TYPES.CORPORATION]: 'Corporation',
    [VENDOR_ANALYTICS_TYPE.VENDOR_TYPES.NON_PROFIT]: 'Non-Profit',
  };
  return labels[type] || 'Unknown';
}

// Vendor Analytics Vendor Tier Labels
export function getVendorAnalyticsVendorTierLabel(tier: VendorAnalyticsVendorTier): string {
  const labels: Record<VendorAnalyticsVendorTier, string> = {
    [VENDOR_ANALYTICS_TYPE.VENDOR_TIERS.TIER_1]: 'Tier 1',
    [VENDOR_ANALYTICS_TYPE.VENDOR_TIERS.TIER_2]: 'Tier 2',
    [VENDOR_ANALYTICS_TYPE.VENDOR_TIERS.TIER_3]: 'Tier 3',
    [VENDOR_ANALYTICS_TYPE.VENDOR_TIERS.TIER_4]: 'Tier 4',
    [VENDOR_ANALYTICS_TYPE.VENDOR_TIERS.PREMIUM]: 'Premium',
    [VENDOR_ANALYTICS_TYPE.VENDOR_TIERS.STANDARD]: 'Standard',
    [VENDOR_ANALYTICS_TYPE.VENDOR_TIERS.BASIC]: 'Basic',
  };
  return labels[tier] || 'Unknown';
}

// Vendor Analytics Performance Level Labels
export function getVendorAnalyticsPerformanceLevelLabel(
  level: VendorAnalyticsPerformanceLevel
): string {
  const labels: Record<VendorAnalyticsPerformanceLevel, string> = {
    [VENDOR_ANALYTICS_TYPE.PERFORMANCE_LEVELS.EXCELLENT]: 'Excellent',
    [VENDOR_ANALYTICS_TYPE.PERFORMANCE_LEVELS.GOOD]: 'Good',
    [VENDOR_ANALYTICS_TYPE.PERFORMANCE_LEVELS.AVERAGE]: 'Average',
    [VENDOR_ANALYTICS_TYPE.PERFORMANCE_LEVELS.BELOW_AVERAGE]: 'Below Average',
    [VENDOR_ANALYTICS_TYPE.PERFORMANCE_LEVELS.POOR]: 'Poor',
    [VENDOR_ANALYTICS_TYPE.PERFORMANCE_LEVELS.CRITICAL]: 'Critical',
  };
  return labels[level] || 'Unknown';
}

// Vendor Analytics Compliance Level Labels
export function getVendorAnalyticsComplianceLevelLabel(
  level: VendorAnalyticsComplianceLevel
): string {
  const labels: Record<VendorAnalyticsComplianceLevel, string> = {
    [VENDOR_ANALYTICS_TYPE.COMPLIANCE_LEVELS.FULLY_COMPLIANT]: 'Fully Compliant',
    [VENDOR_ANALYTICS_TYPE.COMPLIANCE_LEVELS.PARTIALLY_COMPLIANT]: 'Partially Compliant',
    [VENDOR_ANALYTICS_TYPE.COMPLIANCE_LEVELS.NON_COMPLIANT]: 'Non-Compliant',
    [VENDOR_ANALYTICS_TYPE.COMPLIANCE_LEVELS.UNDER_REVIEW]: 'Under Review',
    [VENDOR_ANALYTICS_TYPE.COMPLIANCE_LEVELS.PENDING]: 'Pending',
  };
  return labels[level] || 'Unknown';
}

// Vendor Analytics Risk Level Labels
export function getVendorAnalyticsRiskLevelLabel(level: VendorAnalyticsRiskLevel): string {
  const labels: Record<VendorAnalyticsRiskLevel, string> = {
    [VENDOR_ANALYTICS_TYPE.RISK_LEVELS.LOW]: 'Low',
    [VENDOR_ANALYTICS_TYPE.RISK_LEVELS.MEDIUM]: 'Medium',
    [VENDOR_ANALYTICS_TYPE.RISK_LEVELS.HIGH]: 'High',
    [VENDOR_ANALYTICS_TYPE.RISK_LEVELS.CRITICAL]: 'Critical',
  };
  return labels[level] || 'Unknown';
}

// Vendor Analytics Satisfaction Level Labels
export function getVendorAnalyticsSatisfactionLevelLabel(
  level: VendorAnalyticsSatisfactionLevel
): string {
  const labels: Record<VendorAnalyticsSatisfactionLevel, string> = {
    [VENDOR_ANALYTICS_TYPE.SATISFACTION_LEVELS.VERY_SATISFIED]: 'Very Satisfied',
    [VENDOR_ANALYTICS_TYPE.SATISFACTION_LEVELS.SATISFIED]: 'Satisfied',
    [VENDOR_ANALYTICS_TYPE.SATISFACTION_LEVELS.NEUTRAL]: 'Neutral',
    [VENDOR_ANALYTICS_TYPE.SATISFACTION_LEVELS.DISSATISFIED]: 'Dissatisfied',
    [VENDOR_ANALYTICS_TYPE.SATISFACTION_LEVELS.VERY_DISSATISFIED]: 'Very Dissatisfied',
  };
  return labels[level] || 'Unknown';
}

// Vendor Analytics Relationship Status Labels
export function getVendorAnalyticsRelationshipStatusLabel(
  status: VendorAnalyticsRelationshipStatus
): string {
  const labels: Record<VendorAnalyticsRelationshipStatus, string> = {
    [VENDOR_ANALYTICS_TYPE.RELATIONSHIP_STATUS.NEW]: 'New',
    [VENDOR_ANALYTICS_TYPE.RELATIONSHIP_STATUS.ESTABLISHED]: 'Established',
    [VENDOR_ANALYTICS_TYPE.RELATIONSHIP_STATUS.STRONG]: 'Strong',
    [VENDOR_ANALYTICS_TYPE.RELATIONSHIP_STATUS.WEAK]: 'Weak',
    [VENDOR_ANALYTICS_TYPE.RELATIONSHIP_STATUS.AT_RISK]: 'At Risk',
    [VENDOR_ANALYTICS_TYPE.RELATIONSHIP_STATUS.TERMINATING]: 'Terminating',
  };
  return labels[status] || 'Unknown';
}

// Check if analysis is performance analysis
export function isVendorAnalyticsPerformanceAnalysis(type: VendorAnalyticsAnalysisType): boolean {
  const performanceTypes: VendorAnalyticsAnalysisType[] = [
    VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.PERFORMANCE,
    VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.VENDOR_PERFORMANCE,
    VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.SALES_PERFORMANCE,
    VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.REVENUE_PERFORMANCE,
    VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.PROFIT_PERFORMANCE,
  ];
  return performanceTypes.includes(type);
}

// Check if analysis is comparative
export function isVendorAnalyticsComparative(type: VendorAnalyticsAnalysisType): boolean {
  const comparativeTypes: VendorAnalyticsAnalysisType[] = [
    VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.COMPARATIVE,
    VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.YEAR_OVER_YEAR,
    VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.QUARTER_OVER_QUARTER,
    VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.MONTH_OVER_MONTH,
  ];
  return comparativeTypes.includes(type);
}

// Check if analysis is predictive
export function isVendorAnalyticsPredictive(type: VendorAnalyticsAnalysisType): boolean {
  const predictiveTypes: VendorAnalyticsAnalysisType[] = [
    VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.PREDICTIVE,
    VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.FORECAST,
    VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.TREND,
    VENDOR_ANALYTICS_TYPE.ANALYSIS_TYPES.RISK,
  ];
  return predictiveTypes.includes(type);
}

// Get performance level from score
export function getVendorAnalyticsPerformanceLevel(score: number): VendorAnalyticsPerformanceLevel {
  if (score >= 90) return VENDOR_ANALYTICS_TYPE.PERFORMANCE_LEVELS.EXCELLENT;
  if (score >= 70) return VENDOR_ANALYTICS_TYPE.PERFORMANCE_LEVELS.GOOD;
  if (score >= 50) return VENDOR_ANALYTICS_TYPE.PERFORMANCE_LEVELS.AVERAGE;
  if (score >= 30) return VENDOR_ANALYTICS_TYPE.PERFORMANCE_LEVELS.BELOW_AVERAGE;
  if (score >= 10) return VENDOR_ANALYTICS_TYPE.PERFORMANCE_LEVELS.POOR;
  return VENDOR_ANALYTICS_TYPE.PERFORMANCE_LEVELS.CRITICAL;
}

// Get compliance level from score
export function getVendorAnalyticsComplianceLevel(score: number): VendorAnalyticsComplianceLevel {
  if (score >= 90) return VENDOR_ANALYTICS_TYPE.COMPLIANCE_LEVELS.FULLY_COMPLIANT;
  if (score >= 70) return VENDOR_ANALYTICS_TYPE.COMPLIANCE_LEVELS.PARTIALLY_COMPLIANT;
  if (score >= 40) return VENDOR_ANALYTICS_TYPE.COMPLIANCE_LEVELS.NON_COMPLIANT;
  return VENDOR_ANALYTICS_TYPE.COMPLIANCE_LEVELS.UNDER_REVIEW;
}

// Get risk level from score
export function getVendorAnalyticsRiskLevel(score: number): VendorAnalyticsRiskLevel {
  if (score >= 80) return VENDOR_ANALYTICS_TYPE.RISK_LEVELS.CRITICAL;
  if (score >= 60) return VENDOR_ANALYTICS_TYPE.RISK_LEVELS.HIGH;
  if (score >= 40) return VENDOR_ANALYTICS_TYPE.RISK_LEVELS.MEDIUM;
  return VENDOR_ANALYTICS_TYPE.RISK_LEVELS.LOW;
}
