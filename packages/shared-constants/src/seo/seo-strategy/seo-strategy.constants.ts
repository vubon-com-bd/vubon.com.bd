/**
 * SEO Strategy Constants
 * Configuration for SEO strategies, planning, and execution
 */

export const SEO_STRATEGY = {
  // Strategy Types
  TYPES: {
    ON_PAGE: 'on_page',
    OFF_PAGE: 'off_page',
    TECHNICAL: 'technical',
    CONTENT: 'content',
    LOCAL: 'local',
    ECOMMERCE: 'ecommerce',
    MOBILE: 'mobile',
    VOICE: 'voice',
    VIDEO: 'video',
    IMAGE: 'image',
    INTERNATIONAL: 'international',
    LINK_BUILDING: 'link_building',
    BRAND: 'brand',
    REPUTATION: 'reputation',
    SOCIAL: 'social',
    ANALYTICS: 'analytics',
  } as const,

  // Strategy Status
  STATUS: {
    DRAFT: 'draft',
    PLANNING: 'planning',
    IN_REVIEW: 'in_review',
    APPROVED: 'approved',
    IN_PROGRESS: 'in_progress',
    IMPLEMENTED: 'implemented',
    MONITORING: 'monitoring',
    OPTIMIZING: 'optimizing',
    COMPLETED: 'completed',
    PAUSED: 'paused',
    CANCELLED: 'cancelled',
    ARCHIVED: 'archived',
  } as const,

  // Strategy Priority
  PRIORITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    OPTIONAL: 'optional',
  } as const,

  // Strategy Goals
  GOALS: {
    INCREASE_TRAFFIC: 'increase_traffic',
    IMPROVE_RANKINGS: 'improve_rankings',
    INCREASE_CONVERSIONS: 'increase_conversions',
    IMPROVE_CLICK_THROUGH: 'improve_click_through',
    REDUCE_BOUNCE_RATE: 'reduce_bounce_rate',
    INCREASE_DWELL_TIME: 'increase_dwell_time',
    IMPROVE_BRAND_AWARENESS: 'improve_brand_awareness',
    INCREASE_BACKLINKS: 'increase_backlinks',
    IMPROVE_DOMAIN_AUTHORITY: 'improve_domain_authority',
    INCREASE_LOCAL_VISIBILITY: 'increase_local_visibility',
    IMPROVE_MOBILE_EXPERIENCE: 'improve_mobile_experience',
    INCREASE_SOCIAL_SHARES: 'increase_social_shares',
    IMPROVE_USER_ENGAGEMENT: 'improve_user_engagement',
    INCREASE_REVENUE: 'increase_revenue',
    REDUCE_ACQUISITION_COST: 'reduce_acquisition_cost',
  } as const,

  // Strategy KPIs
  KPIS: {
    ORGANIC_TRAFFIC: 'organic_traffic',
    KEYWORD_RANKINGS: 'keyword_rankings',
    CONVERSION_RATE: 'conversion_rate',
    CLICK_THROUGH_RATE: 'click_through_rate',
    BOUNCE_RATE: 'bounce_rate',
    DWELL_TIME: 'dwell_time',
    PAGES_PER_SESSION: 'pages_per_session',
    BACKLINK_COUNT: 'backlink_count',
    DOMAIN_AUTHORITY: 'domain_authority',
    PAGE_AUTHORITY: 'page_authority',
    LOCAL_PACK_RANKINGS: 'local_pack_rankings',
    MOBILE_USABILITY: 'mobile_usability',
    PAGE_SPEED: 'page_speed',
    SOCIAL_SIGNALS: 'social_signals',
    BRAND_SEARCHES: 'brand_searches',
    REVENUE_ATTRIBUTION: 'revenue_attribution',
  } as const,

  // Strategy Timeline
  TIMELINE: {
    SHORT_TERM: 'short_term', // 0-3 months
    MEDIUM_TERM: 'medium_term', // 3-6 months
    LONG_TERM: 'long_term', // 6-12 months
    ONGOING: 'ongoing', // 12+ months
  } as const,

  // Strategy Budget
  BUDGET_RANGES: {
    LOW: 'low', // < $500/month
    MEDIUM: 'medium', // $500-$2000/month
    HIGH: 'high', // $2000-$5000/month
    ENTERPRISE: 'enterprise', // $5000+/month
  } as const,

  // Strategy Resources
  RESOURCES: {
    INTERNAL: 'internal',
    EXTERNAL: 'external',
    HYBRID: 'hybrid',
    AGENCY: 'agency',
    FREELANCE: 'freelance',
    IN_HOUSE: 'in_house',
  } as const,

  // Strategy Frequency
  FREQUENCY: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    BI_WEEKLY: 'bi_weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    ANNUALLY: 'annually',
  } as const,

  // Strategy Metrics
  METRICS: {
    IMPRESSIONS: 'impressions',
    CLICKS: 'clicks',
    POSITION: 'position',
    CTR: 'ctr',
    SESSIONS: 'sessions',
    USERS: 'users',
    PAGE_VIEWS: 'page_views',
    EXIT_RATE: 'exit_rate',
    TIME_ON_PAGE: 'time_on_page',
    NEW_SESSIONS: 'new_sessions',
    RETURNING_USERS: 'returning_users',
    CONVERSIONS: 'conversions',
    REVENUE: 'revenue',
    ROI: 'roi',
  } as const,

  // Strategy Risks
  RISKS: {
    ALGORITHM_UPDATE: 'algorithm_update',
    COMPETITOR_ACTION: 'competitor_action',
    RESOURCE_LIMITATION: 'resource_limitation',
    BUDGET_CUTS: 'budget_cuts',
    TECHNICAL_ISSUES: 'technical_issues',
    CONTENT_QUALITY: 'content_quality',
    LINK_QUALITY: 'link_quality',
    PENALTY_RISK: 'penalty_risk',
    MARKET_CHANGES: 'market_changes',
    TEAM_TURNOVER: 'team_turnover',
  } as const,

  // Strategy Phases
  PHASES: {
    RESEARCH: 'research',
    PLANNING: 'planning',
    EXECUTION: 'execution',
    MONITORING: 'monitoring',
    ANALYSIS: 'analysis',
    OPTIMIZATION: 'optimization',
    REPORTING: 'reporting',
  } as const,
} as const;

// Strategy Types
export type SEOStrategyType = (typeof SEO_STRATEGY.TYPES)[keyof typeof SEO_STRATEGY.TYPES];

// Strategy Status
export type SEOStrategyStatus = (typeof SEO_STRATEGY.STATUS)[keyof typeof SEO_STRATEGY.STATUS];

// Strategy Priority
export type SEOStrategyPriority =
  (typeof SEO_STRATEGY.PRIORITY)[keyof typeof SEO_STRATEGY.PRIORITY];

// Strategy Goals
export type SEOStrategyGoal = (typeof SEO_STRATEGY.GOALS)[keyof typeof SEO_STRATEGY.GOALS];

// Strategy KPIs
export type SEOStrategyKPI = (typeof SEO_STRATEGY.KPIS)[keyof typeof SEO_STRATEGY.KPIS];

// Strategy Timeline
export type SEOStrategyTimeline =
  (typeof SEO_STRATEGY.TIMELINE)[keyof typeof SEO_STRATEGY.TIMELINE];

// Strategy Budget Range
export type SEOStrategyBudgetRange =
  (typeof SEO_STRATEGY.BUDGET_RANGES)[keyof typeof SEO_STRATEGY.BUDGET_RANGES];

// Strategy Resources
export type SEOStrategyResource =
  (typeof SEO_STRATEGY.RESOURCES)[keyof typeof SEO_STRATEGY.RESOURCES];

// Strategy Frequency
export type SEOStrategyFrequency =
  (typeof SEO_STRATEGY.FREQUENCY)[keyof typeof SEO_STRATEGY.FREQUENCY];

// Strategy Metrics
export type SEOStrategyMetric = (typeof SEO_STRATEGY.METRICS)[keyof typeof SEO_STRATEGY.METRICS];

// Strategy Risks
export type SEOStrategyRisk = (typeof SEO_STRATEGY.RISKS)[keyof typeof SEO_STRATEGY.RISKS];

// Strategy Phases
export type SEOStrategyPhase = (typeof SEO_STRATEGY.PHASES)[keyof typeof SEO_STRATEGY.PHASES];

// Utility Functions
export function getSEOStrategyTypeLabel(type: SEOStrategyType): string {
  const labels: Record<SEOStrategyType, string> = {
    [SEO_STRATEGY.TYPES.ON_PAGE]: 'On-Page SEO',
    [SEO_STRATEGY.TYPES.OFF_PAGE]: 'Off-Page SEO',
    [SEO_STRATEGY.TYPES.TECHNICAL]: 'Technical SEO',
    [SEO_STRATEGY.TYPES.CONTENT]: 'Content Strategy',
    [SEO_STRATEGY.TYPES.LOCAL]: 'Local SEO',
    [SEO_STRATEGY.TYPES.ECOMMERCE]: 'E-commerce SEO',
    [SEO_STRATEGY.TYPES.MOBILE]: 'Mobile SEO',
    [SEO_STRATEGY.TYPES.VOICE]: 'Voice Search SEO',
    [SEO_STRATEGY.TYPES.VIDEO]: 'Video SEO',
    [SEO_STRATEGY.TYPES.IMAGE]: 'Image SEO',
    [SEO_STRATEGY.TYPES.INTERNATIONAL]: 'International SEO',
    [SEO_STRATEGY.TYPES.LINK_BUILDING]: 'Link Building',
    [SEO_STRATEGY.TYPES.BRAND]: 'Brand Strategy',
    [SEO_STRATEGY.TYPES.REPUTATION]: 'Reputation Management',
    [SEO_STRATEGY.TYPES.SOCIAL]: 'Social SEO',
    [SEO_STRATEGY.TYPES.ANALYTICS]: 'Analytics & Reporting',
  };
  return labels[type] || 'Unknown Strategy Type';
}

export function getSEOStrategyStatusLabel(status: SEOStrategyStatus): string {
  const labels: Record<SEOStrategyStatus, string> = {
    [SEO_STRATEGY.STATUS.DRAFT]: 'Draft',
    [SEO_STRATEGY.STATUS.PLANNING]: 'Planning',
    [SEO_STRATEGY.STATUS.IN_REVIEW]: 'In Review',
    [SEO_STRATEGY.STATUS.APPROVED]: 'Approved',
    [SEO_STRATEGY.STATUS.IN_PROGRESS]: 'In Progress',
    [SEO_STRATEGY.STATUS.IMPLEMENTED]: 'Implemented',
    [SEO_STRATEGY.STATUS.MONITORING]: 'Monitoring',
    [SEO_STRATEGY.STATUS.OPTIMIZING]: 'Optimizing',
    [SEO_STRATEGY.STATUS.COMPLETED]: 'Completed',
    [SEO_STRATEGY.STATUS.PAUSED]: 'Paused',
    [SEO_STRATEGY.STATUS.CANCELLED]: 'Cancelled',
    [SEO_STRATEGY.STATUS.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Status';
}

export function getSEOStrategyPriorityLabel(priority: SEOStrategyPriority): string {
  const labels: Record<SEOStrategyPriority, string> = {
    [SEO_STRATEGY.PRIORITY.CRITICAL]: 'Critical',
    [SEO_STRATEGY.PRIORITY.HIGH]: 'High',
    [SEO_STRATEGY.PRIORITY.MEDIUM]: 'Medium',
    [SEO_STRATEGY.PRIORITY.LOW]: 'Low',
    [SEO_STRATEGY.PRIORITY.OPTIONAL]: 'Optional',
  };
  return labels[priority] || 'Unknown Priority';
}

export function getSEOStrategyGoalLabel(goal: SEOStrategyGoal): string {
  const labels: Record<SEOStrategyGoal, string> = {
    [SEO_STRATEGY.GOALS.INCREASE_TRAFFIC]: 'Increase Organic Traffic',
    [SEO_STRATEGY.GOALS.IMPROVE_RANKINGS]: 'Improve Keyword Rankings',
    [SEO_STRATEGY.GOALS.INCREASE_CONVERSIONS]: 'Increase Conversions',
    [SEO_STRATEGY.GOALS.IMPROVE_CLICK_THROUGH]: 'Improve Click-Through Rate',
    [SEO_STRATEGY.GOALS.REDUCE_BOUNCE_RATE]: 'Reduce Bounce Rate',
    [SEO_STRATEGY.GOALS.INCREASE_DWELL_TIME]: 'Increase Dwell Time',
    [SEO_STRATEGY.GOALS.IMPROVE_BRAND_AWARENESS]: 'Improve Brand Awareness',
    [SEO_STRATEGY.GOALS.INCREASE_BACKLINKS]: 'Increase Backlinks',
    [SEO_STRATEGY.GOALS.IMPROVE_DOMAIN_AUTHORITY]: 'Improve Domain Authority',
    [SEO_STRATEGY.GOALS.INCREASE_LOCAL_VISIBILITY]: 'Increase Local Visibility',
    [SEO_STRATEGY.GOALS.IMPROVE_MOBILE_EXPERIENCE]: 'Improve Mobile Experience',
    [SEO_STRATEGY.GOALS.INCREASE_SOCIAL_SHARES]: 'Increase Social Shares',
    [SEO_STRATEGY.GOALS.IMPROVE_USER_ENGAGEMENT]: 'Improve User Engagement',
    [SEO_STRATEGY.GOALS.INCREASE_REVENUE]: 'Increase Revenue',
    [SEO_STRATEGY.GOALS.REDUCE_ACQUISITION_COST]: 'Reduce Acquisition Cost',
  };
  return labels[goal] || 'Unknown Goal';
}

export function getSEOStrategyKPILabel(kpi: SEOStrategyKPI): string {
  const labels: Record<SEOStrategyKPI, string> = {
    [SEO_STRATEGY.KPIS.ORGANIC_TRAFFIC]: 'Organic Traffic',
    [SEO_STRATEGY.KPIS.KEYWORD_RANKINGS]: 'Keyword Rankings',
    [SEO_STRATEGY.KPIS.CONVERSION_RATE]: 'Conversion Rate',
    [SEO_STRATEGY.KPIS.CLICK_THROUGH_RATE]: 'Click-Through Rate',
    [SEO_STRATEGY.KPIS.BOUNCE_RATE]: 'Bounce Rate',
    [SEO_STRATEGY.KPIS.DWELL_TIME]: 'Dwell Time',
    [SEO_STRATEGY.KPIS.PAGES_PER_SESSION]: 'Pages Per Session',
    [SEO_STRATEGY.KPIS.BACKLINK_COUNT]: 'Backlink Count',
    [SEO_STRATEGY.KPIS.DOMAIN_AUTHORITY]: 'Domain Authority',
    [SEO_STRATEGY.KPIS.PAGE_AUTHORITY]: 'Page Authority',
    [SEO_STRATEGY.KPIS.LOCAL_PACK_RANKINGS]: 'Local Pack Rankings',
    [SEO_STRATEGY.KPIS.MOBILE_USABILITY]: 'Mobile Usability',
    [SEO_STRATEGY.KPIS.PAGE_SPEED]: 'Page Speed',
    [SEO_STRATEGY.KPIS.SOCIAL_SIGNALS]: 'Social Signals',
    [SEO_STRATEGY.KPIS.BRAND_SEARCHES]: 'Brand Searches',
    [SEO_STRATEGY.KPIS.REVENUE_ATTRIBUTION]: 'Revenue Attribution',
  };
  return labels[kpi] || 'Unknown KPI';
}

export function getSEOStrategyTimelineLabel(timeline: SEOStrategyTimeline): string {
  const labels: Record<SEOStrategyTimeline, string> = {
    [SEO_STRATEGY.TIMELINE.SHORT_TERM]: 'Short Term (0-3 months)',
    [SEO_STRATEGY.TIMELINE.MEDIUM_TERM]: 'Medium Term (3-6 months)',
    [SEO_STRATEGY.TIMELINE.LONG_TERM]: 'Long Term (6-12 months)',
    [SEO_STRATEGY.TIMELINE.ONGOING]: 'Ongoing (12+ months)',
  };
  return labels[timeline] || 'Unknown Timeline';
}

export function getSEOStrategyBudgetLabel(budget: SEOStrategyBudgetRange): string {
  const labels: Record<SEOStrategyBudgetRange, string> = {
    [SEO_STRATEGY.BUDGET_RANGES.LOW]: 'Low (< $500/month)',
    [SEO_STRATEGY.BUDGET_RANGES.MEDIUM]: 'Medium ($500-$2000/month)',
    [SEO_STRATEGY.BUDGET_RANGES.HIGH]: 'High ($2000-$5000/month)',
    [SEO_STRATEGY.BUDGET_RANGES.ENTERPRISE]: 'Enterprise ($5000+/month)',
  };
  return labels[budget] || 'Unknown Budget Range';
}

export function getSEOStrategyResourceLabel(resource: SEOStrategyResource): string {
  const labels: Record<SEOStrategyResource, string> = {
    [SEO_STRATEGY.RESOURCES.INTERNAL]: 'Internal Team',
    [SEO_STRATEGY.RESOURCES.EXTERNAL]: 'External Team',
    [SEO_STRATEGY.RESOURCES.HYBRID]: 'Hybrid (Internal + External)',
    [SEO_STRATEGY.RESOURCES.AGENCY]: 'Agency',
    [SEO_STRATEGY.RESOURCES.FREELANCE]: 'Freelance',
    [SEO_STRATEGY.RESOURCES.IN_HOUSE]: 'In-House',
  };
  return labels[resource] || 'Unknown Resource Type';
}

export function getSEOStrategyPhaseLabel(phase: SEOStrategyPhase): string {
  const labels: Record<SEOStrategyPhase, string> = {
    [SEO_STRATEGY.PHASES.RESEARCH]: 'Research',
    [SEO_STRATEGY.PHASES.PLANNING]: 'Planning',
    [SEO_STRATEGY.PHASES.EXECUTION]: 'Execution',
    [SEO_STRATEGY.PHASES.MONITORING]: 'Monitoring',
    [SEO_STRATEGY.PHASES.ANALYSIS]: 'Analysis',
    [SEO_STRATEGY.PHASES.OPTIMIZATION]: 'Optimization',
    [SEO_STRATEGY.PHASES.REPORTING]: 'Reporting',
  };
  return labels[phase] || 'Unknown Phase';
}

export function getSEOStrategyRiskLabel(risk: SEOStrategyRisk): string {
  const labels: Record<SEOStrategyRisk, string> = {
    [SEO_STRATEGY.RISKS.ALGORITHM_UPDATE]: 'Algorithm Update',
    [SEO_STRATEGY.RISKS.COMPETITOR_ACTION]: 'Competitor Action',
    [SEO_STRATEGY.RISKS.RESOURCE_LIMITATION]: 'Resource Limitation',
    [SEO_STRATEGY.RISKS.BUDGET_CUTS]: 'Budget Cuts',
    [SEO_STRATEGY.RISKS.TECHNICAL_ISSUES]: 'Technical Issues',
    [SEO_STRATEGY.RISKS.CONTENT_QUALITY]: 'Content Quality Issues',
    [SEO_STRATEGY.RISKS.LINK_QUALITY]: 'Link Quality Issues',
    [SEO_STRATEGY.RISKS.PENALTY_RISK]: 'Penalty Risk',
    [SEO_STRATEGY.RISKS.MARKET_CHANGES]: 'Market Changes',
    [SEO_STRATEGY.RISKS.TEAM_TURNOVER]: 'Team Turnover',
  };
  return labels[risk] || 'Unknown Risk';
}

export function isSEOStrategyActive(status: SEOStrategyStatus): boolean {
  const activeStatuses: SEOStrategyStatus[] = [
    SEO_STRATEGY.STATUS.IN_PROGRESS,
    SEO_STRATEGY.STATUS.IMPLEMENTED,
    SEO_STRATEGY.STATUS.MONITORING,
    SEO_STRATEGY.STATUS.OPTIMIZING,
  ];
  return activeStatuses.includes(status);
}

export function isSEOStrategyComplete(status: SEOStrategyStatus): boolean {
  const completeStatuses: SEOStrategyStatus[] = [
    SEO_STRATEGY.STATUS.COMPLETED,
    SEO_STRATEGY.STATUS.ARCHIVED,
  ];
  return completeStatuses.includes(status);
}

export function getSEOStrategyStatusColor(status: SEOStrategyStatus): string {
  const colors: Record<SEOStrategyStatus, string> = {
    [SEO_STRATEGY.STATUS.DRAFT]: '#9E9E9E',
    [SEO_STRATEGY.STATUS.PLANNING]: '#2196F3',
    [SEO_STRATEGY.STATUS.IN_REVIEW]: '#FF9800',
    [SEO_STRATEGY.STATUS.APPROVED]: '#4CAF50',
    [SEO_STRATEGY.STATUS.IN_PROGRESS]: '#00BCD4',
    [SEO_STRATEGY.STATUS.IMPLEMENTED]: '#8BC34A',
    [SEO_STRATEGY.STATUS.MONITORING]: '#3F51B5',
    [SEO_STRATEGY.STATUS.OPTIMIZING]: '#FFC107',
    [SEO_STRATEGY.STATUS.COMPLETED]: '#4CAF50',
    [SEO_STRATEGY.STATUS.PAUSED]: '#FF9800',
    [SEO_STRATEGY.STATUS.CANCELLED]: '#F44336',
    [SEO_STRATEGY.STATUS.ARCHIVED]: '#9E9E9E',
  };
  return colors[status] || '#9E9E9E';
}
