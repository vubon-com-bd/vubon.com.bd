/**
 * Report Format Schema
 * @module shared-schemas/platform/reporting
 *
 * Values আসে shared-constants/platform/report-format.constants থেকে।
 */

import { z } from 'zod';
import { REPORT_FORMAT } from '@vubon/shared-constants/platform';

export const ReportFormatSchema = z.enum(Object.values(REPORT_FORMAT) as [string, ...string[]]);

export type ReportFormatSchemaType = z.infer<typeof ReportFormatSchema>;
