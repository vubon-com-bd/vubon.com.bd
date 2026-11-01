export const AI_FORECAST_TYPE = {
  DEMAND: 'demand',
  SALES: 'sales',
  REVENUE: 'revenue',
  INVENTORY: 'inventory',
  TRAFFIC: 'traffic',
  CHURN: 'churn',
  PRICE: 'price',
  TREND: 'trend',
} as const;

export const AI_FORECAST_MODEL = {
  ARIMA: 'arima',
  PROPHET: 'prophet',
  LSTM: 'lstm',
  XGBOOST: 'xgboost',
  LINEAR_REGRESSION: 'linear_regression',
  RANDOM_FOREST: 'random_forest',
  TRANSFORMER: 'transformer',
  ENSEMBLE: 'ensemble',
} as const;

export const AI_FORECAST_HORIZON = {
  DAY: 1,
  WEEK: 7,
  MONTH: 30,
  QUARTER: 90,
  HALF_YEAR: 180,
  YEAR: 365,
} as const;

export const AI_FORECAST = {
  TYPE: AI_FORECAST_TYPE,
  MODEL: AI_FORECAST_MODEL,
  HORIZON: AI_FORECAST_HORIZON,
  DEFAULT_MODEL: AI_FORECAST_MODEL.PROPHET,
  DEFAULT_HORIZON_DAYS: AI_FORECAST_HORIZON.MONTH,
  MIN_HISTORY_DAYS: 30,
  MAX_HISTORY_DAYS: 1095,
  CONFIDENCE_INTERVAL: 0.95,
  SEASONALITY_ENABLED: true,
  OUTLIER_DETECTION: true,
  MISSING_DATA_STRATEGY: 'interpolate',
} as const;

export type AiForecastType = typeof AI_FORECAST;
