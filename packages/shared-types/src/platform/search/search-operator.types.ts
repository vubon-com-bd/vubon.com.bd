/**
 * Search Operator Value Types
 * @module shared-types/platform/search
 */

import type { SEARCH_OPERATOR, SEARCH_BOOLEAN } from '@vubon/shared-constants/platform';

export type SearchOperatorValue = (typeof SEARCH_OPERATOR)[keyof typeof SEARCH_OPERATOR];

export type SearchBooleanValue = (typeof SEARCH_BOOLEAN)[keyof typeof SEARCH_BOOLEAN];

export interface SearchOperatorMetadata {
  readonly value: SearchOperatorValue;
  readonly label: string;
  readonly description: string;
}
