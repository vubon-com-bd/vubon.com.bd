import { BaseEntity } from '../../common/base.types';
import { REPORT_TEMPLATE } from '@vubon/shared-constants/src/platform/reporting/report-template.constants';
import { Report } from './report.types';

export interface TemplateSection {
  id: string;
  name: string;
  type:
    | 'header'
    | 'summary'
    | 'metrics'
    | 'charts'
    | 'tables'
    | 'analysis'
    | 'recommendations'
    | 'footer';
  content: unknown;
  order: number;
  isVisible: boolean;
}

export interface ReportTemplate extends BaseEntity {
  templateId: string;
  reportId: string;
  report: Report;
  name: string;
  description?: string;
  status: keyof typeof REPORT_TEMPLATE.STATUS | string;
  type: keyof typeof REPORT_TEMPLATE.TYPES | string;
  category: keyof typeof REPORT_TEMPLATE.TEMPLATE_CATEGORIES | string;
  sections: TemplateSection[];
  isActive: boolean;
  isDefault: boolean;
  metadata: Record<string, unknown>;
}
