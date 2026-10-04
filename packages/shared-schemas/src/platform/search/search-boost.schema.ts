/**
 * Search Boost Schema
 * @module shared-schemas/platform/search
 *
 * Values আসে shared-constants/platform/search-boost.constants থেকে।
 */

import { z } from 'zod';
import { SEARCH_BOOST_FIELD } from '@vubon/shared-constants/platform';

export const SearchBoostFieldSchema = z.enum(
  Object.values(SEARCH_BOOST_FIELD) as [string, ...string[]]
);

export const SearchBoostSchema = z.object({
  field: SearchBoostFieldSchema,
  boost: z.number().min(0.1).max(10),
  decayEnabled: z.boolean().optional(),
  decayScaleDays: z.number().int().positive().max(3650).optional(),
});

export type SearchBoostFieldSchemaType = z.infer<typeof SearchBoostFieldSchema>;
export type SearchBoostSchemaType = z.infer<typeof SearchBoostSchema>;
