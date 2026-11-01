/**
 * Report Permission Value Types
 * @module shared-types/platform/reporting
 */

import type { REPORT_PERMISSION } from '@vubon/shared-constants/platform';

export type ReportPermissionValue = (typeof REPORT_PERMISSION)[keyof typeof REPORT_PERMISSION];

export interface ReportPermissionGrant {
  readonly userId: string;
  readonly permission: ReportPermissionValue;
  readonly grantedBy: string;
  readonly grantedAt: string;
  readonly expiresAt?: string;
}
