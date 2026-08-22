/**
 * SEO Score Constants
 * Configuration for SEO scoring, metrics, and evaluation
 */

export const SEO_SCORE = {
  // Score Types
  TYPES: {
    OVERALL: 'overall',
    ON_PAGE: 'on_page',
    OFF_PAGE: 'off_page',
    TECHNICAL: 'technical',
    CONTENT: 'content',
    PERFORMANCE: 'performance',
    MOBILE: 'mobile',
    SECURITY: 'security',
    USER_EXPERIENCE: 'user_experience',
    ACCESSIBILITY: 'accessibility',
    BACKLINK: 'backlink',
    KEYWORD: 'keyword',
    SOCIAL: 'social',
    BRAND: 'brand',
    AUTHORITY: 'authority',
  } as const,

  // Score Status
  STATUS: {
    PENDING: 'pending',
    CALCULATING: 'calculating',
    COMPLETED: 'completed',
    UPDATING: 'updating',
    FAILED: 'failed',
    OUTDATED: 'outdated',
    ARCHIVED: 'archived',
  } as const,

  // Score Ranges (0-100)
  RANGES: {
    POOR: [0, 29],
    FAIR: [30, 49],
    GOOD: [50, 69],
    EXCELLENT: [70, 89],
    OUTSTANDING: [90, 100],
  } as const,

  // Score Labels
  LABELS: {
    POOR: 'Poor',
    FAIR: 'Fair',
    GOOD: 'Good',
    EXCELLENT: 'Excellent',
    OUTSTANDING: 'Outstanding',
  } as const,

  // Score Colors
  COLORS: {
    POOR: '#F44336',
    FAIR: '#FF9800',
    GOOD: '#FFC107',
    EXCELLENT: '#8BC34A',
    OUTSTANDING: '#4CAF50',
  } as const,

  // Score Weight Categories
  WEIGHT_CATEGORIES: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    MINIMAL: 'minimal',
  } as const,

  // Score Factors
  FACTORS: {
    // Technical Factors
    PAGE_SPEED: 'page_speed',
    MOBILE_FRIENDLY: 'mobile_friendly',
    HTTPS: 'https',
    STRUCTURED_DATA: 'structured_data',
    CANONICAL_TAGS: 'canonical_tags',
    ROBOTS_TXT: 'robots_txt',
    SITEMAP: 'sitemap',
    CRAWL_ERRORS: 'crawl_errors',
    REDIRECTS: 'redirects',
    BREADCRUMBS: 'breadcrumbs',

    // On-Page Factors
    TITLE_TAG: 'title_tag',
    META_DESCRIPTION: 'meta_description',
    HEADING_STRUCTURE: 'heading_structure',
    KEYWORD_OPTIMIZATION: 'keyword_optimization',
    CONTENT_QUALITY: 'content_quality',
    CONTENT_LENGTH: 'content_length',
    IMAGE_OPTIMIZATION: 'image_optimization',
    INTERNAL_LINKS: 'internal_links',
    EXTERNAL_LINKS: 'external_links',
    URL_STRUCTURE: 'url_structure',

    // Off-Page Factors
    BACKLINK_QUALITY: 'backlink_quality',
    BACKLINK_QUANTITY: 'backlink_quantity',
    DOMAIN_AUTHORITY: 'domain_authority',
    PAGE_AUTHORITY: 'page_authority',
    SOCIAL_SIGNALS: 'social_signals',
    BRAND_MENTIONS: 'brand_mentions',
    REFERRING_DOMAINS: 'referring_domains',

    // User Experience Factors
    BOUNCE_RATE: 'bounce_rate',
    DWELL_TIME: 'dwell_time',
    PAGES_PER_SESSION: 'pages_per_session',
    CONVERSION_RATE: 'conversion_rate',
    USER_SATISFACTION: 'user_satisfaction',
    NAVIGATION_EASE: 'navigation_ease',
  } as const,

  // Factor Weights (0-1)
  FACTOR_WEIGHTS: {
    page_speed: 0.15,
    mobile_friendly: 0.12,
    https: 0.08,
    structured_data: 0.05,
    title_tag: 0.1,
    meta_description: 0.08,
    heading_structure: 0.06,
    keyword_optimization: 0.1,
    content_quality: 0.15,
    content_length: 0.06,
    image_optimization: 0.05,
    internal_links: 0.06,
    backlink_quality: 0.1,
    domain_authority: 0.08,
    social_signals: 0.04,
    bounce_rate: 0.08,
    dwell_time: 0.06,
    conversion_rate: 0.08,
  } as const,

  // Score Metrics
  METRICS: {
    OVERALL_SCORE: 'overall_score',
    CATEGORY_SCORES: 'category_scores',
    FACTOR_SCORES: 'factor_scores',
    COMPARISON_SCORE: 'comparison_score',
    TREND_SCORE: 'trend_score',
    BENCHMARK_SCORE: 'benchmark_score',
  } as const,

  // Score Comparison Types
  COMPARISON_TYPES: {
    COMPETITOR: 'competitor',
    INDUSTRY: 'industry',
    PREVIOUS: 'previous',
    TARGET: 'target',
    BENCHMARK: 'benchmark',
  } as const,

  // Score Trends
  TRENDS: {
    IMPROVING: 'improving',
    STABLE: 'stable',
    DECLINING: 'declining',
    VOLATILE: 'volatile',
    PEAKING: 'peaking',
    BOTTOMING: 'bottoming',
  } as const,

  // Score Confidence Levels
  CONFIDENCE: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    UNKNOWN: 'unknown',
  } as const,
} as const;

// Score Types
export type SEOScoreType = (typeof SEO_SCORE.TYPES)[keyof typeof SEO_SCORE.TYPES];

// Score Status
export type SEOScoreStatus = (typeof SEO_SCORE.STATUS)[keyof typeof SEO_SCORE.STATUS];

// Score Ranges
export type SEOScoreRange = (typeof SEO_SCORE.RANGES)[keyof typeof SEO_SCORE.RANGES];

// Score Labels
export type SEOScoreLabel = (typeof SEO_SCORE.LABELS)[keyof typeof SEO_SCORE.LABELS];

// Score Colors
export type SEOScoreColor = (typeof SEO_SCORE.COLORS)[keyof typeof SEO_SCORE.COLORS];

// Weight Categories
export type SEOScoreWeightCategory =
  (typeof SEO_SCORE.WEIGHT_CATEGORIES)[keyof typeof SEO_SCORE.WEIGHT_CATEGORIES];

// Score Factors
export type SEOScoreFactor = (typeof SEO_SCORE.FACTORS)[keyof typeof SEO_SCORE.FACTORS];

// Score Metrics
export type SEOScoreMetric = (typeof SEO_SCORE.METRICS)[keyof typeof SEO_SCORE.METRICS];

// Comparison Types
export type SEOScoreComparisonType =
  (typeof SEO_SCORE.COMPARISON_TYPES)[keyof typeof SEO_SCORE.COMPARISON_TYPES];

// Score Trends
export type SEOScoreTrend = (typeof SEO_SCORE.TRENDS)[keyof typeof SEO_SCORE.TRENDS];

// Confidence Levels
export type SEOScoreConfidence = (typeof SEO_SCORE.CONFIDENCE)[keyof typeof SEO_SCORE.CONFIDENCE];

// Utility Functions
export function getSEOScoreTypeLabel(type: SEOScoreType): string {
  const labels: Record<SEOScoreType, string> = {
    [SEO_SCORE.TYPES.OVERALL]: 'Overall SEO Score',
    [SEO_SCORE.TYPES.ON_PAGE]: 'On-Page SEO Score',
    [SEO_SCORE.TYPES.OFF_PAGE]: 'Off-Page SEO Score',
    [SEO_SCORE.TYPES.TECHNICAL]: 'Technical SEO Score',
    [SEO_SCORE.TYPES.CONTENT]: 'Content Quality Score',
    [SEO_SCORE.TYPES.PERFORMANCE]: 'Performance Score',
    [SEO_SCORE.TYPES.MOBILE]: 'Mobile Optimization Score',
    [SEO_SCORE.TYPES.SECURITY]: 'Security Score',
    [SEO_SCORE.TYPES.USER_EXPERIENCE]: 'User Experience Score',
    [SEO_SCORE.TYPES.ACCESSIBILITY]: 'Accessibility Score',
    [SEO_SCORE.TYPES.BACKLINK]: 'Backlink Score',
    [SEO_SCORE.TYPES.KEYWORD]: 'Keyword Optimization Score',
    [SEO_SCORE.TYPES.SOCIAL]: 'Social Signals Score',
    [SEO_SCORE.TYPES.BRAND]: 'Brand Score',
    [SEO_SCORE.TYPES.AUTHORITY]: 'Authority Score',
  };
  return labels[type] || 'Unknown Score Type';
}

export function getSEOScoreStatusLabel(status: SEOScoreStatus): string {
  const labels: Record<SEOScoreStatus, string> = {
    [SEO_SCORE.STATUS.PENDING]: 'Pending',
    [SEO_SCORE.STATUS.CALCULATING]: 'Calculating',
    [SEO_SCORE.STATUS.COMPLETED]: 'Completed',
    [SEO_SCORE.STATUS.UPDATING]: 'Updating',
    [SEO_SCORE.STATUS.FAILED]: 'Failed',
    [SEO_SCORE.STATUS.OUTDATED]: 'Outdated',
    [SEO_SCORE.STATUS.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Status';
}

export function getSEOScoreLabel(score: number): SEOScoreLabel {
  if (score >= 90) return SEO_SCORE.LABELS.OUTSTANDING;
  if (score >= 70) return SEO_SCORE.LABELS.EXCELLENT;
  if (score >= 50) return SEO_SCORE.LABELS.GOOD;
  if (score >= 30) return SEO_SCORE.LABELS.FAIR;
  return SEO_SCORE.LABELS.POOR;
}

export function getSEOScoreColor(score: number): SEOScoreColor {
  if (score >= 90) return SEO_SCORE.COLORS.OUTSTANDING;
  if (score >= 70) return SEO_SCORE.COLORS.EXCELLENT;
  if (score >= 50) return SEO_SCORE.COLORS.GOOD;
  if (score >= 30) return SEO_SCORE.COLORS.FAIR;
  return SEO_SCORE.COLORS.POOR;
}

export function getSEOScoreRange(score: number): SEOScoreRange {
  if (score >= 90) return SEO_SCORE.RANGES.OUTSTANDING;
  if (score >= 70) return SEO_SCORE.RANGES.EXCELLENT;
  if (score >= 50) return SEO_SCORE.RANGES.GOOD;
  if (score >= 30) return SEO_SCORE.RANGES.FAIR;
  return SEO_SCORE.RANGES.POOR;
}

export function getSEOScoreWeightLabel(weight: SEOScoreWeightCategory): string {
  const labels: Record<SEOScoreWeightCategory, string> = {
    [SEO_SCORE.WEIGHT_CATEGORIES.CRITICAL]: 'Critical',
    [SEO_SCORE.WEIGHT_CATEGORIES.HIGH]: 'High',
    [SEO_SCORE.WEIGHT_CATEGORIES.MEDIUM]: 'Medium',
    [SEO_SCORE.WEIGHT_CATEGORIES.LOW]: 'Low',
    [SEO_SCORE.WEIGHT_CATEGORIES.MINIMAL]: 'Minimal',
  };
  return labels[weight] || 'Unknown Weight';
}

export function getSEOScoreFactorLabel(factor: SEOScoreFactor): string {
  const labels: Record<SEOScoreFactor, string> = {
    // Technical
    [SEO_SCORE.FACTORS.PAGE_SPEED]: 'Page Speed',
    [SEO_SCORE.FACTORS.MOBILE_FRIENDLY]: 'Mobile Friendliness',
    [SEO_SCORE.FACTORS.HTTPS]: 'HTTPS Security',
    [SEO_SCORE.FACTORS.STRUCTURED_DATA]: 'Structured Data',
    [SEO_SCORE.FACTORS.CANONICAL_TAGS]: 'Canonical Tags',
    [SEO_SCORE.FACTORS.ROBOTS_TXT]: 'Robots.txt',
    [SEO_SCORE.FACTORS.SITEMAP]: 'XML Sitemap',
    [SEO_SCORE.FACTORS.CRAWL_ERRORS]: 'Crawl Errors',
    [SEO_SCORE.FACTORS.REDIRECTS]: 'Redirects',
    [SEO_SCORE.FACTORS.BREADCRUMBS]: 'Breadcrumbs',

    // On-Page
    [SEO_SCORE.FACTORS.TITLE_TAG]: 'Title Tag',
    [SEO_SCORE.FACTORS.META_DESCRIPTION]: 'Meta Description',
    [SEO_SCORE.FACTORS.HEADING_STRUCTURE]: 'Heading Structure',
    [SEO_SCORE.FACTORS.KEYWORD_OPTIMIZATION]: 'Keyword Optimization',
    [SEO_SCORE.FACTORS.CONTENT_QUALITY]: 'Content Quality',
    [SEO_SCORE.FACTORS.CONTENT_LENGTH]: 'Content Length',
    [SEO_SCORE.FACTORS.IMAGE_OPTIMIZATION]: 'Image Optimization',
    [SEO_SCORE.FACTORS.INTERNAL_LINKS]: 'Internal Links',
    [SEO_SCORE.FACTORS.EXTERNAL_LINKS]: 'External Links',
    [SEO_SCORE.FACTORS.URL_STRUCTURE]: 'URL Structure',

    // Off-Page
    [SEO_SCORE.FACTORS.BACKLINK_QUALITY]: 'Backlink Quality',
    [SEO_SCORE.FACTORS.BACKLINK_QUANTITY]: 'Backlink Quantity',
    [SEO_SCORE.FACTORS.DOMAIN_AUTHORITY]: 'Domain Authority',
    [SEO_SCORE.FACTORS.PAGE_AUTHORITY]: 'Page Authority',
    [SEO_SCORE.FACTORS.SOCIAL_SIGNALS]: 'Social Signals',
    [SEO_SCORE.FACTORS.BRAND_MENTIONS]: 'Brand Mentions',
    [SEO_SCORE.FACTORS.REFERRING_DOMAINS]: 'Referring Domains',

    // UX
    [SEO_SCORE.FACTORS.BOUNCE_RATE]: 'Bounce Rate',
    [SEO_SCORE.FACTORS.DWELL_TIME]: 'Dwell Time',
    [SEO_SCORE.FACTORS.PAGES_PER_SESSION]: 'Pages Per Session',
    [SEO_SCORE.FACTORS.CONVERSION_RATE]: 'Conversion Rate',
    [SEO_SCORE.FACTORS.USER_SATISFACTION]: 'User Satisfaction',
    [SEO_SCORE.FACTORS.NAVIGATION_EASE]: 'Navigation Ease',
  };
  return labels[factor] || 'Unknown Factor';
}

export function getSEOScoreTrendLabel(trend: SEOScoreTrend): string {
  const labels: Record<SEOScoreTrend, string> = {
    [SEO_SCORE.TRENDS.IMPROVING]: 'Improving',
    [SEO_SCORE.TRENDS.STABLE]: 'Stable',
    [SEO_SCORE.TRENDS.DECLINING]: 'Declining',
    [SEO_SCORE.TRENDS.VOLATILE]: 'Volatile',
    [SEO_SCORE.TRENDS.PEAKING]: 'Peaking',
    [SEO_SCORE.TRENDS.BOTTOMING]: 'Bottoming',
  };
  return labels[trend] || 'Unknown Trend';
}

export function getSEOScoreComparisonLabel(comparison: SEOScoreComparisonType): string {
  const labels: Record<SEOScoreComparisonType, string> = {
    [SEO_SCORE.COMPARISON_TYPES.COMPETITOR]: 'Competitor Comparison',
    [SEO_SCORE.COMPARISON_TYPES.INDUSTRY]: 'Industry Average',
    [SEO_SCORE.COMPARISON_TYPES.PREVIOUS]: 'Previous Period',
    [SEO_SCORE.COMPARISON_TYPES.TARGET]: 'Target Score',
    [SEO_SCORE.COMPARISON_TYPES.BENCHMARK]: 'Benchmark Score',
  };
  return labels[comparison] || 'Unknown Comparison';
}

export function getSEOScoreConfidenceLabel(confidence: SEOScoreConfidence): string {
  const labels: Record<SEOScoreConfidence, string> = {
    [SEO_SCORE.CONFIDENCE.HIGH]: 'High Confidence',
    [SEO_SCORE.CONFIDENCE.MEDIUM]: 'Medium Confidence',
    [SEO_SCORE.CONFIDENCE.LOW]: 'Low Confidence',
    [SEO_SCORE.CONFIDENCE.UNKNOWN]: 'Unknown Confidence',
  };
  return labels[confidence] || 'Unknown Confidence';
}

export function calculateWeightedScore(factors: Record<SEOScoreFactor, number>): number {
  let totalScore = 0;
  let totalWeight = 0;

  const weights: Record<string, number> = {
    page_speed: 0.15,
    mobile_friendly: 0.12,
    https: 0.08,
    structured_data: 0.05,
    title_tag: 0.1,
    meta_description: 0.08,
    heading_structure: 0.06,
    keyword_optimization: 0.1,
    content_quality: 0.15,
    content_length: 0.06,
    image_optimization: 0.05,
    internal_links: 0.06,
    backlink_quality: 0.1,
    domain_authority: 0.08,
    social_signals: 0.04,
    bounce_rate: 0.08,
    dwell_time: 0.06,
    conversion_rate: 0.08,
  };

  for (const [factorKey, score] of Object.entries(factors)) {
    const weight = weights[factorKey];
    if (weight !== undefined) {
      totalScore += score * weight;
      totalWeight += weight;
    }
  }

  return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
}

export function getScoreCategory(score: number): SEOScoreWeightCategory {
  if (score >= 80) return SEO_SCORE.WEIGHT_CATEGORIES.CRITICAL;
  if (score >= 60) return SEO_SCORE.WEIGHT_CATEGORIES.HIGH;
  if (score >= 40) return SEO_SCORE.WEIGHT_CATEGORIES.MEDIUM;
  if (score >= 20) return SEO_SCORE.WEIGHT_CATEGORIES.LOW;
  return SEO_SCORE.WEIGHT_CATEGORIES.MINIMAL;
}

export function isScoreGood(score: number): boolean {
  return score >= 50;
}

export function isScoreExcellent(score: number): boolean {
  return score >= 70;
}

export function isScoreOutstanding(score: number): boolean {
  return score >= 90;
}
