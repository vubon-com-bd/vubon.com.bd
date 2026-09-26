/**
 * Report Export Types
 * @module shared-types/platform/reporting
 */

import type {
  REPORT_EXPORT_TYPE,
  REPORT_EXPORT_STATUS,
  REPORT_EXPORT_DESTINATION,
} from '@vubon/shared-constants/platform';

export type ReportExportTypeValue = (typeof REPORT_EXPORT_TYPE)[keyof typeof REPORT_EXPORT_TYPE];

export type ReportExportStatusValue =
  (typeof REPORT_EXPORT_STATUS)[keyof typeof REPORT_EXPORT_STATUS];

export type ReportExportDestinationValue =
  (typeof REPORT_EXPORT_DESTINATION)[keyof typeof REPORT_EXPORT_DESTINATION];

export interface ReportExport {
  readonly id: string;
  readonly reportId: string;
  readonly type: ReportExportTypeValue;
  readonly status: ReportExportStatusValue;
  readonly destination: ReportExportDestinationValue;
  readonly format: string;
  readonly fileUrl?: string;
  readonly fileSize?: number;
  readonly rowCount?: number;
  readonly expiresAt?: string;
  readonly completedAt?: string;
  readonly error?: string;
  readonly requestedBy: string;
  readonly createdAt: string;
}

export interface ReportExportInput {
  readonly reportId: string;
  readonly type: ReportExportTypeValue;
  readonly format: string;
  readonly destination: ReportExportDestinationValue;
  readonly filters?: Readonly<Record<string, unknown>>;
}

export interface ReportExportResult {
  readonly success: boolean;
  readonly exportId?: string;
  readonly fileUrl?: string;
  readonly error?: string;
}
