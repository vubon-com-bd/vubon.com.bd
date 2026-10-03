/**
 * AI Model Provider Value Types
 * @module shared-types/ai
 */

import type {
  AI_MODEL_PROVIDER,
  AI_PROVIDER_ENV_KEY,
  AI_PROVIDER_REGION,
} from '@vubon/shared-constants/ai';

export type AiModelProviderValue = (typeof AI_MODEL_PROVIDER)[keyof typeof AI_MODEL_PROVIDER];

export type AiProviderEnvKeyValue = (typeof AI_PROVIDER_ENV_KEY)[keyof typeof AI_PROVIDER_ENV_KEY];

export type AiProviderRegionValue = (typeof AI_PROVIDER_REGION)[keyof typeof AI_PROVIDER_REGION];

export interface AiModelProviderMetadata {
  readonly value: AiModelProviderValue;
  readonly label: string;
  readonly envKey: AiProviderEnvKeyValue;
  readonly region: AiProviderRegionValue;
  readonly supportsStreaming: boolean;
}
