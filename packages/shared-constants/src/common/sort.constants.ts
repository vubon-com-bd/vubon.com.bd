/**
 * Sort Constants
 * @module shared-constants/common/sort.constants
 */

export const SORT = {
  // Sort directions
  ASC: 'asc',
  DESC: 'desc',

  // Sort fields
  FIELDS: {
    CREATED_AT: 'createdAt',
    UPDATED_AT: 'updatedAt',
    NAME: 'name',
    TITLE: 'title',
    PRICE: 'price',
    RATING: 'rating',
    POPULARITY: 'popularity',
    SALES: 'sales',
    VIEWS: 'views',
    RELEVANCE: 'relevance',
    DISTANCE: 'distance',
    DATE: 'date',
    SIZE: 'size',
    STATUS: 'status',
    PRIORITY: 'priority',
    SCORE: 'score',
    RANK: 'rank',
    ORDER: 'order',
    POSITION: 'position',
    INDEX: 'index',
    WEIGHT: 'weight',
    VALUE: 'value',
    COUNT: 'count',
    TOTAL: 'total',
  } as const,

  // Sort types
  TYPES: {
    STRING: 'string',
    NUMBER: 'number',
    DATE: 'date',
    BOOLEAN: 'boolean',
    ENUM: 'enum',
  } as const,

  // Sort order for UI
  ORDER: {
    ASC: 'ascending',
    DESC: 'descending',
  } as const,

  // Default sort
  DEFAULT: {
    FIELD: 'createdAt',
    DIRECTION: 'desc',
  },

  // Sort options
  OPTIONS: {
    CASE_SENSITIVE: false,
    NULLS_FIRST: false,
    NULLS_LAST: true,
  },
} as const;

export type SortDirection = typeof SORT.ASC | typeof SORT.DESC;
export type SortField = (typeof SORT.FIELDS)[keyof typeof SORT.FIELDS];
export type SortType = (typeof SORT.TYPES)[keyof typeof SORT.TYPES];
