/**
 * AI Forecast Constants
 * Configuration for forecasting and prediction systems
 */

export const AI_FORECAST = {
  // Forecast Types
  TYPES: {
    DEMAND: 'demand',
    SALES: 'sales',
    REVENUE: 'revenue',
    PROFIT: 'profit',
    INVENTORY: 'inventory',
    PRICE: 'price',
    CUSTOMER: 'customer',
    TREND: 'trend',
    SEASONAL: 'seasonal',
    CYCLICAL: 'cyclical',
    CASH_FLOW: 'cash_flow',
    MARKET: 'market',
    WEATHER: 'weather',
    TRAFFIC: 'traffic',
    RESOURCE: 'resource',
    RISK: 'risk',
  } as const,

  // Forecast Status
  STATUSES: {
    PENDING: 'pending',
    INITIALIZING: 'initializing',
    PROCESSING: 'processing',
    ANALYZING: 'analyzing',
    GENERATING: 'generating',
    COMPLETED: 'completed',
    FAILED: 'failed',
    EXPIRED: 'expired',
    ARCHIVED: 'archived',
    OPTIMIZED: 'optimized',
    CACHED: 'cached',
  } as const,

  // Forecast Methods
  METHODS: {
    // Statistical Methods
    ARIMA: 'arima',
    SARIMA: 'sarima',
    EXPONENTIAL_SMOOTHING: 'exponential_smoothing',
    HOLT_WINTERS: 'holt_winters',
    MOVING_AVERAGE: 'moving_average',
    WEIGHTED_MOVING_AVERAGE: 'weighted_moving_average',

    // Machine Learning Methods
    LINEAR_REGRESSION: 'linear_regression',
    RANDOM_FOREST: 'random_forest',
    GRADIENT_BOOSTING: 'gradient_boosting',
    XGBOOST: 'xgboost',
    LIGHTGBM: 'lightgbm',
    CATBOOST: 'catboost',

    // Deep Learning Methods
    LSTM: 'lstm',
    GRU: 'gru',
    RNN: 'rnn',
    CNN: 'cnn',
    TRANSFORMER: 'transformer',
    TFT: 'tft',
    NBEATS: 'nbeats',
    DEEPAR: 'deepar',

    // Ensemble Methods
    STACKING: 'stacking',
    BAGGING: 'bagging',
    BOOSTING: 'boosting',
    VOTING: 'voting',

    // Bayesian Methods
    BAYESIAN: 'bayesian',
    MCMC: 'mcmc',
    VARIATIONAL: 'variational',
  } as const,

  // Forecast Horizons
  HORIZONS: {
    IMMEDIATE: 'immediate',
    SHORT_TERM: 'short_term',
    MEDIUM_TERM: 'medium_term',
    LONG_TERM: 'long_term',
    EXTENDED: 'extended',
  } as const,

  // Forecast Frequencies
  FREQUENCIES: {
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
    CUSTOM: 'custom',
  } as const,

  // Forecast Confidence
  CONFIDENCE: {
    VERY_LOW: 'very_low',
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    VERY_HIGH: 'very_high',
  } as const,

  // Forecast Quality
  QUALITY: {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    FAIR: 'fair',
    POOR: 'poor',
    UNKNOWN: 'unknown',
  } as const,

  // Forecast Metrics
  METRICS: {
    MAE: 'mae',
    MSE: 'mse',
    RMSE: 'rmse',
    MAPE: 'mape',
    SMAPE: 'smape',
    MASE: 'mase',
    MDA: 'mda',
    R2: 'r2',
    ADJUSTED_R2: 'adjusted_r2',
    AIC: 'aic',
    BIC: 'bic',
    DEVIANCE: 'deviance',
  } as const,

  // Forecast Limits
  LIMITS: {
    MAX_HORIZON: 365,
    MIN_HORIZON: 1,
    DEFAULT_HORIZON: 30,
    MAX_SAMPLES: 1000000,
    MIN_SAMPLES: 2,
    DEFAULT_SAMPLES: 100,
    MAX_SEASONALITY: 365,
    MIN_SEASONALITY: 1,
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 3,
  } as const,

  // Forecast Features
  FEATURES: {
    TREND: 'trend',
    SEASONALITY: 'seasonality',
    CYCLICALITY: 'cyclicality',
    HOLIDAYS: 'holidays',
    EVENTS: 'events',
    EXTERNAL: 'external',
    INTERVENTION: 'intervention',
    LEVEL_SHIFT: 'level_shift',
    OUTLIERS: 'outliers',
  } as const,

  // Forecast Outputs
  OUTPUTS: {
    POINT: 'point',
    INTERVAL: 'interval',
    DISTRIBUTION: 'distribution',
    PERCENTILES: 'percentiles',
    SCENARIOS: 'scenarios',
    SIMULATION: 'simulation',
  } as const,

  // Forecast Validation
  VALIDATION: {
    WALK_FORWARD: 'walk_forward',
    CROSS_VALIDATION: 'cross_validation',
    HOLD_OUT: 'hold_out',
    TIME_SPLIT: 'time_split',
    EXPANDING_WINDOW: 'expanding_window',
    ROLLING_WINDOW: 'rolling_window',
  } as const,
} as const;

// Forecast Types
export type AIForecastType = (typeof AI_FORECAST.TYPES)[keyof typeof AI_FORECAST.TYPES];

// Forecast Status
export type AIForecastStatus = (typeof AI_FORECAST.STATUSES)[keyof typeof AI_FORECAST.STATUSES];

// Forecast Methods
export type AIForecastMethod = (typeof AI_FORECAST.METHODS)[keyof typeof AI_FORECAST.METHODS];

// Forecast Horizons
export type AIForecastHorizon = (typeof AI_FORECAST.HORIZONS)[keyof typeof AI_FORECAST.HORIZONS];

// Forecast Frequencies
export type AIForecastFrequency =
  (typeof AI_FORECAST.FREQUENCIES)[keyof typeof AI_FORECAST.FREQUENCIES];

// Forecast Confidence
export type AIForecastConfidence =
  (typeof AI_FORECAST.CONFIDENCE)[keyof typeof AI_FORECAST.CONFIDENCE];

// Forecast Quality
export type AIForecastQuality = (typeof AI_FORECAST.QUALITY)[keyof typeof AI_FORECAST.QUALITY];

// Forecast Metrics
export type AIForecastMetric = (typeof AI_FORECAST.METRICS)[keyof typeof AI_FORECAST.METRICS];

// Forecast Limits
export type AIForecastLimit = (typeof AI_FORECAST.LIMITS)[keyof typeof AI_FORECAST.LIMITS];

// Forecast Features
export type AIForecastFeature = (typeof AI_FORECAST.FEATURES)[keyof typeof AI_FORECAST.FEATURES];

// Forecast Outputs
export type AIForecastOutput = (typeof AI_FORECAST.OUTPUTS)[keyof typeof AI_FORECAST.OUTPUTS];

// Forecast Validation
export type AIForecastValidation =
  (typeof AI_FORECAST.VALIDATION)[keyof typeof AI_FORECAST.VALIDATION];

// Utility Functions
export function getForecastTypeLabel(type: AIForecastType): string {
  const labels: Record<AIForecastType, string> = {
    [AI_FORECAST.TYPES.DEMAND]: 'Demand',
    [AI_FORECAST.TYPES.SALES]: 'Sales',
    [AI_FORECAST.TYPES.REVENUE]: 'Revenue',
    [AI_FORECAST.TYPES.PROFIT]: 'Profit',
    [AI_FORECAST.TYPES.INVENTORY]: 'Inventory',
    [AI_FORECAST.TYPES.PRICE]: 'Price',
    [AI_FORECAST.TYPES.CUSTOMER]: 'Customer',
    [AI_FORECAST.TYPES.TREND]: 'Trend',
    [AI_FORECAST.TYPES.SEASONAL]: 'Seasonal',
    [AI_FORECAST.TYPES.CYCLICAL]: 'Cyclical',
    [AI_FORECAST.TYPES.CASH_FLOW]: 'Cash Flow',
    [AI_FORECAST.TYPES.MARKET]: 'Market',
    [AI_FORECAST.TYPES.WEATHER]: 'Weather',
    [AI_FORECAST.TYPES.TRAFFIC]: 'Traffic',
    [AI_FORECAST.TYPES.RESOURCE]: 'Resource',
    [AI_FORECAST.TYPES.RISK]: 'Risk',
  };
  return labels[type] || 'Unknown';
}

export function getForecastStatusLabel(status: AIForecastStatus): string {
  const labels: Record<AIForecastStatus, string> = {
    [AI_FORECAST.STATUSES.PENDING]: 'Pending',
    [AI_FORECAST.STATUSES.INITIALIZING]: 'Initializing',
    [AI_FORECAST.STATUSES.PROCESSING]: 'Processing',
    [AI_FORECAST.STATUSES.ANALYZING]: 'Analyzing',
    [AI_FORECAST.STATUSES.GENERATING]: 'Generating',
    [AI_FORECAST.STATUSES.COMPLETED]: 'Completed',
    [AI_FORECAST.STATUSES.FAILED]: 'Failed',
    [AI_FORECAST.STATUSES.EXPIRED]: 'Expired',
    [AI_FORECAST.STATUSES.ARCHIVED]: 'Archived',
    [AI_FORECAST.STATUSES.OPTIMIZED]: 'Optimized',
    [AI_FORECAST.STATUSES.CACHED]: 'Cached',
  };
  return labels[status] || 'Unknown';
}

export function getForecastMethodLabel(method: AIForecastMethod): string {
  const labels: Record<AIForecastMethod, string> = {
    [AI_FORECAST.METHODS.ARIMA]: 'ARIMA',
    [AI_FORECAST.METHODS.SARIMA]: 'SARIMA',
    [AI_FORECAST.METHODS.EXPONENTIAL_SMOOTHING]: 'Exponential Smoothing',
    [AI_FORECAST.METHODS.HOLT_WINTERS]: 'Holt-Winters',
    [AI_FORECAST.METHODS.MOVING_AVERAGE]: 'Moving Average',
    [AI_FORECAST.METHODS.WEIGHTED_MOVING_AVERAGE]: 'Weighted Moving Average',
    [AI_FORECAST.METHODS.LINEAR_REGRESSION]: 'Linear Regression',
    [AI_FORECAST.METHODS.RANDOM_FOREST]: 'Random Forest',
    [AI_FORECAST.METHODS.GRADIENT_BOOSTING]: 'Gradient Boosting',
    [AI_FORECAST.METHODS.XGBOOST]: 'XGBoost',
    [AI_FORECAST.METHODS.LIGHTGBM]: 'LightGBM',
    [AI_FORECAST.METHODS.CATBOOST]: 'CatBoost',
    [AI_FORECAST.METHODS.LSTM]: 'LSTM',
    [AI_FORECAST.METHODS.GRU]: 'GRU',
    [AI_FORECAST.METHODS.RNN]: 'RNN',
    [AI_FORECAST.METHODS.CNN]: 'CNN',
    [AI_FORECAST.METHODS.TRANSFORMER]: 'Transformer',
    [AI_FORECAST.METHODS.TFT]: 'TFT',
    [AI_FORECAST.METHODS.NBEATS]: 'N-BEATS',
    [AI_FORECAST.METHODS.DEEPAR]: 'DeepAR',
    [AI_FORECAST.METHODS.STACKING]: 'Stacking',
    [AI_FORECAST.METHODS.BAGGING]: 'Bagging',
    [AI_FORECAST.METHODS.BOOSTING]: 'Boosting',
    [AI_FORECAST.METHODS.VOTING]: 'Voting',
    [AI_FORECAST.METHODS.BAYESIAN]: 'Bayesian',
    [AI_FORECAST.METHODS.MCMC]: 'MCMC',
    [AI_FORECAST.METHODS.VARIATIONAL]: 'Variational',
  };
  return labels[method] || 'Unknown';
}

export function getForecastHorizonLabel(horizon: AIForecastHorizon): string {
  const labels: Record<AIForecastHorizon, string> = {
    [AI_FORECAST.HORIZONS.IMMEDIATE]: 'Immediate',
    [AI_FORECAST.HORIZONS.SHORT_TERM]: 'Short Term',
    [AI_FORECAST.HORIZONS.MEDIUM_TERM]: 'Medium Term',
    [AI_FORECAST.HORIZONS.LONG_TERM]: 'Long Term',
    [AI_FORECAST.HORIZONS.EXTENDED]: 'Extended',
  };
  return labels[horizon] || 'Unknown';
}

export function getForecastFrequencyLabel(frequency: AIForecastFrequency): string {
  const labels: Record<AIForecastFrequency, string> = {
    [AI_FORECAST.FREQUENCIES.HOURLY]: 'Hourly',
    [AI_FORECAST.FREQUENCIES.DAILY]: 'Daily',
    [AI_FORECAST.FREQUENCIES.WEEKLY]: 'Weekly',
    [AI_FORECAST.FREQUENCIES.MONTHLY]: 'Monthly',
    [AI_FORECAST.FREQUENCIES.QUARTERLY]: 'Quarterly',
    [AI_FORECAST.FREQUENCIES.YEARLY]: 'Yearly',
    [AI_FORECAST.FREQUENCIES.CUSTOM]: 'Custom',
  };
  return labels[frequency] || 'Unknown';
}

export function getForecastConfidenceLabel(confidence: AIForecastConfidence): string {
  const labels: Record<AIForecastConfidence, string> = {
    [AI_FORECAST.CONFIDENCE.VERY_LOW]: 'Very Low',
    [AI_FORECAST.CONFIDENCE.LOW]: 'Low',
    [AI_FORECAST.CONFIDENCE.MEDIUM]: 'Medium',
    [AI_FORECAST.CONFIDENCE.HIGH]: 'High',
    [AI_FORECAST.CONFIDENCE.VERY_HIGH]: 'Very High',
  };
  return labels[confidence] || 'Unknown';
}

export function getForecastQualityLabel(quality: AIForecastQuality): string {
  const labels: Record<AIForecastQuality, string> = {
    [AI_FORECAST.QUALITY.EXCELLENT]: 'Excellent',
    [AI_FORECAST.QUALITY.GOOD]: 'Good',
    [AI_FORECAST.QUALITY.FAIR]: 'Fair',
    [AI_FORECAST.QUALITY.POOR]: 'Poor',
    [AI_FORECAST.QUALITY.UNKNOWN]: 'Unknown',
  };
  return labels[quality] || 'Unknown';
}

export function getForecastMetricLabel(metric: AIForecastMetric): string {
  const labels: Record<AIForecastMetric, string> = {
    [AI_FORECAST.METRICS.MAE]: 'MAE',
    [AI_FORECAST.METRICS.MSE]: 'MSE',
    [AI_FORECAST.METRICS.RMSE]: 'RMSE',
    [AI_FORECAST.METRICS.MAPE]: 'MAPE',
    [AI_FORECAST.METRICS.SMAPE]: 'sMAPE',
    [AI_FORECAST.METRICS.MASE]: 'MASE',
    [AI_FORECAST.METRICS.MDA]: 'MDA',
    [AI_FORECAST.METRICS.R2]: 'R²',
    [AI_FORECAST.METRICS.ADJUSTED_R2]: 'Adjusted R²',
    [AI_FORECAST.METRICS.AIC]: 'AIC',
    [AI_FORECAST.METRICS.BIC]: 'BIC',
    [AI_FORECAST.METRICS.DEVIANCE]: 'Deviance',
  };
  return labels[metric] || 'Unknown';
}

export function getForecastOutputLabel(output: AIForecastOutput): string {
  const labels: Record<AIForecastOutput, string> = {
    [AI_FORECAST.OUTPUTS.POINT]: 'Point Forecast',
    [AI_FORECAST.OUTPUTS.INTERVAL]: 'Prediction Interval',
    [AI_FORECAST.OUTPUTS.DISTRIBUTION]: 'Distribution',
    [AI_FORECAST.OUTPUTS.PERCENTILES]: 'Percentiles',
    [AI_FORECAST.OUTPUTS.SCENARIOS]: 'Scenarios',
    [AI_FORECAST.OUTPUTS.SIMULATION]: 'Simulation',
  };
  return labels[output] || 'Unknown';
}

export function getForecastValidationLabel(validation: AIForecastValidation): string {
  const labels: Record<AIForecastValidation, string> = {
    [AI_FORECAST.VALIDATION.WALK_FORWARD]: 'Walk Forward',
    [AI_FORECAST.VALIDATION.CROSS_VALIDATION]: 'Cross Validation',
    [AI_FORECAST.VALIDATION.HOLD_OUT]: 'Hold Out',
    [AI_FORECAST.VALIDATION.TIME_SPLIT]: 'Time Split',
    [AI_FORECAST.VALIDATION.EXPANDING_WINDOW]: 'Expanding Window',
    [AI_FORECAST.VALIDATION.ROLLING_WINDOW]: 'Rolling Window',
  };
  return labels[validation] || 'Unknown';
}

export function isForecastActive(status: AIForecastStatus): boolean {
  const activeStatuses: AIForecastStatus[] = [
    AI_FORECAST.STATUSES.COMPLETED,
    AI_FORECAST.STATUSES.CACHED,
    AI_FORECAST.STATUSES.OPTIMIZED,
  ];
  return activeStatuses.includes(status);
}

export function isForecastProcessing(status: AIForecastStatus): boolean {
  const processingStatuses: AIForecastStatus[] = [
    AI_FORECAST.STATUSES.PENDING,
    AI_FORECAST.STATUSES.INITIALIZING,
    AI_FORECAST.STATUSES.PROCESSING,
    AI_FORECAST.STATUSES.ANALYZING,
    AI_FORECAST.STATUSES.GENERATING,
  ];
  return processingStatuses.includes(status);
}

export function isForecastFailed(status: AIForecastStatus): boolean {
  const failedStatuses: AIForecastStatus[] = [
    AI_FORECAST.STATUSES.FAILED,
    AI_FORECAST.STATUSES.EXPIRED,
  ];
  return failedStatuses.includes(status);
}

export function getDefaultHorizon(): number {
  return AI_FORECAST.LIMITS.DEFAULT_HORIZON;
}

export function getMaxHorizon(): number {
  return AI_FORECAST.LIMITS.MAX_HORIZON;
}

export function getDefaultSamples(): number {
  return AI_FORECAST.LIMITS.DEFAULT_SAMPLES;
}

export function getHorizonDays(horizon: AIForecastHorizon): number {
  const days: Record<AIForecastHorizon, number> = {
    [AI_FORECAST.HORIZONS.IMMEDIATE]: 1,
    [AI_FORECAST.HORIZONS.SHORT_TERM]: 7,
    [AI_FORECAST.HORIZONS.MEDIUM_TERM]: 30,
    [AI_FORECAST.HORIZONS.LONG_TERM]: 90,
    [AI_FORECAST.HORIZONS.EXTENDED]: 365,
  };
  return days[horizon] || 30;
}

export function getConfidenceScore(confidence: AIForecastConfidence): number {
  const scores: Record<AIForecastConfidence, number> = {
    [AI_FORECAST.CONFIDENCE.VERY_LOW]: 0.1,
    [AI_FORECAST.CONFIDENCE.LOW]: 0.3,
    [AI_FORECAST.CONFIDENCE.MEDIUM]: 0.5,
    [AI_FORECAST.CONFIDENCE.HIGH]: 0.7,
    [AI_FORECAST.CONFIDENCE.VERY_HIGH]: 0.9,
  };
  return scores[confidence] || 0.5;
}

export function getQualityScore(quality: AIForecastQuality): number {
  const scores: Record<AIForecastQuality, number> = {
    [AI_FORECAST.QUALITY.EXCELLENT]: 0.9,
    [AI_FORECAST.QUALITY.GOOD]: 0.7,
    [AI_FORECAST.QUALITY.FAIR]: 0.5,
    [AI_FORECAST.QUALITY.POOR]: 0.3,
    [AI_FORECAST.QUALITY.UNKNOWN]: 0,
  };
  return scores[quality] || 0;
}
