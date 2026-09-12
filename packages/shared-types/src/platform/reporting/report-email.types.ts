import { BaseEntity } from '../../common/base.types';
import { REPORT_EMAIL } from '@vubon/shared-constants/src/platform/reporting/report-email.constants';
import { REPORT_FORMAT } from '@vubon/shared-constants/src/platform/reporting/report-format.constants';
import { Report } from './report.types';

export interface ReportEmail extends BaseEntity {
  emailId: string;
  reportId: string;
  report: Report;
  status: keyof typeof REPORT_EMAIL.STATUS | string;
  type: keyof typeof REPORT_EMAIL.TYPES | string;
  template: keyof typeof REPORT_EMAIL.EMAIL_TEMPLATES | string;
  from: string;
  to: string[];
  cc: string[];
  bcc: string[];
  subject: string;
  body: string;
  format: keyof typeof REPORT_FORMAT.TYPES | string;
  isSent: boolean;
  isFailed: boolean;
  sentAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  metadata: Record<string, unknown>;
}
