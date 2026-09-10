import { z } from 'zod';
import { SEARCH_MATCH } from '@vubon/shared-constants/src/platform/search/search-match.constants';

const searchMatchTypeKeys = Object.keys(SEARCH_MATCH.TYPES) as [string, ...string[]];
const searchMatchPriorityKeys = Object.keys(SEARCH_MATCH.MATCH_PRIORITIES) as [string, ...string[]];

export const SearchMatchSchema = z.object({
  match: z.enum(searchMatchTypeKeys),
  category: z.literal('search_match'),
  priority: z.enum(searchMatchPriorityKeys),
  isExact: z.boolean().default(false),
  isPrefix: z.boolean().default(false),
  isSuffix: z.boolean().default(false),
  isContains: z.boolean().default(false),
  isFuzzy: z.boolean().default(false),
  isWildcard: z.boolean().default(false),
  isRegex: z.boolean().default(false),
  isSynonym: z.boolean().default(false),
  isStemmed: z.boolean().default(false),
});

export const SearchMatchEnumSchema = z.enum(searchMatchTypeKeys);
