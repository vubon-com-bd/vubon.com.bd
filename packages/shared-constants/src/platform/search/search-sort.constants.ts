export const SEARCH_SORT = {
  RELEVANCE: 'relevance',
  POPULARITY: 'popularity',
  NEWEST: 'newest',
  OLDEST: 'oldest',
  PRICE_LOW_HIGH: 'price_low_high',
  PRICE_HIGH_LOW: 'price_high_low',
  RATING: 'rating',
  DISCOUNT: 'discount',
  BEST_SELLING: 'best_selling',
  TRENDING: 'trending',
  ALPHABETICAL_ASC: 'alphabetical_asc',
  ALPHABETICAL_DESC: 'alphabetical_desc',
  DISTANCE: 'distance',
} as const;

export const SEARCH_SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export const SEARCH_SORT_DEFAULT = SEARCH_SORT.RELEVANCE;

export type SearchSortType = (typeof SEARCH_SORT)[keyof typeof SEARCH_SORT];
export type SearchSortOrderType = (typeof SEARCH_SORT_ORDER)[keyof typeof SEARCH_SORT_ORDER];
