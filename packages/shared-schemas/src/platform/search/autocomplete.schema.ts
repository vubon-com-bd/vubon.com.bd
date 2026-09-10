import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { AUTOCOMPLETE } from '@vubon/shared-constants/src/platform/search/autocomplete.constants';

const autocompleteTypeKeys = Object.keys(AUTOCOMPLETE.TYPES) as [string, ...string[]];

export const AutocompleteSchema = BaseSchema.extend({
  autocompleteId: z.string().uuid(),
  type: z.enum(autocompleteTypeKeys),
  text: z.string().min(1).max(100),
  weight: z.number().min(0),
  count: z.number().int().min(0),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
