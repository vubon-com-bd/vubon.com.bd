/**
 * Search Operator Schema
 * @module shared-schemas/platform/search
 *
 * Values আসে shared-constants/platform/search-operator.constants থেকে।
 */

import { z } from 'zod';
import { SEARCH_OPERATOR, SEARCH_BOOLEAN } from '@vubon/shared-constants/platform';

export const SearchOperatorSchema = z.enum(Object.values(SEARCH_OPERATOR) as [string, ...string[]]);

export const SearchBooleanSchema = z.enum(Object.values(SEARCH_BOOLEAN) as [string, ...string[]]);

export type SearchOperatorSchemaType = z.infer<typeof SearchOperatorSchema>;
export type SearchBooleanSchemaType = z.infer<typeof SearchBooleanSchema>;
