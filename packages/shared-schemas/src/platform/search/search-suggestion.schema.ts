import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { SEARCH_SUGGESTION } from '@vubon/shared-constants/src/platform/search/search-suggestion.constants';

const suggestionTypeKeys = Object.keys(SEARCH_SUGGESTION.TYPES) as [string, ...string[]];

export const SearchSuggestionSchema = BaseSchema.extend({
  suggestionId: z.string().uuid(),
  type: z.enum(suggestionTypeKeys),
  text: z.string().min(1).max(100),
  weight: z.number().min(0),
  count: z.number().int().min(0),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
