/**
 * Search API endpoint paths.
 * @module shared-api/endpoints/search
 */

export const SEARCH_ENDPOINTS = {
  SEARCH: '/search',
  SUGGEST: '/search/suggest',
  AUTOCOMPLETE: '/search/autocomplete',
  RECENT: '/search/recent',
  TRENDING: '/search/trending',
  SAVE: '/search/save',
  SAVED: '/search/saved',
  SAVED_DELETE: (searchId: string) => `/search/saved/${searchId}`,
} as const;
