import { TypeObject } from '../../common/types.types';
import { SEARCH_BOOST } from '@vubon/shared-constants/src/platform/search/search-boost.constants';

export interface SearchBoost extends TypeObject {
  type: keyof typeof SEARCH_BOOST.TYPES | string;
  category: 'search_boost';
  weight: number;
  isTitle: boolean;
  isDescription: boolean;
  isContent: boolean;
  isCategory: boolean;
  isBrand: boolean;
  isVendor: boolean;
  isTags: boolean;
  isSku: boolean;
  isPopularity: boolean;
  isRating: boolean;
  isSales: boolean;
  isNewness: boolean;
  isPromotion: boolean;
}

export type SearchBoostKey = keyof typeof SEARCH_BOOST.TYPES;
