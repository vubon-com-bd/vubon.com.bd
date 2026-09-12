import { z } from 'zod';
import { FilterSchema } from '../../common/filter.schema';
import { SEARCH_FILTER } from '@vubon/shared-constants/src/platform/search/search-filter.constants';

const searchFilterTypeKeys = Object.keys(SEARCH_FILTER.TYPES) as [string, ...string[]];
const searchFilterOperatorKeys = Object.keys(SEARCH_FILTER.FILTER_OPERATORS) as [
  string,
  ...string[],
];

export const SearchFilterSchema = FilterSchema.extend({
  type: z.enum(searchFilterTypeKeys),
  category: z.literal('search_filter'),
  operator: z.enum(searchFilterOperatorKeys),
  field: z.string(),
  value: z.unknown(),
  isCategory: z.boolean().default(false),
  isBrand: z.boolean().default(false),
  isPriceRange: z.boolean().default(false),
  isRating: z.boolean().default(false),
  isColor: z.boolean().default(false),
  isSize: z.boolean().default(false),
  isMaterial: z.boolean().default(false),
  isStyle: z.boolean().default(false),
  isGender: z.boolean().default(false),
  isAgeGroup: z.boolean().default(false),
  isAvailability: z.boolean().default(false),
  isDiscount: z.boolean().default(false),
  isShipping: z.boolean().default(false),
  isVendor: z.boolean().default(false),
  isLocation: z.boolean().default(false),
  isDateRange: z.boolean().default(false),
  isStatus: z.boolean().default(false),
});

export const SearchFilterEnumSchema = z.enum(searchFilterTypeKeys);
