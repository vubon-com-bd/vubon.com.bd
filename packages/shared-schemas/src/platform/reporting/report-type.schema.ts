/**
 * Report Type Schema
 * @module shared-schemas/platform/reporting
 */

import { z } from 'zod';
import { REPORT_TYPE } from '@vubon/shared-constants/platform';

export const ReportTypeSchema = z.enum(Object.values(REPORT_TYPE) as [string, ...string[]]);

export type ReportTypeSchemaType = z.infer<typeof ReportTypeSchema>;
