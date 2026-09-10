import { z } from 'zod';
import { SEARCH_OPERATOR } from '@vubon/shared-constants/src/platform/search/search-operator.constants';

const searchOperatorTypeKeys = Object.keys(SEARCH_OPERATOR.TYPES) as [string, ...string[]];
const searchOperatorSymbolKeys = Object.keys(SEARCH_OPERATOR.OPERATOR_SYMBOLS) as [
  string,
  ...string[],
];

export const SearchOperatorSchema = z.object({
  operator: z.enum(searchOperatorTypeKeys),
  category: z.literal('search_operator'),
  symbol: z.enum(searchOperatorSymbolKeys),
  isAnd: z.boolean().default(false),
  isOr: z.boolean().default(false),
  isNot: z.boolean().default(false),
  isNear: z.boolean().default(false),
  isPhrase: z.boolean().default(false),
  isWildcard: z.boolean().default(false),
  isRegex: z.boolean().default(false),
  isFuzzy: z.boolean().default(false),
});

export const SearchOperatorEnumSchema = z.enum(searchOperatorTypeKeys);
