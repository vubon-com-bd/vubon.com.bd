/**
 * Knowledge Base Types
 * @module shared-types/support
 */

import type {
  KNOWLEDGE_BASE_STATUS,
  KNOWLEDGE_BASE_TYPE,
  KNOWLEDGE_BASE_VISIBILITY,
} from '@vubon/shared-constants/support';
import type { BaseEntity } from '../common/base';
import type { Slug } from '../common/primitives';

export type KnowledgeBaseStatusValue =
  (typeof KNOWLEDGE_BASE_STATUS)[keyof typeof KNOWLEDGE_BASE_STATUS];

export type KnowledgeBaseTypeValue = (typeof KNOWLEDGE_BASE_TYPE)[keyof typeof KNOWLEDGE_BASE_TYPE];

export type KnowledgeBaseVisibilityValue =
  (typeof KNOWLEDGE_BASE_VISIBILITY)[keyof typeof KNOWLEDGE_BASE_VISIBILITY];

export interface KnowledgeBase extends BaseEntity<string> {
  readonly title: string;
  readonly slug: Slug;
  readonly summary?: string;
  readonly content: string;
  readonly type: KnowledgeBaseTypeValue;
  readonly status: KnowledgeBaseStatusValue;
  readonly visibility: KnowledgeBaseVisibilityValue;
  readonly categoryIds: readonly string[];
  readonly tags?: readonly string[];
  readonly attachments?: readonly string[];
  readonly viewCount: number;
  readonly helpfulCount: number;
  readonly notHelpfulCount: number;
  readonly version: number;
  readonly reviewAt?: string;
  readonly reviewedBy?: string;
  readonly publishedAt?: string;
  readonly createdBy: string;
  readonly updatedBy?: string;
}

export interface KnowledgeBasePublic {
  readonly id: string;
  readonly title: string;
  readonly slug: Slug;
  readonly summary?: string;
  readonly type: KnowledgeBaseTypeValue;
  readonly viewCount: number;
  readonly publishedAt?: string;
}

export interface KnowledgeBaseListFilter {
  readonly type?: KnowledgeBaseTypeValue;
  readonly status?: KnowledgeBaseStatusValue;
  readonly visibility?: KnowledgeBaseVisibilityValue;
  readonly categoryId?: string;
  readonly tags?: readonly string[];
  readonly search?: string;
}
