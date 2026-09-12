/**
 * Filter API endpoint paths.
 * @module shared-api/endpoints/filter
 */

export const FILTER_ENDPOINTS = {
  LIST: '/filters',
  CREATE: '/filters',
  GET: (filterId: string) => `/filters/${filterId}`,
  UPDATE: (filterId: string) => `/filters/${filterId}`,
  DELETE: (filterId: string) => `/filters/${filterId}`,
  APPLY: '/filters/apply',
  SAVE: '/filters/save',
  SAVED: '/filters/saved',
  OPERATORS: '/filters/operators',
} as const;
