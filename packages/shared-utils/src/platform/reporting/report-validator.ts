import { REPORT_STATUS } from '@vubon/shared-constants/src/platform/reporting/report-status.constants';
import { REPORT } from '@vubon/shared-constants/src/platform/reporting/report.constants';

export interface ReportInput {
  name: string;
  status: string;
  type: string;
  priority: string;
  isActive: boolean;
  isArchived: boolean;
}

export const validateReport = (
  report: Partial<ReportInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!report.name) errors.push('Report name is required');
  if (report.status && !Object.keys(REPORT_STATUS).includes(report.status)) {
    errors.push('Invalid report status');
  }
  if (report.type && !Object.keys(REPORT.REPORT_TYPE).includes(report.type)) {
    errors.push('Invalid report type');
  }
  if (report.priority && !Object.keys(REPORT.REPORT_PRIORITY).includes(report.priority)) {
    errors.push('Invalid report priority');
  }
  return { isValid: errors.length === 0, errors };
};

export const isReportActive = (report: ReportInput): boolean => {
  return report.isActive && report.status === 'active';
};

export const isReportArchived = (report: ReportInput): boolean => {
  return report.isArchived || report.status === 'archived';
};
