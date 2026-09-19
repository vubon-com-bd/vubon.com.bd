/**
 * AI Model Type Value Types
 * @module shared-types/ai
 */

import type { AI_MODEL_TYPE } from '@vubon/shared-constants/ai';

export type AiModelTypeValue = (typeof AI_MODEL_TYPE)[keyof typeof AI_MODEL_TYPE];

export interface AiModelTypeMetadata {
  readonly value: AiModelTypeValue;
  readonly label: string;
  readonly isGenerative: boolean;
  readonly isEmbedding: boolean;
}
