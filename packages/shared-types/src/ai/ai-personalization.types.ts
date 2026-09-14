/**
 * AI Personalization Types
 * @module shared-types/ai
 *
 * Values আসে shared-constants/ai/ai-personalization.constants থেকে।
 */

import type {
  AI_PERSONALIZATION_TYPE,
  AI_PERSONALIZATION_SIGNAL,
} from '@vubon/shared-constants/ai';
import type { UserId } from '../common/primitives';

export type AiPersonalizationTypeValue =
  (typeof AI_PERSONALIZATION_TYPE)[keyof typeof AI_PERSONALIZATION_TYPE];

export type AiPersonalizationSignalValue =
  (typeof AI_PERSONALIZATION_SIGNAL)[keyof typeof AI_PERSONALIZATION_SIGNAL];

export interface AiPersonalizationProfile {
  readonly userId: UserId;
  readonly type: AiPersonalizationTypeValue;
  readonly interests: readonly string[];
  readonly categories: readonly string[];
  readonly brands: readonly string[];
  readonly signals: readonly AiPersonalizationSignal[];
  readonly confidence: number;
  readonly lastUpdatedAt: string;
}

export interface AiPersonalizationSignal {
  readonly signal: AiPersonalizationSignalValue;
  readonly weight: number;
  readonly targetId?: string;
  readonly occurredAt: string;
}

export interface AiPersonalizationUpdate {
  readonly userId: UserId;
  readonly type?: AiPersonalizationTypeValue;
  readonly interests?: readonly string[];
  readonly categories?: readonly string[];
  readonly brands?: readonly string[];
}
