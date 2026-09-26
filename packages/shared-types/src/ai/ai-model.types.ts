/**
 * AI Model Types
 * @module shared-types/ai
 *
 * AI model definition + configuration।
 */

import type { BaseEntity } from '../common/base';
import type { Url } from '../common/primitives';
import type { AiModelTypeValue } from './ai-model-type.types';
import type { AiModelStatusValue } from './ai-model-status.types';
import type { AiModelProviderValue } from './ai-model-provider.types';

export interface AiModel extends BaseEntity<string> {
  readonly name: string;
  readonly displayName: string;
  readonly type: AiModelTypeValue;
  readonly provider: AiModelProviderValue;
  readonly status: AiModelStatusValue;
  readonly version: string;
  readonly description?: string;
  readonly contextWindow?: number;
  readonly maxOutputTokens?: number;
  readonly embeddingDimension?: number;
  readonly supportsStreaming: boolean;
  readonly supportsFunctionCalling: boolean;
  readonly supportsVision: boolean;
  readonly costPerInputToken?: number;
  readonly costPerOutputToken?: number;
  readonly currency?: string;
  readonly documentationUrl?: Url;
  readonly isDefault: boolean;
}

export interface AiModelPublic {
  readonly id: string;
  readonly name: string;
  readonly displayName: string;
  readonly type: AiModelTypeValue;
  readonly provider: AiModelProviderValue;
  readonly version: string;
  readonly contextWindow?: number;
  readonly supportsStreaming: boolean;
}

export interface AiModelConfig {
  readonly modelId: string;
  readonly temperature: number;
  readonly maxTokens: number;
  readonly topP: number;
  readonly frequencyPenalty?: number;
  readonly presencePenalty?: number;
  readonly stopSequences?: readonly string[];
}

export interface AiModelListFilter {
  readonly type?: AiModelTypeValue;
  readonly provider?: AiModelProviderValue;
  readonly status?: AiModelStatusValue;
  readonly isDefault?: boolean;
  readonly search?: string;
}
