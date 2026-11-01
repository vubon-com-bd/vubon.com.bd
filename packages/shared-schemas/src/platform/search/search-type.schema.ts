/**
 * Search Type Schema
 * @module shared-schemas/platform/search
 *
 * Values আসে shared-constants/platform/search-type.constants থেকে।
 */

import { z } from 'zod';
import { SEARCH_TYPE, SEARCH_SCOPE } from '@vubon/shared-constants/platform';

export const SearchTypeSchema = z.enum(Object.values(SEARCH_TYPE) as [string, ...string[]]);

export const SearchScopeSchema = z.enum(Object.values(SEARCH_SCOPE) as [string, ...string[]]);

export type SearchTypeSchemaType = z.infer<typeof SearchTypeSchema>;
export type SearchScopeSchemaType = z.infer<typeof SearchScopeSchema>;
