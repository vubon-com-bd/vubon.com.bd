/**
 * AI Feature Types
 * @module shared-types/ai
 *
 * Values আসে shared-constants/ai/ai-feature.constants থেকে।
 */

import type { AI_FEATURE, AI_FEATURE_STATUS, AI_FEATURE_TOGGLE } from '@vubon/shared-constants/ai';

export type AiFeatureValue = (typeof AI_FEATURE)[keyof typeof AI_FEATURE];

export type AiFeatureStatusValue = (typeof AI_FEATURE_STATUS)[keyof typeof AI_FEATURE_STATUS];

export type AiFeatureToggle = typeof AI_FEATURE_TOGGLE;

export interface AiFeatureConfig {
  readonly feature: AiFeatureValue;
  readonly status: AiFeatureStatusValue;
  readonly enabled: boolean;
  readonly model?: string;
  readonly config?: Readonly<Record<string, unknown>>;
}

export interface AiFeatureFlag {
  readonly feature: AiFeatureValue;
  readonly enabled: boolean;
  readonly rolloutPercent: number;
  readonly allowedRoles?: readonly string[];
  readonly allowedUserIds?: readonly string[];
}
