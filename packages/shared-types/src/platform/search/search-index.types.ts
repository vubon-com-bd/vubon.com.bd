/**
 * Search Index Types
 * @module shared-types/platform/search
 */

import type { SEARCH_INDEX_TYPE, SEARCH_INDEX_STATUS } from '@vubon/shared-constants/platform';

export type SearchIndexTypeValue = (typeof SEARCH_INDEX_TYPE)[keyof typeof SEARCH_INDEX_TYPE];

export type SearchIndexStatusValue = (typeof SEARCH_INDEX_STATUS)[keyof typeof SEARCH_INDEX_STATUS];

export interface SearchIndex {
  readonly id: string;
  readonly name: string;
  readonly type: SearchIndexTypeValue;
  readonly status: SearchIndexStatusValue;
  readonly documentCount: number;
  readonly shards: number;
  readonly replicas: number;
  readonly sizeBytes: number;
  readonly lastBuiltAt?: string;
  readonly lastUpdatedAt?: string;
  readonly isActive: boolean;
  readonly config?: Readonly<Record<string, unknown>>;
}

export interface SearchIndexBuildInput {
  readonly type: SearchIndexTypeValue;
  readonly name: string;
  readonly force?: boolean;
}

export interface SearchIndexStats {
  readonly type: SearchIndexTypeValue;
  readonly documentCount: number;
  readonly sizeBytes: number;
  readonly lastBuiltAt?: string;
  readonly buildDurationMs?: number;
}
