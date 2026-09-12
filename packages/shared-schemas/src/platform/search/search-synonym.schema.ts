import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { SEARCH_SYNONYM } from '@vubon/shared-constants/src/platform/search/search-synonym.constants';

const synonymTypeKeys = Object.keys(SEARCH_SYNONYM.TYPES) as [string, ...string[]];

export const SearchSynonymSchema = BaseSchema.extend({
  synonymId: z.string().uuid(),
  type: z.enum(synonymTypeKeys),
  term: z.string().min(1).max(100),
  synonyms: z.array(z.string()),
  weight: z.number().min(0),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
