import { BaseEntity } from '../../common/base.types';
import { User } from '../../user/user.types';
import { REPORT_STATUS } from '@vubon/shared-constants/src/platform/reporting/report-status.constants';
import { REPORT } from '@vubon/shared-constants/src/platform/reporting/report.constants';
import { ReportTemplate } from './report-template.types';
import { ReportFilter } from './report-filter.types';
import { ReportExport } from './report-export.types';
import { ReportEmail } from './report-email.types';
import { ReportSchedule } from './report-schedule.types';

export interface ReportMetadata {
  timezone: string;
  locale: string;
  tags: string[];
  notes?: string;
  version: number;
}

export interface Report extends BaseEntity {
  reportId: string;
  name: string;
  description?: string;
  status: keyof typeof REPORT_STATUS | string;
  type: keyof typeof REPORT.REPORT_TYPE | string;
  category: keyof typeof REPORT.REPORT_TYPE | string;
  priority: keyof typeof REPORT.REPORT_PRIORITY | string;
  template: ReportTemplate;
  filters: ReportFilter[];
  export: ReportExport;
  email: ReportEmail;
  schedule: ReportSchedule;
  createdBy: string;
  createdByUser: User;
  generatedAt?: Date;
  fileUrl?: string;
  fileSize?: number;
  rowCount: number;
  isActive: boolean;
  isArchived: boolean;
  metadata: ReportMetadata;
}
