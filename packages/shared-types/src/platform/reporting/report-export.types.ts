import { BaseEntity } from '../../common/base.types';
import { REPORT_EXPORT } from '@vubon/shared-constants/src/platform/reporting/report-export.constants';
import { REPORT_FORMAT } from '@vubon/shared-constants/src/platform/reporting/report-format.constants';
import { Report } from './report.types';

export interface ReportExport extends BaseEntity {
  exportId: string;
  reportId: string;
  report: Report;
  type: keyof typeof REPORT_EXPORT.TYPES | string;
  format: keyof typeof REPORT_FORMAT.TYPES | string;
  destination: keyof typeof REPORT_EXPORT.EXPORT_DESTINATIONS | string;
  fileUrl?: string;
  fileSize: number;
  rowCount: number;
  isCompleted: boolean;
  isFailed: boolean;
  exportedAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  metadata: Record<string, unknown>;
}
