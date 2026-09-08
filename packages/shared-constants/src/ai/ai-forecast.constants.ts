import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { AI_ANALYTICS } from './ai-analytics.constants';

// AI-নির্দিষ্ট TIME_FRAME (নাম পরিবর্তন করে AI_TIME_FRAME)
export const AI_TIME_FRAME = {
  LAST_HOUR: 'last_hour',
  LAST_DAY: 'last_day',
  LAST_WEEK: 'last_week',
  LAST_MONTH: 'last_month',
  LAST_QUARTER: 'last_quarter',
  LAST_YEAR: 'last_year',
} as const;

export const AI_FORECAST = {
  TYPES: {
    ...COMMON_TYPES,
    SALES: 'sales',
    DEMAND: 'demand',
    REVENUE: 'revenue',
    TRAFFIC: 'traffic',
    CONVERSION: 'conversion',
    INVENTORY: 'inventory',
    PRICE: 'price',
    TREND: 'trend',
  },
  TIME_FRAMES: {
    ...AI_TIME_FRAME,
    NEXT_HOUR: 'next_hour',
    NEXT_DAY: 'next_day',
    NEXT_WEEK: 'next_week',
    NEXT_MONTH: 'next_month',
    NEXT_QUARTER: 'next_quarter',
    NEXT_YEAR: 'next_year',
  },
  AI_ANALYTICS: { ...AI_ANALYTICS },
  FORECAST_MODELS: {
    ARIMA: 'arima',
    SARIMA: 'sarima',
    PROPHET: 'prophet',
    LSTM: 'lstm',
    GRU: 'gru',
    TRANSFORMER: 'transformer',
  },
  FORECAST_HORIZON_DAYS: 90,
  CONFIDENCE_INTERVAL: 0.95,
  MIN_HISTORICAL_DATA_DAYS: 30,
  FORECAST_UPDATE_INTERVAL_HOURS: 6,
} as const;
