import { Filter } from '../../common/filter.types';
import { REPORT_FILTER } from '@vubon/shared-constants/src/platform/reporting/report-filter.constants';
import { REPORT_FILTER_OPERATOR } from '@vubon/shared-constants/src/platform/reporting/report-filter-operator.constants';
import { Report } from './report.types';

export interface ReportFilter extends Filter {
  filterId: string;
  reportId: string;
  report: Report;
  type: keyof typeof REPORT_FILTER.TYPES | string;
  operator: keyof typeof REPORT_FILTER_OPERATOR.TYPES | string;
  group: keyof typeof REPORT_FILTER.FILTER_GROUPS | string;
  field: string;
  value: unknown;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
