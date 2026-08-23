/**
 * Campaign Constants
 * Core campaign configuration and settings
 */

export const MARKETINGCAMPAIGN = {
  // Campaign Objectives
  OBJECTIVES: {
    AWARENESS: 'awareness',
    CONSIDERATION: 'consideration',
    CONVERSION: 'conversion',
    LOYALTY: 'loyalty',
    RETENTION: 'retention',
    REENGAGEMENT: 'reengagement',
    GROWTH: 'growth',
    REVENUE: 'revenue',
    BRAND: 'brand',
    EDUCATION: 'education',
    COMMUNITY: 'community',
    ADVOCACY: 'advocacy',
  } as const,

  // Campaign Scopes
  SCOPES: {
    GLOBAL: 'global',
    REGIONAL: 'regional',
    LOCAL: 'local',
    DEPARTMENT: 'department',
    TEAM: 'team',
    INDIVIDUAL: 'individual',
  } as const,

  // Campaign Phases
  PHASES: {
    PLANNING: 'planning',
    DESIGN: 'design',
    DEVELOPMENT: 'development',
    REVIEW: 'review',
    APPROVAL: 'approval',
    EXECUTION: 'execution',
    MONITORING: 'monitoring',
    OPTIMIZATION: 'optimization',
    COMPLETION: 'completion',
    ANALYSIS: 'analysis',
  } as const,

  // Campaign Priorities
  PRIORITIES: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    BACKGROUND: 'background',
  } as const,

  // Campaign Risk Levels
  RISK_LEVELS: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  } as const,

  // Campaign Seasons
  SEASONS: {
    SPRING: 'spring',
    SUMMER: 'summer',
    AUTUMN: 'autumn',
    WINTER: 'winter',
    HOLIDAY: 'holiday',
    NEW_YEAR: 'new_year',
    VALENTINE: 'valentine',
    EID: 'eid',
    DURGA_PUJA: 'durga_puja',
    POHELA_BOISHAKH: 'pohela_boishakh',
    BLACK_FRIDAY: 'black_friday',
    CYBER_MONDAY: 'cyber_monday',
  } as const,

  // Campaign Urgency Levels
  URGENCY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  } as const,

  // Campaign Defaults
  DEFAULTS: {
    DEFAULT_DURATION_DAYS: 30,
    MIN_DURATION_DAYS: 1,
    MAX_DURATION_DAYS: 365,
    DEFAULT_BUDGET: 1000,
    MIN_BUDGET: 100,
    MAX_BUDGET: 1000000,
    DEFAULT_PRIORITY: 'medium',
    DEFAULT_RISK_LEVEL: 'low',
    MAX_CAMPAIGNS_PER_USER: 50,
    MAX_TARGETS_PER_CAMPAIGN: 100,
  } as const,

  // Campaign Limits
  LIMITS: {
    MIN_NAME_LENGTH: 3,
    MAX_NAME_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 500,
    MAX_OBJECTIVES: 5,
    MAX_CHANNELS: 10,
    MAX_BUDGET_ITEMS: 20,
    MAX_TARGET_SEGMENTS: 10,
  } as const,
} as const;

// Campaign Objectives
export type MarketingCampaignObjective =
  (typeof MARKETINGCAMPAIGN.OBJECTIVES)[keyof typeof MARKETINGCAMPAIGN.OBJECTIVES];

// Campaign Scopes
export type MarketingCampaignScope =
  (typeof MARKETINGCAMPAIGN.SCOPES)[keyof typeof MARKETINGCAMPAIGN.SCOPES];

// Campaign Phases
export type MarketingCampaignPhase =
  (typeof MARKETINGCAMPAIGN.PHASES)[keyof typeof MARKETINGCAMPAIGN.PHASES];

// Campaign Priorities
export type MarketingCampaignPriority =
  (typeof MARKETINGCAMPAIGN.PRIORITIES)[keyof typeof MARKETINGCAMPAIGN.PRIORITIES];

// Campaign Risk Levels
export type MarketingCampaignRiskLevel =
  (typeof MARKETINGCAMPAIGN.RISK_LEVELS)[keyof typeof MARKETINGCAMPAIGN.RISK_LEVELS];

// Campaign Seasons
export type MarketingCampaignSeason =
  (typeof MARKETINGCAMPAIGN.SEASONS)[keyof typeof MARKETINGCAMPAIGN.SEASONS];

// Campaign Urgency
export type MarketingCampaignUrgency =
  (typeof MARKETINGCAMPAIGN.URGENCY)[keyof typeof MARKETINGCAMPAIGN.URGENCY];

// Campaign Defaults
export type MarketingCampaignDefault =
  (typeof MARKETINGCAMPAIGN.DEFAULTS)[keyof typeof MARKETINGCAMPAIGN.DEFAULTS];

// Campaign Limits
export type MarketingCampaignLimit =
  (typeof MARKETINGCAMPAIGN.LIMITS)[keyof typeof MARKETINGCAMPAIGN.LIMITS];

// Utility Functions
export function marketingcampaignGetObjectiveLabel(objective: MarketingCampaignObjective): string {
  const labels: Record<MarketingCampaignObjective, string> = {
    [MARKETINGCAMPAIGN.OBJECTIVES.AWARENESS]: 'Brand Awareness',
    [MARKETINGCAMPAIGN.OBJECTIVES.CONSIDERATION]: 'Consideration',
    [MARKETINGCAMPAIGN.OBJECTIVES.CONVERSION]: 'Conversion',
    [MARKETINGCAMPAIGN.OBJECTIVES.LOYALTY]: 'Loyalty',
    [MARKETINGCAMPAIGN.OBJECTIVES.RETENTION]: 'Retention',
    [MARKETINGCAMPAIGN.OBJECTIVES.REENGAGEMENT]: 'Re-engagement',
    [MARKETINGCAMPAIGN.OBJECTIVES.GROWTH]: 'Growth',
    [MARKETINGCAMPAIGN.OBJECTIVES.REVENUE]: 'Revenue',
    [MARKETINGCAMPAIGN.OBJECTIVES.BRAND]: 'Brand Building',
    [MARKETINGCAMPAIGN.OBJECTIVES.EDUCATION]: 'Education',
    [MARKETINGCAMPAIGN.OBJECTIVES.COMMUNITY]: 'Community Building',
    [MARKETINGCAMPAIGN.OBJECTIVES.ADVOCACY]: 'Customer Advocacy',
  };
  return labels[objective] || 'Unknown Objective';
}

export function marketingcampaignGetScopeLabel(scope: MarketingCampaignScope): string {
  const labels: Record<MarketingCampaignScope, string> = {
    [MARKETINGCAMPAIGN.SCOPES.GLOBAL]: 'Global',
    [MARKETINGCAMPAIGN.SCOPES.REGIONAL]: 'Regional',
    [MARKETINGCAMPAIGN.SCOPES.LOCAL]: 'Local',
    [MARKETINGCAMPAIGN.SCOPES.DEPARTMENT]: 'Department',
    [MARKETINGCAMPAIGN.SCOPES.TEAM]: 'Team',
    [MARKETINGCAMPAIGN.SCOPES.INDIVIDUAL]: 'Individual',
  };
  return labels[scope] || 'Unknown Scope';
}

export function marketingcampaignGetPhaseLabel(phase: MarketingCampaignPhase): string {
  const labels: Record<MarketingCampaignPhase, string> = {
    [MARKETINGCAMPAIGN.PHASES.PLANNING]: 'Planning',
    [MARKETINGCAMPAIGN.PHASES.DESIGN]: 'Design',
    [MARKETINGCAMPAIGN.PHASES.DEVELOPMENT]: 'Development',
    [MARKETINGCAMPAIGN.PHASES.REVIEW]: 'Review',
    [MARKETINGCAMPAIGN.PHASES.APPROVAL]: 'Approval',
    [MARKETINGCAMPAIGN.PHASES.EXECUTION]: 'Execution',
    [MARKETINGCAMPAIGN.PHASES.MONITORING]: 'Monitoring',
    [MARKETINGCAMPAIGN.PHASES.OPTIMIZATION]: 'Optimization',
    [MARKETINGCAMPAIGN.PHASES.COMPLETION]: 'Completion',
    [MARKETINGCAMPAIGN.PHASES.ANALYSIS]: 'Analysis',
  };
  return labels[phase] || 'Unknown Phase';
}

export function marketingcampaignGetPriorityLabel(priority: MarketingCampaignPriority): string {
  const labels: Record<MarketingCampaignPriority, string> = {
    [MARKETINGCAMPAIGN.PRIORITIES.CRITICAL]: 'Critical',
    [MARKETINGCAMPAIGN.PRIORITIES.HIGH]: 'High',
    [MARKETINGCAMPAIGN.PRIORITIES.MEDIUM]: 'Medium',
    [MARKETINGCAMPAIGN.PRIORITIES.LOW]: 'Low',
    [MARKETINGCAMPAIGN.PRIORITIES.BACKGROUND]: 'Background',
  };
  return labels[priority] || 'Unknown Priority';
}

export function marketingcampaignGetRiskLevelLabel(riskLevel: MarketingCampaignRiskLevel): string {
  const labels: Record<MarketingCampaignRiskLevel, string> = {
    [MARKETINGCAMPAIGN.RISK_LEVELS.LOW]: 'Low Risk',
    [MARKETINGCAMPAIGN.RISK_LEVELS.MEDIUM]: 'Medium Risk',
    [MARKETINGCAMPAIGN.RISK_LEVELS.HIGH]: 'High Risk',
    [MARKETINGCAMPAIGN.RISK_LEVELS.CRITICAL]: 'Critical Risk',
  };
  return labels[riskLevel] || 'Unknown Risk Level';
}

export function marketingcampaignGetSeasonLabel(season: MarketingCampaignSeason): string {
  const labels: Record<MarketingCampaignSeason, string> = {
    [MARKETINGCAMPAIGN.SEASONS.SPRING]: 'Spring',
    [MARKETINGCAMPAIGN.SEASONS.SUMMER]: 'Summer',
    [MARKETINGCAMPAIGN.SEASONS.AUTUMN]: 'Autumn',
    [MARKETINGCAMPAIGN.SEASONS.WINTER]: 'Winter',
    [MARKETINGCAMPAIGN.SEASONS.HOLIDAY]: 'Holiday Season',
    [MARKETINGCAMPAIGN.SEASONS.NEW_YEAR]: 'New Year',
    [MARKETINGCAMPAIGN.SEASONS.VALENTINE]: "Valentine's Day",
    [MARKETINGCAMPAIGN.SEASONS.EID]: 'Eid',
    [MARKETINGCAMPAIGN.SEASONS.DURGA_PUJA]: 'Durga Puja',
    [MARKETINGCAMPAIGN.SEASONS.POHELA_BOISHAKH]: 'Pohela Boishakh',
    [MARKETINGCAMPAIGN.SEASONS.BLACK_FRIDAY]: 'Black Friday',
    [MARKETINGCAMPAIGN.SEASONS.CYBER_MONDAY]: 'Cyber Monday',
  };
  return labels[season] || 'Unknown Season';
}

export function marketingcampaignGetUrgencyLabel(urgency: MarketingCampaignUrgency): string {
  const labels: Record<MarketingCampaignUrgency, string> = {
    [MARKETINGCAMPAIGN.URGENCY.LOW]: 'Low Urgency',
    [MARKETINGCAMPAIGN.URGENCY.MEDIUM]: 'Medium Urgency',
    [MARKETINGCAMPAIGN.URGENCY.HIGH]: 'High Urgency',
    [MARKETINGCAMPAIGN.URGENCY.CRITICAL]: 'Critical Urgency',
  };
  return labels[urgency] || 'Unknown Urgency';
}

export function marketingcampaignIsValidObjective(
  objective: string
): objective is MarketingCampaignObjective {
  return Object.values(MARKETINGCAMPAIGN.OBJECTIVES).includes(
    objective as MarketingCampaignObjective
  );
}

export function marketingcampaignIsValidPriority(
  priority: string
): priority is MarketingCampaignPriority {
  return Object.values(MARKETINGCAMPAIGN.PRIORITIES).includes(
    priority as MarketingCampaignPriority
  );
}

export function marketingcampaignGetDefaultDuration(): number {
  return MARKETINGCAMPAIGN.DEFAULTS.DEFAULT_DURATION_DAYS;
}

export function marketingcampaignGetDefaultBudget(): number {
  return MARKETINGCAMPAIGN.DEFAULTS.DEFAULT_BUDGET;
}

export function marketingcampaignGetDefaultPriority(): MarketingCampaignPriority {
  return MARKETINGCAMPAIGN.DEFAULTS.DEFAULT_PRIORITY;
}

export function marketingcampaignIsHighPriority(priority: MarketingCampaignPriority): boolean {
  return (
    priority === MARKETINGCAMPAIGN.PRIORITIES.CRITICAL ||
    priority === MARKETINGCAMPAIGN.PRIORITIES.HIGH
  );
}

export function marketingcampaignIsUrgent(urgency: MarketingCampaignUrgency): boolean {
  return (
    urgency === MARKETINGCAMPAIGN.URGENCY.HIGH || urgency === MARKETINGCAMPAIGN.URGENCY.CRITICAL
  );
}

export function marketingcampaignIsHighRisk(riskLevel: MarketingCampaignRiskLevel): boolean {
  return (
    riskLevel === MARKETINGCAMPAIGN.RISK_LEVELS.HIGH ||
    riskLevel === MARKETINGCAMPAIGN.RISK_LEVELS.CRITICAL
  );
}
