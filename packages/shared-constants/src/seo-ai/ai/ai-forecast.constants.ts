/**
 * ডিফল্ট ফোরকাস্ট হরাইজন (৩০ দিন)
 */
export const AI_FORECAST_DEFAULT_HORIZON = 30 as const;

/**
 * কনফিডেন্স লেভেল (০.৯৫)
 */
export const AI_FORECAST_CONFIDENCE_LEVEL = 0.95 as const;

/**
 * ন্যূনতম ডেটা পয়েন্ট (৫০)
 */
export const AI_FORECAST_MIN_DATA_POINTS = 50 as const;

/**
 * সিজনালিটি পিরিয়ড (৭, ৩০, ৩৬৫ দিন)
 */
export const AI_FORECAST_SEASONALITY = {
  DAILY: 7,
  MONTHLY: 30,
  YEARLY: 365,
} as const;

/**
 * ফোরকাস্ট মডেল এনাম
 */
export const AI_FORECAST_MODEL = {
  ARIMA: 'arima',
  SARIMA: 'sarima',
  PROPHET: 'prophet',
  LSTM: 'lstm',
  GRU: 'gru',
  XGBOOST: 'xgboost',
  RANDOM_FOREST: 'random-forest',
  LINEAR_REGRESSION: 'linear-regression',
  EXPONENTIAL_SMOOTHING: 'exponential-smoothing',
  HOLT_WINTERS: 'holt-winters',
} as const;

/**
 * AI_FORECAST_MODEL থেকে টাইপ
 */
export type AIForecastModelType = (typeof AI_FORECAST_MODEL)[keyof typeof AI_FORECAST_MODEL];

/**
 * ফোরকাস্ট মডেল লেবেল
 */
export const AI_FORECAST_MODEL_LABELS: Record<AIForecastModelType, string> = {
  [AI_FORECAST_MODEL.ARIMA]: 'ARIMA',
  [AI_FORECAST_MODEL.SARIMA]: 'SARIMA',
  [AI_FORECAST_MODEL.PROPHET]: 'Prophet',
  [AI_FORECAST_MODEL.LSTM]: 'LSTM',
  [AI_FORECAST_MODEL.GRU]: 'GRU',
  [AI_FORECAST_MODEL.XGBOOST]: 'XGBoost',
  [AI_FORECAST_MODEL.RANDOM_FOREST]: 'Random Forest',
  [AI_FORECAST_MODEL.LINEAR_REGRESSION]: 'Linear Regression',
  [AI_FORECAST_MODEL.EXPONENTIAL_SMOOTHING]: 'Exponential Smoothing',
  [AI_FORECAST_MODEL.HOLT_WINTERS]: 'Holt-Winters',
} as const;

/**
 * ফোরকাস্ট মডেল বিবরণ
 */
export const AI_FORECAST_MODEL_DESCRIPTIONS: Record<AIForecastModelType, string> = {
  [AI_FORECAST_MODEL.ARIMA]: 'AutoRegressive Integrated Moving Average for time series',
  [AI_FORECAST_MODEL.SARIMA]: 'Seasonal ARIMA with seasonal components',
  [AI_FORECAST_MODEL.PROPHET]: 'Facebook Prophet for forecasting with seasonality',
  [AI_FORECAST_MODEL.LSTM]: 'Long Short-Term Memory neural network for sequences',
  [AI_FORECAST_MODEL.GRU]: 'Gated Recurrent Unit for sequential data',
  [AI_FORECAST_MODEL.XGBOOST]: 'XGBoost for regression with feature engineering',
  [AI_FORECAST_MODEL.RANDOM_FOREST]: 'Random Forest ensemble for regression',
  [AI_FORECAST_MODEL.LINEAR_REGRESSION]: 'Linear Regression for trend analysis',
  [AI_FORECAST_MODEL.EXPONENTIAL_SMOOTHING]: 'Exponential Smoothing for trend and seasonality',
  [AI_FORECAST_MODEL.HOLT_WINTERS]: 'Holt-Winters triple exponential smoothing',
} as const;

/**
 * ফোরকাস্ট মডেল আইকন
 */
export const AI_FORECAST_MODEL_ICONS: Record<AIForecastModelType, string> = {
  [AI_FORECAST_MODEL.ARIMA]: '📊',
  [AI_FORECAST_MODEL.SARIMA]: '📈',
  [AI_FORECAST_MODEL.PROPHET]: '🔮',
  [AI_FORECAST_MODEL.LSTM]: '🧠',
  [AI_FORECAST_MODEL.GRU]: '🔄',
  [AI_FORECAST_MODEL.XGBOOST]: '⚡',
  [AI_FORECAST_MODEL.RANDOM_FOREST]: '🌳',
  [AI_FORECAST_MODEL.LINEAR_REGRESSION]: '📉',
  [AI_FORECAST_MODEL.EXPONENTIAL_SMOOTHING]: '📐',
  [AI_FORECAST_MODEL.HOLT_WINTERS]: '❄️',
} as const;

/**
 * ফোরকাস্ট মডেল কমপ্লেক্সিটি (১-৫)
 */
export const AI_FORECAST_MODEL_COMPLEXITY: Record<AIForecastModelType, number> = {
  [AI_FORECAST_MODEL.ARIMA]: 3,
  [AI_FORECAST_MODEL.SARIMA]: 4,
  [AI_FORECAST_MODEL.PROPHET]: 3,
  [AI_FORECAST_MODEL.LSTM]: 5,
  [AI_FORECAST_MODEL.GRU]: 5,
  [AI_FORECAST_MODEL.XGBOOST]: 4,
  [AI_FORECAST_MODEL.RANDOM_FOREST]: 3,
  [AI_FORECAST_MODEL.LINEAR_REGRESSION]: 1,
  [AI_FORECAST_MODEL.EXPONENTIAL_SMOOTHING]: 2,
  [AI_FORECAST_MODEL.HOLT_WINTERS]: 3,
} as const;

/**
 * ফোরকাস্ট মডেল অ্যাকুরেসি (১-১০)
 */
export const AI_FORECAST_MODEL_ACCURACY: Record<AIForecastModelType, number> = {
  [AI_FORECAST_MODEL.ARIMA]: 7,
  [AI_FORECAST_MODEL.SARIMA]: 8,
  [AI_FORECAST_MODEL.PROPHET]: 8,
  [AI_FORECAST_MODEL.LSTM]: 9,
  [AI_FORECAST_MODEL.GRU]: 9,
  [AI_FORECAST_MODEL.XGBOOST]: 8,
  [AI_FORECAST_MODEL.RANDOM_FOREST]: 7,
  [AI_FORECAST_MODEL.LINEAR_REGRESSION]: 5,
  [AI_FORECAST_MODEL.EXPONENTIAL_SMOOTHING]: 6,
  [AI_FORECAST_MODEL.HOLT_WINTERS]: 7,
} as const;

/**
 * ফোরকাস্ট ফ্রিকোয়েন্সি এনাম
 */
export const AI_FORECAST_FREQUENCY = {
  MINUTE: 'minute',
  HOUR: 'hour',
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  QUARTER: 'quarter',
  YEAR: 'year',
} as const;

/**
 * AI_FORECAST_FREQUENCY থেকে টাইপ
 */
export type AIForecastFrequencyType =
  (typeof AI_FORECAST_FREQUENCY)[keyof typeof AI_FORECAST_FREQUENCY];

/**
 * ফোরকাস্ট ফ্রিকোয়েন্সি লেবেল
 */
export const AI_FORECAST_FREQUENCY_LABELS: Record<AIForecastFrequencyType, string> = {
  [AI_FORECAST_FREQUENCY.MINUTE]: 'Minute',
  [AI_FORECAST_FREQUENCY.HOUR]: 'Hour',
  [AI_FORECAST_FREQUENCY.DAY]: 'Day',
  [AI_FORECAST_FREQUENCY.WEEK]: 'Week',
  [AI_FORECAST_FREQUENCY.MONTH]: 'Month',
  [AI_FORECAST_FREQUENCY.QUARTER]: 'Quarter',
  [AI_FORECAST_FREQUENCY.YEAR]: 'Year',
} as const;

/**
 * ফোরকাস্ট কনফিগারেশন
 */
export interface AIForecastConfig {
  horizon: number;
  confidenceLevel: number;
  minDataPoints: number;
  seasonality: {
    daily: number;
    monthly: number;
    yearly: number;
  };
  model: AIForecastModelType;
  frequency: AIForecastFrequencyType;
  includeHistory: boolean;
  includeConfidence: boolean;
  includeAnomalies: boolean;
}

/**
 * ফোরকাস্ট ডিফল্ট কনফিগারেশন
 */
export const AI_FORECAST_DEFAULT_CONFIG: AIForecastConfig = {
  horizon: AI_FORECAST_DEFAULT_HORIZON,
  confidenceLevel: AI_FORECAST_CONFIDENCE_LEVEL,
  minDataPoints: AI_FORECAST_MIN_DATA_POINTS,
  seasonality: {
    daily: AI_FORECAST_SEASONALITY.DAILY,
    monthly: AI_FORECAST_SEASONALITY.MONTHLY,
    yearly: AI_FORECAST_SEASONALITY.YEARLY,
  },
  model: AI_FORECAST_MODEL.PROPHET,
  frequency: AI_FORECAST_FREQUENCY.DAY,
  includeHistory: true,
  includeConfidence: true,
  includeAnomalies: false,
} as const;

/**
 * ফোরকাস্ট ফিল্টার
 */
export interface AIForecastFilter {
  model?: AIForecastModelType;
  frequency?: AIForecastFrequencyType;
  horizon?: number;
  minDataPoints?: number;
  confidenceLevel?: number;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}

/**
 * ফোরকাস্ট পয়েন্ট
 */
export interface AIForecastPoint {
  timestamp: Date;
  value: number;
  lowerBound?: number;
  upperBound?: number;
  confidenceLevel?: number;
  anomaly?: boolean;
}

/**
 * ফোরকাস্ট রেসপন্স
 */
export interface AIForecastResponse {
  points: AIForecastPoint[];
  model: AIForecastModelType;
  frequency: AIForecastFrequencyType;
  horizon: number;
  confidenceLevel: number;
  metadata: {
    mape: number;
    mae: number;
    rmse: number;
    r2: number;
    trend: 'upward' | 'downward' | 'stable';
    seasonalityDetected: boolean;
  };
  summary: {
    min: number;
    max: number;
    mean: number;
    median: number;
    std: number;
  };
}

/**
 * ফোরকাস্ট মডেল গ্রুপ
 */
export const AI_FORECAST_MODEL_GROUPS = {
  STATISTICAL: [
    AI_FORECAST_MODEL.ARIMA,
    AI_FORECAST_MODEL.SARIMA,
    AI_FORECAST_MODEL.EXPONENTIAL_SMOOTHING,
    AI_FORECAST_MODEL.HOLT_WINTERS,
  ] as const,
  MACHINE_LEARNING: [
    AI_FORECAST_MODEL.XGBOOST,
    AI_FORECAST_MODEL.RANDOM_FOREST,
    AI_FORECAST_MODEL.LINEAR_REGRESSION,
  ] as const,
  DEEP_LEARNING: [AI_FORECAST_MODEL.LSTM, AI_FORECAST_MODEL.GRU] as const,
  SPECIALIZED: [AI_FORECAST_MODEL.PROPHET] as const,
} as const;

/**
 * ফোরকাস্ট মডেল গ্রুপ লেবেল
 */
export const AI_FORECAST_MODEL_GROUP_LABELS = {
  STATISTICAL: 'Statistical',
  MACHINE_LEARNING: 'Machine Learning',
  DEEP_LEARNING: 'Deep Learning',
  SPECIALIZED: 'Specialized',
} as const;

/**
 * ফোরকাস্ট ফ্রিকোয়েন্সি গ্রুপ
 */
export const AI_FORECAST_FREQUENCY_GROUPS = {
  HIGH: [AI_FORECAST_FREQUENCY.MINUTE, AI_FORECAST_FREQUENCY.HOUR] as const,
  MEDIUM: [AI_FORECAST_FREQUENCY.DAY, AI_FORECAST_FREQUENCY.WEEK] as const,
  LOW: [
    AI_FORECAST_FREQUENCY.MONTH,
    AI_FORECAST_FREQUENCY.QUARTER,
    AI_FORECAST_FREQUENCY.YEAR,
  ] as const,
} as const;

/**
 * ফোরকাস্ট ফ্রিকোয়েন্সি গ্রুপ লেবেল
 */
export const AI_FORECAST_FREQUENCY_GROUP_LABELS = {
  HIGH: 'High Frequency',
  MEDIUM: 'Medium Frequency',
  LOW: 'Low Frequency',
} as const;
