/**
 * Report Filter Schema
 * @module shared-schemas/platform/reporting
 *
 * Values আসে shared-constants/platform/report-filter.constants থেকে।
 */

import { z } from 'zod';
import {
  REPORT_FILTER_OPERATOR,
  REPORT_FILTER_LOGIC,
  REPORT_FILTER_TYPE,
} from '@vubon/shared-constants/platform';

export const ReportFilterOperatorSchema = z.enum(
  Object.values(REPORT_FILTER_OPERATOR) as [string, ...string[]]
);

export const ReportFilterLogicSchema = z.enum(
  Object.values(REPORT_FILTER_LOGIC) as [string, ...string[]]
);

export const ReportFilterTypeSchema = z.enum(
  Object.values(REPORT_FILTER_TYPE) as [string, ...string[]]
);

export const ReportFilterSchema = z.object({
  field: z.string().min(1).max(100),
  operator: ReportFilterOperatorSchema,
  value: z.unknown(),
  type: ReportFilterTypeSchema,
});

export const ReportFilterGroupSchema: z.ZodType<unknown> = z.lazy(() =>
  z.object({
    logic: ReportFilterLogicSchema,
    filters: z.array(z.union([ReportFilterSchema, ReportFilterGroupSchema])).max(30),
  })
);

export type ReportFilterOperatorSchemaType = z.infer<typeof ReportFilterOperatorSchema>;
export type ReportFilterLogicSchemaType = z.infer<typeof ReportFilterLogicSchema>;
export type ReportFilterTypeSchemaType = z.infer<typeof ReportFilterTypeSchema>;
export type ReportFilterSchemaType = z.infer<typeof ReportFilterSchema>;
