/**
 * AI Model Status Value Types
 * @module shared-types/ai
 *
 * Values আসে shared-constants/ai/ai-model-status.constants থেকে।
 */

import type { AI_MODEL_STATUS } from '@vubon/shared-constants/ai';

export type AiModelStatusValue = (typeof AI_MODEL_STATUS)[keyof typeof AI_MODEL_STATUS];

export interface AiModelStatusMetadata {
  readonly value: AiModelStatusValue;
  readonly label: string;
  readonly isActive: boolean;
  readonly isFinal: boolean;
}
