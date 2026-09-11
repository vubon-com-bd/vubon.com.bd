import { VENDOR_REPORT } from '@vubon/shared-constants/src/business/vendor/vendor-report.constants';

export interface ReportInput {
  vendorId: string;
  type: string;
}

export const validateVendorReport = (
  report: Partial<ReportInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!report.vendorId) errors.push('Vendor ID is required');
  if (!report.type) errors.push('Report type is required');
  if (report.type && !Object.keys(VENDOR_REPORT.TYPES).includes(report.type)) {
    errors.push('Invalid report type');
  }
  return { isValid: errors.length === 0, errors };
};
