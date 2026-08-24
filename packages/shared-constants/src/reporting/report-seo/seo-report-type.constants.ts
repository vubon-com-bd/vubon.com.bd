/**
 * SEO Report Type Constants
 * Types and classifications for SEO reports
 */

export const SEO_REPORT_TYPE = {
  // Report Categories
  CATEGORIES: {
    PERFORMANCE: 'performance',
    ANALYTICS: 'analytics',
    TECHNICAL: 'technical',
    CONTENT: 'content',
    COMPETITOR: 'competitor',
    EXECUTIVE: 'executive',
    OPERATIONAL: 'operational',
  } as const,

  // Report Sub-types
  SUB_TYPES: {
    // Performance
    KEYWORD: 'keyword',
    RANKING: 'ranking',
    TRAFFIC: 'traffic',
    CONVERSION: 'conversion',

    // Analytics
    BEHAVIOR: 'behavior',
    ACQUISITION: 'acquisition',
    ENGAGEMENT: 'engagement',
    REVENUE: 'revenue',

    // Technical
    CRAWL: 'crawl',
    INDEX: 'index',
    SPEED: 'speed',
    SECURITY: 'security',
    MOBILE: 'mobile',

    // Content
    CONTENT_PERFORMANCE: 'content_performance',
    GAP: 'gap',
    OPPORTUNITY: 'opportunity',
    QUALITY: 'quality',

    // Competitor
    COMPARISON: 'comparison',
    BENCHMARK: 'benchmark',
    POSITIONING: 'positioning',

    // Executive
    SUMMARY: 'summary',
    OVERVIEW: 'overview',
    STRATEGIC: 'strategic',
  } as const,

  // Report Scopes
  SCOPES: {
    SITE_WIDE: 'site_wide',
    SECTION: 'section',
    PAGE: 'page',
    KEYWORD_GROUP: 'keyword_group',
    CAMPAIGN: 'campaign',
  } as const,

  // Report Granularity
  GRANULARITY: {
    HIGH_LEVEL: 'high_level',
    MEDIUM: 'medium',
    DETAILED: 'detailed',
    GRANULAR: 'granular',
  } as const,

  // Report Audiences
  AUDIENCES: {
    EXECUTIVE: 'executive',
    MANAGEMENT: 'management',
    TEAM: 'team',
    CLIENT: 'client',
    STAKEHOLDER: 'stakeholder',
    PUBLIC: 'public',
  } as const,

  // Report Purposes
  PURPOSES: {
    DECISION_MAKING: 'decision_making',
    MONITORING: 'monitoring',
    OPTIMIZATION: 'optimization',
    COMMUNICATION: 'communication',
    COMPLIANCE: 'compliance',
    BENCHMARKING: 'benchmarking',
  } as const,
} as const;

// Report Categories
export type SEOReportTypeCategory =
  (typeof SEO_REPORT_TYPE.CATEGORIES)[keyof typeof SEO_REPORT_TYPE.CATEGORIES];

// Report Sub-types
export type SEOReportTypeSubType =
  (typeof SEO_REPORT_TYPE.SUB_TYPES)[keyof typeof SEO_REPORT_TYPE.SUB_TYPES];

// Report Scopes
export type SEOReportTypeScope =
  (typeof SEO_REPORT_TYPE.SCOPES)[keyof typeof SEO_REPORT_TYPE.SCOPES];

// Report Granularity
export type SEOReportTypeGranularity =
  (typeof SEO_REPORT_TYPE.GRANULARITY)[keyof typeof SEO_REPORT_TYPE.GRANULARITY];

// Report Audiences
export type SEOReportTypeAudience =
  (typeof SEO_REPORT_TYPE.AUDIENCES)[keyof typeof SEO_REPORT_TYPE.AUDIENCES];

// Report Purposes
export type SEOReportTypePurpose =
  (typeof SEO_REPORT_TYPE.PURPOSES)[keyof typeof SEO_REPORT_TYPE.PURPOSES];

// Utility Functions
export function getSEOReportCategoryLabel(category: SEOReportTypeCategory): string {
  const labels: Record<SEOReportTypeCategory, string> = {
    [SEO_REPORT_TYPE.CATEGORIES.PERFORMANCE]: 'Performance Report',
    [SEO_REPORT_TYPE.CATEGORIES.ANALYTICS]: 'Analytics Report',
    [SEO_REPORT_TYPE.CATEGORIES.TECHNICAL]: 'Technical Report',
    [SEO_REPORT_TYPE.CATEGORIES.CONTENT]: 'Content Report',
    [SEO_REPORT_TYPE.CATEGORIES.COMPETITOR]: 'Competitor Report',
    [SEO_REPORT_TYPE.CATEGORIES.EXECUTIVE]: 'Executive Report',
    [SEO_REPORT_TYPE.CATEGORIES.OPERATIONAL]: 'Operational Report',
  };
  return labels[category] || 'Unknown Category';
}

export function getSEOReportSubTypeLabel(subType: SEOReportTypeSubType): string {
  const labels: Record<SEOReportTypeSubType, string> = {
    // Performance
    [SEO_REPORT_TYPE.SUB_TYPES.KEYWORD]: 'Keyword Performance',
    [SEO_REPORT_TYPE.SUB_TYPES.RANKING]: 'Ranking Report',
    [SEO_REPORT_TYPE.SUB_TYPES.TRAFFIC]: 'Traffic Report',
    [SEO_REPORT_TYPE.SUB_TYPES.CONVERSION]: 'Conversion Report',

    // Analytics
    [SEO_REPORT_TYPE.SUB_TYPES.BEHAVIOR]: 'Behavior Report',
    [SEO_REPORT_TYPE.SUB_TYPES.ACQUISITION]: 'Acquisition Report',
    [SEO_REPORT_TYPE.SUB_TYPES.ENGAGEMENT]: 'Engagement Report',
    [SEO_REPORT_TYPE.SUB_TYPES.REVENUE]: 'Revenue Report',

    // Technical
    [SEO_REPORT_TYPE.SUB_TYPES.CRAWL]: 'Crawl Report',
    [SEO_REPORT_TYPE.SUB_TYPES.INDEX]: 'Index Report',
    [SEO_REPORT_TYPE.SUB_TYPES.SPEED]: 'Speed Report',
    [SEO_REPORT_TYPE.SUB_TYPES.SECURITY]: 'Security Report',
    [SEO_REPORT_TYPE.SUB_TYPES.MOBILE]: 'Mobile Report',

    // Content
    [SEO_REPORT_TYPE.SUB_TYPES.CONTENT_PERFORMANCE]: 'Content Performance',
    [SEO_REPORT_TYPE.SUB_TYPES.GAP]: 'Content Gap Report',
    [SEO_REPORT_TYPE.SUB_TYPES.OPPORTUNITY]: 'Content Opportunity',
    [SEO_REPORT_TYPE.SUB_TYPES.QUALITY]: 'Content Quality',

    // Competitor
    [SEO_REPORT_TYPE.SUB_TYPES.COMPARISON]: 'Competitor Comparison',
    [SEO_REPORT_TYPE.SUB_TYPES.BENCHMARK]: 'Benchmark Report',
    [SEO_REPORT_TYPE.SUB_TYPES.POSITIONING]: 'Positioning Report',

    // Executive
    [SEO_REPORT_TYPE.SUB_TYPES.SUMMARY]: 'Executive Summary',
    [SEO_REPORT_TYPE.SUB_TYPES.OVERVIEW]: 'Executive Overview',
    [SEO_REPORT_TYPE.SUB_TYPES.STRATEGIC]: 'Strategic Report',
  };
  return labels[subType] || 'Unknown Sub-type';
}

export function getSEOReportScopeLabel(scope: SEOReportTypeScope): string {
  const labels: Record<SEOReportTypeScope, string> = {
    [SEO_REPORT_TYPE.SCOPES.SITE_WIDE]: 'Site-wide',
    [SEO_REPORT_TYPE.SCOPES.SECTION]: 'Section Level',
    [SEO_REPORT_TYPE.SCOPES.PAGE]: 'Page Level',
    [SEO_REPORT_TYPE.SCOPES.KEYWORD_GROUP]: 'Keyword Group',
    [SEO_REPORT_TYPE.SCOPES.CAMPAIGN]: 'Campaign Level',
  };
  return labels[scope] || 'Unknown Scope';
}

export function getSEOReportGranularityLabel(granularity: SEOReportTypeGranularity): string {
  const labels: Record<SEOReportTypeGranularity, string> = {
    [SEO_REPORT_TYPE.GRANULARITY.HIGH_LEVEL]: 'High Level',
    [SEO_REPORT_TYPE.GRANULARITY.MEDIUM]: 'Medium',
    [SEO_REPORT_TYPE.GRANULARITY.DETAILED]: 'Detailed',
    [SEO_REPORT_TYPE.GRANULARITY.GRANULAR]: 'Granular',
  };
  return labels[granularity] || 'Unknown Granularity';
}

export function getSEOReportAudienceLabel(audience: SEOReportTypeAudience): string {
  const labels: Record<SEOReportTypeAudience, string> = {
    [SEO_REPORT_TYPE.AUDIENCES.EXECUTIVE]: 'Executive Level',
    [SEO_REPORT_TYPE.AUDIENCES.MANAGEMENT]: 'Management Level',
    [SEO_REPORT_TYPE.AUDIENCES.TEAM]: 'Team Level',
    [SEO_REPORT_TYPE.AUDIENCES.CLIENT]: 'Client',
    [SEO_REPORT_TYPE.AUDIENCES.STAKEHOLDER]: 'Stakeholder',
    [SEO_REPORT_TYPE.AUDIENCES.PUBLIC]: 'Public',
  };
  return labels[audience] || 'Unknown Audience';
}

export function getSEOReportPurposeLabel(purpose: SEOReportTypePurpose): string {
  const labels: Record<SEOReportTypePurpose, string> = {
    [SEO_REPORT_TYPE.PURPOSES.DECISION_MAKING]: 'Decision Making',
    [SEO_REPORT_TYPE.PURPOSES.MONITORING]: 'Monitoring',
    [SEO_REPORT_TYPE.PURPOSES.OPTIMIZATION]: 'Optimization',
    [SEO_REPORT_TYPE.PURPOSES.COMMUNICATION]: 'Communication',
    [SEO_REPORT_TYPE.PURPOSES.COMPLIANCE]: 'Compliance',
    [SEO_REPORT_TYPE.PURPOSES.BENCHMARKING]: 'Benchmarking',
  };
  return labels[purpose] || 'Unknown Purpose';
}
