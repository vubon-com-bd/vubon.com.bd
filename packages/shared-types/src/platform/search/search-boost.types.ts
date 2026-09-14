/**
 * Search Boost Types
 * @module shared-types/platform/search
 */

import type { SEARCH_BOOST, SEARCH_BOOST_FIELD } from '@vubon/shared-constants/platform';

export type SearchBoostFieldValue = (typeof SEARCH_BOOST_FIELD)[keyof typeof SEARCH_BOOST_FIELD];

export type SearchBoostConfig = typeof SEARCH_BOOST;

export interface SearchBoost {
  readonly field: SearchBoostFieldValue;
  readonly boost: number;
  readonly decayEnabled?: boolean;
  readonly decayScaleDays?: number;
}

export interface SearchBoostMetadata {
  readonly field: SearchBoostFieldValue;
  readonly defaultBoost: number;
  readonly maxBoost: number;
}
