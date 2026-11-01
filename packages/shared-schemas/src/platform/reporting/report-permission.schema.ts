/**
 * Report Permission Schema
 * @module shared-schemas/platform/reporting
 *
 * Values আসে shared-constants/platform/report-permission.constants থেকে।
 */

import { z } from 'zod';
import { REPORT_PERMISSION } from '@vubon/shared-constants/platform';

export const ReportPermissionSchema = z.enum(
  Object.values(REPORT_PERMISSION) as [string, ...string[]]
);

export const ReportPermissionGrantSchema = z.object({
  userId: z.string().min(1),
  permission: ReportPermissionSchema,
  grantedBy: z.string().min(1),
  grantedAt: z.string().datetime(),
  expiresAt: z.string().datetime().optional(),
});

export type ReportPermissionSchemaType = z.infer<typeof ReportPermissionSchema>;
export type ReportPermissionGrantSchemaType = z.infer<typeof ReportPermissionGrantSchema>;
