/**
 * AI Insight Types
 * @module shared-types/ai
 *
 * Values আসে shared-constants/ai/ai-insight.constants থেকে।
 */

import type {
  AI_INSIGHT_TYPE,
  AI_INSIGHT_PRIORITY,
  AI_INSIGHT_STATUS,
} from '@vubon/shared-constants/ai';
import type { UserId } from '../common/primitives';
import type { BaseEntity } from '../common/base';

export type AiInsightTypeValue = (typeof AI_INSIGHT_TYPE)[keyof typeof AI_INSIGHT_TYPE];

export type AiInsightPriorityValue = (typeof AI_INSIGHT_PRIORITY)[keyof typeof AI_INSIGHT_PRIORITY];

export type AiInsightStatusValue = (typeof AI_INSIGHT_STATUS)[keyof typeof AI_INSIGHT_STATUS];

export interface AiInsight extends BaseEntity<string> {
  readonly type: AiInsightTypeValue;
  readonly priority: AiInsightPriorityValue;
  readonly status: AiInsightStatusValue;
  readonly title: string;
  readonly description: string;
  readonly confidence: number;
  readonly source: string;
  readonly metrics?: Readonly<Record<string, number>>;
  readonly recommendations?: readonly string[];
  readonly referenceType?: string;
  readonly referenceId?: string;
  readonly actionedBy?: UserId;
  readonly actionedAt?: string;
  readonly dismissedBy?: UserId;
  readonly dismissedAt?: string;
  readonly expiresAt?: string;
}

export interface AiInsightPublic {
  readonly id: string;
  readonly type: AiInsightTypeValue;
  readonly priority: AiInsightPriorityValue;
  readonly status: AiInsightStatusValue;
  readonly title: string;
  readonly description: string;
  readonly confidence: number;
  readonly createdAt: string;
}

export interface AiInsightListFilter {
  readonly type?: AiInsightTypeValue;
  readonly priority?: AiInsightPriorityValue;
  readonly status?: AiInsightStatusValue;
  readonly minConfidence?: number;
  readonly fromDate?: string;
  readonly toDate?: string;
}
