import { BaseEntity } from '../common/base.types';
import { DOCUMENT } from '@vubon/shared-constants/src/common/document.constants';
import {
  AdminReportType,
  AdminReportFrequency,
} from '@vubon/shared-constants/src/admin/admin-report.constants';

/**
 * Report output format — restricted to exportable formats.
 * (Extracted from DOCUMENT.FORMATS for type safety.)
 */
export type ReportFormat = Extract<
  (typeof DOCUMENT.FORMATS)[keyof typeof DOCUMENT.FORMATS],
  'pdf' | 'excel' | 'csv' | 'json'
>;

/**
 * Admin report interface
 *
 * Design notes:
 * - `adminId` only — no Admin summary embed (reports can be generated in bulk).
 * - `type` restricted to AdminReportType (no free-form string).
 * - `data` holds the materialized report payload — redact sensitive fields upstream.
 */
export interface AdminReport extends BaseEntity {
  reportId: string;
  adminId: string;
  type: AdminReportType;
  title: string;
  description: string;
  data: Record<string, unknown>;
  generatedAt: Date;
  format: ReportFormat;
  frequency?: AdminReportFrequency;
}
