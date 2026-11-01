/**
 * Filter Schema
 * @module shared-schemas/common/query
 *
 * Values আসে shared-constants/common/filter.constants থেকে।
 */

import { z } from 'zod';
import { FILTER_OPERATOR, FILTER_LOGIC } from '@vubon/shared-constants/common';

export const FilterOperatorSchema = z.enum(Object.values(FILTER_OPERATOR) as [string, ...string[]]);

export const FilterLogicSchema = z.enum(Object.values(FILTER_LOGIC) as [string, ...string[]]);

export const FilterConditionSchema = z.object({
  field: z.string().min(1).max(64),
  operator: FilterOperatorSchema,
  value: z.unknown(),
});

export const FilterGroupSchema: z.ZodType<unknown> = z.lazy(() =>
  z.object({
    logic: FilterLogicSchema,
    conditions: z.array(z.union([FilterConditionSchema, FilterGroupSchema])).max(20),
  })
);

export const FilterQuerySchema = z.union([FilterConditionSchema, FilterGroupSchema]);

export const FilterListSchema = z.array(FilterQuerySchema).max(30, 'Too many filters');

export type FilterOperatorSchemaType = z.infer<typeof FilterOperatorSchema>;
export type FilterLogicSchemaType = z.infer<typeof FilterLogicSchema>;
export type FilterConditionSchemaType = z.infer<typeof FilterConditionSchema>;
export type FilterQuerySchemaType = z.infer<typeof FilterQuerySchema>;
export type FilterListSchemaType = z.infer<typeof FilterListSchema>;
