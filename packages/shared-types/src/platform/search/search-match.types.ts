/**
 * Search Match Value Types
 * @module shared-types/platform/search
 */

import type { SEARCH_MATCH_TYPE, SEARCH_FUZZINESS } from '@vubon/shared-constants/platform';

export type SearchMatchTypeValue = (typeof SEARCH_MATCH_TYPE)[keyof typeof SEARCH_MATCH_TYPE];

export type SearchFuzzinessValue = (typeof SEARCH_FUZZINESS)[keyof typeof SEARCH_FUZZINESS];

export interface SearchMatch {
  readonly type: SearchMatchTypeValue;
  readonly field: string;
  readonly value: string;
  readonly fuzziness?: SearchFuzzinessValue;
  readonly boost?: number;
}

export interface SearchMatchMetadata {
  readonly value: SearchMatchTypeValue;
  readonly label: string;
  readonly exactMatch: boolean;
}
