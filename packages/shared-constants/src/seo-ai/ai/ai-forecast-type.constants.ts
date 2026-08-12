/**
 * AI ফোরকাস্ট টাইপ এনাম
 */
export const AI_FORECAST_TYPE = {
  ARIMA: 'arima',
  PROPHET: 'prophet',
  LSTM: 'lstm',
  GRU: 'gru',
  XGBOOST: 'xgboost',
  RANDOM_FOREST: 'random-forest',
  LINEAR_REGRESSION: 'linear-regression',
  ENSEMBLE: 'ensemble',
} as const;

/**
 * AI_FORECAST_TYPE থেকে টাইপ
 */
export type AIForecastTypeType = (typeof AI_FORECAST_TYPE)[keyof typeof AI_FORECAST_TYPE];

/**
 * ফোরকাস্ট টাইপ লেবেল
 */
export const AI_FORECAST_TYPE_LABELS: Record<AIForecastTypeType, string> = {
  [AI_FORECAST_TYPE.ARIMA]: 'ARIMA',
  [AI_FORECAST_TYPE.PROPHET]: 'Prophet',
  [AI_FORECAST_TYPE.LSTM]: 'LSTM',
  [AI_FORECAST_TYPE.GRU]: 'GRU',
  [AI_FORECAST_TYPE.XGBOOST]: 'XGBoost',
  [AI_FORECAST_TYPE.RANDOM_FOREST]: 'Random Forest',
  [AI_FORECAST_TYPE.LINEAR_REGRESSION]: 'Linear Regression',
  [AI_FORECAST_TYPE.ENSEMBLE]: 'Ensemble',
} as const;

/**
 * ফোরকাস্ট টাইপ বিবরণ
 */
export const AI_FORECAST_TYPE_DESCRIPTIONS: Record<AIForecastTypeType, string> = {
  [AI_FORECAST_TYPE.ARIMA]: 'Autoregressive Integrated Moving Average for time series forecasting',
  [AI_FORECAST_TYPE.PROPHET]: 'Facebook Prophet for forecasting with strong seasonality',
  [AI_FORECAST_TYPE.LSTM]: 'Long Short-Term Memory for sequence prediction',
  [AI_FORECAST_TYPE.GRU]: 'Gated Recurrent Unit for efficient sequence modeling',
  [AI_FORECAST_TYPE.XGBOOST]: 'XGBoost for regression with feature engineering',
  [AI_FORECAST_TYPE.RANDOM_FOREST]: 'Random Forest ensemble for regression tasks',
  [AI_FORECAST_TYPE.LINEAR_REGRESSION]: 'Linear Regression for simple trend modeling',
  [AI_FORECAST_TYPE.ENSEMBLE]: 'Ensemble of multiple models for robust forecasting',
} as const;

/**
 * ফোরকাস্ট টাইপ আইকন
 */
export const AI_FORECAST_TYPE_ICONS: Record<AIForecastTypeType, string> = {
  [AI_FORECAST_TYPE.ARIMA]: '📊',
  [AI_FORECAST_TYPE.PROPHET]: '🔮',
  [AI_FORECAST_TYPE.LSTM]: '🧠',
  [AI_FORECAST_TYPE.GRU]: '🔄',
  [AI_FORECAST_TYPE.XGBOOST]: '⚡',
  [AI_FORECAST_TYPE.RANDOM_FOREST]: '🌳',
  [AI_FORECAST_TYPE.LINEAR_REGRESSION]: '📉',
  [AI_FORECAST_TYPE.ENSEMBLE]: '🤝',
} as const;

/**
 * ফোরকাস্ট টাইপ কালার (হেক্স কোড)
 */
export const AI_FORECAST_TYPE_COLORS: Record<AIForecastTypeType, string> = {
  [AI_FORECAST_TYPE.ARIMA]: '#3b82f6', // Blue-500
  [AI_FORECAST_TYPE.PROPHET]: '#8b5cf6', // Violet-500
  [AI_FORECAST_TYPE.LSTM]: '#ec4899', // Pink-500
  [AI_FORECAST_TYPE.GRU]: '#f472b6', // Pink-400
  [AI_FORECAST_TYPE.XGBOOST]: '#f59e0b', // Amber-500
  [AI_FORECAST_TYPE.RANDOM_FOREST]: '#22c55e', // Green-500
  [AI_FORECAST_TYPE.LINEAR_REGRESSION]: '#06b6d4', // Cyan-500
  [AI_FORECAST_TYPE.ENSEMBLE]: '#a855f7', // Purple-500
} as const;

/**
 * ফোরকাস্ট টাইপ চরিত্রগত বৈশিষ্ট্য
 */
export const AI_FORECAST_TYPE_CHARACTERISTICS: Record<
  AIForecastTypeType,
  {
    handlesSeasonality: boolean;
    handlesTrend: boolean;
    handlesOutliers: boolean;
    requiresStationarity: boolean;
    interpretable: boolean;
    trainingTime: 'low' | 'medium' | 'high';
    predictionSpeed: 'low' | 'medium' | 'high';
  }
> = {
  [AI_FORECAST_TYPE.ARIMA]: {
    handlesSeasonality: false,
    handlesTrend: true,
    handlesOutliers: false,
    requiresStationarity: true,
    interpretable: true,
    trainingTime: 'medium',
    predictionSpeed: 'high',
  },
  [AI_FORECAST_TYPE.PROPHET]: {
    handlesSeasonality: true,
    handlesTrend: true,
    handlesOutliers: true,
    requiresStationarity: false,
    interpretable: true,
    trainingTime: 'medium',
    predictionSpeed: 'high',
  },
  [AI_FORECAST_TYPE.LSTM]: {
    handlesSeasonality: true,
    handlesTrend: true,
    handlesOutliers: false,
    requiresStationarity: false,
    interpretable: false,
    trainingTime: 'high',
    predictionSpeed: 'medium',
  },
  [AI_FORECAST_TYPE.GRU]: {
    handlesSeasonality: true,
    handlesTrend: true,
    handlesOutliers: false,
    requiresStationarity: false,
    interpretable: false,
    trainingTime: 'high',
    predictionSpeed: 'medium',
  },
  [AI_FORECAST_TYPE.XGBOOST]: {
    handlesSeasonality: true,
    handlesTrend: true,
    handlesOutliers: true,
    requiresStationarity: false,
    interpretable: false,
    trainingTime: 'medium',
    predictionSpeed: 'high',
  },
  [AI_FORECAST_TYPE.RANDOM_FOREST]: {
    handlesSeasonality: true,
    handlesTrend: true,
    handlesOutliers: true,
    requiresStationarity: false,
    interpretable: false,
    trainingTime: 'medium',
    predictionSpeed: 'high',
  },
  [AI_FORECAST_TYPE.LINEAR_REGRESSION]: {
    handlesSeasonality: false,
    handlesTrend: true,
    handlesOutliers: false,
    requiresStationarity: false,
    interpretable: true,
    trainingTime: 'low',
    predictionSpeed: 'high',
  },
  [AI_FORECAST_TYPE.ENSEMBLE]: {
    handlesSeasonality: true,
    handlesTrend: true,
    handlesOutliers: true,
    requiresStationarity: false,
    interpretable: false,
    trainingTime: 'high',
    predictionSpeed: 'medium',
  },
} as const;

/**
 * ফোরকাস্ট টাইপ কনফিগারেশন
 */
export interface AIForecastTypeConfig {
  type: AIForecastTypeType;
  label: string;
  description: string;
  icon: string;
  color: string;
  characteristics: {
    handlesSeasonality: boolean;
    handlesTrend: boolean;
    handlesOutliers: boolean;
    requiresStationarity: boolean;
    interpretable: boolean;
    trainingTime: 'low' | 'medium' | 'high';
    predictionSpeed: 'low' | 'medium' | 'high';
  };
  complexity: number;
  accuracy: number;
  typicalUseCases: string[];
}

/**
 * ফোরকাস্ট টাইপ মেটাডেটা
 */
export const AI_FORECAST_TYPE_METADATA: Record<AIForecastTypeType, AIForecastTypeConfig> = {
  [AI_FORECAST_TYPE.ARIMA]: {
    type: AI_FORECAST_TYPE.ARIMA,
    label: AI_FORECAST_TYPE_LABELS[AI_FORECAST_TYPE.ARIMA],
    description: AI_FORECAST_TYPE_DESCRIPTIONS[AI_FORECAST_TYPE.ARIMA],
    icon: AI_FORECAST_TYPE_ICONS[AI_FORECAST_TYPE.ARIMA],
    color: AI_FORECAST_TYPE_COLORS[AI_FORECAST_TYPE.ARIMA],
    characteristics: AI_FORECAST_TYPE_CHARACTERISTICS[AI_FORECAST_TYPE.ARIMA],
    complexity: 3,
    accuracy: 7,
    typicalUseCases: [
      'Financial forecasting',
      'Economic indicators',
      'Inventory planning',
      'Sales forecasting',
    ],
  },
  [AI_FORECAST_TYPE.PROPHET]: {
    type: AI_FORECAST_TYPE.PROPHET,
    label: AI_FORECAST_TYPE_LABELS[AI_FORECAST_TYPE.PROPHET],
    description: AI_FORECAST_TYPE_DESCRIPTIONS[AI_FORECAST_TYPE.PROPHET],
    icon: AI_FORECAST_TYPE_ICONS[AI_FORECAST_TYPE.PROPHET],
    color: AI_FORECAST_TYPE_COLORS[AI_FORECAST_TYPE.PROPHET],
    characteristics: AI_FORECAST_TYPE_CHARACTERISTICS[AI_FORECAST_TYPE.PROPHET],
    complexity: 3,
    accuracy: 8,
    typicalUseCases: ['Business metrics', 'User growth', 'Website traffic', 'Revenue prediction'],
  },
  [AI_FORECAST_TYPE.LSTM]: {
    type: AI_FORECAST_TYPE.LSTM,
    label: AI_FORECAST_TYPE_LABELS[AI_FORECAST_TYPE.LSTM],
    description: AI_FORECAST_TYPE_DESCRIPTIONS[AI_FORECAST_TYPE.LSTM],
    icon: AI_FORECAST_TYPE_ICONS[AI_FORECAST_TYPE.LSTM],
    color: AI_FORECAST_TYPE_COLORS[AI_FORECAST_TYPE.LSTM],
    characteristics: AI_FORECAST_TYPE_CHARACTERISTICS[AI_FORECAST_TYPE.LSTM],
    complexity: 5,
    accuracy: 9,
    typicalUseCases: [
      'Stock market prediction',
      'Weather forecasting',
      'Energy demand',
      'Complex sequence prediction',
    ],
  },
  [AI_FORECAST_TYPE.GRU]: {
    type: AI_FORECAST_TYPE.GRU,
    label: AI_FORECAST_TYPE_LABELS[AI_FORECAST_TYPE.GRU],
    description: AI_FORECAST_TYPE_DESCRIPTIONS[AI_FORECAST_TYPE.GRU],
    icon: AI_FORECAST_TYPE_ICONS[AI_FORECAST_TYPE.GRU],
    color: AI_FORECAST_TYPE_COLORS[AI_FORECAST_TYPE.GRU],
    characteristics: AI_FORECAST_TYPE_CHARACTERISTICS[AI_FORECAST_TYPE.GRU],
    complexity: 5,
    accuracy: 9,
    typicalUseCases: [
      'Time series prediction',
      'Speech recognition',
      'Language modeling',
      'Sensor data forecasting',
    ],
  },
  [AI_FORECAST_TYPE.XGBOOST]: {
    type: AI_FORECAST_TYPE.XGBOOST,
    label: AI_FORECAST_TYPE_LABELS[AI_FORECAST_TYPE.XGBOOST],
    description: AI_FORECAST_TYPE_DESCRIPTIONS[AI_FORECAST_TYPE.XGBOOST],
    icon: AI_FORECAST_TYPE_ICONS[AI_FORECAST_TYPE.XGBOOST],
    color: AI_FORECAST_TYPE_COLORS[AI_FORECAST_TYPE.XGBOOST],
    characteristics: AI_FORECAST_TYPE_CHARACTERISTICS[AI_FORECAST_TYPE.XGBOOST],
    complexity: 4,
    accuracy: 8,
    typicalUseCases: [
      'Demand forecasting',
      'Risk prediction',
      'Marketing analytics',
      'Customer churn prediction',
    ],
  },
  [AI_FORECAST_TYPE.RANDOM_FOREST]: {
    type: AI_FORECAST_TYPE.RANDOM_FOREST,
    label: AI_FORECAST_TYPE_LABELS[AI_FORECAST_TYPE.RANDOM_FOREST],
    description: AI_FORECAST_TYPE_DESCRIPTIONS[AI_FORECAST_TYPE.RANDOM_FOREST],
    icon: AI_FORECAST_TYPE_ICONS[AI_FORECAST_TYPE.RANDOM_FOREST],
    color: AI_FORECAST_TYPE_COLORS[AI_FORECAST_TYPE.RANDOM_FOREST],
    characteristics: AI_FORECAST_TYPE_CHARACTERISTICS[AI_FORECAST_TYPE.RANDOM_FOREST],
    complexity: 3,
    accuracy: 7,
    typicalUseCases: [
      'Sales prediction',
      'Inventory forecasting',
      'Quality control',
      'Anomaly detection',
    ],
  },
  [AI_FORECAST_TYPE.LINEAR_REGRESSION]: {
    type: AI_FORECAST_TYPE.LINEAR_REGRESSION,
    label: AI_FORECAST_TYPE_LABELS[AI_FORECAST_TYPE.LINEAR_REGRESSION],
    description: AI_FORECAST_TYPE_DESCRIPTIONS[AI_FORECAST_TYPE.LINEAR_REGRESSION],
    icon: AI_FORECAST_TYPE_ICONS[AI_FORECAST_TYPE.LINEAR_REGRESSION],
    color: AI_FORECAST_TYPE_COLORS[AI_FORECAST_TYPE.LINEAR_REGRESSION],
    characteristics: AI_FORECAST_TYPE_CHARACTERISTICS[AI_FORECAST_TYPE.LINEAR_REGRESSION],
    complexity: 1,
    accuracy: 5,
    typicalUseCases: [
      'Trend analysis',
      'Baseline prediction',
      'Simple forecasting',
      'Educational purposes',
    ],
  },
  [AI_FORECAST_TYPE.ENSEMBLE]: {
    type: AI_FORECAST_TYPE.ENSEMBLE,
    label: AI_FORECAST_TYPE_LABELS[AI_FORECAST_TYPE.ENSEMBLE],
    description: AI_FORECAST_TYPE_DESCRIPTIONS[AI_FORECAST_TYPE.ENSEMBLE],
    icon: AI_FORECAST_TYPE_ICONS[AI_FORECAST_TYPE.ENSEMBLE],
    color: AI_FORECAST_TYPE_COLORS[AI_FORECAST_TYPE.ENSEMBLE],
    characteristics: AI_FORECAST_TYPE_CHARACTERISTICS[AI_FORECAST_TYPE.ENSEMBLE],
    complexity: 5,
    accuracy: 9,
    typicalUseCases: [
      'Critical business decisions',
      'High-stakes predictions',
      'Research applications',
      'Competition winning models',
    ],
  },
} as const;

/**
 * ফোরকাস্ট টাইপ গ্রুপ
 */
export const AI_FORECAST_TYPE_GROUPS = {
  STATISTICAL: [AI_FORECAST_TYPE.ARIMA, AI_FORECAST_TYPE.LINEAR_REGRESSION] as const,
  MACHINE_LEARNING: [AI_FORECAST_TYPE.XGBOOST, AI_FORECAST_TYPE.RANDOM_FOREST] as const,
  DEEP_LEARNING: [AI_FORECAST_TYPE.LSTM, AI_FORECAST_TYPE.GRU] as const,
  SPECIALIZED: [AI_FORECAST_TYPE.PROPHET] as const,
  HYBRID: [AI_FORECAST_TYPE.ENSEMBLE] as const,
} as const;

/**
 * ফোরকাস্ট টাইপ গ্রুপ লেবেল
 */
export const AI_FORECAST_TYPE_GROUP_LABELS = {
  STATISTICAL: 'Statistical',
  MACHINE_LEARNING: 'Machine Learning',
  DEEP_LEARNING: 'Deep Learning',
  SPECIALIZED: 'Specialized',
  HYBRID: 'Hybrid',
} as const;

/**
 * ফোরকাস্ট টাইপ স্কোর (১-১০)
 */
export const AI_FORECAST_TYPE_SCORES: Record<
  AIForecastTypeType,
  {
    speed: number;
    accuracy: number;
    interpretability: number;
    robustness: number;
  }
> = {
  [AI_FORECAST_TYPE.ARIMA]: { speed: 8, accuracy: 7, interpretability: 9, robustness: 6 },
  [AI_FORECAST_TYPE.PROPHET]: { speed: 7, accuracy: 8, interpretability: 9, robustness: 8 },
  [AI_FORECAST_TYPE.LSTM]: { speed: 4, accuracy: 9, interpretability: 3, robustness: 7 },
  [AI_FORECAST_TYPE.GRU]: { speed: 5, accuracy: 9, interpretability: 3, robustness: 7 },
  [AI_FORECAST_TYPE.XGBOOST]: { speed: 7, accuracy: 8, interpretability: 5, robustness: 9 },
  [AI_FORECAST_TYPE.RANDOM_FOREST]: { speed: 7, accuracy: 7, interpretability: 5, robustness: 9 },
  [AI_FORECAST_TYPE.LINEAR_REGRESSION]: {
    speed: 10,
    accuracy: 5,
    interpretability: 10,
    robustness: 4,
  },
  [AI_FORECAST_TYPE.ENSEMBLE]: { speed: 3, accuracy: 9, interpretability: 2, robustness: 9 },
} as const;
