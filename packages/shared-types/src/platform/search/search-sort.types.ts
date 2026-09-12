import { TypeObject } from '../../common/types.types';
import { SEARCH_SORT } from '@vubon/shared-constants/src/platform/search/search-sort.constants';

export interface SearchSort extends TypeObject {
  type: keyof typeof SEARCH_SORT.TYPES | string;
  category: 'search_sort';
  direction: keyof typeof SEARCH_SORT.SORT_DIRECTIONS | string;
  isRelevance: boolean;
  isPopularity: boolean;
  isRating: boolean;
  isPriceLowToHigh: boolean;
  isPriceHighToLow: boolean;
  isNewest: boolean;
  isOldest: boolean;
  isBestSelling: boolean;
  isMostViewed: boolean;
  isDiscount: boolean;
  isDistance: boolean;
  isName: boolean;
  isDate: boolean;
}

export type SearchSortKey = keyof typeof SEARCH_SORT.TYPES;
