import { z } from 'zod';
import { FILTER } from '@vubon/shared-constants/src/common/filter.constants';

/**
 * Filter operator VALUES — all 20 operators from FILTER.OPERATORS.
 */
const operatorValues = Object.values(FILTER.OPERATORS) as [string, ...string[]];
const logicValues = Object.values(FILTER.LOGIC) as [string, ...string[]];

export const FilterSchema = z.object({
  field: z.string().min(1),
  operator: z.enum(operatorValues),
  value: z.unknown(),
  logic: z.enum(logicValues).optional(),
});

export const FilterListSchema = z.object({
  filters: z.array(FilterSchema).optional(),
});
