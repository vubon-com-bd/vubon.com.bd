/**
 * AI Core Types
 * @module shared-types/ai
 *
 * AI entity + aggregator।
 */

import type { BaseEntity } from '../common/base';
import type { AiModelTypeValue } from './ai-model-type.types';
import type { AiModelStatusValue } from './ai-model-status.types';
import type { AiModelProviderValue } from './ai-model-provider.types';
import type { AiFeatureValue } from './ai-feature.types';
import type { AiModel, AiModelConfig } from './ai-model.types';
import type { AiModelUsage } from './ai-analytics.types';

export interface Ai extends BaseEntity<string> {
  readonly modelId: string;
  readonly modelType: AiModelTypeValue;
  readonly modelStatus: AiModelStatusValue;
  readonly modelProvider: AiModelProviderValue;
  readonly feature: AiFeatureValue;
  readonly inputTokens: number;
  readonly outputTokens: number;
  readonly totalTokens: number;
  readonly cost: number;
  readonly currency: string;
  readonly latencyMs: number;
  readonly success: boolean;
  readonly errorCode?: string;
  readonly errorMessage?: string;
  readonly userId?: string;
  readonly sessionId?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface AiPublic {
  readonly id: string;
  readonly modelId: string;
  readonly feature: AiFeatureValue;
  readonly totalTokens: number;
  readonly latencyMs: number;
  readonly success: boolean;
  readonly createdAt: string;
}

export interface AiRequest {
  readonly feature: AiFeatureValue;
  readonly modelId?: string;
  readonly prompt: string;
  readonly variables?: Readonly<Record<string, unknown>>;
  readonly config?: Partial<AiModelConfig>;
  readonly userId?: string;
  readonly sessionId?: string;
}

export interface AiResponse {
  readonly id: string;
  readonly modelId: string;
  readonly content: string;
  readonly inputTokens: number;
  readonly outputTokens: number;
  readonly totalTokens: number;
  readonly latencyMs: number;
  readonly cost?: number;
  readonly finishReason: 'stop' | 'length' | 'content_filter' | 'error';
  readonly cached: boolean;
}

export interface AiUsageSummary {
  readonly period: string;
  readonly totalRequests: number;
  readonly totalTokens: number;
  readonly totalCost: number;
  readonly currency: string;
  readonly averageLatencyMs: number;
  readonly errorRate: number;
  readonly byModel: readonly AiModelUsage[];
  readonly byFeature: Readonly<Record<AiFeatureValue, number>>;
}

export interface AiListFilter {
  readonly modelId?: string;
  readonly modelType?: AiModelTypeValue;
  readonly modelProvider?: AiModelProviderValue;
  readonly feature?: AiFeatureValue;
  readonly success?: boolean;
  readonly userId?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface AiContext {
  readonly models: readonly AiModel[];
  readonly defaultModelId: string;
  readonly enabledFeatures: readonly AiFeatureValue[];
}
