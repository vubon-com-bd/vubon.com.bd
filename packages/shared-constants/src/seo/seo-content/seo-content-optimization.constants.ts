/**
 * SEO Content Optimization Constants
 * Configuration for content optimization strategies and techniques
 */

export const SEO_CONTENT_OPTIMIZATION = {
  // Optimization Types
  TYPES: {
    ON_PAGE: 'on_page',
    OFF_PAGE: 'off_page',
    TECHNICAL: 'technical',
    CONTENT: 'content',
    STRUCTURAL: 'structural',
    SEMANTIC: 'semantic',
    VISUAL: 'visual',
    MOBILE: 'mobile',
    SPEED: 'speed',
    USER_EXPERIENCE: 'user_experience',
  } as const,

  // Optimization Status
  STATUS: {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    FAILED: 'failed',
    PARTIAL: 'partial',
    OPTIMIZED: 'optimized',
    NEEDS_REVIEW: 'needs_review',
    IN_REVIEW: 'in_review',
    APPROVED: 'approved',
    REJECTED: 'rejected',
  } as const,

  // Optimization Techniques
  TECHNIQUES: {
    // On-Page
    TITLE_OPTIMIZATION: 'title_optimization',
    META_DESCRIPTION: 'meta_description',
    HEADING_OPTIMIZATION: 'heading_optimization',
    KEYWORD_PLACEMENT: 'keyword_placement',
    CONTENT_STRUCTURE: 'content_structure',
    READABILITY_IMPROVEMENT: 'readability_improvement',
    IMAGE_OPTIMIZATION: 'image_optimization',
    INTERNAL_LINKING: 'internal_linking',
    EXTERNAL_LINKING: 'external_linking',
    URL_OPTIMIZATION: 'url_optimization',

    // Technical
    PAGE_SPEED: 'page_speed',
    MOBILE_RESPONSIVE: 'mobile_responsive',
    HTTPS: 'https',
    STRUCTURED_DATA: 'structured_data',
    CANONICAL_TAGS: 'canonical_tags',
    ROBOTS_TXT: 'robots_txt',
    SITEMAP: 'sitemap',

    // Content
    CONTENT_LENGTH: 'content_length',
    CONTENT_UNIQUENESS: 'content_uniqueness',
    CONTENT_RELEVANCE: 'content_relevance',
    CONTENT_QUALITY: 'content_quality',
    CONTENT_FRESHNESS: 'content_freshness',
    MULTIMEDIA: 'multimedia',
    CALL_TO_ACTION: 'call_to_action',
  } as const,

  // Optimization Priorities
  PRIORITIES: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    OPTIONAL: 'optional',
  } as const,

  // Optimization Impact Levels
  IMPACT_LEVELS: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    MINIMAL: 'minimal',
  } as const,

  // Optimization Effort Levels
  EFFORT_LEVELS: {
    LOW: 'low', // < 1 hour
    MEDIUM: 'medium', // 1-4 hours
    HIGH: 'high', // 4-8 hours
    EXTREME: 'extreme', // 8+ hours
  } as const,

  // Optimization Tools
  TOOLS: {
    // Analysis Tools
    GOOGLE_SEARCH_CONSOLE: 'google_search_console',
    GOOGLE_ANALYTICS: 'google_analytics',
    SEMRUSH: 'semrush',
    AHREFS: 'ahrefs',
    MOZ: 'moz',
    SCREAMING_FROG: 'screaming_frog',
    PAGERESULTS: 'pageresults',

    // Content Tools
    GRAMMARLY: 'grammarly',
    HEMINGWAY: 'hemingway',
    YOAST: 'yoast',
    RANK_MATH: 'rank_math',
    SURFER_SEO: 'surfer_seo',
    CLEARWORLDS: 'clearworlds',

    // Speed Tools
    GT_METRIX: 'gt_metrix',
    PAGESPEED_INSIGHTS: 'pagespeed_insights',
    WEBPAGETEST: 'webpagetest',
    PINGDOM: 'pingdom',
  } as const,

  // Optimization Metrics
  METRICS: {
    SCORE: 'score',
    READABILITY: 'readability',
    KEYWORD_DENSITY: 'keyword_density',
    WORD_COUNT: 'word_count',
    HEADINGS: 'headings',
    IMAGES: 'images',
    LINKS: 'links',
    PAGE_SPEED: 'page_speed',
    MOBILE_SCORE: 'mobile_score',
    SEO_SCORE: 'seo_score',
    PERFORMANCE_SCORE: 'performance_score',
    ACCESSIBILITY_SCORE: 'accessibility_score',
  } as const,

  // Optimization Recommendations
  RECOMMENDATIONS: {
    ADD_KEYWORDS: 'add_keywords',
    REDUCE_KEYWORDS: 'reduce_keywords',
    IMPROVE_READABILITY: 'improve_readability',
    ADD_HEADINGS: 'add_headings',
    ADD_IMAGES: 'add_images',
    ADD_ALT_TEXT: 'add_alt_text',
    ADD_INTERNAL_LINKS: 'add_internal_links',
    ADD_EXTERNAL_LINKS: 'add_external_links',
    IMPROVE_SPEED: 'improve_speed',
    MAKE_MOBILE_FRIENDLY: 'make_mobile_friendly',
    ADD_SCHEMA: 'add_schema',
    UPDATE_CONTENT: 'update_content',
    EXPAND_CONTENT: 'expand_content',
    SHORTEN_CONTENT: 'shorten_content',
    IMPROVE_CTA: 'improve_cta',
  } as const,
} as const;

// Optimization Types
export type SEOContentOptimizationType =
  (typeof SEO_CONTENT_OPTIMIZATION.TYPES)[keyof typeof SEO_CONTENT_OPTIMIZATION.TYPES];

// Optimization Status
export type SEOContentOptimizationStatus =
  (typeof SEO_CONTENT_OPTIMIZATION.STATUS)[keyof typeof SEO_CONTENT_OPTIMIZATION.STATUS];

// Optimization Techniques
export type SEOContentOptimizationTechnique =
  (typeof SEO_CONTENT_OPTIMIZATION.TECHNIQUES)[keyof typeof SEO_CONTENT_OPTIMIZATION.TECHNIQUES];

// Optimization Priorities
export type SEOContentOptimizationPriority =
  (typeof SEO_CONTENT_OPTIMIZATION.PRIORITIES)[keyof typeof SEO_CONTENT_OPTIMIZATION.PRIORITIES];

// Optimization Impact Levels
export type SEOContentOptimizationImpact =
  (typeof SEO_CONTENT_OPTIMIZATION.IMPACT_LEVELS)[keyof typeof SEO_CONTENT_OPTIMIZATION.IMPACT_LEVELS];

// Optimization Effort Levels
export type SEOContentOptimizationEffort =
  (typeof SEO_CONTENT_OPTIMIZATION.EFFORT_LEVELS)[keyof typeof SEO_CONTENT_OPTIMIZATION.EFFORT_LEVELS];

// Optimization Tools
export type SEOContentOptimizationTool =
  (typeof SEO_CONTENT_OPTIMIZATION.TOOLS)[keyof typeof SEO_CONTENT_OPTIMIZATION.TOOLS];

// Optimization Metrics
export type SEOContentOptimizationMetric =
  (typeof SEO_CONTENT_OPTIMIZATION.METRICS)[keyof typeof SEO_CONTENT_OPTIMIZATION.METRICS];

// Optimization Recommendations
export type SEOContentOptimizationRecommendation =
  (typeof SEO_CONTENT_OPTIMIZATION.RECOMMENDATIONS)[keyof typeof SEO_CONTENT_OPTIMIZATION.RECOMMENDATIONS];

// Utility Functions
export function getSEOContentOptimizationTypeLabel(type: SEOContentOptimizationType): string {
  const labels: Record<SEOContentOptimizationType, string> = {
    [SEO_CONTENT_OPTIMIZATION.TYPES.ON_PAGE]: 'On-Page Optimization',
    [SEO_CONTENT_OPTIMIZATION.TYPES.OFF_PAGE]: 'Off-Page Optimization',
    [SEO_CONTENT_OPTIMIZATION.TYPES.TECHNICAL]: 'Technical Optimization',
    [SEO_CONTENT_OPTIMIZATION.TYPES.CONTENT]: 'Content Optimization',
    [SEO_CONTENT_OPTIMIZATION.TYPES.STRUCTURAL]: 'Structural Optimization',
    [SEO_CONTENT_OPTIMIZATION.TYPES.SEMANTIC]: 'Semantic Optimization',
    [SEO_CONTENT_OPTIMIZATION.TYPES.VISUAL]: 'Visual Optimization',
    [SEO_CONTENT_OPTIMIZATION.TYPES.MOBILE]: 'Mobile Optimization',
    [SEO_CONTENT_OPTIMIZATION.TYPES.SPEED]: 'Speed Optimization',
    [SEO_CONTENT_OPTIMIZATION.TYPES.USER_EXPERIENCE]: 'User Experience Optimization',
  };
  return labels[type] || 'Unknown Optimization Type';
}

export function getSEOContentOptimizationStatusLabel(status: SEOContentOptimizationStatus): string {
  const labels: Record<SEOContentOptimizationStatus, string> = {
    [SEO_CONTENT_OPTIMIZATION.STATUS.PENDING]: 'Pending',
    [SEO_CONTENT_OPTIMIZATION.STATUS.IN_PROGRESS]: 'In Progress',
    [SEO_CONTENT_OPTIMIZATION.STATUS.COMPLETED]: 'Completed',
    [SEO_CONTENT_OPTIMIZATION.STATUS.FAILED]: 'Failed',
    [SEO_CONTENT_OPTIMIZATION.STATUS.PARTIAL]: 'Partial',
    [SEO_CONTENT_OPTIMIZATION.STATUS.OPTIMIZED]: 'Optimized',
    [SEO_CONTENT_OPTIMIZATION.STATUS.NEEDS_REVIEW]: 'Needs Review',
    [SEO_CONTENT_OPTIMIZATION.STATUS.IN_REVIEW]: 'In Review',
    [SEO_CONTENT_OPTIMIZATION.STATUS.APPROVED]: 'Approved',
    [SEO_CONTENT_OPTIMIZATION.STATUS.REJECTED]: 'Rejected',
  };
  return labels[status] || 'Unknown Status';
}

export function getSEOContentOptimizationTechniqueLabel(
  technique: SEOContentOptimizationTechnique
): string {
  const labels: Record<SEOContentOptimizationTechnique, string> = {
    // On-Page
    [SEO_CONTENT_OPTIMIZATION.TECHNIQUES.TITLE_OPTIMIZATION]: 'Title Optimization',
    [SEO_CONTENT_OPTIMIZATION.TECHNIQUES.META_DESCRIPTION]: 'Meta Description Optimization',
    [SEO_CONTENT_OPTIMIZATION.TECHNIQUES.HEADING_OPTIMIZATION]: 'Heading Optimization',
    [SEO_CONTENT_OPTIMIZATION.TECHNIQUES.KEYWORD_PLACEMENT]: 'Keyword Placement',
    [SEO_CONTENT_OPTIMIZATION.TECHNIQUES.CONTENT_STRUCTURE]: 'Content Structure',
    [SEO_CONTENT_OPTIMIZATION.TECHNIQUES.READABILITY_IMPROVEMENT]: 'Readability Improvement',
    [SEO_CONTENT_OPTIMIZATION.TECHNIQUES.IMAGE_OPTIMIZATION]: 'Image Optimization',
    [SEO_CONTENT_OPTIMIZATION.TECHNIQUES.INTERNAL_LINKING]: 'Internal Linking',
    [SEO_CONTENT_OPTIMIZATION.TECHNIQUES.EXTERNAL_LINKING]: 'External Linking',
    [SEO_CONTENT_OPTIMIZATION.TECHNIQUES.URL_OPTIMIZATION]: 'URL Optimization',

    // Technical
    [SEO_CONTENT_OPTIMIZATION.TECHNIQUES.PAGE_SPEED]: 'Page Speed Optimization',
    [SEO_CONTENT_OPTIMIZATION.TECHNIQUES.MOBILE_RESPONSIVE]: 'Mobile Responsiveness',
    [SEO_CONTENT_OPTIMIZATION.TECHNIQUES.HTTPS]: 'HTTPS Implementation',
    [SEO_CONTENT_OPTIMIZATION.TECHNIQUES.STRUCTURED_DATA]: 'Structured Data',
    [SEO_CONTENT_OPTIMIZATION.TECHNIQUES.CANONICAL_TAGS]: 'Canonical Tags',
    [SEO_CONTENT_OPTIMIZATION.TECHNIQUES.ROBOTS_TXT]: 'Robots.txt',
    [SEO_CONTENT_OPTIMIZATION.TECHNIQUES.SITEMAP]: 'Sitemap',

    // Content
    [SEO_CONTENT_OPTIMIZATION.TECHNIQUES.CONTENT_LENGTH]: 'Content Length Optimization',
    [SEO_CONTENT_OPTIMIZATION.TECHNIQUES.CONTENT_UNIQUENESS]: 'Content Uniqueness',
    [SEO_CONTENT_OPTIMIZATION.TECHNIQUES.CONTENT_RELEVANCE]: 'Content Relevance',
    [SEO_CONTENT_OPTIMIZATION.TECHNIQUES.CONTENT_QUALITY]: 'Content Quality',
    [SEO_CONTENT_OPTIMIZATION.TECHNIQUES.CONTENT_FRESHNESS]: 'Content Freshness',
    [SEO_CONTENT_OPTIMIZATION.TECHNIQUES.MULTIMEDIA]: 'Multimedia Integration',
    [SEO_CONTENT_OPTIMIZATION.TECHNIQUES.CALL_TO_ACTION]: 'Call to Action Optimization',
  };
  return labels[technique] || 'Unknown Technique';
}

export function getSEOContentOptimizationPriorityLabel(
  priority: SEOContentOptimizationPriority
): string {
  const labels: Record<SEOContentOptimizationPriority, string> = {
    [SEO_CONTENT_OPTIMIZATION.PRIORITIES.CRITICAL]: 'Critical',
    [SEO_CONTENT_OPTIMIZATION.PRIORITIES.HIGH]: 'High',
    [SEO_CONTENT_OPTIMIZATION.PRIORITIES.MEDIUM]: 'Medium',
    [SEO_CONTENT_OPTIMIZATION.PRIORITIES.LOW]: 'Low',
    [SEO_CONTENT_OPTIMIZATION.PRIORITIES.OPTIONAL]: 'Optional',
  };
  return labels[priority] || 'Unknown Priority';
}

export function getSEOContentOptimizationImpactLabel(impact: SEOContentOptimizationImpact): string {
  const labels: Record<SEOContentOptimizationImpact, string> = {
    [SEO_CONTENT_OPTIMIZATION.IMPACT_LEVELS.HIGH]: 'High Impact',
    [SEO_CONTENT_OPTIMIZATION.IMPACT_LEVELS.MEDIUM]: 'Medium Impact',
    [SEO_CONTENT_OPTIMIZATION.IMPACT_LEVELS.LOW]: 'Low Impact',
    [SEO_CONTENT_OPTIMIZATION.IMPACT_LEVELS.MINIMAL]: 'Minimal Impact',
  };
  return labels[impact] || 'Unknown Impact';
}

export function getSEOContentOptimizationEffortLabel(effort: SEOContentOptimizationEffort): string {
  const labels: Record<SEOContentOptimizationEffort, string> = {
    [SEO_CONTENT_OPTIMIZATION.EFFORT_LEVELS.LOW]: 'Low Effort (< 1h)',
    [SEO_CONTENT_OPTIMIZATION.EFFORT_LEVELS.MEDIUM]: 'Medium Effort (1-4h)',
    [SEO_CONTENT_OPTIMIZATION.EFFORT_LEVELS.HIGH]: 'High Effort (4-8h)',
    [SEO_CONTENT_OPTIMIZATION.EFFORT_LEVELS.EXTREME]: 'Extreme Effort (8+ h)',
  };
  return labels[effort] || 'Unknown Effort';
}

export function getSEOContentOptimizationToolLabel(tool: SEOContentOptimizationTool): string {
  const labels: Record<SEOContentOptimizationTool, string> = {
    [SEO_CONTENT_OPTIMIZATION.TOOLS.GOOGLE_SEARCH_CONSOLE]: 'Google Search Console',
    [SEO_CONTENT_OPTIMIZATION.TOOLS.GOOGLE_ANALYTICS]: 'Google Analytics',
    [SEO_CONTENT_OPTIMIZATION.TOOLS.SEMRUSH]: 'SEMrush',
    [SEO_CONTENT_OPTIMIZATION.TOOLS.AHREFS]: 'Ahrefs',
    [SEO_CONTENT_OPTIMIZATION.TOOLS.MOZ]: 'Moz',
    [SEO_CONTENT_OPTIMIZATION.TOOLS.SCREAMING_FROG]: 'Screaming Frog',
    [SEO_CONTENT_OPTIMIZATION.TOOLS.PAGERESULTS]: 'PageResults',
    [SEO_CONTENT_OPTIMIZATION.TOOLS.GRAMMARLY]: 'Grammarly',
    [SEO_CONTENT_OPTIMIZATION.TOOLS.HEMINGWAY]: 'Hemingway',
    [SEO_CONTENT_OPTIMIZATION.TOOLS.YOAST]: 'Yoast SEO',
    [SEO_CONTENT_OPTIMIZATION.TOOLS.RANK_MATH]: 'Rank Math',
    [SEO_CONTENT_OPTIMIZATION.TOOLS.SURFER_SEO]: 'Surfer SEO',
    [SEO_CONTENT_OPTIMIZATION.TOOLS.CLEARWORLDS]: 'Clearwords',
    [SEO_CONTENT_OPTIMIZATION.TOOLS.GT_METRIX]: 'GTmetrix',
    [SEO_CONTENT_OPTIMIZATION.TOOLS.PAGESPEED_INSIGHTS]: 'PageSpeed Insights',
    [SEO_CONTENT_OPTIMIZATION.TOOLS.WEBPAGETEST]: 'WebPageTest',
    [SEO_CONTENT_OPTIMIZATION.TOOLS.PINGDOM]: 'Pingdom',
  };
  return labels[tool] || 'Unknown Tool';
}
