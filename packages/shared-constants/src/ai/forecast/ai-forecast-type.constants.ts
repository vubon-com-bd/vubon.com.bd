/**
 * AI Forecast Type Constants
 * Types and classifications for AI forecasting
 */

export const AI_FORECAST_TYPE = {
  // Forecast Domains
  DOMAINS: {
    BUSINESS: 'business',
    ECONOMIC: 'economic',
    FINANCIAL: 'financial',
    OPERATIONAL: 'operational',
    MARKET: 'market',
    DEMOGRAPHIC: 'demographic',
    ENVIRONMENTAL: 'environmental',
    TECHNOLOGICAL: 'technological',
    SOCIAL: 'social',
    POLITICAL: 'political',
  } as const,

  // Forecast Sub-Types
  SUB_TYPES: {
    // Business
    REVENUE: 'revenue',
    COST: 'cost',
    PROFIT: 'profit',
    CASH_FLOW: 'cash_flow',
    BUDGET: 'budget',

    // Economic
    GDP: 'gdp',
    INFLATION: 'inflation',
    UNEMPLOYMENT: 'unemployment',
    INTEREST_RATE: 'interest_rate',
    EXCHANGE_RATE: 'exchange_rate',

    // Financial
    STOCK_PRICE: 'stock_price',
    MARKET_INDEX: 'market_index',
    TRADING_VOLUME: 'trading_volume',
    MARKET_CAP: 'market_cap',

    // Operational
    DEMAND: 'demand',
    SUPPLY: 'supply',
    INVENTORY: 'inventory',
    CAPACITY: 'capacity',
    PRODUCTION: 'production',

    // Market
    MARKET_SHARE: 'market_share',
    COMPETITOR: 'competitor',
    CUSTOMER: 'customer',
    TREND: 'trend',
  } as const,

  // Forecast Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    MODERATE: 'moderate',
    COMPLEX: 'complex',
    VERY_COMPLEX: 'very_complex',
  } as const,

  // Forecast Accuracy
  ACCURACY: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    UNKNOWN: 'unknown',
  } as const,

  // Forecast Granularity
  GRANULARITY: {
    MICRO: 'micro',
    MESO: 'meso',
    MACRO: 'macro',
    MEGA: 'mega',
  } as const,

  // Forecast Scope
  SCOPES: {
    INDIVIDUAL: 'individual',
    GROUP: 'group',
    ORGANIZATION: 'organization',
    INDUSTRY: 'industry',
    REGIONAL: 'regional',
    NATIONAL: 'national',
    GLOBAL: 'global',
  } as const,
} as const;

// Forecast Domains
export type AIForecastDomain =
  (typeof AI_FORECAST_TYPE.DOMAINS)[keyof typeof AI_FORECAST_TYPE.DOMAINS];

// Forecast Sub-Types
export type AIForecastSubType =
  (typeof AI_FORECAST_TYPE.SUB_TYPES)[keyof typeof AI_FORECAST_TYPE.SUB_TYPES];

// Forecast Complexity
export type AIForecastComplexity =
  (typeof AI_FORECAST_TYPE.COMPLEXITY)[keyof typeof AI_FORECAST_TYPE.COMPLEXITY];

// Forecast Accuracy
export type AIForecastAccuracy =
  (typeof AI_FORECAST_TYPE.ACCURACY)[keyof typeof AI_FORECAST_TYPE.ACCURACY];

// Forecast Granularity
export type AIForecastGranularity =
  (typeof AI_FORECAST_TYPE.GRANULARITY)[keyof typeof AI_FORECAST_TYPE.GRANULARITY];

// Forecast Scope
export type AIForecastScope =
  (typeof AI_FORECAST_TYPE.SCOPES)[keyof typeof AI_FORECAST_TYPE.SCOPES];

// Utility Functions
export function getForecastDomainLabel(domain: AIForecastDomain): string {
  const labels: Record<AIForecastDomain, string> = {
    [AI_FORECAST_TYPE.DOMAINS.BUSINESS]: 'Business',
    [AI_FORECAST_TYPE.DOMAINS.ECONOMIC]: 'Economic',
    [AI_FORECAST_TYPE.DOMAINS.FINANCIAL]: 'Financial',
    [AI_FORECAST_TYPE.DOMAINS.OPERATIONAL]: 'Operational',
    [AI_FORECAST_TYPE.DOMAINS.MARKET]: 'Market',
    [AI_FORECAST_TYPE.DOMAINS.DEMOGRAPHIC]: 'Demographic',
    [AI_FORECAST_TYPE.DOMAINS.ENVIRONMENTAL]: 'Environmental',
    [AI_FORECAST_TYPE.DOMAINS.TECHNOLOGICAL]: 'Technological',
    [AI_FORECAST_TYPE.DOMAINS.SOCIAL]: 'Social',
    [AI_FORECAST_TYPE.DOMAINS.POLITICAL]: 'Political',
  };
  return labels[domain] || 'Unknown';
}

export function getForecastSubTypeLabel(subType: AIForecastSubType): string {
  const labels: Record<AIForecastSubType, string> = {
    [AI_FORECAST_TYPE.SUB_TYPES.REVENUE]: 'Revenue',
    [AI_FORECAST_TYPE.SUB_TYPES.COST]: 'Cost',
    [AI_FORECAST_TYPE.SUB_TYPES.PROFIT]: 'Profit',
    [AI_FORECAST_TYPE.SUB_TYPES.CASH_FLOW]: 'Cash Flow',
    [AI_FORECAST_TYPE.SUB_TYPES.BUDGET]: 'Budget',
    [AI_FORECAST_TYPE.SUB_TYPES.GDP]: 'GDP',
    [AI_FORECAST_TYPE.SUB_TYPES.INFLATION]: 'Inflation',
    [AI_FORECAST_TYPE.SUB_TYPES.UNEMPLOYMENT]: 'Unemployment',
    [AI_FORECAST_TYPE.SUB_TYPES.INTEREST_RATE]: 'Interest Rate',
    [AI_FORECAST_TYPE.SUB_TYPES.EXCHANGE_RATE]: 'Exchange Rate',
    [AI_FORECAST_TYPE.SUB_TYPES.STOCK_PRICE]: 'Stock Price',
    [AI_FORECAST_TYPE.SUB_TYPES.MARKET_INDEX]: 'Market Index',
    [AI_FORECAST_TYPE.SUB_TYPES.TRADING_VOLUME]: 'Trading Volume',
    [AI_FORECAST_TYPE.SUB_TYPES.MARKET_CAP]: 'Market Cap',
    [AI_FORECAST_TYPE.SUB_TYPES.DEMAND]: 'Demand',
    [AI_FORECAST_TYPE.SUB_TYPES.SUPPLY]: 'Supply',
    [AI_FORECAST_TYPE.SUB_TYPES.INVENTORY]: 'Inventory',
    [AI_FORECAST_TYPE.SUB_TYPES.CAPACITY]: 'Capacity',
    [AI_FORECAST_TYPE.SUB_TYPES.PRODUCTION]: 'Production',
    [AI_FORECAST_TYPE.SUB_TYPES.MARKET_SHARE]: 'Market Share',
    [AI_FORECAST_TYPE.SUB_TYPES.COMPETITOR]: 'Competitor',
    [AI_FORECAST_TYPE.SUB_TYPES.CUSTOMER]: 'Customer',
    [AI_FORECAST_TYPE.SUB_TYPES.TREND]: 'Trend',
  };
  return labels[subType] || 'Unknown';
}

export function getForecastComplexityLabel(complexity: AIForecastComplexity): string {
  const labels: Record<AIForecastComplexity, string> = {
    [AI_FORECAST_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [AI_FORECAST_TYPE.COMPLEXITY.MODERATE]: 'Moderate',
    [AI_FORECAST_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [AI_FORECAST_TYPE.COMPLEXITY.VERY_COMPLEX]: 'Very Complex',
  };
  return labels[complexity] || 'Unknown';
}

export function getForecastAccuracyLabel(accuracy: AIForecastAccuracy): string {
  const labels: Record<AIForecastAccuracy, string> = {
    [AI_FORECAST_TYPE.ACCURACY.HIGH]: 'High',
    [AI_FORECAST_TYPE.ACCURACY.MEDIUM]: 'Medium',
    [AI_FORECAST_TYPE.ACCURACY.LOW]: 'Low',
    [AI_FORECAST_TYPE.ACCURACY.UNKNOWN]: 'Unknown',
  };
  return labels[accuracy] || 'Unknown';
}

export function getForecastGranularityLabel(granularity: AIForecastGranularity): string {
  const labels: Record<AIForecastGranularity, string> = {
    [AI_FORECAST_TYPE.GRANULARITY.MICRO]: 'Micro',
    [AI_FORECAST_TYPE.GRANULARITY.MESO]: 'Meso',
    [AI_FORECAST_TYPE.GRANULARITY.MACRO]: 'Macro',
    [AI_FORECAST_TYPE.GRANULARITY.MEGA]: 'Mega',
  };
  return labels[granularity] || 'Unknown';
}

export function getForecastScopeLabel(scope: AIForecastScope): string {
  const labels: Record<AIForecastScope, string> = {
    [AI_FORECAST_TYPE.SCOPES.INDIVIDUAL]: 'Individual',
    [AI_FORECAST_TYPE.SCOPES.GROUP]: 'Group',
    [AI_FORECAST_TYPE.SCOPES.ORGANIZATION]: 'Organization',
    [AI_FORECAST_TYPE.SCOPES.INDUSTRY]: 'Industry',
    [AI_FORECAST_TYPE.SCOPES.REGIONAL]: 'Regional',
    [AI_FORECAST_TYPE.SCOPES.NATIONAL]: 'National',
    [AI_FORECAST_TYPE.SCOPES.GLOBAL]: 'Global',
  };
  return labels[scope] || 'Unknown';
}

export function getComplexityScore(complexity: AIForecastComplexity): number {
  const scores: Record<AIForecastComplexity, number> = {
    [AI_FORECAST_TYPE.COMPLEXITY.SIMPLE]: 1,
    [AI_FORECAST_TYPE.COMPLEXITY.MODERATE]: 3,
    [AI_FORECAST_TYPE.COMPLEXITY.COMPLEX]: 5,
    [AI_FORECAST_TYPE.COMPLEXITY.VERY_COMPLEX]: 8,
  };
  return scores[complexity] || 1;
}

export function getAccuracyScore(accuracy: AIForecastAccuracy): number {
  const scores: Record<AIForecastAccuracy, number> = {
    [AI_FORECAST_TYPE.ACCURACY.HIGH]: 0.8,
    [AI_FORECAST_TYPE.ACCURACY.MEDIUM]: 0.5,
    [AI_FORECAST_TYPE.ACCURACY.LOW]: 0.3,
    [AI_FORECAST_TYPE.ACCURACY.UNKNOWN]: 0,
  };
  return scores[accuracy] || 0;
}
