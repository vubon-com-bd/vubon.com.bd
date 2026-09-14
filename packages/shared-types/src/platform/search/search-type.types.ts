/**
 * Search Type Value Types
 * @module shared-types/platform/search
 */

import type { SEARCH_TYPE, SEARCH_SCOPE } from '@vubon/shared-constants/platform';

export type SearchTypeValue = (typeof SEARCH_TYPE)[keyof typeof SEARCH_TYPE];

export type SearchScopeValue = (typeof SEARCH_SCOPE)[keyof typeof SEARCH_SCOPE];

export interface SearchTypeMetadata {
  readonly value: SearchTypeValue;
  readonly label: string;
  readonly isFuzzy: boolean;
  readonly isSemantic: boolean;
}
