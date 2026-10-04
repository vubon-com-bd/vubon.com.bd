/**
 * Report Priority Schema
 * @module shared-schemas/platform/reporting
 */

import { z } from 'zod';
import { REPORT_PRIORITY } from '@vubon/shared-constants/platform';

export const ReportPrioritySchema = z.enum(Object.values(REPORT_PRIORITY) as [string, ...string[]]);

export type ReportPrioritySchemaType = z.infer<typeof ReportPrioritySchema>;
