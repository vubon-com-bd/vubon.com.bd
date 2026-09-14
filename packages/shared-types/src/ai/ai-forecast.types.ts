/**
 * AI Forecast Types
 * @module shared-types/ai
 *
 * Values আসে shared-constants/ai/ai-forecast.constants থেকে।
 */

import type {
  AI_FORECAST_TYPE,
  AI_FORECAST_MODEL,
  AI_FORECAST_HORIZON,
} from '@vubon/shared-constants/ai';

export type AiForecastTypeValue = (typeof AI_FORECAST_TYPE)[keyof typeof AI_FORECAST_TYPE];

export type AiForecastModelValue = (typeof AI_FORECAST_MODEL)[keyof typeof AI_FORECAST_MODEL];

export type AiForecastHorizonValue = (typeof AI_FORECAST_HORIZON)[keyof typeof AI_FORECAST_HORIZON];

export interface AiForecast {
  readonly id: string;
  readonly type: AiForecastTypeValue;
  readonly model: AiForecastModelValue;
  readonly horizon: AiForecastHorizonValue;
  readonly dataPoints: readonly AiForecastDataPoint[];
  readonly confidenceInterval: number;
  readonly seasonalityDetected: boolean;
  readonly mape?: number;
  readonly mae?: number;
  readonly rmse?: number;
  readonly generatedAt: string;
  readonly expiresAt?: string;
}

export interface AiForecastDataPoint {
  readonly timestamp: string;
  readonly predictedValue: number;
  readonly lowerBound: number;
  readonly upperBound: number;
  readonly actualValue?: number;
}

export interface AiForecastRequest {
  readonly type: AiForecastTypeValue;
  readonly model?: AiForecastModelValue;
  readonly horizonDays: number;
  readonly historyDays: number;
  readonly filters?: Readonly<Record<string, unknown>>;
}
