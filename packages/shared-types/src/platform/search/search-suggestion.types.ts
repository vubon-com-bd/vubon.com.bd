/**
 * Search Suggestion Types
 * @module shared-types/platform/search
 */

import type { SEARCH_SUGGESTION_TYPE } from '@vubon/shared-constants/platform';

export type SearchSuggestionTypeValue =
  (typeof SEARCH_SUGGESTION_TYPE)[keyof typeof SEARCH_SUGGESTION_TYPE];

export interface SearchSuggestion {
  readonly text: string;
  readonly type: SearchSuggestionTypeValue;
  readonly score: number;
  readonly highlight?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface SearchSuggestionResult {
  readonly query: string;
  readonly suggestions: readonly SearchSuggestion[];
  readonly took: number;
}
