// Renamed from search.constants.ts to avoid conflict with platform/search
// This file holds SEARCH PARAMS (query limits), not search engine constants.

export const SEARCH_PARAMS = {
  DEFAULT_QUERY_MIN_LENGTH: 2,
  DEFAULT_QUERY_MAX_LENGTH: 100,
  DEFAULT_RESULT_LIMIT: 20,
  MAX_RESULT_LIMIT: 100,
  DEFAULT_FUZZY: false,
  DEFAULT_HIGHLIGHT: true,
  DEFAULT_SUGGESTION_LIMIT: 10,
} as const;

export type SearchParamsType = typeof SEARCH_PARAMS;
