import { z } from 'zod';
import { FilterSchema } from '../../common/filter.schema';
import { REPORT_FILTER } from '@vubon/shared-constants/src/platform/reporting/report-filter.constants';
import { REPORT_FILTER_OPERATOR } from '@vubon/shared-constants/src/platform/reporting/report-filter-operator.constants';

const reportFilterTypeKeys = Object.keys(REPORT_FILTER.TYPES) as [string, ...string[]];
const reportFilterOperatorKeys = Object.keys(REPORT_FILTER_OPERATOR.TYPES) as [string, ...string[]];
const reportFilterGroupKeys = Object.keys(REPORT_FILTER.FILTER_GROUPS) as [string, ...string[]];

export const ReportFilterSchema = FilterSchema.extend({
  filterId: z.string().uuid(),
  reportId: z.string().uuid(),
  type: z.enum(reportFilterTypeKeys),
  operator: z.enum(reportFilterOperatorKeys),
  group: z.enum(reportFilterGroupKeys),
  field: z.string(),
  value: z.unknown(),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
