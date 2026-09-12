import { z } from 'zod';
import { SEARCH_BOOST } from '@vubon/shared-constants/src/platform/search/search-boost.constants';

const searchBoostTypeKeys = Object.keys(SEARCH_BOOST.TYPES) as [string, ...string[]];

export const SearchBoostSchema = z.object({
  boost: z.enum(searchBoostTypeKeys),
  category: z.literal('search_boost'),
  weight: z.number().min(0),
  isTitle: z.boolean().default(false),
  isDescription: z.boolean().default(false),
  isContent: z.boolean().default(false),
  isCategory: z.boolean().default(false),
  isBrand: z.boolean().default(false),
  isVendor: z.boolean().default(false),
  isTags: z.boolean().default(false),
  isSku: z.boolean().default(false),
  isPopularity: z.boolean().default(false),
  isRating: z.boolean().default(false),
  isSales: z.boolean().default(false),
  isNewness: z.boolean().default(false),
  isPromotion: z.boolean().default(false),
});

export const SearchBoostEnumSchema = z.enum(searchBoostTypeKeys);
