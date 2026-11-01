/**
 * Report Status Schema
 * @module shared-schemas/platform/reporting
 *
 * Values আসে shared-constants/platform/report-status.constants থেকে।
 */

import { z } from 'zod';
import { REPORT_STATUS } from '@vubon/shared-constants/platform';

export const ReportStatusSchema = z.enum(Object.values(REPORT_STATUS) as [string, ...string[]]);

export type ReportStatusSchemaType = z.infer<typeof ReportStatusSchema>;
