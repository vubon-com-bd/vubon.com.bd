import { TypeObject } from '../../common/types.types';
import { SEARCH_FILTER } from '@vubon/shared-constants/src/platform/search/search-filter.constants';

export interface SearchFilter extends TypeObject {
  type: keyof typeof SEARCH_FILTER.TYPES | string;
  category: 'search_filter';
  operator: keyof typeof SEARCH_FILTER.FILTER_OPERATORS | string;
  field: string;
  value: string; // TypeObject-এ value: string, তাই string করতে হবে
  isCategory: boolean;
  isBrand: boolean;
  isPriceRange: boolean;
  isRating: boolean;
  isColor: boolean;
  isSize: boolean;
  isMaterial: boolean;
  isStyle: boolean;
  isGender: boolean;
  isAgeGroup: boolean;
  isAvailability: boolean;
  isDiscount: boolean;
  isShipping: boolean;
  isVendor: boolean;
  isLocation: boolean;
  isDateRange: boolean;
  isStatus: boolean;
}

export type SearchFilterKey = keyof typeof SEARCH_FILTER.TYPES;
