/**
 * SEO Audit Constants
 * Configuration for SEO audits, analysis, and reporting
 */

export const SEO_AUDIT = {
  // Audit Types
  TYPES: {
    TECHNICAL: 'technical',
    ON_PAGE: 'on_page',
    OFF_PAGE: 'off_page',
    CONTENT: 'content',
    LOCAL: 'local',
    MOBILE: 'mobile',
    SPEED: 'speed',
    SECURITY: 'security',
    ACCESSIBILITY: 'accessibility',
    UX: 'ux',
    COMPREHENSIVE: 'comprehensive',
    QUICK: 'quick',
    COMPETITOR: 'competitor',
    BACKLINK: 'backlink',
    KEYWORD: 'keyword',
    SITE_STRUCTURE: 'site_structure',
    USER_EXPERIENCE: 'user_experience',
  } as const,

  // Audit Status
  STATUS: {
    PENDING: 'pending',
    SCHEDULED: 'scheduled',
    IN_PROGRESS: 'in_progress',
    ANALYZING: 'analyzing',
    REVIEWING: 'reviewing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    PARTIAL: 'partial',
    NEEDS_REVIEW: 'needs_review',
    APPROVED: 'approved',
    ARCHIVED: 'archived',
  } as const,

  // Audit Severity
  SEVERITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    INFO: 'info',
    NONE: 'none',
  } as const,

  // Audit Priority
  PRIORITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    OPTIONAL: 'optional',
  } as const,

  // Audit Categories
  CATEGORIES: {
    CRAWLABILITY: 'crawlability',
    INDEXABILITY: 'indexability',
    ON_PAGE: 'on_page',
    CONTENT: 'content',
    PERFORMANCE: 'performance',
    MOBILE: 'mobile',
    SECURITY: 'security',
    BACKLINKS: 'backlinks',
    SOCIAL: 'social',
    USER_EXPERIENCE: 'user_experience',
  } as const,

  // Audit Frequency
  FREQUENCY: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    BI_WEEKLY: 'bi_weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    BI_ANNUAL: 'bi_annual',
    ANNUAL: 'annual',
    CUSTOM: 'custom',
    ON_DEMAND: 'on_demand',
  } as const,

  // Audit Scope
  SCOPE: {
    FULL_SITE: 'full_site',
    SINGLE_PAGE: 'single_page',
    SECTION: 'section',
    CATEGORY: 'category',
    KEYWORD_GROUP: 'keyword_group',
    COMPETITOR_SET: 'competitor_set',
  } as const,

  // Audit Tools
  TOOLS: {
    GOOGLE_SEARCH_CONSOLE: 'google_search_console',
    GOOGLE_ANALYTICS: 'google_analytics',
    SEMRUSH: 'semrush',
    AHREFS: 'ahrefs',
    MOZ: 'moz',
    SCREAMING_FROG: 'screaming_frog',
    PAGESPEED_INSIGHTS: 'pagespeed_insights',
    GT_METRIX: 'gt_metrix',
    WEBPAGETEST: 'webpagetest',
    PINGDOM: 'pingdom',
    SITE_BULB: 'site_bulb',
    WAVE: 'wave',
    AXE: 'axe',
    LIGHTHOUSE: 'lighthouse',
    YOAST: 'yoast',
    RANK_MATH: 'rank_math',
  } as const,

  // Audit Findings
  FINDINGS: {
    ISSUE: 'issue',
    WARNING: 'warning',
    OPPORTUNITY: 'opportunity',
    SUCCESS: 'success',
    RECOMMENDATION: 'recommendation',
  } as const,

  // Audit Score Ranges
  SCORE_RANGES: {
    POOR: [0, 49],
    FAIR: [50, 69],
    GOOD: [70, 84],
    EXCELLENT: [85, 94],
    OUTSTANDING: [95, 100],
  } as const,

  // Audit Metrics
  METRICS: {
    TOTAL_PAGES: 'total_pages',
    INDEXED_PAGES: 'indexed_pages',
    CRAWL_ERRORS: 'crawl_errors',
    REDIRECTS: 'redirects',
    DUPLICATE_CONTENT: 'duplicate_content',
    MISSING_TITLES: 'missing_titles',
    MISSING_DESCRIPTIONS: 'missing_descriptions',
    PAGE_SPEED: 'page_speed',
    MOBILE_FRIENDLY: 'mobile_friendly',
    SECURE_PAGES: 'secure_pages',
    BACKLINK_COUNT: 'backlink_count',
    REFERRING_DOMAINS: 'referring_domains',
    KEYWORD_RANKINGS: 'keyword_rankings',
    ORGANIC_TRAFFIC: 'organic_traffic',
    CONVERSION_RATE: 'conversion_rate',
    BOUNCE_RATE: 'bounce_rate',
    AVG_SESSION_DURATION: 'avg_session_duration',
  } as const,
} as const;

// Audit Types
export type SEOAuditType = (typeof SEO_AUDIT.TYPES)[keyof typeof SEO_AUDIT.TYPES];

// Audit Status
export type SEOAuditStatus = (typeof SEO_AUDIT.STATUS)[keyof typeof SEO_AUDIT.STATUS];

// Audit Severity
export type SEOAuditSeverity = (typeof SEO_AUDIT.SEVERITY)[keyof typeof SEO_AUDIT.SEVERITY];

// Audit Priority
export type SEOAuditPriority = (typeof SEO_AUDIT.PRIORITY)[keyof typeof SEO_AUDIT.PRIORITY];

// Audit Categories
export type SEOAuditCategory = (typeof SEO_AUDIT.CATEGORIES)[keyof typeof SEO_AUDIT.CATEGORIES];

// Audit Frequency
export type SEOAuditFrequency = (typeof SEO_AUDIT.FREQUENCY)[keyof typeof SEO_AUDIT.FREQUENCY];

// Audit Scope
export type SEOAuditScope = (typeof SEO_AUDIT.SCOPE)[keyof typeof SEO_AUDIT.SCOPE];

// Audit Tools
export type SEOAuditTool = (typeof SEO_AUDIT.TOOLS)[keyof typeof SEO_AUDIT.TOOLS];

// Audit Findings
export type SEOAuditFinding = (typeof SEO_AUDIT.FINDINGS)[keyof typeof SEO_AUDIT.FINDINGS];

// Audit Score Ranges
export type SEOAuditScoreRange =
  (typeof SEO_AUDIT.SCORE_RANGES)[keyof typeof SEO_AUDIT.SCORE_RANGES];

// Audit Metrics
export type SEOAuditMetric = (typeof SEO_AUDIT.METRICS)[keyof typeof SEO_AUDIT.METRICS];

// Utility Functions
export function getSEOAuditTypeLabel(type: SEOAuditType): string {
  const labels: Record<SEOAuditType, string> = {
    [SEO_AUDIT.TYPES.TECHNICAL]: 'Technical SEO Audit',
    [SEO_AUDIT.TYPES.ON_PAGE]: 'On-Page SEO Audit',
    [SEO_AUDIT.TYPES.OFF_PAGE]: 'Off-Page SEO Audit',
    [SEO_AUDIT.TYPES.CONTENT]: 'Content Audit',
    [SEO_AUDIT.TYPES.LOCAL]: 'Local SEO Audit',
    [SEO_AUDIT.TYPES.MOBILE]: 'Mobile SEO Audit',
    [SEO_AUDIT.TYPES.SPEED]: 'Performance Speed Audit',
    [SEO_AUDIT.TYPES.SECURITY]: 'Security Audit',
    [SEO_AUDIT.TYPES.ACCESSIBILITY]: 'Accessibility Audit',
    [SEO_AUDIT.TYPES.UX]: 'User Experience Audit',
    [SEO_AUDIT.TYPES.COMPREHENSIVE]: 'Comprehensive SEO Audit',
    [SEO_AUDIT.TYPES.QUICK]: 'Quick SEO Scan',
    [SEO_AUDIT.TYPES.COMPETITOR]: 'Competitor Analysis Audit',
    [SEO_AUDIT.TYPES.BACKLINK]: 'Backlink Audit',
    [SEO_AUDIT.TYPES.KEYWORD]: 'Keyword Audit',
    [SEO_AUDIT.TYPES.SITE_STRUCTURE]: 'Site Structure Audit',
    [SEO_AUDIT.TYPES.USER_EXPERIENCE]: 'User Experience Audit',
  };
  return labels[type] || 'Unknown Audit Type';
}

export function getSEOAuditStatusLabel(status: SEOAuditStatus): string {
  const labels: Record<SEOAuditStatus, string> = {
    [SEO_AUDIT.STATUS.PENDING]: 'Pending',
    [SEO_AUDIT.STATUS.SCHEDULED]: 'Scheduled',
    [SEO_AUDIT.STATUS.IN_PROGRESS]: 'In Progress',
    [SEO_AUDIT.STATUS.ANALYZING]: 'Analyzing',
    [SEO_AUDIT.STATUS.REVIEWING]: 'Reviewing',
    [SEO_AUDIT.STATUS.COMPLETED]: 'Completed',
    [SEO_AUDIT.STATUS.FAILED]: 'Failed',
    [SEO_AUDIT.STATUS.CANCELLED]: 'Cancelled',
    [SEO_AUDIT.STATUS.PARTIAL]: 'Partial',
    [SEO_AUDIT.STATUS.NEEDS_REVIEW]: 'Needs Review',
    [SEO_AUDIT.STATUS.APPROVED]: 'Approved',
    [SEO_AUDIT.STATUS.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Status';
}

export function getSEOAuditSeverityLabel(severity: SEOAuditSeverity): string {
  const labels: Record<SEOAuditSeverity, string> = {
    [SEO_AUDIT.SEVERITY.CRITICAL]: 'Critical',
    [SEO_AUDIT.SEVERITY.HIGH]: 'High',
    [SEO_AUDIT.SEVERITY.MEDIUM]: 'Medium',
    [SEO_AUDIT.SEVERITY.LOW]: 'Low',
    [SEO_AUDIT.SEVERITY.INFO]: 'Info',
    [SEO_AUDIT.SEVERITY.NONE]: 'None',
  };
  return labels[severity] || 'Unknown Severity';
}

export function getSEOAuditPriorityLabel(priority: SEOAuditPriority): string {
  const labels: Record<SEOAuditPriority, string> = {
    [SEO_AUDIT.PRIORITY.CRITICAL]: 'Critical',
    [SEO_AUDIT.PRIORITY.HIGH]: 'High',
    [SEO_AUDIT.PRIORITY.MEDIUM]: 'Medium',
    [SEO_AUDIT.PRIORITY.LOW]: 'Low',
    [SEO_AUDIT.PRIORITY.OPTIONAL]: 'Optional',
  };
  return labels[priority] || 'Unknown Priority';
}

export function getSEOAuditCategoryLabel(category: SEOAuditCategory): string {
  const labels: Record<SEOAuditCategory, string> = {
    [SEO_AUDIT.CATEGORIES.CRAWLABILITY]: 'Crawlability',
    [SEO_AUDIT.CATEGORIES.INDEXABILITY]: 'Indexability',
    [SEO_AUDIT.CATEGORIES.ON_PAGE]: 'On-Page SEO',
    [SEO_AUDIT.CATEGORIES.CONTENT]: 'Content Quality',
    [SEO_AUDIT.CATEGORIES.PERFORMANCE]: 'Performance',
    [SEO_AUDIT.CATEGORIES.MOBILE]: 'Mobile Optimization',
    [SEO_AUDIT.CATEGORIES.SECURITY]: 'Security',
    [SEO_AUDIT.CATEGORIES.BACKLINKS]: 'Backlinks',
    [SEO_AUDIT.CATEGORIES.SOCIAL]: 'Social Signals',
    [SEO_AUDIT.CATEGORIES.USER_EXPERIENCE]: 'User Experience',
  };
  return labels[category] || 'Unknown Category';
}

export function getSEOAuditFrequencyLabel(frequency: SEOAuditFrequency): string {
  const labels: Record<SEOAuditFrequency, string> = {
    [SEO_AUDIT.FREQUENCY.DAILY]: 'Daily',
    [SEO_AUDIT.FREQUENCY.WEEKLY]: 'Weekly',
    [SEO_AUDIT.FREQUENCY.BI_WEEKLY]: 'Bi-Weekly',
    [SEO_AUDIT.FREQUENCY.MONTHLY]: 'Monthly',
    [SEO_AUDIT.FREQUENCY.QUARTERLY]: 'Quarterly',
    [SEO_AUDIT.FREQUENCY.BI_ANNUAL]: 'Bi-Annual',
    [SEO_AUDIT.FREQUENCY.ANNUAL]: 'Annual',
    [SEO_AUDIT.FREQUENCY.CUSTOM]: 'Custom',
    [SEO_AUDIT.FREQUENCY.ON_DEMAND]: 'On Demand',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function getSEOAuditScopeLabel(scope: SEOAuditScope): string {
  const labels: Record<SEOAuditScope, string> = {
    [SEO_AUDIT.SCOPE.FULL_SITE]: 'Full Site',
    [SEO_AUDIT.SCOPE.SINGLE_PAGE]: 'Single Page',
    [SEO_AUDIT.SCOPE.SECTION]: 'Section',
    [SEO_AUDIT.SCOPE.CATEGORY]: 'Category',
    [SEO_AUDIT.SCOPE.KEYWORD_GROUP]: 'Keyword Group',
    [SEO_AUDIT.SCOPE.COMPETITOR_SET]: 'Competitor Set',
  };
  return labels[scope] || 'Unknown Scope';
}

export function getSEOAuditToolLabel(tool: SEOAuditTool): string {
  const labels: Record<SEOAuditTool, string> = {
    [SEO_AUDIT.TOOLS.GOOGLE_SEARCH_CONSOLE]: 'Google Search Console',
    [SEO_AUDIT.TOOLS.GOOGLE_ANALYTICS]: 'Google Analytics',
    [SEO_AUDIT.TOOLS.SEMRUSH]: 'SEMrush',
    [SEO_AUDIT.TOOLS.AHREFS]: 'Ahrefs',
    [SEO_AUDIT.TOOLS.MOZ]: 'Moz',
    [SEO_AUDIT.TOOLS.SCREAMING_FROG]: 'Screaming Frog',
    [SEO_AUDIT.TOOLS.PAGESPEED_INSIGHTS]: 'PageSpeed Insights',
    [SEO_AUDIT.TOOLS.GT_METRIX]: 'GTmetrix',
    [SEO_AUDIT.TOOLS.WEBPAGETEST]: 'WebPageTest',
    [SEO_AUDIT.TOOLS.PINGDOM]: 'Pingdom',
    [SEO_AUDIT.TOOLS.SITE_BULB]: 'Sitebulb',
    [SEO_AUDIT.TOOLS.WAVE]: 'WAVE',
    [SEO_AUDIT.TOOLS.AXE]: 'Axe',
    [SEO_AUDIT.TOOLS.LIGHTHOUSE]: 'Lighthouse',
    [SEO_AUDIT.TOOLS.YOAST]: 'Yoast',
    [SEO_AUDIT.TOOLS.RANK_MATH]: 'Rank Math',
  };
  return labels[tool] || 'Unknown Tool';
}

export function getSEOAuditFindingLabel(finding: SEOAuditFinding): string {
  const labels: Record<SEOAuditFinding, string> = {
    [SEO_AUDIT.FINDINGS.ISSUE]: 'Issue',
    [SEO_AUDIT.FINDINGS.WARNING]: 'Warning',
    [SEO_AUDIT.FINDINGS.OPPORTUNITY]: 'Opportunity',
    [SEO_AUDIT.FINDINGS.SUCCESS]: 'Success',
    [SEO_AUDIT.FINDINGS.RECOMMENDATION]: 'Recommendation',
  };
  return labels[finding] || 'Unknown Finding';
}

export function getAuditScoreLabel(score: number): string {
  if (score >= 95) return 'Outstanding';
  if (score >= 85) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 50) return 'Fair';
  return 'Poor';
}

export function getAuditScoreColor(score: number): string {
  if (score >= 95) return '#4CAF50';
  if (score >= 85) return '#8BC34A';
  if (score >= 70) return '#FFC107';
  if (score >= 50) return '#FF9800';
  return '#F44336';
}

export function getSeverityColor(severity: SEOAuditSeverity): string {
  const colors: Record<SEOAuditSeverity, string> = {
    [SEO_AUDIT.SEVERITY.CRITICAL]: '#D32F2F',
    [SEO_AUDIT.SEVERITY.HIGH]: '#F44336',
    [SEO_AUDIT.SEVERITY.MEDIUM]: '#FF9800',
    [SEO_AUDIT.SEVERITY.LOW]: '#FFC107',
    [SEO_AUDIT.SEVERITY.INFO]: '#2196F3',
    [SEO_AUDIT.SEVERITY.NONE]: '#9E9E9E',
  };
  return colors[severity] || '#9E9E9E';
}

export function getPriorityColor(priority: SEOAuditPriority): string {
  const colors: Record<SEOAuditPriority, string> = {
    [SEO_AUDIT.PRIORITY.CRITICAL]: '#D32F2F',
    [SEO_AUDIT.PRIORITY.HIGH]: '#F44336',
    [SEO_AUDIT.PRIORITY.MEDIUM]: '#FF9800',
    [SEO_AUDIT.PRIORITY.LOW]: '#FFC107',
    [SEO_AUDIT.PRIORITY.OPTIONAL]: '#9E9E9E',
  };
  return colors[priority] || '#9E9E9E';
}

export function isAuditComplete(status: SEOAuditStatus): boolean {
  const completeStatuses: SEOAuditStatus[] = [
    SEO_AUDIT.STATUS.COMPLETED,
    SEO_AUDIT.STATUS.APPROVED,
  ];
  return completeStatuses.includes(status);
}

export function isAuditInProgress(status: SEOAuditStatus): boolean {
  const progressStatuses: SEOAuditStatus[] = [
    SEO_AUDIT.STATUS.IN_PROGRESS,
    SEO_AUDIT.STATUS.ANALYZING,
    SEO_AUDIT.STATUS.REVIEWING,
  ];
  return progressStatuses.includes(status);
}
