import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { SEARCH_INDEX } from '@vubon/shared-constants/src/platform/search/search-index.constants';

const indexTypeKeys = Object.keys(SEARCH_INDEX.TYPES) as [string, ...string[]];
const indexStatusKeys = Object.keys(SEARCH_INDEX.STATUS) as [string, ...string[]];
const reindexScheduleKeys = Object.keys(SEARCH_INDEX.REINDEX_SCHEDULE) as [string, ...string[]];

export const SearchIndexSchema = BaseSchema.extend({
  indexId: z.string().uuid(),
  name: z.string().min(1).max(100),
  type: z.enum(indexTypeKeys),
  status: z.enum(indexStatusKeys),
  fields: z.array(z.string()),
  documentCount: z.number().int().min(0),
  size: z.number().min(0),
  lastReindexAt: z.date().optional(),
  reindexSchedule: z.enum(reindexScheduleKeys),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
