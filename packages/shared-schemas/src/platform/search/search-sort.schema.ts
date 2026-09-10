import { z } from 'zod';
import { SortSchema } from '../../common/sort.schema';
import { SEARCH_SORT } from '@vubon/shared-constants/src/platform/search/search-sort.constants';

const searchSortTypeKeys = Object.keys(SEARCH_SORT.TYPES) as [string, ...string[]];
const searchSortDirectionKeys = Object.keys(SEARCH_SORT.SORT_DIRECTIONS) as [string, ...string[]];

export const SearchSortSchema = SortSchema.extend({
  type: z.enum(searchSortTypeKeys),
  category: z.literal('search_sort'),
  direction: z.enum(searchSortDirectionKeys),
  isRelevance: z.boolean().default(false),
  isPopularity: z.boolean().default(false),
  isRating: z.boolean().default(false),
  isPriceLowToHigh: z.boolean().default(false),
  isPriceHighToLow: z.boolean().default(false),
  isNewest: z.boolean().default(false),
  isOldest: z.boolean().default(false),
  isBestSelling: z.boolean().default(false),
  isMostViewed: z.boolean().default(false),
  isDiscount: z.boolean().default(false),
  isDistance: z.boolean().default(false),
  isName: z.boolean().default(false),
  isDate: z.boolean().default(false),
});

export const SearchSortEnumSchema = z.enum(searchSortTypeKeys);
