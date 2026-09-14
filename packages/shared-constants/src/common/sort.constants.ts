export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export const SORT_FIELD = {
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
  NAME: 'name',
  PRICE: 'price',
  RATING: 'rating',
  POPULARITY: 'popularity',
  RELEVANCE: 'relevance',
} as const;

export type SortOrderType = (typeof SORT_ORDER)[keyof typeof SORT_ORDER];
export type SortFieldType = (typeof SORT_FIELD)[keyof typeof SORT_FIELD];
